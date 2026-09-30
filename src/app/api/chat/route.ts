import "server-only";
import { parseMessages, type ChatEvent } from "@/lib/chat/contracts";
import { buildSystemPrompt } from "@/lib/chat/context";
import { answerDeltas, requestCompletion } from "@/lib/chat/provider";
import { chatLimiter, clientKey, protectionConfigured, readBoundedJson, sameOrigin } from "@/lib/chat/security";

export const runtime = "nodejs";
export const maxDuration = 45;

const privateHeaders = {
  "Cache-Control": "no-store, no-transform",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
};
const unavailable = "El asistente no está disponible ahora. Puedes contactar con Bruno por email o LinkedIn.";

function error(message: string, status: number, retryAfter?: number) {
  return Response.json({ error: message }, { status, headers: { ...privateHeaders, ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}) } });
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return error("Solicitud no permitida.", 403);
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return error("La solicitud debe contener JSON.", 415);
  const key = process.env.GROQ_API_KEY;
  if (!key || !protectionConfigured()) return error(unavailable, 503);

  // Acquire synchronously BEFORE reading the body or calling the provider.
  const admission = chatLimiter.acquire(clientKey(request.headers));
  if (!admission.allowed) return error("Has alcanzado el límite de consultas. Espera antes de volver a enviar.", 429, admission.retryAfter);
  let messages;
  try { messages = parseMessages(await readBoundedJson(request)); }
  catch { admission.release(); return error("La pregunta es demasiado larga o la solicitud no es válida.", 400); }
  if (!messages) { admission.release(); return error("Escribe una pregunta de hasta 800 caracteres.", 400); }

  const abort = new AbortController();
  const onDisconnect = () => abort.abort();
  request.signal.addEventListener("abort", onDisconnect, { once: true });
  if (request.signal.aborted) abort.abort();
  const timeout = setTimeout(() => abort.abort(), 30_000);
  let finished = false;
  const cleanup = () => {
    if (finished) return;
    finished = true;
    clearTimeout(timeout);
    request.signal.removeEventListener("abort", onDisconnect);
    abort.abort();
    admission.release();
  };

  let upstream: Response;
  try { upstream = await requestCompletion(key, buildSystemPrompt(messages), messages, abort.signal); }
  catch { cleanup(); return error("No se ha podido conectar con el asistente. Inténtalo más tarde o contacta con Bruno.", 503); }
  if (!upstream.ok || !upstream.body) {
    void upstream.body?.cancel().catch(() => {});
    cleanup();
    return upstream.status === 429 ? error("El asistente ha alcanzado su cuota gratuita. Inténtalo más tarde.", 429, 60) : error(unavailable, 503);
  }
  const body = upstream.body;
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: ChatEvent) => controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      try {
        for await (const text of answerDeltas(body)) {
          if (abort.signal.aborted) throw new Error("cancelled");
          send({ type: "delta", text });
        }
        send({ type: "done" });
      } catch {
        // Never expose provider errors, headers, tokens or stack traces.
        if (!finished) send({ type: "error", message: "La respuesta se ha interrumpido. Puedes volver a enviar tu pregunta." });
      } finally {
        if (!finished) controller.close();
        cleanup();
      }
    },
    cancel() { cleanup(); },
  });
  return new Response(stream, { headers: { ...privateHeaders, "Content-Type": "application/x-ndjson; charset=utf-8", "X-Accel-Buffering": "no" } });
}

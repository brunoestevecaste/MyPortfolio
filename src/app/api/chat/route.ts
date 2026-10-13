import "server-only";
import { getMessages } from "@/lib/i18n/dictionaries";
import { createTranslator, languageFromCookie } from "@/lib/i18n/shared";
import { parseMessages } from "@/lib/chat/contracts";
import { generateAnswer } from "@/lib/chat/answer";
import { localAnswer } from "@/lib/chat/local-answer";
import { ProviderError } from "@/lib/chat/provider";
import { chatLimiter, localChatLimiter, clientKey, protectionConfigured, readBoundedJson, sameOrigin } from "@/lib/chat/security";

export const runtime = "nodejs";
export const maxDuration = 45;
const privateHeaders = {
  "Cache-Control": "no-store, no-transform", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer",
};
const unavailable = "El asistente no está disponible ahora. Puedes contactar con Bruno por email o LinkedIn.";
function error(message: string, status: number, retryAfter?: number) {
  return Response.json({ error: message }, { status, headers: { ...privateHeaders, ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}) } });
}
function answer(text: string) {
  // Only reviewed text crosses this boundary. The UI reveals it progressively;
  // unreviewed tokens, model reasoning and provider metadata never reach it.
  return new Response(`${JSON.stringify({ type: "delta", text })}\n${JSON.stringify({ type: "done" })}\n`, {
    headers: { ...privateHeaders, "Content-Type": "application/x-ndjson; charset=utf-8" },
  });
}
export async function POST(request: Request) {
  const locale = languageFromCookie(request.headers.get("cookie"));
  const t = createTranslator(await getMessages(locale));
  const localizedError = (message: string, status: number, retryAfter?: number) => error(t(message), status, retryAfter);
  if (!sameOrigin(request)) return localizedError("Solicitud no permitida.", 403);
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return localizedError("La solicitud debe contener JSON.", 415);
  const mode = process.env.CHAT_MODE || "groq";
  const key = process.env.GROQ_API_KEY;
  if (!["local", "groq"].includes(mode) || (mode === "groq" && (!key || !protectionConfigured()))) return localizedError(unavailable, 503);
  const admission = (mode === "local" ? localChatLimiter : chatLimiter).acquire(clientKey(request.headers));
  if (!admission.allowed) return localizedError("Has alcanzado el límite de consultas. Espera antes de volver a enviar.", 429, admission.retryAfter);
  const abort = new AbortController();
  const onDisconnect = () => abort.abort();
  request.signal.addEventListener("abort", onDisconnect, { once: true });
  if (request.signal.aborted) abort.abort();
  const timeout = setTimeout(() => abort.abort(), 30_000);
  try {
    let messages;
    try { messages = parseMessages(await readBoundedJson(request)); }
    catch { return localizedError("La pregunta es demasiado larga o la solicitud no es válida.", 400); }
    if (!messages) return localizedError("Escribe una pregunta de hasta 800 caracteres.", 400);
    if (abort.signal.aborted) return localizedError(unavailable, 503);
    const text = mode === "local" ? localAnswer(messages, t) : await generateAnswer(key!, messages, abort.signal, locale, t);
    if (abort.signal.aborted) return localizedError(unavailable, 503);
    return answer(text);
  } catch (failure) {
    // Do not expose upstream text, traces, headers, keys, drafts or reasoning.
    if (failure instanceof ProviderError && failure.status === 429) return localizedError("El asistente ha alcanzado su cuota gratuita. Inténtalo más tarde.", 429, failure.retryAfter);
    return localizedError(unavailable, 503);
  } finally {
    clearTimeout(timeout);
    request.signal.removeEventListener("abort", onDisconnect);
    abort.abort(); admission.release();
  }
}

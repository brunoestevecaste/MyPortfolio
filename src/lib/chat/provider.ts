import "server-only";

export const CHAT_MODEL = "openai/gpt-oss-120b";
export const PROVIDER_URL = "https://api.groq.com/openai/v1/chat/completions";
const MAX_PROVIDER_BYTES = 32_768;
export class ProviderError extends Error {
  constructor(readonly status: number, readonly retryAfter = 60) { super("provider-unavailable"); }
}

export async function requestStructured(key: string, system: string, input: unknown, schema: object, name: string, signal: AbortSignal, maxTokens = 1024): Promise<unknown> {
  const response = await fetch(PROVIDER_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages: [{ role: "system", content: system }, { role: "user", content: JSON.stringify(input) }],
      stream: false,
      max_completion_tokens: maxTokens,
      reasoning_effort: "low",
      reasoning_format: "hidden",
      response_format: { type: "json_schema", json_schema: { name, strict: true, schema } },
    }),
    cache: "no-store", redirect: "error", signal,
  });
  if (!response.ok) {
    void response.body?.cancel().catch(() => {});
    const retry = Number(response.headers.get("retry-after"));
    throw new ProviderError(response.status, Number.isFinite(retry) && retry > 0 ? Math.min(Math.ceil(retry), 86400) : 60);
  }
  if (!response.body) throw new ProviderError(502);
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let text = "";
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_PROVIDER_BYTES) throw new ProviderError(502);
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } finally { void reader.cancel().catch(() => {}); reader.releaseLock(); }
  const payload: unknown = JSON.parse(text);
  if (!payload || typeof payload !== "object" || !("choices" in payload) || !Array.isArray(payload.choices)) throw new ProviderError(502);
  const choice: unknown = payload.choices[0];
  if (!choice || typeof choice !== "object" || !("finish_reason" in choice) || choice.finish_reason !== "stop" || !("message" in choice)) throw new ProviderError(502);
  const message = choice.message;
  if (!message || typeof message !== "object" || !("content" in message) || typeof message.content !== "string" || ("tool_calls" in message && message.tool_calls) || ("refusal" in message && message.refusal)) throw new ProviderError(502);
  return JSON.parse(message.content) as unknown;
}

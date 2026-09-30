import "server-only";
import { MAX_ANSWER_LENGTH, type ChatMessage } from "./contracts";

export const CHAT_MODEL = "openai/gpt-oss-20b";
export const PROVIDER_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function requestCompletion(key: string, prompt: string, messages: ChatMessage[], signal: AbortSignal): Promise<Response> {
  return fetch(PROVIDER_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages: [{ role: "system", content: prompt }, ...messages.slice(-5).map((message) => ({ ...message, content: message.content.slice(0, 1_200) }))],
      stream: true,
      max_completion_tokens: 1_024,
      reasoning_effort: "low",
      reasoning_format: "hidden",
    }),
    cache: "no-store",
    signal,
  });
}

// Decode complete SSE lines across arbitrary UTF-8/network boundaries. Forward
// only answer text: no reasoning, provider metadata, errors or tool invocations.
export async function* answerDeltas(body: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
      if (buffer.length > 65_536) throw new Error("invalid-stream");
      let newline: number;
      while ((newline = buffer.indexOf("\n")) !== -1 || (done && buffer.length > 0)) {
        const line = (newline === -1 ? buffer : buffer.slice(0, newline)).trimEnd();
        buffer = newline === -1 ? "" : buffer.slice(newline + 1);
        if (!line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (data === "[DONE]") {
          if (!length) throw new Error("empty-answer");
          return;
        }
        const event: unknown = JSON.parse(data);
        if (!event || typeof event !== "object" || "error" in event) throw new Error("invalid-stream");
        if (!("choices" in event) || !Array.isArray(event.choices)) continue;
        const choice: unknown = event.choices[0];
        if (!choice || typeof choice !== "object" || !("delta" in choice)) continue;
        if ("finish_reason" in choice && choice.finish_reason === "length") throw new Error("truncated-answer");
        const delta = choice.delta;
        if (!delta || typeof delta !== "object" || !("content" in delta) || typeof delta.content !== "string") continue;
        const text = delta.content.slice(0, MAX_ANSWER_LENGTH - length);
        if (text) { length += text.length; yield text; }
        if (length >= MAX_ANSWER_LENGTH) throw new Error("truncated-answer");
      }
      if (done) throw new Error("incomplete-stream");
    }
  } finally {
    void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

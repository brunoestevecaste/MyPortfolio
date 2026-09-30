export const MAX_QUESTION_LENGTH = 800;
export const MAX_HISTORY_MESSAGES = 9;
export const MAX_ANSWER_LENGTH = 4_000;
export const MAX_BODY_BYTES = 16_384;

export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ChatEvent =
  | { type: "delta"; text: string }
  | { type: "done" }
  | { type: "error"; message: string };

export function parseMessages(value: unknown): ChatMessage[] | null {
  if (!value || typeof value !== "object" || !("messages" in value)) return null;
  const messages = value.messages;
  if (!Array.isArray(messages) || !messages.length || messages.length > MAX_HISTORY_MESSAGES || messages.length % 2 === 0) return null;
  const result: ChatMessage[] = [];
  let total = 0;
  for (let index = 0; index < messages.length; index++) {
    const message: unknown = messages[index];
    if (!message || typeof message !== "object" || !("role" in message) || !("content" in message)) return null;
    const role = index % 2 === 0 ? "user" : "assistant";
    if (message.role !== role || typeof message.content !== "string") return null;
    const content = message.content.trim();
    if (!content || content.length > (role === "user" ? MAX_QUESTION_LENGTH : MAX_ANSWER_LENGTH)) return null;
    total += content.length;
    if (total > 10_000) return null;
    result.push({ role, content });
  }
  return result;
}

import "server-only";
import type { ChatMessage } from "./contracts";
import { buildSystemPrompt, retrieveSources, userQuestions } from "./context";
import { approved, GENERATION_SCHEMA, obviousInjection, parseDraft, REVIEW_PROMPT, REVIEW_SCHEMA, SCOPE_REPLY, UNKNOWN_REPLY } from "./guardrails";
import { requestStructured } from "./provider";

export async function generateAnswer(key: string, messages: readonly ChatMessage[], signal: AbortSignal): Promise<string> {
  const questions = userQuestions(messages);
  if (questions.some(obviousInjection)) return SCOPE_REPLY;
  const sources = retrieveSources(messages);
  const draft = parseDraft(await requestStructured(key, buildSystemPrompt(), { questions, sources }, GENERATION_SCHEMA, "portfolio_answer", signal), sources, key);
  if (!draft || draft.status === "unknown") return UNKNOWN_REPLY;
  if (draft.status === "refuse") return SCOPE_REPLY;
  const cited = sources.filter((source) => draft.sourceIds.includes(source.id) || draft.sourceIds.some((id) => id.startsWith(`${source.id}-`)));
  const verdict = await requestStructured(key, REVIEW_PROMPT, { questions, draft: draft.answer, sources: cited }, REVIEW_SCHEMA, "portfolio_review", signal, 512);
  if (!approved(verdict)) return UNKNOWN_REPLY;
  const references = [...new Map(cited.map((source) => [source.href, source])).values()];
  return `${draft.answer}\n\nFuentes del portfolio:\n${references.map((source) => `${source.title}: ${source.href}`).join("\n")}`;
}

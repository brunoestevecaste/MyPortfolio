import "server-only";
import { createTranslator, type Locale } from "@/lib/i18n/shared";
import type { ChatMessage } from "./contracts";
import { buildSystemPrompt, retrieveSources, userQuestions } from "./context";
import { GENERATION_SCHEMA, obviousInjection, parseDraft, REVIEW_PROMPT, REVIEW_SCHEMA, SCOPE_REPLY, UNKNOWN_REPLY } from "./guardrails";
import { ProviderError, requestStructured } from "./provider";

export async function generateAnswer(key: string, messages: readonly ChatMessage[], signal: AbortSignal, locale?: Locale, t = createTranslator({})): Promise<string> {
  const languageInstruction = locale ? `\nIdioma seleccionado en el sitio: ${locale === "en" ? "inglés" : "español"}. Redacta la respuesta final en ese idioma.` : "";
  const questions = userQuestions(messages);
  if (questions.some(obviousInjection)) return t(SCOPE_REPLY);
  const sources = retrieveSources(messages);
  const draft = parseDraft(await requestStructured(key, buildSystemPrompt() + languageInstruction, { questions, sources }, GENERATION_SCHEMA, "portfolio_answer", signal), sources, key);
  // Invalid model output is a generation failure, not missing public knowledge.
  if (!draft) throw new ProviderError(502);
  if (draft.status === "refuse") return t(SCOPE_REPLY);
  // Give the review all retrieved evidence so it can correct omissions and
  // reconsider an early "unknown", within the existing two-call budget.
  const reviewed = parseDraft(await requestStructured(key, REVIEW_PROMPT + languageInstruction, { questions, draft, sources }, REVIEW_SCHEMA, "portfolio_review", signal), sources, key);
  if (!reviewed) throw new ProviderError(502);
  if (reviewed.status === "unknown") return t(UNKNOWN_REPLY);
  if (reviewed.status === "refuse") return t(SCOPE_REPLY);
  // Evidence is checked on the server; the visitor receives only the answer.
  return reviewed.answer;
}

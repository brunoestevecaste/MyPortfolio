// Optional smoke test. Sends only a public portfolio question to Groq.
// No keys, provider errors, prompts or responses are printed or persisted.
import { generateAnswer } from "../src/lib/chat/answer.ts";
import { SCOPE_REPLY, UNKNOWN_REPLY } from "../src/lib/chat/guardrails.ts";
import { ProviderError } from "../src/lib/chat/provider.ts";
const key = process.env.GROQ_API_KEY;
if (!key) {
  console.error("Falta GROQ_API_KEY. Configúrala en .env.local; no la pegues en la terminal ni en el chat.");
  process.exitCode = 1;
} else {
  try {
    const answer = await generateAnswer(key, [{ role: "user", content: "¿Cuál fue la contribución de Bruno en Alina?" }], AbortSignal.timeout(30000));
    if ([SCOPE_REPLY, UNKNOWN_REPLY].includes(answer) || !answer.includes("/projects/alina-asistente-empleo")) {
      console.error("Conexión completada, pero la respuesta no superó la comprobación esperada. Revisa modelo, fuentes y cuota antes de publicar.");
      process.exitCode = 1;
    } else console.log("OK: generación y revisión reales completadas. No se han impreso claves ni respuestas.");
  } catch (error) {
    console.error(error instanceof ProviderError && error.status === 429 ? "Cuota agotada. Espera antes de repetir." : "Prueba no completada. Comprueba conexión, clave, acceso al modelo y cuota en Groq.");
    process.exitCode = 1;
  }
}

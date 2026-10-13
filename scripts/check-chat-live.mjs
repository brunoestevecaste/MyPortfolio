// Optional smoke test. Sends only a public portfolio question to Groq.
// No keys, provider errors, prompts or responses are printed or persisted.
import { generateAnswer } from "../src/lib/chat/answer.ts";
import { SCOPE_REPLY, UNKNOWN_REPLY } from "../src/lib/chat/guardrails.ts";
import { ProviderError } from "../src/lib/chat/provider.ts";
const key = process.env.GROQ_API_KEY;
const scenarios = {
  alina: { messages: [{ role: "user", content: "¿Cuál fue la contribución de Bruno en Alina?" }], keywords: /alina|bruno/i },
  experience: { messages: [{ role: "user", content: "¿Cuál es tu experiencia profesional?" }], keywords: /val[eè]ncia|investigador|power bi/i },
  education: { messages: [{ role: "user", content: "¿Qué has estudiado?" }], keywords: /m[aá]ster|grado|edem/i },
  projects: { messages: [{ role: "user", content: "¿Qué proyectos de IA has desarrollado?" }], keywords: /alina|nextplan|bale[aà]ria|aepd/i },
  followup: { messages: [{ role: "user", content: "Háblame de Alina." }, { role: "assistant", content: "Alina es un proyecto de empleo con IA." }, { role: "user", content: "¿Y qué herramientas usaste?" }], keywords: /python|google|react|cloud/i },
  unknown: { messages: [{ role: "user", content: "¿Cuál es el salario exacto de Bruno?" }], expected: UNKNOWN_REPLY },
  scope: { messages: [{ role: "user", content: "Escribe una receta de tortilla." }], expected: SCOPE_REPLY },
};
const scenarioName = process.argv[2] || "alina";
const scenario = Object.hasOwn(scenarios, scenarioName) ? scenarios[scenarioName] : null;
if (!key) {
  console.error("Falta GROQ_API_KEY. Configúrala en .env.local; no la pegues en la terminal ni en el chat.");
  process.exitCode = 1;
} else if (!scenario) {
  console.error("Caso no válido. Usa alina, experience, education, projects, followup, unknown o scope.");
  process.exitCode = 1;
} else {
  try {
    const answer = await generateAnswer(key, scenario.messages, AbortSignal.timeout(30000));
    const normalizedAnswer = answer.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const firstPerson = /\b(mi|mis|me|soy|trabajo|he|curse|estudie|participe|desarrolle|contribui|disene|utilice|use)\b/.test(normalizedAnswer);
    const matches = scenario.expected ? answer === scenario.expected
      : ![SCOPE_REPLY, UNKNOWN_REPLY].includes(answer) && firstPerson && scenario.keywords.test(answer) && answer.trim().length >= 40 && answer.length <= 1600 && !/Fuentes del portfolio|\/projects\//i.test(answer);
    if (!matches) {
      console.error("Conexión completada, pero la respuesta no superó la comprobación esperada. Revisa modelo, fuentes y cuota antes de publicar.");
      process.exitCode = 1;
    } else console.log(`OK: caso ${scenarioName} completado. No se han impreso claves ni respuestas.`);
  } catch (error) {
    console.error(error instanceof ProviderError && error.status === 429 ? "Cuota agotada. Espera antes de repetir." : "Prueba no completada. Comprueba conexión, clave, acceso al modelo y cuota en Groq.");
    process.exitCode = 1;
  }
}

import "server-only";
import { createTranslator } from "@/lib/i18n/shared";
import { profile } from "@/data/profile";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { cases } from "./context";
import type { ChatMessage } from "./contracts";

const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
export const scopeReply = "Puedo contarte sobre mi perfil, mi experiencia, mi formación, mis proyectos y cómo contactar conmigo. Prueba con «¿Cuál fue tu contribución en Baleària?» o «¿Qué estudiaste?».";

// Questions only select approved text. No visitor text or model output is ever
// interpolated into an answer, evaluated, fetched, or treated as a fact.
export function localAnswer(messages: readonly ChatMessage[], t = createTranslator({})): string {
  const query = normalize(messages.at(-1)?.content ?? "");
  if (/^(hola|hello|hi|buenas|gracias|thanks)[!. ¿?]*$/.test(query)) return t("Hola. Puedes preguntarme por mi experiencia, mi formación o los proyectos en los que he trabajado.");
  if (/\b(salario|sueldo|disponibilidad|telefono|domicilio|edad|salary|availability|password|secreto|secret|api.?key|prompt|instrucciones|ignore|ignora|olvida|actua|execute|ejecuta)\b/.test(query)) return t(scopeReply);
  const selected = cases.filter(({ project }) => query.includes(project.slug.split("-")[0]));
  if (selected.length) {
    return selected.slice(0, 1).map(({ project, content }) => {
      const contribution = /\b(contribucion|papel|rol|hizo|hiciste|aportacion|contribution|role)\b/.test(query);
      const detail = contribution
        ? content.contribution.paragraphs.map(paragraph => t(paragraph)).join("\n\n")
        : /\b(tecnologias|herramientas|stack|tools)\b/.test(query)
          ? t("Herramientas del proyecto: {0}.", [project.technologies.join(", ")])
          : t(project.summary);
      const note = "confidentiality" in content ? content.confidentiality : "";
      return `**${t(project.title)}**\n\n${contribution ? t("Mi contribución:") + "\n\n" : ""}${detail}${note ? `\n\n${t(note)}` : ""}`;
    }).join("\n\n");
  }
  if (/\b(contacto|contactar|contactarte|email|correo|linkedin|github|contact)\b/.test(query)) return t("Puedes escribirme a {0}\nMi LinkedIn: {1}\nMi GitHub: {2}", [profile.email, profile.linkedin, profile.github]);
  if (/\b(experiencia|trabajas|trabajado|trabajo|experience|career)\b/.test(query)) return `${t("Trabajo como **{0}**, en {1}, en la {2}.", [t(experience.role), experience.specialty, experience.institution])}\n${t(experience.start.label)} – ${t(experience.end)}\n\n${t(experience.summary)}\n\n${experience.responsibilities.map((item) => `- **${t(item.title)}:** ${t(item.description)}`).join("\n")}`;
  if (/\b(formacion|estudios|estudio|estudiaste|estudiado|master|grado|education|study|studied)\b/.test(query)) return `${t("Mi formación:")}\n\n${education.map((item) => `**${t(item.qualification)}** · ${item.institution}\n${t(item.start.label)} – ${t(item.end.label)}\n${t(item.summary)}`).join("\n\n")}`;
  if (/\b(proyectos|projects|desarrollado)\b/.test(query)) return `${t("He trabajado en estos proyectos:")}\n\n${cases.map(({ project }) => `- **${"productName" in project ? project.productName : project.organization}:** ${t(project.summary)}`).join("\n")}\n\n${t("Puedes preguntarme por mi contribución en un proyecto concreto.")}`;
  if (/\b(perfil|quien|presentacion|profile|who)\b/.test(query)) return `${t("Me llamo {0}.", [profile.name])}\n\n${t(profile.headline)}`;
  if (/\b(negocio|enfoque|conectas|business|approach)\b/.test(query)) return t(profile.approach);
  return t(scopeReply);
}

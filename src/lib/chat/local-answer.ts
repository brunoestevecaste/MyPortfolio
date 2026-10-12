import "server-only";
import { profile } from "@/data/profile";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { cases } from "./context";
import type { ChatMessage } from "./contracts";

const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
export const scopeReply = "Solo puedo consultar el contenido público del portfolio de Bruno: perfil, experiencia, formación, proyectos y contacto. Prueba con «¿Cuál fue su contribución en Baleària?» o «¿Qué estudió?». Si el dato no está publicado, contacta directamente con Bruno.";

// Questions only select approved text. No visitor text or model output is ever
// interpolated into an answer, evaluated, fetched, or treated as a fact.
export function localAnswer(messages: readonly ChatMessage[]): string {
  const query = normalize(messages.at(-1)?.content ?? "");
  if (/^(hola|hello|hi|buenas|gracias|thanks)[!. ¿?]*$/.test(query)) return "Hola. Soy el asistente del portfolio de Bruno. Puedes preguntarme por sus proyectos, experiencia, formación o contacto.";
  if (/\b(salario|sueldo|disponibilidad|telefono|domicilio|edad|salary|availability|password|secreto|secret|api.?key|prompt|instrucciones|ignore|ignora|olvida|actua|execute|ejecuta)\b/.test(query)) return scopeReply;
  const selected = cases.filter(({ project }) => query.includes(project.slug.split("-")[0]));
  if (selected.length) {
    return selected.slice(0, 1).map(({ project, content }) => {
      const detail = /\b(contribucion|papel|rol|hizo|hiciste|aportacion|contribution|role)\b/.test(query)
        ? content.contribution.paragraphs.join("\n\n")
        : /\b(tecnologias|herramientas|stack|tools)\b/.test(query)
          ? `Herramientas del proyecto: ${project.technologies.join(", ")}.`
          : project.summary;
      const note = "confidentiality" in content ? content.confidentiality : "";
      return `${project.title}\n\nExtracto del portfolio (la primera persona se refiere a Bruno):\n${detail}\n\n${note}\n\nCaso completo: /projects/${project.slug}`;
    }).join("\n\n");
  }
  if (/\b(contacto|contactar|contactarte|email|correo|linkedin|github|contact)\b/.test(query)) return `Puedes contactar con Bruno en ${profile.email}\nLinkedIn: ${profile.linkedin}\nGitHub: ${profile.github}`;
  if (/\b(experiencia|trabajas|trabajado|trabajo|experience|career)\b/.test(query)) return `${experience.role} · ${experience.specialty}\n${experience.institution} · ${experience.start.label} – ${experience.end}\n\nResponsabilidades publicadas:\n${experience.responsibilities.map((item) => `${item.title}: ${item.description}`).join("\n\n")}`;
  if (/\b(formacion|estudios|estudio|estudiaste|estudiado|master|grado|education|study|studied)\b/.test(query)) return education.map((item) => `${item.qualification} · ${item.institution}\n${item.start.label} – ${item.end.label}\n${item.summary}`).join("\n\n");
  if (/\b(proyectos|projects|desarrollado)\b/.test(query)) return `Proyectos publicados:\n\n${cases.map(({ project }) => `${"productName" in project ? project.productName : project.organization}: ${project.summary}\n/projects/${project.slug}`).join("\n\n")}\n\nPregunta por un proyecto concreto para conocer la contribución de Bruno.`;
  if (/\b(perfil|quien|presentacion|profile|who)\b/.test(query)) return `${profile.name} · ${profile.title}\n\n${profile.headline}`;
  if (/\b(negocio|enfoque|conectas|business|approach)\b/.test(query)) return `Bruno describe así su enfoque en el portfolio:\n\n${profile.approach}`;
  return scopeReply;
}

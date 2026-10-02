import { alinaDataUses, alinaInputs } from "@/data/alina";
import styles from "./project-architecture.module.css";

export function AlinaArchitecture() {
  return (
    <figure
      className={styles.architecture}
      aria-labelledby="alina-arch-title"
      aria-describedby="alina-arch-desc"
    >
      <figcaption className={styles.architectureHeader}>
        <h3 id="alina-arch-title">Tres entradas, un backend unificado con agentes</h3>
        <p id="alina-arch-desc" className="sr-only">
          El currículum del candidato, la búsqueda automatizada con scraping y el pegado manual
          convergen en la API de FastAPI. Google ADK con Gemini 2.5 Flash procesa y deriva los datos
          hacia el cálculo del Match Score y cuatro agentes especializados de preparación.
        </p>
      </figcaption>

      <div>
        <ul className={styles.inputs} aria-label="Fuentes y caminos de entrada">
          {alinaInputs.map((input) => (
            <li className={styles.input} key={input.title}>
              <h4>{input.title}</h4>
              <ol className={styles.inputSteps} aria-label={`Entrada de ${input.title.toLowerCase()}`}>
                {input.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </li>
          ))}
        </ul>

        <div className={styles.convergence} aria-hidden="true" />
        <p className={styles.flowLabel}>Ingesta y normalización</p>

        <div className={styles.sharedData}>
          <div className={styles.dataNode}>
            <h4>FastAPI</h4>
            <p>Python 3.11</p>
            <span>Gateway asíncrono y SSE</span>
          </div>
          <div className={styles.transformArrow} aria-hidden="true" />
          <div className={styles.dataNode}>
            <h4>Google ADK</h4>
            <p>Gemini 2.5 Flash</p>
            <span>Orquestación multi-agente</span>
          </div>
        </div>

        <p className={styles.flowLabel}>Un backend de agentes, dos vías de salida</p>
        <div className={styles.distribution} aria-hidden="true" />

        <ul className={styles.consumers} aria-label="Salidas del sistema de IA">
          {alinaDataUses.map((use) => (
            <li className={styles.consumer} key={use.title}>
              <h4>{use.title}</h4>
              <p className={styles.service}>{use.service}</p>
              <p className={styles.action}>{use.action}</p>
              <div className={styles.outcomeArrow} aria-hidden="true" />
              <strong className={styles.outcome}>{use.outcome}</strong>
              {"audience" in use && <p className={styles.audience}>{use.audience}</p>}
            </li>
          ))}
        </ul>
      </div>

      <dl className={styles.flowSupport} aria-label="Infraestructura y seguridad">
        <div>
          <dt>Docker & FastAPI</dt>
          <dd>Despliegue modular reproducible y endpoints asíncronos</dd>
        </div>
        <div>
          <dt>Guardrails de fidelidad</dt>
          <dd>Verificación estricta contra el CV para eliminar alucinaciones</dd>
        </div>
      </dl>
    </figure>
  );
}

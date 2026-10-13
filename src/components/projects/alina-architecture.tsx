import { getTranslations } from "@/lib/i18n/server";
import { alinaDataUses, alinaInputs } from "@/data/alina";
import styles from "./project-architecture.module.css";

export async function AlinaArchitecture() {
  const { t } = await getTranslations();
  return (
    <figure
      className={styles.architecture}
      aria-labelledby="alina-arch-title"
      aria-describedby="alina-arch-desc"
    >
      <figcaption className={styles.architectureHeader}>
        <h3 id="alina-arch-title">{t("Tres entradas, un backend unificado con agentes")}</h3>
        <p id="alina-arch-desc" className="sr-only">
          {t("El currículum del candidato, la búsqueda automatizada con scraping y el pegado manual convergen en la API de FastAPI. Google ADK con Gemini 2.5 Flash procesa y deriva los datos hacia el cálculo del Match Score y cuatro agentes especializados de preparación.")}</p>
      </figcaption>

      <div>
        <ul className={styles.inputs} aria-label={t("Fuentes y caminos de entrada")}>
          {alinaInputs.map((input) => (
            <li className={styles.input} key={input.title}>
              <h4>{t(input.title)}</h4>
              <ol className={styles.inputSteps} aria-label={t("Entrada de {0}", [t(input.title.toLowerCase())])}>
                {input.steps.map((step) => <li key={step}>{t(step)}</li>)}
              </ol>
            </li>
          ))}
        </ul>

        <div className={styles.convergence} aria-hidden="true" />
        <p className={styles.flowLabel}>{t("Ingesta y normalización")}</p>

        <div className={styles.sharedData}>
          <div className={styles.dataNode}>
            <h4>{t("FastAPI")}</h4>
            <p>{t("Python 3.11")}</p>
            <span>{t("Gateway asíncrono y SSE")}</span>
          </div>
          <div className={styles.transformArrow} aria-hidden="true" />
          <div className={styles.dataNode}>
            <h4>{t("Google ADK")}</h4>
            <p>{t("Gemini 2.5 Flash")}</p>
            <span>{t("Orquestación multi-agente")}</span>
          </div>
        </div>

        <p className={styles.flowLabel}>{t("Un backend de agentes, dos vías de salida")}</p>
        <div className={styles.distribution} aria-hidden="true" />

        <ul className={styles.consumers} aria-label={t("Salidas del sistema de IA")}>
          {alinaDataUses.map((use) => (
            <li className={styles.consumer} key={use.title}>
              <h4>{t(use.title)}</h4>
              <p className={styles.service}>{t(use.service)}</p>
              <p className={styles.action}>{t(use.action)}</p>
              <div className={styles.outcomeArrow} aria-hidden="true" />
              <strong className={styles.outcome}>{t(use.outcome)}</strong>
              {"audience" in use && <p className={styles.audience}>{t(use.audience)}</p>}
            </li>
          ))}
        </ul>
      </div>

      <dl className={styles.flowSupport} aria-label={t("Infraestructura y seguridad")}>
        <div>
          <dt>{t("Docker & FastAPI")}</dt>
          <dd>{t("Despliegue modular reproducible y endpoints asíncronos")}</dd>
        </div>
        <div>
          <dt>{t("Guardrails de fidelidad")}</dt>
          <dd>{t("Verificación estricta contra el CV para eliminar alucinaciones")}</dd>
        </div>
      </dl>
    </figure>
  );
}

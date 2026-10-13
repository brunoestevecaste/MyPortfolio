import { getTranslations } from "@/lib/i18n/server";
import { nextplanDataUses, nextplanInputs } from "@/data/nextplan";
import styles from "./project-architecture.module.css";

export async function NextPlanArchitecture() {
  const { t } = await getTranslations();
  return (
    <figure
      className={styles.architecture}
      aria-labelledby="nextplan-arch-title"
      aria-describedby="nextplan-arch-desc"
    >
      <figcaption className={styles.architectureHeader}>
        <h3 id="nextplan-arch-title">{t("Tres vías de entrada, un almacén analítico y dos motores de IA")}</h3>
        <p id="nextplan-arch-desc" className="sr-only">
          {t("El catálogo batch desde Ticketmaster mediante Dataflow, los eventos de swipes en streaming vía Pub/Sub y el feedback post-evento convergen en BigQuery. La herramienta dbt procesa las características de usuario para alimentar el recomendador K-Means y el asistente conversacional con RAG.")}</p>
      </figcaption>

      <div>
        <ul className={styles.inputs} aria-label={t("Fuentes y caminos de entrada")}>
          {nextplanInputs.map((input) => (
            <li className={styles.input} key={input.title}>
              <h4>{t(input.title)}</h4>
              <ol className={styles.inputSteps} aria-label={t("Entrada de {0}", [t(input.title.toLowerCase())])}>
                {input.steps.map((step) => <li key={step}>{t(step)}</li>)}
              </ol>
            </li>
          ))}
        </ul>

        <div className={styles.convergence} aria-hidden="true" />
        <p className={styles.flowLabel}>{t("Almacenamiento analítico unificado")}</p>

        <div className={styles.sharedData}>
          <div className={styles.dataNode}>
            <h4>{t("BigQuery")}</h4>
            <p>{t("Google Cloud Platform")}</p>
            <span>{t("Catálogo, vectores e interacción")}</span>
          </div>
          <div className={styles.transformArrow} aria-hidden="true" />
          <div className={styles.dataNode}>
            <h4>{t("dbt")}</h4>
            <p>{t("Cloud Run Jobs")}</p>
            <span>{t("Feature Store 30d y 90d")}</span>
          </div>
        </div>

        <p className={styles.flowLabel}>{t("Una base analítica, dos motores inteligentes")}</p>
        <div className={styles.distribution} aria-hidden="true" />

        <ul className={styles.consumers} aria-label={t("Usos de la base analítica")}>
          {nextplanDataUses.map((use) => (
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

      <dl className={styles.flowSupport} aria-label={t("Infraestructura y cumplimiento")}>
        <div>
          <dt>{t("Terraform (20 módulos)")}</dt>
          <dd>{t("Infraestructura como código completamente automatizada en GCP")}</dd>
        </div>
        <div>
          <dt>{t("Seguridad y RGPD")}</dt>
          <dd>{t("11 workflows CI/CD en GitHub Actions y registro de auditoría Art. 32")}</dd>
        </div>
      </dl>
    </figure>
  );
}

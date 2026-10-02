import { nextplanDataUses, nextplanInputs } from "@/data/nextplan";
import styles from "./project-architecture.module.css";

export function NextPlanArchitecture() {
  return (
    <figure
      className={styles.architecture}
      aria-labelledby="nextplan-arch-title"
      aria-describedby="nextplan-arch-desc"
    >
      <figcaption className={styles.architectureHeader}>
        <h3 id="nextplan-arch-title">Tres vías de entrada, un almacén analítico y dos motores de IA</h3>
        <p id="nextplan-arch-desc" className="sr-only">
          El catálogo batch desde Ticketmaster mediante Dataflow, los eventos de swipes en streaming
          vía Pub/Sub y el feedback post-evento convergen en BigQuery. La herramienta dbt procesa
          las características de usuario para alimentar el recomendador K-Means y el asistente conversacional con RAG.
        </p>
      </figcaption>

      <div>
        <ul className={styles.inputs} aria-label="Fuentes y caminos de entrada">
          {nextplanInputs.map((input) => (
            <li className={styles.input} key={input.title}>
              <h4>{input.title}</h4>
              <ol className={styles.inputSteps} aria-label={`Entrada de ${input.title.toLowerCase()}`}>
                {input.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </li>
          ))}
        </ul>

        <div className={styles.convergence} aria-hidden="true" />
        <p className={styles.flowLabel}>Almacenamiento analítico unificado</p>

        <div className={styles.sharedData}>
          <div className={styles.dataNode}>
            <h4>BigQuery</h4>
            <p>Google Cloud Platform</p>
            <span>Catálogo, vectores e interacción</span>
          </div>
          <div className={styles.transformArrow} aria-hidden="true" />
          <div className={styles.dataNode}>
            <h4>dbt</h4>
            <p>Cloud Run Jobs</p>
            <span>Feature Store 30d y 90d</span>
          </div>
        </div>

        <p className={styles.flowLabel}>Una base analítica, dos motores inteligentes</p>
        <div className={styles.distribution} aria-hidden="true" />

        <ul className={styles.consumers} aria-label="Usos de la base analítica">
          {nextplanDataUses.map((use) => (
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

      <dl className={styles.flowSupport} aria-label="Infraestructura y cumplimiento">
        <div>
          <dt>Terraform (20 módulos)</dt>
          <dd>Infraestructura como código completamente automatizada en GCP</dd>
        </div>
        <div>
          <dt>Seguridad y RGPD</dt>
          <dd>11 workflows CI/CD en GitHub Actions y registro de auditoría Art. 32</dd>
        </div>
      </dl>
    </figure>
  );
}

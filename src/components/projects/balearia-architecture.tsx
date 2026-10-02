import { baleariaDataUses, baleariaInputs } from "@/data/balearia";
import styles from "./balearia.module.css";

export function BaleariaArchitecture() {
  return (
    <figure
      className={styles.architecture}
      aria-labelledby="cloud-title"
      aria-describedby="cloud-description"
    >
      <figcaption className={styles.architectureHeader}>
        <h3 id="cloud-title">Tres fuentes, una misma cadena de datos</h3>
        <p id="cloud-description" className="sr-only">
          El histórico, la telemetría simulada y el contexto ambiental convergen
          en Cloud SQL. dbt transforma y valida esa base para dos usos en
          paralelo: predicción y optimización, y consulta en el dashboard.
          Las flechas indican la dirección de los datos.
        </p>
      </figcaption>

      <div>
        <ul className={styles.inputs} aria-label="Fuentes y caminos de entrada">
          {baleariaInputs.map((input) => (
            <li className={styles.input} key={input.title}>
              <h4>{input.title}</h4>
              <ol className={styles.inputSteps} aria-label={`Entrada de ${input.title.toLowerCase()}`}>
                {input.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </li>
          ))}
        </ul>

        <div className={styles.convergence} aria-hidden="true" />
        <p className={styles.flowLabel}>Reunir los datos</p>

        <div className={styles.sharedData}>
          <div className={styles.dataNode}>
            <h4>Cloud SQL</h4>
            <p>PostgreSQL</p>
            <span>Datos integrados</span>
          </div>
          <div className={styles.transformArrow} aria-hidden="true" />
          <div className={styles.dataNode}>
            <h4>dbt</h4>
            <p>Transformación y validación</p>
            <span>Modelos analíticos</span>
          </div>
        </div>

        <p className={styles.flowLabel}>Una base preparada, dos usos</p>
        <div className={styles.distribution} aria-hidden="true" />

        <ul className={styles.consumers} aria-label="Usos de la base analítica">
          {baleariaDataUses.map((use) => (
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

      <dl className={styles.flowSupport} aria-label="Coordinación e infraestructura">
        <div>
          <dt>Cloud Composer / Airflow</dt>
          <dd>Coordina datos externos y transformaciones</dd>
        </div>
        <div>
          <dt>Terraform</dt>
          <dd>Define y reproduce la infraestructura</dd>
        </div>
      </dl>
    </figure>
  );
}

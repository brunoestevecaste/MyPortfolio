import { getTranslations } from "@/lib/i18n/server";
import { baleariaDataUses, baleariaInputs } from "@/data/balearia";
import styles from "./balearia.module.css";

export async function BaleariaArchitecture() {
  const { t } = await getTranslations();
  return (
    <figure
      className={styles.architecture}
      aria-labelledby="cloud-title"
      aria-describedby="cloud-description"
    >
      <figcaption className={styles.architectureHeader}>
        <h3 id="cloud-title">{t("Tres fuentes, una misma cadena de datos")}</h3>
        <p id="cloud-description" className="sr-only">
          {t("El histórico, la telemetría simulada y el contexto ambiental convergen en Cloud SQL. dbt transforma y valida esa base para dos usos en paralelo: predicción y optimización, y consulta en el dashboard. Las flechas indican la dirección de los datos.")}</p>
      </figcaption>

      <div>
        <ul className={styles.inputs} aria-label={t("Fuentes y caminos de entrada")}>
          {baleariaInputs.map((input) => (
            <li className={styles.input} key={input.title}>
              <h4>{t(input.title)}</h4>
              <ol className={styles.inputSteps} aria-label={t("Entrada de {0}", [t(input.title.toLowerCase())])}>
                {input.steps.map((step) => <li key={step}>{t(step)}</li>)}
              </ol>
            </li>
          ))}
        </ul>

        <div className={styles.convergence} aria-hidden="true" />
        <p className={styles.flowLabel}>{t("Reunir los datos")}</p>

        <div className={styles.sharedData}>
          <div className={styles.dataNode}>
            <h4>{t("Cloud SQL")}</h4>
            <p>{t("PostgreSQL")}</p>
            <span>{t("Datos integrados")}</span>
          </div>
          <div className={styles.transformArrow} aria-hidden="true" />
          <div className={styles.dataNode}>
            <h4>{t("dbt")}</h4>
            <p>{t("Transformación y validación")}</p>
            <span>{t("Modelos analíticos")}</span>
          </div>
        </div>

        <p className={styles.flowLabel}>{t("Una base preparada, dos usos")}</p>
        <div className={styles.distribution} aria-hidden="true" />

        <ul className={styles.consumers} aria-label={t("Usos de la base analítica")}>
          {baleariaDataUses.map((use) => (
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

      <dl className={styles.flowSupport} aria-label={t("Coordinación e infraestructura")}>
        <div>
          <dt>{t("Cloud Composer / Airflow")}</dt>
          <dd>{t("Coordina datos externos y transformaciones")}</dd>
        </div>
        <div>
          <dt>{t("Terraform")}</dt>
          <dd>{t("Define y reproduce la infraestructura")}</dd>
        </div>
      </dl>
    </figure>
  );
}

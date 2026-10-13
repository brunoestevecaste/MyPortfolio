import { getTranslations } from "@/lib/i18n/server";
import { aepdDataUses, aepdSource } from "@/data/aepd";
import styles from "./project-architecture.module.css";

export async function AepdArchitecture() {
  const { t } = await getTranslations();
  return (
    <figure
      className={styles.architecture}
      aria-labelledby="aepd-arch-title"
      aria-describedby="aepd-arch-desc"
    >
      <figcaption className={styles.architectureHeader}>
        <h3 id="aepd-arch-title">{t("Fuente única de logs, proceso ETL previo y dos soluciones en producción")}</h3>
        <p id="aepd-arch-desc" className="sr-only">
          {t("Los registros brutos de servidores web constituyen la única fuente de datos del sistema. Pentaho Data Integration ejecuta en primer lugar el proceso ETL depurando más del 40% de tráfico espurio y bots, y reconstruyendo sesiones ciudadanas. Los datos limpios se cargan a continuación en PostgreSQL bajo un esquema dimensional en estrella, que actúa como fuente única para dos salidas: el cuadro de mando descriptivo en Power BI y el modelo predictivo de demanda horaria en Python con XGBoost.")}</p>
      </figcaption>

      <div>
        <div className={styles.singleSource} aria-label={t("Fuente de datos de entrada")}>
          <p className={styles.sourceKicker}>{t(aepdSource.kicker)}</p>
          <h4>{t(aepdSource.title)}</h4>
          <p className={styles.sourceText}>{t(aepdSource.description)}</p>
        </div>

        <div className={styles.sourceConnector} aria-hidden="true">
          <div className={styles.sourceConnectorArrow} />
        </div>
        <p className={styles.flowLabel}>{t("Extracción y depuración ETL previa a la base de datos")}</p>

        <div className={styles.sharedData}>
          <div className={styles.dataNode}>
            <h4>{t("Pentaho")}</h4>
            <p>{t("Proceso ETL previo")}</p>
            <span>{t("Filtrado de bots (>40%) y reconstrucción de sesiones")}</span>
          </div>
          <div className={styles.transformArrow} aria-hidden="true" />
          <div className={styles.dataNode}>
            <h4>{t("PostgreSQL")}</h4>
            <p>{t("Almacén dimensional")}</p>
            <span>{t("Esquema estrella (Hechos y dimensiones)")}</span>
          </div>
        </div>

        <p className={styles.flowLabel}>{t("Almacén dimensional como base común para dos soluciones")}</p>
        <div className={styles.distribution} aria-hidden="true" />

        <ul className={styles.consumers} aria-label={t("Soluciones analíticas y predictivas")}>
          {aepdDataUses.map((use) => (
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
    </figure>
  );
}

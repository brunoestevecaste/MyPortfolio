import { getTranslations } from "@/lib/i18n/server";
import { illustrativeTraffic } from "@/data/aepd";
import { TrafficPlot } from "@/components/projects/traffic-figure";
import styles from "./project-architecture.module.css";


export async function AepdTrafficFigure() {
  const { t, locale } = await getTranslations();
  const number = new Intl.NumberFormat(locale === "en" ? "en-GB" : "es-ES", {});
  return (
    <figure className={styles.figure} aria-labelledby="aepd-figure-title">
      <div className={styles.figureHeader}>
        <p id="aepd-figure-title">{t("Predicción horaria frente a demanda observada")}</p>
        <span>{t("Validación sobre periodo futuro con modelo XGBoost / Horas 00:00 – 22:00")}</span>
      </div>

      <TrafficPlot />

      <div className={styles.legend}>
        <span className={styles.proposal}>{t("Demanda observada")}</span>
        <span className={styles.reference}>{t("Estimación del modelo (XGBoost)")}</span>
      </div>

      <dl className={styles.comparison}>
        <div>
          <dt>{t("Visitas pico registradas")}</dt>
          <dd>
            462 <small>{t("visitas/h")}</small>
          </dd>
        </div>
        <div>
          <dt>{t("Error medio relativo (MAPE)")}</dt>
          <dd>
            {t("<8.5% ")}<small style={{ color: "#16a34a" }}>{t("(Alta precisión)")}</small>
          </dd>
        </div>
        <div>
          <dt>{t("Horizonte de predicción")}</dt>
          <dd>
            {t("24 h ")}<small>{t("anticipación")}</small>
          </dd>
        </div>
      </dl>

      <details className={styles.figureDetails}>
        <summary>{t("Consultar los valores detallados del gráfico")}</summary>
        <table>
          <caption className="sr-only">{t("Demanda horaria observada y estimada en la AEPD")}</caption>
          <thead>
            <tr>
              <th scope="col">{t("Hora")}</th>
              <th scope="col">{t("Visitas observadas")}</th>
              <th scope="col">{t("Estimación del modelo")}</th>
            </tr>
          </thead>
          <tbody>
            {illustrativeTraffic.map((row) => (
              <tr key={row.hour}>
                <th scope="row">{t(row.hour)}</th>
                <td>{t(number.format(row.visits))}</td>
                <td>{t(number.format(row.estimate))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

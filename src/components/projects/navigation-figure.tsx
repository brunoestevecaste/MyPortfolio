import { getTranslations } from "@/lib/i18n/server";
import { illustrativeNavigation } from "@/data/balearia";
import { NavigationPlot } from "@/components/charts/navigation-plot";
import styles from "./balearia.module.css";


function duration(key: "reference" | "proposal") {
  const minutes = Math.round(illustrativeNavigation.reduce(
    (total, segment) => total + segment.distance / segment[key] * 60, 0,
  ));
  return `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
}

export async function NavigationFigure() {
  const { t, locale } = await getTranslations();
  const number = new Intl.NumberFormat(locale === "en" ? "en-GB" : "es-ES", { maximumFractionDigits: 1 });
  return (
    <figure className={styles.navigationFigure} aria-labelledby="navigation-caption">
      <div className={styles.figureHeader}>
        <p id="navigation-caption">{t("Una travesía ficticia, dos perfiles")}</p>
        <span>{t("Velocidad en nudos / tramos A–F")}</span>
      </div>
      <NavigationPlot interactive />
      <div className={styles.legend}>
        <span className={styles.reference}>{t("Referencia constante")}</span>
        <span className={styles.proposal}>{t("Propuesta ilustrativa")}</span>
      </div>
      <dl className={styles.comparison}>
        <div><dt>{t("Tiempo de referencia")}</dt><dd>{t(duration("reference"))}</dd></div>
        <div><dt>{t("Tiempo de la propuesta")}</dt><dd>{t(duration("proposal"))}</dd></div>
        <div><dt>{t("Tiempo disponible")}</dt><dd>{t("4 h 45 min")}</dd></div>
      </dl>
      <details className={styles.figureDetails}>
        <summary>{t("Consultar los valores del gráfico")}</summary>
        <table>
          <caption className="sr-only">{t("Velocidades ficticias por tramo, en nudos")}</caption>
          <thead><tr><th scope="col">{t("Tramo")}</th><th scope="col">{t("Referencia")}</th><th scope="col">{t("Propuesta")}</th></tr></thead>
          <tbody>
            {illustrativeNavigation.map((segment) => (
              <tr key={segment.segment}>
                <th scope="row">{t(segment.segment)}</th>
                <td>{t(number.format(segment.reference))}</td>
                <td>{t(number.format(segment.proposal))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

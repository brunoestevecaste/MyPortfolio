import { illustrativeNavigation } from "@/data/balearia";
import { NavigationPlot } from "@/components/charts/navigation-plot";
import styles from "./balearia.module.css";

const number = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 });

function duration(key: "reference" | "proposal") {
  const minutes = Math.round(illustrativeNavigation.reduce(
    (total, segment) => total + segment.distance / segment[key] * 60, 0,
  ));
  return `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
}

export function NavigationFigure() {
  return (
    <figure className={styles.navigationFigure} aria-labelledby="navigation-caption">
      <div className={styles.figureHeader}>
        <p>Una travesía ficticia, dos perfiles</p>
        <span>Velocidad en nudos / tramos A–F</span>
      </div>
      <NavigationPlot interactive />
      <div className={styles.legend}>
        <span className={styles.reference}>Referencia constante</span>
        <span className={styles.proposal}>Propuesta ilustrativa</span>
      </div>
      <dl className={styles.comparison}>
        <div><dt>Tiempo de referencia</dt><dd>{duration("reference")}</dd></div>
        <div><dt>Tiempo de la propuesta</dt><dd>{duration("proposal")}</dd></div>
        <div><dt>Tiempo disponible</dt><dd>4 h 45 min</dd></div>
      </dl>
      <figcaption id="navigation-caption">
        Ejemplo con datos ficticios. Cada tramo mide 12 millas náuticas. Los tiempos
        se calculan como distancia / velocidad y se redondean al minuto. Ambos
        perfiles caben en el tiempo disponible; para elegir el de menor energía
        harían falta el modelo de potencia, el contexto ambiental y las reservas
        operativas. Este gráfico explica la decisión, no demuestra ahorro.
      </figcaption>
      <details className={styles.figureDetails}>
        <summary>Consultar los valores del gráfico</summary>
        <table>
          <caption className="sr-only">Velocidades ficticias por tramo, en nudos</caption>
          <thead><tr><th scope="col">Tramo</th><th scope="col">Referencia</th><th scope="col">Propuesta</th></tr></thead>
          <tbody>
            {illustrativeNavigation.map((segment) => (
              <tr key={segment.segment}>
                <th scope="row">{segment.segment}</th>
                <td>{number.format(segment.reference)}</td>
                <td>{number.format(segment.proposal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

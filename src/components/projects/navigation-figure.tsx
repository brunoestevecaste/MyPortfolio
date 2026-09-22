import { illustrativeNavigation } from "@/data/balearia";
import styles from "./balearia.module.css";

const number = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 });

// A step plot represents a constant speed within each fictional segment.
function speedPath(key: "reference" | "proposal") {
  return illustrativeNavigation.map((segment, index) => {
    const x = 48 + index * 64;
    const y = 164 - (segment[key] - 14) * 38;
    return `${index === 0 ? "M" : "L"}${x},${y} H${x + 64}`;
  }).join(" ");
}

export function NavigationPlot() {
  return (
    <div className={styles.plotFrame}>
    <svg viewBox="0 0 464 208" className={styles.plot} aria-hidden="true">
      {[14, 16, 18].map((speed) => (
        <g key={speed}>
          <path d={`M48 ${164 - (speed - 14) * 38} H432`} stroke="var(--line)" />
          <text x="30" y={168 - (speed - 14) * 38} textAnchor="end" fill="var(--muted)" fontSize="17">{speed}</text>
        </g>
      ))}
      <path d={speedPath("reference")} fill="none" stroke="var(--muted)" strokeWidth="2.5" strokeDasharray="6 5" />
      <path d={speedPath("proposal")} fill="none" stroke="var(--signal)" strokeWidth="3" />
      {illustrativeNavigation.map((segment, index) => (
        <text key={segment.segment} x={80 + index * 64} y="196" textAnchor="middle" fill="var(--muted)" fontSize="17">{segment.segment}</text>
      ))}
    </svg>
    </div>
  );
}

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
      <NavigationPlot />
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

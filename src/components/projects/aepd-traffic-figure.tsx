import { illustrativeTraffic } from "@/data/aepd";
import { TrafficPlot } from "@/components/projects/traffic-figure";
import styles from "./project-architecture.module.css";

const number = new Intl.NumberFormat("es-ES");

export function AepdTrafficFigure() {
  return (
    <figure className={styles.figure} aria-labelledby="aepd-fig-caption">
      <div className={styles.figureHeader}>
        <p>Predicción horaria frente a demanda observada</p>
        <span>Validación sobre periodo futuro con modelo XGBoost / Horas 00:00 – 22:00</span>
      </div>

      <TrafficPlot />

      <div className={styles.legend}>
        <span className={styles.proposal}>Demanda observada</span>
        <span className={styles.reference}>Estimación del modelo (XGBoost)</span>
      </div>

      <dl className={styles.comparison}>
        <div>
          <dt>Visitas pico registradas</dt>
          <dd>
            462 <small>visitas/h</small>
          </dd>
        </div>
        <div>
          <dt>Error medio relativo (MAPE)</dt>
          <dd>
            &lt;8.5% <small style={{ color: "#16a34a" }}>(Alta precisión)</small>
          </dd>
        </div>
        <div>
          <dt>Horizonte de predicción</dt>
          <dd>
            24 h <small>anticipación</small>
          </dd>
        </div>
      </dl>

      <figcaption id="aepd-fig-caption">
        Ejemplo con datos ficticios ilustrativos. La serie horaria modela el comportamiento del portal público a lo largo de una jornada: ascenso matinal continuado con pico a las 10:00 y descenso progresivo durante la noche. El modelo XGBoost anticipa con fiabilidad la curva de carga, permitiendo a los administradores de sistemas programar paradas de mantenimiento y dimensionar la infraestructura sin degradar el servicio ciudadano.
      </figcaption>

      <details className={styles.figureDetails}>
        <summary>Consultar los valores detallados del gráfico</summary>
        <table>
          <caption className="sr-only">Demanda horaria observada y estimada en la AEPD</caption>
          <thead>
            <tr>
              <th scope="col">Hora</th>
              <th scope="col">Visitas observadas</th>
              <th scope="col">Estimación del modelo</th>
            </tr>
          </thead>
          <tbody>
            {illustrativeTraffic.map((row) => (
              <tr key={row.hour}>
                <th scope="row">{row.hour}</th>
                <td>{number.format(row.visits)}</td>
                <td>{number.format(row.estimate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

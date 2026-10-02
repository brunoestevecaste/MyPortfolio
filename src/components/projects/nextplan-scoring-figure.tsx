import { nextplanClusters, nextplanScoringFactors } from "@/data/nextplan";
import styles from "./project-architecture.module.css";

export function NextPlanScoringFigure() {
  return (
    <figure className={styles.figure} aria-labelledby="nextplan-fig-caption">
      <div className={styles.figureHeader}>
        <p>Segmentación K-Means y scoring multivariable</p>
        <span>Afinidad por cercanía de centroides y bonificaciones contextuales</span>
      </div>

      <div className={styles.figureStepGrid}>
        <div className={styles.figureStepCard}>
          <h5>1. Expansión entre centroides (K-Means)</h5>
          <p>
            Para evitar que el usuario quede atrapado en una burbuja de repetición donde solo reciba eventos idénticos, el sistema calcula distancias euclídeas entre centroides de clúster: asigna peso <strong>1.00</strong> al clúster propio, pero expande con pesos de <strong>0.60</strong>, <strong>0.40</strong> y <strong>0.25</strong> hacia comunidades de gustos vecinas.
          </p>
        </div>
        <div className={styles.figureStepCard}>
          <h5>2. Fórmula multivariable de candidatos</h5>
          <p>
            <code>Score = (Peso_Clúster × Afinidad_Base) + Home_City_Boost + Urgency_Boost</code>
            <br />
            Premia planes en la ciudad del usuario (+0.08 fijo) y añade hasta +0.04 si la fecha es inmediata, generando una recomendación explicable con su motivo visible.
          </p>
        </div>
      </div>

      <div className={styles.legend}>
        <span className={styles.proposal}>Clúster propio (100% afinidad)</span>
        <span className={styles.reference}>Clústeres vecinos (25% - 60% expansión)</span>
      </div>

      <dl className={styles.comparison}>
        <div>
          <dt>Peso clúster principal</dt>
          <dd>1.00</dd>
        </div>
        <div>
          <dt>Vecino de mayor cercanía</dt>
          <dd>0.60</dd>
        </div>
        <div>
          <dt>Impulso local (Home City)</dt>
          <dd>+0.08</dd>
        </div>
      </dl>

      <figcaption id="nextplan-fig-caption">
        Mecanismo algorítmico desplegado en Google Cloud. La combinación de K-Means con scoring aditivo en BigQuery permite clasificar miles de eventos en milisegundos, resolviendo tanto el descubrimiento serendípico de actividades complementarias como el arranque en frío (cold start) para nuevos usuarios.
      </figcaption>

      <details className={styles.figureDetails}>
        <summary>Consultar los segmentos de clúster y factores de scoring</summary>
        <table>
          <caption className="sr-only">Comunidades de gustos y pesos de afinidad en NextPlan</caption>
          <thead>
            <tr>
              <th scope="col">Segmento</th>
              <th scope="col">Rasgos culturales</th>
              <th scope="col">Ticket medio</th>
              <th scope="col">Momento habitual</th>
            </tr>
          </thead>
          <tbody>
            {nextplanClusters.map((cluster) => (
              <tr key={cluster.id}>
                <th scope="row">{cluster.name}</th>
                <td>{cluster.traits}</td>
                <td>{cluster.avgTicket}</td>
                <td>{cluster.timing}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "1.5rem" }}>
          <h6 style={{ fontSize: "0.8125rem", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 0.5rem 0" }}>
            Factores de la fórmula de scoring
          </h6>
          <table>
            <caption className="sr-only">Factores de la fórmula de scoring multivariable</caption>
            <thead>
              <tr>
                <th scope="col">Factor</th>
                <th scope="col">Ponderación</th>
                <th scope="col">Impacto</th>
              </tr>
            </thead>
            <tbody>
              {nextplanScoringFactors.map((factor) => (
                <tr key={factor.name}>
                  <th scope="row">{factor.name}</th>
                  <td>{factor.weight}</td>
                  <td>{factor.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}

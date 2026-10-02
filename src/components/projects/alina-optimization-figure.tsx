import { alinaOptimizationMetrics } from "@/data/alina";
import styles from "./project-architecture.module.css";

export function AlinaOptimizationFigure() {
  return (
    <figure className={styles.figure} aria-labelledby="alina-fig-caption">
      <div className={styles.figureHeader}>
        <p>Optimización de arquitectura en dos fases</p>
        <span>Comparativa empírica: prompt único (one-shot) frente a desacoplamiento en dos pasos</span>
      </div>

      <div className={styles.figureStepGrid}>
        <div className={styles.figureStepCard}>
          <h5>1. Enfoque convencional (One-Shot)</h5>
          <p>
            Un único prompt masivo obliga al LLM a investigar en internet con herramientas, razonar la estrategia y estructurar un JSON estricto simultáneamente. Genera sobrecoste de tokens (~1.500), latencia elevada (55 s) y una tasa de fallo sintáctico del 40%.
          </p>
        </div>
        <div className={styles.figureStepCard}>
          <h5>2. Arquitectura en dos fases (Alina)</h5>
          <p>
            <strong>Fase 1:</strong> El agente ADK investiga y razona en texto libre con herramientas externas.<br />
            <strong>Fase 2:</strong> Una llamada determinista y compacta a Gemini transforma el texto consolidado al esquema JSON final, garantizando formato y bajando la latencia a 30 s.
          </p>
        </div>
      </div>

      <div className={styles.legend}>
        <span className={styles.reference}>Línea base (One-shot)</span>
        <span className={styles.proposal}>Optimizado (Dos fases)</span>
      </div>

      <dl className={styles.comparison}>
        <div>
          <dt>Tokens por llamada</dt>
          <dd>
            900 <small style={{ color: "#16a34a" }}>(-40%)</small>
          </dd>
        </div>
        <div>
          <dt>Fiabilidad del JSON</dt>
          <dd>
            &gt;95% <small style={{ color: "#16a34a" }}>(+58%)</small>
          </dd>
        </div>
        <div>
          <dt>Tiempo de respuesta</dt>
          <dd>
            30 s <small style={{ color: "#16a34a" }}>(-45%)</small>
          </dd>
        </div>
      </dl>

      <figcaption id="alina-fig-caption">
        Métricas validadas en el informe técnico del proyecto. Separar el razonamiento con herramientas externas de la serialización estricta en JSON redujo drásticamente el tamaño del contexto y evitó reintentos costosos por fallos de sintaxis, permitiendo respuestas en tiempo real para el candidato.
      </figcaption>

      <details className={styles.figureDetails}>
        <summary>Consultar los valores detallados de la comparativa</summary>
        <table>
          <caption className="sr-only">Métricas de optimización empírica en Alina</caption>
          <thead>
            <tr>
              <th scope="col">Métrica</th>
              <th scope="col">One-Shot</th>
              <th scope="col">Dos Fases (Alina)</th>
              <th scope="col">Variación</th>
            </tr>
          </thead>
          <tbody>
            {alinaOptimizationMetrics.map((item) => (
              <tr key={item.metric}>
                <th scope="row">{item.metric}</th>
                <td>{item.oneshot} {item.unit}</td>
                <td>{item.twostep} {item.unit}</td>
                <td style={{ color: "#16a34a", fontWeight: 600 }}>{item.reduction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

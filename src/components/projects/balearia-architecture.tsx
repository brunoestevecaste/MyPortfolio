import { baleariaInputs } from "@/data/balearia";
import styles from "./balearia.module.css";

export function BaleariaArchitecture() {
  return (
    <figure className={styles.architecture} aria-labelledby="cloud-caption">
      <ul className={styles.inputs}>
        {baleariaInputs.map((input) => (
          <li key={input.title}><strong>{input.title}</strong><span>{input.detail}</span></li>
        ))}
      </ul>
      <p className={styles.flowLabel}>Convergen en</p>
      <div className={styles.sharedData}>
        <strong>Cloud SQL + dbt</strong>
        <span>PostgreSQL · validación · modelos analíticos</span>
      </div>
      <p className={styles.flowLabel}>Alimentan</p>
      <ul className={styles.consumers}>
        <li><strong>Predicción y optimización</strong><span>Vertex AI / Kubeflow Pipelines · modelos de potencia · perfiles de velocidad</span></li>
        <li><strong>Consulta y visualización</strong><span>API en Cloud Run · React · operaciones y tripulación</span></li>
      </ul>
      <figcaption id="cloud-caption">
        Esquema funcional simplificado. Cloud Composer coordina los datos externos
        y las transformaciones. Terraform define la infraestructura. Se omiten
        identificadores y detalles internos del despliegue.
      </figcaption>
    </figure>
  );
}

import Link from "next/link";
import { projects } from "@/data/projects";
import { TrafficPlot } from "./traffic-figure";
import { NavigationPlot } from "./navigation-figure";
import styles from "./projects.module.css";

export function ProjectIndex() {
  return (
    <ol className={styles.projectList}>
      {projects.map((project, index) => (
        <li key={project.slug}>
          <Link
            href={`/projects/${project.slug}`}
            className={styles.projectLink}
            aria-labelledby={`${project.slug}-title`}
          >
            <span className={styles.projectNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className={styles.projectCopy}>
              <p className={styles.organization}>{project.organization}</p>
              <h3 id={`${project.slug}-title`}>{project.title}</h3>
              <p className={styles.summary}>{project.summary}</p>
              <p className={styles.projectMeta}>
                {project.year} / {project.role}
              </p>
              <ul className={styles.technologies} aria-label="Tecnologías">
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <span className={styles.readCase}>Ver caso de estudio</span>
            </div>
            <div className={styles.preview} aria-hidden="true">
              {project.slug === "balearia-eficiencia-energetica" ? (
                <>
                  <span>Navegación / Velocidad en nudos</span>
                  <NavigationPlot />
                  <span>Perfiles ilustrativos · Datos ficticios</span>
                </>
              ) : (
                <>
                  <span>Tráfico web / Predicción</span>
                  <TrafficPlot />
                  <span>Análisis del portal y previsión de visitas</span>
                </>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}

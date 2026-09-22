import type { Metadata } from "next";
import Link from "next/link";
import { CaseSection } from "@/components/projects/case-section";
import { AepdDashboard } from "@/components/projects/aepd-dashboard";
import { ProjectPagination } from "@/components/projects/project-pagination";
import {
  aepdCase,
  aepdEtlSteps,
  aepdPipeline,
  aepdProject,
} from "@/data/projects";
import styles from "@/components/projects/projects.module.css";

const path = `/projects/${aepdProject.slug}`;
const sections = [
  aepdCase.context,
  aepdCase.architecture,
  aepdCase.preparation,
  aepdCase.visualization,
  aepdCase.prediction,
  aepdCase.outcome,
  aepdCase.learning,
];

export const metadata: Metadata = {
  title: "AEPD: analítica y predicción de tráfico web",
  description: aepdProject.summary,
  alternates: { canonical: path },
  openGraph: {
    title: "AEPD: analítica y predicción de tráfico web",
    description:
      "Un TFG de datos, BI y Machine Learning con calificación 10/10, llevado a producción y utilizado por la AEPD.",
    type: "article",
    locale: "es_ES",
    url: path,
  },
};

export default function AepdCaseStudy() {
  return (
    <main id="main-content" tabIndex={-1} className="site-container flex-1">
      <article>
        <header className={styles.caseHeader}>
          <Link href="/#work" className={styles.backLink}>
            Volver a proyectos
          </Link>
          <p className={styles.caseEyebrow}>AEPD / Trabajo de Fin de Grado</p>
          <h1 className={styles.caseTitle}>{aepdProject.title}</h1>
          <p className={styles.caseLead}>{aepdCase.introduction}</p>
        </header>

        <dl className={styles.facts}>
          <div>
            <dt>Organización</dt>
            <dd>{aepdProject.organization}</dd>
          </div>
          <div>
            <dt>Mi aportación</dt>
            <dd>{aepdProject.role}</dd>
          </div>
          <div>
            <dt>Marco académico</dt>
            <dd>
              Universitat de València
              <br />
              IRTIC / {aepdProject.year}
            </dd>
          </div>
          <div>
            <dt>Calificación del TFG</dt>
            <dd className={styles.grade}>10/10</dd>
          </div>
        </dl>

        <aside
          className={styles.privacy}
          aria-label="Confidencialidad de los datos"
        >
          <strong>Un caso real, datos ficticios.</strong>
          <p>{aepdCase.confidentiality}</p>
        </aside>

        <div className={styles.caseLayout}>
          <nav
            className={styles.caseNav}
            aria-label="Índice del caso de estudio"
          >
            <p>En este caso</p>
            <ol>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className={styles.caseBody}>
            <CaseSection section={aepdCase.context} />
            <CaseSection section={aepdCase.architecture}>
              <figure className={styles.architecture}>
                <ol>
                  {aepdPipeline.map((step) => (
                    <li key={step.title}>
                      <strong>{step.title}</strong>
                      <span>{step.detail}</span>
                    </li>
                  ))}
                </ol>
                <p className={styles.directConnection}>
                  PostgreSQL también alimenta directamente el análisis
                  descriptivo en Power BI.
                </p>
                <figcaption>
                  Esquema funcional del recorrido de los datos.
                </figcaption>
              </figure>
            </CaseSection>
            <CaseSection section={aepdCase.preparation}>
              <ol className={styles.etlSteps}>
                {aepdEtlSteps.map((step) => (
                  <li key={step.title}>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </li>
                ))}
              </ol>
            </CaseSection>
            <CaseSection section={aepdCase.visualization}>
              <AepdDashboard />
            </CaseSection>
            <CaseSection section={aepdCase.prediction}>
              <div className={styles.methodNote}>
                <h3>El criterio de evaluación</h3>
                <p>
                  Ajustar con el pasado y evaluar sobre datos posteriores.
                  Contrastar el modelo con una referencia y observar sus errores
                  antes de interpretar la previsión.
                </p>
              </div>
            </CaseSection>
            <CaseSection section={aepdCase.outcome} />
            <CaseSection section={aepdCase.learning} />
            <footer className={styles.caseFooter}>
              <p>Herramientas utilizadas</p>
              <ul className={styles.technologies} aria-label="Tecnologías">
                {aepdProject.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <Link href="/#work" className={styles.backLink}>
                Volver a proyectos
              </Link>
              <ProjectPagination slug={aepdProject.slug} />
            </footer>
          </div>
        </div>
      </article>
    </main>
  );
}

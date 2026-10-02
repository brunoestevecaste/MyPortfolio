import type { Metadata } from "next";
import { CaseSection } from "@/components/projects/case-section";
import { AlinaArchitecture } from "@/components/projects/alina-architecture";
import { AlinaOptimizationFigure } from "@/components/projects/alina-optimization-figure";
import { AlinaDashboard } from "@/components/projects/alina-dashboard";
import { ProjectPagination } from "@/components/projects/project-pagination";
import { ProjectExecutiveHero } from "@/components/projects/project-executive-hero";
import { ProjectTools } from "@/components/projects/project-tools";
import { alinaProject } from "@/data/projects";
import {
  alinaCase,
  alinaSections,
  alinaDecisions,
  alinaTools,
} from "@/data/alina";
import styles from "@/components/projects/projects.module.css";
import archStyles from "@/components/projects/project-architecture.module.css";

const path = `/projects/${alinaProject.slug}`;

export const metadata: Metadata = {
  title: "Alina: asistente de empleo con agentes de IA",
  description: alinaProject.summary,
  alternates: { canonical: path },
  openGraph: {
    title: "Alina: asistente de empleo con agentes de IA",
    description:
      "Arquitectura multi-agente con Google ADK y Gemini para transformar la búsqueda de empleo: matching explicable, simulación de entrevistas y optimización de latencia.",
    type: "article",
    locale: "es_ES",
    url: path,
  },
};

export default function AlinaCaseStudy() {
  return (
    <main id="main-content" tabIndex={-1} className="site-container flex-1">
      <article>
        {/* Split Hero: Characteristic Photo + Executive Summary */}
        <ProjectExecutiveHero
          project={alinaProject}
          eyebrow="Alina / Proyecto de Máster en IA"
          academicFramework="EDEM Escuela de Empresarios · Máster en IA / 2026"
          scope="Prototipo funcional (FastAPI + Google ADK + Gemini + React)"
        />

        {/* Full In-Depth Case Study on Scroll */}
        <div id="case-study" className={styles.caseStudyFull}>
          <aside
            className={styles.privacy}
            aria-label="Marco del proyecto"
          >
            <strong>Un proyecto de máster, ingeniería de IA aplicada.</strong>
            <p>{alinaCase.confidentiality}</p>
          </aside>

          <div className={styles.caseLayout}>
            <nav
              className={styles.caseNav}
              aria-label="Índice del caso de estudio"
            >
              <p>En este caso</p>
              <ol>
                {alinaSections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.label}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className={styles.caseBody}>
              <CaseSection section={alinaCase.context} />

              <CaseSection section={alinaCase.contribution} />

              <CaseSection section={alinaCase.architecture}>
                <AlinaArchitecture />
                <ul className={archStyles.decisions}>
                  {alinaDecisions.map((decision) => (
                    <li key={decision.title}>
                      <h3>{decision.title}</h3>
                      {decision.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </li>
                  ))}
                </ul>
              </CaseSection>

              <CaseSection section={alinaCase.preparation} />

              <CaseSection section={alinaCase.mlopsPipeline}>
                <AlinaOptimizationFigure />
              </CaseSection>

              <CaseSection section={alinaCase.finalProduct}>
                <AlinaDashboard />
              </CaseSection>

              <CaseSection section={alinaCase.learning} />

              <section
                id="herramientas"
                data-project-section="Herramientas"
                aria-labelledby="herramientas-title"
                className={styles.caseSection}
              >
                <h2 id="herramientas-title">Herramientas y tecnologías</h2>
                <ProjectTools
                  tools={alinaTools}
                  size="large"
                  ariaLabel="Herramientas y tecnologías utilizadas"
                />
              </section>

              <footer className={styles.caseFooter}>
                <ProjectPagination slug={alinaProject.slug} />
              </footer>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CaseSection } from "@/components/projects/case-section";
import { AlinaDashboard } from "@/components/projects/alina-dashboard";
import { ProjectPagination } from "@/components/projects/project-pagination";
import { ProjectExecutiveHero } from "@/components/projects/project-executive-hero";
import { alinaProject } from "@/data/projects";
import {
  alinaCase,
  alinaPipeline,
  alinaSections,
  alinaTools,
} from "@/data/alina";
import styles from "@/components/projects/projects.module.css";

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
          eyebrow="EDEM / Proyecto de Máster en IA"
          academicFramework="EDEM Escuela de Empresarios · Máster en IA / 2026"
          scope="Prototipo funcional (FastAPI + Google ADK + React)"
        />

        {/* Full In-Depth Case Study on Scroll */}
        <div id="case-study" className={styles.caseStudyFull}>
          <aside
            className={styles.privacy}
            aria-label="Contexto del proyecto"
          >
            <strong>Un proyecto de máster, ingeniería de IA aplicada.</strong>
            <p>{alinaCase.contextNote}</p>
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
                <figure className={styles.architecture}>
                  <ol>
                    {alinaPipeline.map((step) => (
                      <li key={step.title}>
                        <strong>{step.title}</strong>
                        <span>{step.detail}</span>
                      </li>
                    ))}
                  </ol>
                  <p className={styles.directConnection}>
                    El pipeline admite tanto búsqueda automática con scraping en Selenium como entrada manual de ofertas para sortear restricciones de APIs externas.
                  </p>
                  <figcaption>
                    Flujo funcional de ingestión, extracción y derivación a agentes especializados.
                  </figcaption>
                </figure>
              </CaseSection>

              <CaseSection section={alinaCase.agents} />

              <CaseSection section={alinaCase.matching}>
                <div className={styles.methodNote}>
                  <h3>Fórmula del Match Score</h3>
                  <p>
                    <code>match_score = (matched_skills + partial_skills × 0.5) / total_skills × 100</code>
                  </p>
                  <p>
                    Se añaden <strong>+5 puntos</strong> si la modalidad del puesto (remoto, híbrido, presencial) coincide con la preferencia establecida por el candidato. Cada habilidad se audita individualmente frente al CV.
                  </p>
                </div>
              </CaseSection>

              <CaseSection section={alinaCase.optimization}>
                <AlinaDashboard />
              </CaseSection>

              <CaseSection section={alinaCase.outcome} />

              <CaseSection section={alinaCase.learning} />

              <footer className={styles.caseFooter}>
                <p>Herramientas y tecnologías utilizadas</p>
                <ul className={styles.technologies} aria-label="Tecnologías">
                  {alinaTools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
                <Link href="/#work" className={styles.backLink}>
                  Volver a proyectos
                </Link>
                <ProjectPagination slug={alinaProject.slug} />
              </footer>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

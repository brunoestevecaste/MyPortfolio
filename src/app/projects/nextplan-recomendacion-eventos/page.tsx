import type { Metadata } from "next";
import { NextPlanScoringFigure } from "@/components/projects/nextplan-scoring-figure";
import { NextPlanArchitecture } from "@/components/projects/nextplan-architecture";
import { ProjectTools } from "@/components/projects/project-tools";
import { CaseSection } from "@/components/projects/case-section";
import { NextPlanDashboard } from "@/components/projects/nextplan-dashboard";
import { ProjectPagination } from "@/components/projects/project-pagination";
import { ProjectExecutiveHero } from "@/components/projects/project-executive-hero";
import { nextplanProject } from "@/data/projects";
import {
  nextplanCase,
  nextplanDecisions,
  nextplanSections,
  nextplanTools,
} from "@/data/nextplan";
import styles from "@/components/projects/projects.module.css";
import archStyles from "@/components/projects/project-architecture.module.css";

const path = `/projects/${nextplanProject.slug}`;

export const metadata: Metadata = {
  title: "NextPlan: plataforma de recomendación de eventos con IA",
  description: nextplanProject.summary,
  alternates: { canonical: path },
  openGraph: {
    title: "NextPlan: plataforma de recomendación de eventos con IA",
    description:
      "Plataforma completa en Google Cloud para descubrir eventos en España: mapa interactivo, swipes de afinidad, asistente RAG con Google ADK y clustering K-Means para recomendaciones personalizadas.",
    type: "article",
    locale: "es_ES",
    url: path,
  },
};

export default function NextPlanCaseStudy() {
  return (
    <main id="main-content" tabIndex={-1} className="site-container flex-1">
      <article>
        {/* Split Hero: Characteristic Photo + Executive Summary */}
        <ProjectExecutiveHero
          project={nextplanProject}
          eyebrow="EDEM / Proyecto de Máster en IA"
          academicFramework="EDEM Escuela de Empresarios · Máster en IA / 2026"
          scope="Plataforma integral en GCP (Dataflow + BigQuery + dbt + Vertex AI + React)"
        />

        {/* Full In-Depth Case Study on Scroll */}
        <div id="case-study" className={styles.caseStudyFull}>
          <aside className={styles.privacy} aria-label="Contexto del proyecto">
            <strong>Un proyecto integral de máster, producto e ingeniería de datos e IA.</strong>
            <p>{nextplanCase.contextNote}</p>
          </aside>

          <div className={styles.caseLayout}>
            <nav className={styles.caseNav} aria-label="Índice del caso de estudio">
              <p>En este caso</p>
              <ol>
                {nextplanSections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.label}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className={styles.caseBody}>
              <CaseSection section={nextplanCase.context} />

              <CaseSection section={nextplanCase.architecture}>
                <NextPlanArchitecture />
                <ul className={archStyles.decisions}>
                  {nextplanDecisions.map((decision) => (
                    <li key={decision.title}>
                      <h3>{decision.title}</h3>
                      {decision.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </li>
                  ))}
                </ul>
              </CaseSection>

              <CaseSection section={nextplanCase.enrichment} />

              <CaseSection section={nextplanCase.transformations} />

              <CaseSection section={nextplanCase.clustering}>
                <NextPlanScoringFigure />
              </CaseSection>

              <CaseSection section={nextplanCase.serving}>
                <NextPlanDashboard />
              </CaseSection>

              <CaseSection section={nextplanCase.agent} />

              <CaseSection section={nextplanCase.feedback} />

              <CaseSection section={nextplanCase.outcome} />

              <CaseSection section={nextplanCase.learning} />

              <section
                id="herramientas"
                data-project-section="Herramientas"
                aria-labelledby="herramientas-title"
                className={styles.caseSection}
              >
                <h2 id="herramientas-title">Herramientas y tecnologías</h2>
                <ProjectTools
                  tools={nextplanTools}
                  size="large"
                  ariaLabel="Herramientas y tecnologías utilizadas"
                />
              </section>

              <footer className={styles.caseFooter}>
                <ProjectPagination slug={nextplanProject.slug} />
              </footer>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

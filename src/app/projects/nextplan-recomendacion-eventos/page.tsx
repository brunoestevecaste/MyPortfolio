import type { Metadata } from "next";
import Link from "next/link";
import { CaseSection } from "@/components/projects/case-section";
import { NextPlanDashboard } from "@/components/projects/nextplan-dashboard";
import { ProjectPagination } from "@/components/projects/project-pagination";
import { nextplanProject } from "@/data/projects";
import {
  nextplanCase,
  nextplanPipeline,
  nextplanSections,
  nextplanTools,
  nextplanClusters,
  nextplanScoringFactors,
} from "@/data/nextplan";
import styles from "@/components/projects/projects.module.css";

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
        <header className={styles.caseHeader}>
          <Link href="/#work" className={styles.backLink}>
            Volver a proyectos
          </Link>
          <p className={styles.caseEyebrow}>EDEM / Proyecto de Máster en IA</p>
          <h1 className={styles.caseTitle}>{nextplanProject.title}</h1>
          <p className={styles.caseLead}>{nextplanCase.introduction}</p>
        </header>

        <dl className={styles.facts}>
          <div>
            <dt>Organización</dt>
            <dd>{nextplanProject.organization}</dd>
          </div>
          <div>
            <dt>Mi aportación</dt>
            <dd>{nextplanProject.role}</dd>
          </div>
          <div>
            <dt>Marco académico</dt>
            <dd>
              EDEM Escuela de Empresarios
              <br />
              Máster en IA / Mayo – Junio {nextplanProject.year}
            </dd>
          </div>
          <div>
            <dt>Alcance</dt>
            <dd>Plataforma integral en GCP (Dataflow + BigQuery + dbt + Vertex AI + React)</dd>
          </div>
        </dl>

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
              <figure className={styles.architecture}>
                <ol>
                  {nextplanPipeline.map((step) => (
                    <li key={step.title}>
                      <strong>{step.title}</strong>
                      <span>{step.detail}</span>
                    </li>
                  ))}
                </ol>
                <p className={styles.directConnection}>
                  El sistema combina streaming asíncrono con Pub/Sub para swipes, batching periódico con Dataflow y dbt sobre BigQuery, y APIs en Cloud Run para baja latencia.
                </p>
                <figcaption>
                  Arquitectura global de ingesta, analítica, clustering de gustos y servicio de recomendaciones en Google Cloud.
                </figcaption>
              </figure>
            </CaseSection>

            <CaseSection section={nextplanCase.enrichment} />

            <CaseSection section={nextplanCase.transformations} />

            <CaseSection section={nextplanCase.clustering}>
              <div className={styles.methodNote}>
                <h3>Perfiles de Clúster de Usuario (K-Means)</h3>
                <p>
                  El algoritmo identifica segmentos de afinidad basados en el histórico de swipes en ventanas móviles de 30 y 90 días, calculando matrices de distancia euclídea entre centroides para habilitar la recomendación inter-clúster.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "1rem 0 0 0", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {nextplanClusters.map((cluster) => (
                    <li key={cluster.id} style={{ borderLeft: "2px solid var(--signal)", paddingLeft: "0.75rem" }}>
                      <strong>{cluster.name}</strong> ({cluster.affinitySegment})
                      <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                        {cluster.traits} · Ticket medio: {cluster.avgTicket}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CaseSection>

            <CaseSection section={nextplanCase.serving}>
              <div className={styles.methodNote}>
                <h3>Fórmula de Scoring Multivariable de Candidatos</h3>
                <p>
                  <code>Score = (Peso_Clúster × Afinidad_Base) + Home_City_Boost + Urgency_Boost</code>
                </p>
                <ul style={{ paddingLeft: "1.2rem", margin: "0.5rem 0", fontSize: "0.85rem" }}>
                  {nextplanScoringFactors.map((factor) => (
                    <li key={factor.name}>
                      <strong>{factor.name}</strong> ({factor.weight}): {factor.description}
                    </li>
                  ))}
                </ul>
              </div>

              <NextPlanDashboard />
            </CaseSection>

            <CaseSection section={nextplanCase.agent} />

            <CaseSection section={nextplanCase.feedback} />

            <CaseSection section={nextplanCase.outcome} />

            <CaseSection section={nextplanCase.learning} />

            <footer className={styles.caseFooter}>
              <p>Herramientas y tecnologías utilizadas</p>
              <ul className={styles.technologies} aria-label="Tecnologías">
                {nextplanTools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
              <Link href="/#work" className={styles.backLink}>
                Volver a proyectos
              </Link>
              <ProjectPagination slug={nextplanProject.slug} />
            </footer>
          </div>
        </div>
      </article>
    </main>
  );
}

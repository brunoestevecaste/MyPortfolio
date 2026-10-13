import { getTranslations } from "@/lib/i18n/server";
import type { Metadata } from "next";
import { CaseSection } from "@/components/projects/case-section";
import { NextPlanArchitecture } from "@/components/projects/nextplan-architecture";
import { NextPlanDashboard } from "@/components/projects/nextplan-dashboard";
import { ProjectPagination } from "@/components/projects/project-pagination";
import { ProjectExecutiveHero } from "@/components/projects/project-executive-hero";
import { ProjectTools } from "@/components/projects/project-tools";
import { ProjectSectionNavigation } from "@/components/projects/project-section-navigation";
import { nextplanProject } from "@/data/projects";
import {
  nextplanCase,
  nextplanSections,
  nextplanDecisions,
  nextplanTools,
} from "@/data/nextplan";
import styles from "@/components/projects/projects.module.css";
import archStyles from "@/components/projects/project-architecture.module.css";

const path = `/projects/${nextplanProject.slug}`;

const baseMetadata: Metadata = {
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

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getTranslations();
  const openGraph = baseMetadata.openGraph;
  return {
    ...baseMetadata,
    description: t(baseMetadata.description ?? ""),
    openGraph: openGraph ? {
      ...openGraph,
      title: t(typeof openGraph.title === "string" ? openGraph.title : ""),
      description: t(openGraph.description ?? ""),
      locale: locale === "en" ? "en_GB" : "es_ES",
    } : undefined,
  };
}

export default async function NextPlanCaseStudy() {
  const { t } = await getTranslations();
  return (
    <main data-motion-page id="main-content" tabIndex={-1} className="site-container flex-1">
      <article>
        {/* Split Hero: Characteristic Photo + Executive Summary */}
        <ProjectExecutiveHero
          project={nextplanProject}
          eyebrow={t("NextPlan / Proyecto de Máster en IA")}
          academicFramework={t("EDEM Escuela de Empresarios · Máster en IA / 2026")}
          scope={t("Plataforma integral en GCP (Dataflow + BigQuery + dbt + Vertex AI + React)")}
        />

        {/* Full In-Depth Case Study on Scroll */}
        <div id="case-study" className={styles.caseStudyFull}>
          <aside className={styles.privacy} aria-label={t("Marco del proyecto")}>
            <strong data-motion="mask">{t("Un proyecto integral de máster, producto e ingeniería de datos e IA.")}</strong>
            <p data-motion="mask">{t(nextplanCase.confidentiality)}</p>
          </aside>

          <div className={styles.caseLayout}>
            <ProjectSectionNavigation sections={nextplanSections} />

            <div className={styles.caseBody}>
              <CaseSection section={nextplanCase.context} />

              <CaseSection section={nextplanCase.contribution} />

              <CaseSection section={nextplanCase.architecture}>
                <NextPlanArchitecture />
                <ul className={archStyles.decisions}>
                  {nextplanDecisions.map((decision) => (
                    <li key={decision.title}>
                      <h3>{t(decision.title)}</h3>
                      {decision.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{t(paragraph)}</p>
                      ))}
                    </li>
                  ))}
                </ul>
              </CaseSection>

              <CaseSection section={nextplanCase.preparation} />

              <CaseSection section={nextplanCase.mlopsPipeline} />

              <CaseSection section={nextplanCase.finalProduct}>
                <NextPlanDashboard />
              </CaseSection>

              <CaseSection section={nextplanCase.learning} />

              <section
                id="herramientas"
                data-project-section={t("Herramientas")}
                aria-labelledby="herramientas-title"
                className={styles.caseSection}
              >
                <h2 id="herramientas-title" data-motion="mask">{t("Herramientas y tecnologías")}</h2>
                <ProjectTools
                  tools={nextplanTools}
                  size="large"
                  ariaLabel={t("Herramientas y tecnologías utilizadas")}
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

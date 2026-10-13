import { getTranslations } from "@/lib/i18n/server";
import type { Metadata } from "next";
import { CaseSection } from "@/components/projects/case-section";
import { AlinaArchitecture } from "@/components/projects/alina-architecture";
import { AlinaDashboard } from "@/components/projects/alina-dashboard";
import { ProjectPagination } from "@/components/projects/project-pagination";
import { ProjectExecutiveHero } from "@/components/projects/project-executive-hero";
import { ProjectTools } from "@/components/projects/project-tools";
import { ProjectSectionNavigation } from "@/components/projects/project-section-navigation";
import { alinaProject } from "@/data/projects";
import {
  alinaCase,
  alinaSections,
  alinaTools,
} from "@/data/alina";
import styles from "@/components/projects/projects.module.css";

const path = `/projects/${alinaProject.slug}`;

const baseMetadata: Metadata = {
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

export default async function AlinaCaseStudy() {
  const { t } = await getTranslations();
  return (
    <main data-motion-page id="main-content" tabIndex={-1} className="site-container flex-1">
      <article>
        {/* Split Hero: Characteristic Photo + Executive Summary */}
        <ProjectExecutiveHero
          project={alinaProject}
          eyebrow={t("Alina / Proyecto de Máster en IA")}
          academicFramework={t("EDEM Escuela de Empresarios · Máster en IA / 2026")}
          scope={t("Prototipo funcional (FastAPI + Google ADK + Gemini + React)")}
        />

        {/* Full In-Depth Case Study on Scroll */}
        <div id="case-study" className={styles.caseStudyFull}>
          <aside
            className={styles.privacy}
            aria-label={t("Marco del proyecto")}
          >
            <strong data-motion="mask">{t("Un proyecto de máster, ingeniería de IA aplicada.")}</strong>
            <p data-motion="mask">{t(alinaCase.confidentiality)}</p>
          </aside>

          <div className={styles.caseLayout}>
            <ProjectSectionNavigation sections={alinaSections} />

            <div className={styles.caseBody}>
              <CaseSection section={alinaCase.context} />

              <CaseSection section={alinaCase.contribution} />

              <CaseSection section={alinaCase.architecture}>
                <AlinaArchitecture />
              </CaseSection>

              <CaseSection section={alinaCase.preparation} />

              <CaseSection section={alinaCase.mlopsPipeline} />

              <CaseSection section={alinaCase.finalProduct}>
                <AlinaDashboard />
              </CaseSection>

              <CaseSection section={alinaCase.learning} />

              <section
                id="herramientas"
                data-project-section={t("Herramientas")}
                aria-labelledby="herramientas-title"
                className={styles.caseSection}
              >
                <h2 id="herramientas-title" data-motion="mask">{t("Herramientas y tecnologías")}</h2>
                <ProjectTools
                  tools={alinaTools}
                  size="large"
                  ariaLabel={t("Herramientas y tecnologías utilizadas")}
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

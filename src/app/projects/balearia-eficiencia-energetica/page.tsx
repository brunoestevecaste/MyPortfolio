import { getTranslations } from "@/lib/i18n/server";
import type { Metadata } from "next";
import { CaseSection } from "@/components/projects/case-section";
import { BaleariaArchitecture } from "@/components/projects/balearia-architecture";
import { BaleariaDashboard } from "@/components/projects/balearia-dashboard";
import { NavigationFigure } from "@/components/projects/navigation-figure";
import { ProjectPagination } from "@/components/projects/project-pagination";
import { ProjectExecutiveHero } from "@/components/projects/project-executive-hero";
import { ProjectTools } from "@/components/projects/project-tools";
import { ProjectSectionNavigation } from "@/components/projects/project-section-navigation";
import { baleariaProject } from "@/data/projects";
import {
  baleariaCase,
  baleariaSections,
  baleariaDecisions,
  baleariaTools,
} from "@/data/balearia";
import styles from "@/components/projects/projects.module.css";
import baleariaStyles from "@/components/projects/balearia.module.css";

const path = `/projects/${baleariaProject.slug}`;

const baseMetadata: Metadata = {
  description: baleariaProject.summary,
  alternates: { canonical: path },
  openGraph: {
    title: "Baleària: optimización energética de rutas navieras",
    description:
      "TFM de IA y optimización desplegado en Google Cloud. Metodología del proyecto y ejemplos con datos ficticios.",
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

export default async function BaleariaCaseStudy() {
  const { t } = await getTranslations();
  return (
    <main data-motion-page id="main-content" tabIndex={-1} className="site-container flex-1">
      <article>
        {/* Split Hero: Characteristic Photo + Executive Summary */}
        <ProjectExecutiveHero
          project={baleariaProject}
          eyebrow={t("Baleària / Trabajo de Fin de Máster")}
          academicFramework={t("EDEM Escuela de Empresarios · Máster en IA / 2026")}
          scope={t("Prototipo desplegado en Google Cloud Platform")}
        />

        {/* Full In-Depth Case Study on Scroll */}
        <div id="case-study" className={styles.caseStudyFull}>
          <aside
            className={styles.privacy}
            aria-label={t("Confidencialidad de los datos")}
          >
            <strong data-motion="mask">{t("Un caso real, datos ficticios.")}</strong>
            <p data-motion="mask">{t(baleariaCase.confidentiality)}</p>
          </aside>

          <div className={styles.caseLayout}>
            <ProjectSectionNavigation sections={baleariaSections} />
            <div className={styles.caseBody}>
              <CaseSection section={baleariaCase.context} />
              <CaseSection section={baleariaCase.contribution} />
              <CaseSection section={baleariaCase.architecture}>
                <BaleariaArchitecture />
                <ul className={baleariaStyles.decisions}>
                  {baleariaDecisions.map((decision) => (
                    <li key={decision.title}>
                      <h3>{t(decision.title)}</h3>
                      {decision.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{t(paragraph)}</p>
                      ))}
                    </li>
                  ))}
                </ul>
              </CaseSection>
              <CaseSection section={baleariaCase.preparation} />
              <CaseSection section={baleariaCase.mlopsPipeline}>
                <NavigationFigure />
              </CaseSection>
              <CaseSection section={baleariaCase.finalProduct}>
                <BaleariaDashboard />
              </CaseSection>
              <CaseSection section={baleariaCase.learning} />
              <section
                id="herramientas"
                data-project-section={t("Herramientas")}
                aria-labelledby="herramientas-title"
                className={styles.caseSection}
              >
                <h2 id="herramientas-title" data-motion="mask">{t("Herramientas y tecnologías")}</h2>
                <ProjectTools
                  tools={baleariaTools}
                  size="large"
                  ariaLabel={t("Herramientas y tecnologías utilizadas")}
                />
              </section>

              <footer className={styles.caseFooter}>
                <ProjectPagination slug={baleariaProject.slug} />
              </footer>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

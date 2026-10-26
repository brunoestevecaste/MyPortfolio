import { getTranslations } from "@/lib/i18n/server";
import { createPageMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { CaseSection } from "@/components/projects/case-section";
import { AepdArchitecture } from "@/components/projects/aepd-architecture";
import { AepdTrafficFigure } from "@/components/projects/aepd-traffic-figure";
import { AepdDashboard } from "@/components/projects/aepd-dashboard";
import { ProjectPagination } from "@/components/projects/project-pagination";
import { ProjectExecutiveHero } from "@/components/projects/project-executive-hero";
import { ProjectTools } from "@/components/projects/project-tools";
import { ProjectSectionNavigation } from "@/components/projects/project-section-navigation";
import { aepdProject } from "@/data/projects";
import {
  aepdCase,
  aepdSections,
  aepdTools,
} from "@/data/aepd";
import styles from "@/components/projects/projects.module.css";

export async function generateMetadata() {
  const { locale, t } = await getTranslations();
  const title = t("AEPD: analítica y predicción de tráfico web");
  return createPageMetadata({
    title: `${title} | ${site.name}`,
    description: t("Un TFG de datos, BI y Machine Learning con calificación 10/10, llevado a producción y utilizado por la AEPD."),
    path: `/projects/${aepdProject.slug}`,
    locale,
    type: "article",
    image: `/social/${aepdProject.slug}.jpg`,
    imageAlt: locale === "en"
      ? `Editorial illustration: ${title}`
      : `Ilustración editorial: ${title}`,
  });
}

export default async function AepdCaseStudy() {
  const { t } = await getTranslations();
  return (
    <main data-motion-page id="main-content" tabIndex={-1} className="site-container flex-1">
      <article>
        {/* Split Hero: Characteristic Photo + Executive Summary */}
        <ProjectExecutiveHero
          project={aepdProject}
          eyebrow={t("AEPD / Trabajo de Fin de Grado")}
          academicFramework={t("Universitat de València · IRTIC / 2025")}
          scope={t("Sistema en producción utilizado por la AEPD")}
        />

        {/* Full In-Depth Case Study on Scroll */}
        <div id="case-study" className={styles.caseStudyFull}>
          <aside
            className={styles.privacy}
            aria-label={t("Confidencialidad de los datos")}
          >
            <strong data-motion="mask">{t("Un caso real, datos ficticios.")}</strong>
            <p data-motion="mask">{t(aepdCase.confidentiality)}</p>
          </aside>

          <div className={styles.caseLayout}>
            <ProjectSectionNavigation sections={aepdSections} />

            <div className={styles.caseBody}>
              <CaseSection section={aepdCase.context} />

              <CaseSection section={aepdCase.contribution} />

              <CaseSection section={aepdCase.architecture}>
                <AepdArchitecture />
              </CaseSection>

              <CaseSection section={aepdCase.preparation} />

              <CaseSection section={aepdCase.mlopsPipeline}>
                <AepdTrafficFigure />
              </CaseSection>

              <CaseSection section={aepdCase.finalProduct}>
                <AepdDashboard />
              </CaseSection>

              <CaseSection section={aepdCase.learning} />

              <section
                id="herramientas"
                data-project-section={t("Herramientas")}
                aria-labelledby="herramientas-title"
                className={styles.caseSection}
              >
                <h2 id="herramientas-title" data-motion="mask">{t("Herramientas y tecnologías")}</h2>
                <ProjectTools
                  tools={aepdTools}
                  size="large"
                  ariaLabel={t("Herramientas utilizadas")}
                />
              </section>

              <footer className={styles.caseFooter}>
                <ProjectPagination slug={aepdProject.slug} />
              </footer>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

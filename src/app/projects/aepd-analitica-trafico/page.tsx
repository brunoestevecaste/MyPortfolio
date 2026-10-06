import type { Metadata } from "next";
import { CaseSection } from "@/components/projects/case-section";
import { AepdArchitecture } from "@/components/projects/aepd-architecture";
import { AepdTrafficFigure } from "@/components/projects/aepd-traffic-figure";
import { AepdDashboard } from "@/components/projects/aepd-dashboard";
import { ProjectPagination } from "@/components/projects/project-pagination";
import { ProjectExecutiveHero } from "@/components/projects/project-executive-hero";
import { ProjectTools } from "@/components/projects/project-tools";
import { aepdProject } from "@/data/projects";
import {
  aepdCase,
  aepdSections,
  aepdTools,
} from "@/data/aepd";
import styles from "@/components/projects/projects.module.css";

const path = `/projects/${aepdProject.slug}`;

export const metadata: Metadata = {
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
    <main data-motion-page id="main-content" tabIndex={-1} className="site-container flex-1">
      <article>
        {/* Split Hero: Characteristic Photo + Executive Summary */}
        <ProjectExecutiveHero
          project={aepdProject}
          eyebrow="AEPD / Trabajo de Fin de Grado"
          academicFramework="Universitat de València · IRTIC / 2025"
          scope="Sistema en producción utilizado por la AEPD"
        />

        {/* Full In-Depth Case Study on Scroll */}
        <div id="case-study" className={styles.caseStudyFull}>
          <aside
            className={styles.privacy}
            aria-label="Confidencialidad de los datos"
          >
            <strong data-motion="mask">Un caso real, datos ficticios.</strong>
            <p data-motion="mask">{aepdCase.confidentiality}</p>
          </aside>

          <div className={styles.caseLayout}>
            <nav
              className={styles.caseNav}
              aria-label="Índice del caso de estudio"
            >
              <p>En este caso</p>
              <ol>
                {aepdSections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.label}</a>
                  </li>
                ))}
              </ol>
            </nav>

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
                data-project-section="Herramientas"
                aria-labelledby="herramientas-title"
                className={styles.caseSection}
              >
                <h2 id="herramientas-title" data-motion="mask">Herramientas y tecnologías</h2>
                <ProjectTools
                  tools={aepdTools}
                  size="large"
                  ariaLabel="Herramientas utilizadas"
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

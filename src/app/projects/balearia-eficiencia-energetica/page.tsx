import type { Metadata } from "next";
import Link from "next/link";
import { CaseSection } from "@/components/projects/case-section";
import { BaleariaArchitecture } from "@/components/projects/balearia-architecture";
import { NavigationFigure } from "@/components/projects/navigation-figure";
import { ProjectPagination } from "@/components/projects/project-pagination";
import { baleariaProject } from "@/data/projects";
import { baleariaCase, baleariaSections, baleariaDecisions, baleariaTools } from "@/data/balearia";
import styles from "@/components/projects/projects.module.css";
import baleariaStyles from "@/components/projects/balearia.module.css";

const path = `/projects/${baleariaProject.slug}`;

export const metadata: Metadata = {
  title: "Baleària: optimización energética de rutas navieras",
  description: baleariaProject.summary,
  alternates: { canonical: path },
  openGraph: {
    title: "Baleària: optimización energética de rutas navieras",
    description: "TFM de IA y optimización desplegado en Google Cloud. Metodología del proyecto y ejemplos con datos ficticios.",
    type: "article",
    locale: "es_ES",
    url: path,
  },
};

export default function BaleariaCaseStudy() {
  return (
    <main id="main-content" tabIndex={-1} className="site-container flex-1">
      <article>
        <header className={styles.caseHeader}>
          <Link href="/#work" className={styles.backLink}>Volver a proyectos</Link>
          <p className={styles.caseEyebrow}>Baleària / Trabajo de Fin de Máster</p>
          <h1 className={styles.caseTitle}>{baleariaProject.title}</h1>
          <p className={styles.caseLead}>{baleariaCase.introduction}</p>
        </header>

        <dl className={styles.facts}>
          <div><dt>Organización</dt><dd>{baleariaProject.organization}</dd></div>
          <div><dt>Mi aportación</dt><dd>{baleariaProject.role}</dd></div>
          <div><dt>Marco académico</dt><dd>EDEM Escuela de Empresarios<br />Máster en Inteligencia Artificial / {baleariaProject.year}</dd></div>
          <div><dt>Alcance</dt><dd>Prototipo desplegado en Google Cloud Platform</dd></div>
        </dl>

        <aside className={styles.privacy} aria-label="Confidencialidad de los datos">
          <strong>Un caso real, datos ficticios.</strong>
          <p>{baleariaCase.confidentiality}</p>
        </aside>

        <div className={styles.caseLayout}>
          <nav className={styles.caseNav} aria-label="Índice del caso de estudio">
            <p>En este caso</p>
            <ol>
              {baleariaSections.map((section) => (
                <li key={section.id}><a href={`#${section.id}`}>{section.label}</a></li>
              ))}
            </ol>
          </nav>
          <div className={styles.caseBody}>
            <CaseSection section={baleariaCase.context} />
            <CaseSection section={baleariaCase.contribution} />
            <CaseSection section={baleariaCase.architecture}>
              <BaleariaArchitecture />
              <ul className={baleariaStyles.decisions}>
                {baleariaDecisions.map((decision) => (
                  <li key={decision.title}><h3>{decision.title}</h3><p>{decision.text}</p></li>
                ))}
              </ul>
            </CaseSection>
            <CaseSection section={baleariaCase.preparation} />
            <CaseSection section={baleariaCase.prediction} />
            <CaseSection section={baleariaCase.optimization}>
              <NavigationFigure />
            </CaseSection>
            <CaseSection section={baleariaCase.operations} />
            <CaseSection section={baleariaCase.outcome} />
            <CaseSection section={baleariaCase.learning} />
            <footer className={styles.caseFooter}>
              <p>Herramientas de la solución del equipo</p>
              <ul className={styles.technologies} aria-label="Tecnologías">
                {baleariaTools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
              <Link href="/#work" className={styles.backLink}>Volver a proyectos</Link>
              <ProjectPagination slug={baleariaProject.slug} />
            </footer>
          </div>
        </div>
      </article>
    </main>
  );
}

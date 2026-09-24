"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProjectSummary } from "@/data/projects";
import styles from "./projects.module.css";

interface ProjectExecutiveHeroProps {
  project: ProjectSummary;
  eyebrow: string;
  academicFramework?: string;
  scope?: string;
  grade?: string;
}

export function ProjectExecutiveHero({
  project,
  eyebrow,
  academicFramework,
  scope,
  grade,
}: ProjectExecutiveHeroProps) {
  const scrollToCaseStudy = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const caseElement = document.getElementById("case-study");
    if (caseElement) {
      caseElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className={styles.executiveHeroSection}
      aria-label={`Resumen ejecutivo de ${project.title}`}
    >
      {/* Top navigation bar */}
      <div className={styles.executiveTopBar}>
        <Link href="/#work" className={styles.backLink}>
          ← Volver a proyectos
        </Link>
        <span className={styles.executiveIndexNumber}>
          {project.number} / 04
        </span>
      </div>

      {/* Split layout: Photo on left, Executive Summary on right */}
      <div className={styles.executiveSplitGrid}>
        {/* Left column: Characteristic project photo */}
        <div className={styles.characteristicPhotoCol}>
          <figure className={styles.photoContainer}>
            <div className={styles.photoInner}>
              <Image
                src={project.image}
                alt={`Fotografía característica del proyecto: ${project.title}`}
                width={1200}
                height={900}
                className={styles.characteristicImage}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <figcaption className={styles.photoCaption}>
              {project.number} · {project.organization} — {project.title}
            </figcaption>
          </figure>
        </div>

        {/* Right column: Executive Summary */}
        <div className={styles.executiveSummaryCol}>
          <p className={styles.caseEyebrow}>{eyebrow}</p>
          <h1 className={styles.caseTitle}>{project.title}</h1>

          {/* Lead executive overview */}
          <p className={styles.executiveLead}>
            {project.executiveSummary.lead}
          </p>

          {/* Structured Executive Takeaways */}
          <div className={styles.executivePointsList}>
            <div className={styles.executivePointCard}>
              <strong className={styles.executivePointTitle}>01 / Reto de negocio</strong>
              <p className={styles.executivePointText}>
                {project.executiveSummary.challenge}
              </p>
            </div>

            <div className={styles.executivePointCard}>
              <strong className={styles.executivePointTitle}>02 / Solución técnica e IA</strong>
              <p className={styles.executivePointText}>
                {project.executiveSummary.solution}
              </p>
            </div>

            <div className={styles.executivePointCard}>
              <strong className={styles.executivePointTitle}>03 / Impacto y validación</strong>
              <p className={styles.executivePointText}>
                {project.executiveSummary.impact}
              </p>
            </div>
          </div>

          {/* Key Facts Summary */}
          <dl className={styles.executiveFacts}>
            <div>
              <dt>Organización</dt>
              <dd>{project.organization}</dd>
            </div>
            <div>
              <dt>Mi aportación</dt>
              <dd>{project.role}</dd>
            </div>
            {academicFramework && (
              <div>
                <dt>Marco académico</dt>
                <dd>{academicFramework}</dd>
              </div>
            )}
            {scope && (
              <div>
                <dt>Alcance</dt>
                <dd>{scope}</dd>
              </div>
            )}
            {grade && (
              <div>
                <dt>Calificación</dt>
                <dd className={styles.grade}>{grade}</dd>
              </div>
            )}
          </dl>

          {/* Technologies used */}
          <div className={styles.executiveTechRow}>
            <span className={styles.executiveTechLabel}>Tecnologías:</span>
            <ul className={styles.technologies} aria-label="Tecnologías destacadas">
              {project.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>

          {/* Scroll down prompt to view the full case study */}
          <div className={styles.caseStudyScrollPrompt}>
            <a
              href="#case-study"
              onClick={scrollToCaseStudy}
              className={styles.scrollDownButton}
            >
              <span>Ver caso de estudio completo</span>
              <span className={styles.scrollArrowIcon} aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

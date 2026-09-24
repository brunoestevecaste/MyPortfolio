"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProjectSummary } from "@/data/projects";
import { useProjectTransition } from "./project-transition-context";
import styles from "./projects.module.css";

export interface ProjectExecutiveHeroProps {
  project: ProjectSummary;
  eyebrow?: string;
  academicFramework?: string;
  scope?: string;
  grade?: string;
  isOverlay?: boolean;
  photoRef?: React.Ref<HTMLDivElement>;
  photoColStyle?: React.CSSProperties;
  photoInnerStyle?: React.CSSProperties;
  photoImageStyle?: React.CSSProperties;
  summaryColStyle?: React.CSSProperties;
  topBarStyle?: React.CSSProperties;
  captionStyle?: React.CSSProperties;
}

export function ProjectExecutiveHero({
  project,
  eyebrow,
  academicFramework,
  scope,
  grade,
  isOverlay = false,
  photoRef,
  photoColStyle,
  photoInnerStyle,
  photoImageStyle,
  summaryColStyle,
  topBarStyle,
  captionStyle,
}: ProjectExecutiveHeroProps) {
  const { activeProjectSlug } = useProjectTransition();
  const isTransitionTarget = !isOverlay && activeProjectSlug === project.slug;

  const resolvedEyebrow = eyebrow ?? project.eyebrow;
  const resolvedFramework = academicFramework ?? project.academicFramework;
  const resolvedScope = scope ?? project.scope;
  const resolvedGrade = grade ?? project.grade;

  const scrollToCaseStudy = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const caseElement = document.getElementById("case-study");
    if (caseElement) {
      caseElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const heroClass = `${styles.executiveHeroSection} ${
    isOverlay || isTransitionTarget ? styles.noEntranceAnimation : ""
  }`;

  const photoColClass = `${styles.characteristicPhotoCol} ${
    isOverlay || isTransitionTarget ? styles.noEntranceAnimation : ""
  }`;

  const summaryColClass = `${styles.executiveSummaryCol} ${
    isOverlay || isTransitionTarget ? styles.noEntranceAnimation : ""
  }`;

  return (
    <section
      className={heroClass}
      aria-label={`Resumen ejecutivo de ${project.title}`}
    >
      {/* Top navigation bar */}
      <div className={styles.executiveTopBar} style={topBarStyle}>
        {isOverlay ? (
          <span className={styles.backLink}>← Volver a proyectos</span>
        ) : (
          <Link href="/#work" className={styles.backLink}>
            ← Volver a proyectos
          </Link>
        )}
        <span className={styles.executiveIndexNumber}>
          {project.number} / 04
        </span>
      </div>

      {/* Split layout: Photo on left, Executive Summary on right */}
      <div className={styles.executiveSplitGrid}>
        {/* Left column: Characteristic project photo */}
        <div className={photoColClass} style={photoColStyle}>
          <figure className={styles.photoContainer}>
            <div
              ref={photoRef}
              className={styles.photoInner}
              style={photoInnerStyle}
            >
              <Image
                src={project.image}
                alt={
                  isOverlay
                    ? ""
                    : `Fotografía característica del proyecto: ${project.title}`
                }
                width={1200}
                height={900}
                className={styles.characteristicImage}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={photoImageStyle}
              />
            </div>
            <figcaption className={styles.photoCaption} style={captionStyle}>
              {project.number} · {project.organization} — {project.title}
            </figcaption>
          </figure>
        </div>

        {/* Right column: Executive Summary */}
        <div className={summaryColClass} style={summaryColStyle}>
          <p className={styles.caseEyebrow}>{resolvedEyebrow}</p>
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
            {resolvedFramework && (
              <div>
                <dt>Marco académico</dt>
                <dd>{resolvedFramework}</dd>
              </div>
            )}
            {resolvedScope && (
              <div>
                <dt>Alcance</dt>
                <dd>{resolvedScope}</dd>
              </div>
            )}
            {resolvedGrade && (
              <div>
                <dt>Calificación</dt>
                <dd className={styles.grade}>{resolvedGrade}</dd>
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
            {isOverlay ? (
              <div className={styles.scrollDownButton}>
                <span>Ver caso de estudio completo</span>
                <span className={styles.scrollArrowIcon} aria-hidden="true">
                  ↓
                </span>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
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
}

export function ProjectExecutiveHero({
  project,
  eyebrow,
  academicFramework,
  scope,
  grade,
}: ProjectExecutiveHeroProps) {
  const { activeProjectSlug, registerHero } = useProjectTransition();
  const isTransitionTarget = activeProjectSlug === project.slug;
  const heroRef = useRef<HTMLElement>(null);
  // Keep this decision for the lifetime of the page so cleanup cannot replay
  // the normal page-entry animations underneath the shared photo.
  const [arrivedViaTransition] = useState(isTransitionTarget);

  useLayoutEffect(() => {
    if (isTransitionTarget && heroRef.current) registerHero(project.slug, heroRef.current);
  }, [isTransitionTarget, project.slug, registerHero]);

  const resolvedEyebrow = eyebrow ?? project.eyebrow;
  const resolvedFramework = academicFramework ?? project.academicFramework;
  const resolvedScope = scope ?? project.scope;
  const resolvedGrade = grade ?? project.grade;

  const scrollToCaseStudy = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const caseElement = document.getElementById("case-study");
    if (caseElement) {
      caseElement.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
  };

  const heroClass = `${styles.executiveHeroSection} ${
    arrivedViaTransition ? styles.noEntranceAnimation : ""
  }`;

  const photoColClass = `${styles.characteristicPhotoCol} ${
    arrivedViaTransition ? styles.noEntranceAnimation : ""
  }`;

  const summaryColClass = `${styles.executiveSummaryCol} ${
    arrivedViaTransition ? styles.noEntranceAnimation : ""
  }`;

  return (
    <section
      ref={heroRef}
      data-project-entering={isTransitionTarget || undefined}
      className={heroClass}
      aria-label={`Resumen ejecutivo de ${project.title}`}
    >
      {/* Top navigation bar */}
      <div className={styles.executiveTopBar} data-project-reveal>
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
        <div className={photoColClass}>
          <figure className={styles.photoContainer}>
            <div
              data-project-photo
              className={styles.photoInner}
            >
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
            <figcaption className={styles.photoCaption} data-project-reveal>
              {project.number} · {project.organization} — {project.title}
            </figcaption>
          </figure>
        </div>

        {/* Right column: Executive Summary */}
        <div className={summaryColClass}>
          <p className={styles.caseEyebrow} data-project-reveal>{resolvedEyebrow}</p>
          <h1 className={styles.caseTitle} data-project-reveal>{project.title}</h1>

          {/* Lead executive overview */}
          <p className={styles.executiveLead} data-project-reveal>
            {project.executiveSummary.lead}
          </p>

          {/* Structured Executive Takeaways */}
          <div className={styles.executivePointsList} data-project-reveal>
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
          <dl className={styles.executiveFacts} data-project-reveal>
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
          <div className={styles.executiveTechRow} data-project-reveal>
            <span className={styles.executiveTechLabel}>Tecnologías:</span>
            <ul className={styles.technologies} aria-label="Tecnologías destacadas">
              {project.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>

          {/* Scroll down prompt to view the full case study */}
          <div className={styles.caseStudyScrollPrompt} data-project-reveal>
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

"use client";

import { useTranslations } from "@/components/i18n/language-provider";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import type { ProjectSummary } from "@/data/projects";
import { ProjectTools } from "./project-tools";
import { PROJECT_HERO_SIZES, useProjectTransition } from "./project-transition-context";
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
  const { t } = useTranslations();
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
      id="resumen"
      data-project-section={t("Resumen")}
      ref={heroRef}
      data-project-entering={isTransitionTarget || undefined}
      className={heroClass}
      aria-label={t("Resumen ejecutivo de {0}", [t(project.title)])}
    >
      {/* Split layout: Photo on left, Executive Summary on right */}
      <div className={styles.executiveSplitGrid}>
        {/* Left column: Characteristic project photo */}
        <div className={photoColClass}>
          <figure className={styles.photoContainer}>
            <div
              data-project-photo
              data-motion-image={arrivedViaTransition ? "settled" : "pixels"}
              className={`image-hover ${styles.photoInner}`}
            >
              <Image
                src={project.image}
                alt={t("Fotografía característica del proyecto: {0}", [t(project.title)])}
                width={1200}
                height={900}
                className={styles.characteristicImage}
                preload
                sizes={PROJECT_HERO_SIZES}
              />
            </div>
            <figcaption className={styles.photoCaption} data-project-reveal data-motion="mask">
              {t(project.number)} · {t(project.organization)} — {t(project.title)}
            </figcaption>
          </figure>
        </div>

        {/* Right column: Executive Summary */}
        <div className={summaryColClass}>
          <p data-motion="mask" className={styles.caseEyebrow} data-project-reveal>{t(resolvedEyebrow)}</p>
          <h1 key={t(project.title)} className={styles.caseTitle} data-project-reveal data-motion="scramble">{t(project.title)}</h1>

          {/* Lead executive overview */}
          <p data-motion="mask" className={styles.executiveLead} data-project-reveal>
            {t(project.executiveSummary.lead)}
          </p>

          {/* Structured Executive Takeaways */}
          <div className={styles.executivePointsList} data-project-reveal>
            <div className={styles.executivePointCard}>
              <strong data-motion="mask" className={styles.executivePointTitle}>{t("01 / Reto de negocio")}</strong>
              <p data-motion="mask" className={styles.executivePointText}>
                {t(project.executiveSummary.challenge)}
              </p>
            </div>

            <div className={styles.executivePointCard}>
              <strong data-motion="mask" className={styles.executivePointTitle}>{t("02 / Solución técnica e IA")}</strong>
              <p data-motion="mask" className={styles.executivePointText}>
                {t(project.executiveSummary.solution)}
              </p>
            </div>

            <div className={styles.executivePointCard}>
              <strong data-motion="mask" className={styles.executivePointTitle}>{t("03 / Impacto y validación")}</strong>
              <p data-motion="mask" className={styles.executivePointText}>
                {t(project.executiveSummary.impact)}
              </p>
            </div>
          </div>

          {/* Key Facts Summary */}
          <dl className={styles.executiveFacts} data-project-reveal>
            <div>
              <dt data-motion="mask">{t("Organización")}</dt>
              <dd data-motion="mask">{t(project.organization)}</dd>
            </div>
            <div>
              <dt data-motion="mask">{t("Mi aportación")}</dt>
              <dd data-motion="mask">{t(project.role)}</dd>
            </div>
            {resolvedFramework && (
              <div>
                <dt data-motion="mask">{t("Marco académico")}</dt>
                <dd data-motion="mask">{t(resolvedFramework)}</dd>
              </div>
            )}
            {resolvedScope && (
              <div>
                <dt data-motion="mask">{t("Alcance")}</dt>
                <dd data-motion="mask">{t(resolvedScope)}</dd>
              </div>
            )}
            {resolvedGrade && (
              <div>
                <dt data-motion="mask">{t("Calificación")}</dt>
                <dd data-motion="mask" className={styles.grade}>{t(resolvedGrade)}</dd>
              </div>
            )}
          </dl>

          {/* Technologies used */}
          <div className={styles.executiveTechRow} data-project-reveal>
            <span className={styles.executiveTechLabel}>{t("Herramientas:")}</span>
            <ProjectTools tools={project.technologies} ariaLabel={t("Herramientas destacadas")} />
          </div>

          {/* Scroll down prompt to view the full case study */}
          <div className={styles.caseStudyScrollPrompt} data-project-reveal>
            <a
              href="#case-study"
              onClick={scrollToCaseStudy}
              className={styles.scrollDownButton}
            >
              <span>{t("Ver caso de estudio completo")}</span>
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

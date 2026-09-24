"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { projects, type ProjectSummary } from "@/data/projects";
import { useProjectTransition } from "./project-transition-context";
import styles from "./projects.module.css";

export function ProjectIndex() {
  const router = useRouter();
  const { transitionToProject, isTransitioning, activeProjectSlug } =
    useProjectTransition();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState<Record<string, boolean>>({});

  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  // Track scroll position within the projects section to update the left rail indicator
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate how far we've scrolled into the section (0 to 1)
      const scrolledIntoSection = windowHeight - rect.top;
      const totalScrollableDistance = sectionHeight + windowHeight * 0.4;
      const progress = Math.min(
        Math.max((scrolledIntoSection - windowHeight * 0.3) / totalScrollableDistance, 0),
        1
      );
      setScrollProgress(progress);

      // Determine active item based on viewport proximity
      let closestIndex = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const itemRect = el.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distance = Math.abs(itemCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveProjectIndex(closestIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for smooth entrance animation on scroll
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute("data-slug");
            if (slug) {
              setVisibleItems((prev) => ({ ...prev, [slug]: true }));
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleProjectClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    project: ProjectSummary
  ) => {
    e.preventDefault();
    const frame = e.currentTarget.querySelector(
      `.${styles.imageFrame}`
    ) as HTMLElement | null;

    if (frame) {
      transitionToProject(project, frame);
    } else {
      router.push(`/projects/${project.slug}`);
    }
  };

  const scrollToProject = (index: number) => {
    const targetEl = itemRefs.current[index];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div ref={sectionRef} className={styles.projectsStreamWrapper}>
      {/* Delicate left vertical scroll rail */}
      <aside
        className={`${styles.delicateScrollRail} ${
          isTransitioning ? styles.railFading : ""
        }`}
        aria-label="Navegación y progreso de proyectos"
      >
        <div className={styles.railInner}>
          <span className={styles.railLabel}>INDEX</span>

          <div className={styles.railTrack} aria-hidden="true">
            <div
              className={styles.railThumb}
              style={{
                transform: `translateY(${scrollProgress * 180}px)`,
              }}
            />
          </div>

          <ol className={styles.railMarkers}>
            {projects.map((project, idx) => (
              <li key={project.slug}>
                <button
                  type="button"
                  onClick={() => scrollToProject(idx)}
                  className={`${styles.railMarkerBtn} ${
                    activeProjectIndex === idx ? styles.activeRailMarker : ""
                  }`}
                  aria-label={`Ir al proyecto ${project.number}: ${project.title}`}
                  aria-current={activeProjectIndex === idx ? "true" : undefined}
                >
                  <span className={styles.markerDot} />
                  <span className={styles.markerText}>{project.number}</span>
                </button>
              </li>
            ))}
          </ol>

          <span className={styles.railCounter}>
            {String(activeProjectIndex + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </aside>

      {/* Main alternating staggered project feed */}
      <div className={styles.projectsStaggeredGrid}>
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          const isRevealed = !!visibleItems[project.slug];
          const isTarget = isTransitioning && activeProjectSlug === project.slug;
          const isOtherFading =
            isTransitioning && activeProjectSlug !== project.slug;

          return (
            <article
              key={project.slug}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              data-slug={project.slug}
              className={`${styles.staggeredItem} ${
                isEven ? styles.itemLeft : styles.itemRight
              } ${isRevealed ? styles.itemRevealed : ""} ${
                isTarget ? styles.itemTransitioningTarget : ""
              } ${isOtherFading ? styles.itemOtherFading : ""}`}
            >
              <a
                href={`/projects/${project.slug}`}
                onClick={(e) => handleProjectClick(e, project)}
                className={styles.staggeredCardLink}
                aria-label={`Ver proyecto ${project.number}: ${project.title}`}
              >
                {/* Number above/adjacent to image */}
                <div className={styles.projectNumberHeader}>
                  <span className={styles.prominentNumber}>{project.number}</span>
                  <span className={styles.prominentMeta}>
                    {project.year} · {project.organization}
                  </span>
                </div>

                {/* Characteristic project image frame */}
                <div className={styles.imageFrame}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className={styles.projectImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 48vw, 560px"
                    priority={index < 2}
                  />
                  <div className={styles.imageOverlay} aria-hidden="true" />
                </div>

                {/* Subtle text: Only project title in site's body typography */}
                <div className={styles.subtleTextWrapper}>
                  <h3 className={styles.subtleProjectTitle}>{project.title}</h3>
                  <span className={styles.subtleArrow} aria-hidden="true">
                    ↗
                  </span>
                </div>
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}

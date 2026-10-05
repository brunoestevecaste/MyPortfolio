"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { projects, type ProjectSummary } from "@/data/projects";
import { useProjectTransition } from "./project-transition-context";
import styles from "./projects.module.css";

export function ProjectIndex() {
  const router = useRouter();
  const { transitionToProject, prefetchProject, isTransitioning, activeProjectSlug } =
    useProjectTransition();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const THUMB_HEIGHT = 56;

  // Update only the rail's transform, at most once per frame. Scrolling no longer
  // rerenders the entire project index and its animated text/image subtrees.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!sectionRef.current || !trackRef.current || !thumbRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Start when top of section approaches upper portion of viewport
      const startOffset = windowHeight * 0.2;
      const totalScrollableDistance = Math.max(1, sectionHeight - windowHeight * 0.5);
      const scrolled = -rect.top + startOffset;
      const progress = Math.min(
        Math.max(scrolled / totalScrollableDistance, 0),
        1
      );
      const maxTravel = Math.max(0, trackRef.current.clientHeight - THUMB_HEIGHT);
      thumbRef.current.style.transform = `translateY(${progress * maxTravel}px)`;
    };
    const handleScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(handleScroll);
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleProjectClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    project: ProjectSummary
  ) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
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

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current || !trackRef.current) return;
    const trackRect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const ratio = Math.min(Math.max(clickY / trackRect.height, 0), 1);

    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    const sectionHeight = sectionRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const targetScrollY = sectionTop - windowHeight * 0.15 + ratio * Math.max(0, sectionHeight - windowHeight * 0.6);

    window.scrollTo({
      top: Math.max(0, targetScrollY),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <div ref={sectionRef} className={styles.projectsStreamWrapper}>
      {/* Delicate left vertical scroll rail */}
      <aside
        className={`${styles.delicateScrollRail} ${
          isTransitioning ? styles.railFading : ""
        }`}
        aria-label="Progreso de proyectos"
      >
        <div className={styles.railInner}>
          <div
            ref={trackRef}
            className={styles.railTrack}
            onClick={handleTrackClick}
            aria-hidden="true"
          >
            <div
              ref={thumbRef}
              className={styles.railThumb}
              style={{
                height: `${THUMB_HEIGHT}px`,
              }}
            />
          </div>
        </div>
      </aside>

      {/* Main alternating staggered project feed */}
      <div className={styles.projectsStaggeredGrid}>
        {projects.map((project, index) => {
          const displayTitle = project.productName
            ? `${project.productName}: ${project.title}`
            : project.title;
          const isEven = index % 2 === 0;
          const isTarget = isTransitioning && activeProjectSlug === project.slug;
          const isOtherFading =
            isTransitioning && activeProjectSlug !== project.slug;

          return (
            <article
              key={project.slug}
              data-slug={project.slug}
              className={`${styles.staggeredItem} ${
                isEven ? styles.itemLeft : styles.itemRight
              } ${
                isTarget ? styles.itemTransitioningTarget : ""
              } ${isOtherFading ? styles.itemOtherFading : ""}`}
            >
              {/* Number above/adjacent to image */}
              <div className={styles.projectNumberHeader}>
                <span className={styles.prominentNumber} data-motion="mask">({project.number})</span>
                <span className={styles.prominentMeta} data-motion="mask">
                  {project.year} · {project.organization}
                </span>
              </div>

              <Link
                href={`/projects/${project.slug}`}
                onClick={(e) => handleProjectClick(e, project)}
                onPointerEnter={() => prefetchProject(project)}
                onFocus={() => prefetchProject(project)}
                className={styles.projectImageLink}
                aria-label={`Ver proyecto (${project.number}): ${displayTitle}`}
                data-cursor-label="VIEW CASE!"
              >
                {/* Characteristic project image frame */}
                <div className={`image-hover ${styles.imageFrame}`} data-motion-image="pixels">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className={styles.projectImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 48vw, 560px"
                    // This section is below the fold. Native lazy loading also
                    // avoids React's automatic preloads for eager images.
                    loading="lazy"
                  />
                </div>
              </Link>

              {/* Subtle text: Only project title in site's body typography */}
              <div className={styles.subtleTextWrapper}>
                <h3 className={styles.subtleProjectTitle} data-motion="mask">{displayTitle}</h3>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

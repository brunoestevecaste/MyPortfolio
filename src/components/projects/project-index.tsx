"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { projects, type ProjectSummary } from "@/data/projects";
import { useProjectTransition } from "./project-transition-context";
import styles from "./projects.module.css";

export function ProjectIndex() {
  const router = useRouter();
  const { transitionToProject, isTransitioning, activeProjectSlug } =
    useProjectTransition();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [trackHeight, setTrackHeight] = useState(440);
  const [visibleItems, setVisibleItems] = useState<Record<string, boolean>>({});

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const THUMB_HEIGHT = 56;

  // Track scroll position within the projects section to update the left rail indicator
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
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
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update track height dynamically on mount and window resize
  useEffect(() => {
    const updateMetrics = () => {
      if (trackRef.current) {
        setTrackHeight(trackRef.current.offsetHeight);
      }
    };
    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
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

  const maxTravel = Math.max(0, trackHeight - THUMB_HEIGHT);

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
              className={styles.railThumb}
              style={{
                height: `${THUMB_HEIGHT}px`,
                transform: `translateY(${scrollProgress * maxTravel}px)`,
              }}
            />
          </div>
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
              <Link
                href={`/projects/${project.slug}`}
                onClick={(e) => handleProjectClick(e, project)}
                className={styles.staggeredCardLink}
                aria-label={`Ver proyecto (${project.number}): ${project.title}`}
              >
                {/* Number above/adjacent to image */}
                <div className={styles.projectNumberHeader}>
                  <span className={styles.prominentNumber}>({project.number})</span>
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
                    // This section is below the fold. Native lazy loading also
                    // avoids React's automatic preloads for eager images.
                    loading="lazy"
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
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

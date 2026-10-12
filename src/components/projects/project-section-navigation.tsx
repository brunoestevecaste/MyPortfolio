"use client";

import { useEffect, useState } from "react";
import type { CaseSection } from "@/data/projects";
import styles from "./projects.module.css";

type NavigationSection = Pick<CaseSection, "id" | "label">;

export function ProjectSectionNavigation({
  sections,
}: {
  sections: readonly NavigationSection[];
}) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id);

  useEffect(() => {
    const sectionElements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight * 0.3) -
              Math.abs(b.boundingClientRect.top - window.innerHeight * 0.3)
          );

        if (visibleSections[0]) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px", threshold: 0 }
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className={styles.caseNav} aria-label="Índice del caso de estudio">
      <p>En este caso</p>
      <ol>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={activeSection === section.id ? "location" : undefined}
              className={activeSection === section.id ? styles.caseNavActive : undefined}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

import type { ReactNode } from "react";
import type { CaseSection as SectionContent } from "@/data/projects";
import styles from "./projects.module.css";

export function CaseSection({
  section,
  children,
}: {
  section: SectionContent;
  children?: ReactNode;
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className={styles.caseSection}
    >
      <h2 id={`${section.id}-title`}>{section.title}</h2>
      <div className={styles.prose}>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {children}
    </section>
  );
}

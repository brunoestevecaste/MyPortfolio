import { getTranslations } from "@/lib/i18n/server";
import type { ReactNode } from "react";
import type { CaseSection as SectionContent } from "@/data/projects";
import styles from "./projects.module.css";

export async function CaseSection({
  section,
  children,
}: {
  section: SectionContent;
  children?: ReactNode;
}) {
  const { t } = await getTranslations();
  return (
    <section
      id={section.id}
      data-project-section={t(section.label)}
      aria-labelledby={`${section.id}-title`}
      className={styles.caseSection}
    >
      <h2 id={`${section.id}-title`} data-motion="mask">{t(section.title)}</h2>
      <div className={styles.prose}>
        {section.paragraphs.map((paragraph) => (
          <p data-motion="mask" key={paragraph}>{t(paragraph)}</p>
        ))}
      </div>
      {children}
    </section>
  );
}

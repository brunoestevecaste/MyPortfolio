"use client";

import { useTranslations } from "@/components/i18n/language-provider";
import type { JSX } from "react";
import { TechIcon } from "@/components/ui/tech-icon";
import styles from "./projects.module.css";

export type ProjectToolsProps = {
  tools: readonly string[];
  className?: string;
  ariaLabel?: string;
  size?: "default" | "large";
};

export function ProjectTools({
  tools,
  className,
  ariaLabel = "Herramientas utilizadas",
  size = "default",
}: ProjectToolsProps): JSX.Element {
  const { t } = useTranslations();
  if (!tools || tools.length === 0) {
    return <></>;
  }

  const isLarge = size === "large";

  return (
    <ul
      className={`${isLarge ? styles.toolsListLarge : styles.toolsList} ${className ?? ""}`.trim()}
      aria-label={t(ariaLabel)}
    >
      {tools.map((tool) => (
        <li
          key={tool}
          className={isLarge ? styles.toolBadgeLarge : styles.toolBadge}
        >
          <TechIcon
            name={tool}
            className={isLarge ? styles.toolIconLarge : styles.toolIcon}
          />
          <span className={isLarge ? styles.toolNameLarge : styles.toolName}>
            {tool}
          </span>
        </li>
      ))}
    </ul>
  );
}

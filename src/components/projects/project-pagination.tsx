import { getTranslations } from "@/lib/i18n/server";
import Link from "next/link";
import { projects } from "@/data/projects";
import styles from "./balearia.module.css";

export async function ProjectPagination({ slug }: { slug: string }) {
  const { t } = await getTranslations();
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return null;
  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <nav className={styles.pagination} aria-label={t("Navegación entre proyectos")}>
      {previous ? (
        <Link href={`/projects/${previous.slug}`}>
          <span>{t("Proyecto anterior / ")}{t(previous.organization)}</span>
          <strong>{t(previous.title)}</strong>
        </Link>
      ) : null}
      {next ? (
        <Link href={`/projects/${next.slug}`}>
          <span>{t("Siguiente proyecto / ")}{t(next.organization)}</span>
          <strong>{t(next.title)}</strong>
        </Link>
      ) : null}
    </nav>
  );
}

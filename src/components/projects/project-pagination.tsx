import Link from "next/link";
import { projects } from "@/data/projects";
import styles from "./balearia.module.css";

export function ProjectPagination({ slug }: { slug: string }) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return null;
  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <nav className={styles.pagination} aria-label="Navegación entre proyectos">
      {previous ? (
        <Link href={`/projects/${previous.slug}`}>
          <span>Proyecto anterior / {previous.organization}</span>
          <strong>{previous.title}</strong>
        </Link>
      ) : null}
      {next ? (
        <Link href={`/projects/${next.slug}`}>
          <span>Siguiente proyecto / {next.organization}</span>
          <strong>{next.title}</strong>
        </Link>
      ) : null}
    </nav>
  );
}

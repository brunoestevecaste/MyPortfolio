import Image from "next/image";
import { education } from "@/data/education";
import { SectionHeading } from "@/components/ui/section-heading";

export function EducationSection() {
  return (
    <section
      className="site-container pt-[var(--section-space)]"
      id="education"
      aria-labelledby="education-title"
    >
      <SectionHeading className="heading-text" id="education-title" title="Educación" />

      <div className="mt-10 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-2 md:gap-x-[var(--grid-gutter)] lg:mt-20 lg:gap-x-12">
        {education.map((entry) => (
          <article
            key={entry.id}
            aria-labelledby={`${entry.id}-title`}
            className="group flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm text-muted">
                <p className="font-mono text-xs uppercase tracking-wider md:text-sm">
                  {entry.institution}
                </p>
                <p className="font-mono text-xs tabular-nums md:text-sm">
                  <time dateTime={entry.start.date}>{entry.start.label}</time>
                  {" – "}
                  <time dateTime={entry.end.date}>{entry.end.label}</time>
                </p>
              </div>

              <h3
                className="mt-4 font-display text-[clamp(1.15rem,1.45vw,1.55rem)] leading-[1.15] font-normal tracking-[-0.035em] md:whitespace-nowrap"
                id={`${entry.id}-title`}
              >
                {entry.qualification}
              </h3>

              <p className="mt-3 font-display text-[clamp(0.9375rem,1.1vw,1.0625rem)] leading-relaxed tracking-[-0.02em] text-pretty text-ink/90">
                {entry.summary}
              </p>

              <div className="mt-5 space-y-3.5 text-[0.875rem] leading-relaxed text-muted md:text-[0.9375rem]">
                {entry.details.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="relative mt-8 aspect-[3/2] w-full overflow-hidden bg-[var(--surface)] md:mt-10 lg:mt-12">
              <Image
                src={entry.image.src}
                alt={entry.image.alt}
                fill
                sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


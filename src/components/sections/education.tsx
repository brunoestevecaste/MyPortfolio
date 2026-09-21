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

      <div className="mt-12 md:mt-18">
        {education.map((entry) => (
          <article
            key={entry.id}
            aria-labelledby={`${entry.id}-title`}
            className="grid grid-cols-1 gap-6 border-t border-line py-8 md:grid-cols-12 md:gap-x-[var(--grid-gutter)] md:py-12 last:pb-0"
          >
            <p className="text-sm leading-relaxed text-muted tabular-nums md:col-span-4">
              <time dateTime={entry.start.date}>{entry.start.label}</time>
              {" – "}
              <time dateTime={entry.end.date}>{entry.end.label}</time>
            </p>

            <div className="min-w-0 md:col-span-8">
              <p className="mb-3 text-sm leading-relaxed text-muted">
                {entry.institution}
              </p>
              <h3
                className="max-w-[26ch] font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] font-normal tracking-[-0.04em] text-pretty"
                id={`${entry.id}-title`}
              >
                {entry.qualification}
              </h3>
              <p className="mt-6 max-w-[48ch] font-display text-[clamp(1.125rem,1.5vw,1.375rem)] leading-normal tracking-[-0.02em] text-pretty">
                {entry.summary}
              </p>
              <div className="mt-6 max-w-[65ch] space-y-4 text-[0.9375rem] leading-relaxed text-muted md:text-[clamp(0.875rem,1vw,1rem)]">
                {entry.details.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

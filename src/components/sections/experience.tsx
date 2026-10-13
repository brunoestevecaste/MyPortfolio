import { getTranslations } from "@/lib/i18n/server";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data/experience";

export async function ExperienceSection() {
  const { t } = await getTranslations();
  return (
    <section
      className="site-container pt-[var(--section-space)]"
      id="experience"
      aria-labelledby="experience-title"
    >
      <SectionHeading
        className="heading-text"
        id="experience-title"
        title={t("Experiencia")}
      />

      <article
        className="mt-8 grid grid-cols-1 gap-6 pt-8 md:mt-12 md:grid-cols-12 md:gap-x-[var(--grid-gutter)] md:pt-12"
        aria-labelledby="experience-role"
      >
        <div className="text-sm leading-relaxed text-muted md:col-span-4">
          <p data-motion="mask" className="tabular-nums">
            <time dateTime={experience.start.date}>{t(experience.start.label)}</time>
            {t(" – ")}
            {t(experience.end)}
          </p>
        </div>

        <div className="min-w-0 md:col-span-8">
          <p data-motion="mask" className="mb-3 text-sm leading-relaxed text-muted">
            {t(experience.institution)}
          </p>
          <h3 data-motion="mask"
            className="font-heading text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] font-normal tracking-[var(--tracking-heading-title)] text-pretty text-accent"
            id="experience-role"
          >
            {t(experience.role)}
            <span className="mt-1 block">{t(experience.specialty)}</span>
          </h3>
          <p data-motion="mask" className="mt-6 max-w-[48ch] font-display text-[clamp(1.125rem,1.5vw,1.375rem)] leading-normal tracking-[-0.02em] text-pretty">
            {t(experience.summary)}
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-x-[var(--grid-gutter)] gap-y-8 lg:mt-12 lg:grid-cols-2">
            {experience.responsibilities.map((responsibility) => (
              <div key={responsibility.title}>
                <dt data-motion="mask" className="font-display text-xl leading-snug tracking-[-0.03em]">
                  {t(responsibility.title)}
                </dt>
                <dd data-motion="mask" className="mt-3 max-w-[65ch] text-[0.9375rem] leading-relaxed text-muted md:text-[clamp(0.875rem,1vw,1rem)]">
                  {t(responsibility.description)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </article>
    </section>
  );
}

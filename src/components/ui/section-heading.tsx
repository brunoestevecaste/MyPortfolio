import { getTranslations } from "@/lib/i18n/server";
type SectionHeadingProps = {
  title: string;
  className?: string;
  id?: string;
};

export async function SectionHeading({
  title,
  className = "",
  id,
}: SectionHeadingProps) {
  const { t } = await getTranslations();
  return (
    <h2 key={t(title)} className={`section-heading ${className}`} id={id} data-motion="scramble">
      {t("</{0}>", [t(title)])}
    </h2>
  );
}

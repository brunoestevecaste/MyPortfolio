import { getTranslations } from "@/lib/i18n/server";
import { PortfolioChat } from "@/components/chat/portfolio-chat";
import { SectionHeading } from "@/components/ui/section-heading";

export async function ContactSection() {
  const { t } = await getTranslations();
  return (
    <section
      className="site-container editorial-grid items-end pt-8 md:pt-12"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="col-span-4 md:col-span-12">
        <SectionHeading className="heading-text" id="contact-title" title={t("Hablemos")} />
      </div>
      <div className="col-span-4 w-full md:col-span-12">
        <PortfolioChat generative={process.env.CHAT_MODE !== "local"} />
      </div>
    </section>
  );
}

import { PortfolioChat } from "@/components/chat/portfolio-chat";
import { SectionHeading } from "@/components/ui/section-heading";

export function ContactSection() {
  return (
    <section
      className="site-container editorial-grid items-end pt-8 md:pt-12"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="col-span-4 md:col-span-12">
        <SectionHeading className="heading-text" id="contact-title" title="Hablemos" />
      </div>
      <div className="col-span-4 w-full md:col-span-12">
        <PortfolioChat />
      </div>
    </section>
  );
}

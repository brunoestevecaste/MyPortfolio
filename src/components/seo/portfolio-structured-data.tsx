import { profile } from "@/data/profile";
import { absoluteUrl, site } from "@/data/site";
import type { Locale } from "@/lib/i18n/shared";

export function PortfolioStructuredData({ locale }: { locale: Locale }) {
  const personId = absoluteUrl("/#person");
  const websiteId = absoluteUrl("/#website");
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: absoluteUrl("/"),
        jobTitle: profile.title,
        image: absoluteUrl("/hero/bruno-esteve-hero-monocromo-editorial.webp"),
        sameAs: [profile.linkedin, profile.github],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absoluteUrl("/"),
        name: site.title,
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl("/#profile"),
        url: absoluteUrl("/"),
        name: site.title,
        description: site.description[locale],
        inLanguage: locale,
        mainEntity: { "@id": personId },
        isPartOf: { "@id": websiteId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

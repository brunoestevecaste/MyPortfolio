import type { Metadata } from "next";
import { site } from "@/data/site";
import type { Locale } from "@/lib/i18n/shared";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  locale,
  image = site.socialImage,
  imageAlt = title,
  type = "website",
}: PageMetadata): Metadata {
  const socialImage = { url: image, width: 1200, height: 630, alt: imageAlt };

  return {
    title: { absolute: title },
    description,
    // Language is a cookie preference, not a separately addressable page.
    // Do not advertise hreflang alternatives until locale routes exist.
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      type,
      locale: locale === "en" ? "en_GB" : "es_ES",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

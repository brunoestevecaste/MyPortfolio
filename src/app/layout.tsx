import type { Metadata } from "next";
import { Archivo, Bricolage_Grotesque, Space_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Kursor } from "@/components/ui/kursor";
import { ProjectTransitionProvider } from "@/components/projects/project-transition-context";
import { PageMotion } from "@/components/motion/page-motion";
import { MotionBootstrap } from "@/components/motion/motion-bootstrap";
import { LanguageProvider } from "@/components/i18n/language-provider";
import { getClientMessages, getTranslations } from "@/lib/i18n/server";
import { profile } from "@/data/profile";
import { site } from "@/data/site";
import "./globals.css";
import "@/components/motion/motion.css";
import "@/styles/kursor.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const baseMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getTranslations();
  return {
    ...baseMetadata,
    description: site.description[locale],
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale, t } = await getTranslations();
  const messages = await getClientMessages(locale);
  return (
    <html lang={locale} data-scroll-behavior="smooth" className={`${archivo.variable} ${bricolageGrotesque.variable} ${spaceMono.variable}`}>
      <head><MotionBootstrap /></head>
      <body className="flex min-h-dvh flex-col antialiased">
        <LanguageProvider locale={locale} messages={messages}>
        <Kursor />
        <a className="skip-link" href="#main-content">
          {t("Saltar al contenido")}
        </a>
        <SiteHeader />
        <ProjectTransitionProvider>
          {children}
          <PageMotion />
        </ProjectTransitionProvider>
        <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}

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
  title: "Bruno Esteve",
  description:
    "Portfolio de Bruno Esteve Castellano, Data Analyst y AI Engineer especializado en analítica, inteligencia artificial y sistemas de datos.",
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
    description: locale === "en"
      ? "Bruno Esteve Castellano's portfolio. Data Analyst and AI Engineer specialising in analytics, artificial intelligence and data systems."
      : baseMetadata.description,
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

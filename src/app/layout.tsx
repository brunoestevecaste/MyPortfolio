import type { Metadata } from "next";
import { Archivo, Bricolage_Grotesque, Space_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Kursor } from "@/components/ui/kursor";
import { ProjectTransitionProvider } from "@/components/projects/project-transition-context";
import { PageMotion } from "@/components/motion/page-motion";
import { MotionBootstrap } from "@/components/motion/motion-bootstrap";
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

export const metadata: Metadata = {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${archivo.variable} ${bricolageGrotesque.variable} ${spaceMono.variable}`}>
      <head><MotionBootstrap /></head>
      <body className="flex min-h-dvh flex-col antialiased">
        <Kursor />
        <a className="skip-link" href="#main-content">
          Saltar al contenido
        </a>
        <SiteHeader />
        <ProjectTransitionProvider>
          {children}
          <PageMotion />
        </ProjectTransitionProvider>
        <SiteFooter />
      </body>
    </html>
  );
}

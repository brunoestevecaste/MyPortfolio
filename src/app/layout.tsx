import type { Metadata } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Kursor } from "@/components/ui/kursor";
import "./globals.css";
import "@/styles/kursor.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bruno Esteve Castellano | Data Analyst & AI Engineer",
    template: "%s | Bruno Esteve Castellano",
  },
  description:
    "Portfolio de Bruno Esteve Castellano, Data Analyst y AI Engineer especializado en analítica, inteligencia artificial y sistemas de datos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${archivo.variable} ${spaceMono.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <Kursor />
        <a className="skip-link" href="#main-content">
          Saltar al contenido
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

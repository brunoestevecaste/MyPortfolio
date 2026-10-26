export const site = {
  url: "https://www.brunoesteve.com",
  name: "Bruno Esteve",
  title: "Bruno Esteve | Data Analyst & AI Engineer",
  description: {
    es: "Portfolio de Bruno Esteve Castellano, Data Analyst y AI Engineer. Proyectos de analítica de datos, inteligencia artificial y soluciones digitales para negocio.",
    en: "Bruno Esteve Castellano's portfolio. Data Analyst and AI Engineer building analytics, artificial intelligence and digital solutions for business.",
  },
  socialImage: "/opengraph-image",
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

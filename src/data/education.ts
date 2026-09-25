export type Education = {
  id: string;
  institution: string;
  qualification: string;
  start: { date: string; label: string };
  end: { date: string; label: string };
  summary: string;
  details: string[];
  image: {
    src: string;
    alt: string;
  };
};

export const education: readonly Education[] = [
  {
    id: "edem",
    institution: "EDEM Escuela de Empresarios",
    qualification: "(Máster en Inteligencia Artificial)",
    start: { date: "2025-09", label: "sept. 2025" },
    end: { date: "2026-07", label: "jul. 2026" },
    summary:
      "Diseño, desarrollo y despliegue de soluciones de IA para problemas reales, con foco en la IA responsable y el impacto en negocio.",
    details: [
      "Machine Learning, Deep Learning, NLP, visión por computador, series temporales e IA generativa. Del análisis y preparación de datos al despliegue y la monitorización de modelos con MLOps y Google Cloud Platform.",
      "Proyectos aplicados con Python, SQL, Git, Docker y herramientas del ecosistema Data & AI.",
    ],
    image: {
      src: "/education/ai-master.webp",
      alt: "Composición conceptual editorial de Inteligencia Artificial con distorsión digital y refracción espectral",
    },
  },
  {
    id: "universitat-de-valencia",
    institution: "Universitat de València",
    qualification: "(Grado en Inteligencia y Analítica de Negocios)",
    start: { date: "2021-09", label: "sept. 2021" },
    end: { date: "2025-06", label: "jun. 2025" },
    summary:
      "Datos y tecnología al servicio de la gestión empresarial. Una visión integral del negocio para transformar información en decisiones.",
    details: [
      "Formación en estadística, economía, finanzas, marketing e informática, combinada con Business Intelligence, Big Data, bases de datos y Data Warehousing.",
      "Minería de datos, analítica predictiva y visualización para abordar problemas empresariales desde el análisis, la tecnología y la estrategia.",
    ],
    image: {
      src: "/education/bia-degree.webp",
      alt: "Monografía editorial suiza con gráficos de analítica de datos y visualización para inteligencia de negocio",
    },
  },
];


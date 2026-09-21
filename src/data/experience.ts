type Experience = {
  institution: string;
  role: string;
  specialty: string;
  start: { date: string; label: string };
  end: string;
  summary: string;
  responsibilities: readonly { title: string; description: string }[];
};

export const experience: Experience = {
  institution: "Universitat de València",
  role: "Investigador no doctor",
  specialty: "Data Analyst & BI",
  start: { date: "2024-10", label: "oct. 2024" },
  end: "actualidad",
  summary:
    "Transformo datos en información útil para la toma de decisiones en un proyecto de colaboración con la Agencia Española de Protección de Datos (AEPD).",
  responsibilities: [
    {
      title: "Business Intelligence",
      description:
        "Diseño, creación y optimización de dashboards en Power BI para facilitar el análisis y apoyar la toma de decisiones.",
    },
    {
      title: "ETL y Data Warehouse",
      description:
        "Diseño integral de flujos ETL con Pentaho Data Integration y gestión del almacén de datos corporativo en PostgreSQL.",
    },
    {
      title: "Análisis de datos",
      description:
        "Análisis ad hoc, definición de requerimientos de negocio y optimización de consultas SQL complejas con pgAdmin y DBeaver.",
    },
    {
      title: "Calidad de datos",
      description:
        "Control de la consistencia e integridad de los datos durante todo el proceso de ingesta y transformación.",
    },
  ],
};

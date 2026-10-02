export type ExecutiveSummary = {
  readonly lead: string;
  readonly challenge: string;
  readonly solution: string;
  readonly impact: string;
  readonly framework?: string;
};

export type ProjectSummary = {
  slug: string;
  organization: string;
  productName?: string;
  title: string;
  summary: string;
  year: string;
  role: string;
  technologies: readonly string[];
  image: string;
  number: string;
  eyebrow: string;
  academicFramework?: string;
  scope?: string;
  grade?: string;
  executiveSummary: ExecutiveSummary;
};

export const aepdProject = {
  slug: "aepd-analitica-trafico",
  organization: "Agencia Española de Protección de Datos",
  title: "Analítica y predicción de tráfico web",
  summary:
    "Un sistema para organizar los datos del portal de la AEPD, explorar su uso y anticipar visitas horarias. TFG de Inteligencia y Analítica de Negocios, calificado con un 10/10.",
  year: "2025",
  role: "Ingeniería de datos, BI y Machine Learning",
  technologies: ["Pentaho", "PostgreSQL", "Power BI", "Python", "XGBoost"],
  image: "/projects/aepd-dashboard.webp",
  number: "04",
  eyebrow: "AEPD / Trabajo de Fin de Grado",
  academicFramework:
    "TFG Grado en Inteligencia y Analítica de Negocios · Universitat de València (IRTIC)",
  scope: "Pipeline ETL, Data Warehouse, BI y modelos predictivos",
  executiveSummary: {
    lead:
      "Sistema integral de ingeniería de datos y analítica predictiva para estructurar los registros web de la sede electrónica de la AEPD, analizar patrones de uso y anticipar visitas horarias.",
    challenge:
      "Depurar millones de registros brutos de servidores para aislar las consultas de ciudadanos reales frente al ruido de robots, y predecir la afluencia horaria teniendo en cuenta festivos y estacionalidad.",
    solution:
      "Flujo automatizado en Pentaho (ETL) que filtra más del 40% de tráfico técnico y reconstruye sesiones, almacén dimensional en PostgreSQL, cuadro de mando en Power BI y modelos de Machine Learning (XGBoost y LightGBM) validados sobre horizontes temporales futuros.",
    impact:
      "Herramienta transferida a producción y actualmente en uso oficial por la AEPD para el seguimiento operativo de su sede electrónica, calificada con un 10/10 en el TFG.",
    framework: "TFG Grado en Inteligencia y Analítica de Negocios · Universitat de València (IRTIC)",
  },
} as const satisfies ProjectSummary;

export const baleariaProject = {
  slug: "balearia-eficiencia-energetica",
  organization: "Baleària",
  title: "Optimización energética de rutas navieras",
  summary:
    "Una plataforma en Google Cloud que conecta datos de navegación, modelos de consumo y recomendaciones de velocidad para reducir la energía estimada sin comprometer la llegada. TFM de Inteligencia Artificial para Baleària.",
  year: "2026",
  role: "Inteligencia Artificial y optimización",
  technologies: [
    "Google Cloud",
    "Python",
    "PostgreSQL",
    "dbt",
    "Docker",
    "Terraform",
    "React",
  ],
  image: "/projects/balearia-route.webp",
  number: "01",
  eyebrow: "Baleària / Trabajo de Fin de Máster",
  academicFramework: "EDEM Escuela de Empresarios · Máster en IA / 2026",
  scope: "Prototipo desplegado en Google Cloud Platform",
  executiveSummary: {
    lead:
      "Plataforma en Google Cloud que conecta datos de navegación marítima, modelos de consumo de combustible y algoritmos de optimización para recomendar velocidades por tramo y reducir la energía estimada respetando la llegada.",
    challenge:
      "Reducir el gasto de combustible y las emisiones en travesías regulares manteniendo la puntualidad, en un entorno donde el viento y las corrientes cambian de forma constante.",
    solution:
      "Pipeline continuo de Machine Learning en Google Cloud que predice la potencia necesaria según las condiciones del mar y optimiza la velocidad tramo a tramo, apoyado en una base de datos centralizada con dbt.",
    impact:
      "Simulador web interactivo con vistas adaptadas para operaciones en tierra y el puente de mando, ofreciendo criterios objetivos de velocidad para ahorrar energía sin llegar tarde.",
    framework: "TFM Máster en Inteligencia Artificial · EDEM Escuela de Empresarios",
  },
} as const satisfies ProjectSummary;

export const alinaProject = {
  slug: "alina-asistente-empleo",
  organization: "EDEM Escuela de Empresarios",
  productName: "Alina",
  title: "Asistente de empleo con agentes de IA",
  summary:
    "Un sistema multi-agente con Google ADK y Gemini que transforma la búsqueda de empleo: extracción y matching explicable de habilidades, simulación interactiva de entrevistas y generación personalizada de cartas.",
  year: "2026",
  role: "Arquitectura de IA, agentes y backend",
  technologies: [
    "Google Cloud",
    "Python",
    "FastAPI",
    "Docker",
    "Selenium",
    "React",
  ],
  image: "/projects/alina-scanner.webp",
  number: "03",
  eyebrow: "EDEM / Proyecto de Máster en IA",
  academicFramework: "EDEM Escuela de Empresarios · Máster en IA / 2026",
  scope: "Sistema multi-agente con Google ADK y Gemini",
  executiveSummary: {
    lead:
      "Sistema multi-agente con Google ADK y Gemini que transforma la búsqueda de empleo: extracción y matching explicable de habilidades frente al CV, simulación interactiva de entrevistas y generación personalizada de cartas.",
    challenge:
      "Eliminar la asimetría informativa en las ofertas de empleo y evitar alucinaciones en la preparación del candidato mediante matching auditable y estructurado.",
    solution:
      "Orquestación multi-agente en FastAPI con Google ADK (LlmAgent, SequentialAgent, LoopAgent con parada estricta), parsing dual con Selenium y arquitectura de prompts en dos fases.",
    impact:
      "Reducción del 40% en consumo de tokens, disminución del 45% en latencia (55s a 30s) y fiabilidad JSON elevada del 60% al 95%.",
    framework: "Proyecto de Máster en IA · EDEM Escuela de Empresarios",
  },
} as const satisfies ProjectSummary;

export const nextplanProject = {
  slug: "nextplan-recomendacion-eventos",
  organization: "EDEM Escuela de Empresarios",
  productName: "NextPlan",
  title: "Plataforma de recomendación de eventos con IA",
  summary:
    "Una plataforma integral para descubrir eventos en España: exploración en mapa, swipes de afinidad, asistente conversacional con RAG en Vertex AI y clustering de usuarios para recomendaciones personalizadas. Proyecto de Máster en IA.",
  year: "2026",
  role: "Ingeniería de datos, clustering y sistemas de IA",
  technologies: [
    "Google Cloud",
    "Python",
    "FastAPI",
    "dbt",
    "Docker",
    "Terraform",
    "React",
    "Tailwind CSS",
  ],
  image: "/projects/nextplan-map.webp",
  number: "02",
  eyebrow: "EDEM / Proyecto de Máster en IA",
  academicFramework: "EDEM Escuela de Empresarios · Máster en IA / 2026",
  scope: "Plataforma integral en GCP (Dataflow + BigQuery + dbt + Vertex AI + React)",
  executiveSummary: {
    lead:
      "Plataforma integral para descubrir y planificar eventos en España mediante una experiencia multicanal: exploración en mapa, swipes de afinidad, asistente conversacional con RAG en dos fases y clustering K-Means para recomendaciones personalizadas.",
    challenge:
      "Superar la dispersión de la oferta cultural y el problema de cold-start mediante un motor de afinidad multivariable explicable bajo estricto cumplimiento del RGPD.",
    solution:
      "Ingesta masiva enriquecida con Gemini, streaming de swipes con Pub/Sub a BigQuery, modelado dimensional con dbt, motor K-Means con expansión por vecindad y agente conversacional RAG con Google ADK.",
    impact:
      "Arquitectura serverless en GCP con 20 módulos de Terraform, scoring multivariable de recomendación en tiempo real y latencia optimizada.",
    framework: "Proyecto de Máster en IA · EDEM Escuela de Empresarios",
  },
} as const satisfies ProjectSummary;

// Keep the home index and case-study navigation in newest-first order.
export const projects: readonly ProjectSummary[] = [
  baleariaProject,
  nextplanProject,
  alinaProject,
  aepdProject,
];

export type CaseSection = {
  id: string;
  label: string;
  title: string;
  paragraphs: readonly string[];
};

// Re-export AEPD data from dedicated module
export {
  aepdCase,
  aepdPipeline,
  aepdEtlSteps,
  illustrativeTraffic,
} from "./aepd";

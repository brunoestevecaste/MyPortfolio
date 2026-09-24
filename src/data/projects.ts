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
  title: string;
  summary: string;
  year: string;
  role: string;
  technologies: readonly string[];
  image: string;
  number: string;
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
  image: "/projects/aepd.jpg",
  number: "04",
  executiveSummary: {
    lead:
      "Sistema integral de ingeniería de datos y modelado predictivo para organizar los accesos del portal público de la AEPD, explorar patrones de uso y anticipar visitas horarias para dimensionar recursos.",
    challenge:
      "Depurar y estructurar millones de registros brutos de servidores para distinguir consultas de usuarios reales y predecir la demanda horaria con patrones estacionales y festivos.",
    solution:
      "Pipeline ETL en Pentaho, almacén dimensional en PostgreSQL, dashboard analítico en Power BI y modelos predictivos en Python comparando XGBoost, LightGBM e HistGradientBoosting evaluados con MAE, RMSE y MAPE en backtesting temporal.",
    impact:
      "Calificación de 10/10 en el Grado en Inteligencia y Analítica de Negocios, proyecto transferido a producción y actualmente en uso por la propia AEPD.",
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
  technologies: ["Python", "Google Cloud", "Machine Learning", "MLOps"],
  image: "/projects/balearia.jpg",
  number: "01",
  executiveSummary: {
    lead:
      "Plataforma en Google Cloud que conecta datos de navegación marítima, modelos de consumo de combustible y algoritmos de optimización para recomendar velocidades por tramo y reducir la energía estimada respetando la llegada.",
    challenge:
      "Reducir emisiones y consumo energético en rutas de alta frecuencia manteniendo la puntualidad y operando con datos de telemetría y meteorología en tiempo real.",
    solution:
      "Pipeline de IA en Kubeflow/Vertex AI con alineación temporal de sensores GPS, modelado de componentes energéticos y optimización mediante programación dinámica con restricciones operativas.",
    impact:
      "Validación técnica del prototipo desplegado en GCP con monitorización en vivo y dashboards operacionales deterministas para centros de control en tierra y tripulación a bordo.",
    framework: "TFM Máster en Inteligencia Artificial · EDEM Escuela de Empresarios",
  },
} as const satisfies ProjectSummary;

export const alinaProject = {
  slug: "alina-asistente-empleo",
  organization: "EDEM Escuela de Empresarios",
  title: "Asistente de empleo con agentes de IA",
  summary:
    "Un sistema multi-agente con Google ADK y Gemini que transforma la búsqueda de empleo: extracción y matching explicable de habilidades, simulación interactiva de entrevistas y generación personalizada de cartas.",
  year: "2026",
  role: "Arquitectura de IA, agentes y backend",
  technologies: ["Python", "FastAPI", "Google ADK", "Google Gemini", "React", "Selenium"],
  image: "/projects/alina.jpg",
  number: "03",
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
  title: "Plataforma de recomendación de eventos con IA",
  summary:
    "Una plataforma integral para descubrir eventos en España: exploración en mapa, swipes de afinidad, asistente conversacional con RAG en Vertex AI y clustering de usuarios para recomendaciones personalizadas. Proyecto de Máster en IA.",
  year: "2026",
  role: "Ingeniería de datos, clustering y sistemas de IA",
  technologies: [
    "Google Cloud",
    "BigQuery",
    "dbt",
    "Vertex AI",
    "Google ADK",
    "Python",
    "FastAPI",
    "React",
  ],
  image: "/projects/nextplan.jpg",
  number: "02",
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

// Public editorial account of the methodology. No operational records or metrics.
export const aepdCase = {
  introduction:
    "Organizar la actividad de un portal público para entender su uso y anticipar la demanda.",
  confidentiality:
    "Todos los datos de tráfico, valores y predicciones que se muestran son ficticios y se han creado para este portfolio. No reproducen registros, magnitudes ni resultados internos de la AEPD. El contexto del proyecto, las herramientas y la calificación académica son reales.",
  context: {
    id: "contexto",
    label: "Contexto",
    title: "Los registros no explican el uso de un portal",
    paragraphs: [
      "Cada acceso deja un registro técnico. Para convertir esa actividad en información útil es necesario distinguir las visitas de las peticiones a recursos, depurar duplicados y organizar los contenidos con criterios comunes.",
      "El TFG abordó ese recorrido para la Agencia Española de Protección de Datos: construir una base de información que permitiera explorar el tráfico de su portal y estimar las visitas por hora. El objetivo era facilitar el análisis del servicio y aportar una referencia para planificar recursos.",
      "Desarrollé el trabajo en el marco de mis prácticas académicas en el IRTIC de la Universitat de València, con tutorización académica. Mi aportación reunió el modelado de datos, la implementación del proceso ETL, el informe de Power BI y la experimentación predictiva documentada en la memoria.",
    ],
  },
  architecture: {
    id: "arquitectura",
    label: "Arquitectura",
    title: "Una base común para analizar y predecir",
    paragraphs: [
      "Separé la preparación de los registros de su explotación analítica. La zona de staging recibe y depura los logs; el almacén dimensional en PostgreSQL organiza los accesos y su contexto para las consultas posteriores.",
      "Power BI utiliza esa base para el análisis descriptivo. Python transforma los accesos válidos en una serie horaria y genera las predicciones, que se incorporan al informe para compararlas con la serie observada.",
    ],
  },
  preparation: {
    id: "preparacion",
    label: "Preparación",
    title: "La calidad se construye antes del gráfico",
    paragraphs: [
      "Organicé el proceso de Pentaho en un job coordinador y flujos independientes de extracción, transformación y carga. Esa separación permite seguir cada etapa y mantener las reglas sin rehacer el sistema completo.",
      "El modelo dimensional vincula los accesos con tipos de solicitud y categorías. La actualización de dimensiones precede a la carga de hechos para conservar la coherencia entre los registros y su clasificación.",
    ],
  },
  visualization: {
    id: "visualizacion",
    label: "Visualización",
    title: "Preguntas concretas, vistas conectadas",
    paragraphs: [
      "Diseñé el informe de Power BI para pasar de una visión general al detalle de los contenidos. Los filtros de periodo y procedencia permiten acotar el análisis, mientras que las medidas de visitas, visitantes únicos y descargas ofrecen perspectivas distintas de la actividad.",
      "El informe también compara categorías y contenidos consultados, con información contextual en tooltips. Una vista específica reúne la serie observada, las predicciones y las métricas del modelo seleccionado, haciendo legible la evaluación técnica.",
    ],
  },
  prediction: {
    id: "prediccion",
    label: "Predicción",
    title: "Predecir exige respetar el tiempo",
    paragraphs: [
      "Agregué los accesos válidos por hora y exploré la evolución de la serie, su estacionalidad y su autocorrelación. A partir de ese análisis incorporé retardos, variables de ventana, calendario y festivos como candidatos a predictores.",
      "La codificación cíclica representa la continuidad entre horas y días. Las interacciones entre variables y la selección de predictores con RFECV completan la preparación del modelo, en lugar de asumir que toda variable disponible aporta información útil.",
      "Comparé XGBoost, LightGBM e HistGradientBoosting con un modelo de referencia. Utilicé búsqueda bayesiana para ajustar hiperparámetros y backtesting para evaluar predicciones sobre periodos posteriores a los utilizados para el ajuste.",
      "La evaluación combina MAE, RMSE y MAPE: error absoluto medio, penalización de errores grandes y error relativo. Leerlas juntas evita reducir la elección del modelo a una única cifra.",
    ],
  },
  outcome: {
    id: "resultado",
    label: "Resultado",
    title: "Una solución en producción en la AEPD",
    paragraphs: [
      "El resultado del TFG fue una solución que conecta preparación de datos, almacenamiento dimensional, exploración visual y evaluación predictiva. El trabajo obtuvo una calificación de 10/10 en el Grado en Inteligencia y Analítica de Negocios.",
      "El proyecto se llevó a producción y actualmente es una solución utilizada por la propia Agencia Española de Protección de Datos. El sistema reúne el análisis del portal y las previsiones en un mismo recorrido de consulta para apoyar su seguimiento y la toma de decisiones.",
    ],
  },
  learning: {
    id: "aprendizajes",
    label: "Aprendizajes",
    title: "La definición del dato condiciona toda la solución",
    paragraphs: [
      "Este proyecto me permitió trabajar el ciclo analítico completo. Una decisión de filtrado cambia qué se cuenta como actividad, esa definición condiciona el dashboard y la misma base determina qué aprende el modelo.",
      "También reforzó la importancia de comunicar los límites de una predicción. La comparación con una referencia, la evaluación temporal y una visualización comprensible forman parte del producto tanto como el algoritmo.",
      "Como siguientes líneas de trabajo, la memoria plantea la detección de anomalías, la predicción en tiempo real y la exploración de otras arquitecturas. Son ampliaciones propuestas, no funcionalidades implementadas en este TFG.",
    ],
  },
} as const satisfies { introduction: string; confidentiality: string } & Record<
  | "context"
  | "architecture"
  | "preparation"
  | "visualization"
  | "prediction"
  | "outcome"
  | "learning",
  CaseSection
>;

export const aepdPipeline = [
  { title: "Logs web", detail: "Registros de acceso" },
  { title: "Pentaho", detail: "Extracción y depuración" },
  { title: "PostgreSQL", detail: "Almacén dimensional" },
  { title: "Python", detail: "Modelado predictivo" },
  { title: "Power BI", detail: "Análisis y comparación" },
] as const;

export const aepdEtlSteps = [
  {
    title: "Extraer con trazabilidad",
    text: "Seleccionar ficheros por intervalo temporal y mantener un histórico de ingesta para controlar qué archivos se han procesado.",
  },
  {
    title: "Depurar y contextualizar",
    text: "Filtrar peticiones no pertinentes, recursos estáticos, duplicados y robots identificados. Enriquecer los accesos con su clasificación de contenido.",
  },
  {
    title: "Cargar con coherencia",
    text: "Actualizar dimensiones, incorporar los hechos e identificar sesiones. Registrar el estado de los archivos y el resumen de carga.",
  },
] as const;

// Invented from scratch. Never replace with source-document traffic or predictions.
// The second series is illustrative, not output from a trained model.
export const illustrativeTraffic = [
  { hour: "00:00", visits: 84, estimate: 96 },
  { hour: "02:00", visits: 62, estimate: 78 },
  { hour: "04:00", visits: 71, estimate: 82 },
  { hour: "06:00", visits: 143, estimate: 156 },
  { hour: "08:00", visits: 318, estimate: 284 },
  { hour: "10:00", visits: 462, estimate: 425 },
  { hour: "12:00", visits: 387, estimate: 412 },
  { hour: "14:00", visits: 294, estimate: 318 },
  { hour: "16:00", visits: 356, estimate: 331 },
  { hour: "18:00", visits: 248, estimate: 269 },
  { hour: "20:00", visits: 176, estimate: 194 },
  { hour: "22:00", visits: 112, estimate: 128 },
] as const;

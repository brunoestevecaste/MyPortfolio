export type ProjectSummary = {
  slug: string;
  organization: string;
  title: string;
  summary: string;
  year: string;
  role: string;
  technologies: readonly string[];
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

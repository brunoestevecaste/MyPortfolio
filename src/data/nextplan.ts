import type { CaseSection } from "./projects";

// Fuente: Repositorio público Data_IA_Project_3, arquitectura GCP implementada,
// pipelines de Dataflow, dbt, clustering K-Means, Vertex AI Agent Engine y Frontend React.
export const nextplanCase = {
  introduction:
    "Construir una plataforma integral para descubrir y recomendar eventos en España: mapa interactivo, swipes de afinidad, asistente conversacional con RAG en Vertex AI y aprendizaje continuo de gustos.",
  contextNote:
    "Proyecto desarrollado en equipo durante el Máster en Inteligencia Artificial en EDEM Escuela de Empresarios (mayo – junio de 2026). NextPlan es una plataforma completa desplegada en Google Cloud Platform que conecta ingesta masiva de eventos, modelado dimensional en dbt, clustering K-Means, agentes de IA con Google ADK y loop de feedback por email.",
  context: {
    id: "contexto",
    label: "El reto",
    title: "El ocio no necesita más listas, necesita relevancia y personalización",
    paragraphs: [
      "La oferta de eventos en España es amplia pero está fragmentada. Portales tradicionales publican miles de actividades en agendas saturadas con descripciones escuetas, filtros estáticos que no capturan el ambiente de un plan y una elevada fricción para encontrar qué hacer en un momento determinado. El usuario experimenta fatiga de decisión antes de encontrar una propuesta atractiva.",
      "A esta sobrecarga se suma la falta de adaptación al contexto: un plan no solo se define por su género musical o deportivo, sino por su vibra (íntimo, festivo, cultural), el momento del día, si es adecuado para parejas, grupos o familias, y la antelación requerida.",
      "NextPlan se concibió en el Máster de IA de EDEM como una solución integral de producto e ingeniería de datos: centralizar eventos reales, enriquecerlos semánticamente con IA y ofrecer tres vías fluidas y conectadas de descubrimiento: un mapa geoespacial con clustering de marcadores, una interfaz de swipes para captar preferencias implícitas con rapidez y un agente conversacional de IA que genera itinerarios personalizados.",
    ],
  },
  architecture: {
    id: "arquitectura",
    label: "Arquitectura cloud",
    title: "Un ecosistema distribuido y desacoplado en Google Cloud",
    paragraphs: [
      "La plataforma se diseñó sobre una arquitectura modular desacoplada en Google Cloud Platform (GCP) en la región europe-west1, separando estrictamente la ingesta, el almacenamiento operacional, el almacén analítico, el cómputo de Machine Learning y las interfaces de usuario.",
      "La capa transaccional se apoya en Cloud SQL PostgreSQL (gestionado con migraciones de Alembic) para la gestión de usuarios y Firebase Authentication para la autenticación segura. Firestore mantiene el estado reactivo de sesiones, eventos guardados y planes en tiempo real.",
      "BigQuery actúa como el núcleo analítico y semántico: almacena el catálogo de eventos enriquecido, las interacciones brutas de swipe y los vectores de embedding para búsqueda semántica. Las APIs de backend (portal-api para usuarios y admin-api para administración) están construidas con FastAPI y se ejecutan en Cloud Run.",
      "El intercambio de eventos entre el frontend y la analítica se resuelve mediante streaming asíncrono con Pub/Sub (topic 'swipe-events'), volcando las interacciones en tiempo real a BigQuery sin degradar la latencia de respuesta al usuario.",
    ],
  },
  enrichment: {
    id: "enriquecimiento",
    label: "Ingesta y catálogo",
    title: "Enriquecimiento semántico y generación visual de portadas",
    paragraphs: [
      "El catálogo se alimenta mediante un pipeline batch implementado en Apache Beam y ejecutado como Dataflow Flex Template, programado dos veces al día mediante Cloud Scheduler para sincronizar eventos desde la API de Ticketmaster.",
      "Durante la ingesta, cada evento es procesado por un pipeline de enriquecimiento con Vertex AI Gemini. El modelo infiere una taxonomía controlada (Música, Arte y Teatro, Deportes, Familia y otros), estandariza categorías y subcategorías, evalúa la adecuación por tipo de público (romántico, familiar, grupos, turistas), identifica franjas horarias ideales (mañana, tarde, noche), estima duración y clasifica si el plan es de interior o exterior.",
      "Para habilitar la recuperación semántica en el planificador, se generan embeddings de alta dimensionalidad utilizando el modelo gemini-embedding-001 (3.072 dimensiones) a partir de la síntesis contextual del evento, indexándolos directamente en BigQuery.",
      "Paralelamente, el módulo 'ia_motor_imagenes' resuelve la ausencia de material visual atractivo: Gemini redacta un prompt de dirección artística adaptado al ambiente del evento y la API de Pollinations.ai genera portadas optimizadas (768×1024 px) que se almacenan automáticamente en Google Cloud Storage.",
    ],
  },
  transformations: {
    id: "dbt-analytics",
    label: "Transformación dbt",
    title: "De swipes en bruto a feature store dimensional",
    paragraphs: [
      "Cada interacción en la interfaz de swipe genera un mensaje JSON en Pub/Sub que incluye identificadores de usuario y evento, dirección (like o dislike), tiempo de visualización de la tarjeta (dwell_ms en milisegundos), contexto de recomendación y un snapshot del evento en ese instante.",
      "La capa analítica de dbt se ejecuta sobre BigQuery mediante Cloud Run Jobs dos veces por semana (lunes y jueves), coordinada por Cloud Scheduler.",
      "La capa de staging ('stg_swipes') extrae y valida el envelope JSON. Posteriormente, modelos intermedios agregan el comportamiento del usuario en ventanas móviles de 30 y 90 días ('int_user_swipe_features_30d' e 'int_user_swipe_features_90d') y calculan su ciudad de referencia habitual.",
      "La capa dimensional de marts consolida 'fct_swipes' y 'dim_user_cluster_features_current', generando un conjunto de características que cuantifica volumen de actividad, tasa de aceptación, distribución de afinidad por categorías y géneros, antelación media de interés y dispersión de gustos.",
    ],
  },
  clustering: {
    id: "clustering",
    label: "Clustering de usuarios",
    title: "Agrupación por afinidad de gustos con K-Means",
    paragraphs: [
      "El motor de aprendizaje se desarrolló en cuatro fases progresivas: prototipo local con datos sintéticos, integración en GCP con datos reales de BigQuery, generación de interacciones de demo para pruebas de estrés y canalización de serving automatizado.",
      "A partir del vector de características estandarizado (StandardScaler), el algoritmo K-Means identifica clústeres naturales de usuarios con patrones de consumo afines. La selección de k se optimizó evaluando el coeficiente de silueta y el índice Davies-Bouldin, asegurando grupos interpretables (por ejemplo, perfiles orientados a música indie y festivales, aficionados al teatro y danza, o consumidores de planes deportivos y ocio diurno).",
      "Para evitar el aislamiento de los usuarios en burbujas de recomendación cerradas, el pipeline calcula una matriz de distancia euclídea entre los centroides de los clústeres. De este modo se identifican los 'clústeres vecinos', permitiendo que el sistema explore recomendaciones de grupos adyacentes de manera controlada y justificada.",
    ],
  },
  serving: {
    id: "serving",
    label: "Serving y scoring",
    title: "Generación de candidatos y scoring multivariable explicable",
    paragraphs: [
      "Un Cloud Run Job semanal materializa la tabla 'user_recommendation_candidates' en BigQuery, calculando las mejores sugerencias para cada usuario a partir de los eventos futuros aún no vistos.",
      "La puntuación de cada evento candidato se calcula mediante una función multivariable que combina la afinidad de clúster con impulsos contextuales de negocio:",
      "1. Peso del clúster: 1.0 si el plan proviene del clúster propio del usuario, o un factor atenuado (0.60 para el vecino más próximo, 0.40 para el segundo y 0.25 para el tercero) multiplicado por el 'affinity_score' del evento.",
      "2. Impulso geográfico ('home_city_boost'): +0.08 de bonificación cuando la ciudad del evento coincide con la ciudad de residencia o de referencia del usuario.",
      "3. Impulso de urgencia temporal ('urgency_boost'): hasta +0.04 adicionales que premian eventos con fechas próximas frente a opciones lejanas en el calendario.",
      "Para usuarios nuevos sin historial de swipes, el sistema activa un modo cold start determinista basado en sus categorías declaradas durante el onboarding, la ubicación preferida y la popularidad general de los eventos, asignando siempre un motivo explicable ('recommendation_reason') en la tarjeta.",
    ],
  },
  agent: {
    id: "agente-rag",
    label: "Agente IA y RAG",
    title: "Asistente de itinerarios en dos fases con Google ADK y Vertex AI",
    paragraphs: [
      "El planificador inteligente ('AI Planner') permite a los usuarios conversar en lenguaje natural para solicitar itinerarios completos (por ejemplo: 'quiero un plan romántico en Madrid para este sábado por la tarde' o 'algo divertido con amigos barato').",
      "Para garantizar respuestas precisas y evitar alucinaciones de fechas, lugares o precios, el agente se diseñó con Google ADK (Agent Development Kit) sobre Vertex AI Agent Engine y Gemini 2.5 Flash, desacoplando la comprensión semántica de la consulta a la base de datos en dos etapas estrictas:",
      "Fase 1 · Extractor: un LlmAgent especializado analiza el mensaje y extrae un esquema estructurado (UserQueryExtract) con los campos semánticos: 'question' (núcleo del plan o null si es genérico), 'ciudad', 'category' y 'referencia_temporal' en texto literal. Esta fase incorpora sanitización defensiva mediante expresiones regulares para bloquear intentos de inyección de prompts o preguntas fuera de dominio.",
      "Fase 2 · Ejecutor RAG: el agente invoca la tool determinista 'buscar_eventos'. Esta herramienta orquesta internamente el calendario, resuelve la fecha en el huso horario español (Europe/Madrid), ejecuta VECTOR_SEARCH en BigQuery cruzando los embeddings del catálogo y agrupa múltiples sesiones de un mismo evento para presentar opciones organizadas en texto plano sin markdown confuso.",
    ],
  },
  feedback: {
    id: "feedback-rgpd",
    label: "Feedback y RGPD",
    title: "Bucle de valoración activo y privacidad por diseño",
    paragraphs: [
      "El ciclo de aprendizaje de NextPlan no termina en la recomendación: incorpora un bucle de feedback post-evento para medir la satisfacción real y reajustar los perfiles de afinidad.",
      "Tras la celebración de un evento sugerido, Cloud Tasks desencadena una Cloud Function ('envio_email') que genera un token JWT firmado criptográficamente (HS256 con caducidad a 30 días) que contiene el ID de usuario y el ID de evento, despachando un correo electrónico interactivo mediante SendGrid con dos opciones directas: 'Me gustó' y 'No me gustó'.",
      "Cuando el usuario hace clic, la Cloud Function receptora valida el JWT y registra la valoración en BigQuery 'valoraciones_eventos', alimentando el reentrenamiento semanal de los clústeres sin exigir que el usuario vuelva a abrir la aplicación.",
      "El proyecto se diseñó con un estricto compromiso de cumplimiento del RGPD: registro de actividades de tratamiento (ROPA), evaluación de impacto en protección de datos (DPIA), minimización de datos (Art. 5), middleware de audit logging en FastAPI (Art. 32) y trazabilidad del consentimiento.",
    ],
  },
  outcome: {
    id: "resultado",
    label: "Resultado y despliegue",
    title: "Una plataforma completa en producción con gobierno cloud",
    paragraphs: [
      "NextPlan se desplegó como una solución integral en Google Cloud Platform, donde toda la infraestructura está automatizada con Terraform a través de 20 módulos modulares (Cloud Run, BigQuery, Pub/Sub, Firestore, Cloud SQL, Vertex AI Agent Engine, IAM, Secret Manager, etc.).",
      "El repositorio cuenta con 11 flujos de integración y despliegue continuo (CI/CD) en GitHub Actions autenticados mediante Workload Identity Federation, eliminando credenciales estáticas de servicio.",
      "La experiencia de usuario se divide en una aplicación SPA moderna para usuarios finales (React 19, Vite, Tailwind CSS v4 con vistas de mapa, swipe interactivo y chat de itinerarios) y un dashboard de administración en React con Recharts que monitoriza métricas de catálogo, volumen de swipes, efectividad del recomendador y salud de los componentes de IA.",
    ],
  },
  learning: {
    id: "aprendizajes",
    label: "Aprendizajes",
    title: "La IA como parte de un sistema de datos robusto",
    paragraphs: [
      "NextPlan consolidó una convicción esencial: los modelos de lenguaje y los algoritmos de recomendación solo ofrecen valor tangible cuando están respaldados por una ingeniería de datos sólida y trazable. Un agente conversacional que intente recomendar planes desde su memoria paramétrica inventará datos; un agente conectado a un almacén estructurado con búsqueda vectorial resuelve necesidades reales con exactitud.",
      "El proyecto demostró la eficacia de hibridar técnicas: el clustering no supervisado (K-Means) resuelve la afinidad general y la segmentación de audiencias con bajo coste computacional, mientras que los LLMs aportan comprensión del lenguaje natural, extracción estructurada y enriquecimiento semántico.",
      "Por último, el diseño de la interacción con el usuario debe ser multi-modal: el mapa sitúa geográficamente, el swipe recoge feedback rápido de baja fricción y el chat resuelve peticiones complejas. La unión de los tres elementos crea una experiencia de descubrimiento natural y adictiva.",
    ],
  },
} as const satisfies { introduction: string; contextNote: string } & Record<
  | "context"
  | "architecture"
  | "enrichment"
  | "transformations"
  | "clustering"
  | "serving"
  | "agent"
  | "feedback"
  | "outcome"
  | "learning",
  CaseSection
>;

export const nextplanSections = [
  nextplanCase.context,
  nextplanCase.architecture,
  nextplanCase.enrichment,
  nextplanCase.transformations,
  nextplanCase.clustering,
  nextplanCase.serving,
  nextplanCase.agent,
  nextplanCase.feedback,
  nextplanCase.outcome,
  nextplanCase.learning,
] as const;

export const nextplanPipeline = [
  {
    title: "Ingesta batch (Dataflow)",
    detail: "Ticketmaster API · Apache Beam · Vertex AI Gemini · Secret Manager",
  },
  {
    title: "Enriquecimiento y embeddings",
    detail: "Gemini 2.5 Flash · gemini-embedding-001 (3072 dims) · Portadas Pollinations",
  },
  {
    title: "Interacción y streaming",
    detail: "SPA React 19 · FastAPI portal-api · Pub/Sub swipe-events · BigQuery raw",
  },
  {
    title: "Transformación dbt",
    detail: "Cloud Run Jobs · stg_swipes · int_user_features 30d/90d · fct_swipes",
  },
  {
    title: "Clustering y serving",
    detail: "K-Means · silueta & Davies-Bouldin · vecinos · user_recommendation_candidates",
  },
  {
    title: "Agente IA (ADK + RAG)",
    detail: "Extractor LlmAgent · Ejecutor con VECTOR_SEARCH en BigQuery · Vertex AI",
  },
  {
    title: "Feedback loop y RGPD",
    detail: "Cloud Tasks · Cloud Functions · JWT firmado · SendGrid · Art. 32 Audit Log",
  },
] as const;

export const nextplanClusters = [
  {
    id: "cluster-01",
    name: "Cultura Urbana e Indie",
    traits: "Conciertos de salas, festivales alternativos, exposiciones de diseño",
    affinitySegment: "Music & Arts",
    topGenres: ["Rock/Indie", "Exposiciones", "Teatro"],
    avgTicket: "18 - 35 €",
    timing: "Fin de semana (tarde/noche)",
    weightOwn: 1.0,
  },
  {
    id: "cluster-02",
    name: "Artes Escénicas y Teatro",
    traits: "Musicales de gran formato, comedia en vivo, danza y ballet clásico",
    affinitySegment: "Arts & Theatre",
    topGenres: ["Musical", "Comedia", "Teatro"],
    avgTicket: "25 - 60 €",
    timing: "Viernes y domingos tarde",
    weightOwn: 1.0,
  },
  {
    id: "cluster-03",
    name: "Deportes y Ocio Dinámico",
    traits: "Partidos de baloncesto y fútbol, eventos deportivos al aire libre, motor",
    affinitySegment: "Sports",
    topGenres: ["Baloncesto", "Fútbol", "Competiciones"],
    avgTicket: "15 - 45 €",
    timing: "Sábados tarde y mañanas",
    weightOwn: 1.0,
  },
  {
    id: "cluster-04",
    name: "Planes Familiares y Descubrimiento",
    traits: "Parques temáticos, circo contemporáneo, espectáculos infantiles y ferias",
    affinitySegment: "Family & Misc",
    topGenres: ["Infantil/Kids", "Circo", "Parques"],
    avgTicket: "10 - 25 €",
    timing: "Sábados y domingos matinal/mediodía",
    weightOwn: 1.0,
  },
] as const;

export const nextplanScoringFactors = [
  {
    name: "Afinidad de Clúster (Base)",
    factor: "Afinidad × Peso de Clúster",
    weight: "1.00 (Propio) / 0.60 (Vecino 1) / 0.40 (Vecino 2) / 0.25 (Vecino 3)",
    description: "Multiplica el like rate histórico del clúster sobre la categoría y género por el grado de proximidad del centroide.",
  },
  {
    name: "Impulso de Ciudad (Home City Boost)",
    factor: "home_city_boost",
    weight: "+0.08 fijo",
    description: "Bonificación aplicada si la ciudad del evento coincide con la ciudad de residencia o de referencia deducida.",
  },
  {
    name: "Impulso de Urgencia Temporal",
    factor: "urgency_boost",
    weight: "Hasta +0.04 (lineal)",
    description: "Premia eventos que se celebran en los próximos días frente a fechas lejanas en el horizonte temporal.",
  },
] as const;

export const nextplanTools = [
  "Google Cloud Platform",
  "BigQuery (Vector Search & SQL)",
  "dbt (data build tool)",
  "Vertex AI Gemini 2.5 Flash",
  "gemini-embedding-001",
  "Google ADK (Agent Development Kit)",
  "Apache Beam / Dataflow",
  "FastAPI",
  "PostgreSQL / Cloud SQL",
  "Google Cloud Firestore",
  "Google Cloud Pub/Sub",
  "Cloud Run & Cloud Run Jobs",
  "Cloud Functions",
  "SendGrid",
  "Terraform",
  "React 19 & Tailwind CSS v4",
  "Firebase Authentication",
  "Docker",
] as const;

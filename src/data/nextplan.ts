import type { CaseSection } from "./projects";

type ArchitectureInput = {
  title: string;
  steps: readonly string[];
};

// Fuente: Repositorio público Data_IA_Project_3, arquitectura GCP implementada,
// pipelines de Dataflow, dbt, clustering K-Means, Vertex AI Agent Engine y Frontend React.
export const nextplanCase = {
  introduction:
    "Construir una plataforma integral para descubrir y recomendar eventos en España: mapa interactivo, swipes de afinidad, asistente conversacional con RAG en Vertex AI y aprendizaje continuo de gustos.",
  confidentiality:
    "Plataforma completa desplegada en Google Cloud Platform como proyecto integral en el Máster de IA en EDEM. Conecta ingesta masiva de eventos, modelado dimensional en dbt, clustering K-Means, agentes con Google ADK y loop de feedback por email bajo cumplimiento del RGPD. Los demostradores interactivos recrean la experiencia funcional sobre arquitectura cloud real.",
  contextNote:
    "Plataforma completa desplegada en Google Cloud Platform como proyecto integral en el Máster de IA en EDEM. Conecta ingesta masiva de eventos, modelado dimensional en dbt, clustering K-Means, agentes con Google ADK y loop de feedback por email bajo cumplimiento del RGPD. Los demostradores interactivos recrean la experiencia funcional sobre arquitectura cloud real.",
  context: {
    id: "contexto",
    label: "El reto",
    title: "El ocio no necesita más listas, necesita relevancia y personalización",
    paragraphs: [
      "Decidir qué hacer un fin de semana debería ser sencillo, pero suele convertirse en una búsqueda frustrante. Las agendas culturales están saturadas de listas interminables con descripciones escuetas y filtros rígidos que no capturan lo que de verdad importa: el ambiente de un plan, la compañía o el momento del día.",
      "El usuario experimenta fatiga de decisión antes de encontrar algo apetecible. NextPlan nació en el Máster de IA de EDEM para resolver este problema uniendo ingeniería de datos, Machine Learning y diseño de producto: centralizar miles de eventos y personalizarlos para cada persona.",
      "La plataforma ofrece tres vías complementarias de descubrimiento: un mapa visual para explorar la ciudad, una interfaz ágil de tarjetas (swipes) para capturar gustos al instante, y un asistente conversacional que elabora itinerarios a medida.",
    ],
  },
  contribution: {
    id: "aportacion",
    label: "Mi aportación",
    title: "Ingeniería de datos, modelado analítico y recomendación",
    paragraphs: [
      "En un equipo multidisciplinar de cuatro personas en NextPlan, mi contribución se focalizó en el diseño integral de la arquitectura de datos, el modelado dimensional con dbt y el desarrollo de los algoritmos de Machine Learning y recomendación en Google Cloud Platform.",
      "Diseñé el flujo de ingesta y streaming de swipes hacia BigQuery, implementé los modelos de feature store en dbt para procesar ventanas de afinidad de 30 y 90 días, y desarrollé el motor de clustering K-Means junto a la lógica de expansión de centroides para evitar burbujas de filtro.",
      "Asimismo, participé en la integración del agente conversacional RAG desacoplado en Vertex AI Agent Engine y en el diseño del loop de feedback post-evento mediante enlaces encriptados, asegurando que todos los componentes cumplieran estrictamente con el RGPD.",
    ],
  },
  architecture: {
    id: "arquitectura",
    label: "Arquitectura cloud",
    title: "Un ecosistema distribuido y desacoplado en Google Cloud",
    paragraphs: [
      "Para sostener una experiencia de descubrimiento en tiempo real sin cuellos de botella, la plataforma se construyó sobre una arquitectura distribuida y desacoplada en Google Cloud Platform, donde cada componente asume una responsabilidad estricta: ingesta, analítica, inferencia de Machine Learning y entrega web.",
      "Los datos transaccionales se gestionan en Cloud SQL, mientras que BigQuery funciona como el gran repositorio analítico central donde convergen el catálogo de eventos, los embeddings semánticos y los millones de eventos de interacción. La herramienta dbt orquesta las transformaciones analíticas, alimentando en paralelo al motor de clustering y al agente de Vertex AI.",
      "A continuación, el diagrama de flujo ilustra cómo se conectan las tres vías de entrada, convergen en el almacén de datos y se distribuyen hacia la experiencia de usuario y los modelos inteligentes.",
    ],
  },
  preparation: {
    id: "preparacion",
    label: "Preparación de datos",
    title: "Ingesta masiva, enriquecimiento semántico y transformaciones dbt",
    paragraphs: [
      "Las fuentes de ocio públicas presentan una alta disparidad: categorías genéricas, descripciones breves y textos sin estructura. Para homogeneizarlas, el pipeline en Dataflow descarga diariamente miles de eventos y los enriquece mediante inteligencia artificial con Gemini: clasifica la atmósfera o estilo del plan (vibe), determina la compañía adecuada (parejas, amigos o familia) y genera vectores semánticos para encontrar eventos similares por significado y no solo por etiquetas fijas.",
      "Al mismo tiempo, la aplicación recoge las señales de interés del usuario: no solo la dirección del swipe (descartar o guardar), sino el tiempo que dedica a leer los detalles de cada tarjeta antes de decidir.",
      "En BigQuery, los modelos de dbt transforman estos eventos brutos en variables de afinidad limpias a 30 y 90 días, eliminando duplicados y calculando el peso de cada categoría. Este modelado deja los datos preparados para la siguiente fase: el motor de recomendación inteligente.",
    ],
  },
  mlopsPipeline: {
    id: "pipeline-ia",
    label: "Pipeline de IA",
    title: "Clustering de afinidad, scoring multivariable y agente RAG",
    paragraphs: [
      "Con las variables de afinidad consolidadas en el almacén de datos, el núcleo inteligente de NextPlan resuelve dos retos: ordenar los mejores planes para las tarjetas y responder dudas complejas en el chat.",
      "En primer lugar, el algoritmo K-Means agrupa a los usuarios en comunidades con gustos similares. Para no encerrar a nadie en una burbuja repetitiva donde siempre vea lo mismo, el recomendador combina planes del grupo principal del usuario (peso 1.00) con sugerencias de grupos vecinos cercanos (pesos 0.60, 0.40 y 0.25). De este modo, alguien afín a la música indie también descubre obras de teatro alternativo o festivales afines.",
      "A continuación, el cálculo final suma dos impulsos deterministas: una bonificación si el evento ocurre en la ciudad del usuario (+0.08) y un incentivo si la fecha está próxima (hasta +0.04) para primar planes inmediatos. En paralelo, el asistente conversacional con RAG en Vertex AI interpreta peticiones abiertas en lenguaje natural («planes tranquilos para este sábado») y busca directamente en la base de datos planes verificados con precio y horario real, sin inventar información.",
      "La figura inferior ilustra cómo convergen la afinidad matemática del clúster y las bonificaciones para ordenar los eventos de cada persona con total claridad y transparencia.",
    ],
  },
  finalProduct: {
    id: "producto-final",
    label: "Producto final",
    title: "Experiencia multicanal: mapa, swipes y asistente inteligente",
    paragraphs: [
      "Toda la ingeniería de datos e IA confluye en una aplicación interactiva en React que ofrece tres formas naturales de descubrir ocio: explorar eventos sobre un mapa dinámico, entrenar las preferencias personales mediante una baraja ágil de swipes y solicitar itinerarios a medida al asistente conversacional.",
      "Tras asistir a un plan recomendado, el sistema cierra el ciclo de aprendizaje mediante correos electrónicos con enlaces encriptados de un solo clic («Me gustó» / «No me gustó»). La respuesta actualiza automáticamente el Feature Store en BigQuery sin exigir login al usuario y respetando el RGPD por diseño.",
      "A continuación puedes explorar el prototipo funcional de NextPlan. Prueba la experiencia de swipes con telemetría en vivo, examina cómo calcula el recomendador las puntuaciones por clúster y simula consultas reales al agente conversacional.",
    ],
  },
  learning: {
    id: "aprendizajes",
    label: "Aprendizajes",
    title: "La IA al servicio del dato y del producto",
    paragraphs: [
      "Este proyecto consolidó una certeza fundamental: los modelos de lenguaje y la inteligencia artificial solo aportan valor real cuando están respaldados por una ingeniería de datos robusta. Un asistente conversacional sin datos verificados alucina; conectado a un almacén estructurado con búsqueda vectorial, resuelve problemas cotidianos.",
      "También demostró la potencia de combinar técnicas: el clustering clásico (K-Means) segmenta audiencias de forma rápida y económica, mientras que los modelos de lenguaje aportan contexto semántico, portadas visuales y diálogo en lenguaje natural.",
      "Diseñar un producto multicanal (mapa, tarjetas y conversación) confirmó que no todos los usuarios descubren ocio de la misma manera: ofrecer la vía adecuada para cada momento es lo que convierte una tecnología compleja en una experiencia atractiva.",
    ],
  },
} as const satisfies { introduction: string; confidentiality: string; contextNote: string } & Record<
  | "context"
  | "contribution"
  | "architecture"
  | "preparation"
  | "mlopsPipeline"
  | "finalProduct"
  | "learning",
  CaseSection
>;

export const nextplanSections = [
  nextplanCase.context,
  nextplanCase.contribution,
  nextplanCase.architecture,
  nextplanCase.preparation,
  nextplanCase.mlopsPipeline,
  nextplanCase.finalProduct,
  nextplanCase.learning,
  {
    id: "herramientas",
    label: "Herramientas",
    title: "Herramientas y tecnologías",
    paragraphs: [],
  },
] as const;

export const nextplanInputs = [
  {
    title: "Catálogo masivo",
    steps: ["Ticketmaster API diaria", "Apache Beam (Dataflow)", "Enriquecimiento Gemini + Embeddings"],
  },
  {
    title: "Telemetría en tiempo real",
    steps: ["SPA React 19", "FastAPI portal-api", "Pub/Sub streaming swipe-events"],
  },
  {
    title: "Feedback post-evento",
    steps: ["Cloud Tasks & Cloud Functions", "SendGrid (JWT firmado HS256)", "Calificación 1-clic"],
  },
] as const satisfies readonly ArchitectureInput[];

export const nextplanDataUses = [
  {
    title: "Motor de recomendación",
    service: "K-Means + Scoring multivariable",
    action: "Clustering por afinidad, vecinos y bonificaciones",
    outcome: "Ranking personalizado por usuario",
    audience: "Tarjetas de swipe y mapa",
  },
  {
    title: "Asistente conversacional",
    service: "Vertex AI Agent Engine (ADK)",
    action: "Extracción defensiva + VECTOR_SEARCH en BigQuery",
    outcome: "Itinerarios reales sin alucinación",
    audience: "Chat en lenguaje natural",
  },
] as const;

export const nextplanDecisions = [
  {
    title: "Ingesta dual: streaming reactivo con Pub/Sub y batch masivo con Dataflow",
    paragraphs: [
      "El comportamiento del usuario exige inmediatez: cada swipe o lectura prolongada se transmite de forma asíncrona mediante Pub/Sub a BigQuery sin bloquear la aplicación web, garantizando alta tolerancia a picos de tráfico.",
      "Por su parte, la actualización del catálogo cultural se ejecuta en batch diario mediante Apache Beam en Dataflow, enriqueciendo las descripciones con Gemini y generando embeddings vectoriales de forma controlada y rentable.",
    ],
  },
  {
    title: "Almacén analítico centralizado y Feature Store con dbt sobre BigQuery",
    paragraphs: [
      "Evitar silos entre la navegación de la app y los modelos de IA fue prioritario. Centralizar todo el histórico en BigQuery y transformar las interacciones con dbt en ventanas móviles de 30 y 90 días permite calcular señales de afinidad limpias y comparables.",
      "Este modelado dimensional actúa como un Feature Store continuo: tanto el algoritmo K-Means como las consultas vectoriales de búsqueda se nutren exactamente de los mismos datos depurados y auditables.",
    ],
  },
  {
    title: "Recomendación híbrida: K-Means con expansión de centroides y agente RAG",
    paragraphs: [
      "El sistema no depende de una sola técnica de IA. Para navegación rápida, el algoritmo K-Means segmenta a los usuarios por afinidad y calcula distancias euclídeas entre centroides para sugerir planes afines sin encerrar al usuario en una burbuja de repetición.",
      "Para búsquedas complejas en lenguaje natural, un agente conversacional RAG en Vertex AI traduce la intención del usuario a una consulta SQL y vectorial sobre BigQuery, entregando itinerarios con precios y horarios reales sin riesgo de alucinación.",
    ],
  },
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
  "Google Cloud",
  "Python",
  "FastAPI",
  "dbt",
  "Docker",
  "Terraform",
  "React",
  "Tailwind CSS",
] as const;

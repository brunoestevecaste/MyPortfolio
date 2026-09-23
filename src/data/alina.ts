import type { CaseSection } from "./projects";

// Fuentes: Presentación del proyecto de máster (5 marzo 2026), repositorio público en GitHub (ia-project-II)
// y arquitectura implementada en FastAPI + Google ADK + React.
export const alinaCase = {
  introduction:
    "Construir un asistente inteligente para transformar la búsqueda de empleo: extracción y matching explicable de habilidades, simulación de entrevistas y agentes colaborativos sin alucinaciones.",
  contextNote:
    "Proyecto desarrollado en equipo durante el Máster en Inteligencia Artificial en EDEM Escuela de Empresarios (febrero – marzo de 2026). Grupo 3: Adrián Alemany, Bruno Esteve, Silvia Pla y Clàudia Salgado. Prototipo funcional real con backend en FastAPI, Google ADK, modelos Gemini y frontend en React.",
  context: {
    id: "contexto",
    label: "El reto",
    title: "El problema no es encontrar ofertas, sino decidir con confianza",
    paragraphs: [
      "La búsqueda de empleo actual está marcada por la sobrecarga de información y la falta de estándares. Cientos de portales publican ofertas con descripciones ambiguas, criterios excluyentes ocultos entre párrafos genéricos y requisitos inconsistentes. El candidato asume un alto coste cognitivo antes de saber siquiera si su perfil encaja.",
      "A esta asimetría se suma una preparación manual repetitiva y fragmentada: redactar cartas de presentación específicas, investigar a la empresa en múltiples fuentes (Glassdoor, prensa, redes), detectar qué habilidades le faltan y preparar entrevistas técnicas sin feedback objetivo.",
      "El proyecto Alina nació en el Máster de IA de EDEM para resolver esa fricción de extremo a extremo: transformar ofertas desestructuradas en información accionable, ofrecer un cálculo de compatibilidad transparente y dotar al candidato de agentes especializados que potencien su preparación.",
    ],
  },
  contribution: {
    id: "aportacion",
    label: "Mi aportación",
    title: "Arquitectura de IA, diseño de agentes y backend",
    paragraphs: [
      "Como parte del equipo de cuatro integrantes, mi trabajo se centró en la arquitectura de Inteligencia Artificial, la orquestación de agentes con Google ADK (Agent Development Kit) y el desarrollo de la API en FastAPI.",
      "Diseñé e implementé el pipeline de extracción y análisis de CV (PDF y DOCX), el algoritmo matemático de Match Score explicable y la arquitectura en dos fases para optimizar tokens y latencia en los agentes de investigación y upskilling.",
      "Asimismo, participé en la definición del flujo colaborativo escritor-crítico para cartas de presentación con guardrails estrictos de fidelidad al CV, evitando que el modelo invente logros, tecnologías o experiencia ausentes en el perfil del candidato.",
    ],
  },
  architecture: {
    id: "arquitectura",
    label: "Arquitectura",
    title: "Un backend desacoplado con agentes orquestados",
    paragraphs: [
      "La solución separa la capa de presentación de la lógica de procesamiento. El frontend en React interactúa mediante llamadas REST y Server-Sent Events (SSE) con una API construida sobre FastAPI y Python 3.11.",
      "La orquestación de agentes se apoya en Google ADK sobre el modelo Gemini 2.5 Flash. Cada agente cuenta con herramientas especializadas (tools) y un contexto de sesión en memoria, permitiendo tanto ejecuciones secuenciales como agentes en bucle de refinamiento.",
      "Ante la limitación inicial de costes en la API de LinkedIn y la baja calidad de APIs gratuitas como Adzuna (cuyas descripciones venían truncadas a 500 caracteres), diseñamos un pipeline dual: búsqueda automática en Adzuna combinada con un scraper en Selenium para extraer el texto íntegro de la oferta, junto a una opción de pegado manual para analizar cualquier oferta sin depender de servicios de terceros.",
    ],
  },
  agents: {
    id: "agentes",
    label: "Agentes IA",
    title: "Cuatro agentes especializados con propósitos delimitados",
    paragraphs: [
      "En lugar de delegar todo el comportamiento en un único prompt conversacional, Alina estructura el sistema en cuatro agentes con responsabilidades aisladas:",
      "1. Carta de presentación: Opera bajo un patrón colaborativo escritor-crítico (LlmAgent escritor ↔ LlmAgent editor dentro de un bucle LoopAgent con condición de escape exit_loop()), finalizando en un formateador JSON. El editor actúa como un evaluador senior inflexible: detecta afirmaciones no fundamentadas en el CV y exige reescrituras hasta garantizar veracidad absoluta y alineación estratégica.",
      "2. Simulador de entrevistas: Agente conversacional que conduce una entrevista técnica realista paso a paso (soportando respuestas en texto y voz). Tras cada intervención, evalúa la respuesta según una rúbrica interna (puntuación de 0 a 10, fortalezas, puntos de mejora y una respuesta ideal explicada), adaptando la siguiente pregunta según la dificultad acumulada.",
      "3. Upskilling: Analiza las brechas de habilidades identificadas por el matcher, consulta recursos de aprendizaje en plataformas reconocidas mediante Google Search, clasifica la dificultad (advirtiendo si una skill requiere certificaciones o años de dedicación no viables a corto plazo) y genera un plan formativo priorizado.",
      "4. Company Research: Recopila inteligencia empresarial en tiempo real mediante Google Search, sintetizando cultura corporativa, aspectos positivos, posibles señales de alerta (red flags), noticias recientes con enlaces verificables y preguntas inteligentes para que el candidato plantee en la entrevista.",
    ],
  },
  matching: {
    id: "matching",
    label: "Match Score",
    title: "Un algoritmo de compatibilidad transparente y auditable",
    paragraphs: [
      "Los sistemas comerciales de reclutamiento suelen apoyarse en puntuaciones opacas de tipo 'caja negra'. En Alina, el cálculo de compatibilidad es determinista y completamente explicable tanto para el candidato como para el evaluador.",
      "El pipeline extrae las habilidades técnicas requeridas en la oferta y las cruza con las habilidades verificadas en el CV del candidato, clasificando cada requisito en coincidencia total (matched), coincidencia parcial (partial) o faltante (missing).",
      "La fórmula pondera el grado de cobertura e incorpora un incentivo cuando la modalidad de trabajo de la oferta coincide con la preferencia explícita del usuario:",
    ],
  },
  optimization: {
    id: "optimizacion",
    label: "Optimización",
    title: "Separar razonamiento de formato: menos tokens, máxima fiabilidad",
    paragraphs: [
      "En las primeras iteraciones, exigir al LLM que investigara en internet, razonara y produjera simultáneamente un JSON estructurado en un único prompt ('one-shot') generaba problemas graves: prompts enormes, coste elevado por turno y una tasa de fallos de formato JSON de casi el 40%, obligando a repetir llamadas costosas.",
      "La solución arquitectónica consistió en desacoplar responsabilidades en dos pasos: en el Paso 1, el agente ADK investiga y razona en texto libre con herramientas externas, sin restricciones sintácticas. En el Paso 2, una llamada corta y determinista a Gemini recibe el texto consolidado y lo transforma al esquema JSON final.",
      "El resultado fue contundente: los tokens por llamada cayeron de ~1.500 a ~900 (-40%), y la fiabilidad de salida del JSON aumentó del ~60% a más del ~95%. Paralelamente, la paralelización del scraping y parsing redujo el tiempo total de ejecución de 55 segundos a solo 30 segundos (-45%), logrando una precisión en extracción de skills clave superior al 85%.",
    ],
  },
  outcome: {
    id: "resultado",
    label: "Evolución y modelo",
    title: "De prototipo experimental a solución modular",
    paragraphs: [
      "El proyecto transitó de un primer MVP en Streamlit para validar el concepto a una arquitectura profesional desacoplada con backend en FastAPI y frontend en React, preparada para escalar e incorporar nuevos servicios sin rehacer la lógica base.",
      "Como parte del diseño de producto, se articuló una propuesta de negocio dual: un modelo Freemium para adopción inicial entre estudiantes, bootcamps y candidatos individuales, y una versión Pro por suscripción orientada a universidades, career centers y agencias de orientación laboral.",
      "Las líneas de evolución técnica contemplan la integración de APIs oficiales, simulación de entrevistas con análisis de vídeo y expresiones faciales, un Career Tracker histórico de candidaturas, extensión para navegadores y recomendación adaptativa mediante Reinforcement Learning.",
    ],
  },
  learning: {
    id: "aprendizajes",
    label: "Aprendizajes",
    title: "Ingeniería de agentes para problemas reales",
    paragraphs: [
      "Este proyecto consolidó aprendizajes esenciales sobre el desarrollo de sistemas con modelos de lenguaje. En primer lugar, que los agentes deben tener límites muy estrechos: un agente generalista fracasa con facilidad, mientras que un equipo de agentes especializados con herramientas y guardrails concretos produce resultados predecibles y de alta calidad.",
      "En segundo lugar, que la resiliencia de datos es prioritaria sobre la magia del LLM. Las APIs externas fallan, truncan descripciones o cambian esquemas; contar con scrapers alternativos y permitir la entrada manual directa es lo que hace viable un producto frente a las contingencias del entorno.",
      "Por último, la importancia de la veracidad: en un contexto donde el trabajo y la carrera de una persona están en juego, un sistema de IA no puede permitirse alucinar capacidades. El diseño de agentes críticos que verifiquen el contenido frente al CV demostró que la honestidad algorítmica es un requisito de diseño imprescindible.",
    ],
  },
} as const satisfies { introduction: string; contextNote: string } & Record<
  | "context"
  | "contribution"
  | "architecture"
  | "agents"
  | "matching"
  | "optimization"
  | "outcome"
  | "learning",
  CaseSection
>;

export const alinaSections = [
  alinaCase.context,
  alinaCase.contribution,
  alinaCase.architecture,
  alinaCase.agents,
  alinaCase.matching,
  alinaCase.optimization,
  alinaCase.outcome,
  alinaCase.learning,
] as const;

export const alinaPipeline = [
  { title: "CV & Oferta", detail: "Entrada PDF/DOCX o texto libre" },
  { title: "Buscador / Scraper", detail: "Adzuna + Selenium en paralelo" },
  { title: "Analizador ADK", detail: "Extracción y normalización de skills" },
  { title: "Calculador Match", detail: "Score determinista + bonus modalidad" },
  { title: "Agentes Satélite", detail: "Carta, Entrevista, Upskilling y Research" },
] as const;

export const alinaTools = [
  "Python",
  "FastAPI",
  "Google ADK",
  "Google Gemini 2.5 Flash",
  "Selenium",
  "React",
  "Vite",
  "Uvicorn",
  "Prompt Engineering",
] as const;

// Métricas de optimización obtenidas en las pruebas empíricas del proyecto (diapositivas 11 y 12)
export const alinaOptimizationMetrics = [
  {
    metric: "Tokens por llamada",
    oneshot: 1500,
    twostep: 900,
    reduction: "-40%",
    unit: "tokens",
    description: "Desacoplar la investigación en texto libre del formateo JSON reduce drásticamente el tamaño del contexto.",
  },
  {
    metric: "Fiabilidad JSON",
    oneshot: 60,
    twostep: 95,
    reduction: "+58%",
    unit: "%",
    description: "Separar responsabilidades eliminó prácticamente las repeticiones por error de sintaxis en el payload.",
  },
  {
    metric: "Tiempo de respuesta",
    oneshot: 55,
    twostep: 30,
    reduction: "-45%",
    unit: "s",
    description: "La paralelización de scrapers y llamadas en ADK redujo el tiempo total de procesamiento casi a la mitad.",
  },
] as const;

// Ofertas y perfiles de demostración para el calculador interactivo
export type SampleJobOffer = {
  id: string;
  role: string;
  company: string;
  location: string;
  modality: "Remoto" | "Híbrido" | "Presencial";
  description: string;
  requiredSkills: readonly string[];
  sampleMatched: readonly string[];
  samplePartial: readonly string[];
  sampleMissing: readonly string[];
};

export const sampleJobOffers: readonly SampleJobOffer[] = [
  {
    id: "ai-engineer",
    role: "AI Engineer / MLOps",
    company: "DataVanguard Tech",
    location: "Valencia / Remoto",
    modality: "Remoto",
    description: "Desarrollo de pipelines de agentes inteligentes, despliegue de modelos LLM y optimización de latencia.",
    requiredSkills: ["Python", "FastAPI", "Google Cloud / Vertex AI", "Docker", "Prompt Engineering", "MLOps", "LangChain / ADK", "Kubernetes"],
    sampleMatched: ["Python", "FastAPI", "Docker", "Prompt Engineering", "LangChain / ADK"],
    samplePartial: ["Google Cloud / Vertex AI", "MLOps"],
    sampleMissing: ["Kubernetes"],
  },
  {
    id: "data-analyst",
    role: "Senior Data & BI Analyst",
    company: "Global Logistics Group",
    location: "Madrid / Híbrido",
    modality: "Híbrido",
    description: "Modelado dimensional, extracción ETL, creación de cuadros de mando ejecutivos y soporte a la toma de decisiones.",
    requiredSkills: ["SQL", "Power BI", "PostgreSQL", "Python", "dbt", "Modelado dimensional", "Git"],
    sampleMatched: ["SQL", "Power BI", "PostgreSQL", "Python", "Modelado dimensional", "Git"],
    samplePartial: ["dbt"],
    sampleMissing: [],
  },
  {
    id: "product-bi",
    role: "Product Analytics & AI Specialist",
    company: "Innova SaaS Solutions",
    location: "Barcelona / Remoto",
    modality: "Remoto",
    description: "Conexión entre necesidades de negocio, analítica de producto e integración de modelos predictivos orientados al usuario.",
    requiredSkills: ["Product Analytics", "Python", "SQL", "A/B Testing", "Machine Learning", "FastAPI", "Scrum"],
    sampleMatched: ["Python", "SQL", "Machine Learning", "FastAPI"],
    samplePartial: ["Product Analytics", "A/B Testing"],
    sampleMissing: ["Scrum"],
  },
] as const;

export const sampleCandidateProfile = {
  name: "Bruno Esteve",
  education: "Máster en Inteligencia Artificial (EDEM) / Grado en BIA (Universitat de València)",
  skills: [
    "Python",
    "SQL",
    "FastAPI",
    "Google Cloud",
    "Docker",
    "Prompt Engineering",
    "Google ADK",
    "Power BI",
    "PostgreSQL",
    "Modelado dimensional",
    "Machine Learning",
    "Git",
  ],
  preferredModality: "Remoto",
} as const;

// Ejemplos estructurados de la salida de los 4 agentes para el visor interactivo
export const sampleAgentOutputs = {
  coverLetter: {
    title: "Agente de Carta de Presentación",
    role: "Arquitectura Colaborativa: Escritor (LLM) ↔ Crítico (LLM) en bucle con LoopAgent",
    status: "Borrador verificado y libre de alucinaciones",
    keyPoints: [
      "Alineación estricta entre el stack del candidato (FastAPI, Python, Google ADK) y los requisitos del puesto",
      "Énfasis en la optimización de latencia y costes en arquitecturas de agentes",
      "Sin invención de empresas anteriores, títulos ni métricas infladas (validado por el crítico)",
    ],
    tone: "Profesional, técnico y orientado al impacto de negocio",
    letterText: `Estimado equipo de selección de DataVanguard Tech,

Les escribo para presentar mi candidatura a la posición de AI Engineer. Cuento con formación en Inteligencia Artificial y Business Analytics, habiendo desarrollado soluciones de arquitectura de agentes autónomos, optimización de pipelines de datos y modelos predictivos orientados a producción.

En mis proyectos más recientes con Google ADK y modelos Gemini, he diseñado arquitecturas desacopladas con FastAPI capaces de reducir la latencia de respuesta en un 45% mediante paralelización y optimizar el consumo de tokens separando el razonamiento libre del formateo estructurado. Mi enfoque une el rigor técnico con la necesidad de negocio: diseñar sistemas de IA que sean rápidos, reproducibles y medibles.

Agradezco de antemano su tiempo y consideración, y quedo a su entera disposición para profundizar en cómo puedo aportar valor a su equipo.

Atentamente,
Bruno Esteve`,
  },
  interview: {
    title: "Simulador Técnico de Entrevistas",
    role: "Entrevistador interactivo con evaluación en tiempo real y rúbrica objetiva",
    question: "¿Cómo abordarías el problema de la latencia y la variabilidad de salida al estructurar datos con un LLM en un entorno de producción?",
    candidateAnswer: "Desacoplaría la llamada en dos fases: un primer agente con herramientas para investigar y razonar en texto libre, y un segundo paso con un prompt muy acotado dedicado exclusivamente a convertir el texto a JSON estricto. Además, paralelizaría llamadas independientes.",
    evaluation: {
      score: 9.2,
      summary: "Respuesta sobresaliente. Aborda la causa raíz del cuello de botella en agentes LLM y propone una arquitectura de dos pasos con paralelización.",
      strengths: [
        "Identifica con precisión el sobrecoste de obligar al modelo a razonar y estructurar a la vez.",
        "Menciona la paralelización de tareas independientes para recortar tiempos de espera.",
      ],
      improvement: "Podría añadir mecanismos de fallback o retry exponencial ante posibles fallos de red en las APIs.",
      idealAnswer: "La solución óptima separa la fase de razonamiento con herramientas del formateo JSON determinista, reduciendo tokens y evitando regeneraciones completas ante errores de sintaxis, complementado con ejecución asíncrona concurrente.",
    },
  },
  companyResearch: {
    title: "Agente de Research de Empresa",
    role: "Inteligencia empresarial previa a la entrevista mediante Google Search",
    company: "DataVanguard Tech",
    sector: "Inteligencia Artificial y Software B2B",
    summary: "Compañía tecnológica especializada en desarrollo de soluciones de automatización y asistentes inteligentes para el sector empresarial.",
    strengths: [
      "Equipo técnico con fuerte adopción de arquitecturas cloud nativas",
      "Crecimiento interanual sólido y expansión en mercados europeos",
    ],
    redFlags: [
      "Ritmo acelerado de entregas; requiere alta autonomía y gestión de la ambigüedad",
    ],
    news: [
      {
        headline: "DataVanguard cierra ronda de financiación para acelerar su plataforma de agentes autónomos",
        summary: "Ampliación de capital destinada a infraestructura de cómputo y desarrollo de APIs empresariales.",
        source: "https://ejemplo-noticias-tech.com/datavanguard-ronda-2026",
      },
    ],
    smartQuestions: [
      "¿Cómo gestiona el equipo la trazabilidad y observabilidad de llamadas concurrentes a modelos de lenguaje en producción?",
      "¿Cuáles son los principales criterios de aceptación antes de desplegar un nuevo agente en entornos críticos?",
    ],
    cvGuardrailAdvice: "Enfócate en tu experiencia real optimizando llamadas a APIs y estructuración de datos; si preguntan por Kubernetes, explica con honestidad que dominas Docker y tu disposición para aprender su orquestación.",
  },
  upskilling: {
    title: "Agente de Upskilling y Skill Gaps",
    role: "Detección de brechas formativas y plan de estudio priorizado con recursos verificados",
    gaps: [
      {
        skill: "Kubernetes (K8s)",
        priority: 1,
        highDifficulty: false,
        warning: null,
        estimatedTime: "3 a 4 semanas para nivel funcional",
        resources: [
          { name: "Documentación Oficial Kubernetes: Conceptos Clave", type: "Documentación", url: "https://kubernetes.io/docs/tutorials/" },
          { name: "Kubernetes for Developers (Coursera / edX)", type: "Curso Online", url: "https://www.coursera.org/search?query=kubernetes" },
        ],
      },
      {
        skill: "MLOps con Vertex AI",
        priority: 2,
        highDifficulty: false,
        warning: null,
        estimatedTime: "2 semanas",
        resources: [
          { name: "Google Cloud Skills Boost: Production ML Systems", type: "Curso / Lab", url: "https://www.cloudskillsboost.google" },
        ],
      },
    ],
    strategicSummary: "La prioridad inmediata debe ser afianzar el despliegue en Kubernetes partiendo de tu dominio consolidado de Docker. Dedicar la primera semana a conceptos de Pods y Services antes de pasar a orquestación de clústeres.",
  },
} as const;

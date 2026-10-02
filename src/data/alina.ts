import type { CaseSection } from "./projects";

type ArchitectureInput = {
  title: string;
  steps: readonly string[];
};

// Fuentes: Presentación del proyecto de máster (5 marzo 2026), repositorio público en GitHub (ia-project-II)
// y arquitectura implementada en FastAPI + Google ADK + React.
export const alinaCase = {
  introduction:
    "Construir un asistente inteligente para transformar la búsqueda de empleo: extracción y matching explicable de habilidades, simulación de entrevistas y agentes colaborativos sin alucinaciones.",
  confidentiality:
    "Proyecto de ingeniería de IA aplicada desarrollado en equipo en EDEM (Grupo 3: Adrián Alemany, Bruno Esteve, Silvia Pla y Clàudia Salgado). Backend funcional en FastAPI con Google ADK y Gemini 2.5 Flash, y frontend en React. Todos los ejemplos y perfiles interactivos de este portfolio se presentan con fines ilustrativos sobre arquitectura real.",
  contextNote:
    "Proyecto de ingeniería de IA aplicada desarrollado en equipo en EDEM (Grupo 3: Adrián Alemany, Bruno Esteve, Silvia Pla y Clàudia Salgado). Backend funcional en FastAPI con Google ADK y Gemini 2.5 Flash, y frontend en React. Todos los ejemplos y perfiles interactivos de este portfolio se presentan con fines ilustrativos sobre arquitectura real.",
  context: {
    id: "contexto",
    label: "El reto",
    title: "El problema no es encontrar ofertas, sino decidir con confianza",
    paragraphs: [
      "Buscar empleo suele convertirse en un proceso agotador y lleno de incertidumbre. Los portales tradicionales publican cientos de ofertas con descripciones confusas, requisitos contradictorios y criterios excluyentes ocultos entre párrafos genéricos. El candidato invierte horas antes de saber si su perfil encaja realmente.",
      "A esta desinformación se suma una preparación manual repetitiva y fragmentada: redactar cartas de presentación específicas, investigar la cultura corporativa en múltiples fuentes y afrontar entrevistas técnicas sin feedback objetivo ni criterios claros de evaluación.",
      "El proyecto Alina nació en el Máster de IA de EDEM para eliminar esa fricción de principio a fin: transformar ofertas desestructuradas en datos claros, medir la compatibilidad de forma transparente y dotar al candidato de un equipo de asistentes inteligentes que potencien su candidatura con rigor técnico.",
    ],
  },
  contribution: {
    id: "aportacion",
    label: "Mi aportación",
    title: "Arquitectura de IA, diseño de agentes y backend",
    paragraphs: [
      "Dentro del equipo de cuatro integrantes de Alina, mi contribución se centró en la arquitectura integral de Inteligencia Artificial, la orquestación multi-agente con Google ADK (Agent Development Kit) y el desarrollo de la API asíncrona en FastAPI.",
      "Diseñé e implementé el pipeline de extracción y estructuración de CVs (PDF y DOCX), el algoritmo matemático de Match Score explicable y la arquitectura de prompts en dos fases para optimizar tokens y latencia en los agentes de investigación y upskilling.",
      "Asimismo, definí el flujo colaborativo escritor-crítico para la redacción de cartas con guardrails estrictos de fidelidad al CV, coordinando con mis compañeros para que los modelos se integraran de manera reactiva con la interfaz en React mediante streaming con Server-Sent Events (SSE).",
    ],
  },
  architecture: {
    id: "arquitectura",
    label: "Arquitectura",
    title: "Un backend desacoplado con agentes orquestados",
    paragraphs: [
      "Para ofrecer una respuesta rápida y reactiva, separamos la interfaz web en React de la lógica de procesamiento en el backend, construido sobre FastAPI y Python 3.11. Sobre esta base, orquestamos cuatro agentes especializados con Google ADK utilizando el modelo Gemini 2.5 Flash.",
      "Las APIs de empleo gratuitas suelen truncar las descripciones a unas pocas líneas. Para solucionarlo, construimos un pipeline dual: búsqueda automatizada combinada con un extractor propio en Selenium para obtener la vacante completa, sumado a una opción de pegado manual directo para analizar cualquier oferta sin depender de servicios de terceros.",
      "A continuación, el esquema funcional refleja cómo convergen las entradas, se procesan en el backend y alimentan tanto el motor de compatibilidad como el dossier de preparación del candidato.",
    ],
  },
  preparation: {
    id: "preparacion",
    label: "Preparación de datos",
    title: "Extracción, estructuración y normalización de competencias",
    paragraphs: [
      "Los currículums y las ofertas de empleo son documentos intrínsecamente heterogéneos y desestructurados. Un PDF puede organizar las habilidades en tablas, barras laterales o párrafos narrativos, mientras que las ofertas alternan nombres comerciales, acrónimos y requisitos implícitos. Para posibilitar una comparación rigurosa, el primer paso del pipeline es la normalización de entidades.",
      "Mediante librerías especializadas (pypdf y python-docx) y prompts extractores con esquemas estrictos de salida en Gemini, el sistema aísla las competencias técnicas (hard skills), las habilidades interpersonales (soft skills), los años de experiencia y la modalidad laboral (remoto, híbrido o presencial). Cada tecnología se mapea contra una taxonomía canónica que unifica variantes como «Postgres» y «PostgreSQL», o «K8s» y «Kubernetes».",
      "Esta estructuración previa garantiza que los agentes posteriores no trabajen sobre texto crudo ruidoso, sino sobre perfiles semánticos comparables y auditables, sentando las bases para el cálculo matemático de compatibilidad.",
    ],
  },
  mlopsPipeline: {
    id: "pipeline-ia",
    label: "Pipeline de IA",
    title: "El flujo de IA: matching matemático, especialización y optimización",
    paragraphs: [
      "Con los perfiles normalizados, el sistema despliega su inteligencia en tres fases complementarias: el cálculo determinista del ajuste, la activación de agentes especializados y la optimización de latencia en producción.",
      "Para evitar la arbitrariedad de los filtros opacos de selección, el Match Score aplica una fórmula matemática transparente: divide las habilidades cubiertas y parciales entre el total de requisitos de la oferta, sumando un incentivo si coincide la modalidad preferida de trabajo. Cada punto porcentual es explicable y auditable por el usuario.",
      "A continuación, cuatro agentes especializados entran en acción según la necesidad del candidato: uno redacta cartas de presentación fieles a su experiencia real, otro simula entrevistas técnicas con preguntas y notas cuantitativas, un tercero detecta qué habilidades le faltan sugiriendo cursos prácticos, y el último investiga a la empresa antes de la reunión.",
      "Para que estos agentes respondieran rápido y sin fallos, dividimos las llamadas al modelo en dos pasos: primero razona libremente y consulta fuentes; después, una llamada rápida da formato a la respuesta final. Como muestra la gráfica inferior, este cambio redujo el tiempo de espera casi a la mitad y recortó un 40% el gasto en tokens, eliminando errores de sintaxis.",
    ],
  },
  finalProduct: {
    id: "producto-final",
    label: "Producto final",
    title: "Asistente modular y simulador en tiempo real",
    paragraphs: [
      "Todo el pipeline de agentes e inferencia se materializa en una interfaz interactiva en React que empodera al candidato durante todo su ciclo de postulación. En lugar de ofrecer un simple chat genérico, la aplicación organiza la experiencia en tres espacios especializados: cálculo de compatibilidad, interacción con agentes y monitorización de rendimiento.",
      "El candidato puede inspeccionar en vivo el desglose de sus habilidades frente a diferentes ofertas, consultar las recomendaciones personalizadas de cada agente (descargando cartas validadas o practicando entrevistas con evaluación inmediata) y comprobar la eficiencia operativa del sistema.",
      "A continuación puedes explorar el prototipo funcional de Alina. Selecciona diferentes puestos de demostración, consulta el cálculo de compatibilidad y experimenta las salidas de los cuatro agentes inteligentes.",
    ],
  },
  learning: {
    id: "aprendizajes",
    label: "Aprendizajes",
    title: "Ingeniería de agentes para problemas reales",
    paragraphs: [
      "Alina consolidó tres lecciones esenciales sobre el desarrollo de sistemas basados en inteligencia artificial: primero, que los agentes deben tener límites muy estrechos: un equipo de asistentes especializados con herramientas concretas supera con creces a un modelo generalista.",
      "Segundo, que la resiliencia en la captura de datos es prioritaria sobre cualquier algoritmo: las APIs de terceros fallan o truncan información, por lo que disponer de scrapers alternativos y entrada manual directa es lo que hace viable un producto ante contingencias reales.",
      "Y tercero, la importancia de la honestidad algorítmica: cuando está en juego la carrera profesional de una persona, el sistema no puede permitirse alucinar. Diseñar agentes críticos que verifiquen cada afirmación frente a la realidad del currículum es una exigencia técnica y ética indispensable.",
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

export const alinaSections = [
  alinaCase.context,
  alinaCase.contribution,
  alinaCase.architecture,
  alinaCase.preparation,
  alinaCase.mlopsPipeline,
  alinaCase.finalProduct,
  alinaCase.learning,
  {
    id: "herramientas",
    label: "Herramientas",
    title: "Herramientas y tecnologías",
    paragraphs: [],
  },
] as const;

export const alinaInputs = [
  {
    title: "Perfil del candidato",
    steps: ["Currículum (PDF/DOCX)", "Extracción PyPDF / docx", "Texto normalizado"],
  },
  {
    title: "Ofertas de empleo",
    steps: ["API de Adzuna", "Selenium Scraper en paralelo", "Oferta íntegra"],
  },
  {
    title: "Entrada directa",
    steps: ["Pegado manual de texto", "Sanitización de caracteres", "Fallback sin dependencias"],
  },
] as const satisfies readonly ArchitectureInput[];

export const alinaDataUses = [
  {
    title: "Scoring y compatibilidad",
    service: "Algoritmo determinista",
    action: "Calcular cobertura y bonus de modalidad",
    outcome: "Match Score explicable (%)",
    audience: "Candidato y evaluador",
  },
  {
    title: "Preparación con agentes",
    service: "Agentes satélite ADK",
    action: "LoopAgent (Carta), Entrevista, Upskilling, Research",
    outcome: "Dossier 360° verificado",
    audience: "Candidato a empleo",
  },
] as const;

export const alinaDecisions = [
  {
    title: "Ingesta dual: scraping paralelo y contingencia de pegado manual",
    paragraphs: [
      "Las APIs públicas de empleo como Adzuna truncan las descripciones a 500 caracteres, omitiendo requisitos técnicos críticos. Diseñamos un pipeline donde Selenium extrae la oferta original completa en paralelo, asegurando que el modelo disponga del contexto íntegro.",
      "Como salvaguarda operativa ante bloqueos o cambios de HTML en portales de terceros, se habilitó la entrada manual directa, garantizando que el usuario siempre pueda analizar cualquier oferta sin depender de la disponibilidad de servicios externos.",
    ],
  },
  {
    title: "Orquestación multi-agente con patrón colaborativo escritor-crítico",
    paragraphs: [
      "En lugar de confiar la redacción de cartas a un prompt único propenso a inventar méritos, implementamos un bucle LoopAgent en Google ADK donde un agente escritor genera borradores y un agente evaluador senior actúa como crítico inflexible.",
      "El crítico audita cada afirmación contrastándola exclusivamente con las tecnologías y experiencias verificadas en el CV. Si detecta competencias no respaldadas, rechaza la versión y fuerza una reescritura, saliendo del bucle (exit_loop()) únicamente cuando la fidelidad es total.",
    ],
  },
  {
    title: "Desacoplamiento de prompts en dos fases: razonamiento y formateo",
    paragraphs: [
      "Exigir al LLM que investigue en internet con herramientas externas, razone la estrategia y genere a la vez un JSON estructurado provocaba una tasa de fallo de formato del 40% y un elevado coste en tokens por turno.",
      "La solución consistió en separar el flujo: la fase 1 razona y consulta fuentes en texto libre sin restricciones sintácticas; la fase 2 ejecuta una llamada compacta y determinista orientada exclusivamente a validar y estructurar el payload JSON final.",
    ],
  },
] as const;

export const alinaPipeline = [
  { title: "CV & Oferta", detail: "Entrada PDF/DOCX o texto libre" },
  { title: "Buscador / Scraper", detail: "Adzuna + Selenium en paralelo" },
  { title: "Analizador ADK", detail: "Extracción y normalización de skills" },
  { title: "Calculador Match", detail: "Score determinista + bonus modalidad" },
  { title: "Agentes Satélite", detail: "Carta, Entrevista, Upskilling y Research" },
] as const;

export const alinaTools = [
  "Google Cloud",
  "Python",
  "FastAPI",
  "Docker",
  "Selenium",
  "React",
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

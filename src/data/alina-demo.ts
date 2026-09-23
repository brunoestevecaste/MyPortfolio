// Datos realistas y simulados para la demostración interactiva de Alina
// No se realizan llamadas a LLM ni APIs externas; todo el comportamiento es determinista e interactivo.

export type DemoJobOffer = {
  id: string;
  role: string;
  company: string;
  location: string;
  modality: "Remoto" | "Híbrido" | "Presencial";
  salary: string;
  contract: string;
  summary: string;
  fullDescription: string;
  skills: readonly {
    name: string;
    levelRequired: "Avanzado" | "Medio" | "Básico";
    category: "Técnica" | "Datos / IA" | "Metodología";
  }[];
  // Relación con el perfil del candidato
  coverage: {
    senior: {
      matched: readonly string[];
      partial: readonly string[];
      missing: readonly string[];
    };
    transition: {
      matched: readonly string[];
      partial: readonly string[];
      missing: readonly string[];
    };
  };
  // Carta de presentación simulada por tono
  coverLetters: {
    professional: string;
    close: string;
    tech: string;
  };
  coverAnalysis: {
    keyPoints: readonly string[];
    toneAssessment: string;
    recommendation: string;
    guardrailCheck: string;
  };
  // Entrevista simulada (4 turnos secuenciales)
  interviewTurns: readonly {
    turnNumber: number;
    topic: string;
    question: string;
    candidateResponses: {
      strong: {
        text: string;
        score: number;
        evaluation: string;
        strengths: readonly string[];
        improvements: string;
        idealAnswer: string;
      };
      basic: {
        text: string;
        score: number;
        evaluation: string;
        strengths: readonly string[];
        improvements: string;
        idealAnswer: string;
      };
    };
  }[];
  // Research de la empresa
  companyIntel: {
    sector: string;
    size: string;
    founded: string;
    overview: string;
    strengths: readonly string[];
    redFlags: readonly string[];
    culture: readonly string[];
    news: readonly {
      headline: string;
      source: string;
      date: string;
      summary: string;
    }[];
    smartQuestions: readonly string[];
    cvGuardrailTip: string;
  };
  // Plan de Upskilling
  upskilling: {
    strategicOverview: string;
    gaps: readonly {
      skill: string;
      priority: number;
      difficulty: "Normal" | "Alta (Requiere dedicación prolongada)";
      timeEstimate: string;
      resources: readonly {
        title: string;
        platform: string;
        type: "Documentación" | "Curso Online" | "Proyecto Práctico";
        url: string;
      }[];
    }[];
    roadmap: {
      week1: string;
      month1: string;
      quarter1: string;
    };
  };
};

export const demoCandidateProfiles = [
  {
    id: "senior",
    label: "Bruno Esteve (Perfil verificado: Data & AI Engineer)",
    education: "Máster en IA (EDEM) / Grado en BIA (Universitat de València)",
    experienceYears: "3+ años en analítica, BI y sistemas de IA",
    skills: [
      "Python",
      "FastAPI",
      "SQL",
      "PostgreSQL",
      "Power BI",
      "Google Cloud Platform",
      "Google ADK",
      "Docker",
      "dbt",
      "Machine Learning",
      "Prompt Engineering",
      "Modelado dimensional",
      "Git",
    ],
  },
  {
    id: "transition",
    label: "Candidato en transición (Data Analyst Junior)",
    education: "Grado en ADE / Bootcamp de Análisis de Datos",
    experienceYears: "1 año de experiencia inicial",
    skills: ["Python", "SQL", "Power BI", "Excel Avanzado", "Git"],
  },
] as const;

export const demoJobOffers: readonly DemoJobOffer[] = [
  {
    id: "datavanguard-ai",
    role: "AI Engineer & MLOps Specialist",
    company: "DataVanguard Tech",
    location: "Valencia / Remoto",
    modality: "Remoto",
    salary: "42.000 € - 52.000 €",
    contract: "Indefinido · Jornada completa",
    summary:
      "Desarrollo e integración de agentes autónomos con LLMs, diseño de microservicios con FastAPI y despliegue de pipelines reproducibles en Google Cloud.",
    fullDescription:
      "Buscamos un perfil técnico que conecte modelos de lenguaje con servicios backend de baja latencia. El candidato formará parte de un equipo multidisciplinar encargado de orquestar agentes conversacionales con Google ADK, monitorizar inferencia y paquetizar aplicaciones en contenedores Docker sobre infraestructuras cloud.",
    skills: [
      { name: "Python", levelRequired: "Avanzado", category: "Técnica" },
      { name: "FastAPI", levelRequired: "Avanzado", category: "Técnica" },
      { name: "Google ADK / LangChain", levelRequired: "Medio", category: "Datos / IA" },
      { name: "Google Cloud / Vertex AI", levelRequired: "Medio", category: "Datos / IA" },
      { name: "Docker", levelRequired: "Medio", category: "Técnica" },
      { name: "Prompt Engineering", levelRequired: "Avanzado", category: "Datos / IA" },
      { name: "MLOps & Monitorización", levelRequired: "Medio", category: "Datos / IA" },
      { name: "Kubernetes (K8s)", levelRequired: "Básico", category: "Técnica" },
    ],
    coverage: {
      senior: {
        matched: ["Python", "FastAPI", "Google ADK / LangChain", "Docker", "Prompt Engineering"],
        partial: ["Google Cloud / Vertex AI", "MLOps & Monitorización"],
        missing: ["Kubernetes (K8s)"],
      },
      transition: {
        matched: ["Python"],
        partial: [],
        missing: [
          "FastAPI",
          "Google ADK / LangChain",
          "Google Cloud / Vertex AI",
          "Docker",
          "Prompt Engineering",
          "MLOps & Monitorización",
          "Kubernetes (K8s)",
        ],
      },
    },
    coverLetters: {
      professional: `Estimado equipo de selección de DataVanguard Tech,

Me dirijo a ustedes para presentar mi candidatura a la posición de AI Engineer & MLOps Specialist. Con formación especializada en el Máster de Inteligencia Artificial de EDEM y experiencia práctica en el diseño de agentes inteligentes con Google ADK y modelos Gemini, mi trayectoria se ha centrado en construir sistemas de IA rápidos, reproducibles y orientados a resolver problemas reales de negocio.

En mis proyectos más recientes he liderado el desarrollo de microservicios con FastAPI, implementando arquitecturas de prompts en dos fases que reducen la latencia de respuesta en un 45% y el consumo de tokens en un 40%. Asimismo, cuento con experiencia desplegando en Google Cloud Platform y contenedorizando servicios con Docker bajo estándares rigurosos de calidad de software.

Agradezco su atención y quedo a su disposición para mantener una conversación sobre cómo mi perfil puede aportar valor al equipo técnico de DataVanguard.

Atentamente,
Bruno Esteve`,
      close: `Hola equipo de DataVanguard,

Os escribo porque me entusiasma el enfoque con el que estáis abordando los agentes autónomos. Mi especialización en el Máster de IA y mi experiencia construyendo microservicios en FastAPI y pipelines en Google Cloud encajan directamente con los retos técnicos de esta posición.

Me motiva especialmente el reto de optimizar la latencia y fiabilidad de los modelos LLM en producción. Estaría encantado de tener una charla y compartir con vosotros cómo resolví la orquestación multi-agente en mis proyectos más recientes.

Un saludo,
Bruno Esteve`,
      tech: `Estimado equipo técnico,

Postulo a la posición de AI Engineer & MLOps Specialist aportando experiencia directa en Python, FastAPI, Google ADK y contenedores Docker. En arquitecturas LLM recientes, he diseñado pipelines desacoplados que separan el razonamiento libre con herramientas de la serialización JSON determinista, alcanzando una fiabilidad de formato del 95% y una reducción de tokens a ~900 por llamada.

Si bien mi experiencia con Kubernetes se encuentra en fase inicial, compenso esa curva con un sólido dominio de Docker y despliegues en Google Cloud / Vertex AI. Quedo disponible para comentar detalles técnicos de implementación.

Saludos cordiales,
Bruno Esteve`,
    },
    coverAnalysis: {
      keyPoints: [
        "Alineación estricta con Python, FastAPI y Google ADK sin exagerar el nivel de Kubernetes.",
        "Mención de métricas cuantitativas reales: reducción de latencia del 45% y tokens del 40%.",
        "Estructura corporativa depurada: saludo formal, nudo con valor probado y cierre con llamada a la acción.",
      ],
      toneAssessment: "Técnico, riguroso y transparente. Transmite madurez de ingeniería de software.",
      recommendation: "Mantener el énfasis en la trazabilidad y la reproducibilidad de los modelos.",
      guardrailCheck: "APROBADO: 0 discrepancias frente a los datos del CV de Bruno.",
    },
    interviewTurns: [
      {
        turnNumber: 1,
        topic: "Arquitectura y FastAPI",
        question:
          "¿Cómo estructurarías un microservicio en FastAPI para gestionar llamadas asíncronas a un LLM sin bloquear el bucle de eventos principal?",
        candidateResponses: {
          strong: {
            text: "Implementaría endpoints asíncronos (`async def`) utilizando el cliente asíncrono del proveedor de LLM. Para respuestas de larga duración utilizaría Server-Sent Events (SSE) para enviar el streaming de tokens progresivamente al cliente, evitando timeouts de conexión y manteniendo la interfaz reactiva.",
            score: 9.4,
            evaluation:
              "Excelente respuesta. Demuestra comprensión precisa del event loop de Python/ASGI y propone SSE para streaming de inferencia.",
            strengths: [
              "Mención correcta de clientes asíncronos y no bloqueantes.",
              "Propuesta de Server-Sent Events para mitigar tiempos de espera.",
            ],
            improvements:
              "Podría añadir una mención sobre manejo de backpressure o colas Celery/Redis si el volumen escala drásticamente.",
            idealAnswer:
              "La arquitectura ideal utiliza endpoints async con el SDK oficial asíncrono, expone streaming mediante StreamingResponse con media_type='text/event-stream' y gestiona estados de sesión en caché en memoria o Redis.",
          },
          basic: {
            text: "Usaría funciones normales en Python y pondría un sleep o un hilo para que no se congele el servidor mientras responde el modelo.",
            score: 5.2,
            evaluation:
              "Respuesta insuficiente. Sugerir hilos o funciones síncronas bloquea los workers de Uvicorn y degrada la concurrencia.",
            strengths: ["Entiende que no se debe congelar el servidor."],
            improvements:
              "Debe profundizar en la naturaleza asíncrona nativa de FastAPI y el uso de corrutinas (`async/await`).",
            idealAnswer:
              "Debe apoyarse en la naturaleza ASGI de FastAPI y emplear clientes nativos asíncronos con SSE.",
          },
        },
      },
      {
        turnNumber: 2,
        topic: "Optimización de Latencia",
        question:
          "En sistemas multi-agente, ¿qué estrategia sigues cuando un LLM debe investigar con herramientas y devolver un JSON estructurado?",
        candidateResponses: {
          strong: {
            text: "Desacoplo la llamada en dos fases: en el Paso 1 dejo al agente ADK investigar con herramientas y razonar en texto libre sin restricciones sintácticas. En el Paso 2, una llamada muy corta a Gemini recibe ese texto y lo convierte a JSON estricto. Esto redujo los tokens de 1.500 a 900 y subió la fiabilidad del formato del 60% al 95%.",
            score: 9.8,
            evaluation:
              "Respuesta sobresaliente. Aborda la causa raíz del sobrecoste de tokens y la fragilidad del JSON en prompts monolíticos.",
            strengths: [
              "Separación de responsabilidades entre razonamiento y formateo.",
              "Métricas cuantitativas empíricas de mejora.",
            ],
            improvements: "Respuesta prácticamente inmejorable para este contexto.",
            idealAnswer:
              "Separar la llamada en dos etapas especializadas evita repetir búsquedas costosas ante fallos de sintaxis en el JSON y optimiza la ventana de contexto.",
          },
          basic: {
            text: "Le pongo en el prompt que por favor devuelva solo JSON y si falla le hago un retry hasta que salga bien.",
            score: 4.8,
            evaluation:
              "Enfoque ingenuo. El retry ciego con prompts grandes incrementa la latencia y multiplica los costes por 3x.",
            strengths: ["Conoce la necesidad del formato JSON."],
            improvements: "Evitar reintentos completos; desacoplar la generación de la extracción.",
            idealAnswer:
              "Desacoplar la fase de investigación de la fase de traducción sintáctica.",
          },
        },
      },
      {
        turnNumber: 3,
        topic: "Controles de Calidad y Guardrails",
        question:
          "¿Cómo evitas que un agente generador de cartas o respuestas alucine información profesional que el candidato no tiene?",
        candidateResponses: {
          strong: {
            text: "Utilizamos una arquitectura colaborativa escritor-crítico en bucle (LoopAgent). El editor recibe el perfil verificado del CV y analiza el borrador línea a línea. Si detecta tecnologías, empresas o años no fundamentados, rechaza el borrador y obliga al escritor a corregirlo. Solo cuando hay veracidad total se ejecuta `exit_loop()`.",
            score: 9.6,
            evaluation:
              "Respuesta impecable sobre alineación y control de alucinaciones en aplicaciones de impacto personal.",
            strengths: [
              "Uso de patrones de agentes críticos con criterio de parada estricto.",
              "Priorización de la honestidad algorítmica sobre la persuasión artificial.",
            ],
            improvements: "Se podría complementar con verificaciones regex de hechos clave.",
            idealAnswer:
              "Un agente crítico independiente con acceso exclusivo al ground-truth del CV audita cada afirmación antes de emitir la salida final.",
          },
          basic: {
            text: "Le pongo al LLM un prompt que diga 'sé honesto y no inventes nada'.",
            score: 5.0,
            evaluation:
              "Insuficiente. Los system prompts declarativos no garantizan ausencia de alucinación sin agentes de validación.",
            strengths: ["Reconoce la importancia de la veracidad."],
            improvements: "Implementar arquitecturas de doble paso o jueces evaluadores.",
            idealAnswer:
              "Incorporar un ciclo de crítica explícito con contratos de datos delimitados.",
          },
        },
      },
    ],
    companyIntel: {
      sector: "Inteligencia Artificial aplicada y Software Empresarial",
      size: "75 - 120 empleados (Scale-up tecnológica)",
      founded: "2021 · Valencia / Madrid",
      overview:
        "DataVanguard diseña plataformas B2B que integran agentes inteligentes autónomos en procesos corporativos de atención, operaciones y analítica de datos.",
      strengths: [
        "Equipo técnico altamente cualificado y arquitectura cloud-native sobre Google Cloud.",
        "Crecimiento del 65% interanual con financiación de fondos internacionales en 2025.",
        "Cultura transparente de trabajo por objetivos y flexibilidad horaria 100% remota.",
      ],
      redFlags: [
        "Ritmo acelerado de despliegues semanales; requiere tolerancia a la ambigüedad en requisitos.",
        "Documentación técnica de microservicios heredados en proceso de consolidación.",
      ],
      culture: [
        "Excelencia técnica pragmática",
        "Autonomía y ownership",
        "Orientación a impacto en producción sobre prototipos teóricos",
      ],
      news: [
        {
          headline: "DataVanguard cierra ronda Serie A de 4,5M€ para escalar su stack de agentes",
          source: "El Economista / Startups",
          date: "14 Enero 2026",
          summary:
            "La compañía destinará los fondos a incorporar talento en ingeniería de datos y expandir su presencia en Alemania y Reino Unido.",
        },
        {
          headline: "Premio a la Innovación en Software B2B de la Comunidad Valenciana",
          source: "Valencia Plaza",
          date: "10 Diciembre 2025",
          summary:
            "Reconocimiento al sistema de asistentes inteligentes para resolución de incidencias operativas complejas.",
        },
      ],
      smartQuestions: [
        "¿Cómo organizáis el testing de integración cuando intervienen múltiples agentes con herramientas externas concurrentes?",
        "¿Qué métricas de observabilidad (latencia p95, tasa de error JSON, costes por token) monitorizáis en producción para los modelos?",
      ],
      cvGuardrailTip:
        "Destaca tu rigor al medir reducciones de latencia (-45%) y optimización de prompts; al hablar de Kubernetes, sé franco sobre tu dominio de Docker y tu disposición a formarte en clústeres.",
    },
    upskilling: {
      strategicOverview:
        "Tu perfil cubre el 87.5% de los requisitos clave. La brecha principal es la orquestación con Kubernetes, que puede abordarse a corto plazo aprovechando tu base consolidada en Docker.",
      gaps: [
        {
          skill: "Kubernetes (K8s)",
          priority: 1,
          difficulty: "Normal",
          timeEstimate: "3 - 4 semanas (nivel funcional)",
          resources: [
            {
              title: "Kubernetes for Developers (CKAD Foundations)",
              platform: "edX / Linux Foundation",
              type: "Curso Online",
              url: "https://www.edx.org/search?query=kubernetes",
            },
            {
              title: "Tutorial interactivo oficial de Pods, Deployments y Services",
              platform: "Kubernetes Docs",
              type: "Documentación",
              url: "https://kubernetes.io/docs/tutorials/",
            },
            {
              title: "Despliegue de microservicio FastAPI en Minikube local",
              platform: "GitHub Community",
              type: "Proyecto Práctico",
              url: "https://github.com",
            },
          ],
        },
        {
          skill: "MLOps con Vertex AI Pipelines",
          priority: 2,
          difficulty: "Normal",
          timeEstimate: "2 semanas",
          resources: [
            {
              title: "Machine Learning Operations on Google Cloud",
              platform: "Google Cloud Skills Boost",
              type: "Curso Online",
              url: "https://www.cloudskillsboost.google",
            },
          ],
        },
      ],
      roadmap: {
        week1: "Dominar arquitectura de Pods y Services en Minikube local empaquetando una API de FastAPI.",
        month1: "Configurar un pipeline CI/CD en GitHub Actions que construya la imagen y la despliegue en un clúster de prueba.",
        quarter1: "Integrar monitorización con Prometheus y Grafana para trazar llamadas y latencia de endpoints de IA.",
      },
    },
  },
  {
    id: "logistics-bi",
    role: "Senior Data & BI Analyst",
    company: "Global Logistics Group",
    location: "Madrid / Híbrido",
    modality: "Híbrido",
    salary: "38.000 € - 46.000 €",
    contract: "Indefinido",
    summary:
      "Modelado de datos en PostgreSQL, creación de pipelines de transformación con dbt y cuadros de mando de alto impacto en Power BI.",
    fullDescription:
      "Responsable de transformar millones de registros logísticos en información estructurada para la dirección de operaciones. Diseñarás esquemas estrella/copo de nieve, garantizarás la calidad de datos y liderarás la transición analítica.",
    skills: [
      { name: "SQL", levelRequired: "Avanzado", category: "Técnica" },
      { name: "Power BI", levelRequired: "Avanzado", category: "Datos / IA" },
      { name: "PostgreSQL", levelRequired: "Avanzado", category: "Técnica" },
      { name: "Python", levelRequired: "Medio", category: "Técnica" },
      { name: "Modelado dimensional", levelRequired: "Avanzado", category: "Datos / IA" },
      { name: "dbt", levelRequired: "Medio", category: "Datos / IA" },
      { name: "Git", levelRequired: "Básico", category: "Metodología" },
    ],
    coverage: {
      senior: {
        matched: ["SQL", "Power BI", "PostgreSQL", "Python", "Modelado dimensional", "Git"],
        partial: ["dbt"],
        missing: [],
      },
      transition: {
        matched: ["SQL", "Power BI", "Python", "Git"],
        partial: [],
        missing: ["PostgreSQL", "Modelado dimensional", "dbt"],
      },
    },
    coverLetters: {
      professional: `Estimado comité de selección de Global Logistics Group,

Presento mi candidatura al puesto de Senior Data & BI Analyst. Cuento con una sólida trayectoria en Business Intelligence y analítica de datos, avalada por mi experiencia en la Universitat de València y proyectos analíticos en entornos institucionales y portuarios.

Mi especialidad reside en conectar la modelización de datos en PostgreSQL con cuadros de mando analíticos en Power BI que responden directamente a preguntas estratégicas de negocio. Domino la definición de esquemas dimensionales, la creación de modelos semánticos robustos y la optimización de consultas SQL para grandes volúmenes de actividad.

Será un placer mantener una reunión para exponer en detalle cómo puedo contribuir a optimizar la toma de decisiones operativas en Global Logistics.

Atentamente,
Bruno Esteve`,
      close: `Hola equipo de Global Logistics,

Me pongo en contacto con vosotros porque vuestro reto de escalar la analítica operativa encaja de lleno con lo que más disfruto: transformar datos dispersos en dashboards claros y útiles para la toma de decisiones.

Tengo amplia experiencia trabajando con PostgreSQL, Power BI y modelado dimensional en entornos reales. Me encantaría conversar sobre cómo estructurar vuestras métricas logísticas clave.

Un saludo,
Bruno Esteve`,
      tech: `Estimado equipo de analítica,

Aporto competencias avanzadas en SQL, PostgreSQL, Power BI y modelado dimensional estrella. En proyectos recientes he estructurado almacenes de datos y diseñado pipelines analíticos asegurando la consistencia de hechos y dimensiones antes de su visualización en informes ejecutivos.

Manejo Python para automatización y análisis complementario, y utilizo dbt para modularizar las transformaciones. Quedo a su disposición para cualquier prueba técnica.

Cordialmente,
Bruno Esteve`,
    },
    coverAnalysis: {
      keyPoints: [
        "Alineación del 92.8% con los requisitos técnicos de la oferta.",
        "Respaldo en experiencia real en la Universitat de València y proyectos dimensionales.",
        "Claridad en la aportación de valor de negocio a través de Power BI.",
      ],
      toneAssessment: "Ejecutivo, analítico y enfocado a resultados de negocio.",
      recommendation: "Destacar la experiencia documentada en el TFG con calificación 10/10.",
      guardrailCheck: "APROBADO: 100% verificado frente al perfil de Bruno.",
    },
    interviewTurns: [
      {
        turnNumber: 1,
        topic: "Modelado Dimensional",
        question:
          "¿Qué criterios sigues para diseñar una tabla de hechos transaccional frente a una de snapshots periódicos en un contexto de envíos logísticos?",
        candidateResponses: {
          strong: {
            text: "Una tabla de hechos transaccional registra cada evento puntual (ej. salida de almacén, paso por aduana, entrega). La tabla de snapshots periódicos captura el estado del sistema en momentos regulares (ej. inventario y pedidos pendientes al cierre diario). En logística se complementan: la transaccional audita la trazabilidad exacta y el snapshot facilita medir la evolución de cuellos de botella sin recalcular todo el histórico.",
            score: 9.7,
            evaluation:
              "Respuesta técnica magistral. Distingue con total nitidez la granularidad y la utilidad de ambos tipos de tablas dimensionales.",
            strengths: [
              "Definición exacta de granularidad temporal y operacional.",
              "Caso de uso realista adaptado a la operativa logística.",
            ],
            improvements: "Ninguna; respuesta directa y precisa.",
            idealAnswer:
              "La tabla transaccional preserva la máxima granularidad de cada cambio de estado; el snapshot periódico agrega el saldo o inventario a intervalos regulares para consultas de tendencia.",
          },
          basic: {
            text: "Una guarda todo lo que pasa y la otra saca una foto de cómo está todo al final del día.",
            score: 6.0,
            evaluation:
              "Conceptualmente correcto pero con terminología informal y sin justificación de arquitectura.",
            strengths: ["Intuye la diferencia."],
            improvements: "Usar términos precisos: granularidad, rendimiento analítico y cardinalidad.",
            idealAnswer:
              "Diferenciar por granularidad y casos de consulta analítica en reporting.",
          },
        },
      },
    ],
    companyIntel: {
      sector: "Logística y Cadena de Suministro Internacional",
      size: "500 - 1.000 empleados",
      founded: "2008 · Madrid",
      overview:
        "Operador logístico líder en transporte multimodal y distribución capilar en el sur de Europa.",
      strengths: [
        "Consolidación en el mercado con clientes de primer nivel en retail e industria.",
        "Inversión firme en digitalización y automatización de almacenes.",
      ],
      redFlags: [
        "Sistemas heredados con silos de información entre filiales que exigen un esfuerzo importante de homogenización de datos.",
      ],
      culture: ["Eficiencia operativa", "Rigor en cumplimiento de plazos", "Toma de decisiones guiada por datos"],
      news: [
        {
          headline: "Global Logistics renueva su flota de reparto hacia modelos sostenibles",
          source: "Cadena de Suministro",
          date: "3 Febrero 2026",
          summary:
            "Plan de inversión de 12 millones de euros para reducir la huella de carbono en la última milla.",
        },
      ],
      smartQuestions: [
        "¿Cuál es el principal reto de calidad de datos que encontráis al integrar telemetría de transporte con los sistemas de gestión de almacén (WMS)?",
        "¿Qué nivel de adopción tienen los mandos intermedios con los dashboards actuales de Power BI?",
      ],
      cvGuardrailTip:
        "Apóyate en tu experiencia real de modelado dimensional en el TFG y en tu labor de análisis en la Universitat de València.",
    },
    upskilling: {
      strategicOverview:
        "Prácticamente cumples todos los requisitos (92.8% de compatibilidad). Profundizar en tests automatizados con dbt reforzará tu candidatura al máximo.",
      gaps: [
        {
          skill: "dbt (data build tool) Avanzado",
          priority: 1,
          difficulty: "Normal",
          timeEstimate: "1 - 2 semanas",
          resources: [
            {
              title: "dbt Learn: Testing & Documentation Fundamentals",
              platform: "dbt Labs",
              type: "Documentación",
              url: "https://docs.getdbt.com",
            },
          ],
        },
      ],
      roadmap: {
        week1: "Estructurar modelos staging, intermediate y marts en dbt con tests de integridad referencial.",
        month1: "Configurar generación automática de documentación y linaje de datos con dbt docs.",
        quarter1: "Implementar análisis de rendimiento y optimización de índices en PostgreSQL.",
      },
    },
  },
  {
    id: "innova-product",
    role: "Product Analytics & AI Specialist",
    company: "Innova SaaS Solutions",
    location: "Barcelona / Remoto",
    modality: "Remoto",
    salary: "40.000 € - 48.000 €",
    contract: "Indefinido",
    summary:
      "Conexión entre métricas de producto digital, experimentación A/B e integración de agentes de IA para mejorar la experiencia de usuario.",
    fullDescription:
      "Buscamos un perfil híbrido que entienda el comportamiento del usuario, diseñe experimentos rigurosos e impulse nuevas funcionalidades asistidas por inteligencia artificial.",
    skills: [
      { name: "Product Analytics", levelRequired: "Avanzado", category: "Datos / IA" },
      { name: "Python", levelRequired: "Avanzado", category: "Técnica" },
      { name: "SQL", levelRequired: "Avanzado", category: "Técnica" },
      { name: "A/B Testing", levelRequired: "Medio", category: "Datos / IA" },
      { name: "Machine Learning", levelRequired: "Medio", category: "Datos / IA" },
      { name: "FastAPI", levelRequired: "Medio", category: "Técnica" },
      { name: "Scrum / Agile", levelRequired: "Básico", category: "Metodología" },
    ],
    coverage: {
      senior: {
        matched: ["Python", "SQL", "Machine Learning", "FastAPI"],
        partial: ["Product Analytics", "A/B Testing"],
        missing: ["Scrum / Agile"],
      },
      transition: {
        matched: ["Python", "SQL"],
        partial: [],
        missing: ["Product Analytics", "A/B Testing", "Machine Learning", "FastAPI", "Scrum / Agile"],
      },
    },
    coverLetters: {
      professional: `Estimado equipo de Innova SaaS,

Les presento mi candidatura a la posición de Product Analytics & AI Specialist. Mi formación híbrida en Inteligencia y Analítica de Negocios junto con el Máster de IA me sitúa exactamente en la intersección entre métricas de usuario, experimentación y valor de producto.

He desarrollado soluciones integrales que unen modelos predictivos y APIs en FastAPI con interfaces claras para los usuarios, priorizando la interpretabilidad y el impacto real. Aporto un criterio analítico respaldado por análisis estadístico y una visión técnica sólida para colaborar estrechamente con ingeniería y producto.

Será un placer conversar en profundidad sobre sus objetivos de experimentación y funcionalidades inteligentes.

Atentamente,
Bruno Esteve`,
      close: `Hola equipo de Innova,

Vuestra combinación de analítica de producto con asistentes de IA es justo el terreno donde me encuentro más cómodo y motivado. Vengo de unir negocio, datos y desarrollo en mis proyectos de máster y grado, y me encantaría sumar mi experiencia técnica a vuestro roadmap.

Un saludo cordial,
Bruno Esteve`,
      tech: `Estimado equipo de producto,

Aporto dominio sólido en SQL, Python y arquitecturas de microservicios con FastAPI, complementado con fundamentos de evaluación estadística para testeo A/B y modelos predictivos. En mis proyectos recientes he diseñado sistemas de IA donde la experiencia de usuario y la métrica de éxito se definen de forma cuantitativa antes de escribir código.

Quedo a su disposición para cualquier entrevista o caso práctico.

Atentamente,
Bruno Esteve`,
    },
    coverAnalysis: {
      keyPoints: [
        "Enfoque en el perfil híbrido que une negocio, analítica y técnica.",
        "Mención a la experimentación cuantitativa y desarrollo de APIs en FastAPI.",
        "Total fidelidad al CV sin exagerar experiencia formal en gestión de producto pura.",
      ],
      toneAssessment: "Innovador, ágil y orientado al impacto en producto digital.",
      recommendation: "Resaltar cómo el proyecto Alina resolvió una necesidad directa de usuario con agentes.",
      guardrailCheck: "APROBADO: 100% coherente con el CV.",
    },
    interviewTurns: [
      {
        turnNumber: 1,
        topic: "Experimentación A/B y Métricas",
        question:
          "¿Cómo diseñarías una prueba A/B para evaluar si un asistente de IA incorporado en la plataforma mejora la retención de usuarios sin introducir sesgos?",
        candidateResponses: {
          strong: {
            text: "Definiría la hipótesis y la métrica primaria (retención a día 30) junto a métricas secundarias de guarda (latencia percibida y tasa de abandono durante la carga). Segmentaría a los usuarios aleatoriamente a nivel de cuenta (no de sesión) para evitar contaminación. Calcularía el tamaño muestral necesario para alcanzar un poder estadístico del 80% con significancia p < 0.05 antes de iniciar el test.",
            score: 9.5,
            evaluation:
              "Respuesta muy madura. Cubre diseño experimental riguroso, prevención de fuga entre sesiones y cálculo de potencia previa.",
            strengths: [
              "Elección de métrica primaria y métricas de guarda (guardrail metrics).",
              "Asignación por usuario/cuenta para evitar sesgo de contaminación.",
            ],
            improvements: "Podría mencionar análisis secuencial si se busca cerrar el test anticipadamente.",
            idealAnswer:
              "Diseño experimental con asignación aleatoria persistente, cálculo de potencia a priori y monitorización de guardrail metrics.",
          },
          basic: {
            text: "Le pondría la IA al 50% de la gente y miraría después de una semana si entran más que el otro 50%.",
            score: 5.5,
            evaluation:
              "Simplista. Ignora tamaño muestral, estacionalidad semanal y significancia estadística.",
            strengths: ["Conoce la división 50/50."],
            improvements: "Incorporar rigor estadístico: intervalos de confianza, p-valores y métricas de seguridad.",
            idealAnswer:
              "Determinar tamaño muestral necesario y controlar factores de confusión antes de concluir causalidad.",
          },
        },
      },
    ],
    companyIntel: {
      sector: "SaaS B2B para Productividad y Gestión de Proyectos",
      size: "100 - 250 empleados",
      founded: "2019 · Barcelona",
      overview:
        "Innova desarrolla una plataforma de colaboración visual para equipos ágiles con funcionalidades asistidas por IA generativa.",
      strengths: [
        "Gran crecimiento orgánico de usuarios con modelo freemium global.",
        "Arquitectura moderna basada en microservicios y analítica en tiempo real.",
      ],
      redFlags: [
        "Fuerte presión de competidores internacionales; necesidad constante de iteración rápida de producto.",
      ],
      culture: ["Mentalidad experimental", "Velocidad de aprendizaje", "Empatía con el usuario final"],
      news: [
        {
          headline: "Innova supera los 50.000 usuarios activos mensuales en Europa",
          source: "TechCrunch EU",
          date: "22 Enero 2026",
          summary:
            "Hito de crecimiento impulsado por la adopción de sus nuevas herramientas de automatización inteligente.",
        },
      ],
      smartQuestions: [
        "¿Cómo evaluáis el impacto cualitativo de las respuestas de los agentes sobre la satisfacción neta del cliente (CSAT)?",
        "¿Qué cadencia de experimentación manejáis actualmente en el equipo de producto?",
      ],
      cvGuardrailTip:
        "Demuestra tu visión de producto apoyándote en cómo diseñaste la arquitectura y el flujo de Alina pensando en las necesidades del candidato.",
    },
    upskilling: {
      strategicOverview:
        "Tu compatibilidad es del 78.6% (+5 pts por modalidad remota). Fortalecer la metodología formal de Scrum y métricas de cohortes te posicionará como el candidato idóneo.",
      gaps: [
        {
          skill: "Metodologías Ágiles & Scrum",
          priority: 1,
          difficulty: "Normal",
          timeEstimate: "1 semana",
          resources: [
            {
              title: "Scrum Guide Oficial y Fundamentos de Product Owner",
              platform: "Scrum.org",
              type: "Documentación",
              url: "https://www.scrum.org",
            },
          ],
        },
      ],
      roadmap: {
        week1: "Completar la guía oficial de Scrum.org y entender ceremonias, sprints y gestión de backlog.",
        month1: "Analizar métricas de cohortes y retención de usuarios en proyectos con Python (Pandas).",
        quarter1: "Diseñar frameworks completos de experimentación A/B automatizados.",
      },
    },
  },
] as const;

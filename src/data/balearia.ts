import type { CaseSection } from "./projects";

// Sources: the TFM report and defense supplied by Bruno. Public methodology only.
// Do not add original records, vessel/route names, thresholds, costs or results.
export const baleariaCase = {
  introduction:
    "Convertir datos de navegación en recomendaciones de velocidad, con el consumo y la hora de llegada en una misma decisión.",
  confidentiality:
    "Todos los valores, perfiles de velocidad y tramos de la ilustración son ficticios y se han creado desde cero para este portfolio. No reproducen datos, rutas ni resultados internos de Baleària. El contexto académico, las tecnologías y la metodología descrita corresponden al proyecto real. La ilustración no ejecuta sus modelos ni representa un ahorro conseguido.",
  context: {
    id: "contexto",
    label: "El reto",
    title: "Consumir menos sin llegar tarde",
    paragraphs: [
      "En el transporte marítimo, ahorrar combustible no es tan sencillo como navegar más despacio. El viento, el oleaje, las corrientes y la carga del barco cambian de forma constante la fuerza necesaria para avanzar. Reducir la velocidad sin criterio compromete los horarios del puerto, pero acelerar de golpe para recuperar tiempo dispara el consumo de combustible.",
      "El reto de este proyecto para Baleària fue encontrar el equilibrio óptimo: determinar a qué velocidad debe navegar el buque en cada punto de la travesía para minimizar el gasto energético total, asegurando siempre la llegada a la hora programada.",
      "Para que la solución fuera aplicable en la operativa real, las recomendaciones debían actuar como un sistema de apoyo a la toma de decisiones para los equipos de tierra y el puente de mando, dejando siempre el control final en manos del capitán.",
    ],
  },
  contribution: {
    id: "aportacion",
    label: "Mi aportación",
    title: "Inteligencia artificial guiada por el negocio",
    paragraphs: [
      "Dentro de un equipo multidisciplinar en Baleària, mi contribución se centró en el área de Inteligencia Artificial y optimización: diseñar la lógica para transformar los datos de los sensores en estimaciones de consumo fiables y en recomendaciones de velocidad prácticas.",
      "Mi trabajo abarcó desde la estructuración de las variables de navegación y el entrenamiento de los modelos predictivos de energía, hasta el algoritmo que calcula la mejor combinación de velocidades y los controles de calidad para asegurar que las sugerencias fueran siempre seguras.",
      "Ningún algoritmo genera impacto si trabaja aislado. La clave estuvo en colaborar estrechamente con los perfiles de datos y cloud para que los modelos se apoyaran en una arquitectura sólida y compartida, que conecta desde la captura del dato hasta la pantalla del usuario.",
    ],
  },
  architecture: {
    id: "arquitectura",
    label: "Arquitectura cloud",
    title: "De las fuentes de datos a la plataforma común",
    paragraphs: [
      "Para que el sistema recomiende velocidades con criterio, necesita alimentar los modelos con información fiable y en tiempo real. La arquitectura desplegada en Google Cloud Platform reúne tres fuentes distintas: el histórico de viajes pasados, la telemetría enviada por el buque y las previsiones meteorológicas y marítimas.",
      "Todas estas fuentes convergen en una base de datos centralizada en Cloud SQL (PostgreSQL), donde la herramienta dbt limpia, estandariza y valida la información. Esto garantiza que tanto los modelos de IA como las pantallas de control trabajen siempre sobre los mismos datos depurados.",
    ],
  },
  preparation: {
    id: "preparacion",
    label: "Preparación de datos",
    title: "El tramo de navegación como unidad de medida",
    paragraphs: [
      "Los datos brutos de un buque llegan desordenados y a ritmos muy dispares: el GPS emite coordenadas cada pocos segundos, los motores transmiten potencia continua y los partes meteorológicos se actualizan cada varias horas. Para hacerlos comparables, el primer paso fue dividir cada travesía en tramos regulares de navegación.",
      "En cada tramo separamos el gasto energético en sus tres sistemas principales: la propulsión (motores que mueven el barco), los servicios auxiliares (electricidad y climatización a bordo) y los generadores de eje. Desglosar la energía permite al modelo entender el comportamiento real del barco en vez de ocultarlo tras una cifra global.",
      "Además, calculamos el efecto del viento y las corrientes respecto al rumbo del buque, ya que una corriente a favor empuja el barco y una en contra multiplica la resistencia. Una vez limpios y enriquecidos, estos tramos alimentan el núcleo inteligente del proyecto: el pipeline de Machine Learning.",
    ],
  },
  mlopsPipeline: {
    id: "pipeline-mlops",
    label: "Pipeline MLOps",
    title: "El flujo de IA: estimar, optimizar y gobernar",
    paragraphs: [
      "Con los datos organizados por tramos, el reto del sistema es resolver una decisión práctica: ¿a qué velocidad conviene navegar en cada segmento para gastar el mínimo combustible sin retrasar la llegada a puerto? Para responder con solvencia, construimos un flujo continuo de Machine Learning y MLOps estructurado en tres etapas consecutivas.",
      "En primer lugar, un modelo predictivo estima la potencia necesaria para cada tramo en función de la velocidad y del estado del mar (viento, corrientes y altura de olas). En lugar de aplicar tablas teóricas, el modelo aprende de viajes pasados reales e incorpora un margen de prudencia para que la recomendación nunca dependa de un cálculo excesivamente optimista.",
      "A continuación, el algoritmo de optimización analiza la travesía completa para encontrar el reparto de velocidades más eficiente. Si un tramo presenta condiciones meteorológicas adversas, compensa moderar la marcha para no malgastar energía y recuperar tiempo en zonas de aguas calmas. La figura inferior muestra este principio: frente a navegar a velocidad constante, la propuesta inteligente ajusta el ritmo tramo a tramo, cumpliendo el horario con menor esfuerzo.",
      "Por último, la capa de MLOps garantiza la fiabilidad y trazabilidad de todo el sistema en la nube. Cada recomendación queda registrada con sus datos meteorológicos y la versión del modelo que la originó. Antes de activar un nuevo modelo, se ejecutan validaciones automáticas que comprueban su coherencia física, permitiendo detectar cuándo cambian los patrones de navegación y hace falta reentrenar.",
    ],
  },
  finalProduct: {
    id: "producto-final",
    label: "Producto final",
    title: "Centro de control y apoyo a la navegación en vivo",
    paragraphs: [
      "Todo este trabajo de datos y algoritmos solo cobra verdadero sentido si llega de forma clara y oportuna a las personas que toman las decisiones. Para conectar el pipeline de IA con la operativa diaria de Baleària, desarrollamos una aplicación web interactiva en React que ofrece dos puntos de vista especializados: Operaciones en tierra y Tripulación en el mar.",
      "Para el equipo de Operaciones en tierra, la plataforma brinda una visión global y comparativa de la flota. Permite supervisar el avance de cada viaje en tiempo real, contrastar la velocidad observada frente a la sugerida por la IA y vigilar el consumo acumulado. Gracias a esta perspectiva, la compañía puede detectar ineficiencias de forma inmediata y analizar el rendimiento histórico de las rutas con datos objetivos.",
      "Para la Tripulación a bordo, la interfaz se simplifica para responder a las necesidades inmediatas del puente de mando. El capitán y los oficiales reciben una recomendación de velocidad directa para el tramo en curso, el margen de minutos respecto a la hora de llegada y el estado del entorno marítimo. Esto les proporciona un criterio objetivo para ahorrar combustible manteniendo siempre la seguridad de la navegación.",
      "A continuación puedes explorar el prototipo funcional. Alterna entre la vista de Operaciones y la de Tripulación, cambia de barco o travesía y utiliza el simulador para comprobar cómo responde el sistema ante nuevas condiciones.",
    ],
  },
  learning: {
    id: "aprendizajes",
    label: "Aprendizajes",
    title: "La mejor predicción no siempre es la mejor decisión",
    paragraphs: [
      "Este proyecto consolidó mi visión sobre cómo aplicar la inteligencia artificial a problemas de negocio: el punto de partida debe ser siempre la decisión operativa que se quiere mejorar, construyendo hacia atrás los modelos, los datos y los controles necesarios.",
      "Comprobé que un modelo con un margen de error estadístico bajo puede ser inútil en la práctica si propone cambios de velocidad bruscos o difíciles de maniobrar para un barco de gran tonelaje. Las restricciones del mundo real y la gestión de la incertidumbre deben integrarse en el propio algoritmo de optimización.",
      "Por último, la experiencia reafirmó que un proyecto de IA no termina en el entrenamiento de un modelo. Para generar impacto duradero se necesitan contratos de datos fiables, una infraestructura cloud que garantice la trazabilidad y, sobre todo, una interfaz clara que transmita confianza a los usuarios finales.",
    ],
  },
} as const satisfies { introduction: string; confidentiality: string } & Record<
  "context" | "contribution" | "architecture" | "preparation" | "mlopsPipeline" |
  "finalProduct" | "learning", CaseSection
>;

export const baleariaSections = [
  baleariaCase.context,
  baleariaCase.contribution,
  baleariaCase.architecture,
  baleariaCase.preparation,
  baleariaCase.mlopsPipeline,
  baleariaCase.finalProduct,
  baleariaCase.learning,
  {
    id: "herramientas",
    label: "Herramientas",
    title: "Herramientas y tecnologías",
    paragraphs: [],
  },
] as const;

type ArchitectureInput = {
  title: string;
  steps: readonly string[];
};

export const baleariaInputs = [
  { title: "Histórico", steps: ["Archivos CSV", "Cloud Storage"] },
  { title: "Telemetría simulada", steps: ["API de ingesta", "Pub/Sub", "Cloud Functions"] },
  { title: "Contexto ambiental", steps: ["APIs meteorológicas y marítimas", "Cloud Functions"] },
] as const satisfies readonly ArchitectureInput[];

export const baleariaDataUses = [
  {
    title: "Predicción y optimización",
    service: "Vertex AI / Kubeflow Pipelines",
    action: "Estimar potencia y optimizar velocidades",
    outcome: "Perfiles de velocidad por tramo",
  },
  {
    title: "Consulta y visualización",
    service: "API en Cloud Run",
    action: "Consultar la base analítica",
    outcome: "Dashboard React",
    audience: "Operaciones y tripulación",
  },
] as const;

export const baleariaDecisions = [
  {
    title: "Ingesta especializada por tipo de fuente",
    paragraphs: [
      "Los archivos históricos se cargan desde Cloud Storage, mientras que la telemetría en tiempo real entra mediante una API hacia Pub/Sub y Cloud Functions para procesar eventos sin saturar el sistema.",
      "En paralelo, funciones automáticas consultan las previsiones de viento y oleaje para sincronizar las condiciones del mar con la posición exacta del buque en cada momento.",
    ],
  },
  {
    title: "Una única fuente de verdad para IA y producto",
    paragraphs: [
      "Centralizar los datos en PostgreSQL sobre Cloud SQL y estandarizarlos con dbt evita discrepancias: el algoritmo de optimización y el panel visual consultan exactamente las mismas métricas depuradas.",
      "Los modelos se ejecutan en Vertex AI para generar los perfiles de navegación, mientras que una API ligera en Cloud Run atiende las consultas del dashboard interactivo con inmediatez.",
    ],
  },
  {
    title: "Orquestación automatizada y entorno reproducible",
    paragraphs: [
      "Apache Airflow en Cloud Composer coordina las tareas de ingesta y transformación en el orden estricto necesario, asegurando que los datos estén listos antes de ejecutar los modelos.",
      "Toda la infraestructura cloud se definió mediante código con Terraform, lo que permite replicar el entorno técnico con rapidez y consistencia ante nuevas rutas o buques.",
    ],
  },
] as const;

export const baleariaTools = [
  "Google Cloud",
  "Python",
  "PostgreSQL",
  "dbt",
  "Docker",
  "Terraform",
  "React",
] as const;

// Invented independently of source data. These are explanatory profiles, not
// predictions or optimizer outputs. No original thresholds or route geometry.
export const illustrativeNavigation = [
  { segment: "A", distance: 12, reference: 16, proposal: 15 },
  { segment: "B", distance: 12, reference: 16, proposal: 15.5 },
  { segment: "C", distance: 12, reference: 16, proposal: 16 },
  { segment: "D", distance: 12, reference: 16, proposal: 16.5 },
  { segment: "E", distance: 12, reference: 16, proposal: 17 },
  { segment: "F", distance: 12, reference: 16, proposal: 17 },
] as const;

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
    title: "Consumir menos, llegar a tiempo",
    paragraphs: [
      "La eficiencia de un viaje marítimo depende de más que su velocidad media. La carga, el viento, el oleaje, las corrientes y la fase de navegación cambian la potencia necesaria para avanzar. Reducir velocidad de forma indiscriminada puede comprometer la hora de llegada; aumentarla para recuperar tiempo también tiene un coste energético.",
      "El TFM desarrollado para Baleària en EDEM abordó ese equilibrio mediante una plataforma desplegada en Google Cloud Platform. El objetivo era reunir información operativa dispersa, estimar la potencia necesaria por tramo y buscar un perfil de velocidades compatible con el tiempo disponible.",
      "El alcance combinó históricos de navegación, telemetría simulada en streaming y fuentes meteorológicas y marítimas. Las recomendaciones se plantearon como apoyo a operaciones y a la tripulación: la decisión de navegación permanece en manos del personal a bordo.",
    ],
  },
  contribution: {
    id: "aportacion",
    label: "Mi aportación",
    title: "IA conectada con el problema de negocio",
    paragraphs: [
      "Trabajé en el área de Inteligencia Artificial junto a otra integrante del equipo. Mi aportación se centró en conectar la preparación de los datos operativos con la estimación del consumo y la recomendación de velocidades por tramo, dentro de una solución cloud compartida.",
      "El trabajo de IA abarcó la integración y validación de datos para modelado, el entrenamiento y la evaluación de modelos energéticos, y el motor de optimización. La trazabilidad y los controles de calidad permitían evaluar una recomendación junto con los datos y el modelo que la habían generado.",
      "La arquitectura de ingesta, la infraestructura y el dashboard que se describen a continuación forman parte del resultado colectivo. La colaboración entre ingeniería de datos, cloud e IA fue necesaria para que todas las capas utilizaran una base analítica coherente.",
    ],
  },
  architecture: {
    id: "arquitectura",
    label: "Arquitectura cloud",
    title: "Tres entradas, una base analítica común",
    paragraphs: [
      "El histórico se carga desde Cloud Storage a Cloud SQL. La telemetría simulada recorre una capa de entrada, Pub/Sub y Cloud Functions, separando la recepción de mensajes de su procesamiento. Las fuentes externas aportan el contexto meteorológico y marítimo.",
      "Sobre PostgreSQL en Cloud SQL, dbt transforma los datos en modelos analíticos que alimentan tanto el dashboard como el pipeline de Machine Learning. Cloud Composer, con Apache Airflow, coordina el flujo de datos externos y las transformaciones; Kubeflow Pipelines estructura las etapas de IA en Vertex AI.",
      "Cloud Run aloja servicios de aplicación y procesos en contenedores. Terraform define la infraestructura y facilita reproducir el entorno. Esta separación permite modificar la ingesta, el modelado o la visualización sin rehacer toda la plataforma.",
    ],
  },
  preparation: {
    id: "preparacion",
    label: "Preparación de datos",
    title: "El tramo como unidad de decisión",
    paragraphs: [
      "GPS, sensores y registros de viaje tienen frecuencias y granularidades diferentes. El pipeline reconstruye la trayectoria y la divide en tramos de distancia, vinculando cada lectura a la ventana temporal del viaje y del segmento correspondiente.",
      "La integración temporal de potencia permite obtener energía por tramo. Separar propulsión, auxiliares y generación de eje conserva comportamientos distintos, en lugar de ocultarlos en un único total.",
      "El contexto ambiental también se expresa respecto al rumbo: una corriente a favor y una corriente en contra no tienen el mismo efecto. Antes del entrenamiento se comprueban cobertura, coherencia temporal, rangos físicos y consistencia energética. Los tramos sin calidad suficiente quedan fuera del modelado.",
    ],
  },
  prediction: {
    id: "prediccion",
    label: "Modelos predictivos",
    title: "Estimar potencia y conocer la incertidumbre",
    paragraphs: [
      "El modelado compara referencias sencillas con alternativas como Ridge, Random Forest e HistGradientBoosting. En los auxiliares se contempla un enfoque en dos etapas: detectar actividad y, después, estimar la potencia cuando el componente está activo.",
      "La validación respeta el orden temporal y mantiene los viajes completos dentro de cada partición. Así, el modelo se entrena con el pasado y se evalúa sobre viajes posteriores. Una auditoría de variables excluye información conocida solo después del viaje y datos derivados del propio consumo que se quiere predecir.",
      "La evaluación combina error absoluto, error relativo ponderado y sesgo, con lectura por componente, tramo, viaje y ruta. También revisa la coherencia física de la relación entre velocidad y potencia propulsiva.",
      "Los intervalos de incertidumbre se calibran con errores de validación. El optimizador utiliza una estimación conservadora de energía para evitar que una recomendación dependa únicamente de la predicción más favorable.",
    ],
  },
  optimization: {
    id: "optimizacion",
    label: "Optimización",
    title: "Una velocidad para cada tramo, un límite para el viaje",
    paragraphs: [
      "Para cada tramo restante se generan velocidades candidatas dentro del dominio respaldado por el histórico. Los modelos estiman su potencia y el sistema calcula el tiempo y la energía asociados. La hora estimada de llegada, o ETA, fija el presupuesto temporal del conjunto.",
      "La programación dinámica busca la combinación que minimiza el coste energético conservador. Incluye reservas de tiempo y penaliza cambios bruscos de velocidad. Las fases de aproximación y maniobra tienen restricciones específicas.",
      "No basta con encontrar un perfil matemáticamente factible. Antes de emitir una recomendación se comprueba que sea estable ante pequeños cambios del contexto, que aporte un beneficio suficiente o recupere puntualidad, y que pueda ejecutarse en la fase de navegación actual.",
      "El backtest compara alternativas sobre viajes reservados para evaluación. Ese análisis permite estudiar qué habría recomendado el sistema; no equivale a medir combustible ahorrado tras aplicar las recomendaciones a bordo.",
    ],
  },
  operations: {
    id: "mlops",
    label: "MLOps y producto",
    title: "La recomendación necesita contexto y trazabilidad",
    paragraphs: [
      "El pipeline conserva una relación entre la extracción de datos, el entrenamiento, los informes de evaluación y la versión del modelo. Una compuerta de calidad reúne las comprobaciones de datos, predicción y optimización antes de permitir el registro del paquete.",
      "El diseño de monitorización contempla cambios en las variables de entrada, nuevas rutas, cobertura de recomendaciones y calidad de los datos. La memoria detalla señales y reglas para gobernar el reentrenamiento; cerrar y validar ese ciclo automático en operación sigue siendo una línea de evolución.",
      "El dashboard ofrece dos perspectivas: operaciones en tierra, con tendencias y comparación de viajes, y tripulación, con posición, sensores y condiciones del entorno. React presenta la información y una API en Cloud Run consulta la base analítica. En el TFM, el flujo en vivo se alimenta con telemetría simulada.",
    ],
  },
  outcome: {
    id: "resultado",
    label: "Resultado y límites",
    title: "Una cadena funcional desplegada en GCP",
    paragraphs: [
      "El resultado fue una plataforma que conecta carga histórica, streaming simulado, transformación analítica, modelos energéticos y visualización. La documentación describe la validación técnica del flujo y un pipeline de IA con controles de aceptación y advertencias pendientes de resolver.",
      "El valor del proyecto está en convertir una predicción en una decisión evaluable: proponer velocidades con restricciones de llegada, incorporar incertidumbre y conservar la evidencia de cada ejecución. Los consumos, costes, errores y resultados internos no se publican en este caso.",
      "El despliegue cloud del prototipo no demuestra por sí solo ahorro operativo ni adopción a bordo. La siguiente fase planteada es un piloto con operaciones y capitanes, seguido de validación en nuevas rutas y buques. Separar almacenamiento operacional y analítico sería otra evolución si aumenta la escala.",
    ],
  },
  learning: {
    id: "aprendizajes",
    label: "Aprendizajes",
    title: "La mejor predicción no siempre es la mejor decisión",
    paragraphs: [
      "Este proyecto reforzó mi forma de abordar la IA aplicada: empezar por la decisión que necesita el negocio y construir hacia atrás los datos, el modelo y los controles necesarios. Un error en la alineación entre GPS y sensores puede condicionar toda la recomendación, aunque el algoritmo sea adecuado.",
      "También me permitió conectar predicción y optimización. Un modelo con buen error medio puede resultar poco útil si extrapola fuera del histórico o genera cambios de velocidad difíciles de ejecutar. La incertidumbre, la estabilidad y las restricciones operativas forman parte del producto.",
      "Trabajar con el equipo de datos y cloud hizo tangible otra lección: una solución de IA no termina en el entrenamiento. Necesita contratos de datos, versiones reproducibles, observabilidad y una interfaz que permita interpretar sus límites.",
    ],
  },
} as const satisfies { introduction: string; confidentiality: string } & Record<
  "context" | "contribution" | "architecture" | "preparation" | "prediction" |
  "optimization" | "operations" | "outcome" | "learning", CaseSection
>;

export const baleariaSections = [
  baleariaCase.context, baleariaCase.contribution, baleariaCase.architecture,
  baleariaCase.preparation, baleariaCase.prediction, baleariaCase.optimization,
  baleariaCase.operations, baleariaCase.outcome, baleariaCase.learning,
] as const;

export const baleariaInputs = [
  { title: "Histórico", detail: "CSV · Cloud Storage · carga a Cloud SQL" },
  { title: "Telemetría simulada", detail: "API de ingesta · Pub/Sub · Cloud Functions" },
  { title: "Contexto ambiental", detail: "APIs meteorológicas y marítimas · Cloud Functions" },
] as const;

export const baleariaDecisions = [
  {
    title: "Una base compartida, transformaciones explícitas",
    text: "Cloud SQL cubre el alcance operacional y analítico del TFM. dbt prepara una base común para el dashboard y ML, evitando duplicar reglas de negocio. BigQuery queda como posible evolución al crecer la carga analítica.",
  },
  {
    title: "Procesar al recibir un evento",
    text: "Pub/Sub desacopla emisores y consumidores. Las funciones por tipo de dato sustituyen la consulta periódica de mensajes y permiten aislar procesamiento y errores.",
  },
  {
    title: "Validar antes de continuar",
    text: "Los tests de dbt y las compuertas del pipeline controlan el avance. Sustituir las esperas fijas entre ingesta y transformación por confirmaciones de disponibilidad es una mejora identificada en la memoria.",
  },
] as const;

export const baleariaTools = [
  "Python", "PostgreSQL", "dbt", "Cloud Storage", "Cloud SQL", "Pub/Sub",
  "Cloud Functions", "Cloud Run", "API Gateway", "Cloud Composer / Airflow",
  "Vertex AI / Kubeflow Pipelines", "Terraform", "Docker", "React",
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

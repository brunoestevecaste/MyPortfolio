import type { CaseSection } from "./projects";

// Fuentes: Memoria y defensa del TFG (calificación 10/10 con matrícula de honor),
// Universitat de València (IRTIC) para la Agencia Española de Protección de Datos (AEPD).
export const aepdCase = {
  introduction:
    "Organizar la actividad de un portal público para entender su uso y anticipar la demanda horaria mediante Machine Learning.",
  confidentiality:
    "Todos los datos de tráfico, valores y predicciones que se muestran son ficticios y se han creado para este portfolio. No reproducen registros, magnitudes ni resultados internos de la AEPD. El contexto del proyecto, las herramientas, la calificación académica de 10/10 y su transferencia a producción son reales.",
  contextNote:
    "Todos los datos de tráfico, valores y predicciones que se muestran son ficticios y se han creado para este portfolio. No reproducen registros, magnitudes ni resultados internos de la AEPD. El contexto del proyecto, las herramientas, la calificación académica de 10/10 y su transferencia a producción son reales.",
  context: {
    id: "contexto",
    label: "El reto",
    title: "Los registros no explican el uso de un portal",
    paragraphs: [
      "Los servidores de la Agencia Española de Protección de Datos (AEPD) registran millones de peticiones técnicas cada mes. Sin embargo, un archivo de logs no explica cómo los ciudadanos utilizan el portal: peticiones automáticas, recursos técnicos de páginas y accesos duplicados se mezclan con consultas reales sobre privacidad y derechos.",
      "El reto de este proyecto (mi Trabajo de Fin de Grado en el IRTIC de la Universitat de València) fue transformar ese volumen masivo de datos en una herramienta analítica clara: depurar la actividad real, estructurarla en un almacén de datos y anticipar el tráfico horario para planificar recursos con antelación.",
      "Para que el sistema resultara verdaderamente útil, la solución debía responder a dos necesidades complementarias: dotar a la dirección de visibilidad histórica sobre los trámites más demandados y anticipar los picos de visitas para dimensionar la infraestructura técnica.",
    ],
  },
  contribution: {
    id: "aportacion",
    label: "Mi aportación",
    title: "Ingeniería de datos, analítica predictiva y BI",
    paragraphs: [
      "Como autor del proyecto desarrollado en el IRTIC para la AEPD, mi contribución abarcó la responsabilidad técnica completa de extremo a extremo: desde el diseño del modelo dimensional y la automatización ETL, hasta el desarrollo de modelos de Machine Learning y la entrega del cuadro de mando interactivo.",
      "Diseñé e implementé el pipeline en Pentaho para filtrar el tráfico de rastreadores (bots) y reconstruir sesiones de navegación ciudadana, modelé el almacén dimensional en PostgreSQL y formulé el problema de predicción de visitas horarias.",
      "Asimismo, entrené y evalué algoritmos de gradiente (XGBoost, LightGBM e HistGradientBoosting) con optimización bayesiana y validación temporal rigurosa, construyendo finalmente el dashboard en Power BI que fue transferido a producción y calificado con un 10/10.",
    ],
  },
  architecture: {
    id: "arquitectura",
    label: "Arquitectura",
    title: "De los logs web a la analítica: un flujo lineal sin fisuras",
    paragraphs: [
      "La arquitectura del proyecto resuelve un problema habitual en analítica web: los servidores generan un torrente continuo de registros técnicos no estructurados que deben transformarse antes de llegar a la base de datos para no degradar su rendimiento.",
      "Diseñamos una estructura lineal en dos capas sobre PostgreSQL. En primer lugar, una zona de staging recibe y valida los archivos de registro crudos; posteriormente, un almacén dimensional en esquema en estrella (Star Schema) consolida las sesiones de los usuarios, separando los hechos cuantificables de las dimensiones descriptivas (tiempo, trámite y tipo de solicitud).",
      "Esta base unificada sirve como fuente única de verdad para dos propósitos independientes: alimenta el cuadro de mando en Power BI para la toma de decisiones directivas y provee los datos históricos a los modelos en Python para la predicción de tráfico.",
    ],
  },
  preparation: {
    id: "preparacion",
    label: "Preparación de datos",
    title: "Depuración en origen, trazabilidad y modelado dimensional",
    paragraphs: [
      "Si los datos de partida contienen ruido, cualquier cuadro de mando o predicción carecerá de sentido. Los servidores no solo registran a ciudadanos: reciben rastreos constantes de robots y llamadas a elementos técnicos de las páginas.",
      "Mediante Pentaho Data Integration, programé un flujo automatizado (ETL) que descartó más del 40% del volumen inicial correspondiente a rastreadores automatizados y recursos estáticos. Además, reconstruyó las visitas reales de las personas agrupando sus clics consecutivos en sesiones de navegación mediante ventanas de 30 minutos de inactividad.",
      "Con la actividad ciudadana depurada y vinculada a sus trámites correspondientes, los datos quedaron organizados y listos para dar el salto del análisis histórico a la predicción futura.",
    ],
  },
  mlopsPipeline: {
    id: "pipeline-predictivo",
    label: "Pipeline predictivo",
    title: "Series temporales horarias, optimización bayesiana y backtesting",
    paragraphs: [
      "Con los datos organizados por sesiones y horas, el siguiente paso fue pasar de ver el pasado a anticipar el futuro: ¿cuántas visitas recibirá la sede electrónica en cada hora del día siguiente para dimensionar la infraestructura técnica?",
      "El tráfico web sigue patrones muy marcados: hay más actividad a media mañana que de madrugada, y los días laborables tienen mucha más afluencia que fines de semana o festivos. Por eso, enriquecimos los datos con el calendario oficial (festivos nacionales y autonómicos) y con el historial de visitas de las últimas 24 horas y de la misma hora de la semana anterior para capturar la inercia habitual.",
      "Entrenamos y comparamos modelos de Machine Learning (XGBoost, LightGBM e HistGradientBoosting) ajustando sus parámetros para encontrar la mayor precisión. Para garantizar que las previsiones funcionaran en la práctica, evaluamos los modelos únicamente intentando predecir días futuros que nunca habían visto durante el entrenamiento.",
      "La gráfica inferior muestra este resultado: la curva estimada por el modelo reproduce fielmente los picos de máxima afluencia laboral y el descenso nocturno, ofreciendo a los administradores una referencia fiable con horas de antelación.",
    ],
  },
  finalProduct: {
    id: "producto-final",
    label: "Producto final",
    title: "Cuadro de mando en producción y apoyo a la toma de decisiones",
    paragraphs: [
      "La inteligencia predictiva y los datos depurados debían ser fácilmente interpretables por el equipo directivo y técnico de la AEPD. Por ello, diseñamos un cuadro de mando interactivo en Power BI que integra en una misma pantalla el análisis histórico de visitas y las previsiones horarias del modelo.",
      "El informe permite explorar qué servicios digitales generan mayor afluencia (como el canal de denuncias o las guías de protección de datos), identificar patrones según la procedencia geográfica y contrastar de un vistazo la demanda real frente a la esperada.",
      "El proyecto obtuvo la máxima calificación académica (10/10) en la Universitat de València y fue transferido a producción, operando actualmente como una herramienta oficial utilizada por la propia Agencia Española de Protección de Datos para supervisar su sede web.",
      "A continuación puedes interactuar con el cuadro de mando funcional con datos ficticios ilustrativos. Filtra por periodo o procedencia y consulta las predicciones horarias estimadas por el sistema.",
    ],
  },
  learning: {
    id: "aprendizajes",
    label: "Aprendizajes",
    title: "La definición del dato condiciona toda la solución",
    paragraphs: [
      "Este proyecto consolidó una convicción profesional clave: la calidad del dato en origen determina todo lo que ocurre después. Una mala regla de filtrado en los registros brutos distorsiona el cuadro de mando y desvía por completo el aprendizaje del modelo predictivo.",
      "Comprobé también que en problemas operativos de demanda, anticipar la forma de la curva y el momento exacto del pico de tráfico es mucho más valioso para los gestores que perseguir un error decimal mínimo.",
      "Por último, trabajar para la autoridad nacional de protección de datos reafirmó que el rigor ético, la privacidad por diseño y la trazabilidad no son frenos al desarrollo, sino los pilares que hacen que una solución analítica sea creíble y duradera.",
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

export const aepdSections = [
  aepdCase.context,
  aepdCase.contribution,
  aepdCase.architecture,
  aepdCase.preparation,
  aepdCase.mlopsPipeline,
  aepdCase.finalProduct,
  aepdCase.learning,
  {
    id: "herramientas",
    label: "Herramientas",
    title: "Herramientas y tecnologías",
    paragraphs: [],
  },
] as const;

export const aepdSource = {
  kicker: "Única fuente de datos",
  title: "Logs de servidores web",
  description:
    "Archivos brutos de acceso HTTP (W3C / Apache) generados por los servidores de la sede electrónica de la AEPD: peticiones en crudo con tráfico ciudadano, robots y recursos técnicos.",
} as const;

export const aepdDataUses = [
  {
    title: "Análisis descriptivo y BI",
    service: "Power BI / DAX",
    action: "Explorar trámites, procedencia y patrones",
    outcome: "Cuadros de mando ejecutivos",
    audience: "Dirección y responsables AEPD",
  },
  {
    title: "Modelado predictivo",
    service: "Python / XGBoost",
    action: "Predecir visitas horarias con backtesting",
    outcome: "Previsiones temporales a 24h",
    audience: "Planificación de sistemas e IT",
  },
] as const;

export const aepdTools = [
  "PostgreSQL",
  "Python",
  "Pentaho",
  "Power BI",
  "Docker",
  "Git",
] as const;

export const aepdPipeline = [
  { title: "Logs web", detail: "Registros de acceso W3C" },
  { title: "Pentaho", detail: "Extracción y depuración ETL" },
  { title: "PostgreSQL", detail: "Almacén dimensional estrella" },
  { title: "Python", detail: "Modelado predictivo XGBoost" },
  { title: "Power BI", detail: "Análisis y cuadro de mando" },
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

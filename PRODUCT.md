# PRODUCT.md

## Estado

Fuente de verdad para el contenido y el posicionamiento del portfolio.

- Actualizado: 2026-09-21
- Fuentes principales: `BrunoEsteve_CV_Tech.pdf` y perfil público de LinkedIn
- Regla editorial: no publicar cifras, resultados o responsabilidades que no estén
  respaldados por una fuente o confirmados por Bruno

## Posicionamiento

### Título profesional

Data Analyst and AI Engineer

### Propuesta de valor

Convierto necesidades de negocio y datos complejos en sistemas analíticos,
modelos de IA y productos digitales útiles.

### Diferenciación

El portfolio debe demostrar la conexión entre cuatro capacidades:

1. Entender una necesidad de negocio.
2. Diseñar una arquitectura de datos o IA adecuada.
3. Construir una solución técnica utilizable.
4. Comunicar el resultado con claridad visual.

No presentar a Bruno como un perfil puramente académico, un diseñador visual o
un desarrollador generalista. La fortaleza es unir negocio, datos, IA y producto.

## Audiencias

### Principal

- Recruiters y hiring managers de Data, BI, AI y Machine Learning.
- Responsables de innovación, transformación digital y producto basado en datos.
- Equipos que buscan un perfil capaz de traducir necesidades de negocio a
  soluciones técnicas.

### Secundaria

- Empresas y organizaciones interesadas en proyectos de analítica, IA aplicada o
  experiencias digitales.
- Colaboradores técnicos y creativos.

## Objetivos del sitio

- Explicar el posicionamiento profesional en menos de 15 segundos.
- Presentar evidencia de trabajo mediante case studies, no mediante una lista de
  tecnologías.
- Hacer visible el razonamiento, el papel desempeñado y las decisiones tomadas.
- Facilitar el acceso a LinkedIn, GitHub y un canal de contacto.
- Mantener una base rápida, accesible y sencilla de actualizar.

## Mensaje principal de trabajo

### Hero recomendado

El hero toma `refs/style-ref3.webp` como referencia compositiva principal. Debe
incluir el nombre en la esquina superior izquierda, una declaración profesional
de gran escala, dos párrafos breves de presentación y un retrato real.

**Nombre**

Bruno Esteve Castellano

**Declaración principal**

DISEÑO SISTEMAS DE DATOS E IA PARA DECISIONES REALES.

**Descripción, columna 1**

Soy Data Analyst y AI Engineer. Trabajo entre negocio, analítica e inteligencia
artificial para convertir problemas complejos en soluciones claras.

**Descripción, columna 2**

Construyo dashboards, modelos predictivos y sistemas de datos pensados para apoyar
decisiones, mejorar procesos y generar valor real.

**Retrato**

Fotografía original de Bruno, preferiblemente en blanco y negro o con saturación
reducida. No utilizar como activo final la imagen incrustada en el CV.

El copy definitivo puede ajustarse durante la implementación, pero debe conservar
la idea de utilidad, conexión con negocio y capacidad técnica. El hero no necesita
botones: la navegación superior y la continuidad hacia el índice de proyectos
resuelven el acceso al contenido.

## Perfil verificado

Analista de datos con formación en Inteligencia y Analítica de Negocios y
especialización en Inteligencia Artificial. Experiencia en requerimientos de
negocio, dashboards, gestión de datos y soluciones predictivas orientadas a apoyar
decisiones y mejorar procesos.

### Experiencia profesional

**Universitat de València**  
Investigador no doctor | Data Analyst and BI  
Octubre de 2024 - actualidad | Valencia, España

Responsabilidades descritas en el CV:

- Definición de requerimientos de negocio.
- Diseño de dashboards para transformar datos en información accionable.
- Gestión de ecosistemas y almacenes de datos.
- Consultas a bases de datos.
- Mejora de procesos de decisión institucional mediante información adaptada a
  las necesidades del negocio.

### Educación

**EDEM Escuela de Empresarios**  
Máster en Inteligencia Artificial  
Septiembre de 2025 - julio de 2026

Áreas verificadas: Machine Learning, Deep Learning, NLP, GCP, MLOps, Python,
Docker, Git e IA responsable.

**Universitat de València**  
Grado en Inteligencia y Analítica de Negocios  
Septiembre de 2021 - junio de 2025

Áreas verificadas: análisis de negocio, Big Data, minería de datos, analítica
predictiva, almacenes de datos y Machine Learning aplicado a negocio.

## Proyectos principales

### Baleària - Eficiencia operativa y energética

**Estado de evidencia:** verificado en el CV y ampliado con la memoria y la
defensa del TFM facilitadas por Bruno el 22/09/2026. Trabajo colectivo de EDEM
(2026), desarrollado para Baleària y desplegado en Google Cloud Platform.

**Publicación y confidencialidad**

- Posición `01` (2026), en `/projects/balearia-eficiencia-energetica`.
- Bruno autoriza explicar el proyecto con datos ficticios. El contexto académico,
  la metodología y las tecnologías son reales; todos los valores ilustrativos
  se crean desde cero y se identifican como ficticios.
- No publicar datos originales, nombres de buques o rutas, periodos operativos,
  volúmenes, costes, métricas, umbrales internos, capturas ni documentos fuente.
- La gráfica de velocidades es conceptual, no ejecuta el modelo original ni
  presenta ahorro conseguido. Sus tiempos se calculan sobre el ejemplo ficticio.
- La demostración interactiva del dashboard recrea las vistas de operaciones y
  tripulación con unidades, rutas, viajes, telemetría y recomendaciones creadas
  desde cero. Conserva los tipos de análisis del prototipo, no sus datos ni su
  interfaz original.
- Los enlaces de GitHub facilitados devolvieron 404 al consultarlos; no se usan
  como evidencia ni se enlazan públicamente desde el caso.

**Objetivo y contribución**

Recomendar velocidades por tramo para reducir energía estimada respetando la
hora de llegada. Bruno trabajó en IA junto a otra integrante del equipo:
preparación y validación de datos, modelos energéticos y optimización. La
arquitectura integral, la infraestructura y el dashboard se presentan como
resultado colectivo, sin atribuir a Bruno su autoría exclusiva.

**Sistema documentado**

- Históricos en Cloud Storage, streaming sintético con Pub/Sub y Cloud Functions,
  datos meteorológicos y marítimos externos, y PostgreSQL en Cloud SQL.
- Transformaciones con dbt, orquestación con Cloud Composer / Airflow,
  servicios en Cloud Run e infraestructura como código con Terraform.
- Pipeline de IA con Kubeflow Pipelines / Vertex AI; alineación de GPS y sensores
  por ventanas temporales y modelado por componentes energéticos.
- Comparación de modelos, validación temporal por viajes, prevención de leakage,
  incertidumbre y optimización por programación dinámica con restricciones.
- Registro versionado y compuertas de calidad; dashboard React con vistas para
  operaciones y tripulación. El flujo en vivo utiliza telemetría simulada.

**Límites del resultado**

La evidencia respalda un prototipo funcional desplegado en cloud y validación
técnica con advertencias. No acredita ahorro aplicado a bordo ni adopción
operativa de las recomendaciones. La memoria detalla monitorización y reglas de
reentrenamiento, pero también sitúa la automatización completa como evolución:
no afirmar un ciclo operativo autónomo validado. El piloto a bordo y la expansión
a otras rutas y buques se presentan como siguientes pasos.

### NextPlan - Plataforma de recomendación de eventos con IA

**Estado de evidencia:** verificado en el repositorio público de GitHub (`Data_IA_Project_3`),
código de Dataflow, dbt, clustering K-Means, Vertex AI Agent Engine y Frontend React. Trabajo
colectivo de EDEM (mayo – junio de 2026), Máster en Inteligencia Artificial.

**Publicación y alcance**

- Posición `02` (2026), en `/projects/nextplan-recomendacion-eventos`.
- Plataforma completa desplegada en Google Cloud Platform con arquitectura desacoplada:
  Apache Beam en Dataflow, BigQuery, dbt, Cloud SQL, Firestore, Pub/Sub, Cloud Run,
  Vertex AI Gemini, Google ADK y SendGrid.
- Demostrador interactivo con tres vistas: simulador de swipes y captura telemetría,
  inspección del motor de clustering K-Means con scoring multivariable explicable, y
  simulador de consultas al agente conversacional RAG en dos etapas.

**Objetivo y contribución**

Descubrir y planificar eventos en España mediante una experiencia multicanal (mapa,
swipes y chat con IA). El proyecto se describe de manera integral como sistema de
producto e ingeniería de datos e IA: ingesta masiva con enriquecimiento semántico de
Gemini, streaming asíncrono de swipes con Pub/Sub, modelado dimensional y feature
store con dbt, motor K-Means de clustering y expansión de catálogo por vecindad,
agente conversacional RAG desacoplado en dos fases con Google ADK y bucle de feedback
activo post-evento por email bajo cumplimiento estricto del RGPD.

**Sistema documentado**

- Ingesta batch desde Ticketmaster mediante Apache Beam en Dataflow Flex Template.
- Enriquecimiento de eventos con Gemini 2.5 Flash (taxonomía, vibe, ocasión, horarios,
  bandas de precio) y generación de embeddings con `gemini-embedding-001` (3.072 dims).
- Generación de portadas de eventos con Pollinations.ai a partir de prompts de dirección
  de arte elaborados por Gemini, persistidas en Cloud Storage.
- Streaming de swipes vía FastAPI y Pub/Sub (`swipe-events`) volcados en tiempo real a
  BigQuery `swipes_raw`.
- Modelado dimensional con dbt: `stg_swipes` (con `dwell_ms` y snapshot), modelos
  intermedios de 30 y 90 días, y marts `fct_swipes` y `dim_user_cluster_features_current`.
- K-Means propio con estandarización, optimización por silueta y Davies-Bouldin, matriz
  de distancia entre centroides para clústeres vecinos y materialización de recomendaciones
  en BigQuery `user_recommendation_candidates`.
- Fórmula de scoring multivariable que combina afinidad de clúster (1.00 propio, 0.60/0.40/0.25
  vecinos) con impulsos por coincidencia de ciudad (`home_city_boost`: +0.08) y urgencia
  temporal (`urgency_boost`), con resolución de cold start y `recommendation_reason`.
- Agente conversacional RAG en dos fases con Google ADK en Vertex AI Agent Engine:
  Extractor `LlmAgent` con sanitización defensiva de prompt injection + Ejecutor que invoca
  la tool `buscar_eventos` con `VECTOR_SEARCH` en BigQuery y filtros exactos por SQL.
- Loop de valoración por email: Cloud Tasks + Cloud Functions con JWT firmado (HS256)
  y SendGrid ("Me gustó" / "No me gustó") volcados a BigQuery `valoraciones_eventos`.
- Cumplimiento RGPD (ROPA, DPIA, Art. 32 audit logs) e infraestructura como código con
  20 módulos de Terraform y 11 workflows de CI/CD en GitHub Actions con Workload Identity Federation.

### Alina - Asistente de empleo con agentes de IA

**Estado de evidencia:** verificado en la memoria del proyecto (5 de marzo de 2026)
y en el repositorio público de GitHub (`ia-project-II`). Trabajo colectivo de EDEM
(febrero - marzo de 2026), Máster en Inteligencia Artificial, Grupo 3: Adrián Alemany,
Bruno Esteve, Silvia Pla y Clàudia Salgado.

**Publicación y alcance**

- Posición `03` (2026), en `/projects/alina-asistente-empleo`.
- Prototipo funcional real desarrollado con backend en FastAPI, Google ADK (Agent
  Development Kit), Google Gemini 2.5 Flash, Selenium y frontend en React.
- Muestra un demostrador interactivo con tres vistas: calculador de Match Score con
  desglose de fórmula en vivo, visor estructurado de los cuatro agentes especializados
  (Carta, Entrevista, Research y Upskilling), y comparativa de métricas de optimización.

**Objetivo y contribución**

Transformar la búsqueda de empleo resolviendo la asimetría informativa de las ofertas,
calculando compatibilidad explicable y preparando al candidato sin alucinaciones. Bruno
trabajó en la arquitectura de IA, diseño de agentes con Google ADK, pipeline de extracción
y parsing de CV/ofertas, algoritmo de Match Score y optimización de latencia y tokens
mediante arquitectura de prompts en dos fases.

**Sistema documentado**

- FastAPI + Google ADK con agentes especializados: LlmAgent, SequentialAgent, LoopAgent
  con `exit_loop()` estricto para evitar alucinaciones.
- Ingestión dual: búsqueda en Adzuna con scraping Selenium en paralelo + fallback a
  pegado manual de ofertas para resolver limitaciones de APIs externas.
- Fórmula determinista de Match Score: ponderación de skills cubiertas y parciales con
  bonus de modalidad de trabajo (remoto, híbrido, presencial).
- Optimización de prompts: desacoplamiento en dos fases (razonamiento libre en texto +
  conversión determinista a JSON) que redujo tokens un 40% (1.500 a 900) y elevó la
  fiabilidad JSON del 60% al 95%. Paralelización con reducción del 45% en latencia (55s a 30s).
- Modelo de negocio planteado: Freemium (estudiantes/bootcamps) y Pro/Suscripción
  (universidades, career centers y reclutamiento).

### AEPD - Analítica y predicción de tráfico web

**Estado de evidencia:** verificado en el CV y ampliado con la memoria y defensa
del TFG facilitadas por Bruno el 22/09/2026. Calificación 10/10 confirmada por
Bruno. Trabajo de 2025 realizado en el marco de prácticas académicas en IRTIC
(Universitat de València) para la AEPD.

**Publicación y confidencialidad**

- Posición `04` (2025), en `/projects/aepd-analitica-trafico`.
- La memoria documenta modelado dimensional, ETL, Power BI y experimentación con
  XGBoost, LightGBM e HistGradientBoosting, referencia, búsqueda bayesiana,
  validación temporal y backtesting con MAE, RMSE y MAPE.
- Todo dato de tráfico o predicción visible debe ser ficticio, creado desde cero
  y etiquetado. No publicar cifras originales, periodos de observación, registros,
  nombres internos, capturas ni documentos fuente.
- Contexto, año académico, metodología, herramientas y nota son hechos reales.
- Los gráficos son ilustraciones conceptuales, no resultados de un modelo
  ejecutado ni réplicas del informe original.
- Bruno confirma que el proyecto se llevó a producción y actualmente lo utiliza
  la propia AEPD. Esta confirmación amplía la evidencia de la memoria académica.
- No afirmar ahorros ni impacto operativo cuantificado sin evidencia adicional.
- Anomalías y predicción en tiempo real son líneas futuras.
- La demostración interactiva reproduce los tipos de visualización del informe
  con datos sintéticos independientes: indicadores, barras, tabla, anillo,
  treemap y serie de predicciones. Incluye país, periodo y selección de modelo.
- Mostrar el aviso de datos ficticios una sola vez, en el bloque introductorio
  «Un caso real, datos ficticios.»; no repetirlo en gráficos, Home ni pies.

**Objetivo**

Analizar el tráfico web de la Agencia Española de Protección de Datos y predecir
visitas horarias para apoyar decisiones.

**Contribución y sistema descritos**

- Proceso ETL mediante Pentaho.
- Persistencia y consulta de datos con PostgreSQL.
- Visualización y análisis con Power BI.
- Predicción horaria con XGBoost.
- Mejora frente a un modelo base, sin publicar todavía una cifra concreta.

**Información todavía necesaria para el case study**

La versión pública utiliza una recreación autorizada por Bruno con datos
íntegramente ficticios. El alcance temporal, los volúmenes y los errores reales
se mantienen confidenciales.

### Diseño y desarrollo web

**Estado de evidencia:** verificado de forma general en el CV.

Diseño y construcción de sitios web para instituciones culturales y pequeñas
empresas mediante HTML, CSS y JavaScript.

Antes de convertir esta línea en un case study se necesitan nombres, enlaces,
responsabilidades, capturas y permiso para mostrar cada proyecto.

## Proyectos pendientes de verificación

La guía inicial menciona un robot autónomo con visión por computador y ROS2, y
una línea creativa llamada `MIRAARRIBA_FILMS`. No aparecen en el CV ni se han
encontrado en el contenido público consultado de LinkedIn. No deben publicarse
como proyectos hasta que Bruno aporte contexto y material verificable.

## Capacidades que puede comunicar el sitio

- Traducción de necesidades de negocio a requerimientos de datos.
- Business Intelligence y dashboards.
- Data engineering y almacenes de datos.
- Machine Learning y analítica predictiva.
- MLOps, monitorización y despliegue cloud.
- Optimización aplicada a problemas operativos.
- Diseño y desarrollo de experiencias web.
- Comunicación visual de sistemas complejos.

Las capacidades se deben demostrar mediante proyectos. Evitar nubes de logos,
barras de progreso o puntuaciones subjetivas de dominio.

## Idiomas

El CV indica:

- Castellano y valenciano: nivel máximo en la escala visual del documento.
- Inglés: 3 de 5 en la escala visual del documento.
- Francés: 2 de 5 en la escala visual del documento.

No convertir estas escalas a niveles CEFR sin confirmación.

## Contacto y privacidad

Canales publicables por defecto:

- LinkedIn: https://www.linkedin.com/in/bruno-esteve-castellano/
- GitHub: https://github.com/brunoestevecaste
- Correo: brunoestevecaste@gmail.com

El número de teléfono aparece en el CV, pero no debe incorporarse al sitio público
sin aprobación explícita de Bruno.

## Arquitectura de contenido inicial

### Home

1. Navegación mínima.
2. Hero editorial basado en `style-ref3.webp`, con nombre, declaración principal,
   dos párrafos de presentación y retrato.
3. Índice numerado de proyectos con título y resumen breve.
4. Experiencia y formación seleccionadas, sin repetir la presentación del hero.
5. Capacidades demostradas mediante evidencia.
6. Contacto y enlaces externos.

### Índice de proyectos (Layout & Flujo Editorial)

La Home funciona como índice visual y punto de entrada inmersivo. Cada proyecto presenta:

1. **Numeración destacada:** número de orden con dos dígitos (`01`, `02`, `03`, `04`) en gran escala.
2. **Fotografía característica:** encuadre editorial en blanco y negro que comunica la identidad del proyecto.
3. **Texto sutil:** únicamente el título del proyecto en la tipografía de texto normal de la web (`Space Mono`), evitando párrafos extensos en la Home para preservar el refinamiento y la ligereza visual.
4. **Disposición alternada y escalonada:** los proyectos fluyen uno debajo del otro alternando columnas izquierda y derecha con desplazamiento asimétrico vertical.
5. **Barra de scroll vertical delicada:** guía fina de 1px a la izquierda con indicador dinámico de avance y marcadores de salto directo a cada proyecto.
6. **Animaciones integradas:** revelado suave progresivo en scroll y animación de pulsado táctil antes de la transición a la página individual.

Orden de presentación verificado y actualizado:

1. `01` - Baleària: optimización energética de rutas navieras (2026, TFM).
2. `02` - NextPlan: plataforma de recomendación de eventos con IA (mayo–junio 2026, Máster en IA).
3. `03` - Alina: asistente de empleo con agentes de IA (febrero–marzo 2026, Máster en IA).
4. `04` - AEPD: analítica y predicción de tráfico web (2025, TFG, calificación 10/10).

### Case studies

Cada proyecto publicado cuenta con una ruta independiente bajo `/projects/[slug]`, estructurada en dos niveles de lectura:

1. **Nivel 1 — Split Hero (Pantalla superior 50/50):**
   - Lado izquierdo: fotografía representativa del proyecto a gran escala y alta definición.
   - Lado derecho: **Resumen ejecutivo** condensado que expone de un vistazo:
     - Título y antetítulo institucional.
     - Sinopsis general de valor.
     - Tres pilares ejecutivos: *Reto de negocio*, *Solución técnica e IA*, e *Impacto y validación*.
     - Metadatos (rol, tecnologías, marco académico o profesional).
     - Llamada a continuar: enlace / botón de scroll suave al caso completo.
2. **Nivel 2 — Case Study completo (al hacer scroll):**
   - Contexto y problema.
   - Papel de Bruno y colaboración en equipo.
   - Restricciones y confidencialidad / notas de datos ficticios.
   - Proceso y decisiones.
   - Arquitectura funcional y pipelines de datos.
   - Demostraciones interactivas y dashboards funcionales con Recharts.
   - Resultados respaldados por evidencia.
   - Aprendizajes técnicos.
   - Navegación accesible recíproca entre casos.

Rutas publicadas:

- `/projects/balearia-eficiencia-energetica`
- `/projects/nextplan-recomendacion-eventos`
- `/projects/alina-asistente-empleo`
- `/projects/aepd-analitica-trafico`

## Preguntas editoriales pendientes

- Idioma final: español, inglés o versión bilingüe.
- Disponibilidad profesional y tipo de oportunidades buscadas.
- Baleària: resuelto con metodología general e ilustraciones ficticias; los datos
  y resultados operativos originales no se publican.
- AEPD: resuelto con ejemplos ficticios; las métricas originales no se publican.
- Identidad de los proyectos de diseño web.
- Contexto y evidencias del robot autónomo y `MIRAARRIBA_FILMS`.

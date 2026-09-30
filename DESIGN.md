# DESIGN.md

## Dirección seleccionada

**Editorial Systems**

Una identidad editorial de precisión para presentar proyectos de datos e IA como
sistemas comprensibles, visuales y útiles. La web debe sentirse más cercana a una
publicación contemporánea y a un dossier técnico bien dirigido que a una plantilla
de portfolio de desarrollador.

Este documento es la fuente de verdad visual. Cualquier cambio de dirección debe
actualizarse aquí antes de propagarse a componentes y páginas.

## Design read

Portfolio híbrido para recruiters, responsables de innovación y colaboradores,
con lenguaje editorial-tecnológico, composición asimétrica, fotografía monocroma
y una implementación propia basada en Tailwind, sin adoptar un kit visual externo.

## Design dials

- `DESIGN_VARIANCE: 8/10`
- `MOTION_INTENSITY: 3/10`
- `VISUAL_DENSITY: 3/10`

Interpretación:

- La composición puede ser atrevida y desplazada, pero debe conservar una lectura
  inmediata.
- El movimiento ayuda a revelar jerarquía y relaciones; nunca protagoniza por sí
  solo.
- El espacio negativo es estructural. La web no debe parecer un dashboard.

## Refinamiento tipográfico · septiembre de 2026

- Space Mono pasa a ser la voz de navegación, cuerpo y metadatos. Archivo
  conserva los titulares y el texto destacado.
- El hero se compone en tres unidades de lectura en desktop, con escala fluida
  hasta 128px. Los cortes se liberan en móvil para evitar desbordamientos.
- Los titulares de sección usan mayúsculas y hasta 112px: el contraste con
  las mayúsculas del hero distingue apertura y capítulos.
- El cuerpo en Space Mono baja a 14-16px; Archivo reserva más contraste
  para titulares y textos destacados.
- El contacto cierra con una palabra de gran escala y una línea de enlaces.
- Se mantienen paleta, anclas, textos y reserva del retrato original. Este pase
  refina la Home existente; no incorpora case studies ni contenido sin verificar.

## Cómo influyen las referencias

### `refs/estilo/style-ref1.webp`

Conservar:

- Superficie clara con textura sutil de papel.
- Inventario de proyectos distribuido en una retícula amplia.
- Jerarquía creada mediante escala, posición y espacio.
- Fotografía en blanco y negro.
- Sensación de dossier editorial.

Adaptar:

- Space Mono se reserva para lectura continua, navegación y metadatos.
- Los proyectos deberán ser más fáciles de escanear y activar.

### `refs/estilo/style-ref2.webp`

Conservar:

- Marco editorial superpuesto a una imagen real de gran escala.
- Contraste entre imagen inmersiva e información precisa.
- Navegación horizontal mínima.
- Tipografía grotesca con cambios fuertes de escala.

Descartar:

- El solapamiento no debe comprometer la lectura móvil.
- No se copiará el lenguaje de portfolio de moda.

### `refs/estilo/style-ref3.webp`

Esta es la referencia principal para la composición del hero.

Conservar:

- Nombre situado en la esquina superior izquierda.
- Titular protagonista alineado a la izquierda.
- Imagen monocroma con función narrativa.
- Dos columnas editoriales breves para la presentación personal.
- Márgenes generosos y pequeños datos de contexto.

Adaptar:

- La biografía será concreta y profesional, sin tono de propuesta de agencia.
- El retrato ocupará el bloque inferior derecho y equilibrará las dos columnas de
  texto situadas en la zona inferior izquierda.
- Los datos de página solo aparecerán si ayudan a navegar un case study.

## Síntesis visual

La combinación elegida es:

- Precisión suiza en retícula y tipografía.
- Escala editorial para la narrativa.
- Señalética técnica para tecnologías, roles y resultados.
- Imágenes reales tratadas en monocromo o color muy controlado.
- Un único acento rojo para títulos, navegación y elementos clave.

La búsqueda de `ui-ux-pro-max` devolvió una base monocroma con un color de acento,
tipografía Archivo y Space Grotesk y composición asimétrica. Su clasificación
brutalista y su propuesta de animación con GSAP se descartaron por no encajar con
las referencias. Se conservan únicamente los resultados que sí están respaldados
por el brief y el material visual.

## Paleta

### Tokens principales

| Token | Valor | Uso |
|---|---:|---|
| `--color-canvas` | `#F9F4F4` | Fondo editorial principal |
| `--color-surface` | `#E9EAE7` | Superficies secundarias y bloques de imagen |
| `--color-ink` | `#121416` | Texto principal |
| `--color-muted` | `#5C6268` | Texto secundario y metadatos |
| `--color-line` | `#CFD1CE` | Divisores estructurales |
| `--color-accent` | `#C1282E` | Titulares grandes, numeración de proyectos y foco |
| `--color-accent-ink` | `var(--accent)` | Títulos pequeños, enlaces y navegación activa |
| `--color-signal` | `#333333` | Señal de datos y controles monocromos |
| `--color-on-signal` | `#F8F8F8` | Texto sobre el color de señal |

Reglas:

- Un solo color de acento para toda la experiencia.
- Nada de degradados morados, brillos neón o cambios arbitrarios de paleta.
- El color de señal se usa para interacción o significado, no como decoración.
- Desde el 30/09/2026, por indicación de Bruno, el acento es `#C1282E`.
  El fondo principal pasa a `#F9F4F4`, incluido el header y la introducción.
  Se aplica al hero, encabezados de sección y caso, numeración de proyectos y foco.
  Se usa el mismo rojo en texto grande y pequeño, con contraste
  de al menos 4.5:1 sobre los fondos claros. Cuerpo, fotografías y gráficos conservan
  su tratamiento monocromo.
- La primera versión es light-only porque la dirección imita una publicación
  impresa y todas las referencias aportadas son claras. No mezclar secciones dark.

## Tipografía

### Familias

- Desde el 30/09/2026, `Bricolage Grotesque`, con `next/font/google`, se aplica
  exclusivamente a los títulos (`h1`–`h6`), incluidos los del índice de proyectos
  y los demostradores. Sustituye las referencias anteriores a Archivo o Space
  Mono en títulos, conservando pesos e interlineados.
- `Archivo` se mantiene en el texto destacado, la numeración y el menú.
- `Space Mono`, también cargada con `next/font/google`, se aplica al cuerpo,
  navegación, enlaces y metadatos.
- Display: Bricolage Grotesque 400 y mayúsculas, con tracking `-0.06em`
  en el hero, títulos de caso y encabezados de sección. Los subtítulos usan
  `-0.045em`, los títulos de educación `-0.04em` y los títulos pequeños
  `-0.03em`; las etiquetas funcionales pequeñas en mayúsculas usan `-0.01em`.
  Estos valores sustituyen el tracking anterior de Archivo para evitar
  solapamientos sin perder la composición compacta. Se comparten mediante
  los tokens `--tracking-heading-display`, `--tracking-heading-title` y
  `--tracking-heading-small`.
- Los títulos de sección usan `</Título>`, sin espacio entre la barra y la
  primera letra, mediante el componente compartido `SectionHeading`.
- La sección de contacto se titula «Hablemos», sin punto final.
- Desde el 30/09/2026, el hero y los encabezados de sección aumentan su escala
  aproximadamente un 8 % y usan tracking `-0.075em`, compartido mediante
  `--tracking-heading-section`. El resto de titulares mantiene sus valores.
  El hero usa `clamp(3.25rem, min(6.75vw, 10.8svh), 6.5rem)` en escritorio,
  `clamp(2.125rem, min(10.25vw, 6.5svh), 3.75rem)` en móvil y
  `clamp(1.625rem, min(8.5vw, 5.2svh), 1.875rem)` por debajo de 360px.
- Los encabezados de sección usan `clamp(3.25rem, 8.6vw, 7.5rem)` en escritorio
  y `clamp(2.125rem, 12.8vw, 3.25rem)` en móvil, también en Proyectos.
  Los títulos de caso se limitan a `4.625rem` y bajan a `2.125rem` por debajo
  de 360px para que las palabras largas encajen con el nuevo tracking.
- El texto destacado usa Archivo; el texto de lectura continua usa Space Mono,
  con interlineado amplio y tracking natural. El texto destacado en Archivo usa
  `-0.03em` para una composición más compacta.
- Los metadatos usan Space Mono con `font-variant-numeric: tabular-nums` y
  mayúsculas restringidas.

### Escala orientativa

- Display: `clamp(3.25rem, 8.9vw, 8rem)`, tres unidades de lectura en desktop,
  interlineado 0.98. En móvil escala desde 2.375rem y permite más líneas sin recortes.
- H1 interior: `clamp(3rem, 6vw, 6rem)`.
- H2: `clamp(3rem, 8vw, 7rem)`, mayúsculas e interlineado 1.02.
- H3: `clamp(1.35rem, 2vw, 2rem)`.
- Body large: `clamp(1.125rem, 1.4vw, 1.375rem)`.
- Body: `clamp(0.875rem, 1vw, 1rem)` en escritorio y `0.9375rem` en móvil,
  con interlineado `1.55`.
- Metadata: `0.75rem` a `0.875rem`, nunca menos de `12px`.

Reglas:

- Titulares cortos, concretos y alineados a la izquierda.
- El hero admite un máximo de cuatro elementos textuales.
- No introducir serif como recurso automático de sofisticación.
- No mezclar familias dentro de una misma frase para enfatizar una palabra.
- El ancho de lectura del cuerpo no debe superar `65ch`.

## Retícula y espacio

### Desktop

- Contenedor máximo: `1440px`.
- Retícula: 12 columnas.
- Margen exterior: `clamp(24px, 4vw, 72px)`.
- Gutter: `clamp(16px, 2vw, 32px)`.

### Tablet

- Retícula: 6 columnas.
- Margen exterior: `32px`.

### Mobile

- Retícula: 4 columnas.
- Margen exterior: `18px`.
- Toda composición asimétrica debe resolver en una sola columna legible por
  debajo de `768px`.

### Espaciado

Base de 4px con una escala recomendada de 8, 12, 16, 24, 32, 48, 72, 96, 144 y
192px. Los grandes vacíos deben separar capítulos; no deben compensar una
jerarquía tipográfica débil.

## Forma y materialidad

- Esquinas apenas suavizadas con el token compartido `--radius-editorial: 3px`
  en imágenes, superficies, paneles, menús y controles. La retícula conserva
  su carácter editorial; los elementos circulares funcionales mantienen su forma.
  Las imágenes se recortan al contorno redondeado sin borde ni línea superpuesta.
  El retrato del hero conserva sus esquinas rectas, por indicación de Bruno.
- Botones compactos con radio máximo de `3px` o enlaces textuales subrayados.
- Sin tarjetas genéricas para agrupar contenido que puede organizarse con espacio.
- Divisores finos solo donde expresen estructura real.
- Sombras casi inexistentes. Si se requieren, serán amplias, suaves y teñidas con
  el tono del fondo.
- Puede utilizarse una textura de grano extremadamente sutil como capa fija,
  siempre que no afecte al rendimiento ni a la legibilidad.

## Arquitectura visual de la Home

### Navegación

- Inspirada directamente en `refs/estilo/style-ref3.webp`.
- Una sola línea en desktop y altura máxima de 72px (`min-h-18`), fija en la parte superior (`sticky top-0`) sobre superficie `--color-canvas`, sin línea de división inferior.
- Estructura en tres columnas (`grid-cols-[1fr_auto_1fr]`):
  - **Esquina superior izquierda:** `Bruno Esteve Castellano` (adaptado a `Bruno Esteve` en móviles muy estrechos) en mayúsculas de peso normal (`Space Mono`), funcionando como enlace y retorno suave a la portada.
  - **Centro:** indicador dinámico de sección en mayúsculas (`Space Mono`); se inicia como `INICIO` en la portada y se actualiza suavemente según la sección visible en el scroll (`INICIO`, `EDUCACIÓN`, `EXPERIENCIA`, `PROYECTOS`, `CONTACTO`), enlazado con desplazamiento suave a cada apartado.
  - **Esquina superior derecha:** símbolo minimalista de menú (dos líneas horizontales suizas que transicionan a cruz de cierre al abrirse) con objetivo táctil accesible (44x44px).
- **Menú integrado en el header:**
  - Al abrir, las cinco opciones (`INICIO`, `EDUCACIÓN`, `EXPERIENCIA`,
    `PROYECTOS`, `CONTACTO`) se revelan desde la derecha y ocupan la misma fila
    de 72px en escritorio (desde 1024px). El nombre y la cruz permanecen visibles;
    el indicador central se oculta mientras el menú está abierto.
  - En móvil y tablet, el header se amplía y distribuye las opciones en dos
    columnas; desde 640px se muestran en una fila adicional. Todas conservan
    un objetivo táctil de al menos 44px de alto.
  - Misma superficie `--color-canvas`, Space Mono a 12px, sin panel flotante,
    sombra, numeración ni fondo superpuesto sobre la página. La sección actual
    se distingue por peso y contraste, además de `aria-current`.
  - La cruz repliega las opciones hacia la derecha. También se cierra con
    `Escape`, al navegar y al pulsar fuera del header. El menú cerrado queda
    fuera del recorrido de teclado; `Escape` devuelve el foco al botón.
  - Se reutilizan los tokens de duración y curva del sitio. Con movimiento
    reducido, se desactivan las transiciones y el desplazamiento suave.

### Hero

- `refs/estilo/style-ref3.webp` es la referencia compositiva directa, sin copiar su copy
  ni su identidad de portfolio de moda.
- El nombre aparece en la esquina superior izquierda, integrado en la primera fila
  de navegación.
- Una declaración profesional de gran escala ocupa la franja superior y expresa
  con claridad a qué se dedica Bruno.
- El titular empieza inmediatamente bajo la cabecera (16px en desktop), ocupa
  todo el ancho y se compone en mayúsculas. No anclar el conjunto al fondo del
  viewport ni introducir un gran vacío por encima del titular.
- La franja inferior se divide en tres áreas: párrafo de presentación, párrafo de
  enfoque profesional y retrato.
- Los dos párrafos deben ser breves, tener un ancho de lectura controlado y formar
  dos columnas alineadas por la base en desktop.
- El retrato ocupa cinco de las doce columnas, a la derecha. Encuadre 5:4 en
  desktop y móvil para conservar el rostro completo, con tratamiento monocromo.
- Los textos ocupan tres columnas cada uno; una columna libre los separa del
  retrato. Su tamaño es equivalente, sin un primer párrafo sobredimensionado.
- Hasta recibir el original, reservar la superficie con una indicación discreta.
  No sustituir la identidad de Bruno por una persona de stock o generada.
- El hero no incluye botones. `Work`, `About` y `Contact` en la navegación y la
  proximidad del índice de proyectos proporcionan las rutas necesarias.
- En escritorio, cabecera y hero ocupan aproximadamente el primer viewport; el
  hero resta los 72px de cabecera a `100svh`. Con texto extenso en móvil, el hero
  crece en altura para conservar un tamaño legible y no recortar contenido.
- En móvil el retrato aparece a ancho completo, seguido por los dos párrafos
  apilados. El orden DOM sigue siendo declaración, retrato y párrafos.
- No añadir etiquetas de versión, indicadores de scroll, disponibilidad ficticia
  ni tiras decorativas de palabras.

### Selected Work (Layout & Flujo Editorial)

Por indicación de Bruno en septiembre de 2026 y siguiendo la referencia de `refs/proyectos/video_projects.mp4`:

- **Composición alternada y escalonada (Staggered Grid):** Los proyectos se disponen
  en una doble columna asimétrica en desktop. El proyecto `01` abre a la izquierda,
  el `02` se sitúa a la derecha con un desplazamiento vertical descendente (offset),
  el `03` continúa a la izquierda y el `04` a la derecha. En pantallas móviles se
  apilan en una sola columna con espaciado uniforme.
- **Barra de scroll delicada (Left Scroll Rail):** A la izquierda de la sección de
  proyectos en desktop se sitúa una guía vertical finísima (1px en `--color-line`)
  fijada con comportamiento sticky. Cuenta con un deslizador sutil (`railThumb`) que
  recorre la línea según el progreso de scroll, marcadores numerados (`01` a `04`)
  que destacan el proyecto en foco y permiten navegación suave directa. En pantallas
  móviles se oculta para maximizar el área de lectura.
- **Numeración protagonista:** Cada tarjeta muestra su número de orden (`01`, `02`, etc.)
  en tipografía de gran escala (`Archivo`), situado limpiamente sobre el marco de imagen.
- **Fotografía característica:** Cada proyecto incorpora una imagen representativa en
  blanco y negro de encuadre editorial y proporción 4:3, con radio mínimo de 2px y
  micro-interacción suave de escala en hover.
- **Texto sutil en la Home:** Para mantener la pureza visual y el refinamiento de la
  referencia, la Home no muestra bloques largos de descripción en este índice.
  Muestra únicamente el título del proyecto en la tipografía de texto normal (`Space Mono`),
  garantizando una jerarquía limpia y descansada.
  Los nombres bajo las fotos usan el negro `--ink`, también en hover y foco,
  y no llevan flecha a la derecha, por indicación de Bruno el 30/09/2026.
- **Animaciones:**
  - *Animación de scroll:* Los proyectos emergen suavemente mediante revelado
    progresivo (opacidad y ligero desplazamiento vertical) al entrar en el viewport,
    mientras la guía lateral actualiza la posición del indicador.
  - *Animación de click y transición compartida (FLIP + texto coordinado):* Al pulsar
    un proyecto en la Home, se ejecuta una transición continua inspirada en `refs/proyectos/video_projects.mp4`:
    la imagen del proyecto se transforma suavemente (mediante FLIP con curva `cubic-bezier(0.16, 1, 0.3, 1)`)
    desde su coordenada en el feed hasta la columna izquierda del split editorial (50/50).
    Al mismo tiempo, el texto del resumen ejecutivo (antetítulo, título en `Archivo`, sinopsis,
    puntos clave y metadatos) aparece al lado de la imagen en la columna derecha mediante un
    desvanecimiento suave (`opacity: 0 -> 1`) y elevación sutil (`translateY: 24px -> 0`).
    Al completarse el vuelo visual, la página de destino `/projects/[slug]` asume el control
    sin saltos, permitiendo explorar el caso completo mediante scroll hacia `#case-study`.

### Perfil

- La presentación personal vive en los dos párrafos y el retrato del hero. La sección dedicada
  independiente en la Home fue retirada para mantener la máxima concisión editorial y evitar redundancias
  con la trayectoria detallada en Educación y Experiencia.
- No trasladar el CV completo a la Home.

### Capacidades

- Agrupadas por problemas que Bruno puede resolver.
- Sin barras de progreso, porcentajes subjetivos ni nubes de logos.
- Las tecnologías aparecen vinculadas a proyectos y decisiones reales.

### Contacto

- Una única intención: contactar.
- Correo, LinkedIn y GitHub.
- No publicar teléfono sin autorización explícita.
- El chat usa un gris cálido claro, derivado de `--ink` al 6 % sobre `--canvas`,
  en las burbujas del asistente y el avatar del visitante. Por indicación de Bruno
  el 30/09/2026, estas superficies permanecen en la escala de grises, sin rojo.

## Case studies

- Cada proyecto tiene una ruta independiente bajo `/projects/[slug]`.
- **Estructura en dos fases (Split Hero + Case Study profundo):**
  1. *Hero inicial dividido (50 / 50):*
     - Columna izquierda: fotografía característica a gran escala y alta definición.
     - Columna derecha: **Resumen ejecutivo** estructurado (numerador `01 / 04`,
       antetítulo de marco institucional, título en `Archivo`, sinopsis ejecutiva,
       tres puntos clave: *Reto de negocio*, *Solución técnica e IA*, e *Impacto y validación*,
       metadatos clave y tecnologías).
     - Botón / disparador de scroll suave: *«Ver caso de estudio completo ↓»*.
  2. *Case study completo al hacer scroll:* Al desplazarse hacia abajo (ancla `#case-study`),
     se despliega la totalidad del case study técnico:
     - Aviso de confidencialidad o contexto de datos.
     - Índice lateral sticky de secciones (`Contexto`, `Arquitectura`, `Preparación`,
       `Predicción`, `Modelos / Clustering / Agentes`, `Demostración interactiva / Dashboard`,
       `Resultados`, `Aprendizajes`).
     - Demostradores interactivos completos y dashboards con Recharts (AEPD, Baleària,
       NextPlan, Alina).
     - Paginación editorial recíproca al pie entre proyectos.
- Cada ruta define metadata, título, descripción, Open Graph y URL canónica propios.

## Fotografía y recursos visuales

Prioridad:

1. Fotografías y capturas reales de los proyectos.
2. Retrato original en alta resolución.
3. Diagramas técnicos creados a partir de arquitectura verificable.
4. Imágenes editoriales en blanco y negro con tratamiento tonal monocromo de alta precisión.

Tratamiento:

- Blanco y negro o saturación contenida.
- Encuadres amplios, documentales y con espacio negativo.
- Retrato 5:4 en desktop y móvil; proyectos 4:3 y 16:10.
- No usar stock genérico, blobs, renders 3D gratuitos ni capturas falsas.

## Motion

Nivel 4: composición editorial con transiciones motivadas y feedback de navegación.

### Permitido

- Entrada inicial de titular, imagen y navegación mediante opacidad y traslación.
- Deslizamiento continuo del indicador en la barra vertical de scroll de proyectos.
- Revelado escalonado en scroll de los proyectos alternados.
- **Transición compartida (*Shared Element Morph Transition* Home → Proyecto):**
  Al pulsar una tarjeta en la Home, la fotografía seleccionada se despega y expande
  fluidamente (mecánica FLIP) desde sus coordenadas en el feed hasta la columna
  izquierda del Split Hero de la página individual (`cubic-bezier(0.16, 1, 0.3, 1)`
  en ~440ms). Los elementos circundantes de la Home se atenúan (`opacity: 0.12 -> 0`)
  y, al asentarse en la página de destino, la columna derecha con el resumen ejecutivo
  emerge en cascada editorial (`translateY: 24px -> 0`, `opacity: 0 -> 1`).
- Aparición fluida del split hero en la página de caso y scroll suave hacia el case study.
- Micro-escala (1.03) y filtro tonal en el hover de imágenes.
- Duraciones de 180ms para feedback, 440ms para la transición compartida y 600-700ms para reveals.

### No permitido

- Scroll hijacking que bloquee el movimiento natural del usuario.
- Parallax continuo descontrolado.
- Marquees decorativos o cursores personalizados.
- Animaciones infinitas sin valor informativo.

Toda animación debe explicar jerarquía, feedback o continuidad. Se desactiva y degrada
a presentación estática instantánea bajo `prefers-reduced-motion: reduce`.

## Responsive y accesibilidad

- Diseñar y revisar en 375, 768, 1024 y 1440px.
- Objetivos táctiles de al menos 44 por 44px.
- Contraste WCAG AA como mínimo.
- Estados de foco visibles con el color de señal y separación suficiente.
- Navegación y case studies completamente utilizables con teclado.
- Orden del DOM independiente de la composición visual.
- Imágenes con dimensiones reservadas para evitar CLS.
- Texto nunca inferior a 12px.

## Anti-patrones del proyecto

- Hero centrado sobre un degradado oscuro.
- Tres tarjetas idénticas para proyectos o capacidades.
- Glassmorphism, sombras grandes y píldoras por defecto.
- Morado de IA, glow azul o estética de terminal como identidad.
- Secciones numeradas como recurso decorativo.
- Etiquetas pequeñas en mayúsculas sobre cada titular.
- Listas de tecnologías sin relación con un problema.
- Métricas inventadas o precisión falsa.
- Lenguaje como `innovador`, `revolucionario`, `seamless` o `next-gen` sin prueba.
- Cambios de tema entre secciones.
- Copiar literalmente la estética de moda de las referencias.

## Criterios de aceptación visual

- La propuesta se entiende como datos e IA antes de leer el segundo bloque.
- La Home utiliza al menos cuatro familias de composición diferentes.
- Ninguna sección depende de tarjetas genéricas para crear jerarquía.
- El color de señal conserva la misma función en toda la web.
- El contenido se puede recorrer y entender sin animaciones.
- Las imágenes son reales o están identificadas como material conceptual.
- La versión móvil conserva identidad sin provocar scroll horizontal.
- El resultado se siente editorial y técnico, no brutalista, SaaS ni generado por
  una plantilla.

## Caso de estudio: AEPD

- Extensión de Editorial Systems con los mismos tokens y diales 8/3/3.
- Resumen en una fila editorial enlazada y detalle con índice lateral en desktop,
  convertido en enlaces en flujo normal en móvil.
- Demostración interactiva del informe con indicadores, barras, tabla de
  solicitudes, anillo, treemap de FAQs y predicciones. Mantener las visualizaciones
  de la referencia, adaptadas a Archivo, Space Mono, fondos claros y una paleta monocroma.
- Aviso de datos ficticios únicamente en el bloque introductorio del caso.
- Esquema funcional simplificado con etiquetas genéricas, sin infraestructura
  interna ni capturas de los documentos privados.
- La nota 10/10 es académica y no una métrica de rendimiento del sistema.

## Separación sin líneas

Por indicación de Bruno, la web no utiliza líneas de separación entre secciones,
filas, metadatos o bloques. Utilizar espacio, tipografía y superficies. Esta
regla sustituye cualquier referencia anterior a divisores o bordes estructurales.
Conservar el foco accesible y los trazos que representan datos en los gráficos.

## Caso de estudio: Baleària

- Reutiliza el índice editorial, cabecera, metadatos e índice lateral de AEPD.
- Mismos tokens, tipografías y superficie clara; sin nuevas líneas de separación.
- Arquitectura funcional con entradas, base compartida y consumidores; no es
  una captura ni reproduce identificadores internos.
- Gráfico escalonado de velocidades con valores ficticios, leyenda por trazo y
  color, y tabla desplegable accesible. No representa un ahorro real.
- Aviso introductorio de confidencialidad y etiqueta de ilustración junto al
  ejemplo; la Home identifica también su vista previa como ficticia.
- Navegación recíproca entre los dos casos mediante un componente compartido.

## Gráficos con Recharts

- Las barras, el anillo, el treemap y las series temporales utilizan Recharts,
  incluidas las vistas previas de la Home y los perfiles de velocidad de Baleària.
- Se conserva la paleta monocroma vigente. Archivo organiza títulos y resultados;
  Space Mono identifica categorías, escalas, leyendas y valores.
- Los gráficos se integran en las superficies editoriales existentes, sin marcos,
  sombras ni cuadrículas añadidas; las superficies usan el radio editorial de
  `2px`. Las barras parten de cero.
- Series observadas con trazo continuo y comparaciones con trazo discontinuo.
  Los perfiles de velocidad son escalonados: no se suavizan los datos.
- Etiquetas de al menos 12px, formato numérico español y valores completos
  disponibles mediante leyendas, tooltips y consultas desplegables.
- Las dimensiones se adaptan al contenedor con altura reservada. Las animaciones
  de Recharts están desactivadas, también en los tooltips.
- La interacción de teclado se activa en los gráficos de los casos. Las vistas
  previas dentro de los enlaces de la Home no añaden paradas de foco.

## Dashboard AEPD · referencia visual SYSTEM

Por indicación de Bruno, el dashboard adopta la referencia gráfica facilitada:
blanco puro, negro, grises neutros y una retícula continua de líneas finas.
Esta excepción a la separación sin líneas y a las superficies claras uniformes
se limita al dashboard AEPD; no se extiende al resto del portfolio.

- Cabecera compacta, etiquetas funcionales en mayúsculas y Archivo como voz
  principal. Space Mono permanece en escalas, fechas y valores de los gráficos.
- Tres indicadores existentes en una franja continua, con cifras grandes y
  gruesas. El bloque de descargas se invierte a blanco sobre negro.
- Predicciones como gráfico principal, anillo a la derecha y tabla de solicitudes
  a todo el ancho debajo. Los demás análisis continúan en una retícula inferior.
- Paneles unidos sin separación entre tarjetas, sin sombras y con el radio
  editorial mínimo de `2px`;
  divisores suaves y cabecera de tabla con una línea negra más marcada.
- Se preservan todos los datos, fórmulas, filtros, etiquetas y tipos de gráfico.
  No se incorporan las métricas, numeraciones ni estados ficticios de la imagen.
- En contenedores estrechos la lectura sigue el mismo orden en una columna,
  con filtros y valores legibles, sin depender de interacción por hover.

## Dashboard Baleària

- Adapta la retícula SYSTEM del dashboard AEPD al contexto marítimo: fondo
  blanco, líneas finas, paneles unidos, tipografía Archivo y valores en Space Mono.
- Conserva las dos perspectivas del prototipo, operaciones y tripulación, como
  controles accesibles. Los selectores de unidad y viaje actualizan todos los
  indicadores con datos ficticios deterministas.
- La vista de operaciones prioriza el perfil observado frente al recomendado,
  la estimación energética y el contexto de la recomendación. La vista de
  tripulación prioriza progreso, telemetría, condiciones y sensores.
- La visualización no reproduce el mapa, los colores ni las tarjetas SaaS del
  frontend original. Traduce su arquitectura de información al lenguaje visual
  del portfolio y mantiene tablas consultables como alternativa a los gráficos.
- La etiqueta `Datos ficticios` permanece visible en la barra de filtros. Los
  nombres genéricos de unidades, puertos y rutas evitan sugerir datos reales.

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

### `refs/style-ref1.webp`

Conservar:

- Superficie clara con textura sutil de papel.
- Inventario de proyectos distribuido en una retícula amplia.
- Jerarquía creada mediante escala, posición y espacio.
- Fotografía en blanco y negro.
- Sensación de dossier editorial.

Adaptar:

- Space Mono se reserva para lectura continua, navegación y metadatos.
- Los proyectos deberán ser más fáciles de escanear y activar.

### `refs/style-ref2.webp`

Conservar:

- Marco editorial superpuesto a una imagen real de gran escala.
- Contraste entre imagen inmersiva e información precisa.
- Navegación horizontal mínima.
- Tipografía grotesca con cambios fuertes de escala.

Descartar:

- El solapamiento no debe comprometer la lectura móvil.
- No se copiará el lenguaje de portfolio de moda.

### `refs/style-ref3.webp`

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
- Una única señal monocroma como color de interacción y dato relevante.

La búsqueda de `ui-ux-pro-max` devolvió una base monocroma con un color de acento,
tipografía Archivo y Space Grotesk y composición asimétrica. Su clasificación
brutalista y su propuesta de animación con GSAP se descartaron por no encajar con
las referencias. Se conservan únicamente los resultados que sí están respaldados
por el brief y el material visual.

## Paleta

### Tokens principales

| Token | Valor | Uso |
|---|---:|---|
| `--color-canvas` | `#F4F3EF` | Fondo editorial principal |
| `--color-surface` | `#E9EAE7` | Superficies secundarias y bloques de imagen |
| `--color-ink` | `#121416` | Texto principal |
| `--color-muted` | `#5C6268` | Texto secundario y metadatos |
| `--color-line` | `#CFD1CE` | Divisores estructurales |
| `--color-signal` | `#333333` | Enlaces, foco, CTA y datos clave |
| `--color-on-signal` | `#F8F8F8` | Texto sobre el color de señal |

Reglas:

- Un solo color de acento para toda la experiencia.
- Nada de degradados morados, brillos neón o cambios arbitrarios de paleta.
- El color de señal se usa para interacción o significado, no como decoración.
- La señal y los gráficos usan únicamente negros, blancos y grises; no hay azul de acento.
- La primera versión es light-only porque la dirección imita una publicación
  impresa y todas las referencias aportadas son claras. No mezclar secciones dark.

## Tipografía

### Familias

- `Archivo`, con `next/font/google`, se reserva para titulares y texto
  destacado.
- `Space Mono`, también cargada con `next/font/google`, se aplica al cuerpo,
  navegación, enlaces y metadatos.
- Display: Archivo 400 y mayúsculas, con tracking `-0.085em` en el hero y
  `-0.07em` en los encabezados de sección. Estos también van en mayúsculas.
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

- Layout, imágenes y bloques editoriales con esquinas rectas.
- Botones compactos con radio máximo de `2px` o enlaces textuales subrayados.
- Sin tarjetas genéricas para agrupar contenido que puede organizarse con espacio.
- Divisores finos solo donde expresen estructura real.
- Sombras casi inexistentes. Si se requieren, serán amplias, suaves y teñidas con
  el tono del fondo.
- Puede utilizarse una textura de grano extremadamente sutil como capa fija,
  siempre que no afecte al rendimiento ni a la legibilidad.

## Arquitectura visual de la Home

### Navegación

- Una sola línea en desktop y altura máxima de 72px.
- `Bruno Esteve Castellano` funciona como wordmark tipográfico y enlace a la Home
  en la esquina superior izquierda.
- `Work`, `About` y `Contact` como máximo.
- En la versión española: `Proyectos`, `Perfil` y `Contacto`.
- Nombre y navegación en mayúsculas de peso normal, sin línea bajo la cabecera.
- LinkedIn y GitHub pueden vivir en el footer.

### Hero

- `refs/style-ref3.webp` es la referencia compositiva directa, sin copiar su copy
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
  desktop como `style-ref3.webp` y 4:5 en móvil, con tratamiento monocromo.
- Los textos ocupan tres columnas cada uno; una columna libre los separa del
  retrato. Su tamaño es equivalente, sin un primer párrafo sobredimensionado.
- Hasta recibir el original, reservar la superficie con una indicación discreta.
  No sustituir la identidad de Bruno por una persona de stock o generada.
- El hero no incluye botones. `Work`, `About` y `Contact` en la navegación y la
  proximidad del índice de proyectos proporcionan las rutas necesarias.
- En pantallas amplias, cabecera y hero ocupan aproximadamente el primer viewport;
  el hero resta los 72px de cabecera a `100svh`. La altura puede crecer si el
  contenido lo necesita. La imagen mantiene su proporción y nunca se recorta texto.
- En móvil el orden será: nombre y navegación, declaración, retrato, párrafo 1 y
  párrafo 2. El contenido puede superar el viewport y debe conservar un orden DOM
  equivalente al orden de lectura.
- No añadir etiquetas de versión, indicadores de scroll, disponibilidad ficticia
  ni tiras decorativas de palabras.

### Selected Work

- Índice editorial numerado, no rejilla de tarjetas iguales.
- Cada fila muestra un número de dos dígitos, título, resumen de una o dos frases
  y metadatos confirmados como papel, año o tecnologías.
- La numeración `01`, `02`, `03` identifica proyectos concretos. Es una excepción
  funcional a la regla de evitar números decorativos y no se usa en encabezados
  de sección, imágenes o paginación falsa.
- Toda la fila funciona como enlace a `/projects/[slug]`, con nombre accesible,
  indicador de foco de al menos 2px y orden de tabulación equivalente al visual.
- La imagen de proyecto puede aparecer en hover o focus en desktop, pero el título
  y el resumen deben bastar para comprender y abrir el proyecto.
- En móvil, cada fila apila número, título, resumen y metadatos. Si se muestra una
  imagen, aparece dentro del flujo y no depende del hover.
- Por indicación de Bruno el 22/09/2026, los proyectos se ordenan siempre del
  más reciente al más antiguo: Baleària (2026), seguido de AEPD (2025).
  La numeración y la navegación entre casos siguen este mismo orden.
  Los nuevos proyectos se incorporarán con un case study completo y se situarán
  según su año.
- La Home no desarrolla proceso, arquitectura ni resultados extensos. Esa
  información pertenece exclusivamente a la página del case study.

### Perfil

- Retrato real en blanco y negro o con saturación reducida.
- La presentación personal vive en los dos párrafos del hero. Esta sección se
  centra en experiencia y formación seleccionadas sin repetir ese texto.
- No trasladar el CV completo a la Home.

### Capacidades

- Agrupadas por problemas que Bruno puede resolver.
- Sin barras de progreso, porcentajes subjetivos ni nubes de logos.
- Las tecnologías aparecen vinculadas a proyectos y decisiones reales.

### Contacto

- Una única intención: contactar.
- Correo, LinkedIn y GitHub.
- No publicar teléfono sin autorización explícita.

## Case studies

- Cada proyecto tiene una ruta independiente bajo `/projects/[slug]`.
- El encabezado incluye título, resumen, papel, periodo y tecnologías confirmadas.
- Cada proyecto funciona como un capítulo editorial.
- Alternar bloques de texto, imágenes, arquitectura y resultados.
- No repetir el patrón imagen izquierda y texto derecha más de dos veces seguidas.
- Las métricas deben tener fuente y contexto.
- Los diagramas técnicos usan la misma retícula y paleta, sin apariencia de
  dashboard independiente.
- Las capturas de producto se mostrarán como imágenes reales, no como interfaces
  falsas construidas con `div`.
- La página termina con navegación accesible al proyecto anterior y siguiente.
- Cada ruta debe definir metadata, título, descripción, Open Graph y URL canónica
  propios.

## Fotografía y recursos visuales

Prioridad:

1. Fotografías y capturas reales de los proyectos.
2. Retrato original en alta resolución.
3. Diagramas técnicos creados a partir de arquitectura verificable.
4. Imágenes generadas únicamente como material atmosférico claramente separado
   de la evidencia del proyecto.

Tratamiento:

- Blanco y negro o saturación contenida.
- Encuadres amplios, documentales y con espacio negativo.
- Retrato 5:4 en desktop y 4:5 en móvil; proyectos 16:10.
- No usar stock genérico, blobs, renders 3D gratuitos ni capturas falsas.

El retrato incrustado en el CV sirve como referencia, pero debe solicitarse el
archivo original antes de implementarlo en la web.

## Motion

Nivel 3: composición estática, con feedback discreto en enlaces y foco.

### Permitido

- Entrada inicial de titular, imagen y navegación mediante opacidad y traslación.
- Revelado escalonado breve del índice de proyectos.
- Cambio de imagen o recorte en hover de un proyecto.
- Transiciones de página discretas si aportan continuidad.
- Duraciones aproximadas de 180ms para feedback, 360ms para reveals y 600ms para
  transiciones narrativas puntuales.

### No permitido

- Scroll hijacking.
- Parallax continuo.
- Marquees decorativos.
- Cursores personalizados.
- Animaciones infinitas sin información.
- GSAP en la primera versión; CSS y Motion son suficientes.

Toda animación debe explicar jerarquía, feedback o continuidad. Debe existir una
versión estática equivalente bajo `prefers-reduced-motion`.

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
  sombras, radios decorativos ni cuadrículas añadidas. Las barras parten de cero.
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
- Paneles unidos sin separación entre tarjetas, sin sombras ni radios añadidos;
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

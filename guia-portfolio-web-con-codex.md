# Guía para crear un portfolio web con Codex

> Resumen consolidado de la conversación sobre objetivos, skills, instalación, uso, configuración de `AGENTS.md`, flujo de trabajo y stack tecnológico.

**Fecha de consolidación:** 21 de septiembre de 2026  
**Enfoque:** portfolio editorial, tecnológico y creativo construido mediante vibecoding con Codex.

---

## 1. Resumen ejecutivo

La propuesta consiste en crear un portfolio personal que no se perciba como una plantilla genérica de desarrollador. El sitio debe comunicar la capacidad de combinar **negocio, datos, inteligencia artificial, tecnología y sensibilidad visual** mediante una experiencia editorial, rápida y accesible.

La recomendación central es mantener tanto el stack como el conjunto de skills deliberadamente contenidos:

- **Stack base:** Next.js 16, React, TypeScript, Tailwind CSS, Motion, MDX, GitHub y Vercel.
- **Skills principales:** `design-taste-frontend`, `ui-ux-pro-max`, `frontend-design`, `vercel-react-best-practices`, `web-design-guidelines` e `impeccable`.
- **Skill estructural recomendada:** `vercel-composition-patterns`.
- **Skill opcional:** `high-end-visual-design`, reservada para piezas concretas con una dirección más experimental.
- **Método:** definir primero el brief, la dirección creativa y el sistema visual; construir después por secciones; auditar y pulir al final.

La calidad final dependerá más de asignar una función clara a cada skill, trabajar en ciclos pequeños y verificar cada cambio que de instalar muchas herramientas.

---

## 2. Objetivos del portfolio

### 2.1. Objetivo principal

Presentar a Bruno como un perfil híbrido capaz de conectar:

- negocio y estrategia;
- datos e inteligencia artificial;
- ingeniería y arquitectura tecnológica;
- diseño, creatividad y comunicación visual.

### 2.2. Posicionamiento deseado

La dirección propuesta es la de un **portfolio editorial digital** con:

- tipografía protagonista;
- retícula clara y composiciones asimétricas;
- bastante espacio en blanco;
- proyectos tratados como case studies, no como simples tarjetas;
- motion sutil y con intención;
- detalles técnicos visibles, pero sin estética de dashboard o SaaS;
- una identidad propia que evite la apariencia de “web generada por IA”.

Una posible síntesis de posicionamiento sería:

```text
BRUNO ESTEVE
Business × Data × Technology
Creative Technologist
```

### 2.3. Objetivos funcionales

El sitio debe:

1. explicar con rapidez quién es Bruno y qué aporta;
2. mostrar una selección reducida de proyectos relevantes;
3. permitir profundizar en cada proyecto mediante case studies;
4. funcionar correctamente en móvil, tablet y escritorio;
5. ser rápido, accesible y fácil de mantener;
6. posicionarse bien en buscadores y compartirse correctamente en redes;
7. poder evolucionar sin incorporar complejidad prematura.

### 2.4. Proyectos como piezas editoriales

Los proyectos pueden organizarse como capítulos:

```text
01 — BALEÀRIA
Fuel Optimization
Machine Learning · Cloud Architecture · Optimization

02 — AEPD
Business Intelligence
Power BI · Data Engineering · Analytics

03 — AUTONOMOUS ROBOT
Computer Vision · ROS2

04 — MIRAARRIBA_FILMS
Visual Experiments · Drone · Film · Design
```

Cada case study debería explicar, como mínimo: contexto, problema, papel desempeñado, proceso, decisiones, sistema o arquitectura, resultado, aprendizajes y material visual.

---

## 3. Combinación recomendada de skills

No conviene instalar 15 o 20 skills con responsabilidades solapadas. El núcleo recomendado asigna una función específica a cada una.

| Prioridad | Skill | Responsabilidad |
|---|---|---|
| Esencial | `design-taste-frontend` | Dirección artística, composición y prevención de estética genérica |
| Esencial | `ui-ux-pro-max` | Sistema UX/UI, tipografía, layout, responsive y accesibilidad |
| Esencial | `frontend-design` | Traducción de la dirección visual a frontend real |
| Esencial | `vercel-react-best-practices` | Calidad, rendimiento y buenas prácticas de React/Next.js |
| Esencial | `web-design-guidelines` | Auditoría de interacción, accesibilidad y calidad web |
| Esencial | `impeccable` | Crítica y refinamiento del último 10–20 % |
| Recomendada | `vercel-composition-patterns` | Arquitectura y composición mantenible de componentes React |
| Opcional | `high-end-visual-design` | Exploración visual premium o experimental en zonas concretas |

### 3.1. Función de cada skill

#### `design-taste-frontend`

Se usa para decidir **qué lenguaje visual construir**. Debe intervenir al definir la dirección creativa y antes de implementar secciones de gran impacto, como Hero o Selected Work.

Responsabilidades:

- tono visual;
- densidad y ritmo;
- jerarquía;
- composición;
- nivel de experimentación;
- uso de referencias;
- prevención de patrones visuales genéricos.

#### `ui-ux-pro-max`

Convierte la dirección creativa en un sistema coherente y utilizable.

Responsabilidades:

- escala tipográfica;
- espaciado;
- paleta;
- retícula;
- responsive;
- estados interactivos;
- accesibilidad;
- consistencia del sistema de diseño.

#### `frontend-design`

Materializa el diseño en componentes, estilos y comportamientos reales.

Responsabilidades:

- implementación visual;
- responsive real;
- estructura de componentes;
- tokens;
- imágenes;
- transiciones y microinteracciones;
- estabilidad de layout.

#### `vercel-react-best-practices`

Actúa como contrapeso técnico para que la ambición visual no produzca una web pesada o frágil.

Responsabilidades:

- Server y Client Components;
- tamaño de bundle;
- hidratación;
- renders innecesarios;
- carga de datos;
- rendimiento de React y Next.js;
- uso eficiente de imágenes, fuentes y JavaScript.

#### `vercel-composition-patterns`

Mantiene los componentes pequeños, componibles y comprensibles. Resulta útil para evitar una `HomePage.tsx` monolítica y separar elementos como `Hero`, `ProjectIndex`, `ProjectPreview`, `MediaFrame` o `SectionHeader`.

#### `web-design-guidelines`

Es una herramienta de auditoría, no la responsable de fijar la dirección artística. Se utiliza al terminar una sección o una página para detectar problemas de UX, accesibilidad, interacción, jerarquía y comportamiento web.

#### `impeccable`

Debe entrar cuando la estructura y el lenguaje visual ya están asentados. Sirve para criticar y pulir tipografía, layout, color, motion, densidad y pequeños detalles. No conviene utilizarla para rediseñar continuamente una web todavía inestable.

#### `high-end-visual-design`

Es opcional y más dogmática. Se puede emplear en una pieza concreta —por ejemplo el Hero, una transición o una composición editorial— pero no debería controlar todo el proyecto sin una decisión explícita.

### 3.2. Arquitectura mental

```text
Brief del portfolio
        ↓
design-taste-frontend
Dirección artística
        ↓
ui-ux-pro-max
UX + sistema de diseño
        ↓
frontend-design
Implementación visual
        ↓
composition-patterns + react-best-practices
Arquitectura + rendimiento
        ↓
web-design-guidelines
Auditoría
        ↓
impeccable
Refinamiento final
```

---

## 4. Instalación recomendada

### 4.1. Crear el proyecto

```bash
mkdir portfolio-bruno
cd portfolio-bruno
git init
npx create-next-app@latest .
```

Opciones recomendadas durante la creación:

```text
TypeScript       → Sí
ESLint           → Sí
Tailwind CSS     → Sí
src/ directory   → Sí
App Router       → Sí
Turbopack        → Sí
```

Después, abrir la raíz del repositorio en Codex.

### 4.2. Instalar las skills en el proyecto

Las skills específicas de este portfolio deben quedar vinculadas al repositorio. Codex detecta skills locales bajo `.agents/skills` desde el directorio de trabajo hasta la raíz del repositorio. Esto permite versionarlas con el proyecto y evita contaminar otros trabajos con reglas visuales que no les corresponden.

La conversación propuso utilizar el CLI `skills` para instalar skills de terceros y seleccionar Codex como agente:

```bash
npx skills add leonxlnx/taste-skill --skill design-taste-frontend -a codex
npx skills add anthropics/skills --skill frontend-design -a codex
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices --skill vercel-composition-patterns --skill web-design-guidelines -a codex
npx skills add pbakaus/impeccable -a codex
```

Para `ui-ux-pro-max`, se recomendó su instalador específico:

```bash
npm install -g uipro-cli
uipro init --ai codex
```

Skill opcional:

```bash
npx skills add leonxlnx/taste-skill --skill high-end-visual-design -a codex
```

> **Nota de mantenimiento:** son proyectos de terceros y sus instaladores pueden cambiar. Antes de ejecutar los comandos en un proyecto nuevo, conviene revisar el README actual del repositorio. Tras la instalación, comprobar que Codex detecta los `SKILL.md`; si no aparecen, reiniciar Codex.

### 4.3. Instalar las dependencias iniciales de la web

Mantener la base pequeña:

```bash
npm install motion lucide-react
```

No instalar GSAP, Lenis, Three.js, React Three Fiber, un CMS o una base de datos hasta que exista una necesidad concreta.

### 4.4. Estructura esperada

La estructura exacta puede variar según los instaladores, pero una organización razonable sería:

```text
portfolio-bruno/
├── .agents/
│   └── skills/
├── public/
│   ├── images/
│   └── projects/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── primitives/
│   │   ├── layout/
│   │   ├── motion/
│   │   └── projects/
│   ├── sections/
│   │   ├── hero/
│   │   ├── selected-work/
│   │   ├── about/
│   │   ├── capabilities/
│   │   └── contact/
│   ├── data/
│   │   └── projects.ts
│   ├── lib/
│   └── styles/
├── content/
│   └── projects/
├── AGENTS.md
├── package.json
└── README.md
```

### 4.5. Verificar la instalación

Comprobaciones recomendadas:

1. revisar que las skills contienen un archivo `SKILL.md`;
2. reiniciar Codex si una skill recién instalada no aparece;
3. pedir a Codex: “Enumera las skills disponibles para este repositorio y resume cuándo usarías cada una”;
4. pedir: “Resume las instrucciones activas de `AGENTS.md` para este proyecto”;
5. confirmar que los comandos `npm run dev`, `npm run lint` y `npm run build` funcionan.

---

## 5. Cómo usar correctamente las skills

### 5.1. No activar todas a la vez

Cada skill debe entrar en la fase donde aporta valor:

| Fase | Skills |
|---|---|
| Dirección creativa | `design-taste-frontend`, `ui-ux-pro-max` |
| Sistema de diseño | `ui-ux-pro-max`, `frontend-design` |
| Arquitectura | `vercel-composition-patterns`, `vercel-react-best-practices` |
| Implementación | `frontend-design`, `vercel-react-best-practices` |
| Revisión por sección | `web-design-guidelines` |
| Refinamiento final | `impeccable` |
| Experimento puntual | `high-end-visual-design` |

### 5.2. Ser explícito al principio

Durante las primeras iteraciones es útil indicar las skills y el orden de trabajo:

```text
Antes de escribir código, usa design-taste-frontend para proponer la
composición y ui-ux-pro-max para convertirla en reglas de sistema.

Después implementa con frontend-design y verifica la solución con
vercel-react-best-practices. No modifiques otras secciones.
```

Cuando el `AGENTS.md`, los tokens y los patrones ya estén asentados, las peticiones pueden ser más naturales:

```text
La sección Selected Work se siente demasiado convencional.
Haz la composición más editorial, conserva el sistema de diseño existente
y no empeores el rendimiento ni la accesibilidad.
```

### 5.3. Pedir razonamiento y entregables intermedios

Antes de implementar, solicitar resultados verificables:

- brief resumido;
- tres rutas creativas con diferencias claras;
- selección razonada de una dirección;
- tokens de color, tipografía, espaciado y motion;
- inventario de componentes;
- mapa de páginas;
- criterios de aceptación para la sección;
- plan de implementación limitado al alcance pedido.

### 5.4. Trabajar por secciones

No pedir toda la Home en una sola instrucción. Secuencia sugerida:

1. fundamentos globales y tipografía;
2. navegación;
3. Hero;
4. Selected Work;
5. About;
6. Capabilities;
7. Contact y footer;
8. plantilla de case study;
9. páginas de proyecto;
10. motion y transiciones;
11. auditoría completa;
12. optimización y despliegue.

### 5.5. Separar crítica de ejecución

Para evitar rediseños imprevistos:

```text
Critica la Home actual con impeccable.
No modifiques archivos todavía.

Identifica problemas de:
- tipografía;
- jerarquía;
- composición;
- espaciado;
- decoración innecesaria;
- interacción;
- motion;
- accesibilidad.

Ordena las recomendaciones por impacto y espera aprobación.
```

Tras aprobar los cambios:

```text
Aplica únicamente las recomendaciones aprobadas.
Conserva la dirección visual y no introduzcas un nuevo lenguaje de diseño.
Ejecuta lint y build al terminar.
```

---

## 6. Propuesta de `AGENTS.md`

El archivo debe vivir en la raíz del repositorio. Codex lo lee antes de trabajar y las instrucciones más cercanas al directorio activo prevalecen sobre las generales. Conviene que sea concreto, breve y comprobable.

```md
# AGENTS.md

## Project

This repository contains Bruno Esteve's personal portfolio.

The portfolio should communicate the intersection of business, data,
AI, technology, design, and creativity. Its visual direction is editorial,
precise, contemporary, and distinctive. Avoid generic developer-portfolio,
SaaS-dashboard, and AI-template aesthetics.

## Product goals

- Explain Bruno's positioning quickly and clearly.
- Present selected work as editorial case studies.
- Prioritize typography, composition, imagery, and clear narrative.
- Keep the experience fast, accessible, responsive, and easy to maintain.
- Use motion only when it improves hierarchy, feedback, or storytelling.

## Technical stack

- Next.js App Router
- React
- TypeScript with strict typing
- Tailwind CSS
- Motion for React
- MDX for long-form case studies when needed
- next/image and next/font
- npm as package manager

Do not add production dependencies without explaining the need.
Do not add GSAP, Lenis, Three.js, React Three Fiber, a CMS, or a database
unless the requested feature clearly requires it and the trade-off is approved.

## Skill routing

- Use `design-taste-frontend` for creative direction, high-impact composition,
  and avoiding generic visual patterns.
- Use `ui-ux-pro-max` for the design system, typography, layout, responsive
  behavior, interaction rules, and accessibility.
- Use `frontend-design` to implement approved visual direction in production UI.
- Use `vercel-composition-patterns` when defining or refactoring component APIs.
- Use `vercel-react-best-practices` for React/Next.js architecture and performance.
- Use `web-design-guidelines` after completing a section or page.
- Use `impeccable` only for critique and late-stage refinement; do not let it
  redesign the established visual language without explicit approval.
- Use `high-end-visual-design` only when explicitly requested for a contained,
  experimental part of the site.

Do not invoke every design skill for every task. Use the smallest relevant set.

## Design principles

- Prefer a strong editorial grid over collections of cards.
- Prefer typographic hierarchy and spacing over decorative effects.
- Build custom, small primitives instead of defaulting to SaaS component kits.
- Avoid excessive gradients, rounded cards, large shadows, glassmorphism,
  gratuitous 3D, and animation without narrative purpose.
- Functional icons should be scarce and consistent.
- Preserve the approved color, type, spacing, radius, and motion tokens.
- Respect `prefers-reduced-motion`.

## Architecture

- Keep Server Components by default.
- Add `"use client"` only where interaction or browser APIs require it.
- Keep content/data separate from presentation.
- Prefer composition over large components with many boolean props.
- Keep page sections isolated and avoid unrelated edits.
- Reuse established primitives before creating new variants.
- Do not use `any` unless the reason is documented.

## Content and assets

- Keep project summaries in typed data.
- Use MDX for long-form case studies when component-rich editorial content is useful.
- Use `next/image` for portfolio imagery and provide meaningful alt text.
- Prefer optimized AVIF or WebP assets; do not commit unnecessarily large images.
- Use `next/font` for web fonts.

## Workflow

1. Inspect the relevant files and existing visual system.
2. Restate the requested scope and constraints.
3. For ambiguous visual work, propose a short direction before coding.
4. Implement only the requested section or behavior.
5. Check responsive behavior and interaction states.
6. Run the relevant validation commands.
7. Review the diff for regressions and unrelated changes.
8. Summarize what changed, what was verified, and any remaining risk.

## Validation

After relevant code changes, run:

- `npm run lint`
- `npm run build`

Also check:

- keyboard navigation;
- visible focus states;
- semantic heading order;
- color contrast;
- alt text;
- responsive layout at small and large widths;
- reduced-motion behavior;
- image sizing and layout stability.

## Definition of done

A task is complete only when:

- the requested behavior is implemented;
- the result follows the established design system;
- lint and build pass, or failures are explained;
- accessibility and responsive behavior have been checked;
- no unrelated files were changed;
- the final response lists the change and verification performed.
```

### Cómo mantener este archivo

- Añadir reglas cuando aparezca un error repetido, no por anticipación.
- Evitar párrafos vagos como “haz un diseño excelente”.
- Indicar comandos y criterios de finalización concretos.
- Crear un `AGENTS.md` más específico en una subcarpeta solo si esa parte del proyecto necesita reglas distintas.
- Reiniciar la sesión de Codex si las instrucciones parecen desactualizadas.

---

## 7. Workflow completo de trabajo

### Fase 1 — Preparación

1. Crear el repositorio y la aplicación Next.js.
2. Instalar las skills a nivel de proyecto.
3. Añadir y revisar `AGENTS.md`.
4. Verificar que Codex reconoce las skills y las instrucciones.
5. Establecer Git y una rama de trabajo.

### Fase 2 — Dirección creativa

1. Redactar el brief.
2. Reunir contenido real y referencias visuales.
3. Proponer tres direcciones creativas diferentes.
4. Elegir una y documentar sus reglas.
5. Definir qué debe evitarse visualmente.

Skills principales: `design-taste-frontend` + `ui-ux-pro-max`.

### Fase 3 — Sistema de diseño

Definir antes de construir páginas:

- fuentes y escala tipográfica;
- paleta y contraste;
- retícula, contenedor y breakpoints;
- escala de espaciado;
- enlaces, botones y estados de foco;
- tratamiento de imágenes;
- reglas de motion;
- primitives editoriales.

Skills principales: `ui-ux-pro-max` + `frontend-design`.

### Fase 4 — Arquitectura técnica

1. Definir rutas y plantilla de proyecto.
2. Crear tipos para los datos.
3. Separar contenido y presentación.
4. Diseñar una API de componentes pequeña.
5. Mantener Server Components por defecto.

Skills principales: `vercel-composition-patterns` + `vercel-react-best-practices`.

### Fase 5 — Implementación incremental

Para cada sección:

```text
Proponer composición
        ↓
Confirmar alcance
        ↓
Implementar
        ↓
Revisar responsive y accesibilidad
        ↓
Auditar con web-design-guidelines
        ↓
Corregir
        ↓
Commit pequeño
```

### Fase 6 — Auditoría y refinamiento

Cuando el sitio esté aproximadamente al 80–90 %:

1. auditoría global de accesibilidad y UX;
2. crítica visual con `impeccable`;
3. aprobación de los cambios propuestos;
4. pasada de tipografía y layout;
5. pasada de motion y microinteracciones;
6. auditoría de rendimiento;
7. revisión responsive final.

### Fase 7 — Despliegue

```text
Local
  ↓
GitHub
  ↓
Preview de Vercel
  ↓
Revisión visual y funcional
  ↓
Producción + dominio
```

Usar las previews de cada pull request para comprobar el diseño en dispositivos y tamaños reales antes de publicar.

---

## 8. Stack tecnológico recomendado

| Capa | Tecnología | Justificación |
|---|---|---|
| Framework | Next.js 16 / versión estable compatible | Routing, SEO, metadata, imágenes, fuentes y despliegue |
| UI | React | Ecosistema maduro y excelente compatibilidad con Codex |
| Lenguaje | TypeScript | Red de seguridad para iteraciones rápidas y modelos de contenido |
| Estilos | Tailwind CSS | Iteración visual precisa y rápida sin ocultar el CSS |
| Motion | Motion for React | Animaciones declarativas, scroll, gestures y layout |
| Motion avanzado | GSAP, solo si se justifica | Timelines complejas, pinning o storytelling sincronizado |
| Iconos | Lucide React | Iconos funcionales consistentes y controlables |
| Contenido | TypeScript + MDX | Datos estructurados y case studies editoriales sin CMS |
| Imágenes | `next/image`, AVIF/WebP | Optimización, tamaños responsivos y estabilidad visual |
| Fuentes | `next/font` | Carga optimizada y menor dependencia externa |
| Versionado | Git + GitHub | Historial recuperable, revisión y colaboración |
| Hosting | Vercel | Integración natural con Next.js y previews por pull request |

### 8.1. Por qué Next.js

El portfolio es una web pública donde importan SEO, metadata, Open Graph, optimización de imágenes, fuentes, rutas y despliegue. App Router permite servir la mayor parte como Server Components y reservar JavaScript cliente para interacción y motion.

La proporción objetivo es aproximadamente:

```text
90 % contenido y layout
10 % interacción y animación
```

### 8.2. Por qué TypeScript

El vibecoding acelera la escritura, pero aumenta la necesidad de contratos verificables. Un tipo compartido evita inconsistencias:

```ts
export type Project = {
  slug: string
  title: string
  year: number
  category: string
  description: string
  technologies: string[]
  cover: string
}
```

### 8.3. Por qué Tailwind CSS

Permite iterar rápidamente sobre tipografía, espaciado, retícula y breakpoints. Debe usarse como un lenguaje CSS, no como una invitación a repetir `rounded-xl`, sombras, gradientes y patrones de dashboard.

### 8.4. Por qué Motion

Es suficiente para la mayor parte de:

- entradas de contenido;
- hover de proyectos;
- navegación;
- transiciones;
- scroll progress;
- stagger de texto;
- layout animations;
- microinteracciones.

Para efectos simples, preferir CSS. GSAP solo entra si aparece una escena compleja que no se resuelve con claridad mediante CSS y Motion.

### 8.5. Contenido sin CMS al principio

Recomendación:

- Home y listados: datos tipados en `src/data/projects.ts`;
- case studies largos: MDX en `content/projects/`.

No hace falta una base de datos ni un CMS para contenido que cambia ocasionalmente. Esto reduce dependencias, fallos y mantenimiento.

### 8.6. Componentes propios, no estética SaaS

No usar `shadcn/ui` como fundamento visual del portfolio. Es preferible construir primitives pequeñas y específicas:

```text
Container
Section
Eyebrow
Headline
EditorialGrid
ProjectIndex
ProjectPreview
MediaFrame
TextLink
Navigation
```

### 8.7. Tecnologías que no se instalarían inicialmente

| Tecnología | Cuándo tendría sentido |
|---|---|
| GSAP | Timelines complejas o scroll storytelling avanzado |
| Lenis | Si el smooth scroll mejora de verdad la experiencia |
| Three.js / R3F | Si existe una idea narrativa 3D vinculada al contenido |
| CMS | Si el contenido empieza a editarse con frecuencia o por terceros |
| Base de datos | Si aparecen datos dinámicos, usuarios o funcionalidad persistente |
| shadcn/ui | Para áreas funcionales concretas, no como identidad visual base |

La regla es sencilla: **añadir una dependencia cuando resuelve un problema real, no para anticipar uno hipotético**.

---

## 9. Arquitectura sugerida

```text
PORTFOLIO
├── Next.js App Router
│   ├── Home
│   ├── Work
│   ├── About
│   ├── Contact
│   └── Projects
│       └── [slug]
├── React + TypeScript
├── Design system
│   ├── tokens
│   ├── primitives
│   ├── editorial layouts
│   └── motion rules
├── Content
│   ├── typed project data
│   └── MDX case studies
├── Tailwind CSS
├── Motion
├── next/image + next/font
└── GitHub → Vercel
```

---

## 10. Prompts de trabajo recomendados

### Fundamentos

```text
Implementa únicamente los fundamentos globales de layout y tipografía.

Usa ui-ux-pro-max, frontend-design y vercel-react-best-practices.
Define tokens reutilizables y conserva Server Components por defecto.
No implementes todavía las secciones del portfolio.

Al terminar, ejecuta lint y build y resume las decisiones tomadas.
```

### Hero

```text
Implementa únicamente la sección Hero.

Antes de programar, usa design-taste-frontend para proponer una composición
editorial alineada con el brief. Después implementa la dirección aprobada
con frontend-design y el sistema existente.

Audita el resultado con web-design-guidelines. No modifiques otras secciones.
```

### Revisión de una sección

```text
Revisa Selected Work con web-design-guidelines y
vercel-react-best-practices.

Evalúa accesibilidad, semántica, responsive, interacción, tamaño de imágenes,
JavaScript cliente y estabilidad de layout. Corrige solo problemas objetivos;
no cambies la dirección visual.
```

### Pulido final

```text
Usa impeccable para criticar la Home terminada.
No hagas cambios todavía.

Ordena los problemas por impacto y céntrate en tipografía, jerarquía,
espaciado, composición, consistencia, motion y pequeños detalles.
No propongas un rediseño completo.
```

---

## 11. Git, revisión y seguridad del proceso

Trabajar con commits pequeños y descriptivos:

```text
feat: implement editorial hero
feat: add selected work index
style: refine typography scale
motion: add project hover interactions
perf: optimize project imagery
refactor: extract editorial grid
```

Buenas prácticas:

- revisar el diff después de cada tarea;
- no mezclar varias secciones en un mismo cambio;
- pedir explicación antes de añadir dependencias;
- mantener una rama estable;
- usar previews de Vercel;
- comprobar móvil y escritorio antes de fusionar;
- conservar siempre una ruta clara para revertir.

---

## 12. Checklist final

### Diseño

- [ ] La web tiene una dirección editorial reconocible.
- [ ] No parece una plantilla SaaS o un portfolio genérico.
- [ ] La jerarquía tipográfica funciona en todos los tamaños.
- [ ] La retícula y el espaciado son consistentes.
- [ ] Los proyectos se entienden como historias, no solo como miniaturas.

### UX y accesibilidad

- [ ] Navegación completa con teclado.
- [ ] Estados de foco visibles.
- [ ] Orden semántico de headings.
- [ ] Contraste suficiente.
- [ ] Textos alternativos útiles.
- [ ] Motion reducido cuando el sistema lo solicita.
- [ ] Enlaces y controles tienen nombres comprensibles.

### Rendimiento

- [ ] Imágenes optimizadas en AVIF o WebP.
- [ ] `next/image` y tamaños correctos.
- [ ] Fuentes cargadas mediante `next/font`.
- [ ] Client Components limitados a lo necesario.
- [ ] No hay librerías pesadas sin justificación.
- [ ] No aparecen saltos de layout evitables.

### Ingeniería

- [ ] TypeScript sin errores.
- [ ] Lint correcto.
- [ ] Build de producción correcto.
- [ ] Componentes pequeños y componibles.
- [ ] Contenido separado de la presentación.
- [ ] No hay cambios ajenos al alcance de la tarea.

### Publicación

- [ ] Metadata y Open Graph configurados.
- [ ] Favicon e iconos definidos.
- [ ] URLs y slugs definitivos.
- [ ] 404 y estados vacíos revisados.
- [ ] Preview de Vercel validada.
- [ ] Dominio, analytics y privacidad revisados si se añaden.

---

## 13. Decisión final recomendada

La combinación concreta sería:

```text
Next.js + React + TypeScript + Tailwind CSS
+ Motion + MDX + GitHub + Vercel
```

Con este núcleo de skills:

```text
design-taste-frontend
ui-ux-pro-max
frontend-design
vercel-react-best-practices
vercel-composition-patterns
web-design-guidelines
impeccable
```

Y `high-end-visual-design` solo para experimentos contenidos.

El orden de trabajo recomendado es:

```text
Instalar skills
→ configurar AGENTS.md
→ definir brief y dirección creativa
→ crear sistema de diseño
→ fijar arquitectura
→ implementar por secciones
→ auditar cada sección
→ pulir al final
→ optimizar
→ desplegar
```

El principio rector es mantener una dirección visual ambiciosa con una arquitectura técnica sencilla. El portfolio debe sentirse distintivo por sus decisiones de contenido, tipografía, composición y narrativa; no por acumular librerías o efectos.

---

## 14. Referencias

### Documentación oficial de Codex

- [Crear skills](https://learn.chatgpt.com/docs/build-skills)
- [Instrucciones personalizadas con AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Buenas prácticas de Codex](https://learn.chatgpt.com/guides/best-practices)

### Repositorios mencionados en la conversación

- [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill)
- [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- [anthropics/skills](https://github.com/anthropics/skills)
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)
- [pbakaus/impeccable](https://github.com/pbakaus/impeccable)


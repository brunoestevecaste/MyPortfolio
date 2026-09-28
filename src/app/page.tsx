import { GlitchPortrait } from "@/components/ui/glitch-portrait";
import { EducationSection } from "@/components/sections/education";
import { ExperienceSection } from "@/components/sections/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectIndex } from "@/components/projects/project-index";
import { IntroSequence } from "@/components/intro/intro-sequence";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <IntroSequence />
      <main className="flex-1" id="main-content" tabIndex={-1}>
      <section
        aria-labelledby="foundation-title"
        className={`site-container ${styles.hero}`}
      >
        <h1 className={`display-text ${styles.heroTitle}`} id="foundation-title">
          Soy un analista de datos e ingeniero de IA creando soluciones digitales.
        </h1>

        <div className={styles.heroComposition}>
          <div className={styles.portrait}>
            <GlitchPortrait
              src="/hero/bruno-esteve-hero-umbral-editorial.webp"
              alt="Retrato editorial de Bruno Esteve con trama de impresión monocroma"
              priority
              sizes="(min-width: 64rem) 46vw, (min-width: 48rem) 50vw, 100vw"
            />
          </div>

          <p className={styles.introduction}>
            En nuestro día a día dejamos pequeñas huellas sin darnos cuenta:
            rutinas, elecciones y costumbres que se repiten una y otra vez.
            Siempre he visto los datos como historias de cómo vivimos. Me
            fascina la tecnología por su capacidad para encontrar sentido en el
            ruido cotidiano y descubrir qué necesitamos realmente como personas.
          </p>

          <p className={styles.approach}>
            Uno los datos y la IA para crear soluciones útiles desde el primer
            momento. La creatividad está en mirar la información desde otra
            perspectiva e idear respuestas originales a necesidades reales. Me
            mueve convertir patrones cotidianos en herramientas intuitivas que
            resuelvan dudas, ahorren tiempo y acerquen la tecnología a las
            personas.
          </p>
        </div>
      </section>

      <EducationSection />
      <ExperienceSection />

      <section
        className={`site-container ${styles.work}`}
        id="work"
        aria-labelledby="work-title"
      >
        <div className={styles.workIntroduction}>
          <SectionHeading className="heading-text" id="work-title" title="Proyectos" />
        </div>
        <ProjectIndex />
      </section>
    </main>
    </>
  );
}

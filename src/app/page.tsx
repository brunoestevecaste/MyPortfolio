import { GlitchPortrait } from "@/components/ui/glitch-portrait";
import { EducationSection } from "@/components/sections/education";
import { ExperienceSection } from "@/components/sections/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectIndex } from "@/components/projects/project-index";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className="flex-1" id="main-content" tabIndex={-1}>
      <section
        aria-labelledby="foundation-title"
        className={`site-container ${styles.hero}`}
      >
        <h1 className={`display-text ${styles.heroTitle}`} id="foundation-title">
          <span>Diseño sistemas</span>{" "}
          <span>de datos e IA para</span>{" "}
          <span>decisiones reales.</span>
        </h1>

        <div className={styles.heroComposition}>
          <div className={styles.portrait}>
            <GlitchPortrait
              src="/hero/bruno-esteve-hero.webp"
              alt="Retrato editorial de Bruno Esteve en estilo risograph dither monocromo"
              priority
              sizes="(min-width: 64rem) 42vw, (min-width: 48rem) 50vw, 100vw"
            />
          </div>

          <p className={styles.introduction}>
            Soy Data Analyst y AI Engineer. Trabajo entre negocio, analítica e
            inteligencia artificial para convertir problemas complejos en
            soluciones claras.
          </p>

          <p className={styles.approach}>
            Construyo dashboards, modelos predictivos y sistemas de datos
            pensados para apoyar decisiones, mejorar procesos y generar valor
            real.
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

      <section
        className={`site-container ${styles.about}`}
        id="about"
        aria-labelledby="about-title"
      >
        <div className={styles.profileIntroduction}>
          <SectionHeading className="heading-text" id="about-title" title="Datos, IA y negocio" />
          <p className={styles.sectionCopy}>
            Un perfil híbrido centrado en convertir complejidad técnica en
            decisiones comprensibles y útiles.
          </p>
        </div>
      </section>
    </main>
  );
}

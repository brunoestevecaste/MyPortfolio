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
          <figure className={styles.portrait}>
            <div className={styles.portraitSurface} aria-hidden="true" />
            <figcaption className={styles.portraitCaption}>
              Retrato de Bruno · Fotografía pendiente
            </figcaption>
          </figure>

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

      <section
        className={`site-container ${styles.work}`}
        id="work"
        aria-labelledby="work-title"
      >
        <div className={styles.workIntroduction}>
          <h2 className="heading-text" id="work-title">
            Proyectos seleccionados
          </h2>
          <p className={styles.sectionCopy}>
            Una selección de proyectos donde el análisis, la arquitectura y el
            resultado se explican con contexto.
          </p>
        </div>
      </section>

      <section
        className={`site-container ${styles.about}`}
        id="about"
        aria-labelledby="about-title"
      >
        <div className={styles.profileIntroduction}>
          <h2 className="heading-text" id="about-title">
            Datos, IA y negocio
          </h2>
          <p className={styles.sectionCopy}>
            Un perfil híbrido centrado en convertir complejidad técnica en
            decisiones comprensibles y útiles.
          </p>
        </div>
      </section>
    </main>
  );
}

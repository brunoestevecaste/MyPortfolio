import { GlitchPortrait } from "@/components/ui/glitch-portrait";
import { ContactSection } from "@/components/sections/contact";
import { EducationSection } from "@/components/sections/education";
import { ExperienceSection } from "@/components/sections/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectIndex } from "@/components/projects/project-index";
import { IntroSequence } from "@/components/intro/intro-sequence";
import { profile } from "@/data/profile";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <IntroSequence />
      <noscript><style>{"[data-intro-active] { display: none; }"}</style></noscript>
      <main className="flex-1" id="main-content" tabIndex={-1} data-motion-page>
      <section
        aria-labelledby="foundation-title"
        className={`site-container ${styles.hero}`}
      >
        <h1 className={`display-text ${styles.heroTitle}`} id="foundation-title" data-motion="scramble">
          {profile.headline.split(/(analista de datos|ingeniero de IA)/).map((part, index) =>
            index % 2 === 1 ? <em key={part}>{part}</em> : part,
          )}
        </h1>

        <div className={styles.heroComposition}>
          <div className={styles.portrait}>
            <GlitchPortrait
              src="/hero/bruno-esteve-hero-monocromo-editorial.webp"
              alt="Retrato editorial de Bruno Esteve en blanco y negro, con grano fino y sin fondo"
              priority
              sizes="(min-width: 64rem) 46vw, (min-width: 48rem) 50vw, 100vw"
            />
          </div>

          <p data-motion="mask" className={styles.introduction}>
            {profile.introduction}
          </p>

          <p data-motion="mask" className={styles.approach}>
            {profile.approach}
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
      <ContactSection />
    </main>
    </>
  );
}

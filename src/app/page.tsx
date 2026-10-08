import { HomeHero } from "@/components/sections/home-hero";
import { ContactSection } from "@/components/sections/contact";
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
      <noscript><style>{"[data-intro-active] { display: none; }"}</style></noscript>
      <main className="flex-1" id="main-content" tabIndex={-1} data-motion-page>
      <HomeHero />

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

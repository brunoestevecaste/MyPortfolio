import type { ReactNode } from "react";
import { GlitchPortrait } from "@/components/ui/glitch-portrait";
import { profile } from "@/data/profile";
import styles from "@/app/page.module.css";

export function HomeHero({ portrait }: { portrait?: ReactNode }) {
  return (
    <section aria-labelledby="foundation-title" className={`site-container ${styles.hero}`}>
      <h1 className={`display-text ${styles.heroTitle}`} id="foundation-title" data-motion="scramble">
        {profile.headline.split(/(analista de datos|ingeniero de IA)/).map((part, index) =>
          index % 2 === 1 ? <em key={part}>{part}</em> : part,
        )}
      </h1>
      <div className={styles.heroComposition}>
        <div className={styles.portrait} data-hero-portrait>
          {portrait ?? <GlitchPortrait
            src="/hero/bruno-esteve-hero-monocromo-editorial.webp"
            alt="Retrato editorial de Bruno Esteve en blanco y negro, con grano fino y sin fondo"
            priority
            sizes="(min-width: 64rem) 46vw, (min-width: 48rem) 50vw, 100vw"
          />}
        </div>
        <p data-motion="mask" className={styles.introduction}>{profile.introduction}</p>
        <p data-motion="mask" className={styles.approach}>{profile.approach}</p>
      </div>
    </section>
  );
}

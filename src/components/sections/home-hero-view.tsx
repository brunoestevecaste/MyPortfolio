import type { ReactNode } from "react";
import { GlitchPortrait } from "@/components/ui/glitch-portrait";
import { profile } from "@/data/profile";
import styles from "@/app/page.module.css";

type HomeHeroViewProps = {
  portrait?: ReactNode;
  headline?: string;
  introduction?: string;
  approach?: string;
  portraitAlt?: string;
};

export function HomeHeroView({
  portrait,
  headline = profile.headline,
  introduction = profile.introduction,
  approach = profile.approach,
  portraitAlt = "Retrato editorial de Bruno Esteve en blanco y negro, con grano fino y sin fondo",
}: HomeHeroViewProps) {
  return (
    <section aria-labelledby="foundation-title" className={`site-container ${styles.hero}`}>
      <h1 key={headline} className={`display-text ${styles.heroTitle}`} id="foundation-title" data-motion="scramble">
        {headline.split(/(analista de datos|ingeniero de IA|data analyst|AI engineer)/i).map((part, index) =>
          index % 2 === 1 ? <em key={part}>{part}</em> : part,
        )}
      </h1>
      <div className={styles.heroComposition}>
        <div className={styles.portrait} data-hero-portrait>
          {portrait ?? <GlitchPortrait
            motion="echo"
            src="/hero/bruno-esteve-hero-monocromo-editorial.webp"
            alt={portraitAlt}
            priority
            sizes="(min-width: 64rem) 46vw, (min-width: 48rem) 50vw, 100vw"
          />}
        </div>
        <p data-motion="mask" className={styles.introduction}>{introduction}</p>
        <p data-motion="mask" className={styles.approach}>{approach}</p>
      </div>
    </section>
  );
}

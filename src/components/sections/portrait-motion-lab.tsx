"use client";

import { useState } from "react";
import Link from "next/link";
import { HomeHero } from "./home-hero";
import { GlitchPortrait } from "@/components/ui/glitch-portrait";
import { portraitProposals, type PortraitMotion, type PortraitPreview } from "@/data/portrait-motion";
import styles from "./portrait-motion-lab.module.css";

const modes: { id: PortraitPreview; label: string }[] = [
  { id: "auto", label: "Interactuar" },
  { id: "idle", label: "Reposo" },
  { id: "active", label: "Hover" },
];

export function PortraitMotionLab() {
  const [motion, setMotion] = useState<PortraitMotion>("dither");
  const [preview, setPreview] = useState<PortraitPreview>("auto");
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const proposal = portraitProposals.find((item) => item.id === motion)!;

  return (
    <main id="main-content" tabIndex={-1} className={styles.lab}>
      <aside className={`site-container ${styles.controls}`} aria-label="Comparador de animaciones del hero">
        <div className={styles.topline}>
          <p className={styles.title}>Propuestas para el retrato</p>
          <Link href="/" className={styles.back}>Volver al portfolio</Link>
        </div>
        <div className={styles.toolbar}>
          <div className={styles.proposals} role="group" aria-label="Propuesta de animación">
            {portraitProposals.map((item) => (
              <button type="button" key={item.id} aria-pressed={motion === item.id}
                onClick={() => { setMotion(item.id); setPreview("auto"); }}>
                {item.name}
              </button>
            ))}
          </div>
          <div className={styles.modes} role="group" aria-label="Estado del retrato">
            {modes.map((mode) => (
              <button type="button" key={mode.id} aria-pressed={preview === mode.id}
                onClick={() => setPreview(mode.id)}>{mode.label}</button>
            ))}
            <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
              {paused ? "Reanudar" : "Pausar"}
            </button>
            <button type="button" aria-pressed={expanded} onClick={() => setExpanded(!expanded)}>
              {expanded ? "Ver en el hero" : "Ampliar retrato"}
            </button>
          </div>
        </div>
        <button type="button" className={styles.notesToggle} aria-expanded={showNotes}
          aria-controls="portrait-motion-notes" onClick={() => setShowNotes(!showNotes)}>
          {showNotes ? "Ocultar descripción" : "Ver reposo y hover"}
        </button>
        <div id="portrait-motion-notes" className={styles.notes} data-open={showNotes} aria-live="polite" aria-atomic="true">
          <p><span>Reposo</span>{proposal.idle}</p>
          <p><span>Hover</span>{proposal.active}</p>
          <p><span>Salida</span>{proposal.exit}</p>
        </div>
        <p className={styles.hint}>
          <span className={styles.character}>{proposal.character} </span>
          En Interactuar, pasa el cursor por la silueta, toca el retrato o pulsa Intro/Espacio.
        </p>
        <p className={styles.reduced}>Tu dispositivo solicita movimiento reducido: el retrato se muestra estático.</p>
      </aside>
      <div className={styles.preview} data-view={expanded ? "portrait" : "context"}>
        <HomeHero portrait={<GlitchPortrait
          key={motion}
          motion={motion}
          preview={preview}
          playback={paused ? "paused" : "running"}
          src="/hero/bruno-esteve-hero-monocromo-editorial.webp"
          alt="Retrato editorial de Bruno Esteve en blanco y negro, con grano fino y sin fondo"
          sizes="(min-width: 64rem) 46vw, (min-width: 48rem) 50vw, 100vw"
        />} />
      </div>
    </main>
  );
}

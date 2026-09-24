"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./glitch-portrait.module.css";

export interface GlitchPortraitProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function GlitchPortrait({
  src,
  alt,
  priority = true,
  sizes = "(min-width: 64rem) 42vw, (min-width: 48rem) 50vw, 100vw",
  className = "",
}: GlitchPortraitProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerGlitch = useCallback(() => {
    if (isGlitching) return;

    setIsGlitching(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsGlitching(false);
      timeoutRef.current = null;
    }, 1500);
  }, [isGlitching]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`${styles.portraitSurface} ${className}`}
      onMouseEnter={triggerGlitch}
      onTouchStart={triggerGlitch}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerGlitch();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label="Retrato interactivo con animación glitch de Bruno Esteve"
      data-cursor-hover="true"
    >
      {/* Base Portrait Image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`${styles.portraitImage} ${isGlitching ? styles.baseGlitching : ""}`}
      />

      {/* Glitch Overlay Layers (Active only during the 1.5s glitch window) */}
      {isGlitching && (
        <>
          {/* Slice A: Primary horizontal block displacement */}
          <div className={`${styles.sliceLayer} ${styles.sliceA}`} aria-hidden="true">
            <Image
              src={src}
              alt=""
              fill
              sizes={sizes}
              className={styles.portraitImage}
            />
          </div>

          {/* Slice B: Inverted contrast counter-displacement */}
          <div className={`${styles.sliceLayer} ${styles.sliceB}`} aria-hidden="true">
            <Image
              src={src}
              alt=""
              fill
              sizes={sizes}
              className={styles.portraitImage}
            />
          </div>

          {/* Slice C: High-contrast micro-raster block */}
          <div className={`${styles.sliceLayer} ${styles.sliceC}`} aria-hidden="true">
            <Image
              src={src}
              alt=""
              fill
              sizes={sizes}
              className={styles.portraitImage}
            />
          </div>

          {/* Binary data bars inspired by refs/glitch_effect.gif */}
          <div className={styles.dataBars} aria-hidden="true" />
        </>
      )}
    </div>
  );
}

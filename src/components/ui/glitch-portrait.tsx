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
  const isTouchRef = useRef(false);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTouchTimer = useCallback(() => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isTouchRef.current) return;
    clearTouchTimer();
    setIsGlitching(true);
  }, [clearTouchTimer]);

  const handleMouseLeave = useCallback(() => {
    clearTouchTimer();
    setIsGlitching(false);
  }, [clearTouchTimer]);

  const handleTouchStart = useCallback(() => {
    isTouchRef.current = true;
    clearTouchTimer();
    setIsGlitching(true);

    touchTimerRef.current = setTimeout(() => {
      setIsGlitching(false);
      touchTimerRef.current = null;
      setTimeout(() => {
        isTouchRef.current = false;
      }, 300);
    }, 1200);
  }, [clearTouchTimer]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        clearTouchTimer();
        setIsGlitching(true);

        touchTimerRef.current = setTimeout(() => {
          setIsGlitching(false);
          touchTimerRef.current = null;
        }, 1200);
      }
    },
    [clearTouchTimer]
  );

  useEffect(() => {
    const handleIntroComplete = () => {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
      }, 700);
    };

    window.addEventListener("intro-complete", handleIntroComplete);
    return () => {
      window.removeEventListener("intro-complete", handleIntroComplete);
      clearTouchTimer();
    };
  }, [clearTouchTimer]);

  return (
    <div
      className={`${styles.portraitSurface} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onBlur={handleMouseLeave}
      onKeyDown={handleKeyDown}
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

      {/* Glitch Overlay Layers (Active while hovered or triggered) */}
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

          {/* Binary data bars inspired by refs/glitch/glitch_effect.gif */}
          <div className={styles.dataBars} aria-hidden="true" />
        </>
      )}
    </div>
  );
}

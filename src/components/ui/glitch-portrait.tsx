"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { portraitHitClip } from "@/data/portrait-silhouette";
import type { PortraitMotion, PortraitPreview } from "@/data/portrait-motion";
import { PortraitMotionLayers } from "./portrait-motion-layers";
import styles from "./glitch-portrait.module.css";

export interface GlitchPortraitProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  motion?: PortraitMotion;
  preview?: PortraitPreview;
  playback?: "running" | "paused";
}

export function GlitchPortrait({
  src, alt, priority = true,
  sizes = "(min-width: 64rem) 42vw, (min-width: 48rem) 50vw, 100vw",
  className = "", motion = "original", preview = "auto", playback = "running",
}: GlitchPortraitProps) {
  const [interacting, setInteracting] = useState(false);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);
  const pulseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = preview === "auto" ? interacting : preview === "active";

  const clearPulse = useCallback(() => {
    if (pulseTimer.current !== null) clearTimeout(pulseTimer.current);
    pulseTimer.current = null;
  }, []);

  const release = useCallback(() => {
    hoveredRef.current = false;
    clearPulse();
    setInteracting(false);
    surfaceRef.current?.style.setProperty("--pointer-x", "0px");
    surfaceRef.current?.style.setProperty("--pointer-y", "0px");
  }, [clearPulse]);

  const pulse = useCallback((duration = 1800) => {
    clearPulse();
    setInteracting(true);
    pulseTimer.current = setTimeout(() => {
      setInteracting(hoveredRef.current);
      pulseTimer.current = null;
    }, duration);
  }, [clearPulse]);

  const move = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch" || !surfaceRef.current) return;
    const surface = surfaceRef.current;
    const box = surface.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    // Continuous input updates CSS only; React renders only on state changes.
    surface.style.setProperty("--pointer-x", `${(x - 0.5) * 12}px`);
    surface.style.setProperty("--pointer-y", `${(y - 0.5) * 8}px`);
    surface.style.setProperty("--scan-y", `${y * 100}%`);
    surface.style.setProperty("--pointer-u", String(x));
    surface.style.setProperty("--pointer-v", String(y));
  };

  useEffect(() => {
    if (motion !== "original") return;
    const introComplete = (event: Event) => {
      if (event instanceof CustomEvent && event.detail?.played === false) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      pulse(700);
    };
    window.addEventListener("intro-complete", introComplete);
    return () => window.removeEventListener("intro-complete", introComplete);
  }, [motion, pulse]);

  useEffect(() => clearPulse, [clearPulse]);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;
    let visible = true;
    const synchronize = () => {
      surface.dataset.portraitVisible = String(visible && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      synchronize();
    });
    observer.observe(surface);
    document.addEventListener("visibilitychange", synchronize);
    synchronize();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", synchronize);
    };
  }, []);

  return (
    <div
      ref={surfaceRef}
      className={`${styles.portraitSurface} ${className}`}
      data-portrait-motion={motion}
      data-portrait-active={active}
      data-portrait-playback={playback}
      data-motion-image="pixels"
    >
      <Image src={src} alt={alt} fill preload={priority} sizes={sizes} unoptimized className={styles.portraitImage} />
      {motion !== "original" && <PortraitMotionLayers motion={motion} src={src} sizes={sizes} active={active} playback={playback} />}
      {motion === "original" && active && (
        <>
          {/* Slice A: Primary horizontal block displacement */}
          <div className={`${styles.sliceLayer} ${styles.sliceA}`} aria-hidden="true">
            <Image
              src={src}
              alt=""
              fill
              sizes={sizes}
              unoptimized
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
              unoptimized
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
              unoptimized
              className={styles.portraitImage}
            />
          </div>

          {/* Binary data bars inspired by refs/glitch/glitch_effect.gif */}
          <div className={styles.dataBars} aria-hidden="true" />
        </>
      )}
      <button
        type="button"
        className={styles.silhouetteTarget}
        style={{ clipPath: portraitHitClip }}
        aria-label="Animar el retrato de Bruno Esteve"
        data-cursor-hover="true"
        data-cursor-label="ME :)"
        onPointerEnter={(event) => {
          if (event.pointerType === "touch") return;
          hoveredRef.current = true;
          clearPulse();
          move(event);
          setInteracting(true);
        }}
        onPointerMove={move}
        onPointerLeave={(event) => { if (event.pointerType !== "touch") release(); }}
        onPointerCancel={release}
        onClick={() => pulse()}
        onBlur={release}
      />
    </div>
  );
}

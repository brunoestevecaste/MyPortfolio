"use client";

import { useEffect, useRef } from "react";
import type { DigitalPortraitMotion } from "@/data/portrait-motion";
import styles from "./portrait-motion-layers.module.css";

const SAMPLE_WIDTH = 160;
const SAMPLE_HEIGHT = 128;
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const GLYPHS = " .:-=+*#%@";
const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** Reconstructs the real photo; the surrounding alpha mask preserves its silhouette. */
export function DigitalPortrait({ motion, src, active, playback }: {
  motion: DigitalPortraitMotion;
  src: string;
  active: boolean;
  playback: "running" | "paused";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bandRef = useRef<HTMLCanvasElement>(null);
  const settings = useRef({ active, playback });
  const refreshRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    settings.current = { active, playback };
    refreshRef.current?.();
  }, [active, playback]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    const band = bandRef.current;
    const bandContext = band?.getContext("2d", { alpha: false });
    if (!canvas || !context) return;
    const surface = canvas.closest<HTMLElement>("[data-portrait-motion]");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sample = document.createElement("canvas");
    sample.width = SAMPLE_WIDTH;
    sample.height = SAMPLE_HEIGHT;
    const sampler = sample.getContext("2d", { willReadFrequently: true });
    if (!sampler) return;

    const computed = getComputedStyle(canvas);
    const ink = computed.getPropertyValue("--ink").trim() || "#121416";
    const paper = computed.getPropertyValue("--canvas").trim() || "#F9F4F4";
    const accent = computed.getPropertyValue("--accent").trim() || "#C1282E";
    const font = computed.fontFamily;
    const colorBytes = (color: string) => {
      sampler.fillStyle = color;
      sampler.fillRect(0, 0, 1, 1);
      return sampler.getImageData(0, 0, 1, 1).data.slice(0, 3);
    };
    const inkBytes = colorBytes(ink);
    const paperBytes = colorBytes(paper);
    const image = new window.Image();
    image.decoding = "async";
    let luminance: Float32Array | undefined;
    let frame: number | null = null;
    let disposed = false;
    let visible = true;
    let width = 720;
    let height = 576;
    let elapsed = 0;
    let last = 0;
    let strength = 0;
    let pointerX = 0.5;
    let pointerY = 0.45;

    const valueAt = (x: number, y: number) => {
      const sx = Math.min(SAMPLE_WIDTH - 1, Math.max(0, Math.floor(x * SAMPLE_WIDTH)));
      const sy = Math.min(SAMPLE_HEIGHT - 1, Math.max(0, Math.floor(y * SAMPLE_HEIGHT)));
      return luminance![sy * SAMPLE_WIDTH + sx];
    };
    const waveAt = (x: number, y: number) => {
      const distance = Math.hypot((x - pointerX) * 1.25, y - pointerY);
      const radial = Math.sin(distance * 24 - elapsed * 2.4);
      const diagonal = Math.sin((x * 0.45 + y) * 15 - elapsed * 1.4);
      return diagonal * (1 - strength) + radial * strength;
    };

    const render = () => {
      if (!luminance || disposed) return;
      context.globalAlpha = 1;
      context.fillStyle = paper;
      context.fillRect(0, 0, width, height);

      if (motion === "dither") {
        // Ordered 4×4 Bayer quantization, applied to photo luminance, not a dot overlay.
        const raster = sampler.createImageData(SAMPLE_WIDTH, SAMPLE_HEIGHT);
        for (let y = 0; y < SAMPLE_HEIGHT; y++) {
          for (let x = 0; x < SAMPLE_WIDTH; x++) {
            const threshold = (BAYER[(y % 4) * 4 + x % 4] + 0.5) / 16;
            const wave = waveAt(x / SAMPLE_WIDTH, y / SAMPLE_HEIGHT);
            const light = luminance[y * SAMPLE_WIDTH + x] + wave * (0.055 + strength * 0.09) > threshold;
            const i = (y * SAMPLE_WIDTH + x) * 4;
            const color = light ? paperBytes : inkBytes;
            raster.data[i] = color[0];
            raster.data[i + 1] = color[1];
            raster.data[i + 2] = color[2];
            raster.data[i + 3] = 255;
          }
        }
        sampler.putImageData(raster, 0, 0);
        context.imageSmoothingEnabled = false;
        context.drawImage(sample, 0, 0, width, height);
        return;
      }

      if (motion === "ascii") {
        const columns = 78;
        const rows = 42;
        const cellWidth = width / columns;
        const cellHeight = height / rows;
        context.font = `700 ${cellWidth / 0.61}px ${font}`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < columns; x++) {
            const u = (x + 0.5) / columns;
            const v = (y + 0.5) / rows;
            const wave = waveAt(u, v);
            const darkness = clamp(1 - valueAt(u, v) + wave * (0.07 + strength * 0.08));
            const glyph = GLYPHS[Math.round(darkness * (GLYPHS.length - 1))];
            context.fillStyle = strength > 0.35 && wave > 0.7 && darkness > 0.25 ? accent : ink;
            context.fillText(glyph, (x + 0.5) * cellWidth, (y + 0.5) * cellHeight, cellWidth);
          }
        }
        return;
      }

      if (motion === "pixels") {
        const grid = (columns: number, opacity: number) => {
          const rows = Math.round(columns * 0.8);
          const cw = width / columns;
          const ch = height / rows;
          context.globalAlpha = opacity;
          for (let y = 0; y < rows; y++) {
            const rowWave = Math.sin(y * 0.48 - elapsed * 2);
            const shift = rowWave > 0.82 ? strength * cw * 0.8 : 0;
            for (let x = 0; x < columns; x++) {
              const light = valueAt((x + 0.5) / columns, (y + 0.5) / rows);
              const tone = Math.round(clamp(light + rowWave * 0.035) * 5) / 5;
              const grey = Math.round(18 + tone * 226);
              context.fillStyle = `rgb(${grey} ${grey} ${grey})`;
              context.fillRect(x * cw + shift, y * ch, cw + 0.5, ch + 0.5);
            }
          }
        };
        grid(64, 1);
        grid(32, strength);
        context.globalAlpha = 1;
        return;
      }

      const columns = 65;
      const rows = Math.round(columns * 0.8);
      const cw = width / columns;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const u = (x + 0.5) / columns;
          const v = (y + 0.5) / rows;
          const darkness = clamp(1 - valueAt(u, v));
          if (darkness < 0.06) continue;
          const wave = waveAt(u, v);
          const px = u * width;
          const py = v * height;
          const radius = Math.sqrt(darkness) * cw * (0.43 + wave * 0.055 + strength * 0.09);
          context.fillStyle = strength > 0.45 && wave > 0.8 ? accent : ink;
          context.beginPath();
          context.arc(px, py, Math.max(0.2, radius), 0, Math.PI * 2);
          context.fill();
        }
      }
    };

    const draw = () => {
      render();
      // The narrow resting band uses the same frame and stays registered to the photo.
      if (band && bandContext && luminance) {
        bandContext.drawImage(canvas, 0, 0, width, height);
      }
    };

    const canAnimate = () => visible && !document.hidden && !preference.matches && settings.current.playback === "running";
    const tick = (now: number) => {
      frame = null;
      if (!canAnimate() || !luminance || disposed) { last = 0; return; }
      // Capped at 20fps (14fps for glyph drawing); no React render per frame.
      const interval = motion === "ascii" ? 1000 / 14 : 50;
      const delta = last ? now - last : interval;
      if (delta >= interval) {
        last = now;
        const dt = Math.min(delta, 100) / 1000;
        const target = settings.current.active ? 1 : 0;
        strength += (target - strength) * (1 - Math.exp(-dt * (target ? 7 : 10)));
        elapsed += dt * (0.75 + strength * 0.7);
        const targetX = Number(surface?.style.getPropertyValue("--pointer-u") || 0.5);
        const targetY = Number(surface?.style.getPropertyValue("--pointer-v") || 0.45);
        const ease = 1 - Math.exp(-dt * 10);
        pointerX += (targetX - pointerX) * ease;
        pointerY += (targetY - pointerY) * ease;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const refresh = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      last = 0;
      if (canAnimate() && luminance) frame = requestAnimationFrame(tick);
    };
    refreshRef.current = refresh;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.min(960, Math.max(320, Math.round(rect.width * Math.min(window.devicePixelRatio, 1.5))));
      height = Math.round(width * 0.8);
      canvas.width = width;
      canvas.height = height;
      if (band) { band.width = width; band.height = height; }
      draw();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refresh();
    });
    visibilityObserver.observe(canvas);
    document.addEventListener("visibilitychange", refresh);
    preference.addEventListener("change", refresh);

    image.onload = () => {
      if (disposed) return;
      // Match the existing 5:4 object-fit: cover, including the horizontal crop.
      const sourceWidth = image.naturalHeight * 1.25;
      sampler.drawImage(image, (image.naturalWidth - sourceWidth) / 2, 0,
        sourceWidth, image.naturalHeight, 0, 0, SAMPLE_WIDTH, SAMPLE_HEIGHT);
      const pixels = sampler.getImageData(0, 0, SAMPLE_WIDTH, SAMPLE_HEIGHT).data;
      luminance = new Float32Array(SAMPLE_WIDTH * SAMPLE_HEIGHT);
      for (let i = 0; i < luminance.length; i++) {
        const luma = (pixels[i * 4] * 0.2126 + pixels[i * 4 + 1] * 0.7152 + pixels[i * 4 + 2] * 0.0722) / 255;
        luminance[i] = clamp((luma - 0.08) / 0.84);
      }
      resize();
      canvas.dataset.ready = "true";
      band?.parentElement?.setAttribute("data-ready", "true");
      refresh();
    };
    image.src = src;

    return () => {
      disposed = true;
      if (frame !== null) cancelAnimationFrame(frame);
      refreshRef.current = null;
      image.onload = null;
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", refresh);
      preference.removeEventListener("change", refresh);
    };
  }, [motion, src]);

  return <>
    <canvas ref={canvasRef} className={styles.digitalCanvas} data-digital-motion={motion} aria-hidden="true" />
    <div className={styles.digitalRestWindow} aria-hidden="true">
      <canvas ref={bandRef} className={styles.digitalBandCanvas} data-digital-motion={motion} />
    </div>
  </>;
}

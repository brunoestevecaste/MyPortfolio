"use client";

import { useEffect, useRef } from "react";
import { portraitHitClip } from "@/data/portrait-silhouette";
import styles from "./portrait-motion-layers.module.css";

const noise = (seed: number) => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

// Use the same traced alpha contour as the native hit target, including its 5:4 crop.
const contour = [...portraitHitClip.matchAll(/([\d.]+)%\s+([\d.]+)%/g)]
  .map((point) => ({ x: Number(point[1]) / 100, y: Number(point[2]) / 100 }));
const segments = contour.map((point, index) => {
  const next = contour[(index + 1) % contour.length];
  const dx = next.x - point.x;
  const dy = (next.y - point.y) * 0.8;
  return { ...point, dx, dy, length: Math.hypot(dx, dy) };
}).filter((segment) => segment.y < 0.93 && segment.length > 0);
const perimeter = segments.reduce((total, segment) => total + segment.length, 0);
const orientation = Math.sign(contour.reduce((area, point, index) => {
  const next = contour[(index + 1) % contour.length];
  return area + point.x * next.y - next.x * point.y;
}, 0));
const emitters = Array.from({ length: 160 }, (_, index) => {
  let distance = (index + 0.5) / 160 * perimeter;
  const segment = segments.find((candidate) => {
    if (distance <= candidate.length) return true;
    distance -= candidate.length;
    return false;
  }) ?? segments[segments.length - 1];
  const t = distance / segment.length;
  return {
    x: segment.x + segment.dx * t,
    y: segment.y + segment.dy * t / 0.8,
    nx: segment.dy / segment.length * orientation,
    ny: -segment.dx / segment.length * orientation,
    duration: 3.8 + noise(index + 4) * 3,
    phase: noise(index + 12),
    reach: 0.055 + noise(index + 31) * 0.09,
    size: 0.65 + noise(index + 42) * 0.85,
  };
});

export function ParticlePortrait({ active, playback }: {
  active: boolean;
  playback: "running" | "paused";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settings = useRef({ active, playback });
  const refreshRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    settings.current = { active, playback };
    refreshRef.current?.();
  }, [active, playback]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const surface = canvas?.closest<HTMLElement>("[data-portrait-motion]");
    if (!canvas || !context || !surface) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const computed = getComputedStyle(canvas);
    const ink = computed.getPropertyValue("--ink").trim();
    const accent = computed.getPropertyValue("--accent").trim();
    const offsets = emitters.map(() => ({ x: 0, y: 0 }));
    let width = 400;
    let height = 320;
    let frame: number | null = null;
    let last = 0;
    let elapsed = 0;
    let strength = 0;
    let visible = true;
    let disposed = false;

    const draw = (dt = 0) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const pointerX = Number(surface.style.getPropertyValue("--pointer-u") || 0.5) * width;
      const pointerY = Number(surface.style.getPropertyValue("--pointer-v") || 0.45) * height;
      const ease = 1 - Math.exp(-dt * 12);
      for (let index = 0; index < emitters.length; index++) {
        const emitter = emitters[index];
        const age = (elapsed / emitter.duration + emitter.phase) % 1;
        const drift = age * emitter.reach * width;
        const sway = Math.sin(age * 5 + index) * age * width * 0.009;
        const x = emitter.x * width + emitter.nx * drift - emitter.ny * sway;
        const y = emitter.y * height + emitter.ny * drift + emitter.nx * sway - age * age * width * 0.015;
        const dx = x - pointerX;
        const dy = y - pointerY;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / (width * 0.25));
        const push = influence * influence * strength * width * 0.16;
        const offset = offsets[index];
        offset.x += (dx / Math.max(1, distance) * push - offset.x) * ease;
        offset.y += (dy / Math.max(1, distance) * push - offset.y) * ease;
        const opacity = Math.min(1, age / 0.12, (1 - age) / 0.35) * (0.4 + noise(index + 73) * 0.4);
        context.globalAlpha = opacity;
        context.fillStyle = noise(index + 19) > 0.82 ? accent : ink;
        const px = width * 0.2 + x + offset.x;
        const py = height * 0.2 + y + offset.y;
        const radius = emitter.size * Math.max(0.8, width / 520);
        if (index % 5 === 0) {
          context.fillRect(px - radius, py - radius, radius * 2, radius * 2);
        } else {
          context.beginPath();
          context.arc(px, py, radius, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.globalAlpha = 1;
    };

    const canAnimate = () => !disposed && visible && !document.hidden && !preference.matches && settings.current.playback === "running";
    const tick = (now: number) => {
      frame = null;
      if (!canAnimate()) { last = 0; return; }
      const delta = last ? now - last : 1000 / 30;
      if (delta >= 1000 / 30) {
        last = now;
        const dt = Math.min(delta, 100) / 1000;
        const target = settings.current.active ? 1 : 0;
        strength += (target - strength) * (1 - Math.exp(-dt * (target ? 9 : 12)));
        elapsed += dt;
        draw(dt);
      }
      frame = requestAnimationFrame(tick);
    };
    const refresh = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      last = 0;
      canvas.dataset.particlePlayback = canAnimate() ? "running" : "paused";
      if (canAnimate()) frame = requestAnimationFrame(tick);
    };
    refreshRef.current = refresh;
    const resize = () => {
      const box = surface.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio, 1.5, 960 / (box.width * 1.4));
      width = box.width * scale;
      height = width * 0.8;
      canvas.width = Math.round(width * 1.4);
      canvas.height = Math.round(height * 1.4);
      draw();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(surface);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refresh();
    });
    visibilityObserver.observe(surface);
    document.addEventListener("visibilitychange", refresh);
    preference.addEventListener("change", refresh);
    resize();
    refresh();
    return () => {
      disposed = true;
      if (frame !== null) cancelAnimationFrame(frame);
      refreshRef.current = null;
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", refresh);
      preference.removeEventListener("change", refresh);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.particleCanvas} data-particle-field="true" aria-hidden="true" />;
}

import Image from "next/image";
import dynamic from "next/dynamic";
import type { PortraitMotion } from "@/data/portrait-motion";
import styles from "./portrait-motion-layers.module.css";

const DigitalPortrait = dynamic(() => import("./digital-portrait").then((module) => module.DigitalPortrait));
const ParticlePortrait = dynamic(() => import("./particle-portrait").then((module) => module.ParticlePortrait));

export function PortraitMotionLayers({ motion, src, sizes, active, playback }: {
  motion: Exclude<PortraitMotion, "original">;
  src: string;
  sizes: string;
  active: boolean;
  playback: "running" | "paused";
}) {
  const copy = (className: string) => (
    <div className={className}>
      <Image src={src} alt="" fill sizes={sizes} unoptimized className={styles.image} />
    </div>
  );

  return (
    <div className={`${styles.layers} ${motion === "particles" ? styles.particleLayers : ""}`} aria-hidden="true">
      {motion === "scan" && <>
        <div className={styles.idleScan}><div className={styles.scanSweep} /></div>
        <div className={styles.cursorScan}><div className={styles.cursorLine} /></div>
      </>}
      {motion === "echo" && <>
        {copy(styles.echoNear)}
        {copy(styles.echoFar)}
      </>}
      {motion === "raster" && <>
        <div className={styles.rasterPulse}><div className={styles.rasterGrid} /></div>
        <div className={styles.rasterSignal} />
      </>}
      {motion === "micro" && <>
        <div className={styles.microIdle} />
        {copy(styles.microRestSlice)}
        <div className={styles.microActive}>
          {copy(styles.microUpper)}
          {copy(styles.microLower)}
        </div>
      </>}
      {motion === "particles" && <ParticlePortrait active={active} playback={playback} />}
      {(motion === "dither" || motion === "ascii" || motion === "pixels" || motion === "halftone") && (
        <DigitalPortrait motion={motion} src={src} active={active} playback={playback} />
      )}
    </div>
  );
}

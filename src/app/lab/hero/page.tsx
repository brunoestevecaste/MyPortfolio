import type { Metadata } from "next";
import { PortraitMotionLab } from "@/components/sections/portrait-motion-lab";

export const metadata: Metadata = {
  title: "Propuestas de animación del hero | Bruno Esteve",
  robots: { index: false, follow: false },
};

export default function HeroMotionPreviewPage() {
  return <PortraitMotionLab />;
}

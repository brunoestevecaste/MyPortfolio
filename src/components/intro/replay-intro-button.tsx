"use client";

import { useTranslations } from "@/components/i18n/language-provider";
import { useCallback } from "react";

export function ReplayIntroButton() {
  const { t } = useTranslations();
  const handleReplay = useCallback(() => {
    try {
      window.sessionStorage.removeItem("portfolio_intro_seen");
    } catch {
      // Safe fallback
    }
    window.dispatchEvent(new CustomEvent("replay-intro"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      onClick={handleReplay}
      className="text-link inline-flex min-h-11 min-w-11 items-center font-mono text-xs tracking-wider uppercase text-muted hover:text-ink cursor-pointer"
      aria-label={t("Volver a reproducir la animación de introducción")}
    >
      {t("[ ↺ Intro ]")}</button>
  );
}

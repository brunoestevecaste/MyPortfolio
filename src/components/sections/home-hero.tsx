import type { ReactNode } from "react";
import { getTranslations } from "@/lib/i18n/server";
import { profile } from "@/data/profile";
import { HomeHeroView } from "./home-hero-view";

export async function HomeHero({ portrait }: { portrait?: ReactNode }) {
  const { t } = await getTranslations();
  return <HomeHeroView
    portrait={portrait}
    headline={t(profile.headline)}
    introduction={t(profile.introduction)}
    approach={t(profile.approach)}
    portraitAlt={t("Retrato editorial de Bruno Esteve en blanco y negro, con grano fino y sin fondo")}
  />;
}

import "server-only";
import { cache } from "react";
import type { Locale, Messages } from "./shared";

export const getMessages = cache(async (locale: Locale): Promise<Messages> => {
  if (locale === "es") return {};
  const [server, client] = await Promise.all([
    import("@/data/i18n/en.json", { with: { type: "json" } }),
    import("@/data/i18n/en-client.json", { with: { type: "json" } }),
  ]);
  return { ...server.default, ...client.default };
});

export async function getClientMessages(locale: Locale): Promise<Messages> {
  return locale === "en" ? (await import("@/data/i18n/en-client.json", { with: { type: "json" } })).default : {};
}

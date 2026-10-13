import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { createTranslator, isLocale, LOCALE_COOKIE, type Locale } from "./shared";
import { getMessages } from "./dictionaries";

export { getClientMessages } from "./dictionaries";

export const getLocale = cache(async (): Promise<Locale> => {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : "es";
});

export const getTranslations = cache(async () => {
  const locale = await getLocale();
  const messages = await getMessages(locale);
  return { locale, t: createTranslator(messages) };
});

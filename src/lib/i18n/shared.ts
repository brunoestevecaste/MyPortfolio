export type Locale = "es" | "en";
export type Messages = Readonly<Record<string, string>>;
export const LOCALE_COOKIE = "portfolio-language";

export function isLocale(value: unknown): value is Locale {
  return value === "es" || value === "en";
}

export function languageFromCookie(header: string | null): Locale {
  const value = header?.split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${LOCALE_COOKIE}=`))
    ?.slice(LOCALE_COOKIE.length + 1);
  return isLocale(value) ? value : "es";
}

export function createTranslator(messages: Messages) {
  function t(text: string): string;
  function t(text: string | undefined): string | undefined;
  function t(text: string, values: readonly (string | number)[]): string;
  function t(text: string | undefined, values?: readonly (string | number)[]) {
    if (text === undefined) return undefined;
    const trimmed = text.trim();
    const translated = Object.hasOwn(messages, trimmed) ? messages[trimmed] : trimmed;
    const result = values
      ? translated.replace(/\{(\d+)\}/g, (placeholder, index: string) => String(values[Number(index)] ?? placeholder))
      : translated;
    return text.slice(0, text.length - text.trimStart().length) + result + text.slice(text.trimEnd().length);
  }
  return t;
}

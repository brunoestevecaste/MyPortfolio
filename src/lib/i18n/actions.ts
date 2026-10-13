"use server";

import { cookies } from "next/headers";
import { isLocale, LOCALE_COOKIE, type Locale } from "./shared";

export async function changeLanguage(locale: Locale) {
  if (!isLocale(locale)) throw new Error("Unsupported language");
  // Next.js returns the updated server components with this cookie mutation.
  (await cookies()).set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}

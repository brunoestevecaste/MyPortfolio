"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { createTranslator, type Locale, type Messages } from "@/lib/i18n/shared";

const LanguageContext = createContext({ locale: "es" as Locale, t: createTranslator({}) });

export function LanguageProvider({ locale, messages, children }: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ locale, t: createTranslator(messages) }), [locale, messages]);
  return <LanguageContext value={value}>{children}</LanguageContext>;
}

export function useTranslations() {
  return useContext(LanguageContext);
}

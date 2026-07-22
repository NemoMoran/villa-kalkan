export const locales = ["en", "de", "tr", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  tr: "Türkçe",
  fr: "Français",
};

// BCP-47 tags used for Intl/toLocaleDateString calls.
export const localeTags: Record<Locale, string> = {
  en: "en-US",
  de: "de-DE",
  tr: "tr-TR",
  fr: "fr-FR",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localeHref(lang: Locale, path: string): string {
  if (path === "/") return `/${lang}`;
  return `/${lang}${path}`;
}

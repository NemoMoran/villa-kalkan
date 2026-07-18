"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

function stripLocale(pathname: string, lang: Locale): string {
  const prefix = `/${lang}`;
  if (pathname === prefix) return "/";
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  return pathname;
}

export function LanguageSwitcher({
  lang,
  label,
  className = "",
}: {
  lang: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    if (next === lang) return;
    const rest = stripLocale(pathname, lang);
    const target = `/${next}${rest === "/" ? "" : rest}`;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.push(target);
  }

  return (
    <div className={className}>
      <label className="sr-only" htmlFor="language-switcher">
        {label}
      </label>
      <select
        id="language-switcher"
        value={lang}
        onChange={(e) => switchTo(e.target.value as Locale)}
        aria-label={label}
        className="rounded-full border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand-dark"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeNames[locale]}
          </option>
        ))}
      </select>
    </div>
  );
}

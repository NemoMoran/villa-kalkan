"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

function stripLocale(pathname: string, lang: Locale): string {
  const prefix = `/${lang}`;
  if (pathname === prefix) return "/";
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  return pathname;
}

function useSwitchLocale(lang: Locale) {
  const pathname = usePathname();
  const router = useRouter();

  return (next: Locale) => {
    if (next === lang) return;
    const rest = stripLocale(pathname, lang);
    const target = `/${next}${rest === "/" ? "" : rest}`;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.push(target);
  };
}

function GlobeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.4 3.75 5.4 3.75 9S14.5 18.6 12 21c-2.5-2.4-3.75-5.4-3.75-9S9.5 5.4 12 3z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function LanguageSwitcher({
  lang,
  label,
}: {
  lang: Locale;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const switchLocale = useSwitchLocale(lang);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
        className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
          open
            ? "border-brand-dark text-ink"
            : "border-border text-ink-muted hover:border-ink hover:text-ink"
        }`}
      >
        <GlobeIcon />
        <span className="uppercase tracking-wide">{lang}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="pop-in absolute right-0 top-full z-50 mt-2 min-w-44 origin-top-right rounded-2xl border border-border bg-surface p-1.5 shadow-xl shadow-navy/10"
        >
          {locales.map((locale) => {
            const active = locale === lang;
            return (
              <li key={locale} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    switchLocale(locale);
                  }}
                  className={`flex w-full items-center justify-between gap-6 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-surface-muted font-semibold text-ink"
                      : "text-ink-muted hover:bg-surface-muted hover:text-ink"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-7 text-xs font-semibold uppercase tracking-wide text-ink-muted/70">
                      {locale}
                    </span>
                    {localeNames[locale]}
                  </span>
                  {active && (
                    <span className="text-brand">
                      <CheckIcon />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* Mobile menu variant: all languages laid out as tappable pills — no
   nested dropdown inside an already-open menu. */
export function LanguagePills({
  lang,
  label,
}: {
  lang: Locale;
  label: string;
}) {
  const switchLocale = useSwitchLocale(lang);

  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {locales.map((locale) => {
        const active = locale === lang;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => switchLocale(locale)}
            aria-pressed={active}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "border-brand-dark bg-brand-dark text-white"
                : "border-border bg-surface text-ink-muted hover:border-ink hover:text-ink"
            }`}
          >
            {localeNames[locale]}
          </button>
        );
      })}
    </div>
  );
}

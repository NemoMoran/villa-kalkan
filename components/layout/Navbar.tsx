"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type NavDict = Dictionary["nav"];

export function Navbar({ lang, dict }: { lang: Locale; dict: NavDict }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: localeHref(lang, "/villas"), label: dict.villas },
    { href: localeHref(lang, "/guide"), label: dict.guide },
    { href: localeHref(lang, "/about"), label: dict.about },
    { href: localeHref(lang, "/faq"), label: dict.faq },
    { href: localeHref(lang, "/contact"), label: dict.contact },
  ];
  const homeHref = localeHref(lang, "/");
  const villasHref = localeHref(lang, "/villas");

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href={homeHref}
          className="font-display text-xl tracking-tight text-ink"
        >
          Villa <span className="text-brand">Kalkan</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <LanguageSwitcher lang={lang} label={dict.language} />
          <LinkButton href={villasHref} className="px-5 py-2.5">
            {dict.browseVillas}
          </LinkButton>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-center rounded-full p-2 text-ink lg:hidden"
          aria-label={dict.toggleMenu}
          aria-expanded={open}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-4 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-sm font-medium text-ink-muted hover:bg-surface-muted hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher lang={lang} label={dict.language} className="mt-2" />
          <LinkButton href={villasHref} className="mt-2 w-full">
            {dict.browseVillas}
          </LinkButton>
        </nav>
      )}
    </header>
  );
}

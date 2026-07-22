import Image from "next/image";
import Link from "next/link";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type FooterDict = Dictionary["footer"];

export function Footer({ lang, dict }: { lang: Locale; dict: FooterDict }) {
  const year = new Date().getFullYear();

  const explore = [
    { href: localeHref(lang, "/villas"), label: dict.exploreLinks.villas },
    { href: localeHref(lang, "/guide"), label: dict.exploreLinks.guide },
    { href: localeHref(lang, "/faq"), label: dict.exploreLinks.faq },
  ];

  const company = [
    { href: localeHref(lang, "/about"), label: dict.companyLinks.about },
    { href: localeHref(lang, "/contact"), label: dict.companyLinks.contact },
  ];

  return (
    <footer className="mt-auto bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/site/logo-white.png"
            alt="Villa Kalkan"
            width={955}
            height={249}
            className="h-10 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            {dict.tagline}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            {dict.exploreHeading}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {explore.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            {dict.companyHeading}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {company.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            {dict.getInTouchHeading}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li>info@villa-kalkan.net</li>
            <li>+49 1578 3027381</li>
            <li>Kalkan, Antalya, Turkey</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-white/50 sm:flex-row">
          <p>{dict.copyright.replace("{year}", String(year))}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <p>{dict.bookingNote}</p>
            <Link
              href={localeHref(lang, "/impressum")}
              className="underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              {dict.legalLinks.imprint}
            </Link>
            <Link
              href={localeHref(lang, "/datenschutz")}
              className="underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              {dict.legalLinks.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

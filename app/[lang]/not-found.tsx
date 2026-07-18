"use client";

import { useParams } from "next/navigation";
import { LinkButton } from "@/components/ui/Button";
import { hasLocale, defaultLocale, localeHref, type Locale } from "@/lib/i18n/config";

// not-found.tsx renders without route params (Next.js convention), so the
// locale is read client-side via useParams instead of the usual dictionary.
const strings: Record<
  Locale,
  { code: string; title: string; body: string; browseVillas: string }
> = {
  en: {
    code: "404",
    title: "We couldn't find that page",
    body: "The villa or page you're looking for may have moved. Try browsing the full collection instead.",
    browseVillas: "Browse villas",
  },
  de: {
    code: "404",
    title: "Diese Seite konnten wir nicht finden",
    body: "Die Villa oder Seite, die Sie suchen, wurde möglicherweise verschoben. Durchstöbern Sie stattdessen die gesamte Sammlung.",
    browseVillas: "Villen entdecken",
  },
  tr: {
    code: "404",
    title: "Bu sayfayı bulamadık",
    body: "Aradığınız villa veya sayfa taşınmış olabilir. Bunun yerine tüm koleksiyona göz atmayı deneyin.",
    browseVillas: "Villalara göz at",
  },
  fr: {
    code: "404",
    title: "Nous n'avons pas trouvé cette page",
    body: "La villa ou la page que vous recherchez a peut-être été déplacée. Essayez plutôt de parcourir la collection complète.",
    browseVillas: "Voir les villas",
  },
};

export default function NotFound() {
  const params = useParams<{ lang?: string }>();
  const lang = hasLocale(params.lang ?? "") ? (params.lang as Locale) : defaultLocale;
  const t = strings[lang];

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
        {t.code}
      </p>
      <h1 className="font-display mt-3 text-3xl text-ink">{t.title}</h1>
      <p className="mt-3 max-w-md text-ink-muted">{t.body}</p>
      <LinkButton href={localeHref(lang, "/villas")} className="mt-8">
        {t.browseVillas}
      </LinkButton>
    </div>
  );
}

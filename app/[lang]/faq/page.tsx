import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LinkButton } from "@/components/ui/Button";
import { hasLocale, localeHref } from "@/lib/i18n/config";
import { getDictionary } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.faqPage.title, description: dict.faqPage.description };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.faqPage;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.groups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      }))
    ),
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        {t.eyebrow}
      </p>
      <h1 className="font-display mt-3 text-4xl text-ink">{t.title}</h1>
      <p className="mt-3 text-ink-muted">{t.description}</p>

      {t.groups.map((group) => (
        <section key={group.title} className="mt-12">
          <h2 className="font-display text-2xl text-ink">{group.title}</h2>
          <div className="mt-5 space-y-3">
            {group.items.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-border bg-surface p-5 open:bg-surface-muted/50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="shrink-0 text-ink-muted transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-16 rounded-3xl bg-navy p-8 text-center text-white">
        <h2 className="font-display text-2xl">{t.stillHaveQuestion}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
          {t.replyNote}{" "}
          <Link href={localeHref(lang, "/contact")} className="underline underline-offset-2">
            {t.sendMessage}
          </Link>{" "}
          {t.replyNoteSuffix}
        </p>
        <div className="mt-6">
          <LinkButton href={localeHref(lang, "/contact")} variant="outline-light">
            {t.contactUs}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

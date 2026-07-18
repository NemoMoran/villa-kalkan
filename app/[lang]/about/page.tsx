import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
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
  return { title: dict.aboutPage.title, description: dict.aboutPage.paragraphs[0] };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.aboutPage;

  return (
    <div>
      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 20% 10%, rgba(244,234,210,0.12), transparent 60%), linear-gradient(200deg, #10242e 0%, #16303c 55%, #147d99 130%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            {t.eyebrow}
          </p>
          <h1 className="font-display mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">
            {t.title}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="max-w-xl space-y-5 leading-relaxed text-ink-muted">
              {t.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <div className="pt-2">
                <LinkButton href={localeHref(lang, "/contact")} variant="outline">
                  {t.talkToUs}
                </LinkButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-4">
              <PlaceholderImage
                gradient={["#147d99", "#10242e"]}
                alt={t.altCoastline}
                className="mt-8 aspect-[3/4] rounded-3xl"
                plain
              />
              <PlaceholderImage
                gradient={["#f4a261", "#b95c2f"]}
                alt={t.altTerrace}
                className="aspect-[3/4] rounded-3xl"
                plain
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {t.values.map((value, i) => (
            <Reveal key={value.title} delay={i * 100}>
              <div className="h-full rounded-3xl border border-border bg-surface p-8">
                <p className="font-semibold text-ink">{value.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

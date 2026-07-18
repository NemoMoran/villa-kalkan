import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { hasLocale, localeHref } from "@/lib/i18n/config";
import { getDictionary } from "../dictionaries";

const beachGradients: [string, string][] = [
  ["#4dd0e1", "#0d5f75"],
  ["#f4ead2", "#c9a86a"],
  ["#147d99", "#16303c"],
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.guidePage.title, description: dict.guidePage.description };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.guidePage;

  return (
    <div>
      {/* Hero band */}
      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 80% 10%, rgba(244,234,210,0.12), transparent 60%), linear-gradient(160deg, #10242e 0%, #16303c 55%, #147d99 130%)",
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
          <p className="mt-5 max-w-xl text-lg text-white/75">{t.description}</p>
        </div>
      </section>

      {/* Beaches */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow={t.swim.eyebrow}
            title={t.swim.title}
            description={t.swim.description}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {t.beaches.map((beach, i) => (
            <Reveal key={beach.name} delay={i * 100}>
              <div className="h-full overflow-hidden rounded-3xl border border-border bg-surface">
                <PlaceholderImage
                  gradient={beachGradients[i]}
                  alt={beach.name}
                  className="aspect-[4/3]"
                  plain
                />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg text-ink">{beach.name}</h3>
                    <span className="whitespace-nowrap rounded-full bg-surface-muted px-3 py-1 text-xs text-ink-muted">
                      {beach.distance}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {beach.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Experiences */}
      <Section muted>
        <Reveal>
          <SectionHeader
            eyebrow={t.explore.eyebrow}
            title={t.explore.title}
            description={t.explore.description}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {t.experiences.map((exp, i) => (
            <Reveal key={exp.name} delay={i * 75}>
              <div className="h-full rounded-3xl border border-border bg-surface p-7">
                <h3 className="font-semibold text-ink">{exp.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {exp.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Dining */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow={t.eatDrink.eyebrow}
            title={t.eatDrink.title}
            description={t.eatDrink.description}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {t.dining.map((spot, i) => (
            <Reveal key={spot.name} delay={i * 100}>
              <div className="h-full rounded-3xl bg-gold-soft/60 p-7">
                <h3 className="font-semibold text-ink">{spot.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {spot.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* When to visit */}
      <Section muted>
        <Reveal>
          <SectionHeader eyebrow={t.plan.eyebrow} title={t.plan.title} />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {t.seasons.map((season, i) => (
            <Reveal key={season.months} delay={i * 100}>
              <div className="rounded-3xl border border-border bg-surface p-7">
                <p className="font-display text-xl text-brand">{season.months}</p>
                <p className="mt-2 text-sm text-ink-muted">{season.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-10 text-sm text-ink-muted">
            {t.gettingHere}{" "}
            <Link
              href={localeHref(lang, "/contact")}
              className="font-medium text-brand-dark underline underline-offset-2"
            >
              {t.justAsk}
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <Reveal>
          <h2 className="font-display mx-auto max-w-xl text-3xl text-ink">
            {t.soldOnKalkan}
          </h2>
          <div className="mt-8">
            <LinkButton href={localeHref(lang, "/villas")}>
              {dict.home.hero.ctaPrimary}
            </LinkButton>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}

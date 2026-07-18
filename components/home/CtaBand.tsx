import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type CtaBandDict = Dictionary["home"]["ctaBand"];

export function CtaBand({ lang, dict }: { lang: Locale; dict: CtaBandDict }) {
  return (
    <Section muted className="text-center">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {dict.eyebrow}
        </p>
        <h2 className="font-display mx-auto mt-3 max-w-2xl text-3xl text-ink sm:text-4xl">
          {dict.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-muted">{dict.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href={localeHref(lang, "/villas")}>
            {dict.ctaPrimary}
          </LinkButton>
          <LinkButton href={localeHref(lang, "/contact")} variant="outline">
            {dict.ctaSecondary}
          </LinkButton>
        </div>
      </Reveal>
    </Section>
  );
}

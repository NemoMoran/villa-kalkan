import { getFeaturedVillasWithImages } from "@/data/villaImages";
import { VillaCard } from "@/components/villa/VillaCard";
import { LinkButton } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type FeaturedVillasDict = Dictionary["home"]["featuredVillas"];

export function FeaturedVillas({
  lang,
  dict,
  villaCardDict,
}: {
  lang: Locale;
  dict: FeaturedVillasDict;
  villaCardDict: Dictionary["villaCard"];
}) {
  const featured = getFeaturedVillasWithImages();

  if (featured.length === 0) return null;

  return (
    <Section muted>
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <SectionHeader
            eyebrow={dict.eyebrow}
            title={dict.title}
            description={dict.description}
          />
          <LinkButton
            href={localeHref(lang, "/villas")}
            variant="outline"
            className="hidden shrink-0 sm:inline-flex"
          >
            {dict.viewAll}
          </LinkButton>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((villa, i) => (
          <Reveal key={villa.slug} delay={i * 100}>
            <VillaCard villa={villa} lang={lang} dict={villaCardDict} />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 text-center sm:hidden">
        <LinkButton href={localeHref(lang, "/villas")} variant="outline">
          {dict.viewAll}
        </LinkButton>
      </div>
    </Section>
  );
}

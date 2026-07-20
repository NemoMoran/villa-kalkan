import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getVillaBySlug, getVillaContent } from "@/data/villas";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type VillasTogetherDict = Dictionary["home"]["villasTogether"];

// These five sit together on the same hillside plot, side by side — see the
// aerial photos below. Order matches the owner's fact sheet.
const COMPLEX_SLUGS = [
  "villa-cemre",
  "villa-leyla",
  "villa-sude",
  "villa-ayda",
  "villa-sur",
] as const;

const PHOTOS = [
  "/images/site/villa-complex-1.jpg",
  "/images/site/villa-complex-2.jpg",
  "/images/site/villa-complex-3.jpg",
];

export function VillasTogether({
  lang,
  dict,
}: {
  lang: Locale;
  dict: VillasTogetherDict;
}) {
  const villas = COMPLEX_SLUGS.flatMap((slug) => {
    const villa = getVillaBySlug(slug);
    return villa ? [{ slug, content: getVillaContent(villa, lang) }] : [];
  });

  return (
    <Section muted>
      <Reveal>
        <SectionHeader
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
        <Reveal delay={100}>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl">
              <Image
                src={PHOTOS[0]}
                alt={dict.altPhoto}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={PHOTOS[1]}
                alt={dict.altPhoto}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={PHOTOS[2]}
                alt={dict.altPhoto}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <ul className="space-y-3">
            {villas.map(({ slug, content }) => (
              <li key={slug}>
                <Link
                  href={localeHref(lang, `/villas/${slug}`)}
                  className="block rounded-2xl border border-border bg-surface px-5 py-4 transition-colors hover:border-brand"
                >
                  <p className="font-display text-lg text-ink">{content.name}</p>
                  <p className="mt-1 text-sm text-ink-muted">{content.shortTagline}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type GuideTeaserDict = Dictionary["home"]["guideTeaser"];

// Order matches dict.highlights: Kaputaş Beach, Harbour dinners, Boat days.
const photos = [
  "/images/guide/kaputas.jpg",
  "/images/site/harbour-dinner.jpg",
  "/images/site/boat-day.jpg",
];

export function GuideTeaser({
  lang,
  dict,
}: {
  lang: Locale;
  dict: GuideTeaserDict;
}) {
  const guideHref = localeHref(lang, "/guide");

  return (
    <Section dark className="text-white">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              {dict.eyebrow}
            </p>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl">
              {dict.title}
            </h2>
            <p className="mt-4 text-white/70">{dict.description}</p>
          </div>
          <Link
            href={guideHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
          >
            {dict.readGuide}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {dict.highlights.map((item, i) => (
          <Reveal key={item.title} delay={i * 100}>
            <Link href={guideHref} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src={photos[i]}
                  alt={item.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <p className="mt-4 font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-white/60">{item.description}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

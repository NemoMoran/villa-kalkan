import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type GuideTeaserDict = Dictionary["home"]["guideTeaser"];

const gradients: [string, string][] = [
  ["#4dd0e1", "#0d5f75"],
  ["#f4a261", "#b95c2f"],
  ["#147d99", "#10242e"],
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
              <PlaceholderImage
                gradient={gradients[i]}
                alt={item.title}
                className="aspect-[4/3] rounded-3xl transition-transform duration-300 group-hover:scale-[1.02]"
                plain
              />
              <p className="mt-4 font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-white/60">{item.description}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

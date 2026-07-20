import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { villas } from "@/data/villas";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type HeroDict = Dictionary["home"]["hero"];

export function Hero({ lang, dict }: { lang: Locale; dict: HeroDict }) {
  const stats = [
    { value: `${villas.length}`, label: dict.statVillas },
    { value: "300+", label: dict.statSun },
    { value: "100%", label: dict.statBooked },
  ];

  return (
    <section className="relative flex min-h-[88vh] flex-col overflow-hidden bg-navy">
      {/* Kaputaş Beach */}
      <Image
        src="/images/guide/kaputas.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[65%_50%]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(13,24,30,0.92) 0%, rgba(13,24,30,0.78) 35%, rgba(13,36,46,0.4) 65%, rgba(13,36,46,0.15) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Horizon waves */}
      <svg
        className="absolute inset-x-0 bottom-0 h-40 w-full"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 120 Q 180 80 360 120 T 720 120 T 1080 120 T 1440 120 V 200 H 0 Z"
          fill="rgba(255,255,255,0.05)"
        />
        <path
          d="M0 150 Q 180 115 360 150 T 720 150 T 1080 150 T 1440 150 V 200 H 0 Z"
          fill="rgba(255,255,255,0.07)"
        />
      </svg>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
          {dict.eyebrow}
        </p>
        <h1 className="font-display mt-5 max-w-2xl text-4xl leading-tight text-white sm:text-6xl">
          {dict.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
          {dict.body}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <LinkButton href={localeHref(lang, "/villas")}>
            {dict.ctaPrimary}
          </LinkButton>
          <LinkButton href={localeHref(lang, "/guide")} variant="outline-light">
            {dict.ctaSecondary}
          </LinkButton>
        </div>

        <dl className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-2xl text-white sm:text-3xl">
                {stat.value}
              </dd>
              <p className="mt-1 text-xs text-white/60">{stat.label}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

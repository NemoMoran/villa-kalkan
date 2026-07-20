import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type WhyKalkanDict = Dictionary["home"]["whyKalkan"];

export function WhyKalkan({ dict }: { dict: WhyKalkanDict }) {
  return (
    <Section muted>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeader
            eyebrow={dict.eyebrow}
            title={dict.title}
            description={dict.description}
          />
          <dl className="mt-10 space-y-6">
            {dict.facts.map((fact) => (
              <div key={fact.value} className="flex items-baseline gap-4">
                <dt className="sr-only">{fact.label}</dt>
                <dd className="font-display w-24 shrink-0 text-2xl text-brand">
                  {fact.value}
                </dd>
                <p className="text-sm text-ink-muted">{fact.label}</p>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={150}>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
              <Image
                src="/images/site/kalkan-harbour.jpg"
                alt={dict.altHarbour}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-3xl">
              <Image
                src="/images/site/old-town-street.jpg"
                alt={dict.altOldTown}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

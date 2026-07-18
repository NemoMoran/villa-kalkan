import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
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
            <PlaceholderImage
              gradient={["#4dd0e1", "#147d99"]}
              alt={dict.altHarbour}
              className="aspect-[3/4] rounded-3xl"
              plain
            />
            <PlaceholderImage
              gradient={["#f4ead2", "#c9a86a"]}
              alt={dict.altOldTown}
              className="mt-8 aspect-[3/4] rounded-3xl"
              plain
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

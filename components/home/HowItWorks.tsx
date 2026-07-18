import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type HowItWorksDict = Dictionary["home"]["howItWorks"];

export function HowItWorks({ dict }: { dict: HowItWorksDict }) {
  return (
    <Section>
      <Reveal>
        <SectionHeader
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {dict.steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 100}>
            <div className="h-full rounded-3xl border border-border bg-surface p-8">
              <p className="font-display text-3xl text-brand">{step.number}</p>
              <p className="mt-4 font-semibold text-ink">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

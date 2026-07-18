import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type ReviewsDict = Dictionary["home"]["reviews"];

function Stars({ label }: { label: string }) {
  return (
    <div className="flex gap-0.5 text-gold" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews({ dict }: { dict: ReviewsDict }) {
  return (
    <Section>
      <Reveal>
        <SectionHeader eyebrow={dict.eyebrow} title={dict.title} align="center" />
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {dict.items.map((review, i) => (
          <Reveal key={review.name} delay={i * 100}>
            <figure className="flex h-full flex-col rounded-3xl border border-border bg-surface p-8">
              <Stars label={dict.starsLabel} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <p className="text-sm font-semibold text-ink">{review.name}</p>
                <p className="mt-0.5 text-xs text-ink-muted">{review.detail}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

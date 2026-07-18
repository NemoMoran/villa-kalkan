import { Section } from "@/components/ui/Section";

const highlights = [
  {
    title: "8 hand-picked villas",
    description: "Every villa is personally vetted, in and around Kalkan.",
  },
  {
    title: "Book where you trust",
    description:
      "Reserve directly on Airbnb or Booking.com — no extra accounts.",
  },
  {
    title: "Local, hands-on hosting",
    description: "Real support before and during your stay, not a call center.",
  },
];

export function IntroSection() {
  return (
    <Section className="text-center">
      <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
        Welcome to Villa Kalkan
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-ink-muted">
        We manage a small collection of villas along the Kalkan coastline —
        each one chosen for its view, privacy, and location. Browse the
        villas below, check availability, and book on the platform you
        already trust.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-2xl border border-border p-6 text-left">
            <p className="font-semibold text-ink">{item.title}</p>
            <p className="mt-1 text-sm text-ink-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

import type { Metadata } from "next";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Villa Kalkan and how we host our guests.",
};

const values = [
  {
    title: "Hand-picked, not mass-listed",
    description:
      "Every villa in our collection is chosen personally for its location, privacy, and view — we don't add a villa just to grow the list.",
  },
  {
    title: "Book where you already trust",
    description:
      "We list on Airbnb and Booking.com so you get their protections and reviews — this site just makes it easier to compare our villas first.",
  },
  {
    title: "Local support, real people",
    description:
      "Questions before or during your stay go to someone who knows Kalkan, not a call center.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PlaceholderImage
        gradient={["#4fb6c9", "#2f7d9f"]}
        className="h-64 w-full"
      />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-extrabold text-ink">About Villa Kalkan</h1>
        <p className="mt-4 leading-relaxed text-ink-muted">
          Villa Kalkan started as a small collection of villas along the
          Kalkan coastline, brought together under one place so travelers
          could compare them side by side before booking. We don&apos;t run a
          booking platform of our own — every stay is reserved directly
          through Airbnb or Booking.com, so you keep the protections and
          support you&apos;d expect from either.
        </p>
        <p className="mt-4 leading-relaxed text-ink-muted">
          What we do add is local knowledge: which villas suit families,
          which are quiet enough for a work trip, and which have the best
          view for sunset. If you&apos;re not sure which villa fits your
          trip, reach out and we&apos;ll help you pick.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border border-border p-6">
              <p className="font-semibold text-ink">{value.title}</p>
              <p className="mt-2 text-sm text-ink-muted">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

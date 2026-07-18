import type { Metadata } from "next";
import { villas } from "@/data/villas";
import { VillaCard } from "@/components/villa/VillaCard";

export const metadata: Metadata = {
  title: "Villas",
  description:
    "Browse all villas available for daily rental in Kalkan, Turkey.",
};

export default function VillasPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-extrabold text-ink">Our Villas</h1>
      <p className="mt-2 text-ink-muted">
        {villas.length} hand-picked villas in and around Kalkan.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {villas.map((villa) => (
          <VillaCard key={villa.slug} villa={villa} />
        ))}
      </div>
    </div>
  );
}

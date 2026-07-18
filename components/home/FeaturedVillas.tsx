import { getFeaturedVillas } from "@/data/villas";
import { VillaCard } from "@/components/villa/VillaCard";
import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function FeaturedVillas() {
  const featured = getFeaturedVillas();

  if (featured.length === 0) return null;

  return (
    <Section muted>
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
          Featured villas
        </h2>
        <LinkButton href="/villas" variant="secondary" className="hidden sm:inline-flex">
          View all villas
        </LinkButton>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((villa) => (
          <VillaCard key={villa.slug} villa={villa} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <LinkButton href="/villas" variant="secondary">
          View all villas
        </LinkButton>
      </div>
    </Section>
  );
}

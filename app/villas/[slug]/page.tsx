import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { villas, getVillaBySlug } from "@/data/villas";
import { VillaGallery } from "@/components/villa/VillaGallery";
import { AmenitiesList } from "@/components/villa/AmenitiesList";
import { AvailabilityCalendar } from "@/components/villa/AvailabilityCalendar";
import { LinkButton } from "@/components/ui/Button";
import { getVillaAvailability } from "@/lib/ical/getVillaAvailability";
import { toBusyDateSet } from "@/lib/ical/mergeBusyDates";
import type { VillaAvailability } from "@/lib/ical/types";

export async function generateStaticParams() {
  return villas.map((villa) => ({ slug: villa.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);
  if (!villa) return {};

  return {
    title: villa.name,
    description: villa.shortTagline,
  };
}

const platformLabel: Record<string, string> = {
  airbnb: "Book on Airbnb",
  booking: "Book on Booking.com",
};

export default async function VillaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);

  if (!villa) notFound();

  // getVillaAvailability never throws internally, but a page can never be
  // allowed to 500 because a third-party calendar feed is unreachable.
  let availability: VillaAvailability;
  try {
    availability = (await getVillaAvailability(slug)) ?? {
      slug,
      busyDates: [],
      sources: { airbnb: "not_configured", booking: "not_configured" },
      generatedAt: new Date().toISOString(),
    };
  } catch {
    availability = {
      slug,
      busyDates: [],
      sources: { airbnb: "error", booking: "error" },
      generatedAt: new Date().toISOString(),
    };
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <VillaGallery
        gradient={villa.gradient}
        count={villa.galleryCount}
        villaName={villa.name}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-extrabold text-ink">{villa.name}</h1>
          <p className="mt-1 text-ink-muted">
            {villa.location.area}, {villa.location.town}, {villa.location.country}
          </p>

          <div className="mt-4 flex gap-4 text-sm text-ink-muted">
            <span>{villa.bedrooms} bedrooms</span>
            <span>·</span>
            <span>{villa.bathrooms} bathrooms</span>
            <span>·</span>
            <span>Up to {villa.maxGuests} guests</span>
          </div>

          <p className="mt-6 leading-relaxed text-ink">{villa.description}</p>

          <h2 className="mt-10 text-xl font-bold text-ink">Amenities</h2>
          <div className="mt-4">
            <AmenitiesList amenities={villa.amenities} />
          </div>

          <div className="mt-10">
            <AvailabilityCalendar
              busyDates={toBusyDateSet(availability.busyDates)}
              sources={availability.sources}
            />
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border p-6">
          {villa.priceIndication && (
            <p className="text-lg font-semibold text-ink">
              {villa.priceIndication.currency} {villa.priceIndication.amount}
              <span className="text-sm font-normal text-ink-muted"> /night</span>
            </p>
          )}

          <p className="mt-2 text-sm text-ink-muted">
            Reservations are handled directly on the platform below.
          </p>

          <div className="mt-4 flex flex-col gap-3">
            {villa.sources.map((source) => (
              <LinkButton
                key={source.platform}
                href={source.listingUrl}
                external
                variant={source.platform === "airbnb" ? "primary" : "secondary"}
                className="w-full"
              >
                {platformLabel[source.platform]}
              </LinkButton>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

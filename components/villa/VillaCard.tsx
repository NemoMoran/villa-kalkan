import Link from "next/link";
import type { Villa } from "@/data/villas.schema";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function VillaCard({ villa }: { villa: Villa }) {
  return (
    <Link
      href={`/villas/${villa.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg"
    >
      <PlaceholderImage
        gradient={villa.gradient}
        label={`${villa.galleryCount} photos`}
        alt={`${villa.name}, ${villa.location.area}`}
        className="aspect-[4/3] w-full transition-transform duration-300 group-hover:scale-[1.02]"
      />

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-ink">{villa.name}</h3>
            <p className="text-sm text-ink-muted">
              {villa.location.area}, {villa.location.town}
            </p>
          </div>
          {villa.priceIndication && (
            <p className="whitespace-nowrap text-sm font-semibold text-ink">
              {villa.priceIndication.currency} {villa.priceIndication.amount}
              <span className="font-normal text-ink-muted"> /night</span>
            </p>
          )}
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-ink-muted">
          {villa.shortTagline}
        </p>

        <div className="mt-3 flex gap-3 text-xs text-ink-muted">
          <span>{villa.bedrooms} bed</span>
          <span>·</span>
          <span>{villa.bathrooms} bath</span>
          <span>·</span>
          <span>{villa.maxGuests} guests</span>
        </div>
      </div>
    </Link>
  );
}

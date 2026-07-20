import Image from "next/image";
import Link from "next/link";
import type { Villa } from "@/data/villas.schema";
import { getVillaContent } from "@/data/villas";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type VillaCardDict = Dictionary["villaCard"];

export function VillaCard({
  villa,
  lang,
  dict,
}: {
  villa: Villa;
  lang: Locale;
  dict: VillaCardDict;
}) {
  const content = getVillaContent(villa, lang);
  const hasSeaView = villa.amenityKeys.includes("seaView");

  return (
    <Link
      href={localeHref(lang, `/villas/${villa.slug}`)}
      className="group block overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
    >
      <div className="relative overflow-hidden">
        {villa.images.length > 0 ? (
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={villa.images[0]}
              alt={`${content.name}, ${villa.location.area}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        ) : (
          <PlaceholderImage
            gradient={villa.gradient}
            label={dict.photosLabel.replace("{count}", String(villa.galleryCount))}
            alt={`${content.name}, ${villa.location.area}`}
            className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm">
            {villa.location.area}
          </span>
          {hasSeaView && (
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-brand-dark backdrop-blur-sm">
              {dict.seaViewBadge}
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg text-ink">{content.name}</h3>
          {villa.priceIndication && (
            <p className="whitespace-nowrap pt-1 text-sm font-semibold text-ink">
              {villa.priceIndication.currency} {villa.priceIndication.amount}
              <span className="font-normal text-ink-muted"> {dict.nightSuffix}</span>
            </p>
          )}
        </div>

        <p className="mt-1 line-clamp-2 text-sm text-ink-muted">
          {content.shortTagline}
        </p>

        <div className="mt-4 flex gap-3 border-t border-border pt-4 text-xs text-ink-muted">
          <span>
            {villa.bedrooms} {dict.bedroomsSuffix}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {villa.bathrooms} {dict.bathsSuffix}
          </span>
          <span aria-hidden="true">·</span>
          <span>{dict.upToGuests.replace("{count}", String(villa.maxGuests))}</span>
        </div>
      </div>
    </Link>
  );
}

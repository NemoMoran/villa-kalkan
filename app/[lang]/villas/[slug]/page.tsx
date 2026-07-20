import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { villas, getVillaBySlug, getVillaContent } from "@/data/villas";
import { getVillasWithImages, getVillaWithImagesBySlug } from "@/data/villaImages";
import { VillaGallery } from "@/components/villa/VillaGallery";
import { VillaCard } from "@/components/villa/VillaCard";
import { AmenitiesList } from "@/components/villa/AmenitiesList";
import { AvailabilityCalendar } from "@/components/villa/AvailabilityCalendar";
import { LinkButton } from "@/components/ui/Button";
import { getVillaAvailability } from "@/lib/ical/getVillaAvailability";
import { toBusyDateSet } from "@/lib/ical/mergeBusyDates";
import type { VillaAvailability } from "@/lib/ical/types";
import { hasLocale, localeHref } from "@/lib/i18n/config";
import { getDictionary } from "../../dictionaries";

export async function generateStaticParams() {
  return villas.map((villa) => ({ slug: villa.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const villa = getVillaBySlug(slug);
  if (!villa) return {};

  const content = getVillaContent(villa, lang);
  return {
    title: content.name,
    description: content.shortTagline,
  };
}

export default async function VillaDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const villa = getVillaWithImagesBySlug(slug);
  if (!villa) notFound();

  const dict = await getDictionary(lang);
  const content = getVillaContent(villa, lang);

  const platformLabel: Record<string, string> = {
    airbnb: dict.villaDetail.bookOn.airbnb,
    booking: dict.villaDetail.bookOn.booking,
  };

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

  const similar = getVillasWithImages()
    .filter((v) => v.slug !== villa.slug)
    .sort((a, b) => {
      const sameAreaA = a.location.area === villa.location.area ? 0 : 1;
      const sameAreaB = b.location.area === villa.location.area ? 0 : 1;
      return sameAreaA - sameAreaB;
    })
    .slice(0, 3);

  const [areaBefore, areaAfter] = dict.villaDetail.areaDescription
    .replace("{area}", villa.location.area)
    .split("{guideLink}");

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <nav className="mb-6 text-sm text-ink-muted" aria-label="Breadcrumb">
        <Link href={localeHref(lang, "/villas")} className="transition-colors hover:text-ink">
          {dict.villaDetail.allVillas}
        </Link>
      </nav>

      <VillaGallery
        images={villa.images}
        gradient={villa.gradient}
        count={villa.galleryCount}
        villaName={content.name}
        dict={dict.villaDetail}
      />

      <div className="mt-10 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {villa.location.area} · {villa.location.town}
          </p>
          <h1 className="font-display mt-2 text-4xl text-ink">{content.name}</h1>
          <p className="mt-2 text-lg text-ink-muted">{content.shortTagline}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              `${villa.bedrooms} ${dict.villaDetail.bedroomsSuffix}`,
              `${villa.bathrooms} ${dict.villaDetail.bathroomsSuffix}`,
              dict.villaDetail.upToGuests.replace("{count}", String(villa.maxGuests)),
            ].map((fact) => (
              <span
                key={fact}
                className="rounded-full bg-surface-muted px-4 py-1.5 text-sm text-ink"
              >
                {fact}
              </span>
            ))}
          </div>

          <p className="mt-8 leading-relaxed text-ink">{content.description}</p>

          <h2 className="font-display mt-12 text-2xl text-ink">
            {dict.villaDetail.amenitiesHeading}
          </h2>
          <div className="mt-5">
            <AmenitiesList amenityKeys={villa.amenityKeys} dict={dict.amenities} />
          </div>

          <div className="mt-12">
            <AvailabilityCalendar
              busyDates={toBusyDateSet(availability.busyDates)}
              sources={availability.sources}
              lang={lang}
              dict={dict.availability}
            />
          </div>

          <h2 className="font-display mt-12 text-2xl text-ink">
            {dict.villaDetail.theAreaHeading}
          </h2>
          <p className="mt-4 leading-relaxed text-ink-muted">
            {areaBefore}
            <Link
              href={localeHref(lang, "/guide")}
              className="font-medium text-brand-dark underline underline-offset-2"
            >
              {dict.villaDetail.guideLinkText}
            </Link>
            {areaAfter}
          </p>
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-lg shadow-navy/5">
            {villa.priceIndication ? (
              <p className="font-display text-2xl text-ink">
                {villa.priceIndication.currency} {villa.priceIndication.amount}
                <span className="font-sans text-sm font-normal text-ink-muted">
                  {" "}
                  {dict.villaDetail.nightSuffix}
                </span>
              </p>
            ) : (
              <p className="font-display text-xl text-ink">
                {dict.villaDetail.priceOnRequest}
              </p>
            )}

            <p className="mt-2 text-sm text-ink-muted">
              {dict.villaDetail.reservationsNote}
            </p>

            <div className="mt-5 flex flex-col gap-3">
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

            <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
              {dict.villaDetail.trustPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-xs text-ink-muted"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 shrink-0 text-brand"
                    aria-hidden="true"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-center text-xs text-ink-muted">
            {dict.villaDetail.questionsFirst}{" "}
            <Link
              href={localeHref(lang, "/contact")}
              className="font-medium text-brand-dark underline underline-offset-2"
            >
              {dict.villaDetail.askAboutVilla}
            </Link>
          </p>
        </aside>
      </div>

      {similar.length > 0 && (
        <div className="mt-20 border-t border-border pt-14">
          <h2 className="font-display text-2xl text-ink">
            {dict.villaDetail.youMayAlsoLike}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((v) => (
              <VillaCard key={v.slug} villa={v} lang={lang} dict={dict.villaCard} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

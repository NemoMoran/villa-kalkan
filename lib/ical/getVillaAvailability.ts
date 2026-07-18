import { getVillaBySlug } from "@/data/villas";
import { fetchCalendar } from "./fetchCalendar";
import { mergeBusyDates } from "./mergeBusyDates";
import type { BusyRange, SourceStatus, VillaAvailability } from "./types";

/**
 * Looks up a villa's Airbnb/Booking.com iCal feeds, fetches them in
 * parallel, and merges the busy dates into one list. A feed that's missing
 * (`icalUrl: null`) is `not_configured`, not an error. A feed that fails to
 * fetch/parse is `error` but never blocks the other source or throws.
 */
export async function getVillaAvailability(
  slug: string
): Promise<VillaAvailability | null> {
  const villa = getVillaBySlug(slug);
  if (!villa) return null;

  const perSourceResults = await Promise.all(
    villa.sources.map(async (source) => {
      if (!source.icalUrl) {
        return {
          platform: source.platform,
          status: "not_configured" as SourceStatus,
          busyDates: [] as BusyRange[],
        };
      }

      const result = await fetchCalendar(source.icalUrl);

      return result.ok
        ? {
            platform: source.platform,
            status: "ok" as SourceStatus,
            busyDates: result.busyDates,
          }
        : {
            platform: source.platform,
            status: "error" as SourceStatus,
            busyDates: [] as BusyRange[],
          };
    })
  );

  const sources: VillaAvailability["sources"] = {
    airbnb: "not_configured",
    booking: "not_configured",
  };
  const allRanges: BusyRange[] = [];

  for (const result of perSourceResults) {
    sources[result.platform] = result.status;
    allRanges.push(...result.busyDates);
  }

  return {
    slug,
    busyDates: mergeBusyDates(allRanges),
    sources,
    generatedAt: new Date().toISOString(),
  };
}

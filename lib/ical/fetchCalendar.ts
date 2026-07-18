import * as ical from "node-ical";
import type { BusyRange } from "./types";

const FETCH_TIMEOUT_MS = 8000;
const REVALIDATE_SECONDS = 3600;

export type FetchCalendarResult =
  | { ok: true; busyDates: BusyRange[] }
  | { ok: false; error: string };

/**
 * Fetches and parses a single .ics calendar feed. Never throws — any
 * network error, timeout, non-200 response, or malformed calendar is
 * caught and returned as `{ ok: false }` so a dead feed can never crash
 * a page render.
 */
export async function fetchCalendar(url: string): Promise<FetchCalendarResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    // node-ical's overloads only expose a Promise return type for the
    // single-argument call; with an options object it types as void even
    // though it returns a Promise at runtime when no callback is passed.
    const data = (await ical.async.fromURL(url, {
      signal: controller.signal,
      next: { revalidate: REVALIDATE_SECONDS },
    })) as unknown as ical.CalendarResponse;

    const busyDates: BusyRange[] = Object.values(data)
      .filter(
        (component): component is ical.VEvent =>
          !!component && component.type === "VEVENT"
      )
      .filter((event) => event.start && event.end)
      .map((event) => ({
        start: new Date(event.start),
        end: new Date(event.end as Date),
      }));

    return { ok: true, busyDates };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown calendar fetch error",
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

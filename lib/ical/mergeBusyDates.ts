import type { BusyRange } from "./types";

/**
 * Unions overlapping/touching busy ranges (e.g. from Airbnb + Booking.com)
 * into a sorted, non-overlapping list. Ranges that touch (one ends the same
 * day the next starts — a common back-to-back booking) are merged too.
 */
export function mergeBusyDates(ranges: BusyRange[]): BusyRange[] {
  if (ranges.length === 0) return [];

  const sorted = [...ranges].sort(
    (a, b) => a.start.getTime() - b.start.getTime()
  );

  const merged: BusyRange[] = [{ ...sorted[0] }];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];

    if (current.start.getTime() <= last.end.getTime()) {
      if (current.end.getTime() > last.end.getTime()) {
        last.end = current.end;
      }
    } else {
      merged.push({ ...current });
    }
  }

  return merged;
}

/**
 * Expands merged ranges into a set of ISO date strings (YYYY-MM-DD) for
 * O(1) lookup by the calendar UI. `end` is treated as exclusive (checkout day).
 */
export function toBusyDateSet(ranges: BusyRange[]): Set<string> {
  const dates = new Set<string>();

  for (const range of ranges) {
    const cursor = new Date(
      Date.UTC(
        range.start.getUTCFullYear(),
        range.start.getUTCMonth(),
        range.start.getUTCDate()
      )
    );
    const end = new Date(
      Date.UTC(
        range.end.getUTCFullYear(),
        range.end.getUTCMonth(),
        range.end.getUTCDate()
      )
    );

    while (cursor.getTime() < end.getTime()) {
      dates.add(cursor.toISOString().slice(0, 10));
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
  }

  return dates;
}

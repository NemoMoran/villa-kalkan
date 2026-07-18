import { describe, it, expect } from "vitest";
import { mergeBusyDates, toBusyDateSet } from "../lib/ical/mergeBusyDates";

const d = (s: string) => new Date(s);

describe("mergeBusyDates", () => {
  it("returns empty array for empty input", () => {
    expect(mergeBusyDates([])).toEqual([]);
  });

  it("keeps disjoint ranges separate", () => {
    const ranges = [
      { start: d("2024-01-01"), end: d("2024-01-05") },
      { start: d("2024-02-01"), end: d("2024-02-05") },
    ];
    expect(mergeBusyDates(ranges)).toHaveLength(2);
  });

  it("merges overlapping ranges from different sources", () => {
    const ranges = [
      { start: d("2024-01-01"), end: d("2024-01-10") },
      { start: d("2024-01-05"), end: d("2024-01-15") },
    ];
    const merged = mergeBusyDates(ranges);
    expect(merged).toHaveLength(1);
    expect(merged[0].start).toEqual(d("2024-01-01"));
    expect(merged[0].end).toEqual(d("2024-01-15"));
  });

  it("merges adjacent/touching ranges (checkout day = checkin day)", () => {
    const ranges = [
      { start: d("2024-01-01"), end: d("2024-01-05") },
      { start: d("2024-01-05"), end: d("2024-01-10") },
    ];
    const merged = mergeBusyDates(ranges);
    expect(merged).toHaveLength(1);
    expect(merged[0].end).toEqual(d("2024-01-10"));
  });

  it("passes through a single-source villa unaffected", () => {
    const ranges = [{ start: d("2024-03-01"), end: d("2024-03-04") }];
    expect(mergeBusyDates(ranges)).toEqual(ranges);
  });

  it("is order-independent", () => {
    const ranges = [
      { start: d("2024-02-01"), end: d("2024-02-05") },
      { start: d("2024-01-01"), end: d("2024-01-05") },
    ];
    const merged = mergeBusyDates(ranges);
    expect(merged[0].start).toEqual(d("2024-01-01"));
    expect(merged[1].start).toEqual(d("2024-02-01"));
  });
});

describe("toBusyDateSet", () => {
  it("expands a range into individual ISO date strings, end exclusive", () => {
    const set = toBusyDateSet([
      { start: d("2024-01-01"), end: d("2024-01-04") },
    ]);
    expect([...set].sort()).toEqual([
      "2024-01-01",
      "2024-01-02",
      "2024-01-03",
    ]);
  });

  it("returns an empty set for no ranges", () => {
    expect(toBusyDateSet([])).toEqual(new Set());
  });
});

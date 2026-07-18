import { describe, it, expect, vi, afterEach } from "vitest";
import { readFileSync } from "fs";
import path from "path";
import { fetchCalendar } from "../lib/ical/fetchCalendar";

const validIcs = readFileSync(
  path.join(__dirname, "fixtures/valid.ics"),
  "utf-8"
);

describe("fetchCalendar", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("parses a valid .ics feed into busy ranges", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(validIcs, { status: 200 }))
    );

    const result = await fetchCalendar("https://example.com/cal.ics");

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.busyDates).toHaveLength(2);
      expect(result.busyDates[0].start.getTime()).toBeLessThan(
        result.busyDates[0].end.getTime()
      );
    }
  });

  it("returns ok:false on a non-200 response instead of throwing", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response("not found", { status: 404, statusText: "Not Found" })
      )
    );

    const result = await fetchCalendar("https://example.com/missing.ics");

    expect(result.ok).toBe(false);
  });

  it("returns ok:false on a network failure instead of throwing", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network down");
      })
    );

    const result = await fetchCalendar("https://example.com/cal.ics");

    expect(result.ok).toBe(false);
  });

  it("never throws on malformed calendar content", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("not a real calendar", { status: 200 }))
    );

    await expect(
      fetchCalendar("https://example.com/broken.ics")
    ).resolves.toBeDefined();
  });
});

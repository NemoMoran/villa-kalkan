import { Badge } from "@/components/ui/Badge";
import type { SourceStatus } from "@/lib/ical/types";

type Platform = "airbnb" | "booking";

type AvailabilityCalendarProps = {
  busyDates: Set<string>;
  sources: Record<Platform, SourceStatus>;
};

const statusMeta: Record<
  SourceStatus,
  { text: string; tone: "success" | "warning" | "neutral" }
> = {
  ok: { text: "synced", tone: "success" },
  error: { text: "temporarily unavailable", tone: "warning" },
  not_configured: { text: "not connected", tone: "neutral" },
};

const platformName: Record<Platform, string> = {
  airbnb: "Airbnb",
  booking: "Booking.com",
};

function buildMonthMatrix(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(Date.UTC(year, month, 1));
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const startWeekday = (firstDay.getUTCDay() + 6) % 7; // Monday-first

  const cells: (Date | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) =>
      new Date(Date.UTC(year, month, i + 1))
    ),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function toIso(date: Date) {
  return date.toISOString().slice(0, 10);
}

function MonthGrid({
  year,
  month,
  busyDates,
}: {
  year: number;
  month: number;
  busyDates: Set<string>;
}) {
  const weeks = buildMonthMatrix(year, month);
  const monthLabel = new Date(Date.UTC(year, month, 1)).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric", timeZone: "UTC" }
  );

  return (
    <div>
      <p className="text-sm font-semibold text-ink">{monthLabel}</p>
      <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[11px] text-ink-muted">
        {["M", "T", "W", "T", "F", "S", "S"].map((label, i) => (
          <span key={i}>{label}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {weeks.flat().map((date, i) => {
          if (!date) return <div key={i} />;
          const busy = busyDates.has(toIso(date));
          return (
            <div
              key={i}
              className={`flex aspect-square items-center justify-center rounded-md text-xs ${
                busy
                  ? "bg-surface-muted text-ink-muted line-through"
                  : "text-ink"
              }`}
            >
              {date.getUTCDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AvailabilityCalendar({
  busyDates,
  sources,
}: AvailabilityCalendarProps) {
  const configured = (Object.entries(sources) as [Platform, SourceStatus][]).filter(
    ([, status]) => status !== "not_configured"
  );

  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const nextMonth = (month + 1) % 12;
  const nextYear = month === 11 ? year + 1 : year;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-xl font-bold text-ink">Availability</h2>
        {configured.map(([platform, status]) => (
          <Badge key={platform} tone={statusMeta[status].tone}>
            {platformName[platform]}: {statusMeta[status].text}
          </Badge>
        ))}
      </div>

      {configured.length === 0 ? (
        <p className="mt-3 text-sm text-ink-muted">
          Live availability will appear here once this villa is connected to
          its Airbnb or Booking.com calendar.
        </p>
      ) : (
        <div className="mt-4 grid gap-8 sm:grid-cols-2">
          <MonthGrid year={year} month={month} busyDates={busyDates} />
          <MonthGrid year={nextYear} month={nextMonth} busyDates={busyDates} />
        </div>
      )}
    </div>
  );
}

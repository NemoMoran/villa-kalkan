import { Badge } from "@/components/ui/Badge";
import type { SourceStatus } from "@/lib/ical/types";
import { localeTags, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Platform = "airbnb" | "booking";
type AvailabilityDict = Dictionary["availability"];

type AvailabilityCalendarProps = {
  busyDates: Set<string>;
  sources: Record<Platform, SourceStatus>;
  lang: Locale;
  dict: AvailabilityDict;
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
  lang,
  weekdays,
}: {
  year: number;
  month: number;
  busyDates: Set<string>;
  lang: Locale;
  weekdays: string[];
}) {
  const weeks = buildMonthMatrix(year, month);
  const monthLabel = new Date(Date.UTC(year, month, 1)).toLocaleDateString(
    localeTags[lang],
    { month: "long", year: "numeric", timeZone: "UTC" }
  );

  return (
    <div>
      <p className="text-sm font-semibold text-ink">{monthLabel}</p>
      <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[11px] text-ink-muted">
        {weekdays.map((label, i) => (
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
              className={`flex aspect-square items-center justify-center rounded-lg text-xs ${
                busy
                  ? "bg-surface-muted text-ink-muted/60 line-through"
                  : "bg-white text-ink shadow-sm"
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
  lang,
  dict,
}: AvailabilityCalendarProps) {
  const statusMeta: Record<
    SourceStatus,
    { text: string; tone: "success" | "warning" | "neutral" }
  > = {
    ok: { text: dict.statusSynced, tone: "success" },
    error: { text: dict.statusUnavailable, tone: "warning" },
    not_configured: { text: dict.statusNotConnected, tone: "neutral" },
  };

  const platformName: Record<Platform, string> = {
    airbnb: dict.platformAirbnb,
    booking: dict.platformBooking,
  };

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
        <h2 className="font-display text-2xl text-ink">{dict.heading}</h2>
        {configured.map(([platform, status]) => (
          <Badge key={platform} tone={statusMeta[status].tone}>
            {platformName[platform]}: {statusMeta[status].text}
          </Badge>
        ))}
      </div>

      {configured.length === 0 ? (
        <p className="mt-3 text-sm text-ink-muted">{dict.emptyState}</p>
      ) : (
        <>
          <div className="mt-4 grid gap-8 rounded-3xl border border-border bg-surface-muted/40 p-6 sm:grid-cols-2">
            <MonthGrid
              year={year}
              month={month}
              busyDates={busyDates}
              lang={lang}
              weekdays={dict.weekdays}
            />
            <MonthGrid
              year={nextYear}
              month={nextMonth}
              busyDates={busyDates}
              lang={lang}
              weekdays={dict.weekdays}
            />
          </div>
          <div className="mt-3 flex gap-5 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-white shadow-sm ring-1 ring-border" />
              {dict.available}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-surface-muted ring-1 ring-border" />
              {dict.booked}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

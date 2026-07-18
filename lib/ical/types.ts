export type BusyRange = {
  start: Date;
  end: Date;
};

export type SourceStatus = "ok" | "error" | "not_configured";

export type VillaAvailability = {
  slug: string;
  busyDates: BusyRange[];
  sources: {
    airbnb: SourceStatus;
    booking: SourceStatus;
  };
  generatedAt: string;
};

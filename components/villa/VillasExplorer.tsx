"use client";

import { useMemo, useState } from "react";
import type { AmenityKey, Villa } from "@/data/villas.schema";
import { VillaCard } from "@/components/villa/VillaCard";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type SortOrder = "featured" | "price-asc" | "price-desc";
type ExplorerDict = Dictionary["villasExplorer"];

function villaHasFeature(villa: Villa, key: AmenityKey) {
  return villa.amenityKeys.includes(key);
}

export function VillasExplorer({
  villas,
  lang,
  dict,
  villaCardDict,
}: {
  villas: Villa[];
  lang: Locale;
  dict: ExplorerDict;
  villaCardDict: Dictionary["villaCard"];
}) {
  const featureFilters: { key: AmenityKey; label: string }[] = [
    { key: "seaView", label: dict.featureFilters.seaView },
    { key: "privateInfinityPool", label: dict.featureFilters.privateInfinityPool },
    { key: "garden", label: dict.featureFilters.garden },
    { key: "bbq", label: dict.featureFilters.bbq },
  ];

  const [area, setArea] = useState("all");
  const [minGuests, setMinGuests] = useState(0);
  const [features, setFeatures] = useState<AmenityKey[]>([]);
  const [sort, setSort] = useState<SortOrder>("featured");

  const areas = useMemo(
    () => [...new Set(villas.map((v) => v.location.area))].sort(),
    [villas]
  );

  const filtered = useMemo(() => {
    const result = villas.filter((villa) => {
      if (area !== "all" && villa.location.area !== area) return false;
      if (villa.maxGuests < minGuests) return false;
      return features.every((key) => villaHasFeature(villa, key));
    });

    if (sort === "price-asc" || sort === "price-desc") {
      const direction = sort === "price-asc" ? 1 : -1;
      result.sort((a, b) => {
        const priceA = a.priceIndication?.amount ?? null;
        const priceB = b.priceIndication?.amount ?? null;
        // Villas without a published price sink to the bottom either way.
        if (priceA === null && priceB === null) return 0;
        if (priceA === null) return 1;
        if (priceB === null) return -1;
        return (priceA - priceB) * direction;
      });
    }

    return result;
  }, [villas, area, minGuests, features, sort]);

  function toggleFeature(key: AmenityKey) {
    setFeatures((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  }

  function reset() {
    setArea("all");
    setMinGuests(0);
    setFeatures([]);
    setSort("featured");
  }

  const selectClasses =
    "rounded-full border border-border bg-surface px-4 py-2 text-sm text-ink outline-none focus:border-brand-dark";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="sr-only" htmlFor="filter-area">
          {dict.areaLabel}
        </label>
        <select
          id="filter-area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className={selectClasses}
        >
          <option value="all">{dict.allAreas}</option>
          {areas.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="filter-guests">
          {dict.guestsLabel}
        </label>
        <select
          id="filter-guests"
          value={minGuests}
          onChange={(e) => setMinGuests(Number(e.target.value))}
          className={selectClasses}
        >
          <option value={0}>{dict.anyGroupSize}</option>
          {[4, 6, 8, 10, 12].map((n) => (
            <option key={n} value={n}>
              {n}
              {dict.guestsSuffix}
            </option>
          ))}
        </select>

        {featureFilters.map((feature) => {
          const active = features.includes(feature.key);
          return (
            <button
              key={feature.key}
              type="button"
              onClick={() => toggleFeature(feature.key)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-brand-dark bg-brand-dark text-white"
                  : "border-border bg-surface text-ink-muted hover:border-ink"
              }`}
            >
              {feature.label}
            </button>
          );
        })}

        <div className="ml-auto">
          <label className="sr-only" htmlFor="sort-order">
            {dict.sortLabel}
          </label>
          <select
            id="sort-order"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOrder)}
            className={selectClasses}
          >
            <option value="featured">{dict.sortRecommended}</option>
            <option value="price-asc">{dict.sortPriceAsc}</option>
            <option value="price-desc">{dict.sortPriceDesc}</option>
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-muted" aria-live="polite">
        {filtered.length === 1
          ? dict.resultsOne
          : dict.resultsOther.replace("{count}", String(filtered.length))}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-border bg-surface-muted p-12 text-center">
          <p className="font-semibold text-ink">{dict.noResultsTitle}</p>
          <p className="mt-1 text-sm text-ink-muted">{dict.noResultsBody}</p>
          <Button variant="outline" className="mt-6" onClick={reset}>
            {dict.clearFilters}
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((villa) => (
            <VillaCard
              key={villa.slug}
              villa={villa}
              lang={lang}
              dict={villaCardDict}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import { getVillaFacilities } from "@/data/facilities";
import type { Villa } from "@/data/villas.schema";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export function FacilitiesList({
  villa,
  dict,
}: {
  villa: Pick<Villa, "amenityKeys">;
  dict: Dictionary["facilities"];
}) {
  const groups = getVillaFacilities(villa);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {groups.map(({ category, keys }) => (
        <div key={category}>
          <h3 className="text-sm font-semibold text-ink">{dict.categories[category]}</h3>
          <ul className="mt-3 space-y-2">
            {keys.map((key) => (
              <li key={key} className="text-sm text-ink-muted">
                {dict.items[key]}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

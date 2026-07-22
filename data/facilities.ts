import type { Villa } from "./villas.schema";

/**
 * Full "property facilities" sheet (distinct from the curated highlight
 * badges in amenityKeys). Most items are the same standard fitout across
 * every villa in the portfolio, per owner confirmation; the wellness/view
 * items still vary and are derived from each villa's own amenityKeys so we
 * never claim a sauna/hamam/view a villa doesn't have.
 */
export const facilityCategories = [
  "parking",
  "internet",
  "kitchen",
  "bedroom",
  "bathroom",
  "media",
  "roomFeatures",
  "outdoor",
  "wellness",
  "outdoorView",
  "building",
  "general",
  "familyRoom",
  "safety",
  "languages",
] as const;

export type FacilityCategory = (typeof facilityCategories)[number];

export const facilityKeysByCategory = {
  parking: ["freeParking"],
  internet: ["wifi"],
  kitchen: [
    "highchair",
    "toaster",
    "stovetop",
    "oven",
    "kitchenUtensils",
    "kettle",
    "kitchen",
    "washingMachine",
    "dishwasher",
    "fridge",
    "coffeeMaker",
    "microwave",
  ],
  bedroom: ["linens", "wardrobe"],
  bathroom: [
    "toiletPaper",
    "towels",
    "bathtubOrShower",
    "privateBathroom",
    "toilet",
    "hairDryer",
    "shower",
  ],
  media: ["flatScreenTv", "tv"],
  roomFeatures: ["closet", "vanity"],
  outdoor: [
    "outdoorDining",
    "outdoorFurniture",
    "grill",
    "privatePool",
    "balcony",
    "terrace",
    "garden",
    "outdoorPool",
  ],
  wellness: ["sunUmbrellas", "sunLoungers", "steamBath", "jacuzzi", "sauna"],
  outdoorView: ["seaView", "view"],
  building: ["standalone"],
  general: ["ac", "nonSmoking", "heating"],
  familyRoom: ["nonSmokingRoom"],
  safety: ["smokeDetector"],
  languages: ["german", "english", "turkish"],
} as const satisfies Record<FacilityCategory, readonly string[]>;

export type FacilityKey =
  (typeof facilityKeysByCategory)[FacilityCategory][number];

/** True for every villa in the portfolio, regardless of amenityKeys. */
const universalFacilityKeys = new Set<FacilityKey>([
  "freeParking",
  "wifi",
  "highchair",
  "toaster",
  "stovetop",
  "oven",
  "kitchenUtensils",
  "kettle",
  "kitchen",
  "washingMachine",
  "dishwasher",
  "fridge",
  "coffeeMaker",
  "microwave",
  "linens",
  "wardrobe",
  "toiletPaper",
  "towels",
  "bathtubOrShower",
  "privateBathroom",
  "toilet",
  "hairDryer",
  "shower",
  "flatScreenTv",
  "tv",
  "closet",
  "vanity",
  "outdoorDining",
  "outdoorFurniture",
  "grill",
  "balcony",
  "terrace",
  "garden",
  "sunUmbrellas",
  "sunLoungers",
  "standalone",
  "ac",
  "nonSmoking",
  "heating",
  "nonSmokingRoom",
  "smokeDetector",
  "german",
  "english",
  "turkish",
]);

/** Facility keys whose truth depends on the villa's own amenityKeys. */
function derivedFacilityKeys(villa: Pick<Villa, "amenityKeys">): Set<FacilityKey> {
  const amenities = new Set(villa.amenityKeys);
  const derived = new Set<FacilityKey>();

  if (amenities.has("privatePool")) {
    derived.add("privatePool");
    derived.add("outdoorPool");
  }
  if (amenities.has("jacuzzi")) derived.add("jacuzzi");
  if (amenities.has("hamam")) derived.add("steamBath");
  if (amenities.has("sauna")) derived.add("sauna");
  if (amenities.has("seaView")) derived.add("seaView");
  if (amenities.has("seaView") || amenities.has("mountainView")) derived.add("view");

  return derived;
}

/** All facility keys that apply to a given villa, grouped by category. */
export function getVillaFacilities(
  villa: Pick<Villa, "amenityKeys">
): { category: FacilityCategory; keys: FacilityKey[] }[] {
  const derived = derivedFacilityKeys(villa);

  return facilityCategories
    .map((category) => ({
      category,
      keys: (facilityKeysByCategory[category] as readonly FacilityKey[]).filter(
        (key) => universalFacilityKeys.has(key) || derived.has(key)
      ),
    }))
    .filter((group) => group.keys.length > 0);
}

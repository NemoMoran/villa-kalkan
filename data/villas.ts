import type { Villa } from "./villas.schema";
import { villasSchema } from "./villas.schema";

/**
 * Placeholder villa content. Replace names/descriptions/amenities with real
 * copy, and fill in each source's `listingUrl` + `icalUrl` with the villa's
 * real Airbnb/Booking.com listing page and calendar export link — no other
 * code changes are needed for that swap.
 */
const rawVillas: Villa[] = [
  {
    slug: "villa-yasemin",
    name: "Villa Yasemin",
    shortTagline: "Hillside infinity pool with panoramic sea views",
    location: { area: "Kalamar", town: "Kalkan", country: "Turkey" },
    description:
      "Perched above Kalamar Bay, Villa Yasemin pairs a sweeping infinity pool with uninterrupted Mediterranean views. Floor-to-ceiling glass, shaded terraces, and a private garden make it an easy base for long, sunny stays.",
    gradient: ["#ff8a65", "#ff385c"],
    galleryCount: 6,
    amenities: [
      "Private infinity pool",
      "Sea view",
      "Air conditioning",
      "Free WiFi",
      "Fully equipped kitchen",
      "Private parking",
    ],
    bedrooms: 5,
    bathrooms: 5,
    maxGuests: 10,
    priceIndication: { amount: 420, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
    featured: true,
  },
  {
    slug: "villa-deniz",
    name: "Villa Deniz",
    shortTagline: "Steps from the water in a quiet cove",
    location: { area: "Kalkan Bay", town: "Kalkan", country: "Turkey" },
    description:
      "Villa Deniz sits just above a quiet cove a short walk from the sea. Bright, breezy rooms open onto a poolside terrace built for long lunches and late swims.",
    gradient: ["#4fb6c9", "#2f7d9f"],
    galleryCount: 5,
    amenities: [
      "Private pool",
      "Sea view",
      "Free WiFi",
      "Fully equipped kitchen",
      "BBQ area",
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    priceIndication: { amount: 340, currency: "EUR", per: "night" },
    sources: [{ platform: "airbnb", listingUrl: "#", icalUrl: null }],
    featured: true,
  },
  {
    slug: "villa-zeytin",
    name: "Villa Zeytin",
    shortTagline: "Tucked among centuries-old olive groves",
    location: { area: "Islamlar", town: "Kalkan", country: "Turkey" },
    description:
      "Surrounded by olive groves in the hills above Kalkan, Villa Zeytin offers a calmer, greener stay with mountain air and valley views, ten minutes from the beach by car.",
    gradient: ["#9caf6b", "#5d7a3f"],
    galleryCount: 5,
    amenities: [
      "Private pool",
      "Mountain view",
      "Air conditioning",
      "Free WiFi",
      "Private parking",
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    priceIndication: { amount: 260, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
  },
  {
    slug: "villa-akdeniz",
    name: "Villa Akdeniz",
    shortTagline: "Panoramic Mediterranean views from every room",
    location: { area: "Kalkan Center", town: "Kalkan", country: "Turkey" },
    description:
      "A modern villa built around its view, Villa Akdeniz looks straight out over the Mediterranean from an elevated infinity pool deck. Walking distance to Kalkan's harbour restaurants.",
    gradient: ["#ffb74d", "#ff385c"],
    galleryCount: 7,
    amenities: [
      "Private infinity pool",
      "Sea view",
      "Air conditioning",
      "Free WiFi",
      "Fully equipped kitchen",
      "Daily housekeeping (on request)",
    ],
    bedrooms: 6,
    bathrooms: 6,
    maxGuests: 12,
    priceIndication: { amount: 520, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
    featured: true,
  },
  {
    slug: "villa-lavanta",
    name: "Villa Lavanta",
    shortTagline: "A quiet hillside retreat surrounded by lavender",
    location: { area: "Kalamar", town: "Kalkan", country: "Turkey" },
    description:
      "Villa Lavanta is a peaceful hideaway with lavender-lined terraces and a private pool shaded by pine trees — ideal for travelers who want quiet over nightlife, without straying far from town.",
    gradient: ["#b39ddb", "#7e57c2"],
    galleryCount: 5,
    amenities: [
      "Private pool",
      "Garden",
      "Air conditioning",
      "Free WiFi",
      "Private parking",
    ],
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    priceIndication: null,
    sources: [{ platform: "booking", listingUrl: "#", icalUrl: null }],
  },
  {
    slug: "villa-narin",
    name: "Villa Narin",
    shortTagline: "Minimalist design villa near the center",
    location: { area: "Kalkan Center", town: "Kalkan", country: "Turkey" },
    description:
      "Clean lines, an all-white palette, and a sun-drenched courtyard pool give Villa Narin a calm, minimalist feel — a short stroll from Kalkan's shops and restaurants.",
    gradient: ["#e0e0e0", "#616161"],
    galleryCount: 5,
    amenities: [
      "Private pool",
      "Air conditioning",
      "Free WiFi",
      "Fully equipped kitchen",
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    priceIndication: { amount: 300, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
  },
  {
    slug: "villa-sahil",
    name: "Villa Sahil",
    shortTagline: "Harbourside living, moments from the marina",
    location: { area: "Kalkan Harbour", town: "Kalkan", country: "Turkey" },
    description:
      "Villa Sahil puts you right at the heart of things, a five-minute walk from Kalkan's harbour, marina, and waterfront dining, with a private rooftop pool above it all.",
    gradient: ["#4dd0e1", "#00838f"],
    galleryCount: 6,
    amenities: [
      "Rooftop pool",
      "Sea view",
      "Air conditioning",
      "Free WiFi",
      "Fully equipped kitchen",
    ],
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    priceIndication: { amount: 360, currency: "EUR", per: "night" },
    sources: [{ platform: "airbnb", listingUrl: "#", icalUrl: null }],
  },
  {
    slug: "villa-mira",
    name: "Villa Mira",
    shortTagline: "Spacious family villa with a large garden",
    location: { area: "Kalamar", town: "Kalkan", country: "Turkey" },
    description:
      "Built for families and groups, Villa Mira offers generous indoor and outdoor space, a large garden for kids to run in, and a shallow end in the pool for younger swimmers.",
    gradient: ["#ffd54f", "#ff8a65"],
    galleryCount: 6,
    amenities: [
      "Private pool",
      "Garden",
      "Air conditioning",
      "Free WiFi",
      "Fully equipped kitchen",
      "Private parking",
      "BBQ area",
    ],
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    priceIndication: { amount: 380, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
  },
];

export const villas: Villa[] = villasSchema.parse(rawVillas);

export function getVillaBySlug(slug: string): Villa | undefined {
  return villas.find((villa) => villa.slug === slug);
}

export function getFeaturedVillas(): Villa[] {
  return villas.filter((villa) => villa.featured);
}

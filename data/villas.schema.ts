import { z } from "zod";
import { locales } from "@/lib/i18n/config";

export const villaSourceSchema = z.object({
  platform: z.enum(["airbnb", "booking"]),
  listingUrl: z.string(),
  icalUrl: z.string().nullable(),
});

export const amenityKeySchema = z.enum([
  "privatePool",
  "privateInfinityPool",
  "rooftopPool",
  "seaView",
  "mountainView",
  "ac",
  "wifi",
  "kitchen",
  "parking",
  "bbq",
  "garden",
  "housekeeping",
  "jacuzzi",
  "hamam",
  "sauna",
]);

export const villaContentSchema = z.object({
  name: z.string(),
  shortTagline: z.string(),
  description: z.string(),
});

export const villaSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be lowercase kebab-case"),
  content: z.object(
    Object.fromEntries(locales.map((locale) => [locale, villaContentSchema])) as Record<
      (typeof locales)[number],
      typeof villaContentSchema
    >
  ),
  location: z.object({
    area: z.string(),
    town: z.string(),
    country: z.string(),
  }),
  gradient: z.tuple([z.string(), z.string()]),
  galleryCount: z.number().int().min(1).max(12),
  /**
   * Real photo paths under /public, auto-populated from
   * public/images/villas/<slug>/ at load time — see loadVillaImages in
   * villas.ts. Falls back to the gradient placeholder when empty.
   */
  images: z.array(z.string()).default([]),
  amenityKeys: z.array(amenityKeySchema).min(1),
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().int().positive(),
  maxGuests: z.number().int().positive(),
  sizeSqm: z.number().int().positive(),
  priceIndication: z
    .object({
      amount: z.number().positive(),
      currency: z.string(),
      per: z.literal("night"),
    })
    .nullable()
    .optional(),
  sources: z.array(villaSourceSchema).min(1).max(2),
  featured: z.boolean().optional(),
});

export type VillaSource = z.infer<typeof villaSourceSchema>;
export type AmenityKey = z.infer<typeof amenityKeySchema>;
export type VillaContent = z.infer<typeof villaContentSchema>;
export type Villa = z.infer<typeof villaSchema>;
/** Raw villa literal shape, before the `images` default is applied. */
export type VillaInput = z.input<typeof villaSchema>;

export const villasSchema = z.array(villaSchema);


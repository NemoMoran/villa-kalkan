import { z } from "zod";

export const villaSourceSchema = z.object({
  platform: z.enum(["airbnb", "booking"]),
  listingUrl: z.string(),
  icalUrl: z.string().nullable(),
});

export const villaSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be lowercase kebab-case"),
  name: z.string(),
  shortTagline: z.string(),
  location: z.object({
    area: z.string(),
    town: z.string(),
    country: z.string(),
  }),
  description: z.string(),
  gradient: z.tuple([z.string(), z.string()]),
  galleryCount: z.number().int().min(1).max(12),
  amenities: z.array(z.string()).min(1),
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().int().positive(),
  maxGuests: z.number().int().positive(),
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
export type Villa = z.infer<typeof villaSchema>;

export const villasSchema = z.array(villaSchema);

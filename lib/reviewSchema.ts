import { z } from "zod";
import { locales } from "@/lib/i18n/config";

export const reviewSubmissionSchema = z.object({
  villaSlug: z.string().regex(/^[a-z0-9-]+$/),
  author: z.string().trim().min(1, "Name is required").max(80),
  rating: z.coerce.number().int().min(1).max(5),
  text: z.string().trim().min(10, "Review must be at least 10 characters").max(1000),
  locale: z.enum(locales),
  // Honeypot field: real users never fill this in; bots often do. Accept
  // any value here so a filled-in honeypot fails *silently* downstream
  // (route.ts) instead of surfacing a validation error to the bot.
  company: z.string().optional(),
});

export type ReviewSubmission = z.infer<typeof reviewSubmissionSchema>;

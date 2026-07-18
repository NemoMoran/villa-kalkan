import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
  // Honeypot field: real users never fill this in; bots often do. Accept
  // any value here so a filled-in honeypot fails *silently* downstream
  // (route.ts) instead of surfacing a validation error to the bot.
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

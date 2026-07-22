"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n/config";

type Status = "idle" | "submitting" | "success" | "error";
type ReviewFormDict = Dictionary["reviewForm"];

const STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z";

export function ReviewForm({
  villaSlug,
  lang,
  dict,
}: {
  villaSlug: string;
  lang: Locale;
  dict: ReviewFormDict;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, rating, villaSlug, locale: lang }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? dict.genericError);
      }

      setStatus("success");
      form.reset();
      setRating(5);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : dict.genericError);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-surface-muted p-6 text-center">
        <p className="font-semibold text-ink">{dict.successTitle}</p>
        <p className="mt-1 text-sm text-ink-muted">{dict.successBody}</p>
      </div>
    );
  }

  const displayRating = hoverRating ?? rating;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-border bg-surface p-6"
    >
      {/* Honeypot: hidden from real visitors, often filled in by bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <span className="text-sm font-medium text-ink">{dict.ratingLabel}</span>
        <div
          className="mt-1.5 flex gap-1"
          onMouseLeave={() => setHoverRating(null)}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              aria-label={`${value} ${dict.starsLabel}`}
              className="p-0.5"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className={value <= displayRating ? "fill-gold" : "fill-border"}
              >
                <path d={STAR_PATH} />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="review-author" className="text-sm font-medium text-ink">
          {dict.nameLabel}
        </label>
        <input
          id="review-author"
          name="author"
          type="text"
          required
          maxLength={80}
          className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-dark"
        />
      </div>

      <div>
        <label htmlFor="review-text" className="text-sm font-medium text-ink">
          {dict.textLabel}
        </label>
        <textarea
          id="review-text"
          name="text"
          required
          minLength={10}
          maxLength={1000}
          rows={4}
          className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-dark"
        />
      </div>

      {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}

      <Button type="submit" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? dict.sending : dict.send}
      </Button>

      <p className="text-xs text-ink-muted">{dict.moderationNote}</p>
    </form>
  );
}

"use client";

import { useState } from "react";
import type { StoredReview } from "@/lib/reviewsDb";

const STAR_PATH = "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z";
const VISIBLE_COUNT = 6;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          className={i < rating ? "fill-gold" : "fill-border"}
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

export function ReviewsList({
  reviews,
  showAllLabel,
  showFewerLabel,
}: {
  reviews: StoredReview[];
  showAllLabel: string;
  showFewerLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);

  if (reviews.length === 0) return null;

  const hasMore = reviews.length > VISIBLE_COUNT;
  const visible = expanded ? reviews : reviews.slice(0, VISIBLE_COUNT);

  return (
    <div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {visible.map((review) => (
          <li key={review.id} className="rounded-2xl border border-border bg-surface p-5">
            <Stars rating={review.rating} />
            <p className="mt-3 text-sm leading-relaxed text-ink">&ldquo;{review.text}&rdquo;</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
              {review.author}
            </p>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="mt-5 text-sm font-semibold text-brand-dark underline underline-offset-2"
        >
          {expanded ? showFewerLabel : showAllLabel.replace("{count}", String(reviews.length))}
        </button>
      )}
    </div>
  );
}

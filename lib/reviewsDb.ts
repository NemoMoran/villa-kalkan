import "server-only";
import { sql } from "@vercel/postgres";
import type { Locale } from "@/lib/i18n/config";

export type StoredReview = {
  id: number;
  villaSlug: string;
  author: string;
  rating: number;
  text: string;
  locale: Locale;
  status: "pending" | "approved";
  createdAt: string;
};

type ReviewRow = {
  id: number;
  villa_slug: string;
  author: string;
  rating: number;
  text: string;
  locale: string;
  status: string;
  created_at: string;
};

function mapRow(row: ReviewRow): StoredReview {
  return {
    id: row.id,
    villaSlug: row.villa_slug,
    author: row.author,
    rating: row.rating,
    text: row.text,
    locale: row.locale as Locale,
    status: row.status as StoredReview["status"],
    createdAt: row.created_at,
  };
}

/**
 * Reads never throw — the reviews section just renders empty until the
 * `reviews` table exists (see the CREATE TABLE snippet in the setup notes).
 */
export async function getApprovedReviews(villaSlug: string): Promise<StoredReview[]> {
  try {
    const { rows } = await sql<ReviewRow>`
      SELECT id, villa_slug, author, rating, text, locale, status, created_at
      FROM reviews
      WHERE villa_slug = ${villaSlug} AND status = 'approved'
      ORDER BY created_at DESC
    `;
    return rows.map(mapRow);
  } catch {
    return [];
  }
}

export async function getPendingReviews(): Promise<StoredReview[]> {
  try {
    const { rows } = await sql<ReviewRow>`
      SELECT id, villa_slug, author, rating, text, locale, status, created_at
      FROM reviews
      WHERE status = 'pending'
      ORDER BY created_at ASC
    `;
    return rows.map(mapRow);
  } catch {
    return [];
  }
}

export async function createReview(input: {
  villaSlug: string;
  author: string;
  rating: number;
  text: string;
  locale: string;
}): Promise<void> {
  await sql`
    INSERT INTO reviews (villa_slug, author, rating, text, locale, status)
    VALUES (${input.villaSlug}, ${input.author}, ${input.rating}, ${input.text}, ${input.locale}, 'pending')
  `;
}

export async function approveReview(id: number): Promise<void> {
  await sql`UPDATE reviews SET status = 'approved' WHERE id = ${id}`;
}

export async function deleteReview(id: number): Promise<void> {
  await sql`DELETE FROM reviews WHERE id = ${id}`;
}

import { revalidatePath } from "next/cache";
import {
  getPendingReviews,
  getAllApprovedReviews,
  approveReview,
  deleteReview,
  type StoredReview,
} from "@/lib/reviewsDb";
import { getVillaBySlug, getVillaContent } from "@/data/villas";

export const metadata = {
  robots: { index: false, follow: false },
};

// Pending/approved reviews change whenever someone submits or you moderate
// one — this can't be statically prerendered or changes wouldn't show up
// until a redeploy.
export const dynamic = "force-dynamic";

async function approveAction(formData: FormData) {
  "use server";
  await approveReview(Number(formData.get("id")));
  revalidatePath("/[lang]/admin/reviews", "page");
}

async function deleteAction(formData: FormData) {
  "use server";
  await deleteReview(Number(formData.get("id")));
  revalidatePath("/[lang]/admin/reviews", "page");
}

function villaNameFor(slug: string): string {
  const villa = getVillaBySlug(slug);
  return villa ? getVillaContent(villa, "en").name : slug;
}

function ReviewCard({ review, showApprove }: { review: StoredReview; showApprove: boolean }) {
  return (
    <li className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">
        {villaNameFor(review.villaSlug)} · {review.locale.toUpperCase()} ·{" "}
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink">&ldquo;{review.text}&rdquo;</p>
      <p className="mt-2 text-xs text-ink-muted">
        {review.author} — {review.rating}/5
      </p>
      <div className="mt-4 flex gap-3">
        {showApprove && (
          <form action={approveAction}>
            <input type="hidden" name="id" value={review.id} />
            <button
              type="submit"
              className="rounded-full bg-brand-dark px-4 py-1.5 text-xs font-semibold text-white hover:brightness-110"
            >
              Approve
            </button>
          </form>
        )}
        <form action={deleteAction}>
          <input type="hidden" name="id" value={review.id} />
          <button
            type="submit"
            className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-ink hover:border-ink"
          >
            Delete
          </button>
        </form>
      </div>
    </li>
  );
}

export default async function AdminReviewsPage() {
  const [pending, approved] = await Promise.all([getPendingReviews(), getAllApprovedReviews()]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-display text-3xl text-ink">Pending reviews</h1>
      <p className="mt-2 text-sm text-ink-muted">
        {pending.length} waiting for approval. Approved reviews go live on the villa&apos;s page
        immediately.
      </p>

      {pending.length === 0 ? (
        <p className="mt-8 text-ink-muted">Nothing to review right now.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {pending.map((review) => (
            <ReviewCard key={review.id} review={review} showApprove />
          ))}
        </ul>
      )}

      <h2 className="font-display mt-16 text-2xl text-ink">Approved reviews</h2>
      <p className="mt-2 text-sm text-ink-muted">
        Live on the site. Delete removes it immediately.
      </p>

      {approved.length === 0 ? (
        <p className="mt-8 text-ink-muted">No approved reviews yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {approved.map((review) => (
            <ReviewCard key={review.id} review={review} showApprove={false} />
          ))}
        </ul>
      )}
    </div>
  );
}

import { NextResponse } from "next/server";
import { reviewSubmissionSchema } from "@/lib/reviewSchema";
import { createReview } from "@/lib/reviewsDb";
import { getVillaBySlug } from "@/data/villas";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = reviewSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { villaSlug, author, rating, text, locale, company } = parsed.data;

  // Honeypot triggered — pretend success so bots don't learn it was rejected.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!getVillaBySlug(villaSlug)) {
    return NextResponse.json({ error: "Unknown villa" }, { status: 400 });
  }

  try {
    await createReview({ villaSlug, author, rating, text, locale });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[reviews] Failed to store submission:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 502 });
  }
}

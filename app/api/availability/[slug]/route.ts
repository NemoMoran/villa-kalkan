import { NextResponse } from "next/server";
import { getVillaAvailability } from "@/lib/ical/getVillaAvailability";

export async function generateStaticParams() {
  return [];
}

/**
 * Debug/QA endpoint: GET /api/availability/<slug> to inspect the merged
 * busy-date computation for a villa without going through the UI.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const availability = await getVillaAvailability(slug);

  if (!availability) {
    return NextResponse.json({ error: "Villa not found" }, { status: 404 });
  }

  return NextResponse.json(availability);
}

import { LinkButton } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function Hero() {
  return (
    <section className="relative">
      <PlaceholderImage
        gradient={["#ff8a65", "#ff385c"]}
        className="h-[60vh] min-h-[420px] w-full"
      />
      <div className="absolute inset-0 flex items-center bg-black/25">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Luxury villas in Kalkan, yours for the stay
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Hand-picked villas with private pools and sea views. Browse the
              collection, check real availability, and book directly on
              Airbnb or Booking.com.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/villas" variant="primary">
                Browse villas
              </LinkButton>
              <LinkButton href="/contact" variant="outline-light">
                Get in touch
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

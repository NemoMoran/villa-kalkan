import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Villa Kalkan about a villa or a stay.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-extrabold text-ink">Contact Us</h1>
      <p className="mt-2 max-w-xl text-ink-muted">
        Have a question about a villa, a group booking, or dates you don&apos;t
        see reflected yet? Send us a message and we&apos;ll get back to you.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="max-w-md">
          <ContactForm />
        </div>

        <div className="space-y-3 text-sm text-ink-muted">
          <p className="font-semibold text-ink">Other ways to reach us</p>
          <p>hello@villa-kalkan.net</p>
          <p>+90 000 000 00 00</p>
          <p>Kalkan, Antalya, Turkey</p>
        </div>
      </div>
    </div>
  );
}

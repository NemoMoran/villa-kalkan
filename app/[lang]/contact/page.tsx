import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact/ContactForm";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.contactPage.title, description: dict.contactPage.description };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.contactPage;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        {t.eyebrow}
      </p>
      <h1 className="font-display mt-3 text-4xl text-ink">{t.title}</h1>
      <p className="mt-3 max-w-xl text-ink-muted">{t.description}</p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="max-w-md rounded-3xl border border-border bg-surface p-8">
          <ContactForm dict={dict.contactForm} />
        </div>

        <div className="space-y-4">
          {t.channels.map((channel) => (
            <div
              key={channel.label}
              className="rounded-3xl bg-surface-muted p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                {channel.label}
              </p>
              <p className="mt-2 font-semibold text-ink">{channel.value}</p>
              <p className="mt-1 text-sm text-ink-muted">{channel.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

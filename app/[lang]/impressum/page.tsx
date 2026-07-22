import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Placeholder } from "@/components/ui/Placeholder";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: lang === "de" ? "Impressum" : "Legal Notice (Impressum)" };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const note = dict.legal.germanNoticeNote;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        {dict.footer.legalLinks.imprint}
      </p>
      <h1 className="font-display mt-3 text-4xl text-ink">
        {lang === "de" ? "Impressum" : `${dict.footer.legalLinks.imprint} (Impressum)`}
      </h1>

      {note && (
        <p className="mt-4 rounded-2xl border border-border bg-surface-muted/50 p-4 text-sm text-ink-muted">
          {note}
        </p>
      )}

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-muted">
        <section>
          <h2 className="font-display text-xl text-ink">Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</h2>
          <p className="mt-3">
            Erkan Özbasaran
            <br />
            Venloer Straße 445
            <br />
            50825 Köln, Deutschland
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Kontakt</h2>
          <p className="mt-3">
            Telefon: +49 1578 3027381
            <br />
            E-Mail: info@villa-kalkan.net
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">
            Steuernummer / Handelsregisternummer
          </h2>
          <p className="mt-3">
            <Placeholder>Steuernummer (Finanzamt) bzw. Handelsregisternummer, falls vorhanden</Placeholder>
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Verantwortlich für den Inhalt</h2>
          <p className="mt-3">Erkan Özbasaran</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Technischer Kontakt</h2>
          <p className="mt-3">
            Bei technischen Problemen mit dieser Website wenden Sie sich bitte an:
            murad@ayvaz.group
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Hinweis zu Buchungen</h2>
          <p className="mt-3">
            Diese Website dient ausschließlich der Präsentation unserer Villen. Buchungen
            und Zahlungen werden ausschließlich über die Plattformen Airbnb und
            Booking.com abgewickelt. Für den daraus entstehenden Beherbergungsvertrag
            gelten die jeweiligen Nutzungs- und Buchungsbedingungen dieser Plattformen.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Haftung für Inhalte</h2>
          <p className="mt-3">
            Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für
            die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch
            keine Gewähr übernehmen.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Haftung für Links</h2>
          <p className="mt-3">
            Diese Website enthält Links zu externen Websites Dritter (u. a. Airbnb,
            Booking.com), auf deren Inhalte wir keinen Einfluss haben. Für diese fremden
            Inhalte können wir daher keine Gewähr übernehmen; verantwortlich ist stets der
            jeweilige Anbieter der verlinkten Seite.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Streitbeilegung</h2>
          <p className="mt-3">
            Diese Website vermittelt keine eigenen Vertragsabschlüsse; wir nehmen daher
            nicht an Streitbeilegungsverfahren vor Verbraucherschlichtungsstellen teil.
            Für über Airbnb bzw. Booking.com geschlossene Verträge gelten die
            Streitbeilegungsregelungen dieser Plattformen.
          </p>
        </section>
      </div>
    </div>
  );
}

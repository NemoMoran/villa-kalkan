import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: lang === "de" ? "Datenschutzerklärung" : "Privacy Policy (Datenschutzerklärung)",
  };
}

export default async function DatenschutzPage({
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
        {dict.footer.legalLinks.privacy}
      </p>
      <h1 className="font-display mt-3 text-4xl text-ink">
        {lang === "de"
          ? "Datenschutzerklärung"
          : `${dict.footer.legalLinks.privacy} (Datenschutzerklärung)`}
      </h1>

      {note && (
        <p className="mt-4 rounded-2xl border border-border bg-surface-muted/50 p-4 text-sm text-ink-muted">
          {note}
        </p>
      )}

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-muted">
        <section>
          <h2 className="font-display text-xl text-ink">1. Verantwortlicher</h2>
          <p className="mt-3">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            <br />
            Erkan Özbasaran
            <br />
            Venloer Straße 445, 50825 Köln, Deutschland
            <br />
            E-Mail: info@villa-kalkan.net
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">2. Welche Daten wir verarbeiten</h2>
          <p className="mt-3">
            Beim Ausfüllen unseres Kontaktformulars verarbeiten wir die von Ihnen
            angegebenen Daten: Name, E-Mail-Adresse und Ihre Nachricht. Diese Angaben
            nutzen wir ausschließlich, um Ihre Anfrage zu beantworten.
          </p>
          <p className="mt-3">
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Bearbeitung einer Anfrage vor
            Vertragsschluss) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
            der Kommunikation mit Interessenten).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">3. Weiterleitung der Kontaktanfrage</h2>
          <p className="mt-3">
            Zum Versand der Kontaktanfragen per E-Mail nutzen wir den Dienstleister Resend
            (Resend, Inc., USA). Dabei kann es zu einer Übermittlung Ihrer Daten in die
            USA kommen. Weitere Informationen finden Sie in der Datenschutzerklärung von
            Resend.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">4. Verfügbarkeitsanzeige</h2>
          <p className="mt-3">
            Bei der Anzeige der Verfügbarkeit einer Villa greifen wir auf öffentlich
            freigegebene Kalenderdaten (iCal) von Airbnb bzw. Booking.com zu. Hierbei
            werden keine personenbezogenen Daten von Ihnen verarbeitet.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">5. Cookies und Tracking</h2>
          <p className="mt-3">
            Diese Website verwendet aktuell keine Analyse-, Marketing- oder
            Tracking-Cookies von Drittanbietern.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">6. Speicherdauer</h2>
          <p className="mt-3">
            Wir speichern die über das Kontaktformular übermittelten Daten nur so lange,
            wie es zur Bearbeitung Ihrer Anfrage erforderlich ist, und löschen sie
            anschließend, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">7. Ihre Rechte</h2>
          <p className="mt-3">
            Sie haben nach der DSGVO folgende Rechte bezüglich Ihrer personenbezogenen
            Daten: Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
            Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie
            Widerspruch gegen die Verarbeitung (Art. 21). Zudem haben Sie das Recht, sich
            bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">8. Externe Buchungsplattformen</h2>
          <p className="mt-3">
            Für Buchungen über Airbnb oder Booking.com gelten die jeweiligen
            Datenschutzerklärungen dieser Plattformen, da die Datenverarbeitung dort
            außerhalb unseres Einflussbereichs erfolgt.
          </p>
        </section>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { villas } from "@/data/villas";
import { VillasExplorer } from "@/components/villa/VillasExplorer";
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
  return {
    title: dict.villasPage.title,
    description: dict.villasPage.description.replace("{count}", String(villas.length)),
  };
}

export default async function VillasPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        {dict.villasPage.eyebrow}
      </p>
      <h1 className="font-display mt-3 text-4xl text-ink">{dict.villasPage.title}</h1>
      <p className="mt-3 max-w-xl text-ink-muted">
        {dict.villasPage.description.replace("{count}", String(villas.length))}
      </p>

      <div className="mt-10">
        <VillasExplorer
          villas={villas}
          lang={lang}
          dict={dict.villasExplorer}
          villaCardDict={dict.villaCard}
        />
      </div>
    </div>
  );
}

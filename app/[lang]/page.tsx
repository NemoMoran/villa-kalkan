import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedVillas } from "@/components/home/FeaturedVillas";
import { WhyKalkan } from "@/components/home/WhyKalkan";
import { GuideTeaser } from "@/components/home/GuideTeaser";
import { Reviews } from "@/components/home/Reviews";
import { CtaBand } from "@/components/home/CtaBand";
import { hasLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import { getDictionary } from "./dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={dict.home.hero} />
      <HowItWorks dict={dict.home.howItWorks} />
      <FeaturedVillas
        lang={lang}
        dict={dict.home.featuredVillas}
        villaCardDict={dict.villaCard}
      />
      <WhyKalkan dict={dict.home.whyKalkan} />
      <GuideTeaser lang={lang} dict={dict.home.guideTeaser} />
      <Reviews dict={dict.home.reviews} />
      <CtaBand lang={lang} dict={dict.home.ctaBand} />
    </>
  );
}

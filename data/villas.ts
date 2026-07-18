import type { Locale } from "@/lib/i18n/config";
import type { Villa, VillaContent } from "./villas.schema";
import { villasSchema } from "./villas.schema";

/**
 * Placeholder villa content. Replace descriptions/amenities with real copy
 * where needed, and fill in each source's `listingUrl` + `icalUrl` with the
 * villa's real Airbnb/Booking.com listing page and calendar export link —
 * no other code changes are needed for that swap.
 */
const rawVillas: Villa[] = [
  {
    slug: "villa-yasemin",
    content: {
      en: {
        name: "Villa Yasemin",
        shortTagline: "Hillside infinity pool with panoramic sea views",
        description:
          "Perched above Kalamar Bay, Villa Yasemin pairs a sweeping infinity pool with uninterrupted Mediterranean views. Floor-to-ceiling glass, shaded terraces, and a private garden make it an easy base for long, sunny stays.",
      },
      de: {
        name: "Villa Yasemin",
        shortTagline: "Infinity-Pool am Hang mit Panoramablick aufs Meer",
        description:
          "Hoch über der Bucht von Kalamar gelegen, verbindet die Villa Yasemin einen weiten Infinity-Pool mit uneingeschränktem Blick aufs Mittelmeer. Bodentiefe Fenster, schattige Terrassen und ein privater Garten machen sie zur idealen Basis für lange, sonnige Aufenthalte.",
      },
      tr: {
        name: "Villa Yasemin",
        shortTagline: "Panoramik deniz manzaralı, yamaçta sonsuzluk havuzu",
        description:
          "Kalamar Koyu'nun üzerinde yer alan Villa Yasemin, geniş bir infinity havuzu kesintisiz Akdeniz manzarasıyla buluşturuyor. Yerden tavana camlar, gölgeli teraslar ve özel bahçesiyle uzun, güneşli tatiller için ideal bir üs.",
      },
      fr: {
        name: "Villa Yasemin",
        shortTagline:
          "Piscine à débordement sur la colline avec vue panoramique sur la mer",
        description:
          "Perchée au-dessus de la baie de Kalamar, la Villa Yasemin associe une vaste piscine à débordement à une vue ininterrompue sur la Méditerranée. Baies vitrées du sol au plafond, terrasses ombragées et jardin privé en font une base idéale pour de longs séjours ensoleillés.",
      },
    },
    location: { area: "Kalamar", town: "Kalkan", country: "Turkey" },
    gradient: ["#ff8a65", "#ff385c"],
    galleryCount: 6,
    amenityKeys: [
      "privateInfinityPool",
      "seaView",
      "ac",
      "wifi",
      "kitchen",
      "parking",
    ],
    bedrooms: 5,
    bathrooms: 5,
    maxGuests: 10,
    priceIndication: { amount: 420, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
    featured: true,
  },
  {
    slug: "villa-deniz",
    content: {
      en: {
        name: "Villa Deniz",
        shortTagline: "Steps from the water in a quiet cove",
        description:
          "Villa Deniz sits just above a quiet cove a short walk from the sea. Bright, breezy rooms open onto a poolside terrace built for long lunches and late swims.",
      },
      de: {
        name: "Villa Deniz",
        shortTagline: "Wenige Schritte vom Wasser, in einer ruhigen Bucht",
        description:
          "Villa Deniz liegt nur wenige Schritte über einer ruhigen Bucht, kurz zu Fuß vom Meer entfernt. Helle, luftige Zimmer öffnen sich zu einer Poolterrasse, perfekt für lange Mittagessen und späte Schwimmzüge.",
      },
      tr: {
        name: "Villa Deniz",
        shortTagline: "Sessiz bir koyda, denize adımlar mesafede",
        description:
          "Villa Deniz, denize kısa bir yürüyüş mesafesindeki sessiz bir koyun hemen üzerinde yer alır. Aydınlık, ferah odalar; uzun öğle yemekleri ve akşamüstü yüzüşleri için tasarlanmış havuz kenarı terasına açılıyor.",
      },
      fr: {
        name: "Villa Deniz",
        shortTagline: "À deux pas de l'eau, dans une crique tranquille",
        description:
          "La Villa Deniz se trouve juste au-dessus d'une crique tranquille, à quelques pas de la mer. Des chambres claires et aérées s'ouvrent sur une terrasse au bord de la piscine, idéale pour de longs déjeuners et des baignades tardives.",
      },
    },
    location: { area: "Kalkan Bay", town: "Kalkan", country: "Turkey" },
    gradient: ["#4fb6c9", "#2f7d9f"],
    galleryCount: 5,
    amenityKeys: ["privatePool", "seaView", "wifi", "kitchen", "bbq"],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    priceIndication: { amount: 340, currency: "EUR", per: "night" },
    sources: [{ platform: "airbnb", listingUrl: "#", icalUrl: null }],
    featured: true,
  },
  {
    slug: "villa-zeytin",
    content: {
      en: {
        name: "Villa Zeytin",
        shortTagline: "Tucked among centuries-old olive groves",
        description:
          "Surrounded by olive groves in the hills above Kalkan, Villa Zeytin offers a calmer, greener stay with mountain air and valley views, ten minutes from the beach by car.",
      },
      de: {
        name: "Villa Zeytin",
        shortTagline: "Versteckt zwischen jahrhundertealten Olivenhainen",
        description:
          "Umgeben von Olivenhainen in den Hügeln über Kalkan bietet die Villa Zeytin einen ruhigeren, grüneren Aufenthalt mit Bergluft und Talblick, zehn Autominuten vom Strand entfernt.",
      },
      tr: {
        name: "Villa Zeytin",
        shortTagline: "Yüzyıllık zeytinlikler arasında saklı",
        description:
          "Kalkan'ın üzerindeki tepelerde zeytinliklerle çevrili Villa Zeytin; dağ havası ve vadi manzarasıyla daha sakin, daha yeşil bir tatil sunuyor — plaja arabayla on dakika.",
      },
      fr: {
        name: "Villa Zeytin",
        shortTagline: "Nichée parmi des oliveraies centenaires",
        description:
          "Entourée d'oliveraies dans les collines au-dessus de Kalkan, la Villa Zeytin offre un séjour plus calme et plus vert, avec air de montagne et vue sur la vallée, à dix minutes de la plage en voiture.",
      },
    },
    location: { area: "Islamlar", town: "Kalkan", country: "Turkey" },
    gradient: ["#9caf6b", "#5d7a3f"],
    galleryCount: 5,
    amenityKeys: ["privatePool", "mountainView", "ac", "wifi", "parking"],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    priceIndication: { amount: 260, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
  },
  {
    slug: "villa-akdeniz",
    content: {
      en: {
        name: "Villa Akdeniz",
        shortTagline: "Panoramic Mediterranean views from every room",
        description:
          "A modern villa built around its view, Villa Akdeniz looks straight out over the Mediterranean from an elevated infinity pool deck. Walking distance to Kalkan's harbour restaurants.",
      },
      de: {
        name: "Villa Akdeniz",
        shortTagline: "Panoramablick aufs Mittelmeer aus jedem Zimmer",
        description:
          "Eine moderne Villa, ganz auf ihre Aussicht ausgerichtet: Die Villa Akdeniz blickt von einer erhöhten Infinity-Pool-Terrasse direkt aufs Mittelmeer. Zu Fuß erreichbar sind die Hafenrestaurants von Kalkan.",
      },
      tr: {
        name: "Villa Akdeniz",
        shortTagline: "Her odadan panoramik Akdeniz manzarası",
        description:
          "Manzarası etrafında tasarlanmış modern bir villa olan Villa Akdeniz, yükseltilmiş infinity havuz terasından doğrudan Akdeniz'e bakıyor. Kalkan'ın liman restoranlarına yürüme mesafesinde.",
      },
      fr: {
        name: "Villa Akdeniz",
        shortTagline:
          "Vue panoramique sur la Méditerranée depuis chaque pièce",
        description:
          "Villa moderne conçue autour de sa vue, la Villa Akdeniz surplombe directement la Méditerranée depuis une terrasse à piscine à débordement surélevée. À quelques pas des restaurants du port de Kalkan.",
      },
    },
    location: { area: "Kalkan Center", town: "Kalkan", country: "Turkey" },
    gradient: ["#ffb74d", "#ff385c"],
    galleryCount: 7,
    amenityKeys: [
      "privateInfinityPool",
      "seaView",
      "ac",
      "wifi",
      "kitchen",
      "housekeeping",
    ],
    bedrooms: 6,
    bathrooms: 6,
    maxGuests: 12,
    priceIndication: { amount: 520, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
    featured: true,
  },
  {
    slug: "villa-lavanta",
    content: {
      en: {
        name: "Villa Lavanta",
        shortTagline: "A quiet hillside retreat surrounded by lavender",
        description:
          "Villa Lavanta is a peaceful hideaway with lavender-lined terraces and a private pool shaded by pine trees — ideal for travelers who want quiet over nightlife, without straying far from town.",
      },
      de: {
        name: "Villa Lavanta",
        shortTagline: "Ein ruhiger Rückzugsort am Hang, umgeben von Lavendel",
        description:
          "Villa Lavanta ist ein friedvoller Rückzugsort mit lavendelgesäumten Terrassen und einem von Pinien beschatteten Privatpool — ideal für Reisende, die Ruhe dem Nachtleben vorziehen, ohne weit vom Ort entfernt zu sein.",
      },
      tr: {
        name: "Villa Lavanta",
        shortTagline: "Lavanta kokulu, sessiz bir yamaç sığınağı",
        description:
          "Villa Lavanta; lavanta kokulu teraslar ve çam ağaçlarının gölgelediği özel havuzuyla huzurlu bir sığınak — gece hayatından çok sessizliği tercih eden, ama şehirden de uzaklaşmak istemeyen gezginler için ideal.",
      },
      fr: {
        name: "Villa Lavanta",
        shortTagline:
          "Une retraite tranquille sur la colline, entourée de lavande",
        description:
          "La Villa Lavanta est une retraite paisible aux terrasses bordées de lavande et à la piscine privée ombragée par des pins — idéale pour les voyageurs qui préfèrent le calme à la vie nocturne, sans s'éloigner du centre.",
      },
    },
    location: { area: "Kalamar", town: "Kalkan", country: "Turkey" },
    gradient: ["#b39ddb", "#7e57c2"],
    galleryCount: 5,
    amenityKeys: ["privatePool", "garden", "ac", "wifi", "parking"],
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    priceIndication: null,
    sources: [{ platform: "booking", listingUrl: "#", icalUrl: null }],
  },
  {
    slug: "villa-narin",
    content: {
      en: {
        name: "Villa Narin",
        shortTagline: "Minimalist design villa near the center",
        description:
          "Clean lines, an all-white palette, and a sun-drenched courtyard pool give Villa Narin a calm, minimalist feel — a short stroll from Kalkan's shops and restaurants.",
      },
      de: {
        name: "Villa Narin",
        shortTagline: "Minimalistische Design-Villa nahe dem Zentrum",
        description:
          "Klare Linien, eine komplett weiße Farbpalette und ein sonnendurchfluteter Innenhofpool verleihen der Villa Narin ein ruhiges, minimalistisches Gefühl — nur einen kurzen Spaziergang von Kalkans Geschäften und Restaurants entfernt.",
      },
      tr: {
        name: "Villa Narin",
        shortTagline: "Merkeze yakın, minimalist tasarımlı villa",
        description:
          "Sade hatlar, beyaz tonlarında bir palet ve güneşli avlu havuzu, Villa Narin'e sakin, minimalist bir hava veriyor — Kalkan'ın dükkân ve restoranlarına kısa bir yürüyüş mesafesinde.",
      },
      fr: {
        name: "Villa Narin",
        shortTagline: "Villa au design minimaliste près du centre",
        description:
          "Des lignes épurées, une palette tout en blanc et une piscine de cour baignée de soleil donnent à la Villa Narin une atmosphère calme et minimaliste — à quelques pas des boutiques et restaurants de Kalkan.",
      },
    },
    location: { area: "Kalkan Center", town: "Kalkan", country: "Turkey" },
    gradient: ["#e0e0e0", "#616161"],
    galleryCount: 5,
    amenityKeys: ["privatePool", "ac", "wifi", "kitchen"],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    priceIndication: { amount: 300, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
  },
  {
    slug: "villa-sahil",
    content: {
      en: {
        name: "Villa Sahil",
        shortTagline: "Harbourside living, moments from the marina",
        description:
          "Villa Sahil puts you right at the heart of things, a five-minute walk from Kalkan's harbour, marina, and waterfront dining, with a private rooftop pool above it all.",
      },
      de: {
        name: "Villa Sahil",
        shortTagline: "Leben am Hafen, nur Minuten von der Marina",
        description:
          "Villa Sahil bringt Sie mitten ins Geschehen — fünf Gehminuten von Kalkans Hafen, Marina und Restaurants am Wasser entfernt, mit einem privaten Dachpool über allem.",
      },
      tr: {
        name: "Villa Sahil",
        shortTagline: "Limana yakın yaşam, marinaya çok kısa mesafede",
        description:
          "Villa Sahil sizi tam merkeze taşıyor — Kalkan'ın limanına, marinasına ve sahildeki restoranlarına beş dakika yürüme mesafesinde, üstünde de özel bir çatı havuzuyla.",
      },
      fr: {
        name: "Villa Sahil",
        shortTagline: "La vie au bord du port, à deux pas de la marina",
        description:
          "La Villa Sahil vous place au cœur de l'animation, à cinq minutes à pied du port, de la marina et des restaurants en bord d'eau de Kalkan, avec une piscine privée sur le toit dominant le tout.",
      },
    },
    location: { area: "Kalkan Harbour", town: "Kalkan", country: "Turkey" },
    gradient: ["#4dd0e1", "#00838f"],
    galleryCount: 6,
    amenityKeys: ["rooftopPool", "seaView", "ac", "wifi", "kitchen"],
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    priceIndication: { amount: 360, currency: "EUR", per: "night" },
    sources: [{ platform: "airbnb", listingUrl: "#", icalUrl: null }],
  },
  {
    slug: "villa-mira",
    content: {
      en: {
        name: "Villa Mira",
        shortTagline: "Spacious family villa with a large garden",
        description:
          "Built for families and groups, Villa Mira offers generous indoor and outdoor space, a large garden for kids to run in, and a shallow end in the pool for younger swimmers.",
      },
      de: {
        name: "Villa Mira",
        shortTagline: "Großzügige Familienvilla mit weitläufigem Garten",
        description:
          "Für Familien und Gruppen gebaut, bietet die Villa Mira großzügigen Innen- und Außenbereich, einen großen Garten zum Herumtoben für Kinder und einen flachen Bereich im Pool für die jüngsten Schwimmer.",
      },
      tr: {
        name: "Villa Mira",
        shortTagline: "Geniş bahçeli, aileler için ferah villa",
        description:
          "Aileler ve gruplar için tasarlanan Villa Mira; bol iç ve dış mekân, çocukların koşabileceği geniş bir bahçe ve küçük yüzücüler için havuzda sığ bir bölüm sunuyor.",
      },
      fr: {
        name: "Villa Mira",
        shortTagline: "Villa familiale spacieuse avec un grand jardin",
        description:
          "Conçue pour les familles et les groupes, la Villa Mira offre de généreux espaces intérieurs et extérieurs, un grand jardin où les enfants peuvent courir, et une partie peu profonde dans la piscine pour les plus jeunes.",
      },
    },
    location: { area: "Kalamar", town: "Kalkan", country: "Turkey" },
    gradient: ["#ffd54f", "#ff8a65"],
    galleryCount: 6,
    amenityKeys: [
      "privatePool",
      "garden",
      "ac",
      "wifi",
      "kitchen",
      "parking",
      "bbq",
    ],
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    priceIndication: { amount: 380, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
  },
];

export const villas: Villa[] = villasSchema.parse(rawVillas);

export function getVillaBySlug(slug: string): Villa | undefined {
  return villas.find((villa) => villa.slug === slug);
}

export function getFeaturedVillas(): Villa[] {
  return villas.filter((villa) => villa.featured);
}

export function getVillaContent(villa: Villa, locale: Locale): VillaContent {
  return villa.content[locale];
}

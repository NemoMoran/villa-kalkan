import type { Locale } from "@/lib/i18n/config";
import type { Villa, VillaContent, VillaInput } from "./villas.schema";
import { villasSchema } from "./villas.schema";

/**
 * Placeholder villa content. Replace descriptions/amenities with real copy
 * where needed, and fill in each source's `listingUrl` + `icalUrl` with the
 * villa's real Airbnb/Booking.com listing page and calendar export link —
 * no other code changes are needed for that swap.
 */
const rawVillas: VillaInput[] = [
  {
    // TODO: bathrooms assumed = bedrooms (not stated in source copy, pending
    // confirmation). location/price/listing URLs still placeholder.
    slug: "villa-sur",
    content: {
      en: {
        name: "Villa Sur",
        shortTagline: "Spacious luxury villa with private pool and jacuzzi",
        description:
          "A spacious luxury villa with a private pool and jacuzzi, Villa Sur is ideal for larger families and groups looking for sea views and comfort, with four bedrooms sleeping up to eight.",
      },
      de: {
        name: "Villa Sur",
        shortTagline: "Großzügige Luxusvilla mit Privatpool und Jacuzzi",
        description:
          "Villa Sur ist eine großzügige Luxusvilla mit Privatpool und Jacuzzi – ideal für größere Familien und Gruppen, die Meerblick und Komfort suchen. Vier Schlafzimmer bieten Platz für bis zu acht Gäste.",
      },
      tr: {
        name: "Villa Sur",
        shortTagline: "Özel havuzlu ve jakuzili geniş lüks villa",
        description:
          "Villa Sur, özel havuzu ve jakuzisiyle geniş bir lüks villadır — deniz manzarası ve konfor arayan büyük aileler ve gruplar için idealdir. Dört yatak odasıyla sekiz kişiye kadar konaklama sunar.",
      },
      fr: {
        name: "Villa Sur",
        shortTagline: "Villa de luxe spacieuse avec piscine privée et jacuzzi",
        description:
          "Villa Sur est une spacieuse villa de luxe dotée d'une piscine privée et d'un jacuzzi — idéale pour les grandes familles et les groupes en quête de vue sur mer et de confort. Ses quatre chambres accueillent jusqu'à huit personnes.",
      },
    },
    location: { area: "Kalamar", town: "Kalkan", country: "Turkey" },
    gradient: ["#ff8a65", "#ff385c"],
    galleryCount: 6,
    amenityKeys: [
      "privatePool",
      "seaView",
      "ac",
      "kitchen",
      "parking",
      "bbq",
      "jacuzzi",
    ],
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    priceIndication: { amount: 420, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
    featured: true,
  },
  {
    // TODO: bathrooms assumed = bedrooms (not stated in source copy, pending
    // confirmation). location/price/listing URLs still placeholder.
    slug: "villa-sude",
    content: {
      en: {
        name: "Villa Sude",
        shortTagline: "Stylish villa with private pool and jacuzzi",
        description:
          "A stylish villa with a private pool and jacuzzi, Villa Sude is ideal for couples, newlyweds, and small groups seeking peace and privacy, with two bedrooms sleeping up to four.",
      },
      de: {
        name: "Villa Sude",
        shortTagline: "Stilvolle Villa mit Privatpool und Jacuzzi",
        description:
          "Villa Sude ist eine stilvolle Villa mit Privatpool und Jacuzzi – ideal für Paare, Frischvermählte und kleine Gruppen, die Ruhe und Privatsphäre suchen. Zwei Schlafzimmer bieten Platz für bis zu vier Gäste.",
      },
      tr: {
        name: "Villa Sude",
        shortTagline: "Özel havuzlu ve jakuzili şık villa",
        description:
          "Villa Sude, özel havuzu ve jakuzisiyle şık bir villadır — huzur ve mahremiyet arayan çiftler, yeni evliler ve küçük gruplar için idealdir. İki yatak odasıyla dört kişiye kadar konaklama sunar.",
      },
      fr: {
        name: "Villa Sude",
        shortTagline: "Villa élégante avec piscine privée et jacuzzi",
        description:
          "Villa Sude est une villa élégante dotée d'une piscine privée et d'un jacuzzi — idéale pour les couples, jeunes mariés et petits groupes en quête de calme et d'intimité. Ses deux chambres accueillent jusqu'à quatre personnes.",
      },
    },
    location: { area: "Kalkan Bay", town: "Kalkan", country: "Turkey" },
    gradient: ["#4fb6c9", "#2f7d9f"],
    galleryCount: 5,
    amenityKeys: [
      "privatePool",
      "seaView",
      "ac",
      "kitchen",
      "parking",
      "bbq",
      "jacuzzi",
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    priceIndication: { amount: 340, currency: "EUR", per: "night" },
    sources: [{ platform: "airbnb", listingUrl: "#", icalUrl: null }],
    featured: true,
  },
  {
    // TODO: bathrooms assumed = bedrooms (not stated in source copy, pending
    // confirmation). location/price/listing URLs still placeholder.
    slug: "villa-cemre",
    content: {
      en: {
        name: "Villa Cemre",
        shortTagline: "Comfortable villa with private pool and jacuzzi",
        description:
          "A comfortable villa with a private pool and jacuzzi, Villa Cemre is an excellent choice for couples, honeymooners, small families, and groups of friends, with two bedrooms sleeping up to four.",
      },
      de: {
        name: "Villa Cemre",
        shortTagline: "Komfortable Villa mit Privatpool und Jacuzzi",
        description:
          "Villa Cemre ist eine komfortable Villa mit Privatpool und Jacuzzi – eine hervorragende Wahl für Paare, Honeymoon-Gäste, kleine Familien und Freundesgruppen. Zwei Schlafzimmer bieten Platz für bis zu vier Gäste.",
      },
      tr: {
        name: "Villa Cemre",
        shortTagline: "Özel havuzlu ve jakuzili konforlu villa",
        description:
          "Villa Cemre, özel havuzu ve jakuzisiyle konforlu bir villadır — çiftler, balayı çiftleri, küçük aileler ve arkadaş grupları için mükemmel bir seçimdir. İki yatak odasıyla dört kişiye kadar konaklama sunar.",
      },
      fr: {
        name: "Villa Cemre",
        shortTagline: "Villa confortable avec piscine privée et jacuzzi",
        description:
          "Villa Cemre est une villa confortable dotée d'une piscine privée et d'un jacuzzi — un excellent choix pour les couples, les lunes de miel, les petites familles et les groupes d'amis. Ses deux chambres accueillent jusqu'à quatre personnes.",
      },
    },
    location: { area: "Islamlar", town: "Kalkan", country: "Turkey" },
    gradient: ["#9caf6b", "#5d7a3f"],
    galleryCount: 5,
    amenityKeys: [
      "privatePool",
      "seaView",
      "ac",
      "kitchen",
      "parking",
      "bbq",
      "jacuzzi",
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    priceIndication: { amount: 260, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
  },
  {
    // TODO: bathrooms assumed = bedrooms (not stated in source copy, pending
    // confirmation). location/price/listing URLs still placeholder.
    slug: "villa-ayda",
    content: {
      en: {
        name: "Villa Ayda",
        shortTagline: "Modern villa with private pool, hamam and sauna",
        description:
          "A modern villa with a private pool, traditional hamam, and sauna, Villa Ayda is perfect for couples, newlyweds, and small groups who value wellness and relaxation, with three bedrooms sleeping up to six.",
      },
      de: {
        name: "Villa Ayda",
        shortTagline: "Moderne Villa mit Privatpool, Hamam und Sauna",
        description:
          "Villa Ayda ist eine moderne Villa mit Privatpool, Hamam und Sauna – perfekt für Paare, Frischvermählte und kleine Gruppen, die besonderen Wert auf Wellness und Entspannung legen. Drei Schlafzimmer bieten Platz für bis zu sechs Gäste.",
      },
      tr: {
        name: "Villa Ayda",
        shortTagline: "Özel havuzlu, hamamlı ve saunalı modern villa",
        description:
          "Villa Ayda; özel havuzu, hamamı ve saunasıyla modern bir villadır — wellness ve dinlenmeye özellikle önem veren çiftler, yeni evliler ve küçük gruplar için mükemmeldir. Üç yatak odasıyla altı kişiye kadar konaklama sunar.",
      },
      fr: {
        name: "Villa Ayda",
        shortTagline: "Villa moderne avec piscine privée, hammam et sauna",
        description:
          "Villa Ayda est une villa moderne dotée d'une piscine privée, d'un hammam et d'un sauna — parfaite pour les couples, jeunes mariés et petits groupes attachant une importance particulière au bien-être et à la détente. Ses trois chambres accueillent jusqu'à six personnes.",
      },
    },
    location: { area: "Kalkan Center", town: "Kalkan", country: "Turkey" },
    gradient: ["#ffb74d", "#ff385c"],
    galleryCount: 7,
    amenityKeys: [
      "privatePool",
      "seaView",
      "ac",
      "kitchen",
      "parking",
      "bbq",
      "hamam",
      "sauna",
    ],
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    priceIndication: { amount: 520, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
    featured: true,
  },
  {
    // TODO: bathrooms assumed = bedrooms (not stated in source copy, pending
    // confirmation). location/price/listing URLs still placeholder.
    slug: "villa-leyla",
    content: {
      en: {
        name: "Villa Leyla",
        shortTagline: "Elegant villa with private pool and jacuzzi",
        description:
          "An elegant villa with a private pool and jacuzzi, Villa Leyla is perfect for couples, honeymooners, and groups of friends wanting a romantic stay with sea views, with two bedrooms sleeping up to four.",
      },
      de: {
        name: "Villa Leyla",
        shortTagline: "Elegante Villa mit Privatpool und Jacuzzi",
        description:
          "Villa Leyla ist eine elegante Villa mit Privatpool und Jacuzzi – perfekt für Paare, Honeymoon-Reisende und Freundesgruppen, die einen romantischen Aufenthalt mit Meerblick wünschen. Zwei Schlafzimmer bieten Platz für bis zu vier Gäste.",
      },
      tr: {
        name: "Villa Leyla",
        shortTagline: "Özel havuzlu ve jakuzili zarif villa",
        description:
          "Villa Leyla, özel havuzu ve jakuzisiyle zarif bir villadır — deniz manzaralı romantik bir tatil arayan çiftler, balayı gezginleri ve arkadaş grupları için mükemmeldir. İki yatak odasıyla dört kişiye kadar konaklama sunar.",
      },
      fr: {
        name: "Villa Leyla",
        shortTagline: "Villa élégante avec piscine privée et jacuzzi",
        description:
          "Villa Leyla est une villa élégante dotée d'une piscine privée et d'un jacuzzi — parfaite pour les couples, voyageurs en lune de miel et groupes d'amis en quête d'un séjour romantique avec vue sur mer. Ses deux chambres accueillent jusqu'à quatre personnes.",
      },
    },
    location: { area: "Kalamar", town: "Kalkan", country: "Turkey" },
    gradient: ["#b39ddb", "#7e57c2"],
    galleryCount: 5,
    amenityKeys: [
      "privatePool",
      "seaView",
      "ac",
      "kitchen",
      "parking",
      "bbq",
      "jacuzzi",
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    priceIndication: null,
    sources: [{ platform: "booking", listingUrl: "#", icalUrl: null }],
  },
  {
    // TODO: photos are real (public/images/villas/villa-saba/). Bedrooms
    // (3+1) and amenities (pool, jacuzzi, sauna, sea view) are from the
    // owner's notes; bathrooms assumed = bedrooms (not stated); maxGuests
    // inferred from bedroom count. location/price/listing URLs still
    // placeholder.
    slug: "villa-saba",
    content: {
      en: {
        name: "Villa Saba",
        shortTagline: "Villa with private pool, jacuzzi, sauna and sea view",
        description:
          "Villa Saba pairs a private pool with a jacuzzi and sauna, all with sea views — three bedrooms make it an easy fit for couples, small families, or a group of friends.",
      },
      de: {
        name: "Villa Saba",
        shortTagline: "Villa mit Privatpool, Jacuzzi, Sauna und Meerblick",
        description:
          "Villa Saba verbindet einen Privatpool mit Jacuzzi und Sauna, alles mit Meerblick – drei Schlafzimmer machen sie zur idealen Wahl für Paare, kleine Familien oder Freundesgruppen.",
      },
      tr: {
        name: "Villa Saba",
        shortTagline: "Özel havuzlu, jakuzili, saunalı ve deniz manzaralı villa",
        description:
          "Villa Saba; özel havuzu, jakuzisi ve saunasıyla deniz manzarasını bir araya getiriyor — üç yatak odasıyla çiftler, küçük aileler veya arkadaş grupları için ideal bir seçim.",
      },
      fr: {
        name: "Villa Saba",
        shortTagline: "Villa avec piscine privée, jacuzzi, sauna et vue mer",
        description:
          "Villa Saba associe une piscine privée à un jacuzzi et un sauna, le tout avec vue sur la mer — ses trois chambres en font un choix idéal pour les couples, petites familles ou groupes d'amis.",
      },
    },
    location: { area: "Kalkan Center", town: "Kalkan", country: "Turkey" },
    gradient: ["#e0e0e0", "#616161"],
    galleryCount: 5,
    amenityKeys: [
      "privatePool",
      "seaView",
      "ac",
      "wifi",
      "kitchen",
      "parking",
      "jacuzzi",
      "sauna",
    ],
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    priceIndication: { amount: 300, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
  },
  {
    // TODO: photos are real (public/images/villas/villa-bogota/) and the
    // tagline/description below are grounded in what they show (modern
    // villa, private pool, shaded terrace, olive-grove/valley/mountain view
    // — no sea or harbour in shot, so "Kalkan Harbour" area + rooftopPool/
    // seaView from the old placeholder were dropped). bedrooms/bathrooms/
    // guests/price/location/listing URLs still placeholder — no fact sheet
    // was given for this villa.
    slug: "villa-bogota",
    content: {
      en: {
        name: "Villa Bogota",
        shortTagline: "Modern villa with a private pool and valley views",
        description:
          "Villa Bogota is a modern villa with a private pool and a shaded terrace for outdoor dining, looking out over the olive groves and mountains beyond Kalkan.",
      },
      de: {
        name: "Villa Bogota",
        shortTagline: "Moderne Villa mit Privatpool und Talblick",
        description:
          "Villa Bogota ist eine moderne Villa mit Privatpool und einer schattigen Terrasse zum Essen im Freien, mit Blick über die Olivenhaine und Berge hinter Kalkan.",
      },
      tr: {
        name: "Villa Bogota",
        shortTagline: "Özel havuzlu ve vadi manzaralı modern villa",
        description:
          "Villa Bogota; özel havuzu ve dışarıda yemek için gölgeli terasıyla, Kalkan'ın arkasındaki zeytinlikler ve dağlara bakan modern bir villadır.",
      },
      fr: {
        name: "Villa Bogota",
        shortTagline: "Villa moderne avec piscine privée et vue sur la vallée",
        description:
          "Villa Bogota est une villa moderne dotée d'une piscine privée et d'une terrasse ombragée pour dîner en plein air, avec vue sur les oliveraies et les montagnes derrière Kalkan.",
      },
    },
    location: { area: "Kalamar", town: "Kalkan", country: "Turkey" },
    gradient: ["#4dd0e1", "#00838f"],
    galleryCount: 6,
    amenityKeys: [
      "privatePool",
      "mountainView",
      "ac",
      "wifi",
      "kitchen",
      "parking",
    ],
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
  {
    // TODO: photos are real (public/images/villas/villa-colombia/) and the
    // tagline/description below are grounded in what they show (modern
    // 2-storey villa, private pool, valley/mountain view, kids' play area —
    // no sea in shot). bedrooms/bathrooms/guests/price/location/listing URLs
    // are still placeholder — no fact sheet was given for this villa.
    slug: "villa-colombia",
    content: {
      en: {
        name: "Villa Colombia",
        shortTagline: "Modern villa with a private pool and mountain views",
        description:
          "A modern two-storey villa with a private pool and a terrace looking out over the valley and mountains beyond Kalkan, Villa Colombia has a shaded lounge area and a kids' play corner — an easy match for families.",
      },
      de: {
        name: "Villa Colombia",
        shortTagline: "Moderne Villa mit Privatpool und Bergblick",
        description:
          "Villa Colombia ist eine moderne, zweistöckige Villa mit Privatpool und einer Terrasse mit Blick auf das Tal und die Berge hinter Kalkan. Eine schattige Lounge-Ecke und eine Spielecke für Kinder machen sie ideal für Familien.",
      },
      tr: {
        name: "Villa Colombia",
        shortTagline: "Özel havuzlu ve dağ manzaralı modern villa",
        description:
          "Villa Colombia, özel havuzu ve Kalkan'ın arkasındaki vadi ve dağlara bakan terasıyla modern, iki katlı bir villadır. Gölgeli oturma alanı ve çocuklar için oyun köşesiyle aileler için idealdir.",
      },
      fr: {
        name: "Villa Colombia",
        shortTagline: "Villa moderne avec piscine privée et vue sur les montagnes",
        description:
          "Villa Colombia est une villa moderne à deux étages dotée d'une piscine privée et d'une terrasse donnant sur la vallée et les montagnes derrière Kalkan. Un coin salon ombragé et un espace de jeux pour enfants en font un excellent choix pour les familles.",
      },
    },
    location: { area: "Kalamar", town: "Kalkan", country: "Turkey" },
    gradient: ["#7fd8be", "#0f6b5c"],
    galleryCount: 5,
    amenityKeys: [
      "privatePool",
      "mountainView",
      "ac",
      "wifi",
      "kitchen",
      "parking",
      "garden",
    ],
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    priceIndication: { amount: 310, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
  },
  {
    // TODO: photos are real (public/images/villas/villa-colosseum/) and the
    // tagline/description below are grounded in what they show (sleek modern
    // villa, private pool, open dining terrace, valley/hill view — no sea in
    // shot). bedrooms/bathrooms/guests/price/location/listing URLs are still
    // placeholder — no fact sheet was given for this villa.
    slug: "villa-colosseum",
    content: {
      en: {
        name: "Villa Colosseum",
        shortTagline: "Designer villa with a private pool and valley views",
        description:
          "A sleek, design-forward villa with a private pool, Villa Colosseum pairs an open dining terrace and stylish interiors with sweeping views over the valley and hills beyond Kalkan.",
      },
      de: {
        name: "Villa Colosseum",
        shortTagline: "Design-Villa mit Privatpool und Talblick",
        description:
          "Villa Colosseum ist eine stilvolle, design-orientierte Villa mit Privatpool, die eine offene Essterrasse und elegante Innenräume mit weitem Blick über das Tal und die Hügel hinter Kalkan verbindet.",
      },
      tr: {
        name: "Villa Colosseum",
        shortTagline: "Özel havuzlu ve vadi manzaralı tasarım villa",
        description:
          "Villa Colosseum; özel havuzu, açık yemek terası ve şık iç mekanlarıyla Kalkan'ın arkasındaki vadi ve tepelere geniş bir manzara sunan modern, tasarım odaklı bir villadır.",
      },
      fr: {
        name: "Villa Colosseum",
        shortTagline: "Villa design avec piscine privée et vue sur la vallée",
        description:
          "Villa Colosseum est une villa élégante et moderne dotée d'une piscine privée, associant une terrasse à manger ouverte et un intérieur raffiné à une vue dégagée sur la vallée et les collines derrière Kalkan.",
      },
    },
    location: { area: "Kalkan Harbour", town: "Kalkan", country: "Turkey" },
    gradient: ["#f4a896", "#c1666b"],
    galleryCount: 5,
    amenityKeys: [
      "privatePool",
      "mountainView",
      "ac",
      "wifi",
      "kitchen",
      "parking",
    ],
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    priceIndication: { amount: 350, currency: "EUR", per: "night" },
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

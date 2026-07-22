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
    sizeSqm: 320,
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
    sizeSqm: 120,
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
    sizeSqm: 120,
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
        shortTagline:
          "Modern villa with private pool, jacuzzi, hamam and sauna",
        description:
          "A modern villa with a private pool, jacuzzi, traditional hamam, and sauna, Villa Ayda is perfect for couples, newlyweds, and small groups who value wellness and relaxation, with three bedrooms sleeping up to six.",
      },
      de: {
        name: "Villa Ayda",
        shortTagline: "Moderne Villa mit Privatpool, Jacuzzi, Hamam und Sauna",
        description:
          "Villa Ayda ist eine moderne Villa mit Privatpool, Jacuzzi, Hamam und Sauna – perfekt für Paare, Frischvermählte und kleine Gruppen, die besonderen Wert auf Wellness und Entspannung legen. Drei Schlafzimmer bieten Platz für bis zu sechs Gäste.",
      },
      tr: {
        name: "Villa Ayda",
        shortTagline: "Özel havuzlu, jakuzili, hamamlı ve saunalı modern villa",
        description:
          "Villa Ayda; özel havuzu, jakuzisi, hamamı ve saunasıyla modern bir villadır — wellness ve dinlenmeye özellikle önem veren çiftler, yeni evliler ve küçük gruplar için mükemmeldir. Üç yatak odasıyla altı kişiye kadar konaklama sunar.",
      },
      fr: {
        name: "Villa Ayda",
        shortTagline:
          "Villa moderne avec piscine privée, jacuzzi, hammam et sauna",
        description:
          "Villa Ayda est une villa moderne dotée d'une piscine privée, d'un jacuzzi, d'un hammam et d'un sauna — parfaite pour les couples, jeunes mariés et petits groupes attachant une importance particulière au bien-être et à la détente. Ses trois chambres accueillent jusqu'à six personnes.",
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
      "jacuzzi",
      "hamam",
      "sauna",
    ],
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    sizeSqm: 220,
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
    sizeSqm: 120,
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
    sizeSqm: 220,
    priceIndication: { amount: 300, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
  },
  {
    // TODO: photos are real (public/images/villas/villa-bogota/). Owner fact
    // sheet (2026-07-20) confirms 2+1 / 4 guests / private jacuzzi / pool /
    // no sea view; bathrooms assumed = bedrooms. location/price/listing URLs
    // still placeholder.
    slug: "villa-bogota",
    content: {
      en: {
        name: "Villa Bogota",
        shortTagline: "Modern villa with a private pool and jacuzzi",
        description:
          "Villa Bogota is a modern villa with a private pool and jacuzzi, plus a shaded terrace for outdoor dining looking out over the olive groves and mountains beyond Kalkan — two bedrooms sleep up to four.",
      },
      de: {
        name: "Villa Bogota",
        shortTagline: "Moderne Villa mit Privatpool und Jacuzzi",
        description:
          "Villa Bogota ist eine moderne Villa mit Privatpool und Jacuzzi sowie einer schattigen Terrasse zum Essen im Freien, mit Blick über die Olivenhaine und Berge hinter Kalkan. Zwei Schlafzimmer bieten Platz für bis zu vier Gäste.",
      },
      tr: {
        name: "Villa Bogota",
        shortTagline: "Özel havuzlu ve jakuzili modern villa",
        description:
          "Villa Bogota; özel havuzu ve jakuzisi, dışarıda yemek için gölgeli terasıyla, Kalkan'ın arkasındaki zeytinlikler ve dağlara bakan modern bir villadır. İki yatak odasıyla dört kişiye kadar konaklama sunar.",
      },
      fr: {
        name: "Villa Bogota",
        shortTagline: "Villa moderne avec piscine privée et jacuzzi",
        description:
          "Villa Bogota est une villa moderne dotée d'une piscine privée et d'un jacuzzi, ainsi que d'une terrasse ombragée pour dîner en plein air, avec vue sur les oliveraies et les montagnes derrière Kalkan. Ses deux chambres accueillent jusqu'à quatre personnes.",
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
      "jacuzzi",
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    sizeSqm: 120,
    priceIndication: { amount: 260, currency: "EUR", per: "night" },
    sources: [{ platform: "airbnb", listingUrl: "#", icalUrl: null }],
  },
  {
    // TODO: photos are real (public/images/villas/villa-colombia/). Owner
    // fact sheet (2026-07-20) confirms 2+1 / 4 guests / private jacuzzi /
    // pool / no sea view; bathrooms assumed = bedrooms. location/price/
    // listing URLs still placeholder.
    slug: "villa-colombia",
    content: {
      en: {
        name: "Villa Colombia",
        shortTagline: "Modern villa with a private pool and jacuzzi",
        description:
          "A modern two-storey villa with a private pool and jacuzzi, Villa Colombia has a terrace looking out over the valley and mountains beyond Kalkan — two bedrooms sleep up to four, an easy match for couples and small groups.",
      },
      de: {
        name: "Villa Colombia",
        shortTagline: "Moderne Villa mit Privatpool und Jacuzzi",
        description:
          "Villa Colombia ist eine moderne, zweistöckige Villa mit Privatpool und Jacuzzi und einer Terrasse mit Blick auf das Tal und die Berge hinter Kalkan. Zwei Schlafzimmer bieten Platz für bis zu vier Gäste — ideal für Paare und kleine Gruppen.",
      },
      tr: {
        name: "Villa Colombia",
        shortTagline: "Özel havuzlu ve jakuzili modern villa",
        description:
          "Villa Colombia, özel havuzu ve jakuzisi, Kalkan'ın arkasındaki vadi ve dağlara bakan terasıyla modern, iki katlı bir villadır. İki yatak odasıyla dört kişiye kadar konaklama sunar — çiftler ve küçük gruplar için idealdir.",
      },
      fr: {
        name: "Villa Colombia",
        shortTagline: "Villa moderne avec piscine privée et jacuzzi",
        description:
          "Villa Colombia est une villa moderne à deux étages dotée d'une piscine privée et d'un jacuzzi, avec une terrasse donnant sur la vallée et les montagnes derrière Kalkan. Ses deux chambres accueillent jusqu'à quatre personnes — idéale pour les couples et petits groupes.",
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
      "jacuzzi",
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    sizeSqm: 120,
    priceIndication: { amount: 260, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
  },
  {
    // TODO: photos are real (public/images/villas/villa-colosseum/). Owner
    // fact sheet (2026-07-20) confirms 2+1 / 4 guests / private jacuzzi /
    // pool / no sea view; bathrooms assumed = bedrooms. location/price/
    // listing URLs still placeholder.
    slug: "villa-colosseum",
    content: {
      en: {
        name: "Villa Colosseum",
        shortTagline: "Designer villa with a private pool and jacuzzi",
        description:
          "A sleek, design-forward villa with a private pool and jacuzzi, Villa Colosseum pairs an open dining terrace and stylish interiors with sweeping views over the valley and hills beyond Kalkan — two bedrooms sleep up to four.",
      },
      de: {
        name: "Villa Colosseum",
        shortTagline: "Design-Villa mit Privatpool und Jacuzzi",
        description:
          "Villa Colosseum ist eine stilvolle, design-orientierte Villa mit Privatpool und Jacuzzi, die eine offene Essterrasse und elegante Innenräume mit weitem Blick über das Tal und die Hügel hinter Kalkan verbindet. Zwei Schlafzimmer bieten Platz für bis zu vier Gäste.",
      },
      tr: {
        name: "Villa Colosseum",
        shortTagline: "Özel havuzlu ve jakuzili tasarım villa",
        description:
          "Villa Colosseum; özel havuzu, jakuzisi, açık yemek terası ve şık iç mekanlarıyla Kalkan'ın arkasındaki vadi ve tepelere geniş bir manzara sunan modern, tasarım odaklı bir villadır. İki yatak odasıyla dört kişiye kadar konaklama sunar.",
      },
      fr: {
        name: "Villa Colosseum",
        shortTagline: "Villa design avec piscine privée et jacuzzi",
        description:
          "Villa Colosseum est une villa élégante et moderne dotée d'une piscine privée et d'un jacuzzi, associant une terrasse à manger ouverte et un intérieur raffiné à une vue dégagée sur la vallée et les collines derrière Kalkan. Ses deux chambres accueillent jusqu'à quatre personnes.",
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
      "jacuzzi",
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    sizeSqm: 120,
    priceIndication: { amount: 260, currency: "EUR", per: "night" },
    sources: [
      { platform: "airbnb", listingUrl: "#", icalUrl: null },
      { platform: "booking", listingUrl: "#", icalUrl: null },
    ],
  },
  {
    // TODO: photos pending — user said "Pictures for villa alkaya are going
    // to come" (2026-07-20); folder public/images/villas/villa-alkaya-cinar/
    // exists empty so it falls back to the gradient placeholder until photos
    // are dropped in. Owner fact sheet confirms 3+1 / two jacuzzis / sauna /
    // pool / sea view; bathrooms assumed = bedrooms, maxGuests inferred from
    // bedroom count to match Villa Ayda/Saba pattern. location/price/listing
    // URLs still placeholder.
    slug: "villa-alkaya-cinar",
    content: {
      en: {
        name: "Villa Alkaya Çınar",
        shortTagline:
          "Villa with private pool, two jacuzzis, sauna and sea view",
        description:
          "Villa Alkaya Çınar pairs a private pool with two jacuzzis and a sauna, all with sea views — three bedrooms make it a comfortable fit for families or a group of friends.",
      },
      de: {
        name: "Villa Alkaya Çınar",
        shortTagline: "Villa mit Privatpool, zwei Jacuzzis, Sauna und Meerblick",
        description:
          "Villa Alkaya Çınar verbindet einen Privatpool mit zwei Jacuzzis und einer Sauna, alles mit Meerblick – drei Schlafzimmer bieten komfortablen Platz für Familien oder Freundesgruppen.",
      },
      tr: {
        name: "Villa Alkaya Çınar",
        shortTagline:
          "Özel havuzlu, 2 jakuzili, saunalı ve deniz manzaralı villa",
        description:
          "Villa Alkaya Çınar; özel havuzu, 2 jakuzisi ve saunasıyla deniz manzarasını bir araya getiriyor — üç yatak odasıyla aileler veya arkadaş grupları için konforlu bir seçim.",
      },
      fr: {
        name: "Villa Alkaya Çınar",
        shortTagline: "Villa avec piscine privée, deux jacuzzis, sauna et vue mer",
        description:
          "Villa Alkaya Çınar associe une piscine privée à deux jacuzzis et un sauna, le tout avec vue sur la mer — ses trois chambres offrent un espace confortable pour les familles ou les groupes d'amis.",
      },
    },
    location: { area: "Kalkan", town: "Kalkan", country: "Turkey" },
    gradient: ["#8d9c6b", "#3f5d4a"],
    galleryCount: 5,
    amenityKeys: [
      "privatePool",
      "seaView",
      "ac",
      "kitchen",
      "parking",
      "jacuzzi",
      "sauna",
    ],
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    sizeSqm: 220,
    priceIndication: null,
    sources: [{ platform: "airbnb", listingUrl: "#", icalUrl: null }],
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

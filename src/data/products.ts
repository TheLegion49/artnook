// All prices in paise (₹1 = 100 paise)
export type ProductType = 'UNIQUE' | 'RESTOCKABLE' | 'MADE_TO_ORDER';
export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
export type Category =
  | 'Coasters'
  | 'Trays'
  | 'Wall Art'
  | 'Clocks'
  | 'Jewellery'
  | 'Keychains'
  | 'Bookmarks'
  | 'Flower Preservation'
  | 'Home Décor';

export interface ProductVariant {
  id: string;
  name: string;
  price: number; // in paise
  compareAtPrice?: number;
  stock: number;
  sku: string;
  attributes: Record<string, string>;
}

export interface PersonalisationConfig {
  enabled: boolean;
  fields: {
    name: string;
    type: 'text' | 'color' | 'textarea';
    label: string;
    placeholder?: string;
    maxLength?: number;
    required?: boolean;
    options?: string[];
    priceAddon?: number; // in paise
  }[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  makerNote: string;
  type: ProductType;
  category: Category;
  price: number; // in paise
  compareAtPrice?: number;
  sku: string;
  stock: number;
  lowStockThreshold: number;
  leadTimeDays?: number;
  weightGrams: number;
  dimensionsMm: { length: number; width: number; height: number };
  materials: string[];
  colours: string[];
  occasions: string[];
  tags: string[];
  careNotes: string;
  personalisation?: PersonalisationConfig;
  status: ProductStatus;
  featured: boolean;
  bestseller: boolean;
  artSeed: number;
  artVariant: string;
  artPalette: string[];
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  customerCity: string;
  rating: number;
  title: string;
  text: string;
  verified: boolean;
  approved: boolean;
  helpfulCount: number;
  createdAt: string;
}

export const products: Product[] = [
  {
    id: 'prod_ocean_wave_coaster',
    slug: 'ocean-wave-coaster-set-of-4',
    name: 'Ocean Wave Coaster Set of 4',
    tagline: 'Tiny oceans for your coffee table',
    description:
      'Four hand-poured coasters that capture the deep blue pull of the sea. Each one swirls differently — some have bigger waves, some have quiet pools — because we pour them one at a time and the resin decides. Gold-leaf rims catch the light when you reach for your cup. They come in a kraft box lined with tissue, ready to gift or keep.',
    makerNote: 'We poured these on a stormy afternoon and the blue came out deeper than usual. Happy accident.',
    type: 'RESTOCKABLE',
    category: 'Coasters',
    price: 119900,
    sku: 'AN-CST-OCN-001',
    stock: 12,
    lowStockThreshold: 3,
    weightGrams: 480,
    dimensionsMm: { length: 100, width: 100, height: 8 },
    materials: ['Epoxy resin', 'Gold leaf', 'Mica pigments', 'Cork backing'],
    colours: ['Deep blue', 'White', 'Gold'],
    occasions: ['Housewarming', 'Birthday', 'Thank You'],
    tags: ['ocean', 'waves', 'gold leaf', 'set'],
    careNotes: 'Wipe with a damp soft cloth. Avoid placing very hot mugs directly — use for cold and warm drinks. Keep away from prolonged direct sunlight.',
    status: 'ACTIVE',
    featured: true,
    bestseller: true,
    artSeed: 42,
    artVariant: 'coaster',
    artPalette: ['#0B5C73', '#12A8A0', '#FFFFFF', '#D4A63A'],
    variants: [
      { id: 'var_ocn_classic', name: 'Classic Blue', price: 119900, stock: 12, sku: 'AN-CST-OCN-001-BLU', attributes: { colourway: 'Classic Blue' } },
      { id: 'var_ocn_teal', name: 'Teal Lagoon', price: 119900, stock: 8, sku: 'AN-CST-OCN-001-TEA', attributes: { colourway: 'Teal Lagoon' } },
    ],
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_midnight_geode_coaster',
    slug: 'midnight-geode-coaster-set-of-4',
    name: 'Midnight Geode Coaster Set of 4',
    tagline: 'Crystals you can actually use',
    description:
      'These coasters are poured to look like cracked-open geodes — violet agate bands swirling into a crystal edge that catches light like the real thing. Because they\'re made to order, we can adjust the purple tones from deep plum to soft lavender. Each set takes about 5 days to pour, cure, sand and polish by hand.',
    makerNote: 'The crystal edges are my favourite part. We crush real mica and layer it so it sparkles from every angle.',
    type: 'MADE_TO_ORDER',
    category: 'Coasters',
    price: 149900,
    sku: 'AN-CST-GEO-002',
    stock: 0,
    lowStockThreshold: 0,
    leadTimeDays: 7,
    weightGrams: 520,
    dimensionsMm: { length: 100, width: 100, height: 10 },
    materials: ['Epoxy resin', 'Crushed mica', 'Crystal pigments', 'Cork backing'],
    colours: ['Violet', 'Purple', 'Crystal'],
    occasions: ['Birthday', 'Housewarming', 'Anniversary'],
    tags: ['geode', 'crystal', 'purple', 'set', 'made to order'],
    careNotes: 'Wipe gently with a damp cloth. The crystal edges are hand-finished — handle with care. Avoid abrasive cleaners.',
    status: 'ACTIVE',
    featured: true,
    bestseller: false,
    artSeed: 137,
    artVariant: 'geode',
    artPalette: ['#B14AED', '#7B2FBE', '#E8D5F5', '#D4A63A'],
    createdAt: '2026-09-05T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_candy_pop_coaster',
    slug: 'candy-pop-coaster',
    name: 'Candy Pop Coaster',
    tagline: 'Sweetness without the calories',
    description:
      'A single coaster that looks good enough to eat — swirls of pink, mint and marigold that we pour in a spiral and let bloom into each other. Perfect for a bedside table, a desk, or as a little gift that makes someone smile. Sold individually so you can mix and match.',
    makerNote: 'This one always reminds us of birthday cake frosting. Zero guilt.',
    type: 'RESTOCKABLE',
    category: 'Coasters',
    price: 34900,
    sku: 'AN-CST-CAN-003',
    stock: 24,
    lowStockThreshold: 5,
    weightGrams: 120,
    dimensionsMm: { length: 100, width: 100, height: 8 },
    materials: ['Epoxy resin', 'Mica pigments', 'Cork backing'],
    colours: ['Pink', 'Mint', 'Marigold'],
    occasions: ['Birthday', 'Thank You'],
    tags: ['colourful', 'fun', 'single'],
    careNotes: 'Wipe with a damp soft cloth. Keep away from prolonged direct sunlight to preserve colour vibrancy.',
    status: 'ACTIVE',
    featured: false,
    bestseller: true,
    artSeed: 256,
    artVariant: 'coaster',
    artPalette: ['#F7A8C4', '#8EE3C2', '#FFB627'],
    createdAt: '2026-09-08T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_sunset_swirl_tray',
    slug: 'sunset-swirl-round-tray',
    name: 'Sunset Swirl Round Tray',
    tagline: 'Hold your trinkets in a tiny sunset',
    description:
      'This one-of-a-kind round tray transitions from warm coral through to golden marigold, with swirling patterns that happened naturally as the resin cured. Resin handles on each side make it easy to carry. Use it for jewellery, candles, perfume bottles — or just leave it out because it\'s gorgeous.',
    makerNote: 'This pour came out exactly like a sunset over the hills. Some pieces just work, and this was one of them.',
    type: 'UNIQUE',
    category: 'Trays',
    price: 249900,
    sku: 'AN-TRY-SUN-004',
    stock: 1,
    lowStockThreshold: 1,
    weightGrams: 650,
    dimensionsMm: { length: 300, width: 300, height: 15 },
    materials: ['Epoxy resin', 'Mica pigments', 'Resin handles'],
    colours: ['Coral', 'Marigold', 'Gold'],
    occasions: ['Housewarming', 'Birthday', 'Wedding'],
    tags: ['one of a kind', 'sunset', 'tray', 'gradient'],
    careNotes: 'Wipe with a damp soft cloth. Not recommended for food contact — owner to confirm. Display piece or use for dry items.',
    status: 'ACTIVE',
    featured: true,
    bestseller: false,
    artSeed: 314,
    artVariant: 'tray',
    artPalette: ['#FF6B5E', '#FFB627', '#D4A63A'],
    createdAt: '2026-09-10T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_rose_quartz_tray',
    slug: 'rose-quartz-serving-tray',
    name: 'Rose Quartz Serving Tray',
    tagline: 'Blush and gold, made for your table',
    description:
      'Soft blush pink resin marbled with real gold leaf, set in a rectangular tray with elegant handles. Because this is made to order, you can choose the shade of pink — from barely-there rose to deeper blush. Each tray takes about 5 to 7 days to pour, cure and finish. Perfect for serving drinks (use coasters on it!) or as a vanity organiser.',
    makerNote: 'The gold leaf is applied by hand and it never lands the same way twice. That\'s the whole point.',
    type: 'MADE_TO_ORDER',
    category: 'Trays',
    price: 299900,
    sku: 'AN-TRY-RSQ-005',
    stock: 0,
    lowStockThreshold: 0,
    leadTimeDays: 7,
    weightGrams: 900,
    dimensionsMm: { length: 400, width: 250, height: 15 },
    materials: ['Epoxy resin', 'Gold leaf', 'Mica pigments', 'Metal handles'],
    colours: ['Blush pink', 'Gold'],
    occasions: ['Wedding', 'Anniversary', 'Housewarming'],
    tags: ['gold leaf', 'pink', 'serving', 'handles', 'made to order'],
    careNotes: 'Wipe gently with a damp cloth. Not designed for direct food contact — owner to confirm. Avoid harsh chemicals and abrasive cleaners.',
    status: 'ACTIVE',
    featured: true,
    bestseller: true,
    artSeed: 421,
    artVariant: 'tray',
    artPalette: ['#F7A8C4', '#FDDDE6', '#D4A63A'],
    createdAt: '2026-09-12T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_amethyst_geode_wall',
    slug: 'amethyst-geode-wall-art',
    name: 'Amethyst Geode Wall Art 30×40 cm',
    tagline: 'A geode that lives on your wall',
    description:
      'This one-of-a-kind wall piece is sculpted to look like a split amethyst geode — deep purple resin bands flowing outward from a crystal centre, with gold-leaf veins running through like underground rivers. Comes ready to hang with a sawtooth bracket on the back. This exact piece will never be made again.',
    makerNote: 'This took three pours over two days. The crystal centre has six layers of tinted resin, each poured after the last one cured.',
    type: 'UNIQUE',
    category: 'Wall Art',
    price: 549900,
    sku: 'AN-WLA-AME-006',
    stock: 1,
    lowStockThreshold: 1,
    weightGrams: 1200,
    dimensionsMm: { length: 400, width: 300, height: 20 },
    materials: ['Epoxy resin', 'Gold leaf', 'Crushed mica', 'Crystal pigments', 'MDF backing'],
    colours: ['Purple', 'Violet', 'Gold'],
    occasions: ['Housewarming', 'Birthday', 'Anniversary'],
    tags: ['one of a kind', 'geode', 'wall art', 'gold leaf', 'statement piece'],
    careNotes: 'Dust gently with a soft dry cloth. Hang away from direct sunlight and heat sources. Wall-mounting hardware included.',
    status: 'ACTIVE',
    featured: true,
    bestseller: false,
    artSeed: 555,
    artVariant: 'geode',
    artPalette: ['#B14AED', '#7B2FBE', '#D4A63A', '#E8D5F5'],
    createdAt: '2026-09-14T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_aurora_panel',
    slug: 'aurora-abstract-panel',
    name: 'Aurora Abstract Panel 40×60 cm',
    tagline: 'Northern lights, poured by hand',
    description:
      'Ribbons of teal, cobalt and mint flow across this large panel like the aurora borealis frozen in resin. The colours shift and shimmer as you walk past, thanks to metallic mica powders layered between translucent pours. This is our biggest piece and it transforms a room. One of a kind — when it\'s gone, it\'s gone.',
    makerNote: 'We worked on this one for a whole week. Five pours, lots of holding our breath while it cured. Worth every second.',
    type: 'UNIQUE',
    category: 'Wall Art',
    price: 799900,
    sku: 'AN-WLA-AUR-007',
    stock: 0,
    lowStockThreshold: 1,
    weightGrams: 2400,
    dimensionsMm: { length: 600, width: 400, height: 25 },
    materials: ['Epoxy resin', 'Metallic mica', 'Tinted pigments', 'Birch panel'],
    colours: ['Teal', 'Cobalt', 'Mint'],
    occasions: ['Housewarming', 'Anniversary'],
    tags: ['one of a kind', 'abstract', 'wall art', 'large', 'metallic'],
    careNotes: 'Dust with a soft cloth. Avoid hanging in direct sunlight. This piece is heavy — use appropriate wall anchors.',
    status: 'ACTIVE',
    featured: false,
    bestseller: false,
    artSeed: 678,
    artVariant: 'wall-art',
    artPalette: ['#12A8A0', '#3A56E8', '#8EE3C2'],
    createdAt: '2026-08-20T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_tidal_pool_clock',
    slug: 'tidal-pool-wall-clock',
    name: 'Tidal Pool Wall Clock 12 in',
    tagline: 'Time moves like the tides',
    description:
      'A working wall clock with a resin face that looks like a tidal pool — turquoise swirls with white foam edges and tiny shells peeking through. Silent quartz movement so it won\'t tick you to sleep. Made to order, so we can adjust the blue tones from bright turquoise to deeper ocean.',
    makerNote: 'Every clock face is a tiny ocean painting. We use a heat gun to create the lacing effect — it looks just like sea foam.',
    type: 'MADE_TO_ORDER',
    category: 'Clocks',
    price: 279900,
    sku: 'AN-CLK-TDL-008',
    stock: 0,
    lowStockThreshold: 0,
    leadTimeDays: 10,
    weightGrams: 800,
    dimensionsMm: { length: 305, width: 305, height: 30 },
    materials: ['Epoxy resin', 'Mica pigments', 'Silent quartz movement', 'Metal hands', 'MDF base'],
    colours: ['Turquoise', 'White', 'Teal'],
    occasions: ['Housewarming', 'Birthday', 'Wedding'],
    tags: ['clock', 'ocean', 'tidal', 'functional', 'made to order'],
    careNotes: 'Dust with a soft cloth. Uses 1x AA battery (not included). Avoid hanging in humid bathrooms. Keep away from extreme heat — owner to confirm safe temperature range.',
    status: 'ACTIVE',
    featured: true,
    bestseller: false,
    artSeed: 789,
    artVariant: 'clock',
    artPalette: ['#12A8A0', '#0B5C73', '#FFFFFF'],
    variants: [
      { id: 'var_clk_12', name: '12 inch', price: 279900, stock: 0, sku: 'AN-CLK-TDL-008-12', attributes: { size: '12 inch' } },
      { id: 'var_clk_16', name: '16 inch', price: 379900, stock: 0, sku: 'AN-CLK-TDL-008-16', attributes: { size: '16 inch' } },
    ],
    createdAt: '2026-09-15T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_marigold_pendant',
    slug: 'marigold-meadow-pendant',
    name: 'Marigold Meadow Pendant',
    tagline: 'A flower that never wilts',
    description:
      'A real pressed marigold petal, sealed forever in crystal-clear resin in a teardrop pendant. Each pendant holds a different petal, so no two are identical. Comes on an 18-inch gold-tone chain with a lobster clasp. Lightweight enough for everyday wear.',
    makerNote: 'We press the marigolds ourselves from a local garden. Each petal is dried for three weeks before we seal it.',
    type: 'RESTOCKABLE',
    category: 'Jewellery',
    price: 59900,
    sku: 'AN-JWL-MRG-009',
    stock: 18,
    lowStockThreshold: 4,
    weightGrams: 12,
    dimensionsMm: { length: 35, width: 20, height: 8 },
    materials: ['Epoxy resin', 'Pressed marigold', 'Gold-tone chain', 'Lobster clasp'],
    colours: ['Orange', 'Yellow', 'Clear'],
    occasions: ['Birthday', 'Thank You', 'Anniversary'],
    tags: ['pressed flower', 'pendant', 'necklace', 'everyday'],
    careNotes: 'Handle gently — resin jewellery is delicate. Remove before swimming, showering or sleeping. Store flat in a soft pouch. Keep away from perfume and hairspray.',
    status: 'ACTIVE',
    featured: false,
    bestseller: true,
    artSeed: 901,
    artVariant: 'pendant',
    artPalette: ['#FFB627', '#FF8C00', '#FFF6E5'],
    createdAt: '2026-09-02T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_forget_me_not_earrings',
    slug: 'forget-me-not-earrings',
    name: 'Forget-Me-Not Earrings',
    tagline: 'Tiny blooms for your ears',
    description:
      'Delicate round studs holding real pressed forget-me-not flowers — those tiny blue ones that grow wild and refuse to be ignored. Each pair is slightly different because flowers do what they want. Hypoallergenic stainless steel posts and butterfly backs for sensitive ears.',
    makerNote: 'These are the most fiddly things we make. Tweezering a 5mm flower into wet resin requires serious patience and a steady hand.',
    type: 'RESTOCKABLE',
    category: 'Jewellery',
    price: 44900,
    sku: 'AN-JWL-FMN-010',
    stock: 2,
    lowStockThreshold: 5,
    weightGrams: 6,
    dimensionsMm: { length: 12, width: 12, height: 5 },
    materials: ['Epoxy resin', 'Pressed forget-me-nots', 'Stainless steel posts', 'Butterfly backs'],
    colours: ['Blue', 'Clear'],
    occasions: ['Birthday', 'Thank You'],
    tags: ['pressed flower', 'earrings', 'studs', 'hypoallergenic'],
    careNotes: 'Handle gently. Remove before water activities. Store in the included pouch. Clean with a soft dry cloth only.',
    status: 'ACTIVE',
    featured: false,
    bestseller: false,
    artSeed: 1023,
    artVariant: 'earrings',
    artPalette: ['#3A56E8', '#87CEEB', '#FFF6E5'],
    createdAt: '2026-09-03T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_cosmic_dust_keychain',
    slug: 'cosmic-dust-keychain',
    name: 'Cosmic Dust Keychain',
    tagline: 'A galaxy in your pocket',
    description:
      'Deep purple and black resin swirled with holographic glitter that catches every light — like holding a tiny galaxy. Attached to a sturdy keyring with a soft suede tassel. Small enough for a bag charm, sparkly enough to find your keys in the dark.',
    makerNote: 'We use three different types of glitter in this one. Yes, we find glitter everywhere for days after. No, we don\'t mind.',
    type: 'RESTOCKABLE',
    category: 'Keychains',
    price: 24900,
    sku: 'AN-KEY-COS-011',
    stock: 30,
    lowStockThreshold: 5,
    weightGrams: 25,
    dimensionsMm: { length: 50, width: 35, height: 8 },
    materials: ['Epoxy resin', 'Holographic glitter', 'Keyring', 'Suede tassel'],
    colours: ['Purple', 'Black', 'Holographic'],
    occasions: ['Birthday', 'Thank You'],
    tags: ['glitter', 'galaxy', 'keychain', 'tassel', 'sparkle'],
    careNotes: 'Resin is durable but can chip if dropped on hard surfaces. Keep away from extreme heat.',
    status: 'ACTIVE',
    featured: false,
    bestseller: false,
    artSeed: 1100,
    artVariant: 'keychain',
    artPalette: ['#B14AED', '#2B1B3D', '#E8D5F5'],
    createdAt: '2026-09-04T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_name_initial_keychain',
    slug: 'name-initial-keychain',
    name: 'Name Initial Keychain',
    tagline: 'Your letter, your colours',
    description:
      'A chunky resin letter keychain in the colour of your choice. Pick your initial, pick your palette, and we\'ll pour it fresh. Each letter is about 5 cm tall with a sturdy split ring. Great for bag tags, keys, or a little personalised gift.',
    makerNote: 'We pour these in silicone letter moulds and the resin fills every curve. They\'re surprisingly satisfying to hold.',
    type: 'MADE_TO_ORDER',
    category: 'Keychains',
    price: 29900,
    sku: 'AN-KEY-NAM-012',
    stock: 0,
    lowStockThreshold: 0,
    leadTimeDays: 5,
    weightGrams: 30,
    dimensionsMm: { length: 50, width: 40, height: 10 },
    materials: ['Epoxy resin', 'Mica pigments', 'Split ring'],
    colours: ['Custom'],
    occasions: ['Birthday', 'Thank You'],
    tags: ['personalised', 'letter', 'initial', 'keychain', 'made to order'],
    careNotes: 'Durable resin but avoid dropping on hard surfaces. Keep away from extreme heat.',
    personalisation: {
      enabled: true,
      fields: [
        { name: 'letter', type: 'text', label: 'Your initial', placeholder: 'A', maxLength: 1, required: true },
        {
          name: 'colour',
          type: 'color',
          label: 'Pick your colour',
          options: ['Ocean Blue', 'Sunset Coral', 'Forest Green', 'Lavender', 'Marigold', 'Rose Pink', 'Midnight Black'],
          required: true,
        },
        { name: 'notes', type: 'textarea', label: 'Any special requests?', placeholder: 'E.g. add glitter, mix two colours...', maxLength: 200 },
      ],
    },
    status: 'ACTIVE',
    featured: false,
    bestseller: false,
    artSeed: 1200,
    artVariant: 'keychain',
    artPalette: ['#12A8A0', '#FFB627', '#FF6B5E'],
    createdAt: '2026-09-06T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_pressed_flower_bookmark',
    slug: 'pressed-flower-bookmark',
    name: 'Pressed Flower Bookmark',
    tagline: 'A garden between your pages',
    description:
      'Real dried blooms — tiny daisies, baby\'s breath and fern leaves — suspended in a thin, clear resin bookmark with a satin tassel. Slim enough to not bulk up your book, pretty enough to make you want to read more. Each one holds a different arrangement of flowers.',
    makerNote: 'We arrange each bookmark under a magnifying lamp. It\'s like making a tiny pressed-flower painting every time.',
    type: 'RESTOCKABLE',
    category: 'Bookmarks',
    price: 34900,
    sku: 'AN-BMK-FLR-013',
    stock: 15,
    lowStockThreshold: 4,
    weightGrams: 18,
    dimensionsMm: { length: 130, width: 40, height: 4 },
    materials: ['Epoxy resin', 'Dried flowers', 'Satin tassel'],
    colours: ['Clear', 'Green', 'White', 'Pink'],
    occasions: ['Birthday', 'Thank You'],
    tags: ['pressed flower', 'bookmark', 'reader', 'tassel'],
    careNotes: 'Handle gently — thin resin can snap if bent. Keep away from prolonged direct sunlight to preserve flower colours.',
    status: 'ACTIVE',
    featured: false,
    bestseller: false,
    artSeed: 1300,
    artVariant: 'bookmark',
    artPalette: ['#FFF6E5', '#8EE3C2', '#F7A8C4'],
    createdAt: '2026-09-07T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_gold_fleck_bookmark',
    slug: 'gold-fleck-bookmark',
    name: 'Gold-Fleck Bookmark',
    tagline: 'A little luxury between chapters',
    description:
      'Crystal-clear resin with suspended gold flakes that catch the light as you turn pages. Simple, elegant and surprisingly mesmerising. Finished with a gold satin tassel. This is our most-gifted bookmark — people buy three at a time.',
    makerNote: 'The gold flakes float at different levels in the resin, so it looks different depending on which angle you hold it at.',
    type: 'RESTOCKABLE',
    category: 'Bookmarks',
    price: 29900,
    sku: 'AN-BMK-GLD-014',
    stock: 22,
    lowStockThreshold: 5,
    weightGrams: 15,
    dimensionsMm: { length: 130, width: 40, height: 4 },
    materials: ['Epoxy resin', 'Gold flakes', 'Gold satin tassel'],
    colours: ['Clear', 'Gold'],
    occasions: ['Birthday', 'Thank You'],
    tags: ['gold', 'bookmark', 'minimal', 'reader', 'gift'],
    careNotes: 'Handle gently — thin resin can snap if bent. Keep away from prolonged direct sunlight.',
    status: 'ACTIVE',
    featured: false,
    bestseller: false,
    artSeed: 1400,
    artVariant: 'bookmark',
    artPalette: ['#FFF6E5', '#D4A63A', '#FFB627'],
    createdAt: '2026-09-09T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_wedding_bouquet_frame',
    slug: 'wedding-bouquet-preservation-frame',
    name: 'Wedding Bouquet Preservation Frame',
    tagline: 'Your flowers, forever',
    description:
      'Send us your wedding bouquet (or any special flowers) and we\'ll press, dry and preserve them in a crystal-clear resin frame you can hang on your wall. Each frame is poured around your actual flowers, so it\'s completely one-of-a-kind. Available in A4 and A3 sizes. The process takes 3 to 4 weeks because the flowers need to dry properly before we seal them.',
    makerNote: 'This is the most meaningful thing we make. We handle every bouquet like it\'s our own.',
    type: 'MADE_TO_ORDER',
    category: 'Flower Preservation',
    price: 699900,
    sku: 'AN-FLR-WED-015',
    stock: 0,
    lowStockThreshold: 0,
    leadTimeDays: 28,
    weightGrams: 1500,
    dimensionsMm: { length: 297, width: 210, height: 20 },
    materials: ['Epoxy resin', 'Your preserved flowers', 'Hanging hardware'],
    colours: ['Clear', 'Custom'],
    occasions: ['Wedding', 'Anniversary', 'Memorial'],
    tags: ['flower preservation', 'wedding', 'bouquet', 'made to order', 'keepsake'],
    careNotes: 'Hang away from direct sunlight to preserve petal colours. Dust gently with a soft cloth. This piece is heavy — use appropriate wall anchors.',
    personalisation: {
      enabled: true,
      fields: [
        {
          name: 'size',
          type: 'color',
          label: 'Frame size',
          options: ['A4 (21 × 30 cm)', 'A3 (30 × 42 cm)'],
          required: true,
        },
        { name: 'notes', type: 'textarea', label: 'Tell us about these flowers', placeholder: 'Where are they from? Any special arrangement you\'d like?', maxLength: 500 },
      ],
    },
    variants: [
      { id: 'var_wed_a4', name: 'A4 (21 × 30 cm)', price: 699900, stock: 0, sku: 'AN-FLR-WED-015-A4', attributes: { size: 'A4' } },
      { id: 'var_wed_a3', name: 'A3 (30 × 42 cm)', price: 899900, stock: 0, sku: 'AN-FLR-WED-015-A3', attributes: { size: 'A3' } },
    ],
    status: 'ACTIVE',
    featured: false,
    bestseller: false,
    artSeed: 1500,
    artVariant: 'flower-in-resin',
    artPalette: ['#FFF6E5', '#F7A8C4', '#8EE3C2', '#FFB627'],
    createdAt: '2026-09-11T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_garden_paperweight',
    slug: 'garden-blooms-paperweight',
    name: 'Garden Blooms Paperweight',
    tagline: 'A garden on your desk',
    description:
      'A dome of crystal-clear resin holding real pressed flowers — a tiny garden scene frozen in time. Heavy enough to keep your papers in place, pretty enough to just stare at. Each one is unique because we use whatever is blooming in the garden that week. This exact piece won\'t be made again.',
    makerNote: 'We pour these dome-side down in a spherical mould, which means the flowers need to be placed upside down. It\'s a brain teaser every time.',
    type: 'UNIQUE',
    category: 'Home Décor',
    price: 89900,
    sku: 'AN-HOM-GAR-016',
    stock: 1,
    lowStockThreshold: 1,
    weightGrams: 350,
    dimensionsMm: { length: 80, width: 80, height: 60 },
    materials: ['Epoxy resin', 'Pressed flowers', 'Felt base'],
    colours: ['Clear', 'Green', 'Pink', 'Yellow'],
    occasions: ['Birthday', 'Thank You', 'Housewarming'],
    tags: ['one of a kind', 'paperweight', 'pressed flower', 'dome', 'desk'],
    careNotes: 'Wipe with a soft cloth. Keep away from prolonged direct sunlight to preserve flower colours.',
    status: 'ACTIVE',
    featured: false,
    bestseller: false,
    artSeed: 1600,
    artVariant: 'flower-in-resin',
    artPalette: ['#FFF6E5', '#8EE3C2', '#F7A8C4', '#FFB627'],
    createdAt: '2026-09-13T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_lagoon_trinket_dish',
    slug: 'lagoon-trinket-dish',
    name: 'Lagoon Trinket Dish',
    tagline: 'A little lagoon for your rings',
    description:
      'A shallow dish with green-blue resin that pools like a tropical lagoon, rimmed with gold leaf. Perfect for rings, earrings, keys or those random small things that need a home. Poured in a small batch, each one slightly different.',
    makerNote: 'The green-blue mix in this one is our house blend. We call it "Tuesday teal" because that\'s the day we first mixed it.',
    type: 'RESTOCKABLE',
    category: 'Home Décor',
    price: 79900,
    sku: 'AN-HOM-LAG-017',
    stock: 9,
    lowStockThreshold: 3,
    weightGrams: 200,
    dimensionsMm: { length: 120, width: 120, height: 15 },
    materials: ['Epoxy resin', 'Gold leaf', 'Mica pigments', 'Felt base'],
    colours: ['Teal', 'Green', 'Blue', 'Gold'],
    occasions: ['Birthday', 'Housewarming', 'Thank You'],
    tags: ['trinket dish', 'gold leaf', 'teal', 'jewellery holder'],
    careNotes: 'Wipe with a damp soft cloth. Not for food — owner to confirm. Decorative use recommended.',
    status: 'ACTIVE',
    featured: false,
    bestseller: false,
    artSeed: 1700,
    artVariant: 'coaster',
    artPalette: ['#12A8A0', '#0B5C73', '#D4A63A'],
    createdAt: '2026-09-16T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_starry_incense_holder',
    slug: 'starry-night-incense-holder',
    name: 'Starry Night Incense Holder',
    tagline: 'Burn under the stars',
    description:
      'A sleek navy resin holder with tiny silver specks scattered like a night sky. Has a groove for a standard incense stick and a shallow bowl to catch the ash. The dark resin makes the silver really pop, especially by candlelight.',
    makerNote: 'We add the silver specks with a toothpick, one by one. It takes forever but the result is worth it.',
    type: 'RESTOCKABLE',
    category: 'Home Décor',
    price: 54900,
    sku: 'AN-HOM-STR-018',
    stock: 14,
    lowStockThreshold: 4,
    weightGrams: 180,
    dimensionsMm: { length: 200, width: 40, height: 12 },
    materials: ['Epoxy resin', 'Silver mica', 'Felt base'],
    colours: ['Navy', 'Silver'],
    occasions: ['Birthday', 'Housewarming'],
    tags: ['incense', 'holder', 'starry', 'navy', 'functional'],
    careNotes: 'Wipe ash with a damp cloth after use. Resin is heat-resistant for normal incense use — owner to confirm safe temperature range. Do not leave burning incense unattended.',
    status: 'ACTIVE',
    featured: false,
    bestseller: false,
    artSeed: 1800,
    artVariant: 'tray',
    artPalette: ['#2B1B3D', '#1A1226', '#C0C0C0'],
    createdAt: '2026-09-17T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'prod_personalised_name_sign',
    slug: 'personalised-name-sign',
    name: 'Personalised Name Sign (up to 8 letters)',
    tagline: 'Your name in resin, your colours',
    description:
      'Custom resin letters spelling out a name, mounted on a wooden base or with wall-hanging hardware. Choose up to 8 letters and pick your colour palette — we\'ll pour each letter individually and finish them together. Great for kids\' rooms, nurseries, desks or as a wedding table centrepiece.',
    makerNote: 'We build a custom silicone mould for each letter combination, so these are truly made just for you.',
    type: 'MADE_TO_ORDER',
    category: 'Home Décor',
    price: 349900,
    sku: 'AN-HOM-NAM-019',
    stock: 0,
    lowStockThreshold: 0,
    leadTimeDays: 10,
    weightGrams: 600,
    dimensionsMm: { length: 400, width: 100, height: 20 },
    materials: ['Epoxy resin', 'Mica pigments', 'Wood base or wall hardware'],
    colours: ['Custom'],
    occasions: ['Birthday', 'Wedding', 'Housewarming'],
    tags: ['personalised', 'name', 'sign', 'letters', 'made to order', 'nursery'],
    careNotes: 'Dust with a soft cloth. Avoid dropping — individual letters can chip. Keep away from prolonged direct sunlight.',
    personalisation: {
      enabled: true,
      fields: [
        { name: 'text', type: 'text', label: 'Name or word', placeholder: 'E.g. ARIA', maxLength: 8, required: true },
        {
          name: 'colour',
          type: 'color',
          label: 'Colour palette',
          options: ['Ocean Blues', 'Sunset Warm', 'Forest Greens', 'Lavender Dream', 'Rose Gold', 'Rainbow', 'Monochrome'],
          required: true,
        },
        {
          name: 'mounting',
          type: 'color',
          label: 'Mounting style',
          options: ['Wooden base (freestanding)', 'Wall-mount hardware'],
          required: true,
        },
        { name: 'notes', type: 'textarea', label: 'Anything else?', placeholder: 'E.g. for a nursery, specific shades, add glitter...', maxLength: 300 },
      ],
    },
    status: 'ACTIVE',
    featured: true,
    bestseller: false,
    artSeed: 1900,
    artVariant: 'wall-art',
    artPalette: ['#B14AED', '#12A8A0', '#FFB627', '#FF6B5E'],
    createdAt: '2026-09-18T10:00:00Z',
    updatedAt: '2026-09-28T14:00:00Z',
  },
];

// Sample reviews for the first 10 products
export const reviews: Review[] = [
  // Ocean Wave Coasters
  { id: 'rev_001', productId: 'prod_ocean_wave_coaster', customerName: 'Priya', customerCity: 'Mumbai', rating: 5, title: 'Absolutely stunning!', text: 'These coasters are even more beautiful in person. The gold rim catches the light beautifully and each one is slightly different. Bought them for my new apartment and everyone asks about them.', verified: true, approved: true, helpfulCount: 12, createdAt: '2026-09-20T10:00:00Z' },
  { id: 'rev_002', productId: 'prod_ocean_wave_coaster', customerName: 'Arun', customerCity: 'Bengaluru', rating: 4, title: 'Great gift!', text: 'Bought these as a housewarming gift and my friends loved them. Packaging was excellent — arrived in perfect condition. Taking one star off only because I wish I\'d bought a set for myself too!', verified: true, approved: true, helpfulCount: 8, createdAt: '2026-09-22T10:00:00Z' },
  { id: 'rev_003', productId: 'prod_ocean_wave_coaster', customerName: 'Meera', customerCity: 'Delhi', rating: 5, title: 'Like tiny oceans', text: 'The swirls in each coaster are so different and organic. You can tell these are handmade with love. Already planning to order the Tidal Pool Clock next.', verified: true, approved: true, helpfulCount: 6, createdAt: '2026-09-25T10:00:00Z' },
  // Midnight Geode Coasters
  { id: 'rev_004', productId: 'prod_midnight_geode_coaster', customerName: 'Sanya', customerCity: 'Hyderabad', rating: 5, title: 'Worth the wait!', text: 'Yes, you wait a week, but when these arrive it\'s like unwrapping gemstones. The crystal edges are jaw-dropping. Worth every rupee.', verified: true, approved: true, helpfulCount: 15, createdAt: '2026-09-24T10:00:00Z' },
  { id: 'rev_005', productId: 'prod_midnight_geode_coaster', customerName: 'Rohan', customerCity: 'Pune', rating: 5, title: 'My wife cried (happy tears)', text: 'Anniversary gift. She\'s a geology nerd and these hit different. The purple tones are deeper than in the photos, which is a good thing.', verified: true, approved: true, helpfulCount: 20, createdAt: '2026-09-26T10:00:00Z' },
  // Candy Pop Coaster
  { id: 'rev_006', productId: 'prod_candy_pop_coaster', customerName: 'Aditi', customerCity: 'Jaipur', rating: 4, title: 'So cheerful!', text: 'This little coaster makes my desk so much more fun. The colours are vibrant and it\'s well-made. Bought four in different pours to make a set.', verified: true, approved: true, helpfulCount: 4, createdAt: '2026-09-21T10:00:00Z' },
  // Sunset Swirl Tray
  { id: 'rev_007', productId: 'prod_sunset_swirl_tray', customerName: 'Nisha', customerCity: 'Chennai', rating: 5, title: 'A conversation starter', text: 'Every guest who visits asks about this tray. The coral and gold combination is gorgeous. I keep my perfume bottles on it. One of a kind and it feels special knowing no one else has the same one.', verified: true, approved: true, helpfulCount: 11, createdAt: '2026-09-23T10:00:00Z' },
  // Rose Quartz Tray
  { id: 'rev_008', productId: 'prod_rose_quartz_tray', customerName: 'Kavya', customerCity: 'Kolkata', rating: 5, title: 'Dream vanity piece', text: 'The blush pink is exactly right — not too bright, not too pale. The gold leaf adds just the right amount of sparkle. Using it as my vanity tray and it makes getting ready in the morning feel luxurious.', verified: true, approved: true, helpfulCount: 9, createdAt: '2026-09-27T10:00:00Z' },
  { id: 'rev_009', productId: 'prod_rose_quartz_tray', customerName: 'Ananya', customerCity: 'Chandigarh', rating: 4, title: 'Beautiful but heavy', text: 'Truly beautiful piece. The gold leaf distribution is stunning. It\'s heavier than I expected, which actually makes it feel premium. Took 8 days to make but the maker kept me updated which was nice.', verified: true, approved: true, helpfulCount: 5, createdAt: '2026-09-28T10:00:00Z' },
  // Amethyst Geode Wall Art
  { id: 'rev_010', productId: 'prod_amethyst_geode_wall', customerName: 'Vikram', customerCity: 'Ahmedabad', rating: 5, title: 'Museum quality', text: 'I\'ve bought art from galleries and this piece holds its own against anything I\'ve seen. The layers are visible when you look closely and the gold veins are mesmerising. Packing was incredibly careful — bubble wrap, foam, the works.', verified: true, approved: true, helpfulCount: 18, createdAt: '2026-09-19T10:00:00Z' },
  // Marigold Pendant
  { id: 'rev_011', productId: 'prod_marigold_pendant', customerName: 'Riya', customerCity: 'Lucknow', rating: 5, title: 'My everyday necklace', text: 'I haven\'t taken this off since I got it. The marigold petal is perfectly preserved and the chain length is just right. Gets compliments constantly.', verified: true, approved: true, helpfulCount: 7, createdAt: '2026-09-20T10:00:00Z' },
  { id: 'rev_012', productId: 'prod_marigold_pendant', customerName: 'Simran', customerCity: 'Amritsar', rating: 4, title: 'Lovely, but delicate', text: 'The pendant is beautiful and the petal looks amazing inside. I do wish the chain was a bit sturdier — I\'m just being careful with it. The resin part is excellent quality.', verified: true, approved: true, helpfulCount: 3, createdAt: '2026-09-24T10:00:00Z' },
  // Forget-Me-Not Earrings
  { id: 'rev_013', productId: 'prod_forget_me_not_earrings', customerName: 'Tara', customerCity: 'Kochi', rating: 5, title: 'Tiny masterpieces', text: 'How do they get such tiny flowers into resin?! These are so delicate and pretty. No irritation on my sensitive ears either. Already want the pendant next.', verified: true, approved: true, helpfulCount: 10, createdAt: '2026-09-22T10:00:00Z' },
  // Cosmic Dust Keychain
  { id: 'rev_014', productId: 'prod_cosmic_dust_keychain', customerName: 'Dev', customerCity: 'Goa', rating: 5, title: 'Galaxy vibes!', text: 'The holographic glitter in this is INSANE. I keep catching myself staring at it. Bought one for myself and three as gifts. The tassel is a nice touch.', verified: true, approved: true, helpfulCount: 6, createdAt: '2026-09-25T10:00:00Z' },
];

// Collections
export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  story?: string;
  productIds: string[];
  featured: boolean;
  seoDescription: string;
}

export const collections: Collection[] = [
  {
    id: 'col_new_arrivals',
    slug: 'new-arrivals',
    name: 'New Arrivals',
    description: 'Fresh from the studio table — our newest pours, just cured and ready for their new homes.',
    productIds: ['prod_personalised_name_sign', 'prod_starry_incense_holder', 'prod_lagoon_trinket_dish', 'prod_garden_paperweight', 'prod_tidal_pool_clock'],
    featured: true,
    seoDescription: 'Shop the latest handmade resin art from The ArtNook — new coasters, trays, wall art, jewellery and home décor, poured by hand in small batches.',
  },
  {
    id: 'col_bestsellers',
    slug: 'bestsellers',
    name: 'Bestsellers',
    description: 'The pieces people keep coming back for. Tried, loved and repurchased — these are our studio MVPs.',
    productIds: ['prod_ocean_wave_coaster', 'prod_candy_pop_coaster', 'prod_rose_quartz_tray', 'prod_marigold_pendant'],
    featured: true,
    seoDescription: 'Shop The ArtNook bestsellers — our most popular handmade resin coasters, trays, jewellery and home décor.',
  },
  {
    id: 'col_ocean_dreams',
    slug: 'ocean-dreams',
    name: 'Ocean Dreams',
    description: 'Blues, teals and seafoam whites — for anyone who\'d rather be by the ocean.',
    story: 'We live three hours from the coast, but every time we visit, we bring back the colours in our heads and pour them into resin. This collection is our love letter to the sea.',
    productIds: ['prod_ocean_wave_coaster', 'prod_tidal_pool_clock', 'prod_lagoon_trinket_dish'],
    featured: true,
    seoDescription: 'Ocean-inspired handmade resin art — wave coasters, tidal clocks and lagoon trinket dishes from The ArtNook.',
  },
  {
    id: 'col_geode_gallery',
    slug: 'geode-gallery',
    name: 'Geode Gallery',
    description: 'Crystal edges, agate bands and the kind of sparkle that makes geologists emotional.',
    productIds: ['prod_midnight_geode_coaster', 'prod_amethyst_geode_wall'],
    featured: false,
    seoDescription: 'Handmade resin geode art — coasters and wall pieces with crystal edges and agate bands from The ArtNook.',
  },
  {
    id: 'col_pressed_flowers',
    slug: 'pressed-flower-keepsakes',
    name: 'Pressed Flower Keepsakes',
    description: 'Real flowers, pressed and preserved in crystal-clear resin. Gardens that last forever.',
    productIds: ['prod_marigold_pendant', 'prod_forget_me_not_earrings', 'prod_pressed_flower_bookmark', 'prod_wedding_bouquet_frame', 'prod_garden_paperweight'],
    featured: true,
    seoDescription: 'Pressed flower resin art — pendants, earrings, bookmarks and preservation frames from The ArtNook.',
  },
  {
    id: 'col_gifts_under_999',
    slug: 'gifts-under-999',
    name: 'Gifts Under ₹999',
    description: 'Thoughtful handmade gifts that won\'t break the bank. Perfect for birthdays, thank-yous, or just because.',
    productIds: ['prod_candy_pop_coaster', 'prod_marigold_pendant', 'prod_forget_me_not_earrings', 'prod_cosmic_dust_keychain', 'prod_name_initial_keychain', 'prod_pressed_flower_bookmark', 'prod_gold_fleck_bookmark', 'prod_garden_paperweight', 'prod_lagoon_trinket_dish', 'prod_starry_incense_holder'],
    featured: true,
    seoDescription: 'Handmade resin gifts under ₹999 from The ArtNook — coasters, jewellery, keychains, bookmarks and more.',
  },
  {
    id: 'col_wedding_anniversary',
    slug: 'wedding-and-anniversary',
    name: 'Wedding & Anniversary',
    description: 'Pieces made for love stories — bouquet preservation, gilded trays and art that marks a milestone.',
    productIds: ['prod_wedding_bouquet_frame', 'prod_rose_quartz_tray', 'prod_sunset_swirl_tray', 'prod_amethyst_geode_wall'],
    featured: false,
    seoDescription: 'Wedding and anniversary handmade resin art — bouquet preservation, trays and wall art from The ArtNook.',
  },
  {
    id: 'col_home_glow_up',
    slug: 'home-glow-up',
    name: 'Home Glow-Up',
    description: 'Little upgrades that make your space feel like you. Functional art for every room.',
    productIds: ['prod_ocean_wave_coaster', 'prod_sunset_swirl_tray', 'prod_tidal_pool_clock', 'prod_lagoon_trinket_dish', 'prod_starry_incense_holder', 'prod_personalised_name_sign'],
    featured: false,
    seoDescription: 'Handmade resin home décor — coasters, trays, clocks, trinket dishes and name signs from The ArtNook.',
  },
  {
    id: 'col_sale',
    slug: 'sale',
    name: 'Sale',
    description: 'Good things at better prices. Grab them before they\'re gone — sale items don\'t stick around long.',
    productIds: [],
    featured: false,
    seoDescription: 'Sale on handmade resin art from The ArtNook — discounted coasters, trays, jewellery and home décor.',
  },
];

// FAQ Data
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Orders' | 'Shipping' | 'Custom' | 'Care' | 'Payments' | 'Returns';
}

export const faqItems: FaqItem[] = [
  { id: 'faq_01', question: 'How long does shipping take?', answer: 'Standard shipping takes 5 to 7 business days within India. Express shipping delivers in 2 to 3 business days. Made-to-order pieces have an additional lead time shown on the product page — we\'ll keep you updated every step of the way.', category: 'Shipping' },
  { id: 'faq_02', question: 'Do you ship internationally?', answer: 'Not just yet, but we\'re working on it! Sign up for our newsletter and we\'ll let you know when international shipping opens up.', category: 'Shipping' },
  { id: 'faq_03', question: 'Is shipping free?', answer: 'Standard shipping is free on orders above ₹1,999. Below that, a flat shipping fee applies based on your location.', category: 'Shipping' },
  { id: 'faq_04', question: 'Can I track my order?', answer: 'Absolutely! Once your order ships, you\'ll get an email with a tracking link. You can also check your order status anytime on the Track Order page using your order number and email.', category: 'Orders' },
  { id: 'faq_05', question: 'What if my piece arrives damaged?', answer: 'We pack everything with serious padding, but if something arrives broken, send us photos within 48 hours of delivery and we\'ll sort it out — either a replacement or a full refund, your choice.', category: 'Returns' },
  { id: 'faq_06', question: 'Can I return or exchange a piece?', answer: 'Non-custom, non-personalised items can be returned within 7 days of delivery if they\'re unused and in original packaging. Custom and personalised pieces can\'t be returned unless there\'s a defect, because they\'re made just for you.', category: 'Returns' },
  { id: 'faq_07', question: 'How do refunds work?', answer: 'Once we approve your return, refunds are processed within 5 to 7 business days back to your original payment method. We\'ll email you when the refund is on its way.', category: 'Returns' },
  { id: 'faq_08', question: 'What payment methods do you accept?', answer: 'UPI, credit/debit cards, netbanking, popular wallets and Cash on Delivery (on eligible orders under the COD limit). We use Razorpay for secure payments — we never see your card details.', category: 'Payments' },
  { id: 'faq_09', question: 'Is Cash on Delivery available?', answer: 'COD is available on orders up to a certain value and for serviceable pincodes. You\'ll see the option at checkout if it\'s available for your order. A small COD fee may apply.', category: 'Payments' },
  { id: 'faq_10', question: 'Can I cancel my order?', answer: 'You can cancel within 2 hours of placing your order, as long as it hasn\'t entered production yet. Made-to-order pieces can\'t be cancelled once work has begun — we\'ll let you know the cutoff.', category: 'Orders' },
  { id: 'faq_11', question: 'How do custom commissions work?', answer: 'Fill out our commission form with your idea, references and budget. We\'ll get back to you within 2 to 3 days with a quote. If you\'re happy, pay a 50% deposit and we start creating. You\'ll get progress photos and a preview before the final piece ships.', category: 'Custom' },
  { id: 'faq_12', question: 'How much does a custom piece cost?', answer: 'It depends on the size, complexity and materials. Most custom coaster sets start around ₹1,200 and wall art starts around ₹4,000. Fill out the commission form and we\'ll give you a detailed quote — no obligations.', category: 'Custom' },
  { id: 'faq_13', question: 'How long does a commission take?', answer: 'Typically 2 to 4 weeks depending on the complexity. Flower preservation takes longer (3 to 4 weeks) because the drying process can\'t be rushed. We\'ll give you a timeline with your quote — owner to confirm specific timelines.', category: 'Custom' },
  { id: 'faq_14', question: 'Can I send my own flowers for preservation?', answer: 'Yes! Once you place a commission order, we\'ll send you detailed instructions on how to pack and ship your flowers to us. The sooner after the event, the better — ideally within 3 days.', category: 'Custom' },
  { id: 'faq_15', question: 'Are your products food safe?', answer: 'Our coasters and trays are designed for decorative use and for placing cups and glasses on. For direct food contact safety claims — owner to confirm. We recommend using them for dry items and drinks in cups.', category: 'Care' },
  { id: 'faq_16', question: 'How do I care for resin art?', answer: 'Wipe with a damp soft cloth. Keep away from prolonged direct sunlight (colours can fade over time). Avoid harsh chemicals and abrasive cleaners. Check our Care Guide for detailed tips per product type.', category: 'Care' },
  { id: 'faq_17', question: 'Is resin heat resistant?', answer: 'Resin can handle warm cups, but very hot items straight from the stove or microwave can leave marks. We recommend using trivets for hot cookware — owner to confirm specific temperature thresholds.', category: 'Care' },
  { id: 'faq_18', question: 'Why do some pieces have tiny bubbles?', answer: 'Tiny bubbles and unique swirl patterns are part of the handmade charm — they happen naturally during the curing process and make each piece truly one of a kind. We do our best to minimise them, but they\'re a feature, not a flaw.', category: 'Care' },
  { id: 'faq_19', question: 'Can I get a GST invoice?', answer: 'Yes! Add your GSTIN during checkout and we\'ll generate a proper GST invoice with the tax breakdown. You can also download it from your order page.', category: 'Payments' },
  { id: 'faq_20', question: 'What happens to one-of-a-kind pieces when they sell?', answer: 'They\'re gone forever! The page stays up so you can see what it looked like, and we suggest similar pieces or offer to create a custom pour inspired by it. That\'s the beauty (and urgency) of unique handmade art.', category: 'Orders' },
];

// Journal posts
export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Studio Notes' | 'Tutorials' | 'Gift Guides' | 'Care';
  coverArtSeed: number;
  readingTime: number;
  tags: string[];
  publishedAt: string;
}

export const journalPosts: JournalPost[] = [
  {
    id: 'journal_01',
    slug: 'why-every-pour-is-different',
    title: 'Why Every Pour Is Different (And Why That\'s the Point)',
    excerpt: 'People sometimes ask why their piece doesn\'t look exactly like the photo. Here\'s the beautiful reason why.',
    content: `When we mix resin, we're working with a material that has a mind of its own. Temperature, humidity, the angle of the pour, even the speed at which we stir — all of it changes the outcome. Two pours on the same day, same colours, same mould, and they'll come out looking like cousins, not twins.

That used to stress us out. We'd try to replicate a popular design exactly, and every time the resin would surprise us. A bubble here, a colour bloom there, a lacing pattern we didn't plan.

Then something shifted. We started leaning into it. Instead of fighting the resin, we'd set up the conditions — the right pigments, the right temperature — and then let it do its thing. The results were better than anything we could have planned. Swirls that looked like satellite photos of oceans. Geode edges that crackled like real crystal. Colour blends we'd never have mixed on purpose.

So when you order a piece from us, know that it will look *like* the photo, but it won't be *identical*. It'll have its own tiny quirks, its own personality. That's not a compromise — that's the whole point of handmade art.

Every bubble, every unique swirl, every happy accident is what makes your piece yours and nobody else's. And honestly? The pieces where the resin surprised us the most tend to be the ones we're proudest of.

That's why we always say: we pour the resin, but the resin decides the art.`,
    category: 'Studio Notes',
    coverArtSeed: 2001,
    readingTime: 3,
    tags: ['process', 'handmade', 'resin'],
    publishedAt: '2026-09-15T10:00:00Z',
  },
  {
    id: 'journal_02',
    slug: 'gift-guide-under-1000',
    title: 'The Under-₹1,000 Gift Guide (For People Who Have Everything)',
    excerpt: 'Ten handmade pieces that prove you don\'t need to spend a lot to give something unforgettable.',
    content: `We've all been there. Birthday coming up, and the person already has everything. Another candle? A mug? Gift card feels impersonal. You want something that makes them go "wait, where did you find this?"

Good news: most of our studio's pieces are under ₹1,000, and every single one comes gift-ready. Here's our curated guide for the person who's impossible to shop for.

**For the reader:** Our Pressed Flower Bookmark (₹349) or Gold-Fleck Bookmark (₹299). Real flowers or real gold flakes, sealed in slim resin. Comes with a tassel. Pair two together for a set.

**For the jewellery lover:** The Marigold Meadow Pendant (₹599) with a real pressed marigold, or the Forget-Me-Not Earrings (₹449). Dainty, unique and hand-finished.

**For the desk dweller:** The Candy Pop Coaster (₹349) — one bright little coaster that turns any desk into a happier place. Or the Lagoon Trinket Dish (₹799) for their rings and bits.

**For the galaxy nerd:** Cosmic Dust Keychain (₹249). Holographic glitter in dark purple resin, with a soft tassel. They'll stare at it instead of checking their phone.

**For the personalised-everything person:** Name Initial Keychain (₹299). Their letter, their colour choice, poured to order.

**For the home bird:** Starry Night Incense Holder (₹549). Navy resin with silver specks, functional and gorgeous.

**Pro tip:** Add our gift wrapping at checkout. We use kraft paper, dried flowers and a handwritten note. No one will believe you spent under a thousand rupees.`,
    category: 'Gift Guides',
    coverArtSeed: 2002,
    readingTime: 3,
    tags: ['gifts', 'budget', 'guide'],
    publishedAt: '2026-09-20T10:00:00Z',
  },
  {
    id: 'journal_03',
    slug: 'how-to-care-for-resin-art',
    title: 'How to Care for Your Resin Art (So It Lasts a Lifetime)',
    excerpt: 'A few simple habits to keep your resin pieces looking gorgeous for years. No special tools needed.',
    content: `Resin art is surprisingly low-maintenance, but there are a few things that'll keep your pieces looking brand new for years. Here's everything we tell our customers after they buy.

**The golden rule: be gentle.** A soft, damp cloth is all you need for cleaning. Skip the harsh chemicals, abrasive sponges, and anything with ammonia or acetone. Warm water and a drop of mild soap for stubborn spots. That's it.

**Keep it out of the marathon sun.** Short bursts of sunlight are fine — your coasters on a sunny table, a wall piece in a bright room. But prolonged direct sunlight (we're talking hours every day) can gradually yellow clear resin and fade colours. If you can, keep pieces out of a window's direct glare.

**Heat: warm is fine, hot is not.** Your morning chai cup? Totally fine. A pot straight from the stove? Not great. Very hot items can leave marks on resin surfaces. When in doubt, use a trivet. For specific temperature claims — owner to confirm.

**Jewellery gets extra love.** Remove resin earrings and pendants before swimming, showering, or sleeping. Store them flat in the pouch we send them in. Keep away from perfume and hairspray — spray first, jewels second.

**Bookmarks: don't bend them.** Thin resin bookmarks are strong but not flexible. If you try to bend one, it can snap. Slide them between pages rather than bending them in.

**If something chips or scratches:** Small chips on coasters can be filed smooth with fine-grit sandpaper (2000 grit), then buffed with a bit of car polish. Seriously — it works. For bigger damage, send us a photo and we'll see if we can help.

Want category-specific tips? Check out our full Care Guide with illustrated do's and don'ts for every product type.`,
    category: 'Care',
    coverArtSeed: 2003,
    readingTime: 3,
    tags: ['care', 'tips', 'maintenance'],
    publishedAt: '2026-09-25T10:00:00Z',
  },
  {
    id: 'journal_04',
    slug: 'behind-the-pour-ocean-waves',
    title: 'Behind the Pour: How We Make Ocean Wave Coasters',
    excerpt: 'A peek into the process behind our bestselling ocean wave coasters — from pigment mixing to that satisfying gold rim.',
    content: `Our Ocean Wave Coaster Set has been our bestseller since day one, and people always ask how we get those wave effects. So here's a peek behind the studio curtain.

**Step 1: The base pour.** We start with a deep blue-tinted resin poured into a round silicone mould. This is the ocean floor — it needs to be dark and moody. We let this cure for about 6 hours until it's tacky but not fully set.

**Step 2: The wave layer.** This is where the magic happens. We mix three shades of blue-green resin and pour them in a specific pattern — think of it like drawing a wave with liquid colour. Then we use a heat gun to create the "lacing" effect. The heat makes the different resin densities interact, creating those organic, cell-like patterns that look like sea foam.

**Step 3: White caps.** While the wave layer is still liquid, we drip white resin from a stick along the wave crests and blow on it gently with a straw. The white spreads into thin, natural-looking foam lines. This takes practice — too much white and it looks like toothpaste. Too little and you lose the wave feel.

**Step 4: Cure time.** Into the curing shelf they go, covered to keep dust out, for a full 24 hours. Patience is everything here. Rush it and you get soft spots.

**Step 5: Gold rim and finish.** Once fully cured, we pop them out of the moulds, sand the edges smooth (starting at 400 grit, working up to 3000), apply gold leaf to the rim with sizing adhesive, and seal the back with cork. The gold rim is our favourite part — each one gets applied by hand, so the coverage is slightly different on every coaster.

**Step 6: Quality check and packing.** We check every coaster for bubbles, soft spots, uneven edges or gold gaps. Then they go into tissue paper, into a kraft box, into a padded mailer. We're serious about packing because we've seen what courier services can do.

Total time per set: about 3 days from first pour to boxed. That's why we make them in batches and why they occasionally sell out. Each set represents three days of hands-on work, and we love every pour.`,
    category: 'Tutorials',
    coverArtSeed: 2004,
    readingTime: 4,
    tags: ['process', 'ocean', 'coasters', 'tutorial'],
    publishedAt: '2026-09-28T10:00:00Z',
  },
];

// Discount codes
export interface Discount {
  id: string;
  code: string;
  type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';
  value: number; // percentage or amount in paise
  minOrderValue?: number; // in paise
  maxUsesTotal?: number;
  maxUsesPerCustomer: number;
  firstOrderOnly: boolean;
  startsAt: string;
  endsAt?: string;
  applicableCollections?: string[];
  applicableProducts?: string[];
  stackable: boolean;
  active: boolean;
}

export const discounts: Discount[] = [
  {
    id: 'disc_welcome10',
    code: 'WELCOME10',
    type: 'PERCENTAGE',
    value: 10,
    minOrderValue: 49900,
    maxUsesPerCustomer: 1,
    firstOrderOnly: true,
    startsAt: '2026-01-01T00:00:00Z',
    stackable: false,
    active: true,
  },
  {
    id: 'disc_freeship',
    code: 'NOOKFREESHIP',
    type: 'FREE_SHIPPING',
    value: 0,
    minOrderValue: 79900,
    maxUsesPerCustomer: 3,
    firstOrderOnly: false,
    startsAt: '2026-01-01T00:00:00Z',
    stackable: true,
    active: true,
  },
  {
    id: 'disc_gifty100',
    code: 'GIFTY100',
    type: 'FIXED_AMOUNT',
    value: 10000, // ₹100 in paise
    minOrderValue: 149900,
    maxUsesPerCustomer: 1,
    firstOrderOnly: false,
    startsAt: '2026-01-01T00:00:00Z',
    stackable: false,
    active: true,
  },
];

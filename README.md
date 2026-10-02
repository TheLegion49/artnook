# 🎨 The ArtNook — Handmade Resin Art Studio

A full-stack, production-grade e-commerce application built for **The ArtNook**, an independent studio crafting handmade epoxy resin coasters, serving trays, geode wall art, jewellery, bookmarks, and bespoke memorial/wedding flower preservation keepsakes.

---

## 🌟 Highlights & Features

- **Brand & Aesthetics ("Lived-In Studio")**: Custom design tokens with warm paper backgrounds (`#FFF6E5`), rich ink typography (`#2B1B3D`), teal accents (`#12A8A0`), sticker-style drop shadows, and subtle paper grain turbulence overlays.
- **Deterministic Procedural Art (`<ResinArt />`)**: Custom SVG engine using Mulberry32 PRNG and `feTurbulence` / `feDisplacementMap` filters to render 10 resin product variants (coasters, trays, geode panels, tidal clocks, floral pendants, dome paperweights) with zero SSR hydration mismatch.
- **Full Catalog & Seed Engine**: 19 distinct handmade items across 8 categories with explicit support for:
  - `UNIQUE` pieces (quantity locked to 1, showing "Sold" states once purchased)
  - `RESTOCKABLE` pieces (real inventory counters & low-stock triggers)
  - `MADE_TO_ORDER` items (lead times computed at checkout)
- **Persisted Commerce Engine**: Zustand cart & wishlist backed by `localStorage` with:
  - Dynamic gift wrapping with handwritten notes
  - Real-time free shipping threshold progress bottle (₹1,999)
  - Multi-tier discount voucher validator (`WELCOME10`, `NOOKFREESHIP`, `GIFTY100`)
  - Dedicated slide-over drawer and full cart page
- **5-Step Custom Commission Flow (`/commissions/new` & `/commissions/[id]`)**:
  - Interactive questionnaire for sizes, palettes, floral preservation and budget
  - Live commission timeline tracker with 50% deposit and completion balance payments
  - Milestone approvals with procedural preview renderings
  - Live two-way conversation thread between customer and studio maker
- **Customer Account Portal (`/account`)**:
  - Order history with downloadable PDF invoices
  - Synchronized wishlist with one-click nook adds
  - Saved multi-address book
  - Active custom pour status
  - GDPR/DPDP compliant full data export (JSON) and account deletion requests
- **Maker Admin Dashboard (`/admin`)**:
  - Daily/monthly revenue and active orders analytics
  - Low-stock and sold-out alert notices
  - Real-time catalogue inventory adjuster (+/- restock)
  - Order fulfillment workflow (Paid → In Studio → Quality Check → Packed → Shipped → Delivered)
  - Commissions Kanban board
  - Store configuration controls (announcement bar banner, free shipping threshold)
- **Order Tracking (`/track`)**: Public order lookup by order ID and email with courier tracking numbers and carrier portals.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router with Turbopack & React 19)
- **Language**: TypeScript in strict mode
- **Styling**: Tailwind CSS with custom theme variables
- **Typography**: Google Fonts (`Fraunces` for display, `DM Sans` for body, `Caveat` for maker notes, `Space Mono` for labels)
- **State Management**: Zustand with persistent storage
- **Icons**: Lucide React + custom inline SVGs

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.17+ or newer
- npm, pnpm, or yarn

### 2. Installation
```bash
cd artnook
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Neon or Supabase) |
| `PAYMENT_PROVIDER` | `mock` (default for frontend demo) \| `razorpay` \| `stripe` |
| `STORE_CURRENCY` | Currency code (`INR` default, supports `USD`) |
| `SHIPPING_ORIGIN_PINCODE` | Studio dispatch postal code (`560038`) |
| `ADMIN_EMAILS` | Comma-separated list of authorized maker emails |

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Quality Check
```bash
npm run build
npm run start
```

---

## 💳 Test Payment Cards & UPI IDs

In `mock` mode (the default sandbox mode), any realistic inputs can be submitted:
- **Test UPI ID**: `artnook@okhdfcbank` or `success@razorpay`
- **Test Card**: `4000 0012 3456 7890` (Any expiry in future, CVV `123`)
- **Cash on Delivery**: Available for orders under ₹5,000

---

## 📦 Swapping to Live Payment Providers

The application structure delegates payment interactions to the standard payment interface. To enable real Razorpay or Stripe:
1. Set `PAYMENT_PROVIDER="razorpay"` or `"stripe"` in your `.env.local`.
2. Provide your API keys (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` or `STRIPE_SECRET_KEY`).
3. Connect the webhook listeners located in `src/app/api/webhooks/razorpay/route.ts` to convert holds into verified order receipts.

---

## 🖼️ Replacing Procedural Art with Real Photography

Each product record in `src/data/products.ts` specifies:
```typescript
artSeed: 42,
artVariant: 'coaster',
artPalette: ['#0B5C73', '#12A8A0', '#FFFFFF', '#D4A63A']
```
When real photography is ready:
1. Upload images to Cloudinary, UploadThing, or your public folder (e.g. `/images/products/ocean-coaster-1.jpg`).
2. Add an `imageUrl?: string` to the product object.
3. The `<ProductCard>` and `<ResinArt>` components are pre-configured to prioritize real image URLs when present and fallback to procedural SVG generation otherwise.

---

## 📐 Assumptions & Decisions

1. **Fallback Persistence**: Since no live database is connected by default, user carts, wishlists, and demo orders are persisted client-side in browser `localStorage`.
2. **Tax & Legal Claims**: As instructed by the brief, all tax calculations (GST) and temperature tolerances are marked as studio estimates subject to accountant/owner confirmation.
3. **Free Shipping**: Default threshold is set at ₹1,999; orders below this incur a flat ₹99 standard shipping fee.

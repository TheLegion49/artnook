import React from 'react';
import Link from 'next/link';
import {
  getNewArrivals,
  getBestsellerProducts,
  getAllCategories,
  getAllJournalPosts,
} from '@/lib/api';
import { ProductCard } from '@/components/product/ProductCard';
import { ResinArt } from '@/components/art/ResinArt';
import { PolaroidFrame, StickyNote, TornPaperDivider, Sparkle, Heart } from '@/components/doodles/Doodles';
import { ArrowRight, Sparkles, Check, Clock, ShieldCheck, Box, RefreshCw } from 'lucide-react';
import { reviews } from '@/data/products';

export default async function HomePage() {
  const newArrivals = await getNewArrivals(8);
  const bestsellers = await getBestsellerProducts();
  const categories = getAllCategories();
  const journalPosts = (await getAllJournalPosts()).slice(0, 3);
  const featuredReviews = reviews.slice(0, 4);

  const moodColours = [
    { name: 'Deep blue', hex: '#0B5C73', label: 'Ocean Calms' },
    { name: 'Teal', hex: '#12A8A0', label: 'Lagoon Vibes' },
    { name: 'Coral', hex: '#FF6B5E', label: 'Sunset Glow' },
    { name: 'Marigold', hex: '#FFB627', label: 'Warm Sunlight' },
    { name: 'Purple', hex: '#B14AED', label: 'Mystic Geode' },
    { name: 'Pink', hex: '#F7A8C4', label: 'Rose Quartz' },
    { name: 'Mint', hex: '#8EE3C2', label: 'Fresh Spring' },
    { name: 'Gold', hex: '#D4A63A', label: 'Gilded Leaf' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-paper pt-8 pb-16 md:py-20 border-b-2 border-ink">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-teal/15 via-rose/15 to-marigold/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-ink bg-paper-deep text-ink text-xs font-label uppercase font-bold tracking-wider sticker-shadow">
                <Sparkles className="w-3.5 h-3.5 text-orchid" />
                <span>Hand-poured in small studio batches</span>
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.08] tracking-tight">
                Little pieces of{' '}
                <span className="hand-underline text-teal">colour</span>, poured by hand.
              </h1>

              <p className="text-base sm:text-lg text-ink/80 font-body max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Handmade epoxy resin coasters, floral keepsakes, trays and geode wall art.
                Every pour has its own rhythm, its own tiny quirks, and a story waiting to be told.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl border-2 border-ink bg-marigold text-ink font-body font-bold text-base sticker-shadow hover:bg-marigold/90 active:translate-y-0.5 active:translate-x-0.5 text-center flex items-center justify-center gap-2"
                >
                  <span>Shop the studio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/commissions"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl border-2 border-ink bg-paper text-ink font-body font-bold text-base hover:bg-paper-deep transition-all text-center flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-orchid" />
                  <span>Order a custom pour</span>
                </Link>
              </div>

              {/* Mini maker quote */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-3">
                <div className="w-9 h-9 rounded-full border border-ink/40 bg-teal/20 flex items-center justify-center text-sm font-hand font-bold">
                  AN
                </div>
                <span className="font-hand text-base text-ink/75">
                  "We poured our newest ocean coasters on a rainy Tuesday."
                </span>
              </div>
            </div>

            {/* Right Column: Polaroid collage */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
              {/* Card 1: Coaster */}
              <div className="absolute top-2 left-4 sm:left-12 z-20 w-44 sm:w-52">
                <PolaroidFrame caption="Ocean Wave Coaster" seed={42}>
                  <ResinArt
                    seed={42}
                    palette={['#0B5C73', '#12A8A0', '#FFFFFF', '#D4A63A']}
                    variant="coaster"
                    size="100%"
                  />
                </PolaroidFrame>
              </div>

              {/* Card 2: Tray */}
              <div className="absolute top-16 right-2 sm:right-8 z-10 w-48 sm:w-56">
                <PolaroidFrame caption="Sunset Swirl Tray" seed={314}>
                  <ResinArt
                    seed={314}
                    palette={['#FF6B5E', '#FFB627', '#D4A63A']}
                    variant="tray"
                    size="100%"
                  />
                </PolaroidFrame>
              </div>

              {/* Card 3: Geode Art */}
              <div className="absolute -bottom-4 left-16 sm:left-28 z-30 w-48 sm:w-56">
                <PolaroidFrame caption="Amethyst Geode" seed={555}>
                  <ResinArt
                    seed={555}
                    palette={['#B14AED', '#7B2FBE', '#D4A63A']}
                    variant="geode"
                    size="100%"
                  />
                </PolaroidFrame>
              </div>

              {/* Decorative sparkles */}
              <Sparkle className="absolute top-0 right-2 w-8 h-8 text-marigold animate-pulse" />
              <Heart className="absolute bottom-2 right-4 w-7 h-7 text-coral -rotate-12" />
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="bg-paper-deep border-b-2 border-ink py-4 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-body font-semibold text-ink">
              <span className="text-xl">🎨</span>
              <span>Handmade in small batches</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-body font-semibold text-ink">
              <Box className="w-4 h-4 text-teal" />
              <span>Safe, padded packaging</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-body font-semibold text-ink">
              <ShieldCheck className="w-4 h-4 text-marigold" />
              <span>Free shipping over ₹1,999</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-body font-semibold text-ink">
              <RefreshCw className="w-4 h-4 text-orchid" />
              <span>Easy 7-day returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY TYPE */}
      <section className="py-14 bg-paper border-b-2 border-ink overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="font-label text-xs uppercase tracking-wider font-bold text-teal block mb-1">
                Browse our creations
              </span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
                Shop by Type
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs md:text-sm font-bold text-ink hover:text-teal flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-none">
            {categories.map((cat, idx) => (
              <Link
                key={cat}
                href={`/shop?category=${encodeURIComponent(cat)}`}
                className="group flex flex-col items-center shrink-0 w-28 md:w-32"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-ink bg-paper-deep p-2 flex items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-[4px_4px_0px_#2B1B3D]">
                  <ResinArt
                    seed={100 + idx * 77}
                    palette={['#12A8A0', '#FFB627', '#0B5C73']}
                    variant="coaster"
                    size="100%"
                  />
                </div>
                <span className="font-body font-bold text-xs md:text-sm text-ink text-center mt-2.5 group-hover:text-teal transition-colors">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FRESH FROM THE TABLE */}
      <section className="py-16 bg-paper-deep/40 border-b-2 border-ink">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-label text-xs uppercase font-bold text-coral tracking-wider">
                  Fresh pours
                </span>
                <span className="px-2 py-0.5 rounded-full border border-ink bg-mint text-ink font-label text-[10px] uppercase font-bold">
                  Just cured ✨
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">
                Fresh from the Table
              </h2>
            </div>

            <Link
              href="/collections/new-arrivals"
              className="hidden sm:flex items-center gap-1 font-body font-bold text-sm text-ink hover:text-teal"
            >
              <span>See all arrivals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. SHOP BY MOOD */}
      <section className="py-16 bg-paper border-b-2 border-ink">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <span className="font-label text-xs uppercase tracking-wider font-bold text-teal block mb-1">
            Pick your palette
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-3">
            Shop by Mood
          </h2>
          <p className="font-body text-ink/75 max-w-md mx-auto mb-10 text-sm">
            Whether you need the cool calm of ocean blues or the warmth of golden marigolds.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {moodColours.map((m) => (
              <Link
                key={m.name}
                href={`/shop?colour=${encodeURIComponent(m.name)}`}
                className="group p-4 rounded-2xl border-2 border-ink bg-paper-deep/60 flex flex-col items-center transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_#2B1B3D]"
              >
                <div
                  className="w-12 h-12 rounded-full border-2 border-ink shadow-xs mb-3 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: m.hex }}
                />
                <span className="font-display font-bold text-sm text-ink">
                  {m.name}
                </span>
                <span className="font-hand text-xs text-ink/70">
                  {m.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BESTSELLERS */}
      <section className="py-16 bg-paper border-b-2 border-ink">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="font-label text-xs uppercase tracking-wider font-bold text-marigold block mb-1">
                Studio favourites
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">
                Bestsellers
              </h2>
            </div>
            <Link
              href="/collections/bestsellers"
              className="font-body font-bold text-sm text-ink hover:text-teal flex items-center gap-1"
            >
              <span>Explore all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. STUDIO STORY STRIP */}
      <section className="py-16 bg-paper-deep border-b-2 border-ink relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Maker portrait placeholder */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <PolaroidFrame caption="In the studio, covered in glitter" seed={999}>
                  <div className="w-56 h-56 bg-paper flex items-center justify-center p-2">
                    <ResinArt
                      seed={999}
                      palette={['#12A8A0', '#FFB627', '#F7A8C4', '#2B1B3D']}
                      variant="wall-art"
                      size={200}
                    />
                  </div>
                </PolaroidFrame>
              </div>
            </div>

            {/* Note and invitation */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="font-label text-xs uppercase tracking-wider font-bold text-teal">
                Behind the moulds
              </span>
              <h2 className="font-display font-bold text-3xl text-ink">
                "We don't do mass production. We pour resin."
              </h2>
              <p className="font-hand text-2xl text-ink/85 leading-relaxed">
                Hi! Every coaster, bookmark and floral dome you see here started on a worktable covered in parchment paper and dried drips. We take our time — measuring, mixing pigments, torching out bubbles, and letting each piece cure quietly for up to 3 days.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 font-body font-bold text-sm text-ink hover:text-teal underline underline-offset-4"
                >
                  <span>Read our full studio journey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CUSTOM POURS BANNER */}
      <section className="py-16 bg-orchid text-paper border-b-2 border-ink relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-label text-xs uppercase tracking-widest text-mint font-bold block mb-2">
              Made just for you
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-paper mb-4">
              Have a Dream Pour in Mind?
            </h2>
            <p className="font-body text-paper/85 text-base sm:text-lg">
              Wedding bouquet preservation, custom initial signs, or a geode wall panel matched to your living room colors.
            </p>
          </div>

          {/* 3 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-paper text-ink border-2 border-ink rounded-2xl p-6 sticker-shadow text-center">
              <div className="w-12 h-12 rounded-full border-2 border-ink bg-marigold text-ink font-display font-bold text-xl flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Tell us your idea</h3>
              <p className="text-sm font-body text-ink/75">
                Pick your size, mood colours, or send us the flowers you want preserved.
              </p>
            </div>

            <div className="bg-paper text-ink border-2 border-ink rounded-2xl p-6 sticker-shadow text-center">
              <div className="w-12 h-12 rounded-full border-2 border-ink bg-teal text-paper font-display font-bold text-xl flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Approve quote & sketch</h3>
              <p className="text-sm font-body text-ink/75">
                We'll prepare a moodboard, confirm lead times, and reserve studio space with a deposit.
              </p>
            </div>

            <div className="bg-paper text-ink border-2 border-ink rounded-2xl p-6 sticker-shadow text-center">
              <div className="w-12 h-12 rounded-full border-2 border-ink bg-mint text-ink font-display font-bold text-xl flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-display font-bold text-lg mb-2">We pour & ship</h3>
              <p className="text-sm font-body text-ink/75">
                Get photo updates as your piece cures and cures, before it arrives safely at your door.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/commissions/new"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl border-2 border-ink bg-marigold text-ink font-body font-bold text-base sticker-shadow hover:bg-marigold/90 transition-all"
            >
              <span>Start your custom pour</span>
              <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FROM POUR TO PARCEL */}
      <section className="py-16 bg-paper border-b-2 border-ink">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-label text-xs uppercase tracking-wider font-bold text-teal block mb-1">
              Craftsmanship
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">
              From Pour to Parcel
            </h2>
            <p className="font-body text-ink/75 text-sm mt-2">
              Five intentional steps behind every single item that leaves our nook.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { num: '01', title: 'Mix', desc: 'Precise ratio of resin & hardener with mica & pigments.', icon: '🥣' },
              { num: '02', title: 'Pour', desc: 'Layered by hand into custom silicone moulds.', icon: '🧪' },
              { num: '03', title: 'Cure', desc: '24 to 72 hours undisturbed in a dust-free shelf.', icon: '⏳' },
              { num: '04', title: 'Polish', desc: 'Wet sanding up to 3000 grit & gold leaf rimming.', icon: '✨' },
              { num: '05', title: 'Pack', desc: 'Cushioned with honeycomb kraft & sealed with love.', icon: '📦' },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-paper-deep/60 border-2 border-ink rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label text-xs font-bold text-ink/40">{step.num}</span>
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink mb-1.5">{step.title}</h3>
                  <p className="font-body text-xs text-ink/70 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. REVIEWS WALL */}
      <section className="py-16 bg-paper-deep/30 border-b-2 border-ink">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-label text-xs uppercase tracking-wider font-bold text-coral block mb-1">
              Kind words
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">
              What Our Nook-Lovers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredReviews.map((rev, i) => (
              <StickyNote key={rev.id} seed={i * 3 + 1} color={i % 2 === 0 ? '#FFF6E5' : '#FBE9C6'}>
                <div className="flex items-center text-marigold text-sm mb-2">
                  {'★'.repeat(rev.rating)}
                </div>
                <h4 className="font-display font-bold text-sm text-ink mb-1">
                  "{rev.title}"
                </h4>
                <p className="font-body text-xs text-ink/80 leading-relaxed mb-4">
                  {rev.text}
                </p>
                <div className="pt-2 border-t border-ink/10 flex justify-between items-center text-xs font-label text-ink/60">
                  <span className="font-bold text-ink">{rev.customerName}</span>
                  <span>{rev.customerCity}</span>
                </div>
              </StickyNote>
            ))}
          </div>
        </div>
      </section>

      {/* 11. JOURNAL TEASERS */}
      <section className="py-16 bg-paper border-b-2 border-ink">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="font-label text-xs uppercase tracking-wider font-bold text-teal block mb-1">
                From the studio desk
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">
                The Journal
              </h2>
            </div>
            <Link
              href="/journal"
              className="font-body font-bold text-sm text-ink hover:text-teal flex items-center gap-1"
            >
              <span>Read all notes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {journalPosts.map((post) => (
              <Link
                key={post.id}
                href={`/journal/${post.slug}`}
                className="group bg-paper-deep/50 border-2 border-ink rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-[6px_6px_0px_#2B1B3D] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-label text-ink/60 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full border border-ink/30 bg-paper font-bold uppercase text-teal">
                      {post.category}
                    </span>
                    <span>{post.readingTime} min read</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-ink group-hover:text-teal transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="font-body text-xs text-ink/75 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-ink/10 flex items-center gap-1 font-body font-bold text-xs text-ink group-hover:text-teal">
                  <span>Read full entry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

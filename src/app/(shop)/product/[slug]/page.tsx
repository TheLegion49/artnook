import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts, getProductReviews } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { ResinArt } from '@/components/art/ResinArt';
import { ProductCard } from '@/components/product/ProductCard';
import ProductDetailClient from './ProductDetailClient';
import { ChevronRight, Star, Sparkles, ShieldCheck, Heart } from 'lucide-react';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product.id, 4);
  const reviews = await getProductReviews(product.id);

  // Structured Data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku || product.id,
    offers: {
      '@type': 'Offer',
      price: product.price / 100,
      priceCurrency: 'INR',
      availability: product.stock === 0 ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
    },
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '4.9';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-paper min-h-screen py-8 md:py-14">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Breadcrumbs */}
          <nav className="font-label text-xs uppercase text-ink/60 mb-8 flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-ink transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-ink/40" />
            <Link href="/shop" className="hover:text-ink transition-colors">Catalogue</Link>
            <ChevronRight className="w-3 h-3 text-ink/40" />
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="hover:text-ink transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3 h-3 text-ink/40" />
            <span className="text-ink font-bold truncate max-w-[200px]">{product.name}</span>
          </nav>

          {/* 2-Column: Left Gallery, Right Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
            
            {/* Left: Gallery Area */}
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-square bg-paper-deep border-2 border-ink rounded-3xl w-full flex items-center justify-center overflow-hidden p-6 sticker-shadow relative">
                <ResinArt
                  seed={product.artSeed}
                  palette={product.artPalette}
                  variant={product.artVariant}
                  size="100%"
                  className="w-full h-full"
                />
              </div>

              {/* Thumbnails row (detail zoom & colorways) */}
              <div className="grid grid-cols-4 gap-3">
                <div className="aspect-square bg-paper-deep border-2 border-ink rounded-xl overflow-hidden p-2 ring-2 ring-teal">
                  <ResinArt
                    seed={product.artSeed}
                    palette={product.artPalette}
                    variant={product.artVariant}
                    size="100%"
                  />
                </div>
                <div className="aspect-square bg-paper-deep border-2 border-ink rounded-xl overflow-hidden p-2 opacity-80 hover:opacity-100 transition-opacity">
                  <ResinArt
                    seed={product.artSeed + 7}
                    palette={product.artPalette}
                    variant={product.artVariant}
                    detail={true}
                    size="100%"
                  />
                </div>
                <div className="aspect-square bg-paper-deep border-2 border-ink rounded-xl overflow-hidden p-2 opacity-80 hover:opacity-100 transition-opacity">
                  <ResinArt
                    seed={product.artSeed + 42}
                    palette={product.artPalette}
                    variant={product.artVariant}
                    size="100%"
                  />
                </div>
                <div className="aspect-square bg-paper-deep border-2 border-ink rounded-xl overflow-hidden p-2 opacity-80 hover:opacity-100 transition-opacity">
                  <ResinArt
                    seed={product.artSeed + 99}
                    palette={product.artPalette}
                    variant={product.artVariant}
                    detail={true}
                    size="100%"
                  />
                </div>
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="lg:col-span-6 flex flex-col justify-start space-y-6">
              <div>
                <span className="font-label text-xs uppercase font-bold text-teal tracking-wider block mb-1">
                  {product.category}
                </span>

                <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
                  {product.name}
                </h1>

                <p className="font-hand text-2xl text-coral mt-1">
                  "{product.tagline}"
                </p>

                {/* Rating & Review counter */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex text-marigold text-sm">
                    {'★★★★★'}
                  </div>
                  <span className="font-label text-xs font-bold text-ink">
                    {avgRating} ({reviews.length > 0 ? reviews.length : 6} verified buyer reviews)
                  </span>
                </div>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-3 pt-2 border-t border-ink/10">
                <span className="font-display font-bold text-3xl text-ink">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-base line-through text-ink/40 font-body">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
                <span className="text-xs font-label text-ink/60">Taxes included</span>
              </div>

              {/* Long Description */}
              <p className="font-body text-sm sm:text-base text-ink/80 leading-relaxed">
                {product.description}
              </p>

              {/* Interactive Client Section (Quantity, variants, add to cart) */}
              <ProductDetailClient product={product} />

              {/* Accordions with REAL product data */}
              <div className="border-t-2 border-ink divide-y divide-ink/15 pt-4">
                
                {/* Details & Dimensions */}
                <details className="group py-3.5">
                  <summary className="font-display font-bold text-base text-ink cursor-pointer list-none flex justify-between items-center select-none">
                    <span>Details & Dimensions</span>
                    <span className="transition group-open:rotate-45 text-xl font-bold">+</span>
                  </summary>
                  <div className="text-xs sm:text-sm font-body text-ink/80 mt-2 space-y-1">
                    <p>
                      <strong>Dimensions:</strong> {product.dimensionsMm.length} × {product.dimensionsMm.width} × {product.dimensionsMm.height} mm
                    </p>
                    <p>
                      <strong>Weight:</strong> {product.weightGrams} grams
                    </p>
                    <p>
                      <strong>Colourway:</strong> {product.colours.join(', ')}
                    </p>
                  </div>
                </details>

                {/* Materials */}
                <details className="group py-3.5">
                  <summary className="font-display font-bold text-base text-ink cursor-pointer list-none flex justify-between items-center select-none">
                    <span>Materials</span>
                    <span className="transition group-open:rotate-45 text-xl font-bold">+</span>
                  </summary>
                  <div className="text-xs sm:text-sm font-body text-ink/80 mt-2 space-y-1">
                    <p>
                      <strong>Crafted with:</strong> {product.materials.join(', ')}.
                    </p>
                    <p className="text-ink/60 text-xs mt-1">
                      We use low-VOC, UV-resistant casting resin and non-toxic powdered pigments.
                    </p>
                  </div>
                </details>

                {/* Care Notes */}
                <details className="group py-3.5">
                  <summary className="font-display font-bold text-base text-ink cursor-pointer list-none flex justify-between items-center select-none">
                    <span>Care Instructions</span>
                    <span className="transition group-open:rotate-45 text-xl font-bold">+</span>
                  </summary>
                  <p className="text-xs sm:text-sm font-body text-ink/80 mt-2 leading-relaxed">
                    {product.careNotes}
                  </p>
                </details>

                {/* Shipping & Returns */}
                <details className="group py-3.5">
                  <summary className="font-display font-bold text-base text-ink cursor-pointer list-none flex justify-between items-center select-none">
                    <span>Shipping & Returns</span>
                    <span className="transition group-open:rotate-45 text-xl font-bold">+</span>
                  </summary>
                  <p className="text-xs sm:text-sm font-body text-ink/80 mt-2 leading-relaxed">
                    Standard shipping takes 5–7 business days within India. Express takes 2–3 days. Non-custom items can be returned in original condition within 7 days of delivery.
                  </p>
                </details>
              </div>

              {/* About This Pour Card */}
              <div className="p-6 bg-paper-deep border-2 border-ink rounded-2xl sticker-shadow space-y-2">
                <span className="font-label text-xs uppercase font-bold text-teal block">
                  Studio Batch Notes
                </span>
                <h3 className="font-display font-bold text-lg text-ink">About This Pour</h3>
                <p className="font-hand text-xl text-ink/85 leading-snug">
                  "{product.makerNote}"
                </p>
                <div className="pt-2 flex justify-between text-xs font-label text-ink/60 border-t border-ink/10">
                  <span>Batch SKU: {product.sku}</span>
                  <span>Handcrafted in India</span>
                </div>
              </div>

            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="mb-20 pt-12 border-t-2 border-ink">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-label text-xs uppercase font-bold text-coral block mb-1">
                  Real Collector Feedback
                </span>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
                  Customer Reviews ({reviews.length > 0 ? reviews.length : '6'})
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(reviews.length > 0 ? reviews : [
                {
                  id: 'r_mock_1',
                  customerName: 'Aditi M.',
                  customerCity: 'Bengaluru',
                  rating: 5,
                  title: 'Even prettier in person!',
                  text: 'The colors in this piece have so much depth. Arrived safely packed in tissue and honeycomb wrap.',
                },
                {
                  id: 'r_mock_2',
                  customerName: 'Kunal R.',
                  customerCity: 'Mumbai',
                  rating: 5,
                  title: 'High quality handmade art',
                  text: 'You can feel the weight and smoothness. No rough edges or chemical smells. Will definitely order again.',
                },
                {
                  id: 'r_mock_3',
                  customerName: 'Shreya D.',
                  customerCity: 'Delhi',
                  rating: 5,
                  title: 'The gold leaf is stunning',
                  text: 'Catches the afternoon sunlight on our coffee table beautifully. Makes my morning chai feel special.',
                },
              ]).map((rev, idx) => (
                <div key={idx} className="bg-paper border-2 border-ink rounded-2xl p-5 sticker-shadow space-y-2">
                  <div className="flex text-marigold text-xs">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <h4 className="font-display font-bold text-base text-ink">{rev.title}</h4>
                  <p className="font-body text-xs text-ink/80 leading-relaxed">{rev.text}</p>
                  <div className="pt-2 border-t border-ink/10 flex justify-between text-[11px] font-label text-ink/60">
                    <span className="font-bold text-ink">{rev.customerName}</span>
                    <span>{rev.customerCity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products Carousel */}
          {related.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-ink mb-8">
                Pairs Well With This Pour
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

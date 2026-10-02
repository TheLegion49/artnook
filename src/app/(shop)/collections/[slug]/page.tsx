import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCollectionBySlug } from '@/lib/api';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default async function CollectionDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const collection = await getCollectionBySlug(params.slug);

  if (!collection) {
    notFound();
  }

  const { products } = collection;

  return (
    <div className="bg-paper min-h-screen pb-24">
      {/* Banner */}
      <div className="bg-deep-sea text-paper py-20 px-4 text-center border-b-2 border-ink relative overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-10 space-y-4">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-xs font-label uppercase font-bold text-mint hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Collections</span>
          </Link>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-paper tracking-tight">
            {collection.name}
          </h1>

          <p className="font-body text-base sm:text-lg text-paper/85 max-w-2xl mx-auto leading-relaxed">
            {collection.description}
          </p>

          {collection.story && (
            <div className="pt-4 max-w-xl mx-auto">
              <p className="font-hand text-2xl text-marigold leading-relaxed">
                "{collection.story}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Grid container */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <p className="font-label text-xs uppercase font-bold text-ink/70">
            Showing <strong className="text-ink">{products.length}</strong> handcrafted pieces
          </p>
        </div>

        {products.length === 0 ? (
          <div className="bg-paper-deep border-2 border-ink rounded-3xl p-12 text-center max-w-md mx-auto">
            <h3 className="font-display font-bold text-xl text-ink mb-2">
              Fresh pours curing on the shelf!
            </h3>
            <p className="font-body text-xs text-ink/70 mb-6">
              Pieces for this collection are currently being sanded and polished. Check back soon or request a custom pour.
            </p>
            <Link
              href="/commissions/new"
              className="px-6 py-2.5 rounded-xl border-2 border-ink bg-marigold text-ink font-bold text-xs uppercase sticker-shadow"
            >
              Order a Custom Pour
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* SEO Text at bottom */}
        {collection.seoDescription && (
          <div className="mt-20 pt-8 border-t border-ink/10 text-xs font-body text-ink/60 max-w-3xl leading-relaxed">
            <p>{collection.seoDescription}</p>
          </div>
        )}
      </div>
    </div>
  );
}

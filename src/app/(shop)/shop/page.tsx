import React from 'react';
import {
  getAllCategories,
  getAllColours,
  getAllOccasions,
  getAllProducts,
} from '@/lib/api';
import ShopFilters from '@/components/product/ShopFilters';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/data/products';

export const metadata = {
  title: 'The Studio Catalogue | The ArtNook',
  description: 'Browse our entire catalogue of handmade epoxy resin coasters, trays, wall art, jewellery, and keepsakes.',
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const allCategories = getAllCategories();
  const allColours = getAllColours();
  const allOccasions = getAllOccasions();
  const allProducts = await getAllProducts();

  // Color hex dictionary helper
  const getColorHex = (name: string) => {
    switch (name.toLowerCase()) {
      case 'deep blue':
      case 'blue':
        return '#0B5C73';
      case 'teal':
      case 'turquoise':
        return '#12A8A0';
      case 'gold':
        return '#D4A63A';
      case 'violet':
      case 'purple':
        return '#B14AED';
      case 'pink':
      case 'blush pink':
        return '#F7A8C4';
      case 'coral':
      case 'orange':
        return '#FF6B5E';
      case 'mint':
      case 'green':
        return '#8EE3C2';
      case 'marigold':
      case 'yellow':
        return '#FFB627';
      default:
        return '#2B1B3D';
    }
  };

  const categoriesData = allCategories.map((c) => ({ id: c, name: c }));
  const coloursData = allColours.map((col) => ({ id: col, name: col, hex: getColorHex(col) }));
  const occasionsData = allOccasions.map((o) => ({ id: o, name: o }));

  // Extract filters from searchParams
  const categoryParam = searchParams.category;
  const categoryFilters = Array.isArray(categoryParam)
    ? categoryParam
    : categoryParam
    ? [categoryParam]
    : [];

  const colourParam = searchParams.colour || searchParams.color;
  const colourFilters = Array.isArray(colourParam)
    ? colourParam
    : colourParam
    ? [colourParam]
    : [];

  const occasionParam = searchParams.occasion;
  const occasionFilters = Array.isArray(occasionParam)
    ? occasionParam
    : occasionParam
    ? [occasionParam]
    : [];

  // Filter products
  const filteredProducts = allProducts.filter((product: Product) => {
    if (categoryFilters.length > 0 && !categoryFilters.includes(product.category)) {
      return false;
    }
    if (
      colourFilters.length > 0 &&
      !product.colours.some((c) => colourFilters.includes(c))
    ) {
      return false;
    }
    if (
      occasionFilters.length > 0 &&
      !product.occasions.some((o) => occasionFilters.includes(o))
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-paper min-h-screen py-10 md:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
          <span className="font-label text-xs uppercase font-bold text-teal tracking-wider block">
            Handmade in Small Batches
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-tight">
            The Studio <span className="hand-underline text-coral">Catalogue</span>
          </h1>
          <p className="font-body text-sm sm:text-base text-ink/80 leading-relaxed">
            Every piece is poured by hand, cured with patience, and finished in our studio. Find the one that speaks to your nook.
          </p>
        </div>

        {/* 2-Column: Sidebar + Product Grid */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0 md:sticky md:top-28">
            <React.Suspense fallback={<div className="p-4 text-xs font-label">Loading filters...</div>}>
              <ShopFilters
                categories={categoriesData}
                colours={coloursData}
                occasions={occasionsData}
              />
            </React.Suspense>
          </aside>

          {/* Grid Area */}
          <main className="flex-1 w-full">
            <div className="flex justify-between items-center mb-6 pb-3 border-b-2 border-ink/10">
              <span className="font-label text-xs uppercase font-bold text-ink/70">
                Showing <strong className="text-ink">{filteredProducts.length}</strong> handcrafted pieces
              </span>

              {(categoryFilters.length > 0 || colourFilters.length > 0 || occasionFilters.length > 0) && (
                <a
                  href="/shop"
                  className="font-label text-xs text-coral font-bold hover:underline"
                >
                  Clear all filters
                </a>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-paper-deep border-2 border-ink rounded-3xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-paper border border-ink/30 flex items-center justify-center mx-auto mb-3 text-2xl">
                  🔍
                </div>
                <h3 className="font-display font-bold text-xl text-ink mb-1">
                  No pieces matched your selected filters
                </h3>
                <p className="font-body text-xs text-ink/70 mb-6 max-w-xs mx-auto">
                  Try unchecking some filter options, or ask us for a custom pour in your exact colours.
                </p>
                <a
                  href="/shop"
                  className="px-6 py-2.5 rounded-xl border-2 border-ink bg-marigold text-ink font-bold text-xs uppercase sticker-shadow"
                >
                  Reset All Filters
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>

      </div>
    </div>
  );
}

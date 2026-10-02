'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { ResinArt } from '@/components/art/ResinArt';
import { formatPrice, getRotation } from '@/lib/utils';
import { useCartStore, useWishlistStore, useUIStore } from '@/lib/store';
import { Heart, ShoppingBag, Check } from 'lucide-react';

export function ProductCard({
  product,
  className = '',
}: {
  product: Product;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const setCartDrawerOpen = useUIStore((state) => state.setCartDrawerOpen);

  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id));
  const toggleWishlist = useWishlistStore((state) =>
    isWishlisted ? state.removeItem : state.addItem
  );

  const rotation = getRotation(product.id);
  const isSoldOut = product.type === 'UNIQUE' && product.stock === 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSoldOut) return;

    addItem({
      productId: product.id,
      name: product.name,
      tagline: product.tagline,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      quantity: 1,
      maxQuantity: product.type === 'UNIQUE' ? 1 : Math.max(1, product.stock),
      isUnique: product.type === 'UNIQUE',
      artSeed: product.artSeed,
      artVariant: product.artVariant,
      artPalette: product.artPalette,
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1600);
    setCartDrawerOpen(true);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      useWishlistStore.getState().removeItem(product.id);
    } else {
      useWishlistStore.getState().addItem(product.id);
    }
  };

  // Badge logic
  let badgeText = '';
  let badgeBg = 'bg-teal text-paper';

  if (isSoldOut) {
    badgeText = 'Sold';
    badgeBg = 'bg-ink text-paper';
  } else if (product.type === 'UNIQUE') {
    badgeText = 'One of a kind';
    badgeBg = 'bg-coral text-paper';
  } else if (product.type === 'MADE_TO_ORDER') {
    badgeText = 'Made to order';
    badgeBg = 'bg-orchid text-paper';
  } else if (product.stock > 0 && product.stock <= product.lowStockThreshold) {
    badgeText = `Only ${product.stock} left`;
    badgeBg = 'bg-coral text-paper';
  } else if (product.compareAtPrice && product.compareAtPrice > product.price) {
    badgeText = 'Sale';
    badgeBg = 'bg-marigold text-ink';
  } else if (product.featured) {
    badgeText = 'Just cured ✨';
    badgeBg = 'bg-mint text-ink';
  }

  return (
    <div
      className={`group relative bg-paper border-2 border-ink rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-[6px_6px_0px_#2B1B3D] hover:-translate-y-1 ${className}`}
      style={{
        transform: `rotate(${isHovered ? 0 : rotation}deg)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top action row */}
      <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between pointer-events-none">
        {/* Wishlist toggle */}
        <button
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`pointer-events-auto w-9 h-9 rounded-full border-2 border-ink flex items-center justify-center transition-transform active:scale-90 ${
            isWishlisted ? 'bg-coral text-paper' : 'bg-paper/90 text-ink hover:bg-rose/40'
          }`}
        >
          <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Sticker badge */}
        {badgeText && (
          <span
            className={`font-label text-xs uppercase px-2.5 py-1 rounded-full border-2 border-ink shadow-xs tracking-wider font-bold ${badgeBg}`}
          >
            {badgeText}
          </span>
        )}
      </div>

      {/* Main product link & image */}
      <Link href={`/product/${product.slug}`} className="block flex-1 flex flex-col">
        <div className="w-full aspect-square bg-paper-deep/50 rounded-xl border border-ink/15 flex items-center justify-center p-3 mb-4 overflow-hidden relative">
          <ResinArt
            seed={product.artSeed}
            palette={product.artPalette}
            variant={product.artVariant}
            size="100%"
            detail={isHovered}
            className="w-full h-full"
          />
        </div>

        {/* Text details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-label text-ink/60 uppercase tracking-wider mb-1">
              <span>{product.category}</span>
              {product.materials.length > 0 && (
                <>
                  <span>•</span>
                  <span>{product.materials[0]}</span>
                </>
              )}
            </div>

            <h3 className="font-display text-lg font-bold text-ink leading-snug group-hover:text-teal transition-colors">
              {product.name}
            </h3>

            <p className="font-hand text-base text-ink/75 line-clamp-1 mt-0.5">
              "{product.tagline}"
            </p>
          </div>

          {/* Pricing & ratings */}
          <div className="mt-3 pt-3 border-t border-ink/10 flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-bold text-ink">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-sm line-through text-ink/40 font-body">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center text-xs font-label text-ink/70">
              <span className="text-marigold mr-1 text-sm">★</span>
              <span>4.9</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Add to cart CTA */}
      <div className="mt-4">
        {isSoldOut ? (
          <button
            disabled
            className="w-full py-2.5 px-4 rounded-xl border-2 border-ink/30 bg-ink/5 text-ink/40 font-body font-semibold text-sm cursor-not-allowed text-center"
          >
            This one found a home
          </button>
        ) : (
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-4 rounded-xl border-2 border-ink font-body font-bold text-sm flex items-center justify-center gap-2 sticker-shadow transition-all active:translate-y-0.5 active:translate-x-0.5 ${
              addedNotice
                ? 'bg-mint text-ink'
                : 'bg-marigold text-ink hover:bg-marigold/90'
            }`}
          >
            {addedNotice ? (
              <>
                <Check className="w-4 h-4" />
                <span>In your nook!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to my nook</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;

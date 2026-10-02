'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useCartStore, useWishlistStore, useUIStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import {
  Heart,
  ShoppingBag,
  Share2,
  Check,
  Truck,
  Sparkles,
  Copy,
} from 'lucide-react';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [personalisationValues, setPersonalisationValues] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const setCartDrawerOpen = useUIStore((state) => state.setCartDrawerOpen);

  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id));
  const toggleWishlist = useWishlistStore((state) =>
    isWishlisted ? state.removeItem : state.addItem
  );

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const isSoldOut = product.type === 'UNIQUE' && product.stock === 0;
  const maxAvailable = product.type === 'UNIQUE' ? 1 : product.type === 'MADE_TO_ORDER' ? 10 : Math.max(1, product.stock);

  const handleAddToCart = () => {
    if (isSoldOut) return;
    setIsAdding(true);

    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      name: selectedVariant ? `${product.name} (${selectedVariant.name})` : product.name,
      tagline: product.tagline,
      price: currentPrice,
      compareAtPrice: product.compareAtPrice,
      quantity,
      maxQuantity: maxAvailable,
      isUnique: product.type === 'UNIQUE',
      artSeed: product.artSeed,
      artVariant: product.artVariant,
      artPalette: product.artPalette,
      personalisation: Object.keys(personalisationValues).length > 0 ? personalisationValues : undefined,
    });

    setTimeout(() => {
      setIsAdding(false);
      setCartDrawerOpen(true);
    }, 600);
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length !== 6) {
      setDeliveryResult('Please enter a 6-digit Indian postal code');
      return;
    }
    const leadTime = product.leadTimeDays || 3;
    setDeliveryResult(`Estimated delivery in ${leadTime + 3}–${leadTime + 5} business days. Cash on delivery available!`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Variant selectors if present */}
      {product.variants && product.variants.length > 0 && (
        <div>
          <label className="block text-xs font-label uppercase font-bold text-ink mb-2">
            Select Style / Size
          </label>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`py-2 px-3.5 rounded-xl border-2 font-body text-xs font-bold transition-all ${
                  selectedVariant?.id === v.id
                    ? 'border-ink bg-teal text-paper shadow-xs'
                    : 'border-ink/30 bg-paper text-ink hover:border-ink'
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Personalisation fields if enabled */}
      {product.personalisation?.enabled && (
        <div className="p-4 rounded-2xl bg-paper-deep/70 border-2 border-ink space-y-3">
          <div className="flex items-center gap-1.5 font-display font-bold text-sm text-ink">
            <Sparkles className="w-4 h-4 text-orchid" />
            <span>Personalisation Options</span>
          </div>

          {product.personalisation.fields.map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-label uppercase font-bold text-ink/75 mb-1">
                {f.label} {f.required && '*'}
              </label>

              {f.type === 'text' && (
                <input
                  type="text"
                  maxLength={f.maxLength || 30}
                  placeholder={f.placeholder}
                  value={personalisationValues[f.name] || ''}
                  onChange={(e) =>
                    setPersonalisationValues({ ...personalisationValues, [f.name]: e.target.value })
                  }
                  className="w-full px-3 py-1.5 rounded-xl border border-ink/30 bg-paper text-xs font-body focus:outline-teal"
                />
              )}

              {f.type === 'color' && f.options && (
                <select
                  value={personalisationValues[f.name] || ''}
                  onChange={(e) =>
                    setPersonalisationValues({ ...personalisationValues, [f.name]: e.target.value })
                  }
                  className="w-full px-3 py-1.5 rounded-xl border border-ink/30 bg-paper text-xs font-body focus:outline-teal"
                >
                  <option value="">Select option...</option>
                  {f.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {f.type === 'textarea' && (
                <textarea
                  rows={2}
                  maxLength={f.maxLength || 300}
                  placeholder={f.placeholder}
                  value={personalisationValues[f.name] || ''}
                  onChange={(e) =>
                    setPersonalisationValues({ ...personalisationValues, [f.name]: e.target.value })
                  }
                  className="w-full px-3 py-1.5 rounded-xl border border-ink/30 bg-paper text-xs font-body focus:outline-teal"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* 3. Quantity Stepper & Stock status */}
      <div className="space-y-3">
        {!isSoldOut && (
          <div className="flex items-center gap-4">
            <span className="text-xs font-label uppercase font-bold text-ink/70">Quantity</span>
            <div className="flex items-center border-2 border-ink rounded-xl bg-paper">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1.5 text-ink hover:bg-paper-deep transition-colors font-bold"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="px-4 py-1 font-label text-sm font-bold text-ink border-x border-ink/20">
                {quantity}
              </span>
              <button
                disabled={quantity >= maxAvailable}
                onClick={() => setQuantity((q) => Math.min(maxAvailable, q + 1))}
                className="px-3 py-1.5 text-ink hover:bg-paper-deep transition-colors font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Urgency badges */}
            {product.type === 'UNIQUE' && (
              <span className="font-label text-xs font-bold text-coral bg-rose/30 px-2.5 py-1 rounded-full border border-ink/20">
                Only 1 exists!
              </span>
            )}
            {product.type === 'MADE_TO_ORDER' && (
              <span className="font-label text-xs font-bold text-orchid bg-orchid/15 px-2.5 py-1 rounded-full border border-ink/20">
                Poured to order (ships in {product.leadTimeDays || 7} days)
              </span>
            )}
          </div>
        )}

        {/* CTA Buttons */}
        {isSoldOut ? (
          <div className="p-5 bg-paper-deep border-2 border-ink rounded-2xl text-center space-y-2">
            <p className="font-display font-bold text-lg text-ink">
              This one found a home.
            </p>
            <p className="font-body text-xs text-ink/75">
              Every unique pour is one-of-a-kind. Want something like it?
            </p>
            <Link
              href="/commissions/new"
              className="inline-block py-2 px-4 rounded-xl border-2 border-ink bg-marigold text-ink font-bold text-xs uppercase sticker-shadow mt-1"
            >
              Ask for a Custom Pour
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 px-6 rounded-2xl border-2 border-ink font-body font-bold text-base sticker-shadow transition-all flex items-center justify-center gap-2 active:translate-y-0.5 active:translate-x-0.5 ${
                isAdding
                  ? 'bg-mint text-ink'
                  : 'bg-marigold text-ink hover:bg-marigold/90'
              }`}
            >
              {isAdding ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>In your Nook!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to my nook • {formatPrice(currentPrice * quantity)}</span>
                </>
              )}
            </button>

            {/* Wishlist toggle */}
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              className={`p-3.5 rounded-2xl border-2 border-ink transition-all active:scale-95 ${
                isWishlisted ? 'bg-coral text-paper' : 'bg-paper text-ink hover:bg-paper-deep'
              }`}
            >
              <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>

            {/* Share link button */}
            <button
              onClick={handleShare}
              aria-label="Share product link"
              className="p-3.5 rounded-2xl border-2 border-ink bg-paper text-ink hover:bg-paper-deep transition-all active:scale-95 relative"
            >
              {copiedLink ? <Check className="w-5 h-5 text-teal" /> : <Share2 className="w-5 h-5" />}
            </button>
          </div>
        )}
      </div>

      {/* Pincode Estimator */}
      <div className="pt-2">
        <form onSubmit={checkPincode} className="flex gap-2">
          <div className="relative flex-1">
            <Truck className="w-4 h-4 text-ink/40 absolute left-3 top-3" />
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit postal pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-ink/30 bg-paper text-xs font-label focus:outline-teal"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl border-2 border-ink bg-paper font-bold text-xs uppercase text-ink hover:bg-paper-deep"
          >
            Check
          </button>
        </form>
        {deliveryResult && (
          <p className="text-xs font-body text-teal font-bold mt-2">
            {deliveryResult}
          </p>
        )}
      </div>
    </div>
  );
}

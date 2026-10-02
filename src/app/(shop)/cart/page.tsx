'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import { ResinArt } from '@/components/art/ResinArt';
import { validateDiscount } from '@/lib/api';
import { Trash2, Plus, Minus, ArrowRight, Gift, ShieldCheck, Heart, RefreshCw } from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 199900;

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    giftWrap,
    giftWrapFee,
    toggleGiftWrap,
    giftMessage,
    setGiftMessage,
    makerNote,
    setMakerNote,
    discountCode,
    discountAmount,
    setDiscountCode,
    setDiscountAmount,
    getSubtotal,
  } = useCartStore();

  const [inputCode, setInputCode] = useState('');
  const [discountMsg, setDiscountMsg] = useState<{ text: string; error: boolean } | null>(null);

  const subtotal = getSubtotal();
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 9900; // Flat ₹99 below threshold
  const total = subtotal + (giftWrap ? giftWrapFee : 0) + shippingFee - discountAmount;

  const handleApplyDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = await validateDiscount(inputCode.trim(), subtotal);
    if (res.valid && res.discount) {
      setDiscountCode(res.discount.code);
      let calculatedAmt = 0;
      if (res.discount.type === 'PERCENTAGE') {
        calculatedAmt = Math.round((subtotal * res.discount.value) / 100);
      } else if (res.discount.type === 'FIXED_AMOUNT') {
        calculatedAmt = res.discount.value;
      }
      setDiscountAmount(calculatedAmt);
      setDiscountMsg({ text: res.message, error: false });
    } else {
      setDiscountMsg({ text: res.message, error: true });
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 max-w-2xl text-center">
        <div className="w-24 h-24 rounded-full bg-paper-deep border-2 border-ink flex items-center justify-center mx-auto mb-6 text-4xl sticker-shadow">
          🎨
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-ink mb-4">
          Your nook is empty.
        </h1>
        <p className="font-body text-base text-ink/75 mb-8 max-w-md mx-auto leading-relaxed">
          Let's fix that. Our shelves have fresh small-batch pours ready for a good home.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl border-2 border-ink bg-marigold text-ink font-body font-bold text-base sticker-shadow hover:bg-marigold/90 transition-all"
        >
          <span>Browse the studio</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
      <div className="mb-10">
        <span className="font-label text-xs uppercase font-bold text-teal tracking-wider block mb-1">
          Review your treasures
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ink">
          Your Nook
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Cart Items & Add-ons */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-paper border-2 border-ink rounded-3xl p-6 sticker-shadow divide-y divide-ink/10">
            {items.map((item) => (
              <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                
                {/* Product info */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl border-2 border-ink bg-paper-deep overflow-hidden shrink-0 flex items-center justify-center p-1">
                    <ResinArt
                      seed={item.artSeed}
                      palette={item.artPalette}
                      variant={item.artVariant}
                      size={72}
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-ink leading-snug">
                      {item.name}
                    </h3>
                    <p className="font-hand text-xs text-ink/70">"{item.tagline}"</p>
                    {item.isUnique && (
                      <span className="inline-block text-[10px] font-label uppercase px-2 py-0.5 rounded-full border border-coral text-coral bg-coral/10 font-bold mt-1">
                        Only one exists
                      </span>
                    )}
                  </div>
                </div>

                {/* Stepper & Price */}
                <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6">
                  {/* Stepper */}
                  <div className="flex items-center border-2 border-ink rounded-xl bg-paper">
                    <button
                      onClick={() => {
                        if (item.quantity === 1) removeItem(item.id);
                        else updateQuantity(item.id, item.quantity - 1);
                      }}
                      className="px-2.5 py-1 text-ink hover:bg-paper-deep transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1 font-label text-xs font-bold text-ink border-x border-ink/20">
                      {item.quantity}
                    </span>
                    <button
                      disabled={item.isUnique || item.quantity >= item.maxQuantity}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-ink hover:bg-paper-deep transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="font-display font-bold text-base text-ink">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 rounded-lg text-ink/40 hover:text-coral hover:bg-rose/20 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Gift Wrap & Note to Maker Options */}
          <div className="bg-paper-deep/70 border-2 border-ink rounded-3xl p-6 md:p-8 sticker-shadow space-y-5">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={toggleGiftWrap}
                className="w-5 h-5 rounded border-2 border-ink accent-marigold"
              />
              <Gift className="w-5 h-5 text-teal" />
              <div className="text-sm font-body text-ink">
                <span className="font-bold">Add Kraft Gift Wrapping (+{formatPrice(giftWrapFee)})</span>
                <p className="text-xs text-ink/70">
                  Honeycomb padding, dried mini botanicals and custom sealed wax stamp.
                </p>
              </div>
            </label>

            {giftWrap && (
              <div className="pl-8">
                <textarea
                  rows={2}
                  maxLength={200}
                  placeholder="Gift message to write on handwritten kraft card..."
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-ink bg-paper text-ink font-body text-xs focus:outline-teal"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-label uppercase font-bold text-ink mb-1.5">
                Note to Maker (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Any special packing requests or dates we should know about?"
                value={makerNote}
                onChange={(e) => setMakerNote(e.target.value)}
                className="w-full p-3 rounded-xl border border-ink/30 bg-paper text-ink font-body text-xs focus:outline-teal"
              />
            </div>
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-paper border-2 border-ink rounded-3xl p-6 md:p-8 sticker-shadow sticky top-28 space-y-6">
            <h2 className="font-display font-bold text-xl text-ink">Order Summary</h2>

            {/* Discount Form */}
            <form onSubmit={handleApplyDiscount} className="flex gap-2">
              <input
                type="text"
                placeholder="Discount code (e.g. WELCOME10)"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="flex-1 uppercase text-xs px-3 py-2 rounded-xl border border-ink/30 bg-paper text-ink font-label focus:outline-teal"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl border-2 border-ink bg-paper font-bold text-xs uppercase text-ink hover:bg-paper-deep"
              >
                Apply
              </button>
            </form>
            {discountMsg && (
              <p className={`text-xs font-body ${discountMsg.error ? 'text-coral' : 'text-teal font-bold'}`}>
                {discountMsg.text}
              </p>
            )}

            {/* Line calculations */}
            <div className="space-y-2.5 text-xs sm:text-sm font-body border-t border-ink/10 pt-4">
              <div className="flex justify-between text-ink/75">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {giftWrap && (
                <div className="flex justify-between text-ink/75">
                  <span>Gift Wrapping</span>
                  <span>{formatPrice(giftWrapFee)}</span>
                </div>
              )}

              <div className="flex justify-between text-ink/75">
                <span>Standard Delivery</span>
                <span>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-teal font-bold">
                  <span>Promo ({discountCode})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-base sm:text-lg font-display font-bold text-ink pt-3 border-t border-ink/20">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <Link
              href="/checkout"
              className="w-full py-3.5 px-6 rounded-2xl border-2 border-ink bg-marigold text-ink font-bold text-base sticker-shadow hover:bg-marigold/90 flex items-center justify-center gap-2 text-center"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Trust highlights */}
            <div className="space-y-2 pt-2 text-[11px] font-label text-ink/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-teal" />
                <span>Encrypted checkout via Razorpay & Stripe</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-coral" />
                <span>Poured, cured & inspected by hand</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-orchid" />
                <span>7-day return on non-custom pieces</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore, useUIStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { ResinArt } from '@/components/art/ResinArt';
import { X, Plus, Minus, Trash2, Gift, ShoppingBag, ArrowRight } from 'lucide-react';
import { validateDiscount } from '@/lib/api';

const FREE_SHIPPING_THRESHOLD = 199900; // ₹1,999 in paise

export function CartDrawer() {
  const { cartDrawerOpen, setCartDrawerOpen } = useUIStore();
  const {
    items,
    removeItem,
    updateQuantity,
    giftWrap,
    giftWrapFee,
    toggleGiftWrap,
    makerNote,
    setMakerNote,
    discountCode,
    discountAmount,
    setDiscountCode,
    setDiscountAmount,
    getSubtotal,
    getItemCount,
  } = useCartStore();

  const [inputCode, setInputCode] = useState('');
  const [discountMsg, setDiscountMsg] = useState<{ text: string; error: boolean } | null>(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartDrawerOpen(false);
    };
    if (cartDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [cartDrawerOpen, setCartDrawerOpen]);

  const subtotal = getSubtotal();
  const totalWithGift = subtotal + (giftWrap ? giftWrapFee : 0) - discountAmount;
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

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

  if (!cartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-paper border-l-2 border-ink flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 border-b-2 border-ink flex items-center justify-between bg-paper-deep/60">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-ink" />
              <h2 id="cart-drawer-title" className="font-display text-xl font-bold text-ink">
                Your Nook ({getItemCount()})
              </h2>
            </div>
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="p-1.5 rounded-lg border-2 border-ink bg-paper text-ink hover:bg-coral hover:text-paper transition-colors active:scale-95"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress bottle */}
          <div className="bg-paper-deep/40 px-6 py-3 border-b border-ink/10">
            <div className="flex justify-between text-xs font-label uppercase text-ink mb-1.5">
              <span>
                {remainingForFreeShip === 0 ? (
                  <strong className="text-teal font-bold">✨ You unlocked free shipping!</strong>
                ) : (
                  <span>
                    Add <strong>{formatPrice(remainingForFreeShip)}</strong> for free shipping
                  </span>
                )}
              </span>
              <span>{progressPercent}%</span>
            </div>
            {/* Visual drip progress bar */}
            <div className="w-full bg-paper border border-ink/30 rounded-full h-3 overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-teal to-mint h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-ink/10">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-paper-deep border-2 border-ink flex items-center justify-center mb-4 text-3xl">
                  🎨
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-2">
                  Your nook is empty. Let's fix that.
                </h3>
                <p className="text-sm text-ink/70 font-body max-w-xs mb-6">
                  Our little shelves are stocked with fresh pours. Find a piece with your name on it.
                </p>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="px-6 py-2.5 rounded-xl border-2 border-ink bg-marigold text-ink font-bold text-sm sticker-shadow hover:bg-marigold/90"
                >
                  Explore the studio
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="w-18 h-18 rounded-xl border-2 border-ink bg-paper-deep overflow-hidden shrink-0 flex items-center justify-center p-1">
                    <ResinArt
                      seed={item.artSeed}
                      palette={item.artPalette}
                      variant={item.artVariant}
                      size={64}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-ink text-sm leading-snug truncate">
                      {item.name}
                    </h4>
                    <p className="font-hand text-xs text-ink/70 truncate mb-1">
                      "{item.tagline}"
                    </p>

                    {item.isUnique && (
                      <span className="inline-block text-[11px] font-label uppercase px-2 py-0.5 rounded-full border border-coral text-coral bg-coral/10 font-bold mb-1">
                        Only one exists
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-display font-bold text-sm text-ink">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      {/* Stepper */}
                      <div className="flex items-center border-2 border-ink rounded-lg bg-paper">
                        <button
                          onClick={() => {
                            if (item.quantity === 1) {
                              removeItem(item.id);
                            } else {
                              updateQuantity(item.id, item.quantity - 1);
                            }
                          }}
                          className="px-2 py-1 text-ink hover:bg-paper-deep transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-label font-bold text-ink border-x border-ink/20">
                          {item.quantity}
                        </span>
                        <button
                          disabled={item.isUnique || item.quantity >= item.maxQuantity}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-ink hover:bg-paper-deep transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-ink/40 hover:text-coral transition-colors p-1"
                        aria-label={`Remove ${item.name} from nook`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions & Summary */}
          {items.length > 0 && (
            <div className="border-t-2 border-ink bg-paper-deep/70 p-6 space-y-4">
              {/* Gift wrap toggle */}
              <label className="flex items-center gap-3 cursor-pointer select-none text-xs font-body font-semibold text-ink">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={toggleGiftWrap}
                  className="w-4 h-4 rounded border-2 border-ink accent-marigold"
                />
                <Gift className="w-4 h-4 text-teal" />
                <span>Gift wrap with kraft paper, dried flowers & note (+{formatPrice(giftWrapFee)})</span>
              </label>

              {/* Note to maker */}
              <div>
                <input
                  type="text"
                  placeholder="A note to the maker... (optional)"
                  value={makerNote}
                  onChange={(e) => setMakerNote(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-ink/30 bg-paper text-ink placeholder:text-ink/40 font-body focus:outline-teal"
                />
              </div>

              {/* Discount code */}
              <form onSubmit={handleApplyDiscount} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Discount code (e.g. WELCOME10)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="flex-1 uppercase text-xs px-3 py-2 rounded-lg border border-ink/30 bg-paper text-ink placeholder:text-ink/40 font-label tracking-wider focus:outline-teal"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg border-2 border-ink bg-paper font-label text-xs uppercase font-bold text-ink hover:bg-paper-deep"
                >
                  Apply
                </button>
              </form>
              {discountMsg && (
                <p className={`text-xs font-body ${discountMsg.error ? 'text-coral' : 'text-teal font-bold'}`}>
                  {discountMsg.text}
                </p>
              )}

              {/* Totals */}
              <div className="pt-2 border-t border-ink/10 space-y-1.5 text-sm">
                <div className="flex justify-between text-ink/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {giftWrap && (
                  <div className="flex justify-between text-ink/70">
                    <span>Gift Wrap</span>
                    <span>{formatPrice(giftWrapFee)}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-teal font-semibold">
                    <span>Discount ({discountCode})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-display font-bold text-ink pt-2 border-t border-ink/20">
                  <span>Estimated Total</span>
                  <span>{formatPrice(totalWithGift)}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setCartDrawerOpen(false)}
                  className="py-2.5 px-4 rounded-xl border-2 border-ink bg-paper text-ink font-body font-bold text-sm text-center hover:bg-paper-deep transition-colors"
                >
                  View full cart
                </Link>

                <Link
                  href="/checkout"
                  onClick={() => setCartDrawerOpen(false)}
                  className="py-2.5 px-4 rounded-xl border-2 border-ink bg-marigold text-ink font-body font-bold text-sm flex items-center justify-center gap-2 sticker-shadow hover:bg-marigold/90 transition-all text-center"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;

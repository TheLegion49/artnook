'use client';

import React, { useState } from 'react';
import { ResinArt } from '@/components/art/ResinArt';
import { formatPrice } from '@/lib/utils';
import { useCartStore, useUIStore } from '@/lib/store';
import { Gift, Check, ArrowRight, Sparkles } from 'lucide-react';

const PRESET_AMOUNTS = [50000, 100000, 200000, 500000]; // in paise (₹500, ₹1,000, ₹2,000, ₹5,000)

const DESIGNS = [
  { id: 'ocean', name: 'Ocean Waves', seed: 42, palette: ['#0B5C73', '#12A8A0', '#FFFFFF', '#D4A63A'], variant: 'coaster' },
  { id: 'geode', name: 'Golden Geode', seed: 555, palette: ['#B14AED', '#7B2FBE', '#D4A63A', '#E8D5F5'], variant: 'geode' },
  { id: 'blooms', name: 'Pressed Blooms', seed: 1500, palette: ['#FFF6E5', '#F7A8C4', '#8EE3C2', '#D4A63A'], variant: 'flower-in-resin' },
];

export default function GiftCardsPage() {
  const [selectedAmount, setSelectedAmount] = useState(100000); // ₹1,000
  const [customAmountStr, setCustomAmountStr] = useState('');
  const [selectedDesign, setSelectedDesign] = useState(DESIGNS[0]);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [sendDate, setSendDate] = useState('');
  const [addedNotice, setAddedNotice] = useState(false);

  // Balance checker state
  const [checkCode, setCheckCode] = useState('');
  const [balanceResult, setBalanceResult] = useState<string | null>(null);

  const addItem = useCartStore((state) => state.addItem);
  const setCartDrawerOpen = useUIStore((state) => state.setCartDrawerOpen);

  const activeAmount = customAmountStr ? Math.max(10000, Math.floor(Number(customAmountStr) * 100)) : selectedAmount;

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail) {
      alert('Please enter recipient email');
      return;
    }

    addItem({
      productId: 'prod_artnook_giftcard',
      name: `ArtNook Digital Gift Card (${formatPrice(activeAmount)})`,
      tagline: `For ${recipientName || 'a loved one'} • Design: ${selectedDesign.name}`,
      price: activeAmount,
      quantity: 1,
      maxQuantity: 10,
      isUnique: false,
      artSeed: selectedDesign.seed,
      artVariant: selectedDesign.variant,
      artPalette: selectedDesign.palette,
      personalisation: {
        recipientName,
        recipientEmail,
        giftMessage,
        sendDate: sendDate || 'Immediate',
      },
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
    setCartDrawerOpen(true);
  };

  const handleCheckBalance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkCode.trim()) return;
    // Mock balance
    setBalanceResult(`Card ${checkCode.toUpperCase()} has an active balance of ₹1,000.00`);
  };

  return (
    <div className="bg-paper min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-ink bg-rose/30 text-ink text-xs font-label uppercase font-bold tracking-wider">
            <Gift className="w-3.5 h-3.5 text-coral" />
            <span>The Gift of Choice</span>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-ink">
            ArtNook Gift Cards
          </h1>
          <p className="font-body text-ink/75 text-sm sm:text-base leading-relaxed">
            Delivered instantly by email with a custom card design and your personal note. Never expires, redeemable across our entire catalogue and custom pours.
          </p>
        </div>

        {/* 2-Column: Card Preview + Purchase Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Left: Interactive Card Preview */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-paper-deep border-2 border-ink rounded-3xl p-6 sticker-shadow relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 border-b border-ink/10 pb-3">
                <span className="font-display font-bold text-xl text-ink">The ArtNook</span>
                <span className="font-label text-xs uppercase font-bold text-teal">Gift Card</span>
              </div>

              {/* Digital Card Graphic */}
              <div className="w-full aspect-[16/10] bg-paper rounded-2xl border-2 border-ink p-4 flex flex-col justify-between relative overflow-hidden shadow-inner">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-label uppercase text-ink/60 block">Value</span>
                    <span className="font-display font-bold text-2xl text-ink">
                      {formatPrice(activeAmount)}
                    </span>
                  </div>
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-ink/20">
                    <ResinArt
                      seed={selectedDesign.seed}
                      palette={selectedDesign.palette}
                      variant={selectedDesign.variant}
                      size={64}
                    />
                  </div>
                </div>

                <div>
                  <p className="font-hand text-sm text-ink/80 truncate mb-1">
                    {giftMessage ? `"${giftMessage}"` : '"Pouring a little colour into your day."'}
                  </p>
                  <div className="flex justify-between text-[10px] font-label text-ink/60 pt-1 border-t border-ink/10">
                    <span>To: {recipientName || 'Someone special'}</span>
                    <span>No Expiry</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="font-hand text-sm text-ink/70">
                  Artwork design: <strong>{selectedDesign.name}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Customization Form */}
          <div className="lg:col-span-7 bg-paper border-2 border-ink rounded-3xl p-6 md:p-8 sticker-shadow space-y-6">
            <form onSubmit={handleAddToCart} className="space-y-6">
              
              {/* 1. Pick Amount */}
              <div>
                <label className="block text-xs font-label uppercase font-bold text-ink mb-2">
                  1. Select Card Amount
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-2">
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmountStr('');
                      }}
                      className={`py-2.5 px-3 rounded-xl border-2 font-display font-bold text-sm transition-all ${
                        selectedAmount === amt && !customAmountStr
                          ? 'border-ink bg-marigold text-ink shadow-xs'
                          : 'border-ink/30 bg-paper-deep text-ink hover:border-ink'
                      }`}
                    >
                      {formatPrice(amt)}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-label text-ink/60">Or custom amount (₹):</span>
                  <input
                    type="number"
                    min="100"
                    max="50000"
                    placeholder="E.g. 3500"
                    value={customAmountStr}
                    onChange={(e) => setCustomAmountStr(e.target.value)}
                    className="w-32 px-3 py-1.5 rounded-lg border border-ink/30 bg-paper text-ink text-xs font-label focus:outline-teal"
                  />
                </div>
              </div>

              {/* 2. Choose Artwork */}
              <div>
                <label className="block text-xs font-label uppercase font-bold text-ink mb-2">
                  2. Choose Card Design
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {DESIGNS.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDesign(d)}
                      className={`p-2.5 rounded-xl border-2 text-center transition-all flex flex-col items-center ${
                        selectedDesign.id === d.id
                          ? 'border-ink bg-teal/15 shadow-xs'
                          : 'border-ink/20 hover:border-ink'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-ink/30 mb-2">
                        <ResinArt
                          seed={d.seed}
                          palette={d.palette}
                          variant={d.variant}
                          size={48}
                        />
                      </div>
                      <span className="font-body text-xs font-bold text-ink">{d.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Recipient Details */}
              <div className="space-y-4 pt-2 border-t border-ink/10">
                <label className="block text-xs font-label uppercase font-bold text-ink">
                  3. Who is this gift for?
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Recipient's Name *"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-ink bg-paper text-ink text-xs font-body focus:outline-teal"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Recipient's Email *"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-ink bg-paper text-ink text-xs font-body focus:outline-teal"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={3}
                    maxLength={200}
                    placeholder="Add a handwritten gift message (up to 200 characters)..."
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-ink bg-paper text-ink text-xs font-body focus:outline-teal"
                  />
                  <div className="flex justify-between text-[11px] font-label text-ink/50 mt-1">
                    <span>Printed in Caveat script on digital card</span>
                    <span>{200 - giftMessage.length} characters left</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-label uppercase font-bold text-ink/70 mb-1">
                    Send Date (Leave blank for immediate delivery)
                  </label>
                  <input
                    type="date"
                    value={sendDate}
                    onChange={(e) => setSendDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-ink/30 bg-paper text-ink text-xs font-body focus:outline-teal"
                  />
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl border-2 border-ink bg-marigold text-ink font-bold text-base sticker-shadow hover:bg-marigold/90 flex items-center justify-center gap-2 active:translate-y-0.5 active:translate-x-0.5"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to your Nook!</span>
                  </>
                ) : (
                  <>
                    <Gift className="w-5 h-5" />
                    <span>Add Gift Card to Nook ({formatPrice(activeAmount)})</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Balance Checker Section */}
        <div className="bg-paper-deep border-2 border-ink rounded-3xl p-6 md:p-8 max-w-xl mx-auto text-center sticker-shadow">
          <h3 className="font-display font-bold text-xl text-ink mb-2">
            Check Gift Card Balance
          </h3>
          <p className="font-body text-xs text-ink/75 mb-4">
            Have an ArtNook digital gift card? Enter your 16-character code below.
          </p>

          <form onSubmit={handleCheckBalance} className="flex gap-2">
            <input
              type="text"
              placeholder="E.g. NOOK-7881-9920-ABCD"
              value={checkCode}
              onChange={(e) => setCheckCode(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border-2 border-ink bg-paper text-ink font-label text-xs uppercase focus:outline-teal"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl border-2 border-ink bg-teal text-paper font-bold text-xs uppercase hover:bg-teal/90"
            >
              Check
            </button>
          </form>

          {balanceResult && (
            <div className="mt-4 p-3 bg-mint/30 border border-mint rounded-xl text-xs font-bold text-ink">
              {balanceResult}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ResinArt } from '@/components/art/ResinArt';
import { formatPrice } from '@/lib/utils';
import { Search, Package, Clock, CheckCircle2, Truck, ExternalLink, HelpCircle } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Mock order tracking details
  const mockOrder = {
    id: orderNumber || 'AN-2026-10492',
    date: 'Sep 29, 2026',
    status: 'SHIPPED',
    carrier: 'BlueDart Express',
    trackingNumber: 'BD-8849201948',
    estimatedDelivery: 'Oct 04, 2026',
    shippingAddress: 'Flat 402, Sunshine Apts, Indiranagar, Bengaluru, 560038',
    items: [
      {
        name: 'Ocean Wave Coaster Set of 4',
        variant: 'Classic Blue',
        price: 119900,
        qty: 1,
        seed: 42,
        palette: ['#0B5C73', '#12A8A0', '#FFFFFF', '#D4A63A'],
        artVariant: 'coaster',
      },
      {
        name: 'Gold-Fleck Bookmark',
        variant: 'Default',
        price: 29900,
        qty: 2,
        seed: 1400,
        palette: ['#FFF6E5', '#D4A63A', '#FFB627'],
        artVariant: 'bookmark',
      },
    ],
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setHasSearched(true);
  };

  const timelineSteps = [
    { key: 'PAID', label: 'Order Received', desc: 'Confirmed & assigned to pouring batch' },
    { key: 'IN_STUDIO', label: 'Poured & Curing', desc: 'Resin mixed & resting in dust-free shelf (48 hrs)' },
    { key: 'QUALITY_CHECK', label: 'Sanding & Polishing', desc: 'Edges hand-beveled & gold leaf inspected' },
    { key: 'PACKED', label: 'Packed with Love', desc: 'Boxed in honeycomb cushion with wax seal' },
    { key: 'SHIPPED', label: 'On Its Way', desc: 'In transit with courier' },
    { key: 'DELIVERED', label: 'Delivered', desc: 'Settled into its new nook' },
  ];

  return (
    <div className="bg-paper min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-ink bg-teal/20 text-ink text-xs font-label uppercase font-bold tracking-wider">
            <Package className="w-3.5 h-3.5 text-teal" />
            <span>Studio Courier Dispatch</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink">
            Track Your Order
          </h1>
          <p className="font-body text-xs sm:text-sm text-ink/75">
            Enter your order number and email to see exactly where your handmade pour is in our studio workflow.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-paper-deep border-2 border-ink rounded-3xl p-6 md:p-8 sticker-shadow mb-12">
          <form onSubmit={handleTrack} className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5">
              <label className="block text-xs font-label uppercase font-bold text-ink mb-1.5">
                Order Number *
              </label>
              <input
                type="text"
                required
                placeholder="E.g. AN-2026-10492"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-paper text-ink font-label text-sm uppercase focus:outline-teal"
              />
            </div>

            <div className="md:col-span-5">
              <label className="block text-xs font-label uppercase font-bold text-ink mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="The email used at checkout"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-paper text-ink font-body text-sm focus:outline-teal"
              />
            </div>

            <div className="md:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl border-2 border-ink bg-marigold text-ink font-bold text-sm sticker-shadow hover:bg-marigold/90 flex items-center justify-center gap-1.5 active:scale-98"
              >
                <Search className="w-4 h-4" />
                <span>Track</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Tracking Result */}
        {hasSearched && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Status Summary Banner */}
            <div className="bg-paper border-2 border-ink rounded-3xl p-6 md:p-8 sticker-shadow">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-ink/15 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-label text-xs uppercase font-bold text-ink/60">
                      Tracking Status
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full border border-ink bg-mint text-ink font-label text-xs font-bold uppercase">
                      On Its Way 🚚
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-2xl text-ink">
                    Order {mockOrder.id}
                  </h2>
                </div>

                <div className="text-left sm:text-right">
                  <span className="font-label text-xs text-ink/60 block">Estimated Arrival</span>
                  <span className="font-display font-bold text-xl text-teal">
                    {mockOrder.estimatedDelivery}
                  </span>
                </div>
              </div>

              {/* Courier info card */}
              <div className="p-4 rounded-2xl bg-paper-deep/60 border border-ink/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-paper border border-ink/30 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <span className="text-xs font-label uppercase text-ink/60 block">Carrier</span>
                    <span className="font-bold text-sm text-ink">{mockOrder.carrier}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-label uppercase text-ink/60 block">AWB Number</span>
                  <span className="font-label font-bold text-sm text-ink">{mockOrder.trackingNumber}</span>
                </div>

                <a
                  href={`https://example.com/track?awb=${mockOrder.trackingNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl border-2 border-ink bg-paper text-ink font-bold text-xs flex items-center gap-1.5 hover:bg-paper-deep"
                >
                  <span>Carrier portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* 6-Phase Timeline */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-ink">
                  Studio Workflow Journey
                </h3>

                <div className="relative pl-6 sm:pl-8 border-l-2 border-teal space-y-6">
                  {timelineSteps.map((s, idx) => {
                    const isDone = idx <= 4;
                    const isCurrent = idx === 4;

                    return (
                      <div key={s.key} className="relative">
                        {/* Dot */}
                        <div
                          className={`absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full border-2 border-ink flex items-center justify-center ${
                            isDone ? 'bg-teal' : 'bg-paper'
                          }`}
                        >
                          {isDone && <CheckCircle2 className="w-3 h-3 text-paper" />}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-display font-bold text-sm ${
                                isCurrent ? 'text-teal text-base' : 'text-ink'
                              }`}
                            >
                              {s.label}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] font-label font-bold uppercase px-2 py-0.5 bg-marigold border border-ink rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="font-body text-xs text-ink/70 mt-0.5">{s.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Items inside this box */}
            <div className="bg-paper border-2 border-ink rounded-3xl p-6 md:p-8 sticker-shadow">
              <h3 className="font-display font-bold text-xl text-ink mb-4">
                Pieces in this Parcel
              </h3>

              <div className="divide-y divide-ink/10">
                {mockOrder.items.map((item, idx) => (
                  <div key={idx} className="py-4 flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl border-2 border-ink bg-paper-deep overflow-hidden shrink-0 flex items-center justify-center p-1">
                      <ResinArt
                        seed={item.seed}
                        palette={item.palette}
                        variant={item.artVariant}
                        size={56}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display font-bold text-sm text-ink">{item.name}</h4>
                      <p className="font-label text-xs text-ink/60">
                        Qty: {item.qty} • {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between text-xs font-body text-ink/75">
                <span>Shipping to: {mockOrder.shippingAddress}</span>
                <Link href="/contact" className="font-bold text-teal hover:underline flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Need help with order?</span>
                </Link>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

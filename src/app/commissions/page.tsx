import React from 'react';
import Link from 'next/link';
import { ResinArt } from '@/components/art/ResinArt';
import { Sparkle, PolaroidFrame, TornPaperDivider } from '@/components/doodles/Doodles';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Calendar, MessageSquare } from 'lucide-react';

export default function CommissionsPage() {
  const galleryItems = [
    {
      title: 'Wedding Bouquet Arch',
      type: 'Flower Preservation',
      desc: 'White roses and eucalyptus from a mountain wedding, cast in a freestanding arched block.',
      seed: 1500,
      palette: ['#FFF6E5', '#F7A8C4', '#8EE3C2', '#D4A63A'],
      variant: 'flower-in-resin',
      leadTime: '3–4 weeks',
      priceGuide: 'From ₹6,999',
    },
    {
      title: 'Geode Statement Headboard',
      type: 'Wall Art',
      desc: 'Deep amethyst and violet veins with real crushed quartz and gold leaf lines.',
      seed: 555,
      palette: ['#B14AED', '#7B2FBE', '#D4A63A', '#E8D5F5'],
      variant: 'geode',
      leadTime: '2–3 weeks',
      priceGuide: 'From ₹5,499',
    },
    {
      title: 'Custom Family Name Plaque',
      type: 'Home Décor',
      desc: 'Eight chunky resin letters with oceanic mica layers, set on a hand-planed teak base.',
      seed: 1900,
      palette: ['#12A8A0', '#0B5C73', '#FFB627', '#FF6B5E'],
      variant: 'wall-art',
      leadTime: '10–14 days',
      priceGuide: 'From ₹3,499',
    },
    {
      title: 'Tidal Pool River Tray',
      type: 'Trays & Coasters',
      desc: 'Custom 24-inch round walnut serving tray featuring layered turquoise seafoam resin.',
      seed: 789,
      palette: ['#12A8A0', '#0B5C73', '#FFFFFF', '#D4A63A'],
      variant: 'tray',
      leadTime: '2 weeks',
      priceGuide: 'From ₹4,299',
    },
  ];

  return (
    <div className="bg-paper min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-ink bg-orchid/20 text-ink text-xs font-label uppercase font-bold tracking-wider sticker-shadow">
            <Sparkles className="w-3.5 h-3.5 text-orchid" />
            <span>One-on-One Custom Studio Pours</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-tight">
            Where your memory becomes a{' '}
            <span className="hand-underline text-orchid">keepsake</span>.
          </h1>

          <p className="font-body text-ink/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether it's the flowers from the best day of your life, a memorial piece for someone you miss, or art matched to your home's exact colours — we pour each commission with patience and heart.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/commissions/new"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl border-2 border-ink bg-marigold text-ink font-body font-bold text-base sticker-shadow hover:bg-marigold/90 flex items-center justify-center gap-2"
            >
              <span>Submit a commission idea</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/commissions/COM-2026-0881"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border-2 border-ink bg-paper text-ink font-body font-bold text-sm hover:bg-paper-deep text-center"
            >
              View demo live tracker →
            </Link>
          </div>
        </div>

        {/* 4 Step Workflow */}
        <div className="bg-paper-deep border-2 border-ink rounded-3xl p-8 md:p-12 mb-20 sticker-shadow">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-label text-xs uppercase tracking-wider font-bold text-teal block mb-1">
              How it works
            </span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
              The 4-Step Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-paper border-2 border-ink rounded-2xl p-5 text-center">
              <span className="w-10 h-10 rounded-full border-2 border-ink bg-marigold text-ink font-display font-bold text-base flex items-center justify-center mx-auto mb-3">
                1
              </span>
              <h3 className="font-display font-bold text-base text-ink mb-1">Share the Dream</h3>
              <p className="font-body text-xs text-ink/75 leading-relaxed">
                Fill our 5-minute request form with your dimensions, palette preferences, or flower details.
              </p>
            </div>

            <div className="bg-paper border-2 border-ink rounded-2xl p-5 text-center">
              <span className="w-10 h-10 rounded-full border-2 border-ink bg-teal text-paper font-display font-bold text-base flex items-center justify-center mx-auto mb-3">
                2
              </span>
              <h3 className="font-display font-bold text-base text-ink mb-1">Quote & Deposit</h3>
              <p className="font-body text-xs text-ink/75 leading-relaxed">
                We confirm feasibility, share a quote and timeline. A 50% deposit locks in your studio slot.
              </p>
            </div>

            <div className="bg-paper border-2 border-ink rounded-2xl p-5 text-center">
              <span className="w-10 h-10 rounded-full border-2 border-ink bg-orchid text-paper font-display font-bold text-base flex items-center justify-center mx-auto mb-3">
                3
              </span>
              <h3 className="font-display font-bold text-base text-ink mb-1">Milestones & Preview</h3>
              <p className="font-body text-xs text-ink/75 leading-relaxed">
                Follow along with studio progress photos. You approve the final preview before topcoat curing.
              </p>
            </div>

            <div className="bg-paper border-2 border-ink rounded-2xl p-5 text-center">
              <span className="w-10 h-10 rounded-full border-2 border-ink bg-mint text-ink font-display font-bold text-base flex items-center justify-center mx-auto mb-3">
                4
              </span>
              <h3 className="font-display font-bold text-base text-ink mb-1">Balance & Arrival</h3>
              <p className="font-body text-xs text-ink/75 leading-relaxed">
                Pay remaining balance once perfected. We securely wrap and dispatch with door-to-door tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Gallery of Completed Pieces */}
        <div className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="font-label text-xs uppercase tracking-wider font-bold text-coral block mb-1">
                From the studio vault
              </span>
              <h2 className="font-display font-bold text-3xl text-ink">
                Completed Commission Works
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-paper border-2 border-ink rounded-2xl p-5 flex flex-col justify-between sticker-shadow"
              >
                <div>
                  <div className="w-full aspect-square bg-paper-deep rounded-xl border border-ink/20 flex items-center justify-center p-3 mb-4 overflow-hidden">
                    <ResinArt
                      seed={item.seed}
                      palette={item.palette}
                      variant={item.variant}
                      size="100%"
                    />
                  </div>

                  <span className="font-label text-[11px] font-bold uppercase text-orchid block mb-1">
                    {item.type}
                  </span>
                  <h3 className="font-display font-bold text-lg text-ink mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs text-ink/70 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-ink/10 flex items-center justify-between text-xs font-label">
                  <span className="font-bold text-ink">{item.priceGuide}</span>
                  <Link
                    href={`/commissions/new?type=${encodeURIComponent(item.type)}`}
                    className="font-bold text-teal hover:underline flex items-center gap-1"
                  >
                    <span>Request similar</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flower Preservation Guidelines Card */}
        <div className="bg-rose/20 border-2 border-ink rounded-3xl p-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="font-label text-xs uppercase font-bold text-coral tracking-wider">
                Speciality Craft
              </span>
              <h3 className="font-display font-bold text-2xl text-ink">
                Sending Your Fresh Wedding Flowers?
              </h3>
              <p className="font-body text-sm text-ink/80 leading-relaxed">
                For wedding bouquets, time is of the essence. We recommend shipping your flowers within 2–3 days of the event. We provide express courier instructions, silica gel packing recommendations, and a dedicated drop-off coordinate in our confirmation email.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <Link
                href="/commissions/new?type=Flower+Preservation"
                className="px-6 py-3 rounded-xl border-2 border-ink bg-marigold text-ink font-bold text-sm sticker-shadow hover:bg-marigold/90"
              >
                Book preservation slot
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

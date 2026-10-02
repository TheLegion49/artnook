'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUp, Send, Sparkles, Check } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-deep-sea text-paper border-t-2 border-ink overflow-hidden pt-16 pb-12">
      {/* Decorative top drip wave border */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-marigold border-b-2 border-ink" />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Handwritten maker note */}
        <div className="text-center max-w-2xl mx-auto mb-14 px-4">
          <p className="font-hand text-2xl md:text-3xl text-marigold leading-relaxed">
            "Every piece is poured with care in our small studio. Thank you for supporting handmade and inviting a little piece of our world into yours. 💛"
          </p>
          <span className="font-label text-xs uppercase tracking-widest text-mint/80 block mt-2">
            — The ArtNook Makers
          </span>
        </div>

        {/* 4 Link Columns + Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14 border-b border-paper/15 pb-14">
          
          {/* Col 1: Shop */}
          <div>
            <h4 className="font-display font-bold text-lg text-paper mb-4 flex items-center gap-2">
              <span className="text-marigold">●</span> Shop
            </h4>
            <ul className="space-y-2.5 text-sm font-body text-paper/80">
              <li>
                <Link href="/shop" className="hover:text-marigold transition-colors">
                  All Pieces
                </Link>
              </li>
              <li>
                <Link href="/collections/new-arrivals" className="hover:text-marigold transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections/bestsellers" className="hover:text-marigold transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="/collections/gifts-under-999" className="hover:text-marigold transition-colors">
                  Gifts Under ₹999
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="hover:text-marigold transition-colors">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link href="/commissions" className="hover:text-marigold transition-colors flex items-center gap-1.5 text-orchid">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Custom Commissions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Help */}
          <div>
            <h4 className="font-display font-bold text-lg text-paper mb-4 flex items-center gap-2">
              <span className="text-teal">●</span> Help & Care
            </h4>
            <ul className="space-y-2.5 text-sm font-body text-paper/80">
              <li>
                <Link href="/contact" className="hover:text-teal transition-colors">
                  Contact the Studio
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-teal transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/care-guide" className="hover:text-teal transition-colors">
                  Resin Care Guide
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-teal transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-teal transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-teal transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio */}
          <div>
            <h4 className="font-display font-bold text-lg text-paper mb-4 flex items-center gap-2">
              <span className="text-rose">●</span> Studio
            </h4>
            <ul className="space-y-2.5 text-sm font-body text-paper/80">
              <li>
                <Link href="/about" className="hover:text-rose transition-colors">
                  About Our Studio
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-rose transition-colors">
                  The Studio Journal
                </Link>
              </li>
              <li>
                <Link href="/commissions" className="hover:text-rose transition-colors">
                  Wedding Flower Preservation
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-rose transition-colors text-paper/40">
                  Maker Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <h4 className="font-display font-bold text-lg text-paper mb-4 flex items-center gap-2">
              <span className="text-mint">●</span> Policies
            </h4>
            <ul className="space-y-2.5 text-sm font-body text-paper/80">
              <li>
                <Link href="/policies/privacy" className="hover:text-mint transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-mint transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/policies/cookies" className="hover:text-mint transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/custom-orders" className="hover:text-mint transition-colors">
                  Custom Order Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="font-display font-bold text-lg text-paper mb-2">
              Join the Nook
            </h4>
            <p className="text-xs text-paper/70 font-body mb-3">
              Studio drops, curing previews, and a 10% welcome treat for your first order.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-mint/20 border border-mint text-mint flex items-center gap-2 text-xs font-bold">
                <Check className="w-4 h-4" />
                <span>You're in! Welcome to our nook. 💛</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-paper/10 border border-paper/30 text-paper placeholder:text-paper/40 text-xs font-body focus:outline-marigold focus:bg-paper/20"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-marigold border-2 border-ink text-ink font-bold text-xs flex items-center justify-center gap-2 hover:bg-marigold/90 active:scale-98 transition-all"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-paper/30 flex items-center justify-center hover:bg-paper/20 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-paper" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <span className="text-xs font-hand text-marigold">@theartnook.studio</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-label text-paper/60">
          <div>
            © {new Date().getFullYear()} The ArtNook. Handcrafted with resin, mica and love.
          </div>

          {/* Payment badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded-sm bg-paper/10 border border-paper/20">UPI</span>
            <span className="px-2 py-0.5 rounded-sm bg-paper/10 border border-paper/20">RuPay</span>
            <span className="px-2 py-0.5 rounded-sm bg-paper/10 border border-paper/20">Visa</span>
            <span className="px-2 py-0.5 rounded-sm bg-paper/10 border border-paper/20">Mastercard</span>
            <span className="px-2 py-0.5 rounded-sm bg-paper/10 border border-paper/20">NetBanking</span>
            <span className="px-2 py-0.5 rounded-sm bg-paper/10 border border-paper/20">COD</span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-marigold hover:underline cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

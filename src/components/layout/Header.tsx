'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore, useWishlistStore, useUIStore } from '@/lib/store';
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { getAllCategories, getAllColours } from '@/lib/api';

const ANNOUNCEMENTS = [
  'Free standard shipping on orders above ₹1,999 ✨',
  'Handmade in small batches in our studio 🎨',
  'Use code WELCOME10 for 10% off your first order 💛',
  'Every piece is cured 24–72 hours for diamond clarity 💎',
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.getCount());
  const setCartDrawerOpen = useUIStore((state) => state.setCartDrawerOpen);

  // Shrink header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotate announcement bar every 4.5 seconds unless paused
  useEffect(() => {
    if (isPaused || announcementDismissed) return;
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, announcementDismissed]);

  const categories = getAllCategories();
  const colours = getAllColours().slice(0, 8);

  return (
    <>
      {/* Skip to main content accessibility link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Announcement tape bar */}
      {!announcementDismissed && (
        <div
          className="relative bg-marigold border-b-2 border-ink text-ink font-body font-semibold text-xs py-1.5 px-4 flex items-center justify-center transition-all select-none overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Announcements"
        >
          {/* Subtle tape texture strip */}
          <div className="flex items-center gap-2 text-center animate-fade">
            <span className="font-hand text-sm font-bold">Heads up:</span>
            <span>{ANNOUNCEMENTS[announcementIndex]}</span>
          </div>

          <button
            onClick={() => setAnnouncementDismissed(true)}
            aria-label="Dismiss announcement"
            className="absolute right-3 p-0.5 rounded-sm hover:bg-ink/10 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Sticky header container */}
      <header
        className={`sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b-2 border-ink transition-all duration-300 ${
          scrolled ? 'py-2.5 shadow-sm' : 'py-4'
        }`}
      >
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
          
          {/* Left: Mobile hamburger & Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl border-2 border-ink bg-paper-deep text-ink active:scale-95"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Wordmark logo */}
            <Link href="/" className="flex items-center gap-2 group">
              {/* Arched window doodle SVG */}
              <svg
                viewBox="0 0 32 40"
                className="w-7 h-9 text-teal transition-transform group-hover:scale-105"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 36 V 16 C 4 9 9 4 16 4 C 23 4 28 9 28 16 V 36 Z"
                  stroke="#2B1B3D"
                  strokeWidth="2.5"
                  fill="#12A8A0"
                />
                <circle cx="16" cy="14" r="3.5" fill="#FFB627" />
                <path d="M4 24 H 28" stroke="#2B1B3D" strokeWidth="2" />
                <path d="M16 24 V 36" stroke="#2B1B3D" strokeWidth="2" />
              </svg>

              <div>
                <span className="font-display font-bold text-2xl md:text-3xl tracking-tight text-ink block leading-none">
                  The ArtNook
                </span>
                <span className="font-hand text-xs text-ink/70 block leading-tight">
                  handmade resin studio
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 font-body font-semibold text-sm text-ink">
            <Link
              href="/shop"
              className={`hover:text-teal transition-colors pb-1 ${
                pathname === '/shop' ? 'text-teal border-b-2 border-teal' : ''
              }`}
            >
              Shop All
            </Link>

            {/* Mega menu trigger */}
            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button
                className={`flex items-center gap-1 hover:text-teal transition-colors pb-1 ${
                  pathname.startsWith('/collections') ? 'text-teal border-b-2 border-teal' : ''
                }`}
                aria-expanded={megaMenuOpen}
              >
                <span>Collections</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
              </button>

              {/* Mega menu dropdown */}
              {megaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[720px] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-paper border-2 border-ink rounded-2xl p-6 shadow-[6px_6px_0px_#2B1B3D] grid grid-cols-4 gap-6">
                    {/* By Type */}
                    <div>
                      <h4 className="font-display text-xs uppercase tracking-wider font-bold text-ink/60 mb-3 border-b border-ink/10 pb-1">
                        By Category
                      </h4>
                      <ul className="space-y-2 text-xs font-body font-medium">
                        {categories.map((c) => (
                          <li key={c}>
                            <Link
                              href={`/shop?category=${encodeURIComponent(c)}`}
                              onClick={() => setMegaMenuOpen(false)}
                              className="text-ink hover:text-teal transition-colors block"
                            >
                              {c}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* By Colour */}
                    <div>
                      <h4 className="font-display text-xs uppercase tracking-wider font-bold text-ink/60 mb-3 border-b border-ink/10 pb-1">
                        By Colour
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs font-body">
                        {colours.map((col) => (
                          <Link
                            key={col}
                            href={`/shop?colour=${encodeURIComponent(col)}`}
                            onClick={() => setMegaMenuOpen(false)}
                            className="flex items-center gap-1.5 text-ink hover:text-teal"
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-ink/40 shrink-0"
                              style={{
                                backgroundColor:
                                  col === 'Deep blue' ? '#0B5C73' :
                                  col === 'Teal' ? '#12A8A0' :
                                  col === 'Gold' ? '#D4A63A' :
                                  col === 'Purple' || col === 'Violet' ? '#B14AED' :
                                  col === 'Pink' || col === 'Blush pink' ? '#F7A8C4' :
                                  col === 'Coral' ? '#FF6B5E' :
                                  col === 'Mint' ? '#8EE3C2' : '#FFB627',
                              }}
                            />
                            <span className="truncate">{col}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Curated */}
                    <div>
                      <h4 className="font-display text-xs uppercase tracking-wider font-bold text-ink/60 mb-3 border-b border-ink/10 pb-1">
                        Curated
                      </h4>
                      <ul className="space-y-2 text-xs font-body font-medium">
                        <li>
                          <Link href="/collections/ocean-dreams" onClick={() => setMegaMenuOpen(false)} className="text-ink hover:text-teal block">
                            🌊 Ocean Dreams
                          </Link>
                        </li>
                        <li>
                          <Link href="/collections/geode-gallery" onClick={() => setMegaMenuOpen(false)} className="text-ink hover:text-teal block">
                            💎 Geode Gallery
                          </Link>
                        </li>
                        <li>
                          <Link href="/collections/pressed-flower-keepsakes" onClick={() => setMegaMenuOpen(false)} className="text-ink hover:text-teal block">
                            🌸 Pressed Flowers
                          </Link>
                        </li>
                        <li>
                          <Link href="/collections/gifts-under-999" onClick={() => setMegaMenuOpen(false)} className="text-ink hover:text-teal block">
                            🎁 Gifts Under ₹999
                          </Link>
                        </li>
                        <li>
                          <Link href="/collections/bestsellers" onClick={() => setMegaMenuOpen(false)} className="text-ink hover:text-teal block">
                            ⭐ Bestsellers
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Featured Studio Card */}
                    <div className="bg-paper-deep rounded-xl border border-ink/20 p-3 flex flex-col justify-between">
                      <div>
                        <span className="font-label text-[10px] uppercase font-bold text-teal block mb-1">
                          Maker's Pick
                        </span>
                        <p className="font-display font-bold text-xs text-ink leading-tight mb-1">
                          Ocean Wave Coasters
                        </p>
                        <p className="font-hand text-xs text-ink/75">
                          Swirled with mica and rimmed in gold leaf.
                        </p>
                      </div>
                      <Link
                        href="/product/ocean-wave-coaster-set-of-4"
                        onClick={() => setMegaMenuOpen(false)}
                        className="mt-2 text-xs font-bold text-ink bg-marigold border border-ink rounded-lg py-1 px-2.5 text-center hover:bg-marigold/90"
                      >
                        Take a peek →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/commissions"
              className={`hover:text-orchid transition-colors pb-1 flex items-center gap-1 ${
                pathname.startsWith('/commissions') ? 'text-orchid border-b-2 border-orchid' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-orchid" />
              <span>Custom Pours</span>
            </Link>

            <Link
              href="/journal"
              className={`hover:text-teal transition-colors pb-1 ${
                pathname.startsWith('/journal') ? 'text-teal border-b-2 border-teal' : ''
              }`}
            >
              Journal
            </Link>

            <Link
              href="/about"
              className={`hover:text-teal transition-colors pb-1 ${
                pathname === '/about' ? 'text-teal border-b-2 border-teal' : ''
              }`}
            >
              About
            </Link>
          </nav>

          {/* Right: Actions (Search, Wishlist, Account, Cart) */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/search"
              aria-label="Search catalogue"
              className="p-2 rounded-xl border-2 border-ink bg-paper text-ink hover:bg-paper-deep transition-all active:scale-95"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              href="/account"
              aria-label="My Account"
              className="p-2 rounded-xl border-2 border-ink bg-paper text-ink hover:bg-paper-deep transition-all active:scale-95"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              href="/account?tab=wishlist"
              aria-label={`Wishlist with ${wishlistCount} items`}
              className="relative p-2 rounded-xl border-2 border-ink bg-paper text-ink hover:bg-rose/40 transition-all active:scale-95"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-coral text-paper font-label text-[11px] font-bold w-5 h-5 rounded-full border-2 border-ink flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              aria-label={`Your Nook cart with ${cartCount} items`}
              className="relative flex items-center gap-2 py-2 px-3.5 rounded-xl border-2 border-ink bg-marigold text-ink font-body font-bold text-sm sticker-shadow hover:bg-marigold/90 active:translate-x-0.5 active:translate-y-0.5"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">My Nook</span>
              <span className="bg-ink text-paper font-label text-xs font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-paper border-b-2 border-ink">
          <div className="p-4 border-b-2 border-ink flex items-center justify-between bg-paper-deep">
            <span className="font-display font-bold text-xl text-ink">Navigation</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl border-2 border-ink bg-paper text-ink"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-6 grid grid-cols-2 gap-4 overflow-y-auto">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="p-5 rounded-2xl border-2 border-ink bg-teal/15 flex flex-col justify-between sticker-shadow"
            >
              <span className="text-3xl">🎨</span>
              <span className="font-display font-bold text-lg text-ink">Shop All</span>
            </Link>

            <Link
              href="/collections"
              onClick={() => setMobileMenuOpen(false)}
              className="p-5 rounded-2xl border-2 border-ink bg-mint/25 flex flex-col justify-between sticker-shadow"
            >
              <span className="text-3xl">✨</span>
              <span className="font-display font-bold text-lg text-ink">Collections</span>
            </Link>

            <Link
              href="/commissions"
              onClick={() => setMobileMenuOpen(false)}
              className="p-5 rounded-2xl border-2 border-ink bg-orchid/20 flex flex-col justify-between sticker-shadow"
            >
              <span className="text-3xl">🔮</span>
              <span className="font-display font-bold text-lg text-ink">Custom Pours</span>
            </Link>

            <Link
              href="/journal"
              onClick={() => setMobileMenuOpen(false)}
              className="p-5 rounded-2xl border-2 border-ink bg-rose/25 flex flex-col justify-between sticker-shadow"
            >
              <span className="text-3xl">📖</span>
              <span className="font-display font-bold text-lg text-ink">Journal</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="p-5 rounded-2xl border-2 border-ink bg-marigold/20 flex flex-col justify-between sticker-shadow"
            >
              <span className="text-3xl">☕</span>
              <span className="font-display font-bold text-lg text-ink">The Studio</span>
            </Link>

            <Link
              href="/care-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="p-5 rounded-2xl border-2 border-ink bg-deep-sea/15 flex flex-col justify-between sticker-shadow"
            >
              <span className="text-3xl">🧼</span>
              <span className="font-display font-bold text-lg text-ink">Care Guide</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;

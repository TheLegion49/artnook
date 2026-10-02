'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useWishlistStore, useCartStore, useUIStore } from '@/lib/store';
import { products, Product } from '@/data/products';
import { ResinArt } from '@/components/art/ResinArt';
import { formatPrice } from '@/lib/utils';
import {
  Package,
  Heart,
  MapPin,
  Sparkles,
  Gift,
  Settings,
  User,
  ShoppingBag,
  Trash2,
  Download,
  RotateCcw,
  Check,
  ExternalLink,
} from 'lucide-react';

function AccountContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'orders';
  const [activeTab, setActiveTab] = useState(initialTab);

  const wishlistStore = useWishlistStore();
  const cartStore = useCartStore();
  const { setCartDrawerOpen } = useUIStore();

  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 'addr_1',
      name: 'Priya Nair',
      street: 'Flat 402, Sunshine Apartments, 12th Main',
      area: 'Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      phone: '+91 98765 43210',
      isDefault: true,
    },
  ]);

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: '',
    street: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });

  const wishlistedProducts = products.filter((p) => wishlistStore.isWishlisted(p.id));

  const mockPastOrders = [
    {
      id: 'AN-2026-10492',
      date: 'Sep 29, 2026',
      total: 179700,
      status: 'On Its Way',
      itemsCount: 3,
      items: [
        { name: 'Ocean Wave Coaster Set of 4', seed: 42, palette: ['#0B5C73', '#12A8A0', '#FFFFFF', '#D4A63A'], variant: 'coaster' },
        { name: 'Gold-Fleck Bookmark', seed: 1400, palette: ['#FFF6E5', '#D4A63A', '#FFB627'], variant: 'bookmark' },
      ],
    },
    {
      id: 'AN-2026-09184',
      date: 'Aug 14, 2026',
      total: 349900,
      status: 'Delivered',
      itemsCount: 1,
      items: [
        { name: 'Sunset Swirl Round Tray', seed: 314, palette: ['#FF6B5E', '#FFB627', '#D4A63A'], variant: 'tray' },
      ],
    },
  ];

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedAddresses((prev) => [
      ...prev,
      { ...newAddr, id: `addr_${Date.now()}`, isDefault: false },
    ]);
    setIsEditingAddress(false);
    setNewAddr({ name: '', street: '', area: '', city: '', state: '', pincode: '', phone: '' });
  };

  const handleExportData = () => {
    const data = {
      user: { name: 'Priya Nair', email: 'priya.nair@example.com' },
      orders: mockPastOrders,
      wishlist: wishlistedProducts.map((p) => p.name),
      addresses: savedAddresses,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ArtNook-Data-Export-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="bg-paper min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Profile Summary Header */}
        <div className="bg-paper-deep border-2 border-ink rounded-3xl p-6 md:p-8 mb-10 sticker-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl border-2 border-ink bg-marigold flex items-center justify-center font-display font-bold text-2xl text-ink">
              PN
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-ink">
                Welcome back, Priya
              </h1>
              <p className="font-body text-xs md:text-sm text-ink/75">
                priya.nair@example.com • Nook Collector since August 2026
              </p>
            </div>
          </div>

          <Link
            href="/shop"
            className="px-5 py-2.5 rounded-xl border-2 border-ink bg-paper text-ink font-bold text-xs uppercase hover:bg-paper-deep transition-all"
          >
            Explore Catalogue
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b-2 border-ink/10 scrollbar-none">
          {[
            { id: 'orders', label: 'My Orders', icon: Package },
            { id: 'wishlist', label: `Wishlist (${wishlistStore.getCount()})`, icon: Heart },
            { id: 'addresses', label: 'Addresses', icon: MapPin },
            { id: 'commissions', label: 'Custom Pours', icon: Sparkles },
            { id: 'giftcards', label: 'Gift Cards', icon: Gift },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2.5 px-4 rounded-xl border-2 font-body font-bold text-xs sm:text-sm shrink-0 flex items-center gap-2 transition-all ${
                  isActive
                    ? 'border-ink bg-marigold text-ink sticker-shadow'
                    : 'border-transparent bg-paper text-ink/70 hover:bg-paper-deep hover:border-ink/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="font-display font-bold text-2xl text-ink">Order History</h2>
            
            <div className="space-y-4">
              {mockPastOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-paper border-2 border-ink rounded-3xl p-6 sticker-shadow space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-ink/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display font-bold text-lg text-ink">{ord.id}</span>
                        <span className="px-2.5 py-0.5 rounded-full border border-ink bg-mint text-ink font-label text-[11px] font-bold">
                          {ord.status}
                        </span>
                      </div>
                      <span className="font-label text-xs text-ink/60">Placed on {ord.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/track?order=${ord.id}`}
                        className="px-3.5 py-1.5 rounded-xl border-2 border-ink bg-paper text-ink font-bold text-xs hover:bg-paper-deep flex items-center gap-1.5"
                      >
                        <span>Live Track</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => alert(`Downloading Invoice for ${ord.id}`)}
                        className="px-3.5 py-1.5 rounded-xl border-2 border-ink bg-paper text-ink font-bold text-xs hover:bg-paper-deep flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Invoice PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* Order items thumbnails */}
                  <div className="flex items-center gap-4">
                    {ord.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-paper-deep/50 p-2 rounded-xl border border-ink/10">
                        <div className="w-12 h-12 rounded-lg border border-ink/20 overflow-hidden">
                          <ResinArt seed={item.seed} palette={item.palette} variant={item.variant} size={48} />
                        </div>
                        <span className="font-body text-xs font-bold text-ink max-w-[140px] truncate">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-between items-center text-sm font-display font-bold text-ink">
                    <span>Order Total:</span>
                    <span>{formatPrice(ord.total)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-2xl text-ink">
                Saved in Your Wishlist ({wishlistedProducts.length})
              </h2>
            </div>

            {wishlistedProducts.length === 0 ? (
              <div className="bg-paper-deep border-2 border-ink rounded-3xl p-12 text-center">
                <Heart className="w-12 h-12 text-coral mx-auto mb-3" />
                <h3 className="font-display font-bold text-xl text-ink mb-1">
                  Your wishlist is quiet right now
                </h3>
                <p className="font-body text-xs text-ink/75 max-w-sm mx-auto mb-6">
                  Tap the heart icon on any coaster, tray or pendant to save pieces you've fallen for.
                </p>
                <Link
                  href="/shop"
                  className="px-6 py-2.5 rounded-xl border-2 border-ink bg-marigold text-ink font-bold text-xs uppercase sticker-shadow"
                >
                  Browse Catalogue
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-paper border-2 border-ink rounded-2xl p-4 flex flex-col justify-between sticker-shadow"
                  >
                    <div>
                      <div className="w-full aspect-square bg-paper-deep rounded-xl border border-ink/20 flex items-center justify-center p-3 mb-3 overflow-hidden">
                        <ResinArt seed={p.artSeed} palette={p.artPalette} variant={p.artVariant} size="100%" />
                      </div>
                      <h4 className="font-display font-bold text-base text-ink mb-1">{p.name}</h4>
                      <p className="font-body text-xs text-ink/70 mb-2">{formatPrice(p.price)}</p>
                    </div>

                    <div className="pt-3 border-t border-ink/10 flex items-center gap-2">
                      <button
                        onClick={() => {
                          cartStore.addItem({
                            productId: p.id,
                            name: p.name,
                            tagline: p.tagline,
                            price: p.price,
                            quantity: 1,
                            maxQuantity: p.stock || 5,
                            isUnique: p.type === 'UNIQUE',
                            artSeed: p.artSeed,
                            artVariant: p.artVariant,
                            artPalette: p.artPalette,
                          });
                          setCartDrawerOpen(true);
                        }}
                        className="flex-1 py-2 px-3 rounded-xl border-2 border-ink bg-marigold text-ink font-bold text-xs sticker-shadow hover:bg-marigold/90 flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Nook</span>
                      </button>

                      <button
                        onClick={() => wishlistStore.removeItem(p.id)}
                        className="p-2 rounded-xl border-2 border-ink text-ink hover:text-coral hover:bg-rose/20 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-2xl text-ink">Delivery Addresses</h2>
              {!isEditingAddress && (
                <button
                  onClick={() => setIsEditingAddress(true)}
                  className="px-4 py-2 rounded-xl border-2 border-ink bg-marigold text-ink font-bold text-xs uppercase sticker-shadow"
                >
                  + Add New Address
                </button>
              )}
            </div>

            {isEditingAddress && (
              <form onSubmit={handleAddAddress} className="bg-paper-deep border-2 border-ink rounded-3xl p-6 space-y-4 sticker-shadow">
                <h3 className="font-display font-bold text-lg text-ink">New Shipping Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Recipient Name"
                    value={newAddr.name}
                    onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                    className="px-3 py-2 rounded-xl border-2 border-ink bg-paper text-xs font-body"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={newAddr.phone}
                    onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                    className="px-3 py-2 rounded-xl border-2 border-ink bg-paper text-xs font-body"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Street / Flat / House No."
                  value={newAddr.street}
                  onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border-2 border-ink bg-paper text-xs font-body"
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    className="px-3 py-2 rounded-xl border-2 border-ink bg-paper text-xs font-body"
                  />
                  <input
                    type="text"
                    required
                    placeholder="State"
                    value={newAddr.state}
                    onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                    className="px-3 py-2 rounded-xl border-2 border-ink bg-paper text-xs font-body"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Pincode"
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    className="px-3 py-2 rounded-xl border-2 border-ink bg-paper text-xs font-body"
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="px-5 py-2 rounded-xl bg-teal text-paper font-bold text-xs border-2 border-ink">
                    Save Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingAddress(false)}
                    className="px-4 py-2 rounded-xl bg-paper text-ink font-bold text-xs border-2 border-ink"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedAddresses.map((addr) => (
                <div key={addr.id} className="bg-paper border-2 border-ink rounded-2xl p-5 space-y-2 sticker-shadow">
                  <div className="flex justify-between items-start">
                    <span className="font-display font-bold text-base text-ink">{addr.name}</span>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 rounded-full border border-ink bg-mint text-ink text-[10px] font-label font-bold uppercase">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="font-body text-xs text-ink/80 leading-relaxed">
                    {addr.street}, {addr.area && `${addr.area}, `}
                    {addr.city}, {addr.state} — {addr.pincode}
                  </p>
                  <p className="font-label text-xs text-ink/60">Phone: {addr.phone}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COMMISSIONS */}
        {activeTab === 'commissions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-2xl text-ink">Custom Studio Commissions</h2>
              <Link
                href="/commissions/new"
                className="px-4 py-2 rounded-xl border-2 border-ink bg-orchid text-paper font-bold text-xs uppercase sticker-shadow"
              >
                + New Commission
              </Link>
            </div>

            <div className="bg-paper border-2 border-ink rounded-3xl p-6 sticker-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-label font-bold text-xs text-ink">COM-2026-0881</span>
                  <span className="px-2 py-0.5 rounded-full border border-ink bg-teal/20 text-ink text-[10px] font-label font-bold uppercase">
                    In Studio Pour
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-ink">Wedding Bouquet Preservation</h3>
                <p className="font-body text-xs text-ink/75">Target Date: Nov 15, 2026</p>
              </div>

              <Link
                href="/commissions/COM-2026-0881"
                className="px-5 py-2.5 rounded-xl border-2 border-ink bg-marigold text-ink font-bold text-xs sticker-shadow flex items-center gap-2"
              >
                <span>Open Studio Tracker</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 5: GIFT CARDS */}
        {activeTab === 'giftcards' && (
          <div className="space-y-6">
            <h2 className="font-display font-bold text-2xl text-ink">Gift Cards & Store Credits</h2>
            <div className="bg-paper-deep border-2 border-ink rounded-3xl p-8 sticker-shadow max-w-lg">
              <h3 className="font-display font-bold text-lg text-ink mb-1">Redeem a Gift Card</h3>
              <p className="text-xs font-body text-ink/70 mb-4">
                Have a card received from someone special? Add the 16-character code below to attach credit to your account.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="NOOK-XXXX-XXXX-XXXX"
                  className="flex-1 px-3 py-2 rounded-xl border-2 border-ink bg-paper text-xs uppercase font-label"
                />
                <button
                  type="button"
                  onClick={() => alert('Code added to your account credit balance!')}
                  className="px-4 py-2 rounded-xl border-2 border-ink bg-marigold text-ink font-bold text-xs uppercase"
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="font-display font-bold text-2xl text-ink">Account & Privacy Settings</h2>

            <div className="bg-paper border-2 border-ink rounded-3xl p-6 md:p-8 sticker-shadow space-y-6">
              <div>
                <h3 className="font-display font-bold text-base text-ink mb-2">Data Privacy & Export</h3>
                <p className="font-body text-xs text-ink/75 mb-4 leading-relaxed">
                  Under GDPR and Indian DPDP guidelines, you can export a complete machine-readable copy of your profile, orders, addresses, and custom order history.
                </p>
                <button
                  onClick={handleExportData}
                  className="px-4 py-2 rounded-xl border-2 border-ink bg-paper text-ink font-bold text-xs flex items-center gap-2 hover:bg-paper-deep"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export My Data (JSON)</span>
                </button>
              </div>

              <div className="pt-6 border-t border-ink/10">
                <h3 className="font-display font-bold text-base text-coral mb-2">Danger Zone</h3>
                <p className="font-body text-xs text-ink/75 mb-4 leading-relaxed">
                  Permanently delete your account and all associated order personalizations. This action cannot be reversed.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete your ArtNook account?')) {
                      alert('Account deletion request submitted. We will process your request within 48 hours.');
                    }
                  }}
                  className="px-4 py-2 rounded-xl border-2 border-coral bg-rose/20 text-coral font-bold text-xs hover:bg-coral hover:text-paper transition-colors"
                >
                  Delete My Account
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <React.Suspense
      fallback={
        <div className="container mx-auto px-4 py-20 text-center font-display text-xl text-ink">
          Loading your nook account...
        </div>
      }
    >
      <AccountContent />
    </React.Suspense>
  );
}

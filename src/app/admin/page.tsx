'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { products, Product } from '@/data/products';
import { sampleCommissions } from '@/data/commissions';
import { formatPrice } from '@/lib/utils';
import { ResinArt } from '@/components/art/ResinArt';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Sparkles,
  Settings,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Sliders,
  Check,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'commissions' | 'settings'>('dashboard');
  const [productList, setProductList] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Orders State
  const [orders, setOrders] = useState([
    {
      id: 'AN-2026-10492',
      customer: 'Priya Nair',
      email: 'priya.nair@example.com',
      total: 179700,
      status: 'SHIPPED',
      tracking: 'BD-8849201948',
      date: '2026-09-29',
      items: 'Ocean Wave Coasters, Gold-Fleck Bookmark',
    },
    {
      id: 'AN-2026-10491',
      customer: 'Rohan Verma',
      email: 'rohan.v@example.com',
      total: 149900,
      status: 'IN_STUDIO',
      tracking: '',
      date: '2026-09-30',
      items: 'Midnight Geode Coasters',
    },
    {
      id: 'AN-2026-10490',
      customer: 'Sanya Malhotra',
      email: 'sanya@example.com',
      total: 249900,
      status: 'QUALITY_CHECK',
      tracking: '',
      date: '2026-10-01',
      items: 'Sunset Swirl Round Tray',
    },
    {
      id: 'AN-2026-10489',
      customer: 'Dev Shah',
      email: 'dev@example.com',
      total: 24900,
      status: 'PAID',
      tracking: '',
      date: '2026-10-02',
      items: 'Cosmic Dust Keychain',
    },
  ]);

  // Settings State
  const [settingsNotice, setSettingsNotice] = useState(false);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('1999');
  const [announcementText, setAnnouncementText] = useState('Free standard shipping on orders above ₹1,999 ✨');

  const lowStockProducts = productList.filter(
    (p) => p.type !== 'MADE_TO_ORDER' && p.stock <= p.lowStockThreshold
  );

  const handleStockChange = (id: string, delta: number) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p))
    );
  };

  const handleOrderStatusChange = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsNotice(true);
    setTimeout(() => setSettingsNotice(false), 2500);
  };

  return (
    <div className="bg-paper min-h-screen">
      {/* Top Admin Bar */}
      <div className="bg-ink text-paper px-6 py-3 border-b-2 border-ink flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-lg tracking-wide text-marigold">
            The ArtNook Studio Admin
          </span>
          <span className="text-[10px] font-label uppercase px-2 py-0.5 rounded-full bg-paper/20 text-paper">
            Staff Portal
          </span>
        </div>
        <Link
          href="/"
          className="text-xs font-label text-paper/70 hover:text-marigold flex items-center gap-1"
        >
          <span>View Live Storefront</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-ink/15">
          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            { id: 'products', label: `Catalogue (${productList.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'commissions', label: 'Commissions Kanban', icon: Sparkles },
            { id: 'settings', label: 'Shop Settings', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-4 rounded-xl border-2 font-body font-bold text-xs sm:text-sm shrink-0 flex items-center gap-2 transition-all ${
                  isActive
                    ? 'border-ink bg-marigold text-ink shadow-xs'
                    : 'border-transparent text-ink/70 hover:bg-paper-deep'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            
            {/* Metric cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-paper border-2 border-ink rounded-2xl p-5 sticker-shadow">
                <span className="text-xs font-label uppercase text-ink/60 block mb-1">
                  Today's Revenue
                </span>
                <span className="font-display font-bold text-2xl md:text-3xl text-ink">
                  ₹24,890
                </span>
                <span className="text-[11px] font-label text-teal flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18% from yesterday</span>
                </span>
              </div>

              <div className="bg-paper border-2 border-ink rounded-2xl p-5 sticker-shadow">
                <span className="text-xs font-label uppercase text-ink/60 block mb-1">
                  Active Orders
                </span>
                <span className="font-display font-bold text-2xl md:text-3xl text-ink">
                  {orders.length}
                </span>
                <span className="text-[11px] font-label text-ink/60 mt-2 block">
                  3 in studio curing
                </span>
              </div>

              <div className="bg-paper border-2 border-ink rounded-2xl p-5 sticker-shadow">
                <span className="text-xs font-label uppercase text-ink/60 block mb-1">
                  Average Order Value
                </span>
                <span className="font-display font-bold text-2xl md:text-3xl text-ink">
                  ₹1,640
                </span>
                <span className="text-[11px] font-label text-teal mt-2 block">
                  Healthy basket size
                </span>
              </div>

              <div className="bg-paper border-2 border-ink rounded-2xl p-5 sticker-shadow">
                <span className="text-xs font-label uppercase text-ink/60 block mb-1">
                  Open Commissions
                </span>
                <span className="font-display font-bold text-2xl md:text-3xl text-orchid">
                  {sampleCommissions.length}
                </span>
                <span className="text-[11px] font-label text-orchid mt-2 block">
                  1 awaiting milestone check
                </span>
              </div>
            </div>

            {/* Low stock alerts & Studio attention */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Low stock items */}
              <div className="bg-paper-deep border-2 border-ink rounded-3xl p-6 sticker-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-coral" />
                    <h3 className="font-display font-bold text-lg text-ink">
                      Low Stock / Sold Out Items
                    </h3>
                  </div>
                  <span className="text-xs font-label font-bold text-ink">
                    {lowStockProducts.length} pieces
                  </span>
                </div>

                <div className="divide-y divide-ink/10">
                  {lowStockProducts.map((p) => (
                    <div key={p.id} className="py-3 flex items-center justify-between">
                      <div>
                        <h4 className="font-display font-bold text-sm text-ink">{p.name}</h4>
                        <span className="text-xs font-label text-ink/60">
                          {p.stock === 0 ? 'Out of stock' : `Only ${p.stock} units remaining`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStockChange(p.id, 5)}
                          className="px-3 py-1 rounded-lg border-2 border-ink bg-paper text-ink font-bold text-xs hover:bg-paper-deep"
                        >
                          +5 Restock
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Orders needing dispatch */}
              <div className="bg-paper border-2 border-ink rounded-3xl p-6 sticker-shadow">
                <h3 className="font-display font-bold text-lg text-ink mb-4">
                  Orders Needing Packing & Shipping
                </h3>

                <div className="divide-y divide-ink/10">
                  {orders.map((o) => (
                    <div key={o.id} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="font-display font-bold text-sm text-ink block">{o.id}</span>
                        <span className="text-xs font-body text-ink/70 truncate block max-w-xs">
                          {o.customer} • {o.items}
                        </span>
                      </div>
                      <span className="text-[11px] font-label font-bold uppercase px-2 py-0.5 rounded-full border border-ink bg-mint text-ink">
                        {o.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. PRODUCTS CATALOGUE */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="font-display font-bold text-2xl text-ink">Product Catalogue</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-ink/40 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search pieces or SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border-2 border-ink bg-paper text-xs font-body"
                  />
                </div>
              </div>
            </div>

            <div className="bg-paper border-2 border-ink rounded-3xl overflow-hidden sticker-shadow">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-body">
                  <thead className="bg-paper-deep border-b-2 border-ink font-label uppercase text-ink">
                    <tr>
                      <th className="p-4">Piece</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    {productList
                      .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((p) => (
                        <tr key={p.id} className="hover:bg-paper-deep/30 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg border border-ink/30 overflow-hidden shrink-0">
                              <ResinArt seed={p.artSeed} palette={p.artPalette} variant={p.artVariant} size={40} />
                            </div>
                            <div>
                              <span className="font-display font-bold text-ink text-sm block">{p.name}</span>
                              <span className="font-label text-[10px] text-ink/50">{p.sku}</span>
                            </div>
                          </td>
                          <td className="p-4 font-bold text-ink/80">{p.category}</td>
                          <td className="p-4">
                            <span className="text-[10px] font-label font-bold uppercase px-2 py-0.5 rounded-full border border-ink/40 bg-paper">
                              {p.type.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="p-4 font-display font-bold text-sm text-ink">{formatPrice(p.price)}</td>
                          <td className="p-4">
                            {p.type === 'MADE_TO_ORDER' ? (
                              <span className="text-orchid font-bold">Made to order</span>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className={`font-bold ${p.stock <= p.lowStockThreshold ? 'text-coral' : 'text-ink'}`}>
                                  {p.stock}
                                </span>
                                <button
                                  onClick={() => handleStockChange(p.id, 1)}
                                  className="w-5 h-5 rounded-md border border-ink bg-paper hover:bg-paper-deep flex items-center justify-center font-bold"
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <Link
                              href={`/product/${p.slug}`}
                              target="_blank"
                              className="font-bold text-teal hover:underline text-xs"
                            >
                              Live Page ↗
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="font-display font-bold text-2xl text-ink">Order Operations</h2>

            <div className="bg-paper border-2 border-ink rounded-3xl overflow-hidden sticker-shadow">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-body">
                  <thead className="bg-paper-deep border-b-2 border-ink font-label uppercase text-ink">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Update State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-paper-deep/30 transition-colors">
                        <td className="p-4 font-display font-bold text-sm text-ink">{o.id}</td>
                        <td className="p-4">
                          <span className="font-bold block">{o.customer}</span>
                          <span className="text-ink/60">{o.email}</span>
                        </td>
                        <td className="p-4 max-w-xs truncate text-ink/80">{o.items}</td>
                        <td className="p-4 font-display font-bold text-ink">{formatPrice(o.total)}</td>
                        <td className="p-4">
                          <span className="text-[10px] font-label font-bold uppercase px-2 py-0.5 rounded-full border border-ink bg-marigold text-ink">
                            {o.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={o.status}
                            onChange={(e) => handleOrderStatusChange(o.id, e.target.value)}
                            className="px-2 py-1 rounded-lg border border-ink bg-paper text-xs font-label"
                          >
                            <option value="PAID">Paid</option>
                            <option value="IN_STUDIO">In Studio (Curing)</option>
                            <option value="QUALITY_CHECK">Quality Check</option>
                            <option value="PACKED">Packed</option>
                            <option value="SHIPPED">Shipped</option>
                            <option value="DELIVERED">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. COMMISSIONS KANBAN */}
        {activeTab === 'commissions' && (
          <div className="space-y-6">
            <h2 className="font-display font-bold text-2xl text-ink">Commissions Kanban</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Col 1: Submitted & In Review */}
              <div className="bg-paper-deep/60 border-2 border-ink rounded-3xl p-5 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-ink/20">
                  <h3 className="font-display font-bold text-sm text-ink">In Review (0)</h3>
                </div>
                <div className="text-xs text-ink/50 text-center py-6">All requests reviewed!</div>
              </div>

              {/* Col 2: In Studio Casting */}
              <div className="bg-paper-deep/60 border-2 border-ink rounded-3xl p-5 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-ink/20">
                  <h3 className="font-display font-bold text-sm text-ink">In Studio Pouring (1)</h3>
                </div>

                <div className="bg-paper border-2 border-ink rounded-2xl p-4 sticker-shadow space-y-2">
                  <div className="flex justify-between text-xs font-label">
                    <span className="font-bold text-ink">COM-2026-0881</span>
                    <span className="text-teal font-bold">50% Deposit Paid</span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-ink">Wedding Bouquet Arch</h4>
                  <p className="font-body text-xs text-ink/70">Customer: Ananya Sharma</p>
                  <Link
                    href="/commissions/COM-2026-0881"
                    className="block text-center py-1.5 px-3 rounded-xl border border-ink bg-marigold text-ink font-bold text-xs hover:bg-marigold/90 mt-2"
                  >
                    Open Studio Tracker
                  </Link>
                </div>
              </div>

              {/* Col 3: Balance Paid & Completed */}
              <div className="bg-paper-deep/60 border-2 border-ink rounded-3xl p-5 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-ink/20">
                  <h3 className="font-display font-bold text-sm text-ink">Ready for Dispatch (0)</h3>
                </div>
                <div className="text-xs text-ink/50 text-center py-6">No pieces waiting for dispatch</div>
              </div>
            </div>
          </div>
        )}

        {/* 5. SHOP SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-xl">
            <h2 className="font-display font-bold text-2xl text-ink">Studio Settings</h2>

            {settingsNotice && (
              <div className="p-3 bg-mint border border-ink rounded-xl text-xs font-bold text-ink flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Settings updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="bg-paper border-2 border-ink rounded-3xl p-6 md:p-8 sticker-shadow space-y-5">
              <div>
                <label className="block text-xs font-label uppercase font-bold text-ink mb-1">
                  Active Announcement Bar Banner
                </label>
                <input
                  type="text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-ink/30 bg-paper text-xs font-body focus:outline-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-label uppercase font-bold text-ink mb-1">
                  Free Shipping Spend Threshold (₹)
                </label>
                <input
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-ink/30 bg-paper text-xs font-body focus:outline-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-label uppercase font-bold text-ink mb-1">
                  Payment Methods Enabled
                </label>
                <div className="space-y-2 text-xs font-body">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-teal" />
                    <span>Razorpay (UPI, Credit/Debit Cards, NetBanking)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-teal" />
                    <span>Stripe (International Cards)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-teal" />
                    <span>Cash on Delivery (orders below ₹5,000)</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl border-2 border-ink bg-marigold text-ink font-bold text-xs uppercase sticker-shadow"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

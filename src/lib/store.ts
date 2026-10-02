'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartLineItem {
  id: string; // productId + variantId + hash(personalisation)
  productId: string;
  variantId?: string;
  name: string;
  tagline: string;
  price: number; // paise
  compareAtPrice?: number;
  quantity: number;
  maxQuantity: number;
  isUnique: boolean;
  artSeed: number;
  artVariant: string;
  artPalette: string[];
  personalisation?: Record<string, string>;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

interface CartStore {
  items: CartLineItem[];
  giftWrap: boolean;
  giftWrapFee: number; // paise
  giftMessage: string;
  makerNote: string;
  discountCode: string;
  discountAmount: number;

  addItem: (item: Omit<CartLineItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleGiftWrap: () => void;
  setGiftMessage: (msg: string) => void;
  setMakerNote: (note: string) => void;
  setDiscountCode: (code: string) => void;
  setDiscountAmount: (amount: number) => void;

  getSubtotal: () => number;
  getItemCount: () => number;
}

function generateLineId(productId: string, variantId?: string, personalisation?: Record<string, string>): string {
  const base = `${productId}:${variantId || 'default'}`;
  if (!personalisation || Object.keys(personalisation).length === 0) return base;
  const hash = JSON.stringify(personalisation);
  return `${base}:${hash}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      giftWrap: false,
      giftWrapFee: 9900, // ₹99
      giftMessage: '',
      makerNote: '',
      discountCode: '',
      discountAmount: 0,

      addItem: (item) => {
        const id = generateLineId(item.productId, item.variantId, item.personalisation);
        set((state) => {
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            if (existing.isUnique) return state; // Can't add more of a unique piece
            const newQty = Math.min(existing.quantity + item.quantity, existing.maxQuantity);
            return {
              items: state.items.map((i) => i.id === id ? { ...i, quantity: newQty } : i),
            };
          }
          return { items: [...state.items, { ...item, id }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, Math.min(quantity, i.maxQuantity)) } : i
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], giftWrap: false, giftMessage: '', makerNote: '', discountCode: '', discountAmount: 0 });
      },

      toggleGiftWrap: () => set((state) => ({ giftWrap: !state.giftWrap })),
      setGiftMessage: (msg) => set({ giftMessage: msg.slice(0, 200) }),
      setMakerNote: (note) => set({ makerNote: note }),
      setDiscountCode: (code) => set({ discountCode: code.toUpperCase() }),
      setDiscountAmount: (amount) => set({ discountAmount: amount }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'artnook-cart',
    }
  )
);

// Wishlist store
interface WishlistStore {
  items: WishlistItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  getCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId) => {
        set((state) => {
          if (state.items.some((i) => i.productId === productId)) return state;
          return { items: [...state.items, { productId, addedAt: new Date().toISOString() }] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) }));
      },

      isWishlisted: (productId) => {
        return get().items.some((i) => i.productId === productId);
      },

      getCount: () => get().items.length,
    }),
    {
      name: 'artnook-wishlist',
    }
  )
);

// Recently viewed store
interface RecentlyViewedStore {
  productIds: string[];
  addProduct: (productId: string) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      productIds: [],
      addProduct: (productId) => {
        set((state) => {
          const filtered = state.productIds.filter((id) => id !== productId);
          return { productIds: [productId, ...filtered].slice(0, 12) };
        });
      },
    }),
    {
      name: 'artnook-recently-viewed',
    }
  )
);

// UI store (non-persisted)
interface UIStore {
  cartDrawerOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  cartDrawerOpen: false,
  searchOpen: false,
  mobileMenuOpen: false,
  setCartDrawerOpen: (open) => set({ cartDrawerOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));

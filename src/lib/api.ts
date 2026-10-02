/**
 * Data access layer — all UI code reads through these functions.
 * Currently backed by in-memory seed data + localStorage.
 * Swap to real API calls without changing any UI components.
 */

import { products, reviews, collections, faqItems, journalPosts, discounts } from '@/data/products';
import type { Product, Review, Collection, FaqItem, JournalPost, Discount } from '@/data/products';

// ─── Products ────────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  return products.filter((p) => p.status === 'ACTIVE');
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((p) => p.slug === slug && p.status === 'ACTIVE') ?? null;
}

export async function getProductById(id: string): Promise<Product | null> {
  return products.find((p) => p.id === id) ?? null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return products.filter((p) => p.featured && p.status === 'ACTIVE');
}

export async function getBestsellerProducts(): Promise<Product[]> {
  return products.filter((p) => p.bestseller && p.status === 'ACTIVE');
}

export async function getNewArrivals(limit: number = 8): Promise<Product[]> {
  return [...products]
    .filter((p) => p.status === 'ACTIVE')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return products.filter((p) => p.category === category && p.status === 'ACTIVE');
}

export async function getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];
  return products
    .filter(
      (p) =>
        p.id !== productId &&
        p.status === 'ACTIVE' &&
        (p.category === product.category || p.tags.some((t) => product.tags.includes(t)))
    )
    .slice(0, limit);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.status === 'ACTIVE' &&
      (p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.colours.some((c) => c.toLowerCase().includes(q)) ||
        p.materials.some((m) => m.toLowerCase().includes(q)))
  );
}

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'bestselling' | 'top-rated';

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  colours?: string[];
  occasions?: string[];
  tags?: string[];
  availability?: ('in-stock' | 'one-of-a-kind' | 'made-to-order')[];
  onSale?: boolean;
}

export async function getFilteredProducts(
  filters: FilterOptions,
  sort: SortOption = 'featured',
  page: number = 1,
  perPage: number = 12
): Promise<{ products: Product[]; total: number; pages: number }> {
  let result = products.filter((p) => p.status === 'ACTIVE');

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters.colours?.length) {
    result = result.filter((p) => p.colours.some((c) => filters.colours!.includes(c)));
  }
  if (filters.occasions?.length) {
    result = result.filter((p) => p.occasions.some((o) => filters.occasions!.includes(o)));
  }
  if (filters.tags?.length) {
    result = result.filter((p) => p.tags.some((t) => filters.tags!.includes(t)));
  }
  if (filters.availability?.length) {
    result = result.filter((p) => {
      if (filters.availability!.includes('in-stock') && p.stock > 0 && p.type !== 'MADE_TO_ORDER') return true;
      if (filters.availability!.includes('one-of-a-kind') && p.type === 'UNIQUE') return true;
      if (filters.availability!.includes('made-to-order') && p.type === 'MADE_TO_ORDER') return true;
      return false;
    });
  }
  if (filters.onSale) {
    result = result.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
  }

  // Sort
  switch (sort) {
    case 'newest':
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'bestselling':
      result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
      break;
    case 'top-rated': {
      const avgRating = (pid: string) => {
        const r = reviews.filter((rv) => rv.productId === pid);
        return r.length ? r.reduce((s, rv) => s + rv.rating, 0) / r.length : 0;
      };
      result.sort((a, b) => avgRating(b.id) - avgRating(a.id));
      break;
    }
    default: // featured
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  const total = result.length;
  const pages = Math.ceil(total / perPage);
  const paginated = result.slice((page - 1) * perPage, page * perPage);

  return { products: paginated, total, pages };
}

// ─── Collections ─────────────────────────────────────────────

export async function getAllCollections(): Promise<Collection[]> {
  return collections;
}

export async function getCollectionBySlug(slug: string): Promise<(Collection & { products: Product[] }) | null> {
  const col = collections.find((c) => c.slug === slug);
  if (!col) return null;
  const colProducts = products.filter((p) => col.productIds.includes(p.id) && p.status === 'ACTIVE');
  return { ...col, products: colProducts };
}

// ─── Reviews ─────────────────────────────────────────────────

export async function getProductReviews(productId: string): Promise<Review[]> {
  return reviews.filter((r) => r.productId === productId && r.approved);
}

export async function getAverageRating(productId: string): Promise<{ average: number; count: number }> {
  const productReviews = reviews.filter((r) => r.productId === productId && r.approved);
  if (productReviews.length === 0) return { average: 0, count: 0 };
  const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
  return { average: Math.round((sum / productReviews.length) * 10) / 10, count: productReviews.length };
}

// ─── Journal ─────────────────────────────────────────────────

export async function getAllJournalPosts(): Promise<JournalPost[]> {
  return journalPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
  return journalPosts.find((p) => p.slug === slug) ?? null;
}

// ─── FAQ ─────────────────────────────────────────────────────

export async function getAllFaqItems(): Promise<FaqItem[]> {
  return faqItems;
}

// ─── Discounts ───────────────────────────────────────────────

export async function validateDiscount(
  code: string,
  orderTotal: number,
  isFirstOrder: boolean = true
): Promise<{ valid: boolean; discount?: Discount; message: string }> {
  const discount = discounts.find((d) => d.code === code.toUpperCase() && d.active);
  if (!discount) return { valid: false, message: 'This code doesn\'t look right. Double-check and try again?' };

  const now = new Date();
  if (new Date(discount.startsAt) > now) return { valid: false, message: 'This code isn\'t active yet. Check back soon!' };
  if (discount.endsAt && new Date(discount.endsAt) < now) return { valid: false, message: 'This code has expired. Sorry about that!' };
  if (discount.firstOrderOnly && !isFirstOrder) return { valid: false, message: 'This code is for first orders only.' };
  if (discount.minOrderValue && orderTotal < discount.minOrderValue) {
    const min = (discount.minOrderValue / 100).toLocaleString('en-IN');
    return { valid: false, message: `Spend at least ₹${min} to use this code.` };
  }

  return { valid: true, discount, message: 'Code applied!' };
}

// ─── Categories & Colours ────────────────────────────────────

export function getAllCategories(): string[] {
  return [...new Set(products.map((p) => p.category))];
}

export function getAllColours(): string[] {
  return [...new Set(products.flatMap((p) => p.colours))].sort();
}

export function getAllOccasions(): string[] {
  return [...new Set(products.flatMap((p) => p.occasions))].sort();
}

export function getAllTags(): string[] {
  return [...new Set(products.flatMap((p) => p.tags))].sort();
}

export function getPriceRange(): { min: number; max: number } {
  const prices = products.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

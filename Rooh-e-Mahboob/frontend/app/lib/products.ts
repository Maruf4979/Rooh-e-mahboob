import { products as staticProducts } from "../data/products";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number | null;
  category: string;
  description: string;
  story: string;
  gradient: string;
  accent: string;
  badge: string | null;
  image: string | null;
  tags: string[];
  wholesalePrices: { minQty: number; price: number }[] | null;
  profile: { [key: string]: string } | null;
  occasions: string[];
}

export async function getAllProducts(): Promise<Product[]> {
  return staticProducts.map((p) => ({
    ...p,
    originalPrice: p.originalPrice ?? null,
    wholesalePrices: p.wholesalePrices ?? null,
    profile: p.profile ?? null,
    badge: p.badge ?? null,
    image: p.image ?? null,
  }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const fallback = staticProducts.find((p) => p.slug === slug);
  if (!fallback) return null;
  return {
    ...fallback,
    originalPrice: fallback.originalPrice ?? null,
    wholesalePrices: fallback.wholesalePrices ?? null,
    profile: fallback.profile ?? null,
    badge: fallback.badge ?? null,
    image: fallback.image ?? null,
  };
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
  return staticProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
    .map((p) => ({
      ...p,
      originalPrice: p.originalPrice ?? null,
      wholesalePrices: p.wholesalePrices ?? null,
      profile: p.profile ?? null,
      badge: p.badge ?? null,
      image: p.image ?? null,
    }));
}

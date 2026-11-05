import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/constants";
import { ProductView } from "@/components/products/ProductView";

const product = PRODUCTS.find((p) => p.slug === "privacy-peek")!;

export const metadata: Metadata = {
  title: `${product.name} — ${product.tagline}`,
  description: product.description,
  alternates: { canonical: `/products/${product.slug}` },
};

export default function PrivacyPeekPage() {
  return <ProductView product={product} />;
}

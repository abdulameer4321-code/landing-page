import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/constants";
import { ProductView } from "@/components/products/ProductView";
import { ConsentDeskDemo } from "@/components/products/demos/ConsentDeskDemo";

const product = PRODUCTS.find((p) => p.slug === "consent-desk")!;

export const metadata: Metadata = {
  title: `${product.name} — ${product.tagline}`,
  description: product.description,
  alternates: { canonical: `/products/${product.slug}` },
};

export default function ConsentDeskPage() {
  return (
    <ProductView
      product={product}
      interactiveDemo={<ConsentDeskDemo />}
    />
  );
}

import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/constants";
import { ProductView } from "@/components/products/ProductView";
import { RopaGeneratorDemo } from "@/components/products/demos/RopaGeneratorDemo";

const product = PRODUCTS.find((p) => p.slug === "ropa-generator")!;

export const metadata: Metadata = {
  title: `${product.name} — ${product.tagline}`,
  description: product.description,
  alternates: { canonical: `/products/${product.slug}` },
};

export default function RopaGeneratorPage() {
  return (
    <ProductView
      product={product}
      interactiveDemo={<RopaGeneratorDemo />}
    />
  );
}

import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/constants";
import { ProductView } from "@/components/products/ProductView";
import { GapAssessmentDemo } from "@/components/products/demos/GapAssessmentDemo";

const product = PRODUCTS.find((p) => p.slug === "gap-assessment")!;

export const metadata: Metadata = {
  title: `${product.name} — ${product.tagline}`,
  description: product.description,
  alternates: { canonical: `/products/${product.slug}` },
};

export default function GapAssessmentPage() {
  return (
    <ProductView
      product={product}
      interactiveDemo={<GapAssessmentDemo />}
    />
  );
}

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/products",
    "/products/privacy-peek",
    "/products/gap-assessment",
    "/products/ropa-generator",
    "/products/consent-desk",
    "/agent-x",
    "/about",
    "/work",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/products") ? 0.9 : 0.7,
  }));
}

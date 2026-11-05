import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DPDP MatriX",
    short_name: "DPDP MatriX",
    description: "Privacy law, turned into working systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f2",
    theme_color: "#f7f7f2",
    icons: [
      { src: "/favicon/android-chrome-192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon/android-chrome-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

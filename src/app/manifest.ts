import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PixMorphy",
    short_name: "PixMorphy",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f4ef",
    theme_color: "#176b58",
    icons: [
      {
        src: "/icon?size=192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon?size=512",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

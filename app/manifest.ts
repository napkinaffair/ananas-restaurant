import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ananas Restaurant",
    short_name: "Ananas",
    description: "Authentic dining experience.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3A461A",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

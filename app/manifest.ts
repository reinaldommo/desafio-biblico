import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Desafio Bíblico — IEPP",
    short_name: "Desafio Bíblico",
    description:
      "Gincana Bíblica interativa da Igreja Evangélica Pentecostal de Pinheiros.",
    start_url: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#0E0420",
    theme_color: "#0E0420",
    lang: "pt-BR",
    dir: "ltr",
    categories: ["games", "education", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

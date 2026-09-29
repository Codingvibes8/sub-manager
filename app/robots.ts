import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api", "/settings", "/team"],
    },
    sitemap: "https://submanager.app/sitemap.xml",
  };
}

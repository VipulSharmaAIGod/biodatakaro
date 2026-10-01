import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND} – Marriage Biodata Maker`,
    short_name: BRAND,
    description: "Free AI marriage biodata maker in 10 Indian languages.",
    start_url: "/create",
    display: "standalone",
    background_color: "#fffaf2",
    theme_color: "#7a1f2b",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

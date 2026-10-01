import type { Metadata, Viewport } from "next";
import { siteFontVars } from "@/lib/fonts";
import { BRAND, SITE_URL } from "@/lib/site";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Free Marriage Biodata Maker with AI | ${BRAND}`,
    template: `%s | ${BRAND}`,
  },
  description:
    "Create a beautiful marriage biodata in 5 minutes. Free biodata maker with AI-written ‘About Me’ in English, Hindi, Marathi, Gujarati & more. Download PDF or share as image on WhatsApp. No login.",
  applicationName: BRAND,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: BRAND,
    locale: "en_IN",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7a1f2b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={siteFontVars}>
      <body className="flex min-h-dvh flex-col antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

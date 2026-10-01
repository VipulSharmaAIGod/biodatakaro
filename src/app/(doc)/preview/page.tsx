import type { Metadata } from "next";
import { Suspense } from "react";
import { PreviewClient } from "./PreviewClient";

export const metadata: Metadata = { title: "Template preview", robots: { index: false, follow: false } };

/** Renders a template with sample data at full A4 size (used for gallery thumbnails & QA). */
export default function PreviewPage() {
  return (
    <Suspense>
      <PreviewClient />
    </Suspense>
  );
}

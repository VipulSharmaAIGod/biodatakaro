import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { BRAND, OWNER } from "@/lib/site";

export const metadata: Metadata = { title: "Shipping & Delivery Policy", description: `${BRAND} delivers digital products instantly. No physical shipping.`, alternates: { canonical: "/shipping-policy" } };

export default function Shipping() {
  return (
    <LegalPage title="Shipping & Delivery Policy">
      <p>{BRAND} sells digital products only. Nothing is shipped physically.</p>
      <ul>
        <li>Delivery is instant: as soon as your payment is confirmed, the watermark is removed and/or premium designs are unlocked on the same page.</li>
        <li>You download your biodata as a PDF and/or JPG directly in your browser.</li>
        <li>If delivery does not happen within 10 minutes of a successful payment, use “Restore purchase” on the download step, or email {OWNER.email} with your payment ID.</li>
      </ul>
    </LegalPage>
  );
}

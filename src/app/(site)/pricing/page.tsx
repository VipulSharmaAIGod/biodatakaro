import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/site/LegalPage";
import { PRICES, UNLOCK_VALIDITY_DAYS, UPGRADE_PAISE, rupees } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing – Free Biodata, ₹49 No Watermark, ₹99 Premium",
  description: "BiodataKaro pricing: create and download free; ₹49 one-time to remove watermark; ₹99 one-time for all premium designs. No subscription.",
  alternates: { canonical: "/pricing" },
};

export default function Pricing() {
  return (
    <LegalPage title="Pricing">
      <p>All prices are in Indian Rupees (INR) and are the final amount you pay. Payments are one-time — there is no subscription and no auto-renewal.</p>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price</th>
            <th>What you get</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Free</td>
            <td>₹0</td>
            <td>Create, edit and preview; AI-written text; 3 free designs; PDF and JPG download with a small watermark.</td>
          </tr>
          <tr>
            <td>{PRICES.basic.label}</td>
            <td>{rupees(PRICES.basic.amountPaise)}</td>
            <td>{PRICES.basic.features.join("; ")}.</td>
          </tr>
          <tr>
            <td>{PRICES.premium.label}</td>
            <td>{rupees(PRICES.premium.amountPaise)}</td>
            <td>{PRICES.premium.features.join("; ")}.</td>
          </tr>
          <tr>
            <td>Upgrade Basic → Premium</td>
            <td>{rupees(UPGRADE_PAISE)}</td>
            <td>Pay only the difference if you already bought Basic for the same biodata.</td>
          </tr>
        </tbody>
      </table>
      <h2>What exactly am I buying?</h2>
      <p>
        A digital unlock for one biodata (one person) created on this website. After payment the watermark is removed (and premium designs are unlocked for Premium) instantly in
        your browser. You can edit and re-download that biodata as many times as you like for {UNLOCK_VALIDITY_DAYS} days.
      </p>
      <h2>Payment methods</h2>
      <p>UPI (Google Pay, PhonePe, Paytm, BHIM), debit/credit cards, netbanking and wallets, processed securely by Razorpay. We never see or store your card or UPI details.</p>
      <h2>Delivery</h2>
      <p>
        Instant and digital — see our <Link href="/shipping-policy">Delivery Policy</Link>. Refunds are covered in our <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link>.
      </p>
    </LegalPage>
  );
}

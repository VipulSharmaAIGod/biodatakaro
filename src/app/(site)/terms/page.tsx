import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/site/LegalPage";
import { BRAND, OWNER, SITE_URL } from "@/lib/site";

export const metadata: Metadata = { title: "Terms and Conditions", description: `Terms of use for ${BRAND}.`, alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <LegalPage title="Terms and Conditions">
      <p>
        These Terms govern your use of {BRAND} at {SITE_URL} (the “Service”), operated by {OWNER.legalName}, an individual based in {OWNER.city}, India (“we”, “us”). By using
        the Service you agree to these Terms.
      </p>
      <h2>1. The Service</h2>
      <p>
        {BRAND} is an online tool to create marriage biodata documents. You can use it free of charge. Optional paid unlocks remove the watermark and/or unlock premium designs for a
        specific biodata, as described on our <Link href="/pricing">Pricing</Link> page.
      </p>
      <h2>2. Your content</h2>
      <ul>
        <li>You are responsible for the accuracy of the information and photo you add, and you must have the right to use them (for example, consent of the person whose biodata it is).</li>
        <li>Do not use the Service to create false, misleading, defamatory or unlawful content, or to impersonate anyone.</li>
        <li>You keep ownership of your content. Because it is stored in your browser, we cannot recover it if you clear your browser data or change device.</li>
      </ul>
      <h2>3. AI-generated text</h2>
      <p>AI-written text is a draft suggestion. It may contain mistakes. Please read and edit it before sharing. You are responsible for the final content of your biodata.</p>
      <h2>4. Payments</h2>
      <ul>
        <li>Prices are shown in INR before payment. Payments are processed by Razorpay; their terms also apply.</li>
        <li>A purchase applies to one biodata (one person) and is valid for 365 days from purchase for edits and re-downloads.</li>
        <li>The unlock is stored in your browser. If you lose it, you can restore it with your payment ID on the download page.</li>
        <li>Refunds are governed by our <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link>.</li>
      </ul>
      <h2>5. Acceptable use</h2>
      <p>Do not attempt to bypass payment, overload or attack the Service, scrape it, or misuse the AI feature. We may rate-limit or block abusive use.</p>
      <h2>6. Intellectual property</h2>
      <p>The website, designs, templates and code belong to us. Documents you download are for your personal, non-commercial use (sharing your biodata with families is of course allowed).</p>
      <h2>7. Disclaimer and limitation of liability</h2>
      <p>
        The Service is provided “as is”. We are not a matrimonial service and do not verify any person or information. To the maximum extent permitted by law, our total liability for
        any claim is limited to the amount you paid us for the relevant purchase.
      </p>
      <h2>8. Governing law</h2>
      <p>These Terms are governed by the laws of India. Courts at {OWNER.city} shall have exclusive jurisdiction.</p>
      <h2>9. Contact</h2>
      <p>
        {OWNER.legalName} · {OWNER.email} · {OWNER.phone} · {OWNER.address}
      </p>
    </LegalPage>
  );
}

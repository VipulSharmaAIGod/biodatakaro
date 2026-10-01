import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { BRAND, OWNER, SITE_URL } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", description: `How ${BRAND} handles your data.`, alternates: { canonical: "/privacy-policy" } };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This Privacy Policy explains how {BRAND} ({SITE_URL}), operated by {OWNER.legalName} (“we”, “us”), handles information when you use our marriage biodata maker. We built the
        product so that we collect as little personal data as possible.
      </p>
      <h2>1. Your biodata stays on your device</h2>
      <p>
        The details you type and the photo you upload are stored only in your own browser (localStorage) so that you do not lose your progress. They are not uploaded to or
        stored on our servers. Your photo is cropped and processed entirely on your device. PDF and image files are generated in your browser. Clearing your browser data deletes
        your biodata.
      </p>
      <h2>2. AI writing</h2>
      <p>
        When you tap “Write with AI”, we send only the text fields needed to write the paragraphs (such as name, education, occupation, family details and the optional notes you
        type) to our server, which may forward them to an AI provider (Google Gemini and/or OpenAI) to generate the text. We do not send your photo, phone number, email or address.
        We do not store these requests. The AI provider processes them under its own API terms.
      </p>
      <h2>3. Payments</h2>
      <p>
        Payments are processed by Razorpay Software Private Limited. Razorpay collects the payment information needed to complete the transaction (for example your phone number,
        email and payment method) under its own privacy policy. We receive the payment ID, order ID, amount and status, which we use to verify payment and unlock your download. We
        do not receive or store card numbers, UPI PINs or banking passwords.
      </p>
      <h2>4. Logs, cookies and analytics</h2>
      <p>
        Our hosting provider automatically records basic technical logs (such as IP address, browser type and time of request) for security, abuse prevention and rate-limiting.
        We do not use advertising cookies at present. If we add analytics or advertising (such as Google AdSense) in future, we will update this policy and, where required, ask for
        your consent.
      </p>
      <h2>5. Sharing</h2>
      <p>We do not sell your personal data. We share data only with the service providers described above (hosting, AI, payments) or when required by law.</p>
      <h2>6. Children</h2>
      <p>This service is intended for adults (18+) or for parents/guardians preparing a biodata for an adult family member.</p>
      <h2>7. Your rights</h2>
      <p>
        Because your biodata lives on your device, you can view, edit or delete it at any time using the app or by clearing your browser storage. For any privacy question or a
        request under the Digital Personal Data Protection Act, 2023, contact us at {OWNER.email}.
      </p>
      <h2>8. Changes</h2>
      <p>We may update this policy. The “Last updated” date above shows the latest version.</p>
      <h2>9. Contact / Grievance Officer</h2>
      <p>
        {OWNER.legalName}
        <br />
        Email: {OWNER.email}
        <br />
        Phone: {OWNER.phone}
        <br />
        Address: {OWNER.address}
      </p>
    </LegalPage>
  );
}

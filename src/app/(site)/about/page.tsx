import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/site/LegalPage";
import { BRAND, OWNER } from "@/lib/site";

export const metadata: Metadata = { title: "About Us", description: `About ${BRAND}, the AI marriage biodata maker.`, alternates: { canonical: "/about" } };

export default function About() {
  return (
    <LegalPage title={`About ${BRAND}`} updated={false}>
      <p>
        {BRAND} helps Indian families create a beautiful, respectful marriage biodata in minutes — on a phone, in their own language, without installing an app or creating an
        account.
      </p>
      <p>
        We combine traditional designs with an AI writer that drafts the hardest part — the “About Me”, family introduction and partner expectations — in English, Hindi, Marathi,
        Gujarati, Bengali, Tamil, Telugu, Kannada, Punjabi and Malayalam. Your details never leave your device except the text needed for AI writing.
      </p>
      <p>
        {BRAND} is run by {OWNER.legalName} from {OWNER.city}, India. Questions or suggestions? <Link href="/contact">Contact us</Link>.
      </p>
    </LegalPage>
  );
}

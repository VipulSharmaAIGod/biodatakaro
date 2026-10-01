import Link from "next/link";
import { BRAND, OWNER } from "@/lib/site";
import { LogoMark } from "./Logo";

const FORMATS = [
  ["/marriage-biodata-format", "Marriage biodata format"],
  ["/biodata-for-marriage-in-hindi", "Biodata in Hindi"],
  ["/marathi-biodata", "Marathi biodata"],
  ["/gujarati-biodata", "Gujarati biodata"],
  ["/biodata-format-for-girl", "Biodata for girl"],
  ["/biodata-format-for-boy", "Biodata for boy"],
  ["/free-biodata-maker", "Free biodata maker"],
];
const LEGAL = [
  ["/about", "About us"],
  ["/pricing", "Pricing"],
  ["/contact", "Contact us"],
  ["/privacy-policy", "Privacy policy"],
  ["/terms", "Terms & conditions"],
  ["/refund-policy", "Refund & cancellation"],
  ["/shipping-policy", "Delivery policy"],
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <LogoMark size={28} />
            <span className="text-[17px] font-extrabold">{BRAND}</span>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-stone-600">
            Free AI marriage biodata maker for Indian families. Beautiful designs, 10 languages, PDF &amp; WhatsApp image. Your data stays on your device.
          </p>
        </div>
        <nav aria-label="Biodata formats">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-stone-500">Biodata formats</h2>
          <ul className="mt-3 space-y-2 text-[14px]">
            {FORMATS.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-stone-700 hover:text-brand">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-stone-500">Company</h2>
          <ul className="mt-3 space-y-2 text-[14px]">
            {LEGAL.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-stone-700 hover:text-brand">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-stone-100 py-4 text-center text-[12px] text-stone-500">
        © {new Date().getFullYear()} {BRAND} · Operated by {OWNER.legalName}, {OWNER.city}, India · {OWNER.email}
      </div>
    </footer>
  );
}

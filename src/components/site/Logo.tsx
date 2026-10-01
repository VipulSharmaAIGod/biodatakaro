import Link from "next/link";
import { BRAND } from "@/lib/site";

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <rect width="64" height="64" rx="16" fill="#7a1f2b" />
      <g fill="#e9c46a">
        <path d="M32 12c-6 7-6 15 0 20 6-5 6-13 0-20z" />
        <path d="M32 32c-8 0-15-4-18-11 8 0 14 4 18 11z" opacity=".85" />
        <path d="M32 32c8 0 15-4 18-11-8 0-14 4-18 11z" opacity=".85" />
      </g>
      <path d="M18 40h28M22 46h20M27 52h10" stroke="#fffaf2" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label={`${BRAND} home`}>
      <LogoMark />
      <span className="text-[19px] font-extrabold tracking-tight text-stone-900">
        Biodata<span className="text-brand">Karo</span>
      </span>
    </Link>
  );
}

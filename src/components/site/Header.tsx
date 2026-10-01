import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
        <Logo />
        <nav className="flex items-center gap-1 text-[14px] font-semibold text-stone-700">
          <Link href="/marriage-biodata-format" className="hidden rounded-lg px-3 py-2 hover:bg-white sm:block">
            Formats
          </Link>
          <Link href="/pricing" className="hidden rounded-lg px-3 py-2 hover:bg-white sm:block">
            Pricing
          </Link>
          <Link href="/create" className="rounded-xl bg-brand px-4 py-2 text-white shadow-sm hover:bg-brand-dark">
            Create Biodata
          </Link>
        </nav>
      </div>
    </header>
  );
}

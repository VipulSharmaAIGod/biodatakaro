import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { docFontVars } from "@/lib/fonts";

export default function DocLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${docFontVars} flex min-h-dvh flex-col`}>
      <header className="border-b border-stone-200/70 bg-white">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
          <Logo />
          <Link href="/pricing" className="text-[13px] font-semibold text-stone-600 hover:text-brand">
            Pricing
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}

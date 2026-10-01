import Image from "next/image";
import Link from "next/link";
import { TEMPLATES } from "@/lib/templates";

export function TemplateGallery({ limit, eager = 0 }: { limit?: number; eager?: number }) {
  const list = limit ? TEMPLATES.slice(0, limit) : TEMPLATES;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {list.map((t, i) => (
        <Link key={t.id} href={`/create?template=${t.id}`} className="group block rounded-2xl border border-stone-200 bg-white p-1.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <Image
            src={`/templates/${t.id}.webp`}
            alt={`${t.name} marriage biodata design`}
            width={400}
            height={566}
            sizes="(max-width: 640px) 46vw, 260px"
            className="h-auto w-full rounded-xl"
            loading={i < eager ? "eager" : "lazy"}
          />
          <div className="flex items-center justify-between px-1 py-1.5">
            <span className="text-[13px] font-semibold text-stone-800">{t.name}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${t.premium ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-800"}`}>{t.premium ? "PREMIUM" : "FREE"}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

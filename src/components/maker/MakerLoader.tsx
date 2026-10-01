"use client";
import dynamic from "next/dynamic";

const BiodataMaker = dynamic(() => import("./BiodataMaker"), {
  ssr: false,
  loading: () => (
    <div className="grid min-h-[50vh] place-items-center text-stone-500">
      <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" aria-label="Loading" />
    </div>
  ),
});

export default function MakerLoader() {
  return <BiodataMaker />;
}

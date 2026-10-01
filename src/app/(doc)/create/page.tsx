import type { Metadata } from "next";
import MakerLoader from "@/components/maker/MakerLoader";

export const metadata: Metadata = {
  title: "Create Marriage Biodata Online – Free Maker",
  description: "Fill your details, let AI write About Me, pick a design and download your marriage biodata as PDF or WhatsApp image. Free, no login.",
  alternates: { canonical: "/create" },
};

export default function CreatePage() {
  return (
    <>
      <h1 className="sr-only">Create your marriage biodata</h1>
      <noscript>
        <p className="p-6 text-center">Please enable JavaScript to use the biodata maker.</p>
      </noscript>
      <MakerLoader />
    </>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { BiodataDocument, type BiodataDocumentProps } from "@/components/biodata/BiodataDocument";
import { PAGE_H, PAGE_W } from "@/components/biodata/parts";

/** Renders the A4 biodata scaled to the width of its container (live preview on phones). */
export function ScaledDocument(props: BiodataDocumentProps & { maxWidth?: number; shadow?: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.min(e.contentRect.width, props.maxWidth ?? Infinity)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [props.maxWidth]);
  const scale = w ? w / PAGE_W : 0;
  return (
    <div ref={box} className="w-full">
      <div
        className={`relative mx-auto overflow-hidden bg-white ${props.shadow === false ? "" : "shadow-[0_6px_30px_rgba(0,0,0,.15)]"}`}
        style={{ width: w || "100%", height: w ? PAGE_H * scale : undefined, aspectRatio: w ? undefined : `${PAGE_W} / ${PAGE_H}` }}
      >
        {scale > 0 && (
          <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: PAGE_W, height: PAGE_H }}>
            <BiodataDocument b={props.b} watermark={props.watermark} />
          </div>
        )}
      </div>
    </div>
  );
}

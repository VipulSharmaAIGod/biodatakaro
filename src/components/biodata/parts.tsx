import type { ReactNode } from "react";
import type { Row } from "@/lib/format";

export const PAGE_W = 794;
export const PAGE_H = 1123;

export const pageStyle: React.CSSProperties = {
  width: PAGE_W,
  height: PAGE_H,
  position: "relative",
  overflow: "hidden",
  boxSizing: "border-box",
  fontSize: "calc(14.5px * var(--s, 1))",
  lineHeight: 1.45,
  WebkitFontSmoothing: "antialiased",
  textRendering: "optimizeLegibility",
};

export function Rows({
  rows,
  label,
  value,
  sep = ":",
  labelW = "36%",
  labelWeight = 600,
  gap = "0.28em",
  stacked = false,
}: {
  rows: Row[];
  label: string;
  value: string;
  sep?: string;
  labelW?: string;
  labelWeight?: number;
  gap?: string;
  stacked?: boolean;
}) {
  if (stacked) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.45em" }}>
        {rows.map((r, i) => (
          <div key={i}>
            <div style={{ color: label, fontSize: "0.78em", fontWeight: labelWeight, letterSpacing: "0.02em" }}>{r.label}</div>
            <div style={{ color: value, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{r.value}</div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: `${labelW} 1.1em 1fr`, rowGap: gap, alignItems: "baseline" }}>
      {rows.map((r, i) => (
        <RowFrag key={i} r={r} label={label} value={value} sep={sep} labelWeight={labelWeight} />
      ))}
    </div>
  );
}

function RowFrag({ r, label, value, sep, labelWeight }: { r: Row; label: string; value: string; sep: string; labelWeight: number }) {
  return (
    <>
      <div style={{ color: label, fontWeight: labelWeight }}>{r.label}</div>
      <div style={{ color: label, textAlign: "center" }}>{sep}</div>
      <div style={{ color: value, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{r.value}</div>
    </>
  );
}

export function Para({ text, color }: { text: string; color: string }) {
  return <p style={{ color, margin: 0, textAlign: "justify", whiteSpace: "pre-wrap", hyphens: "auto" }}>{text}</p>;
}

export function Photo({
  src,
  width = 170,
  radius = "6px",
  border,
  shadow,
  style,
}: {
  src: string | null;
  width?: number;
  radius?: string;
  border?: string;
  shadow?: string;
  style?: React.CSSProperties;
}) {
  if (!src) return null;
  return (
    <div style={{ width, aspectRatio: "4 / 5", borderRadius: radius, border, boxShadow: shadow, overflow: "hidden", flexShrink: 0, background: "#eee", ...style }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
  );
}

export function Heading({ text, color, size = "1.05em", style }: { text: string; color: string; size?: string; style?: React.CSSProperties }) {
  if (!text) return null;
  return (
    <div dir="auto" style={{ color, fontSize: size, fontWeight: 600, textAlign: "center", ...style }}>
      {text}
    </div>
  );
}

export function Stack({ children, gap = "0.9em" }: { children: ReactNode; gap?: string }) {
  return <div style={{ display: "flex", flexDirection: "column", gap }}>{children}</div>;
}

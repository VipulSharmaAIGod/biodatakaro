import { useId } from "react";

type P = { color: string; accent?: string; className?: string; style?: React.CSSProperties };

/** Ornamental gold corner (top-left orientation; flip with CSS transforms). */
export function CornerFlourish({ color, accent, size = 120, style }: P & { size?: number }) {
  const a = accent || color;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={style} aria-hidden>
      <g fill="none" stroke={color} strokeLinecap="round">
        <path d="M6 114 C6 52 52 6 114 6" strokeWidth="2.2" />
        <path d="M16 114 C16 60 60 16 114 16" strokeWidth="1" />
        <path d="M14 40 C14 22 22 14 40 14" strokeWidth="1.6" />
        <path d="M30 30 c-6 -10 4 -18 10 -12 c5 5 -2 12 -6 8" strokeWidth="1.4" />
        <path d="M58 22 q10 -12 22 -4" strokeWidth="1.2" />
        <path d="M22 58 q-12 10 -4 22" strokeWidth="1.2" />
      </g>
      <g fill={a}>
        <circle cx="24" cy="24" r="4" />
        <circle cx="62" cy="9" r="2" />
        <circle cx="9" cy="62" r="2" />
        <circle cx="88" cy="9" r="1.6" />
        <circle cx="9" cy="88" r="1.6" />
        <path d="M44 28 q8 -10 18 -6 q-8 10 -18 6z" opacity=".85" />
        <path d="M28 44 q-10 8 -6 18 q10 -8 6 -18z" opacity=".85" />
      </g>
    </svg>
  );
}

export function Corners({ color, accent, size = 120, inset = 10 }: P & { size?: number; inset?: number }) {
  const base: React.CSSProperties = { position: "absolute", pointerEvents: "none" };
  return (
    <>
      <CornerFlourish color={color} accent={accent} size={size} style={{ ...base, top: inset, left: inset }} />
      <CornerFlourish color={color} accent={accent} size={size} style={{ ...base, top: inset, right: inset, transform: "scaleX(-1)" }} />
      <CornerFlourish color={color} accent={accent} size={size} style={{ ...base, bottom: inset, left: inset, transform: "scaleY(-1)" }} />
      <CornerFlourish color={color} accent={accent} size={size} style={{ ...base, bottom: inset, right: inset, transform: "scale(-1,-1)" }} />
    </>
  );
}

/** Radial mandala built from rotated petals. */
export function Mandala({ color, accent, size = 400, style, opacity = 1 }: P & { size?: number; opacity?: number }) {
  const a = accent || color;
  const ring = (n: number, r: number, rx: number, ry: number, fill: string, op: number, key: string) => (
    <g key={key} opacity={op}>
      {Array.from({ length: n }, (_, i) => (
        <ellipse key={i} cx="0" cy={-r} rx={rx} ry={ry} fill={fill} transform={`rotate(${(i * 360) / n})`} />
      ))}
    </g>
  );
  return (
    <svg width={size} height={size} viewBox="-200 -200 400 400" style={{ opacity, ...style }} aria-hidden>
      <g fill="none" stroke={color} strokeWidth="1.2">
        <circle r="196" />
        <circle r="186" strokeDasharray="2 5" />
        <circle r="140" />
        <circle r="92" />
        <circle r="40" />
      </g>
      {ring(32, 165, 9, 22, color, 0.55, "r1")}
      {ring(24, 118, 11, 24, a, 0.6, "r2")}
      {ring(16, 68, 10, 22, color, 0.7, "r3")}
      {ring(12, 24, 6, 14, a, 0.85, "r4")}
      <g fill={color}>
        {Array.from({ length: 48 }, (_, i) => (
          <circle key={i} cx="0" cy="-191" r="2.4" transform={`rotate(${i * 7.5})`} />
        ))}
      </g>
      <circle r="8" fill={a} />
    </svg>
  );
}

/** Lotus with flanking lines, used as a heading divider. */
export function LotusDivider({ color, accent, width = 260, style }: P & { width?: number }) {
  const a = accent || color;
  return (
    <svg width={width} height="26" viewBox="0 0 260 26" style={style} aria-hidden>
      <g stroke={color} strokeWidth="1.2" fill="none">
        <path d="M6 16 H98" />
        <path d="M162 16 H254" />
        <path d="M30 20 H98" strokeWidth=".6" />
        <path d="M162 20 H230" strokeWidth=".6" />
      </g>
      <g fill={a}>
        <path d="M130 2 C122 10 122 18 130 22 C138 18 138 10 130 2z" />
        <path d="M130 22 C120 22 110 16 106 8 C116 9 124 14 130 22z" opacity=".8" />
        <path d="M130 22 C140 22 150 16 154 8 C144 9 136 14 130 22z" opacity=".8" />
        <path d="M130 22 C118 24 106 22 100 16 C112 15 122 18 130 22z" opacity=".55" />
        <path d="M130 22 C142 24 154 22 160 16 C148 15 138 18 130 22z" opacity=".55" />
        <circle cx="4" cy="16" r="2.4" />
        <circle cx="256" cy="16" r="2.4" />
      </g>
    </svg>
  );
}

/** Small diamond ornament for section titles. */
export function Diamond({ color, size = 10 }: P & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" aria-hidden style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M5 0 L10 5 L5 10 L0 5z" fill={color} />
    </svg>
  );
}

function Flower({ x, y, r, petal, center, rot = 0 }: { x: number; y: number; r: number; petal: string; center: string; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {Array.from({ length: 5 }, (_, i) => (
        <ellipse key={i} cx="0" cy={-r * 0.95} rx={r * 0.62} ry={r} fill={petal} opacity=".9" transform={`rotate(${i * 72})`} />
      ))}
      <circle r={r * 0.42} fill={center} />
    </g>
  );
}
function Leaf({ x, y, s = 1, rot = 0, color }: { x: number; y: number; s?: number; rot?: number; color: string }) {
  return <path d="M0 0 Q12 -12 28 0 Q12 12 0 0z" fill={color} transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity=".85" />;
}

/** Floral vine corner (top-left orientation). */
export function FloralCorner({ color, accent, size = 220, style }: P & { size?: number }) {
  const leaf = accent || "#6b8e4e";
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" style={style} aria-hidden>
      <path d="M4 210 C 20 120, 90 40, 210 6" stroke={leaf} strokeWidth="2.2" fill="none" />
      <path d="M40 150 C 60 140, 70 120, 66 100" stroke={leaf} strokeWidth="1.4" fill="none" />
      <path d="M110 70 C 120 52, 140 44, 160 46" stroke={leaf} strokeWidth="1.4" fill="none" />
      <Leaf x={24} y={170} rot={-70} color={leaf} />
      <Leaf x={52} y={118} rot={-40} s={0.9} color={leaf} />
      <Leaf x={92} y={78} rot={-20} color={leaf} />
      <Leaf x={140} y={36} rot={-10} s={0.85} color={leaf} />
      <Leaf x={70} y={120} rot={120} s={0.8} color={leaf} />
      <Leaf x={120} y={66} rot={150} s={0.8} color={leaf} />
      <Flower x={38} y={42} r={20} petal={color} center="#f6c453" rot={10} />
      <Flower x={92} y={30} r={12} petal={color} center="#f6c453" rot={30} />
      <Flower x={28} y={98} r={13} petal={color} center="#f6c453" rot={50} />
      <Flower x={66} y={98} r={9} petal={color} center="#f6c453" />
      <Flower x={164} y={46} r={8} petal={color} center="#f6c453" />
      <Flower x={18} y={150} r={8} petal={color} center="#f6c453" />
      <circle cx="120" cy="40" r="3" fill={color} opacity=".6" />
      <circle cx="44" cy="136" r="3" fill={color} opacity=".6" />
    </svg>
  );
}

/** Peacock feather (pointing up-right). */
export function PeacockFeather({ size = 200, style, rot = 0 }: { size?: number; style?: React.CSSProperties; rot?: number }) {
  const barbs = Array.from({ length: 26 }, (_, i) => i);
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 100 160" style={style} aria-hidden>
      <g transform={`rotate(${rot} 50 80)`}>
        <path d="M50 158 C 50 120, 50 80, 50 30" stroke="#7a6a2f" strokeWidth="1.4" fill="none" />
        {barbs.map((i) => {
          const y = 150 - i * 4.6;
          const len = 10 + Math.sin((i / 25) * Math.PI) * 30;
          return (
            <g key={i} stroke={i % 3 === 0 ? "#2f8f6f" : "#5aa66f"} strokeWidth=".7" fill="none" opacity=".85">
              <path d={`M50 ${y} q ${-len * 0.6} -6 ${-len} -14`} />
              <path d={`M50 ${y} q ${len * 0.6} -6 ${len} -14`} />
            </g>
          );
        })}
        <ellipse cx="50" cy="40" rx="24" ry="30" fill="#2f8f6f" opacity=".9" />
        <ellipse cx="50" cy="42" rx="17" ry="22" fill="#e3b23c" />
        <ellipse cx="50" cy="44" rx="12" ry="15" fill="#1f6fa8" />
        <ellipse cx="50" cy="46" rx="6.5" ry="8.5" fill="#0d2f57" />
        <ellipse cx="48" cy="43" rx="2" ry="3" fill="#7fc6e8" opacity=".9" />
      </g>
    </svg>
  );
}

/** Islamic-style 8-point star tiled pattern. */
export function StarPattern({ color, opacity = 0.18, cell = 44 }: { color: string; opacity?: number; cell?: number }) {
  const id = "sp" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const c = cell / 2;
  const s = cell * 0.26;
  return (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity }} aria-hidden>
      <defs>
        <pattern id={id} width={cell} height={cell} patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="1">
            <rect x={c - s} y={c - s} width={s * 2} height={s * 2} />
            <rect x={c - s} y={c - s} width={s * 2} height={s * 2} transform={`rotate(45 ${c} ${c})`} />
            <circle cx={c} cy={c} r={s * 0.45} />
            <path d={`M0 0 L${cell} ${cell} M${cell} 0 L0 ${cell}`} strokeWidth=".4" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Repeating triangle/dot band (toran-style). */
export function ToranBand({ color, accent, height = 26 }: { color: string; accent: string; height?: number }) {
  const id = "tb" + useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg width="100%" height={height} aria-hidden style={{ display: "block" }}>
      <defs>
        <pattern id={id} width="28" height={height} patternUnits="userSpaceOnUse">
          <rect width="28" height="5" fill={color} />
          <path d={`M0 5 L14 ${height - 4} L28 5z`} fill={color} opacity=".9" />
          <path d={`M7 5 L14 ${height - 12} L21 5z`} fill={accent} />
          <circle cx="14" cy={height - 2.5} r="2.5" fill={accent} />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  );
}

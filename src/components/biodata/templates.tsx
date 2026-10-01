import type { ReactNode } from "react";
import type { DocSection } from "@/lib/format";
import { FONT_STACK } from "@/lib/languages";
import type { Biodata } from "@/lib/schema";
import type { TemplateId } from "@/lib/templates";
import { Corners, Diamond, FloralCorner, LotusDivider, Mandala, PeacockFeather, StarPattern, ToranBand } from "./ornaments";
import { Heading, Para, Photo, Rows, pageStyle } from "./parts";

export interface Block {
  id: string;
  title: string;
  rows?: DocSection["rows"];
  text?: string;
}

export interface TplProps {
  b: Biodata;
  name: string;
  heading: string;
  title: string;
  blocks: Block[];
  /** Blocks excluding contact (for sidebar layouts). */
  contact?: Block;
}

const fit: React.CSSProperties = { flex: 1, minHeight: 0, overflow: "hidden" };

/** Personal section gets the photo next to it. */
function WithPhoto({ block, photo, children, side = "right" }: { block: Block; photo: ReactNode; children: ReactNode; side?: "left" | "right" }) {
  if (block.id !== "personal" || !photo) return <>{children}</>;
  return (
    <div style={{ display: "flex", gap: "1.4em", alignItems: "flex-start", flexDirection: side === "right" ? "row" : "row-reverse" }}>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      {photo}
    </div>
  );
}

function renderBlocks(
  blocks: Block[],
  opts: { title: (t: string, id: string) => ReactNode; label: string; value: string; photo?: ReactNode; gap?: string; labelW?: string; side?: "left" | "right" },
) {
  const hasPersonal = blocks.some((b) => b.id === "personal");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: opts.gap || "0.95em" }}>
      {!hasPersonal && opts.photo ? <div style={{ display: "flex", justifyContent: "center" }}>{opts.photo}</div> : null}
      {blocks.map((bl) => (
        <section key={bl.id} style={{ breakInside: "avoid" }}>
          {opts.title(bl.title, bl.id)}
          <WithPhoto block={bl} photo={opts.photo} side={opts.side}>
            {bl.rows ? <Rows rows={bl.rows} label={opts.label} value={opts.value} labelW={opts.labelW} /> : <Para text={bl.text || ""} color={opts.value} />}
          </WithPhoto>
        </section>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- 1. Classic Maroon (free) */
function Classic({ b, heading, title, blocks }: TplProps) {
  const maroon = "#7a1f2b";
  const gold = "#b8901c";
  return (
    <div style={{ ...pageStyle, background: "radial-gradient(ellipse at center, #fffdf6 0%, #fbf1dc 100%)", color: "#2b1a12", fontFamily: FONT_STACK.serif }}>
      <div style={{ position: "absolute", inset: 16, border: `3px solid ${maroon}` }} />
      <div style={{ position: "absolute", inset: 24, border: `1px solid ${gold}` }} />
      <Corners color={gold} accent={maroon} size={104} inset={28} />
      <div style={{ position: "absolute", inset: "44px 62px 44px", display: "flex", flexDirection: "column" }}>
        <Heading text={heading} color={maroon} size="1.1em" />
        {b.showTitle && (
          <div style={{ textAlign: "center", marginTop: "0.25em" }}>
            <div style={{ fontFamily: FONT_STACK.display, color: maroon, fontSize: "2em", fontWeight: 700, letterSpacing: "0.04em" }}>{title}</div>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center", margin: "0.2em 0 0.8em" }}>
          <LotusDivider color={gold} accent={maroon} width={240} />
        </div>
        <div data-fit style={fit}>
          {renderBlocks(blocks, {
            label: maroon,
            value: "#2b1a12",
            photo: <Photo src={b.photo} width={168} radius="4px" border={`3px double ${gold}`} />,
            title: (t) => (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5em", marginBottom: "0.35em" }}>
                <Diamond color={gold} />
                <span style={{ color: maroon, fontWeight: 700, fontSize: "1.12em", letterSpacing: "0.03em" }}>{t}</span>
                <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${gold}, transparent)` }} />
              </div>
            ),
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 2. Simple Elegant (free) */
function Minimal({ b, name, heading, title, blocks }: TplProps) {
  const navy = "#1e3a5f";
  return (
    <div style={{ ...pageStyle, background: "#ffffff", color: "#1f2937", fontFamily: FONT_STACK.sans }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 10, background: navy }} />
      <div style={{ position: "absolute", inset: "40px 56px 40px 66px", display: "flex", flexDirection: "column" }}>
        <Heading text={heading} color="#6b7280" size="0.95em" />
        <div style={{ display: "flex", alignItems: "center", gap: "1.4em", margin: "0.8em 0 0.9em", paddingBottom: "0.9em", borderBottom: `2px solid ${navy}` }}>
          <div style={{ flex: 1 }}>
            {b.showTitle && <div style={{ textTransform: "uppercase", letterSpacing: "0.22em", fontSize: "0.78em", color: "#6b7280", fontWeight: 600 }}>{title}</div>}
            <div style={{ fontFamily: FONT_STACK.display, fontSize: "2.3em", fontWeight: 700, color: navy, lineHeight: 1.15 }}>{name || " "}</div>
          </div>
          <Photo src={b.photo} width={128} radius="999px" border={`3px solid ${navy}`} style={{ aspectRatio: "1 / 1" }} />
        </div>
        <div data-fit style={fit}>
          {renderBlocks(blocks, {
            label: "#4b5563",
            value: "#111827",
            title: (t) => (
              <div style={{ display: "flex", alignItems: "center", gap: "0.7em", marginBottom: "0.4em" }}>
                <span style={{ color: navy, fontWeight: 700, fontSize: "0.92em", textTransform: "uppercase", letterSpacing: "0.12em" }}>{t}</span>
                <span style={{ flex: 1, height: 1, background: "#d1d5db" }} />
              </div>
            ),
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 3. Rose Floral (free) */
function Floral({ b, heading, title, blocks }: TplProps) {
  const rose = "#be185d";
  const soft = "#f9a8c9";
  return (
    <div style={{ ...pageStyle, background: "linear-gradient(180deg, #fff7fa 0%, #fff0f5 100%)", color: "#3b1d2a", fontFamily: FONT_STACK.serif }}>
      <div style={{ position: "absolute", inset: 20, border: `2px solid ${soft}`, borderRadius: 18 }} />
      <FloralCorner color={soft} accent="#7aa36a" size={210} style={{ position: "absolute", top: 4, left: 4 }} />
      <FloralCorner color={soft} accent="#7aa36a" size={210} style={{ position: "absolute", bottom: 4, right: 4, transform: "rotate(180deg)" }} />
      <div style={{ position: "absolute", inset: "46px 64px 50px", display: "flex", flexDirection: "column" }}>
        <Heading text={heading} color={rose} size="1.05em" />
        {b.showTitle && (
          <div style={{ textAlign: "center", fontFamily: FONT_STACK.display, fontStyle: "italic", color: rose, fontSize: "2.05em", fontWeight: 600, marginTop: "0.15em" }}>{title}</div>
        )}
        <div style={{ display: "flex", justifyContent: "center", margin: "0.1em 0 0.9em" }}>
          <LotusDivider color={soft} accent={rose} width={220} />
        </div>
        <div data-fit style={fit}>
          {renderBlocks(blocks, {
            label: "#9d174d",
            value: "#3b1d2a",
            photo: <Photo src={b.photo} width={160} radius="16px" border={`4px solid #fff`} shadow={`0 0 0 2px ${soft}`} />,
            title: (t) => (
              <div style={{ marginBottom: "0.45em" }}>
                <span style={{ display: "inline-block", background: rose, color: "#fff", padding: "0.12em 0.95em", borderRadius: 999, fontWeight: 700, fontSize: "0.98em" }}>{t}</span>
              </div>
            ),
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 4. Royal Gold (premium) */
function Royal({ b, name, heading, title, blocks }: TplProps) {
  const gold = "#d9b54a";
  const cream = "#fbefd5";
  return (
    <div style={{ ...pageStyle, background: "radial-gradient(ellipse at 50% 30%, #6b1424 0%, #4a0e17 55%, #330910 100%)", color: cream, fontFamily: FONT_STACK.serif }}>
      <Mandala color={gold} accent={gold} size={620} opacity={0.07} style={{ position: "absolute", left: 87, top: 250 }} />
      <div style={{ position: "absolute", inset: 14, border: `2px solid ${gold}` }} />
      <div style={{ position: "absolute", inset: 20, border: `1px solid ${gold}`, opacity: 0.7 }} />
      <div style={{ position: "absolute", inset: 26, border: `4px double ${gold}`, opacity: 0.5 }} />
      <Corners color={gold} accent={gold} size={120} inset={24} />
      <div style={{ position: "absolute", inset: "46px 66px 46px", display: "flex", flexDirection: "column" }}>
        <Heading text={heading} color={gold} size="1.1em" />
        <div style={{ display: "flex", justifyContent: "center", margin: "0.3em 0 0.2em" }}>
          <Photo src={b.photo} width={150} radius="80px 80px 8px 8px" border={`3px solid ${gold}`} shadow={`0 0 0 6px rgba(217,181,74,.25)`} />
        </div>
        <div style={{ textAlign: "center", fontFamily: FONT_STACK.display, fontSize: "2.1em", fontWeight: 700, color: gold, marginTop: "0.15em", lineHeight: 1.15 }}>{name}</div>
        {b.showTitle && <div style={{ textAlign: "center", letterSpacing: "0.3em", textTransform: "uppercase", fontSize: "0.78em", color: cream, opacity: 0.85 }}>{title}</div>}
        <div style={{ display: "flex", justifyContent: "center", margin: "0.3em 0 0.7em" }}>
          <LotusDivider color={gold} accent={gold} width={260} />
        </div>
        <div data-fit style={fit}>
          {renderBlocks(blocks, {
            label: gold,
            value: cream,
            labelW: "37%",
            title: (t) => (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6em", marginBottom: "0.4em" }}>
                <span style={{ width: 60, height: 1, background: gold }} />
                <Diamond color={gold} />
                <span style={{ color: gold, fontWeight: 700, fontSize: "1.1em", letterSpacing: "0.06em" }}>{t}</span>
                <Diamond color={gold} />
                <span style={{ width: 60, height: 1, background: gold }} />
              </div>
            ),
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 5. Saffron Mandala (premium) */
function MandalaTpl({ b, heading, title, blocks }: TplProps) {
  const saffron = "#c2410c";
  const deep = "#7c2d12";
  const gold = "#f59e0b";
  return (
    <div style={{ ...pageStyle, background: "linear-gradient(180deg, #fffbeb 0%, #fff3e0 100%)", color: "#3a1a0c", fontFamily: FONT_STACK.serif }}>
      <Mandala color={saffron} accent={gold} size={700} opacity={0.06} style={{ position: "absolute", left: 47, top: 300 }} />
      <Mandala color={saffron} accent={gold} size={260} opacity={0.35} style={{ position: "absolute", left: -130, top: -130 }} />
      <Mandala color={saffron} accent={gold} size={260} opacity={0.35} style={{ position: "absolute", right: -130, top: -130 }} />
      <Mandala color={saffron} accent={gold} size={200} opacity={0.25} style={{ position: "absolute", left: -100, bottom: -100 }} />
      <Mandala color={saffron} accent={gold} size={200} opacity={0.25} style={{ position: "absolute", right: -100, bottom: -100 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0 }}>
        <ToranBand color={saffron} accent={gold} height={30} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, transform: "scaleY(-1)" }}>
        <ToranBand color={saffron} accent={gold} height={22} />
      </div>
      <div style={{ position: "absolute", inset: "54px 70px 46px", display: "flex", flexDirection: "column" }}>
        <Heading text={heading} color={saffron} size="1.12em" />
        {b.showTitle && <div style={{ textAlign: "center", fontFamily: FONT_STACK.display, color: deep, fontSize: "2.05em", fontWeight: 700, marginTop: "0.1em" }}>{title}</div>}
        <div style={{ display: "flex", justifyContent: "center", margin: "0.1em 0 0.85em" }}>
          <LotusDivider color={gold} accent={saffron} width={240} />
        </div>
        <div data-fit style={fit}>
          {renderBlocks(blocks, {
            label: deep,
            value: "#3a1a0c",
            photo: <Photo src={b.photo} width={150} radius="999px" border={`4px solid ${gold}`} shadow={`0 0 0 3px ${saffron}`} style={{ aspectRatio: "1 / 1" }} />,
            title: (t) => (
              <div style={{ marginBottom: "0.45em", display: "flex" }}>
                <span style={{ background: `linear-gradient(90deg, ${saffron}, ${gold})`, color: "#fff", padding: "0.12em 1.6em 0.12em 0.8em", fontWeight: 700, fontSize: "1em", clipPath: "polygon(0 0, 100% 0, calc(100% - 0.9em) 100%, 0 100%)" }}>{t}</span>
              </div>
            ),
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 6. Peacock Teal (premium) */
function Peacock({ b, name, heading, title, blocks }: TplProps) {
  const teal = "#0f5e63";
  const gold = "#c9971f";
  return (
    <div style={{ ...pageStyle, background: "linear-gradient(160deg, #f2fbf9 0%, #e6f4f1 100%)", color: "#123234", fontFamily: FONT_STACK.serif }}>
      <div style={{ position: "absolute", inset: 0, border: `14px solid ${teal}` }} />
      <div style={{ position: "absolute", inset: 20, border: `1.5px solid ${gold}` }} />
      <PeacockFeather size={150} rot={-28} style={{ position: "absolute", right: 10, top: 6 }} />
      <PeacockFeather size={130} rot={150} style={{ position: "absolute", left: 14, bottom: 4 }} />
      <div style={{ position: "absolute", inset: "46px 70px 46px", display: "flex", flexDirection: "column" }}>
        <Heading text={heading} color={teal} size="1.08em" />
        {b.showTitle && <div style={{ textAlign: "center", color: gold, letterSpacing: "0.28em", textTransform: "uppercase", fontSize: "0.82em", fontWeight: 700, marginTop: "0.5em" }}>{title}</div>}
        <div style={{ textAlign: "center", fontFamily: FONT_STACK.display, fontSize: "2.2em", fontWeight: 700, color: teal, lineHeight: 1.2 }}>{name}</div>
        <div style={{ display: "flex", justifyContent: "center", margin: "0.15em 0 0.85em" }}>
          <LotusDivider color={gold} accent={teal} width={230} />
        </div>
        <div data-fit style={fit}>
          {renderBlocks(blocks, {
            label: teal,
            value: "#123234",
            photo: <Photo src={b.photo} width={158} radius="12px" border={`3px solid ${teal}`} shadow={`0 0 0 5px #fff, 0 0 0 6px ${gold}`} />,
            title: (t) => (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5em", marginBottom: "0.38em", borderBottom: `1px solid ${gold}`, paddingBottom: "0.15em" }}>
                <svg width="14" height="18" viewBox="0 0 14 18" aria-hidden>
                  <ellipse cx="7" cy="9" rx="6.5" ry="8.5" fill="#2f8f6f" />
                  <ellipse cx="7" cy="9.5" rx="4.4" ry="6" fill="#e3b23c" />
                  <ellipse cx="7" cy="10" rx="2.6" ry="3.6" fill="#1f6fa8" />
                </svg>
                <span style={{ color: teal, fontWeight: 700, fontSize: "1.1em" }}>{t}</span>
              </div>
            ),
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 7. Emerald Arabesque (premium) */
function Emerald({ b, name, heading, title, blocks }: TplProps) {
  const green = "#065f46";
  const gold = "#d9b65d";
  return (
    <div style={{ ...pageStyle, background: "#f4faf6", color: "#0f2a20", fontFamily: FONT_STACK.serif }}>
      <StarPattern color={green} opacity={0.06} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 250, background: `linear-gradient(180deg, #054d39, ${green})`, overflow: "hidden" }}>
        <StarPattern color={gold} opacity={0.22} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 4, background: gold }} />
      </div>
      <div style={{ position: "absolute", inset: 14, border: `1.5px solid ${gold}`, borderRadius: 4 }} />
      <div style={{ position: "absolute", inset: "40px 64px 44px", display: "flex", flexDirection: "column" }}>
        <div style={{ height: 210 - 40, display: "flex", alignItems: "center", gap: "1.3em" }}>
          <Photo src={b.photo} width={132} radius="70px 70px 6px 6px" border={`3px solid ${gold}`} />
          <div style={{ flex: 1, color: "#fff" }}>
            <Heading text={heading} color={gold} size="1.08em" style={{ textAlign: b.photo ? "left" : "center" }} />
            <div style={{ fontFamily: FONT_STACK.display, fontSize: "2.2em", fontWeight: 700, lineHeight: 1.15, marginTop: "0.2em", textAlign: b.photo ? "left" : "center" }}>{name}</div>
            {b.showTitle && <div style={{ letterSpacing: "0.26em", textTransform: "uppercase", fontSize: "0.78em", color: "#d1fae5", marginTop: "0.3em", textAlign: b.photo ? "left" : "center" }}>{title}</div>}
          </div>
        </div>
        <div data-fit style={{ ...fit, marginTop: 52 }}>
          {renderBlocks(blocks, {
            label: green,
            value: "#0f2a20",
            title: (t) => (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5em", marginBottom: "0.38em" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                  <rect x="3" y="3" width="10" height="10" fill={gold} />
                  <rect x="3" y="3" width="10" height="10" fill={gold} transform="rotate(45 8 8)" />
                  <circle cx="8" cy="8" r="2.4" fill={green} />
                </svg>
                <span style={{ color: green, fontWeight: 700, fontSize: "1.1em" }}>{t}</span>
                <span style={{ flex: 1, height: 1, background: gold }} />
              </div>
            ),
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 8. Modern Sidebar (premium) */
function Sidebar({ b, name, heading, title, blocks, contact }: TplProps) {
  const navy = "#1f2a44";
  const gold = "#e8b04b";
  const sideW = 262;
  return (
    <div style={{ ...pageStyle, background: "#fff", color: "#1f2937", fontFamily: FONT_STACK.sans, display: "flex" }}>
      <div style={{ width: sideW, background: `linear-gradient(180deg, ${navy}, #141c30)`, color: "#e5e7eb", padding: "44px 26px", display: "flex", flexDirection: "column", gap: "1em", position: "relative", overflow: "hidden" }}>
        <Mandala color={gold} size={300} opacity={0.08} style={{ position: "absolute", left: -150, bottom: -150 }} />
        <Photo src={b.photo} width={sideW - 52} radius="12px" border={`3px solid ${gold}`} />
        <div>
          <div style={{ fontFamily: FONT_STACK.display, fontSize: "1.75em", fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>{name}</div>
          {b.showTitle && <div style={{ color: gold, letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.72em", marginTop: "0.4em" }}>{title}</div>}
        </div>
        <div data-fit style={{ ...fit, position: "relative" }}>
          {contact?.rows && (
            <div>
              <div style={{ color: gold, fontWeight: 700, fontSize: "0.95em", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: `1px solid ${gold}`, paddingBottom: "0.2em", marginBottom: "0.5em" }}>{contact.title}</div>
              <Rows rows={contact.rows} label="#9ca3af" value="#f3f4f6" stacked />
            </div>
          )}
        </div>
      </div>
      <div style={{ flex: 1, padding: "40px 44px 40px 38px", display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Heading text={heading} color={navy} size="1em" style={{ textAlign: "left", opacity: 0.85 }} />
        <div style={{ height: 3, width: 70, background: gold, margin: "0.6em 0 1em" }} />
        <div data-fit style={fit}>
          {renderBlocks(blocks, {
            label: "#6b7280",
            value: "#111827",
            labelW: "40%",
            title: (t) => (
              <div style={{ color: navy, fontWeight: 800, fontSize: "1em", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4em", display: "flex", alignItems: "center", gap: "0.5em" }}>
                <span style={{ width: 8, height: 8, background: gold, borderRadius: 2, display: "inline-block" }} />
                {t}
              </div>
            ),
          })}
        </div>
      </div>
    </div>
  );
}

export const TEMPLATE_COMPONENTS: Record<TemplateId, (p: TplProps) => React.ReactElement> = {
  classic: Classic,
  minimal: Minimal,
  floral: Floral,
  royal: Royal,
  mandala: MandalaTpl,
  peacock: Peacock,
  emerald: Emerald,
  sidebar: Sidebar,
};

/** Templates that print the name in a big header (so it is not repeated as a row). */
export const NAME_IN_HEADER: TemplateId[] = ["minimal", "royal", "peacock", "emerald", "sidebar"];

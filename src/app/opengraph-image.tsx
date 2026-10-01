import { ImageResponse } from "next/og";

export const alt = "BiodataKaro – Free AI Marriage Biodata Maker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "linear-gradient(135deg, #7a1f2b 0%, #4a0e17 100%)", color: "#fffaf2", padding: 70, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
          <div style={{ fontSize: 34, color: "#e9c46a", fontWeight: 700 }}>BiodataKaro.com</div>
          <div style={{ fontSize: 74, fontWeight: 800, lineHeight: 1.05, marginTop: 18 }}>Marriage Biodata Maker</div>
          <div style={{ fontSize: 34, marginTop: 24, opacity: 0.9 }}>AI-written About Me · 10 Indian languages · PDF &amp; WhatsApp image</div>
          <div style={{ display: "flex", marginTop: 40, fontSize: 30, background: "#e9c46a", color: "#3a0c14", padding: "14px 30px", borderRadius: 16, alignSelf: "flex-start", fontWeight: 800 }}>
            Free · No login
          </div>
        </div>
        <div style={{ width: 300, height: 424, background: "#fffaf2", borderRadius: 12, border: "8px solid #e9c46a", display: "flex", flexDirection: "column", alignItems: "center", padding: 24, color: "#7a1f2b" }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>|| Shree Ganeshay Namah ||</div>
          <div style={{ fontSize: 30, fontWeight: 800, marginTop: 10 }}>BIODATA</div>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} style={{ display: "flex", width: "100%", marginTop: 14 }}>
              <div style={{ width: "40%", height: 10, background: "#c9a227", opacity: 0.6, borderRadius: 4 }} />
              <div style={{ width: "50%", height: 10, background: "#7a1f2b", opacity: 0.25, borderRadius: 4, marginLeft: 16 }} />
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

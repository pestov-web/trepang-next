import { ImageResponse } from "next/og";

export const alt = "Доктор Панг — трепанг и морские биокомплексы из Владивостока";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ alignItems: "center", background: "#dfeee7", color: "#17352d", display: "flex", height: "100%", justifyContent: "space-between", padding: "80px", width: "100%" }}><div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}><div style={{ color: "#df7457", fontSize: 28, fontWeight: 800, letterSpacing: 5, textTransform: "uppercase" }}>Из Владивостока</div><div style={{ fontSize: 74, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02, marginTop: 28 }}>Трепанг и морские биокомплексы</div><div style={{ fontSize: 30, marginTop: 32, opacity: .7 }}>Собственное производство · Доктор Панг</div></div><div style={{ alignItems: "center", background: "#17352d", borderRadius: 999, color: "white", display: "flex", fontSize: 42, fontWeight: 800, height: 230, justifyContent: "center", textAlign: "center", width: 230 }}>ДОКТОР<br/>ПАНГ</div></div>, size);
}

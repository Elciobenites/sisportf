import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #070d18 0%, #101c30 60%, #0b1424 100%)",
          color: "#f3f6fb",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#67e8f9",
          }}
        >
          Elcio Benites
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 920,
          }}
        >
          Transformo grandes volumes de dados em sistemas que funcionam.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 24,
            color: "#9aadc2",
          }}
        >
          Dados • BI • Engenharia de Dados • Sistemas
        </div>
      </div>
    ),
    size,
  );
}

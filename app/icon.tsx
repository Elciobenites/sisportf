import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1424",
          color: "#f3f6fb",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.04em",
          borderRadius: 8,
        }}
      >
        EB
      </div>
    ),
    size,
  );
}

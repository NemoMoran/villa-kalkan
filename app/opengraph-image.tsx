import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ff8a65, #ff385c)",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800 }}>Villa Kalkan</div>
        <div style={{ fontSize: 32, marginTop: 16, opacity: 0.9 }}>
          Luxury villas in Kalkan, Turkey
        </div>
      </div>
    ),
    { ...size }
  );
}

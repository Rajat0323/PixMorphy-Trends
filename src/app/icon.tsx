import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

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
          background: "#176b58",
          color: "white",
          borderRadius: 112,
          fontSize: 178,
          fontWeight: 800,
          fontFamily: "Arial, sans-serif",
        }}
      >
        PM
      </div>
    ),
    size,
  );
}

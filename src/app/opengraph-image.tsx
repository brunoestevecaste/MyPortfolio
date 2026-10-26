import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Bruno Esteve — Data Analyst & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Local assets keep preview generation independent of external font/image hosts.
const font = readFile(join(process.cwd(), "src/assets/seo/bricolage-grotesque-700.ttf"));
const portrait = readFile(join(process.cwd(), "src/assets/seo/portrait.jpg"), "base64");

export default async function OpenGraphImage() {
  const [fontData, portraitData] = await Promise.all([font, portrait]);

  return new ImageResponse(
    (
      <div style={{
        display: "flex", width: "100%", height: "100%", background: "#f9f4f4",
        color: "#121416", padding: 56, fontFamily: "Bricolage Grotesque",
      }}>
        <div style={{ display: "flex", flexDirection: "column", width: 610, justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", color: "#c1282e", fontSize: 108, lineHeight: 0.95, letterSpacing: "-6px" }}>
            <span>Bruno</span>
            <span>Esteve</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 44, lineHeight: 1.12, letterSpacing: "-1.5px" }}>
            <span>Data Analyst &</span>
            <span>AI Engineer</span>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#5c6268" }}>brunoesteve.com</div>
        </div>
        {/* next/og renders this embedded JPEG; this is not a browser image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/jpeg;base64,${portraitData}`}
          alt=""
          width={478}
          height={518}
          style={{ objectFit: "cover", borderRadius: 5 }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Bricolage Grotesque", data: fontData, weight: 700, style: "normal" }],
    },
  );
}

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Dev N Scale — Services Built to Scale Your Business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview: the hero's headline on its dark green, lime-glow ground. */
export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/img/logos/lockup.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#02150e",
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(196,212,52,0.45), rgba(2,21,14,0) 55%)",
          color: "white",
        }}
      >
        <img src={logoSrc} width={282} height={81} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, color: "#c4d434", letterSpacing: 1 }}>
            IT CONSULTING &amp; DEVELOPMENT
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginTop: 18 }}>
            <span>Services Built to Scale Your&nbsp;</span>
            <span style={{ color: "#c4d434" }}>Business</span>
          </div>
          <div style={{ fontSize: 26, color: "#b5bdb9", marginTop: 26 }}>
            UI/UX · Web &amp; Mobile Development · AI · QA · Digital Marketing
          </div>
        </div>
      </div>
    ),
    size,
  );
}

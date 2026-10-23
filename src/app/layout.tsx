import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { CONTACT_DETAILS } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Dev N Scale",
  title: "Dev N Scale — Services Built to Scale Your Business",
  description:
    "A full-service digital agency offering end-to-end design solutions from UI/UX and development to marketing and beyond. Everything you need to launch, grow, and scale.",
  openGraph: {
    type: "website",
    siteName: "Dev N Scale",
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

const detail = (icon: string) =>
  CONTACT_DETAILS.find((d) => d.icon === icon)?.value ?? "";

/* Organization + WebSite structured data. The alternate names help Google
 * tell the brand apart from "N scale" model railways. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Dev N Scale",
      alternateName: ["DevNScale", "Devnscale", "Dev n Scale"],
      url: SITE_URL,
      logo: `${SITE_URL}/img/logos/lockup.png`,
      email: detail("mail"),
      telephone: detail("phone").replace(/\s/g, ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: "Plot No 21, First Floor, Phase 1 Pakistan Town",
        addressLocality: "Islamabad",
        addressCountry: "PK",
      },
      description:
        "Software development and digital agency: UI/UX design, web and mobile development, AI chatbots, QA, pitch decks and digital marketing.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Dev N Scale",
      alternateName: "DevNScale",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c"),
          }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

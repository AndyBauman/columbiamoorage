import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://columbiamoorage.com"),
  title: {
    default: "Columbia Moorage | Riverfront RV Resort, Boat Launch & Angler Basecamp",
    template: "%s · Columbia Moorage",
  },
  description:
    "Premier Pacific Northwest riverfront RV resort, private boat launch, and angler basecamp on the Columbia River. Full hookups, glamping cabins, and an unlimited launch membership.",
  openGraph: {
    title: "Columbia Moorage",
    description:
      "Where the Columbia River meets effortless basecamp living. RV sites, glamping cabins, and a private boat launch.",
    url: "https://columbiamoorage.com",
    siteName: "Columbia Moorage",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D1F18",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full bg-driftwood font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Campground",
              name: "Columbia Moorage",
              url: "https://columbiamoorage.com",
              description:
                "Riverfront RV resort, private boat launch, and angler basecamp on the Columbia River.",
              email: "reservations@columbiamoorage.com",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}

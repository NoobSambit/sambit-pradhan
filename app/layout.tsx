import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  PERSON_NAME,
  SITE_URL,
  personEntity,
  siteRobots,
  websiteEntity,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Sambit Pradhan",
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: PERSON_NAME,
  alternates: {
    canonical: "/",
  },
  robots: siteRobots(),
  openGraph: {
    type: "website",
    siteName: PERSON_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#080d12",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [personEntity(), websiteEntity()],
          }}
        />
        {children}
      </body>
    </html>
  );
}

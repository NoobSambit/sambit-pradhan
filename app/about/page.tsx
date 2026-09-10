import type { Metadata } from "next";
import { AboutIDEWorkspace } from "@/components/os/AboutIDEWorkspace";
import { Footer } from "@/components/os/Footer";
import { Header } from "@/components/os/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { PERSON_ID, WEBSITE_ID, absoluteUrl, buildPageMetadata } from "@/lib/seo";

const ABOUT_TITLE = "About Sambit Pradhan — Backend Engineer";
const ABOUT_DESCRIPTION =
  "About Sambit Pradhan: backend engineer and 2026 VIT Vellore CSE graduate from Kolkata, India, building backend-heavy products, AI-enabled systems, and CLI tooling.";

export const metadata: Metadata = buildPageMetadata({
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="os-shell portfolio-shell about-ide-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${absoluteUrl("/about")}#profile`,
          url: absoluteUrl("/about"),
          name: ABOUT_TITLE,
          description: ABOUT_DESCRIPTION,
          isPartOf: { "@id": WEBSITE_ID },
          about: { "@id": PERSON_ID },
          mainEntity: { "@id": PERSON_ID },
        }}
      />
      <Header mode="about" />
      <div className="os-main portfolio-main about-ide-main">
        <div className="portfolio-content">
          <AboutIDEWorkspace />
        </div>
      </div>
      <Footer />
    </main>
  );
}

import type { Metadata } from "next";

/**
 * Central SEO configuration for sambitpradhan.in.
 *
 * One canonical production origin is used everywhere. Never derive
 * canonical / Open Graph / sitemap / structured-data URLs from
 * window.location, request hosts, VERCEL_URL, or preview hostnames.
 */

export const SITE_URL = "https://sambitpradhan.in";

export const PERSON_NAME = "Sambit Pradhan";
export const SITE_NAME = "Sambit Pradhan";
export const SITE_ALTERNATE_NAME = "Sambit OS";
export const PRIMARY_ROLE = "Backend Engineer";

export const DEFAULT_TITLE = "Sambit Pradhan — Backend Engineer";
export const DEFAULT_DESCRIPTION =
  "Sambit Pradhan is a backend-focused software engineer and 2026 VIT Vellore CSE graduate building backend-heavy, full-stack, and AI-enabled products.";

export const OG_IMAGE_PATH = "/og-image-1200x630.png";
export const DEFAULT_OG_IMAGE = {
  url: absoluteUrl(OG_IMAGE_PATH),
  width: 1200,
  height: 630,
  alt: "Sambit Pradhan — Backend Engineer · Full-Stack Engineer · Sambit OS",
};

/** Stable machine-readable identity anchors. */
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Build an absolute canonical URL for a site path. */
export function absoluteUrl(path = "/"): string {
  if (!path.startsWith("/")) return `${SITE_URL}/${path}`;
  return `${SITE_URL}${path}`;
}

/**
 * Preview deployments must never compete with production in search.
 * Only an explicit Vercel preview environment opts out of indexing;
 * every other environment (including unknown hosts) stays indexable so
 * production can never be accidentally noindexed.
 */
function previewNoindex(): boolean {
  return process.env.VERCEL_ENV === "preview";
}

export function siteRobots(): Metadata["robots"] {
  if (previewNoindex()) {
    return {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    };
  }
  return { index: true, follow: true };
}

type PageMetadataInput = {
  title: string;
  description: string;
  /** Canonical site path, e.g. "/about" or "/projects/armyverse". */
  path: string;
};

/**
 * Consistent per-route metadata: canonical URL, Open Graph, and a
 * branded Open Graph image and large Twitter card.
 */
export function buildPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  return {
    // Absolute: titles are already fully formed ("X — Sambit Pradhan"),
    // so the root template must not append a second "| Sambit Pradhan".
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: siteRobots(),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

/** Factual Person entity. Only uses identity facts present in the repo. */
export function personEntity() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON_NAME,
    alternateName: "NoobSambit",
    description:
      "Backend-focused software engineer and 2026 VIT Vellore CSE graduate.",
    url: `${SITE_URL}/`,
    jobTitle: PRIMARY_ROLE,
    homeLocation: {
      "@type": "City",
      name: "Kolkata, India",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Vellore Institute of Technology",
    },
    knowsAbout: [
      "Backend Engineering",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "System Design",
      "Next.js",
      "AI Agents",
    ],
    sameAs: ["https://github.com/NoobSambit"],
  };
}

export function websiteEntity() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    alternateName: [SITE_ALTERNATE_NAME, "sambitpradhan.in"],
    publisher: { "@id": PERSON_ID },
  };
}

type WebPageInput = {
  path: string;
  name: string;
  description: string;
};

/** Base WebPage node wired into the global entity graph. */
export function webPageEntity({ path, name, description }: WebPageInput) {
  const url = absoluteUrl(path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}

export function breadcrumbEntity(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

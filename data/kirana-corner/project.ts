import type { KiranaNavItem } from "./types";

export const kiranaProject = {
  name: "Kirana Corner",
  mark: "KC",
  tagline:
    "A hyperlocal marketplace that lets neighborhood shops sell directly online",
  repository: "NoobSambit/KIRANA-CORNER",
  repositoryUrl: "https://github.com/NoobSambit/KIRANA-CORNER",
  updated: "Latest local commit: Jul 2026",
  overview: [
    "Kirana Corner connects nearby customers directly with neighborhood kirana shops instead of routing orders through a central warehouse. Customers discover shops on a map, browse local catalogues, manage a cart and address, then place an order that the selected shop fulfills itself.",
    "The Vite + React application combines Firebase Auth, Firestore realtime collections, React Leaflet proximity discovery, role-protected customer and merchant flows, and a Vercel recipe assistant. The assistant uses Gemini only on the server, resolves ingredient intent against nearby, in-stock catalogues, and returns transparent matches rather than pretending unavailable products exist.",
  ],
  evidence: [
    ["Product surface", "14 pages · role-protected routes"],
    ["Live commerce", "Shops · products · orders · addresses"],
    ["Map discovery", "Leaflet + Haversine distance filters"],
    ["Recipe assistant", "Gemini + nearby catalog matching"],
  ],
  stack: [
    "Vite",
    "React 18",
    "TypeScript",
    "Firebase Auth",
    "Firestore",
    "React Leaflet",
    "Tailwind CSS",
    "Vercel Functions",
    "Gemini",
    "Framer Motion",
  ],
  timeline: [
    [
      "Marketplace foundation",
      "2025",
      "Created customer and shop-owner roles, Firestore shop/catalogue records, and protected routes.",
    ],
    [
      "Local discovery",
      "2025",
      "Added Leaflet discovery, zoom-aware radius filtering, shop details, and product browsing.",
    ],
    [
      "Commerce loops",
      "2025",
      "Added cart persistence, addresses, mock payment, order tracking, and merchant inventory controls.",
    ],
    [
      "Premium storefront",
      "2026",
      "Reworked landing, product-card, account, and mobile navigation experience.",
    ],
    [
      "Recipe assistant",
      "Jul 2026",
      "Added server-only Gemini recipe planning and nearby ingredient-to-cart suggestions.",
    ],
  ],
} as const;

export const kiranaNavigation: KiranaNavItem[] = [
  { id: "overview", label: "Overview", icon: "▣" },
  { id: "features", label: "Feature catalogue", icon: "✦" },
  { id: "architecture", label: "Architecture & workflows", icon: "◇" },
];

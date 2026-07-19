import type { KiranaArchitectureMap } from "./types";
const support = (
  requestPath: [string, string][],
  modules: KiranaArchitectureMap["support"]["modules"],
  decisions: [string, string][],
  safeguards: string[],
  operationalPath: string[],
) => ({ requestPath, modules, decisions, safeguards, operationalPath });

export const kiranaArchitectureMaps: KiranaArchitectureMap[] = [
  {
    id: "marketplace-runtime",
    group: "Platform",
    title: "Hyperlocal marketplace runtime",
    summary:
      "A Vite React client coordinates Firebase Auth, Firestore commerce data, map discovery, and a Vercel-only recipe API. The browser never receives Gemini credentials.",
    source:
      "Vite · React · Firebase Auth · Firestore · React Leaflet · Vercel Functions · Gemini",
    engineeringNotes: [
      "Firebase owns identity and marketplace records while the serverless assistant adds only its bounded recipe capability.",
      "Client components call focused shop, product, and order utilities instead of embedding Firestore access across pages.",
    ],
    support: support(
      [
        [
          "Customer action",
          "A route or drawer initiates discovery, shopping, or a role-specific task.",
        ],
        ["Identity", "Firebase resolves the active customer or shop owner."],
        [
          "Data service",
          "Focused utilities query or subscribe to Firestore collections.",
        ],
        [
          "Specialized backend",
          "Recipe requests use a Vercel serverless boundary.",
        ],
        [
          "Rendered state",
          "The UI updates catalogue, cart, dashboard, or recipe suggestions.",
        ],
      ],
      [
        ["React routes", "customer and merchant workspace", "purple"],
        ["Firebase Auth", "role-aware identity", "cyan"],
        ["Firestore services", "shops, products, orders", "green"],
        ["Recipe API", "server-only Gemini path", "amber"],
      ],
      [
        [
          "Focused data services",
          "Commerce queries stay out of rendering components.",
        ],
        ["Role-protected access", "Navigation is not the only merchant guard."],
        [
          "Server-only secret",
          "Gemini configuration never enters Vite variables.",
        ],
      ],
      [
        "Protected routes",
        "Firestore scope",
        "Environment validation",
        "Server-only Gemini",
        "Bounded API body",
        "Realtime subscriptions",
      ],
      ["React client", "Auth / services", "Firestore or API", "Live UI state"],
    ),
    nodes: [
      {
        id: "ui",
        label: "React storefront",
        detail: "routes · drawers · dashboards",
        tone: "purple",
        x: 110,
        y: 90,
      },
      {
        id: "auth",
        label: "Firebase Auth",
        detail: "customer or shopowner",
        tone: "cyan",
        x: 330,
        y: 90,
      },
      {
        id: "services",
        label: "Commerce services",
        detail: "shop · product · order",
        tone: "green",
        x: 550,
        y: 200,
      },
      {
        id: "store",
        label: "Firestore",
        detail: "shops · products · orders",
        tone: "amber",
        x: 330,
        y: 410,
      },
      {
        id: "map",
        label: "Map discovery",
        detail: "Leaflet + geoUtils",
        tone: "purple",
        x: 780,
        y: 100,
      },
      {
        id: "api",
        label: "Recipe API",
        detail: "Vercel + Gemini",
        tone: "cyan",
        x: 780,
        y: 350,
      },
    ],
    edges: [
      { from: "ui", to: "auth" },
      { from: "auth", to: "services" },
      { from: "services", to: "store" },
      { from: "ui", to: "map" },
      { from: "ui", to: "api" },
      { from: "api", to: "store", label: "catalogue reads" },
    ],
  },
  {
    id: "local-discovery",
    group: "Discovery",
    title: "Map radius & shop discovery",
    summary:
      "Customer location, map zoom, and Haversine distance determine which nearby shops are visible and which catalogue can become a fulfilment path.",
    source:
      "MapSection · React Leaflet · geoUtils.ts · shopService.js · ShopDetails",
    engineeringNotes: [
      "Geographic calculations are isolated in geoUtils, keeping Leaflet rendering focused on markers and interactions.",
      "The discovery radius is responsive to zoom and does not imply a merchant’s delivery promise.",
    ],
    support: support(
      [
        ["Get location", "Use customer coordinates for discovery context."],
        [
          "Read map state",
          "Use zoom and bounds to choose a useful search radius.",
        ],
        [
          "Calculate distance",
          "Haversine helpers measure each shop from the customer.",
        ],
        ["Filter shops", "Keep only shops within the active discovery radius."],
        ["Open catalogue", "Marker popup routes to the selected shop."],
      ],
      [
        ["Location input", "customer coordinates", "purple"],
        ["Map state", "zoom and bounds", "cyan"],
        ["Geo helpers", "Haversine and distance filter", "green"],
        ["Shop markers", "route into local catalogue", "amber"],
      ],
      [
        ["Shared geo logic", "Distance rules are testable without the map UI."],
        [
          "Discovery vs delivery",
          "A visible shop still exposes its own delivery conditions.",
        ],
        ["Shop route", "Markers do not duplicate catalogue state."],
      ],
      [
        "Finite coordinates",
        "Zoom-aware radius",
        "Bounded filters",
        "Shop status",
        "Delivery visibility",
        "Popup route",
      ],
      [
        "Customer location",
        "Map state",
        "Distance filter",
        "Shop markers",
        "Catalogue",
      ],
    ),
    nodes: [
      {
        id: "location",
        label: "Customer location",
        detail: "lat · lng",
        tone: "purple",
        x: 110,
        y: 90,
      },
      {
        id: "map",
        label: "Leaflet map",
        detail: "zoom · bounds · markers",
        tone: "cyan",
        x: 340,
        y: 90,
      },
      {
        id: "geo",
        label: "geoUtils",
        detail: "Haversine distance",
        tone: "green",
        x: 560,
        y: 190,
      },
      {
        id: "shops",
        label: "Nearby shops",
        detail: "filtered Firestore records",
        tone: "amber",
        x: 350,
        y: 350,
      },
      {
        id: "catalogue",
        label: "Shop catalogue",
        detail: "fulfilment-relevant products",
        tone: "purple",
        x: 690,
        y: 410,
      },
    ],
    edges: [
      { from: "location", to: "map" },
      { from: "map", to: "geo" },
      { from: "geo", to: "shops" },
      { from: "shops", to: "catalogue" },
    ],
  },
  {
    id: "customer-checkout",
    group: "Commerce",
    title: "Cart, address & order creation",
    summary:
      "A customer adds catalogued products to a persistent cart, selects a saved delivery address, completes the current mock payment step, creates an order, and updates product stock through the commerce utilities.",
    source:
      "CartContext · CartDrawer · AddressSelector · orderUtils.js · productService.js",
    engineeringNotes: [
      "Cart persistence prevents local navigation from accidentally losing an active basket.",
      "Mock payment is deliberately distinct from order creation; this codebase does not claim a live payment gateway.",
    ],
    support: support(
      [
        ["Add products", "Product cards update the shared cart context."],
        [
          "Persist basket",
          "Cart state remains available through local persistence.",
        ],
        [
          "Select address",
          "Customer explicitly chooses a user-scoped delivery address.",
        ],
        ["Create order", "Order utility writes customer and shop references."],
        [
          "Update inventory",
          "Dedicated stock utility decrements purchased products.",
        ],
      ],
      [
        ["Cart context", "persistent selected items", "purple"],
        ["Address book", "user-scoped delivery data", "cyan"],
        ["Order record", "customer and shop handoff", "green"],
        ["Stock update", "post-order product quantity", "amber"],
      ],
      [
        [
          "Explicit address",
          "Discovery location is not silently used as checkout address.",
        ],
        [
          "Dedicated stock path",
          "Product cards do not directly write inventory.",
        ],
        ["Mock payment honesty", "No implied payment capture or settlement."],
      ],
      [
        "Quantity validation",
        "Address selection",
        "Shop references",
        "Stock update helper",
        "Cart persistence",
        "Order feedback",
      ],
      ["Product card", "Cart", "Address", "Order", "Stock update"],
    ),
    nodes: [
      {
        id: "product",
        label: "Product selection",
        detail: "catalogue card action",
        tone: "purple",
        x: 110,
        y: 90,
      },
      {
        id: "cart",
        label: "Cart context",
        detail: "quantity and local persistence",
        tone: "cyan",
        x: 340,
        y: 90,
      },
      {
        id: "address",
        label: "Address selector",
        detail: "user delivery choice",
        tone: "green",
        x: 570,
        y: 90,
      },
      {
        id: "order",
        label: "Order record",
        detail: "customer + shop references",
        tone: "amber",
        x: 430,
        y: 300,
      },
      {
        id: "stock",
        label: "Stock decrement",
        detail: "dedicated product utility",
        tone: "purple",
        x: 720,
        y: 410,
      },
    ],
    edges: [
      { from: "product", to: "cart" },
      { from: "cart", to: "address" },
      { from: "address", to: "order" },
      { from: "order", to: "stock" },
    ],
  },
  {
    id: "merchant-inventory",
    group: "Merchant",
    title: "Merchant catalogue & inventory",
    summary:
      "Shop-owner routes expose product creation, profile editing, stock visibility, and bulk inventory updates while the product service owns Firestore CRUD and realtime catalogue refreshes.",
    source:
      "ShopOwnerDashboard · ProductForm · ShopProfileEditor · InventoryModal · productService.js · shopService.js",
    engineeringNotes: [
      "Merchant-only controls sit behind protected role-aware flows instead of a cosmetic hidden button.",
      "Bulk inventory updates support the real shop use case of availability changing across many items together.",
    ],
    support: support(
      [
        [
          "Authorize owner",
          "Protected route resolves the merchant experience.",
        ],
        ["Load shop scope", "Read the owner’s shop and products."],
        ["Edit catalogue", "Use form or inventory modal for product changes."],
        ["Persist change", "Product service applies the Firestore mutation."],
        [
          "Refresh view",
          "Realtime subscription or query updates the merchant and customer surfaces.",
        ],
      ],
      [
        ["Protected dashboard", "merchant route boundary", "purple"],
        ["Product form", "create and edit product data", "cyan"],
        ["Inventory modal", "bulk stock updates", "green"],
        ["Realtime catalogue", "affected customer visibility", "amber"],
      ],
      [
        ["Owner-only controls", "Role drives access, not only layout."],
        ["Service boundary", "Firestore writes are centralized."],
        ["Bulk path", "Inventory changes are operationally efficient."],
      ],
      [
        "ProtectedRoute",
        "Shop scope",
        "Stock validation",
        "Bulk update",
        "Realtime subscription",
        "Toast feedback",
      ],
      [
        "Owner",
        "Dashboard",
        "Form / modal",
        "Product service",
        "Live catalogue",
      ],
    ),
    nodes: [
      {
        id: "owner",
        label: "Shop owner",
        detail: "authenticated merchant",
        tone: "purple",
        x: 120,
        y: 90,
      },
      {
        id: "dash",
        label: "Merchant dashboard",
        detail: "orders and catalogue",
        tone: "cyan",
        x: 350,
        y: 90,
      },
      {
        id: "form",
        label: "Product form",
        detail: "product and profile edits",
        tone: "green",
        x: 580,
        y: 90,
      },
      {
        id: "inventory",
        label: "Inventory modal",
        detail: "bulk availability updates",
        tone: "amber",
        x: 350,
        y: 300,
      },
      {
        id: "service",
        label: "Product service",
        detail: "Firestore CRUD + subscription",
        tone: "purple",
        x: 680,
        y: 410,
      },
    ],
    edges: [
      { from: "owner", to: "dash" },
      { from: "dash", to: "form" },
      { from: "dash", to: "inventory" },
      { from: "form", to: "service" },
      { from: "inventory", to: "service" },
    ],
  },
  {
    id: "recipe-cart",
    group: "Intelligence",
    title: "Recipe-to-cart assistant",
    summary:
      "A constrained Vercel API validates a recipe request, asks Gemini for a structured cooking plan, reads nearby shops and in-stock products through Admin Firestore, and returns transparent ingredient suggestions ready for cart selection.",
    source:
      "POST /api/recipe-cart-suggestions · recipeAssistant.ts · Gemini · Firebase Admin · Firestore",
    engineeringNotes: [
      "The endpoint caps body size at 4 KB, recipe text at 300 characters, radius at 5 km, and servings at 20 before any provider call.",
      "Gemini key configuration stays server-only; a valid recipe plan does not bypass local product and availability matching.",
    ],
    support: support(
      [
        [
          "Validate request",
          "Check recipe text, coordinates, radius, servings, and diet preferences.",
        ],
        [
          "Plan recipe",
          "Use bounded Gemini output and cache repeated intent requests.",
        ],
        [
          "Read local catalogue",
          "Fetch nearby active shops and their in-stock products.",
        ],
        [
          "Match ingredients",
          "Score canonical names, aliases, tags, substitutes, distance, and stock.",
        ],
        [
          "Return suggestions",
          "Separate matched, low-confidence, and unmatched ingredients.",
        ],
      ],
      [
        ["Request guard", "compact validated API payload", "purple"],
        ["Gemini plan", "recipe ingredients and steps", "cyan"],
        ["Nearby catalogue", "Admin Firestore reads", "green"],
        ["Ingredient matches", "confidence and reasons", "amber"],
      ],
      [
        ["Server-only provider", "No Gemini key is exposed to browser code."],
        ["Catalogue first", "LLM output cannot fabricate availability."],
        [
          "Transparent uncertainty",
          "Low-confidence and unavailable items remain visible.",
        ],
      ],
      [
        "4 KB body cap",
        "Message length",
        "5 km radius cap",
        "Ingredient limit",
        "Cache limit",
        "CORS method guard",
      ],
      [
        "Recipe request",
        "Gemini plan",
        "Nearby catalog",
        "Ingredient match",
        "Cart suggestions",
      ],
    ),
    nodes: [
      {
        id: "request",
        label: "Recipe request",
        detail: "message · location · servings",
        tone: "purple",
        x: 110,
        y: 90,
      },
      {
        id: "guard",
        label: "Request validation",
        detail: "size · radius · input bounds",
        tone: "cyan",
        x: 330,
        y: 90,
      },
      {
        id: "gemini",
        label: "Gemini recipe plan",
        detail: "ingredients and steps",
        tone: "green",
        x: 570,
        y: 90,
      },
      {
        id: "shops",
        label: "Nearby shops",
        detail: "active local candidates",
        tone: "amber",
        x: 350,
        y: 300,
      },
      {
        id: "products",
        label: "In-stock products",
        detail: "catalogue evidence",
        tone: "purple",
        x: 620,
        y: 300,
      },
      {
        id: "suggestions",
        label: "Cart suggestions",
        detail: "match confidence + reasons",
        tone: "cyan",
        x: 790,
        y: 430,
      },
    ],
    edges: [
      { from: "request", to: "guard" },
      { from: "guard", to: "gemini" },
      { from: "guard", to: "shops" },
      { from: "shops", to: "products" },
      { from: "gemini", to: "suggestions" },
      { from: "products", to: "suggestions" },
    ],
  },
  {
    id: "ingredient-resolution",
    group: "Intelligence",
    title: "Local ingredient resolution",
    summary:
      "Recipe ingredients are normalized and expanded through local aliases before nearby products are ranked by canonical name, tags, substitute groups, stock, distance, and shop delivery conditions.",
    source:
      "recipeAssistant.ts · LOCAL_ALIASES · ingredientTags · substituteGroupIds · searchTokens · product matching",
    engineeringNotes: [
      "Alias expansion handles local vocabulary such as dahi/curd, jeera/cumin, and baingan/eggplant without forcing customers to use one catalog spelling.",
      "Direct matches and substitutes retain match reasons and confidence so recommendations remain explainable.",
    ],
    support: support(
      [
        [
          "Normalize intent",
          "Clean requested ingredient and quantity details.",
        ],
        ["Expand aliases", "Use local aliases and acceptable substitutes."],
        [
          "Filter candidates",
          "Keep nearby, in-stock, available product records.",
        ],
        [
          "Score evidence",
          "Evaluate names, tags, groups, distance, and stock.",
        ],
        [
          "Explain result",
          "Return recommendation, confidence, and match reasons.",
        ],
      ],
      [
        ["Ingredient intent", "requested cooking input", "purple"],
        ["Alias map", "local vocabulary expansion", "cyan"],
        ["Product evidence", "catalogue fields and availability", "green"],
        ["Ranked match", "confidence and reasons", "amber"],
      ],
      [
        [
          "Local catalogue evidence",
          "The assistant cannot turn a plausible ingredient into a false item.",
        ],
        [
          "Substitute transparency",
          "Alternative matches are labelled rather than hidden.",
        ],
        ["Distance-aware", "Nearby fulfilment context influences eligibility."],
      ],
      [
        "Alias limit",
        "Stock filter",
        "Distance filter",
        "Delivery check",
        "Confidence state",
        "Reason trace",
      ],
      ["Ingredient", "Aliases", "Candidate products", "Score", "Explain match"],
    ),
    nodes: [
      {
        id: "intent",
        label: "Ingredient intent",
        detail: "name · quantity · category",
        tone: "purple",
        x: 120,
        y: 90,
      },
      {
        id: "aliases",
        label: "Aliases & substitutes",
        detail: "local normalized vocabulary",
        tone: "cyan",
        x: 360,
        y: 90,
      },
      {
        id: "catalog",
        label: "Candidate products",
        detail: "nearby and in stock",
        tone: "green",
        x: 600,
        y: 90,
      },
      {
        id: "score",
        label: "Match scoring",
        detail: "names · tags · distance",
        tone: "amber",
        x: 410,
        y: 320,
      },
      {
        id: "result",
        label: "Explained suggestion",
        detail: "confidence + reasons",
        tone: "purple",
        x: 710,
        y: 420,
      },
    ],
    edges: [
      { from: "intent", to: "aliases" },
      { from: "aliases", to: "catalog" },
      { from: "catalog", to: "score" },
      { from: "score", to: "result" },
    ],
  },
  {
    id: "auth-roles",
    group: "Platform",
    title: "Auth & role-protected routing",
    summary:
      "Firebase identity flows through role-aware React surfaces and ProtectedRoute checks so customer shopping, merchant inventory, account actions, and dashboard access are separated by the active user role.",
    source:
      "firebase.js · Auth flows · ProtectedRoute · RoleSwitcher · Navbar · AccountDrawer · dashboard routes",
    engineeringNotes: [
      "Role-specific actions are guarded at the route boundary; menu visibility alone does not qualify a user for merchant operations.",
      "The UI uses role context to reduce clutter and keep customer and owner journeys understandable.",
    ],
    support: support(
      [
        ["Authenticate", "Firebase resolves a signed-in user."],
        ["Read role", "Load customer or shopowner context."],
        ["Evaluate route", "ProtectedRoute checks the intended surface."],
        [
          "Render navigation",
          "Navbar and account drawer expose relevant actions.",
        ],
        [
          "Open dashboard",
          "Customer or merchant view receives its scoped data.",
        ],
      ],
      [
        ["Firebase auth", "identity session", "purple"],
        ["Role context", "customer or shopowner", "cyan"],
        ["ProtectedRoute", "access boundary", "green"],
        ["Role UI", "dashboard and drawer actions", "amber"],
      ],
      [
        ["Guarded routes", "Role is not a cosmetic condition."],
        [
          "Scoped navigation",
          "Users do not need to scan irrelevant operational actions.",
        ],
        [
          "Separate dashboards",
          "Customer purchase flow and merchant operations stay distinct.",
        ],
      ],
      [
        "Firebase session",
        "ProtectedRoute",
        "Role guard",
        "Scoped dashboard",
        "Account actions",
        "Sign-out path",
      ],
      [
        "Firebase user",
        "Role context",
        "Route guard",
        "Role navigation",
        "Dashboard",
      ],
    ),
    nodes: [
      {
        id: "user",
        label: "Firebase user",
        detail: "authenticated identity",
        tone: "purple",
        x: 120,
        y: 90,
      },
      {
        id: "role",
        label: "Role context",
        detail: "customer or shopowner",
        tone: "cyan",
        x: 360,
        y: 90,
      },
      {
        id: "guard",
        label: "ProtectedRoute",
        detail: "role-aware access",
        tone: "green",
        x: 600,
        y: 90,
      },
      {
        id: "customer",
        label: "Customer dashboard",
        detail: "shops · cart · orders",
        tone: "amber",
        x: 360,
        y: 350,
      },
      {
        id: "merchant",
        label: "Merchant dashboard",
        detail: "catalogue · inventory · orders",
        tone: "purple",
        x: 700,
        y: 350,
      },
    ],
    edges: [
      { from: "user", to: "role" },
      { from: "role", to: "guard" },
      { from: "guard", to: "customer" },
      { from: "guard", to: "merchant" },
    ],
  },
];

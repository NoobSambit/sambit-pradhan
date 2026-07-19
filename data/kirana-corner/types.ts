export type KiranaFeatureCategory =
  "Discovery" | "Commerce" | "Merchant" | "Intelligence" | "Platform";

export type KiranaFeature = {
  id: string;
  title: string;
  category: KiranaFeatureCategory;
  summary: string;
  description: string;
  capabilities: string[];
  workflow: { title: string; nodes: string[] };
  engineeringNotes: string[];
};

export type KiranaView = "overview" | "features" | "architecture";
export type KiranaNavItem = { id: KiranaView; label: string; icon: string };
export type KiranaTone = "purple" | "cyan" | "green" | "amber";
export type KiranaArchitectureMap = {
  id: string;
  group: "Platform" | "Discovery" | "Commerce" | "Merchant" | "Intelligence";
  title: string;
  summary: string;
  source: string;
  engineeringNotes: string[];
  support: {
    requestPath: [string, string][];
    modules: [string, string, KiranaTone][];
    decisions: [string, string][];
    safeguards: string[];
    operationalPath: string[];
  };
  nodes: {
    id: string;
    label: string;
    detail: string;
    tone: KiranaTone;
    x: number;
    y: number;
  }[];
  edges: { from: string; to: string; label?: string }[];
};

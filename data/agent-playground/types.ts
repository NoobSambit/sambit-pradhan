export type AgentFeatureCategory =
  "Core" | "Workspace" | "Network" | "Planning" | "Telemetry";

export type AgentPlaygroundFeature = {
  id: string;
  title: string;
  category: AgentFeatureCategory;
  summary: string;
  description: string;
  capabilities: string[];
  workflow: { title: string; nodes: string[] };
  engineeringNotes: string[];
};

export type AgentPlaygroundView = "overview" | "features" | "architecture";

export type AgentPlaygroundNavItem = {
  id: AgentPlaygroundView;
  label: string;
  icon: string;
};

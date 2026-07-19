export type DocBuilderFeatureCategory =
  "Authoring" | "Intelligence" | "Collaboration" | "Output" | "Platform";

export type DocBuilderFeature = {
  id: string;
  title: string;
  category: DocBuilderFeatureCategory;
  summary: string;
  description: string;
  capabilities: string[];
  workflow: { title: string; nodes: string[] };
  engineeringNotes: string[];
};

export type DocBuilderView = "overview" | "features" | "architecture";
export type DocBuilderNavItem = {
  id: DocBuilderView;
  label: string;
  icon: string;
};

export type DocBuilderArchitectureTone = "purple" | "cyan" | "green" | "amber";
export type DocBuilderArchitectureMap = {
  id: string;
  group: "Platform" | "Authoring" | "Intelligence" | "Output";
  title: string;
  summary: string;
  source: string;
  engineeringNotes: string[];
  support: {
    requestPath: [string, string][];
    modules: [string, string, DocBuilderArchitectureTone][];
    decisions: [string, string][];
    safeguards: string[];
    operationalPath: string[];
  };
  nodes: {
    id: string;
    label: string;
    detail: string;
    tone: DocBuilderArchitectureTone;
    x: number;
    y: number;
  }[];
  edges: { from: string; to: string; label?: string }[];
};

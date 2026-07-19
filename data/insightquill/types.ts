export type InsightQuillFeature = {
  id: string;
  title: string;
  category:
    | "Administration"
    | "Identity"
    | "Assessment"
    | "Feedback"
    | "Intelligence"
    | "Reporting";
  summary: string;
  description: string;
  capabilities: string[];
  workflow: {
    title: string;
    nodes: string[];
  };
  engineeringNotes: string[];
};

export type InsightQuillView = "overview" | "features" | "architecture";

export type InsightQuillNavigationItem = {
  id: InsightQuillView;
  label: string;
  icon: string;
};

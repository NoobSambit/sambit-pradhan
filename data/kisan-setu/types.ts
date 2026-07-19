export type KisanSetuFeature = {
  id: string;
  title: string;
  category:
    | "Farm"
    | "Assistant"
    | "Schemes"
    | "Satellite"
    | "Market"
    | "Weather"
    | "Community";
  summary: string;
  description: string;
  capabilities: string[];
  workflow: { title: string; nodes: string[] };
  engineeringNotes: string[];
};

export type KisanSetuView = "overview" | "features" | "architecture";

export type KisanSetuNavigationItem = {
  id: KisanSetuView;
  label: string;
  icon: string;
};

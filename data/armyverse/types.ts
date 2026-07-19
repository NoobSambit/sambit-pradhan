export type ArmyverseFeature = {
  id: string;
  title: string;
  category: "Music" | "Data" | "Game" | "Community" | "Platform";
  summary: string;
  description: string;
  capabilities: string[];
  workflow: {
    title: string;
    nodes: string[];
  };
  engineeringNotes: string[];
};

export type ProjectNavItem = {
  id: "overview" | "features" | "architecture";
  label: string;
  icon: string;
};

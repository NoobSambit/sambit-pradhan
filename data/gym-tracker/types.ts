export type GymTrackerFeature = {
  id: string;
  title: string;
  category:
    "Foundation" | "Training" | "Progress" | "Account" | "Social" | "Quality";
  summary: string;
  description: string;
  capabilities: string[];
  workflow: { title: string; nodes: string[] };
  engineeringNotes: string[];
};

export type GymTrackerView = "overview" | "features" | "architecture";

export type GymTrackerNavigationItem = {
  id: GymTrackerView;
  label: string;
  icon: string;
};

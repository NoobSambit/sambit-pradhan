import { armyverseArchitectureMaps } from "@/data/armyverse/architecture";
import { armyverseFeatures } from "@/data/armyverse/features";
import { armyverseProject } from "@/data/armyverse/project";
import { agentArchitectureMaps } from "@/data/agent-playground/architecture";
import { agentPlaygroundFeatures } from "@/data/agent-playground/features";
import { agentPlaygroundProject } from "@/data/agent-playground/project";
import { docBuilderArchitectureMaps } from "@/data/docbuilder/architecture";
import { docBuilderFeatures } from "@/data/docbuilder/features";
import { docBuilderProject } from "@/data/docbuilder/project";
import { gymTrackerArchitectureMaps } from "@/data/gym-tracker/architecture";
import { gymTrackerFeatures } from "@/data/gym-tracker/features";
import { gymTrackerProject } from "@/data/gym-tracker/project";
import { insightQuillArchitectureMaps } from "@/data/insightquill/architecture";
import { insightQuillFeatures } from "@/data/insightquill/features";
import { insightQuillProject } from "@/data/insightquill/project";
import { kisanSetuArchitectureMaps } from "@/data/kisan-setu/architecture";
import { kisanSetuFeatures } from "@/data/kisan-setu/features";
import { kisanSetuProject } from "@/data/kisan-setu/project";
import { kiranaArchitectureMaps } from "@/data/kirana-corner/architecture";
import { kiranaFeatures } from "@/data/kirana-corner/features";
import { kiranaProject } from "@/data/kirana-corner/project";
import type { DocumentedProjectSlug } from "@/lib/projects";

export type MobileFeature = {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  capabilities: readonly string[];
  workflow: { title: string; nodes: readonly string[] };
  engineeringNotes: readonly string[];
};

export type MobileArchitectureMap = {
  id: string;
  group: string;
  title: string;
  summary: string;
  source: string;
  engineeringNotes: readonly string[];
  support: {
    requestPath: readonly (readonly [string, string])[];
    modules: readonly (readonly [string, string, string])[];
    decisions: readonly (readonly [string, string])[];
    safeguards: readonly string[];
    operationalPath: readonly string[];
  };
  nodes: readonly {
    id: string;
    label: string;
    detail: string;
    tone: string;
    x: number;
    y: number;
  }[];
  edges: readonly { from: string; to: string; label?: string }[];
};

export type MobileProjectDocument = {
  name: string;
  mark: string;
  tagline: string;
  repository: string;
  repositoryUrl: string;
  liveUrl?: string;
  docsUrl?: string;
  version?: string;
  updated: string;
  overview: readonly string[];
  evidence: readonly (readonly [string, string])[];
  stack: readonly string[];
  timeline: readonly (readonly [string, string, string])[];
};

export const mobileProjectDocuments: Record<
  DocumentedProjectSlug,
  MobileProjectDocument
> = {
  armyverse: armyverseProject,
  "agent-playground": agentPlaygroundProject,
  docbuilder: docBuilderProject,
  "gym-tracker": gymTrackerProject,
  "kirana-corner": kiranaProject,
  insightquill: insightQuillProject,
  "kisan-setu": kisanSetuProject,
};

export const mobileProjectFeatures: Record<
  DocumentedProjectSlug,
  readonly MobileFeature[]
> = {
  armyverse: armyverseFeatures,
  "agent-playground": agentPlaygroundFeatures,
  docbuilder: docBuilderFeatures,
  "gym-tracker": gymTrackerFeatures,
  "kirana-corner": kiranaFeatures,
  insightquill: insightQuillFeatures,
  "kisan-setu": kisanSetuFeatures,
};

export const mobileProjectArchitectureMaps: Record<
  DocumentedProjectSlug,
  readonly MobileArchitectureMap[]
> = {
  armyverse: armyverseArchitectureMaps,
  "agent-playground": agentArchitectureMaps,
  docbuilder: docBuilderArchitectureMaps,
  "gym-tracker": gymTrackerArchitectureMaps,
  "kirana-corner": kiranaArchitectureMaps,
  insightquill: insightQuillArchitectureMaps,
  "kisan-setu": kisanSetuArchitectureMaps,
};

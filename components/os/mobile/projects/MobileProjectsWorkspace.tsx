"use client";

import { MobileProjectDetailWorkspace } from "./MobileProjectDetailWorkspace";
import { MobileRepositoryWorkspace } from "./MobileRepositoryWorkspace";
import type { DocumentedProjectSlug } from "@/lib/projects";

export function MobileProjectsWorkspace({
  initialProject,
}: {
  initialProject?: DocumentedProjectSlug;
}) {
  return initialProject ? (
    <MobileProjectDetailWorkspace slug={initialProject} />
  ) : (
    <MobileRepositoryWorkspace />
  );
}

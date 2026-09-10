import { ProjectUiIcon } from "@/components/os/projects/ProjectUiIcon";

type ProjectActionIconType = "github" | "live" | "docs";

export function ProjectActionIcon({ type }: { type: ProjectActionIconType }) {
  if (type === "github")
    return <ProjectUiIcon name="github" size="sm" className="project-action-icon" />;
  if (type === "live")
    return <ProjectUiIcon name="external-link" size="sm" className="project-action-icon" />;
  return <ProjectUiIcon name="documentation" size="sm" className="project-action-icon" />;
}

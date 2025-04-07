
import { Badge } from "@/components/ui/badge";
import { ProjectStatus } from "@/types";

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const getStatusDetails = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.PENDING:
        return {
          label: "Pendiente",
          variant: "secondary" as const,
        };
      case ProjectStatus.IN_PROGRESS:
        return {
          label: "En progreso",
          variant: "default" as const,
        };
      case ProjectStatus.COMPLETED:
        return {
          label: "Finalizado",
          variant: "outline" as const,
        };
      default:
        return {
          label: status,
          variant: "secondary" as const,
        };
    }
  };

  const { label, variant } = getStatusDetails(status);

  return <Badge variant={variant}>{label}</Badge>;
}

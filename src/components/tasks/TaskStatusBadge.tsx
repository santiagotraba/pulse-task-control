
import { Badge } from "@/components/ui/badge";
import { TaskStatus } from "@/types";

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const getStatusDetails = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDING:
        return {
          label: "Pendiente",
          variant: "secondary" as const,
        };
      case TaskStatus.IN_PROGRESS:
        return {
          label: "En progreso",
          variant: "default" as const,
        };
      case TaskStatus.COMPLETED:
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

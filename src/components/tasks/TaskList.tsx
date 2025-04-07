
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/types";
import { format } from "date-fns";
import { Edit2, Trash2 } from "lucide-react";
import { TaskStatusBadge } from "./TaskStatusBadge";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <div className="text-center text-muted-foreground p-4">No hay tareas para este proyecto</div>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardHeader className="py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                {task.title}
                <TaskStatusBadge status={task.status} />
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onEdit(task)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onDelete(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="py-2">
            <p className="text-sm text-muted-foreground mb-2">
              {task.description}
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <span className="text-muted-foreground">Asignado: </span>
                {task.assignee}
              </div>
              <div>
                <span className="text-muted-foreground">Fecha límite: </span>
                {format(new Date(task.dueDate), "dd/MM/yyyy")}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

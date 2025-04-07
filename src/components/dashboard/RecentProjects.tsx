
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, ProjectStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface RecentProjectsProps {
  projects: Project[];
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  // Sort projects by createdAt (descending) and take the 5 most recent
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getStatusBadgeVariant = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.PENDING:
        return "secondary";
      case ProjectStatus.IN_PROGRESS:
        return "default";
      case ProjectStatus.COMPLETED:
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.PENDING:
        return "Pendiente";
      case ProjectStatus.IN_PROGRESS:
        return "En progreso";
      case ProjectStatus.COMPLETED:
        return "Finalizado";
      default:
        return status;
    }
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Proyectos recientes</CardTitle>
          <CardDescription>
            Los 5 proyectos más recientes
          </CardDescription>
        </div>
        <Button size="sm" asChild>
          <Link to="/projects">Ver todos</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between border rounded-md p-4"
            >
              <div className="space-y-1">
                <div className="flex items-center">
                  <Link 
                    to={`/projects/${project.id}`}
                    className="font-medium hover:underline"
                  >
                    {project.name}
                  </Link>
                  <Badge 
                    variant={getStatusBadgeVariant(project.status)} 
                    className="ml-2"
                  >
                    {getStatusLabel(project.status)}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Cliente: {project.client}, {project.country}
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-x-2">
                  <div className="flex items-center">
                    <UserIcon className="h-3 w-3 mr-1" />
                    {project.manager}
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {format(new Date(project.startDate), "dd/MM/yyyy")} - {format(new Date(project.endDate), "dd/MM/yyyy")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

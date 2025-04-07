
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project } from "@/types";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Edit2, Eye, Trash2 } from "lucide-react";

interface ProjectsTableProps {
  projects: Project[];
  onDelete: (id: string) => void;
}

export function ProjectsTable({ projects, onDelete }: ProjectsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>País</TableHead>
            <TableHead>Responsable</TableHead>
            <TableHead>Fecha inicio</TableHead>
            <TableHead>Fecha fin</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>{project.client}</TableCell>
              <TableCell>{project.country}</TableCell>
              <TableCell>{project.manager}</TableCell>
              <TableCell>{format(new Date(project.startDate), "dd/MM/yyyy")}</TableCell>
              <TableCell>{format(new Date(project.endDate), "dd/MM/yyyy")}</TableCell>
              <TableCell>
                <ProjectStatusBadge status={project.status} />
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button size="icon" variant="ghost" asChild>
                    <Link to={`/projects/${project.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="icon" variant="ghost" asChild>
                    <Link to={`/projects/edit/${project.id}`}>
                      <Edit2 className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => onDelete(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


import { AppLayout } from "@/components/layout/AppLayout";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { mockProjects } from "@/data/mockData";
import { ProjectStatus } from "@/types";
import { useNavigate, useParams } from "react-router-dom";

interface ProjectFormData {
  name: string;
  client: string;
  country: string;
  manager: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
}

export default function ProjectEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real application, fetch project data from an API
  const project = mockProjects.find(p => p.id === id);

  if (!project) {
    return (
      <AppLayout>
        <div className="py-12 text-center">
          <h2 className="text-2xl font-bold">Proyecto no encontrado</h2>
          <p className="mt-2 text-muted-foreground">
            No se encontró el proyecto con el ID: {id}
          </p>
          <button
            className="mt-4 underline text-blue-500"
            onClick={() => navigate("/projects")}
          >
            Volver a Proyectos
          </button>
        </div>
      </AppLayout>
    );
  }

  const handleUpdateProject = (data: ProjectFormData) => {
    // In a real application, make an API call to update the project
    const index = mockProjects.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProjects[index] = { ...mockProjects[index], ...data };
    }
    navigate(`/projects/${id}`);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Editar Proyecto</h1>
        <div className="border rounded-lg p-6">
          <ProjectForm project={project} onSubmit={handleUpdateProject} />
        </div>
      </div>
    </AppLayout>
  );
}

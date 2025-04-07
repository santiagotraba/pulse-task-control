
import { AppLayout } from "@/components/layout/AppLayout";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { mockProjects } from "@/data/mockData";
import { Project, ProjectStatus } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

interface ProjectFormData {
  name: string;
  client: string;
  country: string;
  manager: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
}

export default function ProjectCreate() {
  const navigate = useNavigate();

  const handleCreateProject = (data: ProjectFormData) => {
    const newProject: Project = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    
    // In a real application, we would make an API call here
    console.log("Creating project:", newProject);
    mockProjects.push(newProject);
    navigate("/projects");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Nuevo Proyecto</h1>
        <div className="border rounded-lg p-6">
          <ProjectForm onSubmit={handleCreateProject} />
        </div>
      </div>
    </AppLayout>
  );
}

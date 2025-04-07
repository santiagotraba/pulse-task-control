
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockProjects, mockTasks } from "@/data/mockData";
import { Project, Task, TaskStatus } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, Edit2, PlusCircle, Users } from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskForm } from "@/components/tasks/TaskForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  assignee: string;
}

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    // In a real application, fetch project and tasks from an API
    const foundProject = mockProjects.find((p) => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      setTasks(mockTasks.filter((task) => task.projectId === id));
    }
  }, [id]);

  const handleAddTask = (data: TaskFormData) => {
    const newTask: Task = {
      ...data,
      id: uuidv4(),
      projectId: id || "",
    };

    setTasks([...tasks, newTask]);
    mockTasks.push(newTask);
    setIsAddTaskOpen(false);
    
    toast({
      title: "Tarea creada",
      description: "La tarea ha sido creada exitosamente.",
    });
  };

  const handleUpdateTask = (data: TaskFormData) => {
    if (!editingTask) return;
    
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id ? { ...task, ...data } : task
    );
    
    setTasks(updatedTasks);
    
    // Update in mock data
    const index = mockTasks.findIndex((t) => t.id === editingTask.id);
    if (index !== -1) {
      mockTasks[index] = { ...mockTasks[index], ...data };
    }
    
    setEditingTask(null);
    
    toast({
      title: "Tarea actualizada",
      description: "La tarea ha sido actualizada exitosamente.",
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    
    // Remove from mock data
    const index = mockTasks.findIndex((t) => t.id === taskId);
    if (index !== -1) {
      mockTasks.splice(index, 1);
    }
    
    toast({
      title: "Tarea eliminada",
      description: "La tarea ha sido eliminada exitosamente.",
    });
  };

  // If project not found
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

  // Group tasks by status
  const pendingTasks = tasks.filter((task) => task.status === TaskStatus.PENDING);
  const inProgressTasks = tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS);
  const completedTasks = tasks.filter((task) => task.status === TaskStatus.COMPLETED);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <Button asChild>
            <a href={`/projects/edit/${project.id}`}>
              <Edit2 className="h-4 w-4 mr-2" />
              Editar Proyecto
            </a>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Detalles del Proyecto
              <ProjectStatusBadge status={project.status} />
            </CardTitle>
            <CardDescription>{project.client}, {project.country}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-muted-foreground mr-2">Responsable:</span>
                <span>{project.manager}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span className="text-muted-foreground mr-2">Duración:</span>
                <span>
                  {format(new Date(project.startDate), "dd/MM/yyyy")} - {format(new Date(project.endDate), "dd/MM/yyyy")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Tareas</h2>
          <Button onClick={() => setIsAddTaskOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Añadir Tarea
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4 w-full md:w-1/2">
            <TabsTrigger value="all">Todas ({tasks.length})</TabsTrigger>
            <TabsTrigger value="pending">Pendientes ({pendingTasks.length})</TabsTrigger>
            <TabsTrigger value="in-progress">En Progreso ({inProgressTasks.length})</TabsTrigger>
            <TabsTrigger value="completed">Finalizadas ({completedTasks.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <TaskList 
              tasks={tasks} 
              onEdit={setEditingTask} 
              onDelete={handleDeleteTask} 
            />
          </TabsContent>
          <TabsContent value="pending">
            <TaskList 
              tasks={pendingTasks} 
              onEdit={setEditingTask} 
              onDelete={handleDeleteTask} 
            />
          </TabsContent>
          <TabsContent value="in-progress">
            <TaskList 
              tasks={inProgressTasks} 
              onEdit={setEditingTask} 
              onDelete={handleDeleteTask} 
            />
          </TabsContent>
          <TabsContent value="completed">
            <TaskList 
              tasks={completedTasks} 
              onEdit={setEditingTask} 
              onDelete={handleDeleteTask} 
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog for adding new task */}
      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Añadir nueva tarea</DialogTitle>
          </DialogHeader>
          <TaskForm 
            onSubmit={handleAddTask}
            onCancel={() => setIsAddTaskOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog for editing task */}
      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar tarea</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <TaskForm 
              task={editingTask}
              onSubmit={handleUpdateTask}
              onCancel={() => setEditingTask(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

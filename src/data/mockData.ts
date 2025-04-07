
import { Project, ProjectStatus, Task, TaskStatus } from "../types";

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Rediseño de sitio web corporativo",
    client: "TechCorp Inc.",
    country: "Estados Unidos",
    manager: "Ana Martínez",
    startDate: "2023-01-15",
    endDate: "2023-04-30",
    status: ProjectStatus.COMPLETED,
    createdAt: "2023-01-10"
  },
  {
    id: "2",
    name: "Implementación de CRM",
    client: "Grupo Innovación",
    country: "España",
    manager: "Carlos Rodríguez",
    startDate: "2023-02-20",
    endDate: "2023-08-10",
    status: ProjectStatus.IN_PROGRESS,
    createdAt: "2023-02-15"
  },
  {
    id: "3",
    name: "Desarrollo de app móvil",
    client: "FreshStart",
    country: "México",
    manager: "Laura Gómez",
    startDate: "2023-03-01",
    endDate: "2023-09-30",
    status: ProjectStatus.IN_PROGRESS,
    createdAt: "2023-02-25"
  },
  {
    id: "4",
    name: "Migración de infraestructura a la nube",
    client: "DataSys",
    country: "Colombia",
    manager: "Javier López",
    startDate: "2023-04-10",
    endDate: "2023-07-15",
    status: ProjectStatus.PENDING,
    createdAt: "2023-04-05"
  },
  {
    id: "5",
    name: "Implantación de BI",
    client: "Analytics Pro",
    country: "Argentina",
    manager: "Roberto García",
    startDate: "2023-05-01",
    endDate: "2023-11-30",
    status: ProjectStatus.PENDING,
    createdAt: "2023-04-25"
  },
  {
    id: "6",
    name: "Desarrollo de e-commerce",
    client: "Fashion Trends",
    country: "Chile",
    manager: "Carmen Díaz",
    startDate: "2023-01-20",
    endDate: "2023-05-20",
    status: ProjectStatus.COMPLETED,
    createdAt: "2023-01-15"
  }
];

export const mockTasks: Task[] = [
  {
    id: "101",
    projectId: "1",
    title: "Análisis de requerimientos",
    description: "Realizar entrevistas con stakeholders para definir requerimientos",
    status: TaskStatus.COMPLETED,
    dueDate: "2023-01-30",
    assignee: "Elena Sánchez"
  },
  {
    id: "102",
    projectId: "1",
    title: "Diseño de wireframes",
    description: "Crear wireframes para todas las páginas principales",
    status: TaskStatus.COMPLETED,
    dueDate: "2023-02-15",
    assignee: "Pablo Martín"
  },
  {
    id: "103",
    projectId: "1",
    title: "Desarrollo frontend",
    description: "Implementar diseño responsive en React",
    status: TaskStatus.COMPLETED,
    dueDate: "2023-03-30",
    assignee: "Lucía Torres"
  },
  {
    id: "201",
    projectId: "2",
    title: "Configuración inicial",
    description: "Configurar instancia y parámetros básicos",
    status: TaskStatus.COMPLETED,
    dueDate: "2023-03-10",
    assignee: "Marcos Ruiz"
  },
  {
    id: "202",
    projectId: "2",
    title: "Migración de datos",
    description: "Migrar datos de clientes del sistema antiguo",
    status: TaskStatus.IN_PROGRESS,
    dueDate: "2023-05-15",
    assignee: "Natalia Vidal"
  },
  {
    id: "203",
    projectId: "2",
    title: "Formación de usuarios",
    description: "Realizar sesiones de formación para los usuarios finales",
    status: TaskStatus.PENDING,
    dueDate: "2023-07-01",
    assignee: "Daniel Castro"
  },
  {
    id: "301",
    projectId: "3",
    title: "Diseño de UX/UI",
    description: "Crear diseños de alta fidelidad para la app",
    status: TaskStatus.COMPLETED,
    dueDate: "2023-04-15",
    assignee: "Marta López"
  },
  {
    id: "302",
    projectId: "3",
    title: "Desarrollo de backend",
    description: "Implementar APIs REST para la app",
    status: TaskStatus.IN_PROGRESS,
    dueDate: "2023-06-30",
    assignee: "Ramón Navarro"
  },
  {
    id: "303",
    projectId: "3",
    title: "Testing de aceptación",
    description: "Realizar pruebas con usuarios finales",
    status: TaskStatus.PENDING,
    dueDate: "2023-09-01",
    assignee: "Sofía García"
  }
];

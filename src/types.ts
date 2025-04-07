
export enum ProjectStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}

export enum TaskStatus {
  PENDING = "PENDING", 
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}

export interface Project {
  id: string;
  name: string;
  client: string;
  country: string;
  manager: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  assignee: string;
}

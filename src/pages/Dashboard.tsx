
import { AppLayout } from "@/components/layout/AppLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ProjectStatusChart } from "@/components/dashboard/ProjectStatusChart";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { mockProjects, mockTasks } from "@/data/mockData";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <StatsCards projects={mockProjects} tasks={mockTasks} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProjectStatusChart projects={mockProjects} />
          <RecentProjects projects={mockProjects} />
        </div>
      </div>
    </AppLayout>
  );
}

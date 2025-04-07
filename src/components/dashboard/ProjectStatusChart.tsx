
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Project, ProjectStatus } from "@/types";

interface ProjectStatusChartProps {
  projects: Project[];
}

const STATUS_COLORS = {
  [ProjectStatus.PENDING]: "#3B82F6", // Blue
  [ProjectStatus.IN_PROGRESS]: "#F59E0B", // Amber
  [ProjectStatus.COMPLETED]: "#10B981", // Green
};

const STATUS_LABELS = {
  [ProjectStatus.PENDING]: "Pendiente",
  [ProjectStatus.IN_PROGRESS]: "En progreso",
  [ProjectStatus.COMPLETED]: "Finalizado",
};

export function ProjectStatusChart({ projects }: ProjectStatusChartProps) {
  // Count projects by status
  const statusCounts = projects.reduce((acc, project) => {
    if (!acc[project.status]) {
      acc[project.status] = 0;
    }
    acc[project.status]++;
    return acc;
  }, {} as Record<ProjectStatus, number>);

  // Format data for recharts
  const data = Object.entries(statusCounts).map(([status, count]) => ({
    name: STATUS_LABELS[status as ProjectStatus],
    value: count,
    status: status,
  }));

  return (
    <Card className="col-span-1 h-[350px]">
      <CardHeader>
        <CardTitle>Estado de proyectos</CardTitle>
      </CardHeader>
      <CardContent className="h-[270px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={STATUS_COLORS[entry.status as ProjectStatus]} 
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

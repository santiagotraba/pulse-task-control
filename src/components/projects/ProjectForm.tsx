
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Project, ProjectStatus } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Schema for form validation
const projectSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  client: z.string().min(1, "El cliente es obligatorio"),
  country: z.string().min(1, "El país es obligatorio"),
  manager: z.string().min(1, "El responsable es obligatorio"),
  startDate: z.string().min(1, "La fecha de inicio es obligatoria"),
  endDate: z.string().min(1, "La fecha de finalización es obligatoria"),
  status: z.enum([
    ProjectStatus.PENDING,
    ProjectStatus.IN_PROGRESS,
    ProjectStatus.COMPLETED,
  ]),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: ProjectFormData) => void;
}

export function ProjectForm({ project, onSubmit }: ProjectFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize the form with project data or default values
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project
      ? {
          name: project.name,
          client: project.client,
          country: project.country,
          manager: project.manager,
          startDate: project.startDate,
          endDate: project.endDate,
          status: project.status,
        }
      : {
          name: "",
          client: "",
          country: "",
          manager: "",
          startDate: new Date().toISOString().split("T")[0],
          endDate: "",
          status: ProjectStatus.PENDING,
        },
  });

  const handleFormSubmit = (data: ProjectFormData) => {
    onSubmit(data);
    toast({
      title: project ? "Proyecto actualizado" : "Proyecto creado",
      description: project
        ? "El proyecto ha sido actualizado exitosamente."
        : "El proyecto ha sido creado exitosamente.",
    });
    navigate("/projects");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del proyecto</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del proyecto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del cliente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <FormControl>
                  <Input placeholder="País del cliente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="manager"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsable</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del responsable" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de inicio</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de finalización</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={ProjectStatus.PENDING}>
                      Pendiente
                    </SelectItem>
                    <SelectItem value={ProjectStatus.IN_PROGRESS}>
                      En progreso
                    </SelectItem>
                    <SelectItem value={ProjectStatus.COMPLETED}>
                      Finalizado
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/projects")}
          >
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Form>
  );
}


import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="text-6xl font-bold text-pulse-blue-500">404</div>
        <h1 className="text-4xl font-bold">Página no encontrada</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="mt-6"
        >
          Volver al Dashboard
        </Button>
      </div>
    </div>
  );
}


import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-h-screen">
          <div className="flex h-14 items-center border-b px-4">
            <SidebarTrigger />
            <div className="ml-auto flex items-center space-x-4">
              {/* Could add profile dropdown, notifications, etc. here later */}
            </div>
          </div>
          <div className={cn("flex-1 p-6", className)}>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

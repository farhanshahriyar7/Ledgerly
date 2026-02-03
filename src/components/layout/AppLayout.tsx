import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { useSidebarContext } from "./SidebarContext";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  const { collapsed } = useSidebarContext();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className={cn(
        "transition-all duration-300",
        collapsed ? "pl-16" : "pl-64"
      )}>
        <AppHeader title={title} subtitle={subtitle} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

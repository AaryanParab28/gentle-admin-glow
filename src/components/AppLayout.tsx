
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Search, Bell } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <header className="h-[60px] border-b bg-white flex items-center px-4 justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-medium">Inbox</h1>
              <span className="bg-intercom-purple text-xs text-white rounded-full px-2 py-0.5 font-medium">12</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell size={18} />
              </Button>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

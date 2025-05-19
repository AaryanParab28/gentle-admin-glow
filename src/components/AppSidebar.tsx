
import React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Users, 
  Settings, 
  Zap,
  Search, 
  Bell
} from "lucide-react";

export function AppSidebar() {
  const isMobile = useIsMobile();
  
  const navItems = [
    {
      title: "Inbox",
      icon: MessageSquare,
      active: true,
    },
    {
      title: "Contacts",
      icon: Users,
    },
    {
      title: "Automation",
      icon: Zap,
    },
    {
      title: "Settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar defaultCollapsed={isMobile} className="border-r">
      <SidebarHeader className="h-[60px] px-4 flex items-center">
        <div className="flex-1 flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-intercom-purple flex items-center justify-center text-white font-bold">
            H
          </div>
          <span className="font-medium text-lg">HelpPro</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>

      <div className="flex flex-col h-[calc(100vh-60px)]">
        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item, index) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className={cn(
                      "hover-lift",
                      item.active && "bg-intercom-purple-light/30 text-intercom-purple font-medium"
                    )}>
                      <Button variant="ghost" className="w-full justify-start gap-3">
                        <item.icon size={20} />
                        <span>{item.title}</span>
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarGroup>
            <SidebarGroupLabel>Teams</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover-lift">
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <span className="h-5 w-5 rounded-md bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                        S
                      </span>
                      <span>Support</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover-lift">
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <span className="h-5 w-5 rounded-md bg-green-500 flex items-center justify-center text-white text-xs font-medium">
                        M
                      </span>
                      <span>Marketing</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="avatar-ring">
              <AvatarImage src="" />
              <AvatarFallback className="bg-intercom-purple text-white">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john.doe@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

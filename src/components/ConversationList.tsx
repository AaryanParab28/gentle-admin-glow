
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface ConversationItemProps {
  name: string;
  company?: string;
  message: string;
  time: string;
  avatar: string;
  initials: string;
  isActive?: boolean;
  isUnread?: boolean;
  priority?: 'high' | 'medium' | 'low' | 'none';
}

function ConversationItem({ 
  name, 
  company, 
  message, 
  time, 
  avatar, 
  initials,
  isActive = false,
  isUnread = false,
  priority = 'none'
}: ConversationItemProps) {
  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
    none: 'hidden'
  };

  return (
    <div 
      className={cn(
        "px-4 py-3 border-b hover:bg-gray-50 transition-colors duration-200 cursor-pointer",
        isActive && "bg-intercom-purple-light/30 hover:bg-intercom-purple-light/40"
      )}
    >
      <div className="flex gap-3">
        <div className="relative">
          <Avatar className={cn(isUnread && "avatar-ring")}>
            <AvatarImage src={avatar} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className={cn("h-2.5 w-2.5 absolute bottom-0 right-0 rounded-full border-2 border-white", priorityColors[priority])}></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className={cn("text-sm", isUnread && "font-semibold")}>{name}</h3>
              {company && <p className="text-xs text-muted-foreground">{company}</p>}
            </div>
            <span className="text-xs text-muted-foreground flex-shrink-0">{time}</span>
          </div>
          <p className="text-sm truncate text-muted-foreground mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
}

export function ConversationList() {
  const conversations = [
    {
      name: "Luis Easton",
      company: "Github",
      message: "I bought a product from your store in November as a Christmas gift for a member...",
      time: "45m",
      avatar: "",
      initials: "LE",
      isActive: true,
      isUnread: true,
      priority: 'medium' as const,
    },
    {
      name: "Ivan Smith",
      company: "Nike",
      message: "Hi there, I have a question about my recent order...",
      time: "30m",
      avatar: "",
      initials: "IS",
      isUnread: true,
      priority: 'high' as const,
    },
    {
      name: "Lead from New York",
      message: "Good morning, let me know if you have any questions.",
      time: "45m",
      avatar: "",
      initials: "NY",
      priority: 'none' as const,
    },
    {
      name: "Luis",
      company: "Small Crafts",
      message: "Breaking API problems - Bug report",
      time: "45m",
      avatar: "",
      initials: "LS",
      priority: 'none' as const,
    },
    {
      name: "Miracle",
      company: "Exemplary Bank",
      message: "Hey there, I'm here to help with your banking needs!",
      time: "45m",
      avatar: "",
      initials: "MB",
      priority: 'low' as const,
    },
  ];
  
  return (
    <div className="h-full flex flex-col border-r">
      <div className="p-2 border-b">
        <div className="p-2 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 justify-between">
            <span>5 Open</span>
            <ChevronDown size={16} />
          </Button>
          <Button variant="outline" size="sm" className="flex-1 justify-between">
            <span>Waiting longest</span>
            <ChevronDown size={16} />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {conversations.map((convo) => (
          <ConversationItem key={convo.name} {...convo} />
        ))}
      </div>
    </div>
  );
}

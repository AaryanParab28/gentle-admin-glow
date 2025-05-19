
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";

export function AICopilotPanel() {
  return (
    <div className="h-full flex flex-col border-l">
      <div className="p-6 flex flex-col items-center justify-center gap-4 flex-1">
        <div className="w-12 h-12 rounded-full bg-intercom-purple/20 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-intercom-purple/30 flex items-center justify-center">
            <Avatar className="h-8 w-8 bg-intercom-purple text-white">
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="font-medium">Hi, I'm Fin AI Copilot</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Ask me anything about this conversation.
          </p>
        </div>
        
        <div className="w-full max-w-xs space-y-2 mt-4">
          <Button variant="outline" className="w-full justify-start text-sm">
            What does the customer want?
          </Button>
          <Button variant="outline" className="w-full justify-start text-sm">
            Summarize this conversation
          </Button>
          <Button variant="outline" className="w-full justify-start text-sm">
            <span className="message-pill bg-intercom-purple-light text-intercom-purple mr-1">
              Suggested
            </span>
            How do I get a refund?
          </Button>
        </div>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-end gap-2">
          <Input placeholder="Ask a question..." className="flex-1" />
          <Button size="icon" className="rounded-full h-10 w-10 bg-intercom-purple hover:bg-intercom-purple-dark">
            <ArrowUp size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

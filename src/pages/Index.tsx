
import { AppLayout } from "@/components/AppLayout";
import { ConversationList } from "@/components/ConversationList";
import { ConversationPanel } from "@/components/ConversationPanel";
import { AICopilotPanel } from "@/components/AICopilotPanel";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Index = () => {
  const isMobile = useIsMobile();
  const [showAIPanel, setShowAIPanel] = useState(false);
  
  return (
    <AppLayout>
      <div className="grid h-full" style={{ 
        gridTemplateColumns: isMobile 
          ? showAIPanel ? "0fr 0fr 1fr" : "0fr 1fr 0fr"
          : "320px 1fr 320px" 
      }}>
        {!isMobile && <ConversationList />}
        {!isMobile || !showAIPanel ? <ConversationPanel /> : null}
        {(!isMobile || showAIPanel) && (
          <AICopilotPanel />
        )}
        
        {isMobile && (
          <Button
            variant="outline"
            size="sm"
            className="fixed bottom-4 right-4 z-10 bg-white shadow-md rounded-full"
            onClick={() => setShowAIPanel(!showAIPanel)}
          >
            <ChevronRight size={18} className={`transition-transform ${showAIPanel ? "rotate-180" : ""}`} />
            {!showAIPanel && <span className="ml-1">AI Copilot</span>}
          </Button>
        )}
      </div>
    </AppLayout>
  );
};

export default Index;

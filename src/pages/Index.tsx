
import { AppLayout } from "@/components/AppLayout";
import { ConversationList } from "@/components/ConversationList";
import { ConversationPanel } from "@/components/ConversationPanel";
import { AICopilotPanel } from "@/components/AICopilotPanel";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <AppLayout>
      <div className="grid h-full" style={{ 
        gridTemplateColumns: isMobile ? "1fr" : "320px 1fr 320px" 
      }}>
        <ConversationList />
        <ConversationPanel />
        {!isMobile && <AICopilotPanel />}
      </div>
    </AppLayout>
  );
};

export default Index;

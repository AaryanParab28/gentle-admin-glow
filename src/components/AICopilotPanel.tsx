
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, FileText, Lock, ArrowRight, ChevronDown } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface AIResponseProps {
  content: string;
  highlightedText?: {
    text: string;
    number?: number;
  }[];
}

const AIResponse = ({ content, highlightedText = [] }: AIResponseProps) => {
  return (
    <div className="bg-intercom-purple-light/50 text-sm rounded-lg p-4 border border-intercom-purple/20 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Avatar className="h-6 w-6 bg-intercom-purple text-white">
          <AvatarFallback>F</AvatarFallback>
        </Avatar>
        <span className="font-medium">Fin</span>
      </div>

      <div className="mt-2">
        {content.split(/(\{highlight-\d+\})/).map((part, index) => {
          const highlightMatch = part.match(/\{highlight-(\d+)\}/);
          
          if (highlightMatch) {
            const highlightIndex = parseInt(highlightMatch[1]) - 1;
            const highlight = highlightedText[highlightIndex];
            
            if (highlight) {
              return (
                <span key={index} className="relative">
                  <span className="underline decoration-intercom-purple decoration-2">{highlight.text}</span>
                  {highlight.number && (
                    <sup className="bg-intercom-purple text-white text-xs rounded-full h-4 w-4 flex items-center justify-center ml-0.5">{highlight.number}</sup>
                  )}
                </span>
              );
            }
          }
          
          return <span key={index}>{part}</span>;
        })}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <Button variant="outline" className="w-full justify-center text-sm gap-2 bg-white">
          <span>Add to composer</span>
          <ChevronDown size={14} />
        </Button>
      </div>
    </div>
  );
};

interface KnowledgeSourceProps {
  icon: React.ReactNode;
  title: string;
}

const KnowledgeSource = ({ icon, title }: KnowledgeSourceProps) => (
  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-intercom-purple-light/30 cursor-pointer text-sm">
    {icon}
    <span>{title}</span>
  </div>
);

export function AICopilotPanel() {
  const [showAIResponse, setShowAIResponse] = useState(true);
  
  const aiResponse = {
    content: "Our standard refund policy does not allow for returns after 60 days of the purchase date.{highlight-1}\n\nHowever, in certain situations where orders were placed over 60 days ago, we recognise the need for flexibility. Refund requests for orders placed over 60 days ago will need to be evaluated by our {highlight-2}.",
    highlightedText: [
      {
        text: "returns after 60 days of the purchase date",
        number: 1
      },
      {
        text: "senior returns team",
        number: 2
      }
    ]
  };
  
  return (
    <div className="h-full flex flex-col border-l">
      {showAIResponse ? (
        <div className="p-4 flex-1 overflow-auto">
          <AIResponse content={aiResponse.content} highlightedText={aiResponse.highlightedText} />
          
          <div className="mt-2">
            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
              <span>9 relevant sources found</span>
            </p>
            
            <div className="space-y-1">
              <KnowledgeSource 
                icon={<Lock size={14} className="text-amber-500" />} 
                title="Processing a refund" 
              />
              <KnowledgeSource 
                icon={<FileText size={14} className="text-gray-600" />} 
                title="Refunding an order placed over 60 days ago" 
              />
              <KnowledgeSource 
                icon={<Lock size={14} className="text-amber-500" />} 
                title="Dealing with refund disputes" 
              />
            </div>
            
            <Button variant="ghost" className="text-sm text-muted-foreground px-2 mt-1 h-auto flex items-center gap-1">
              <span>See all</span>
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-6 flex flex-col items-center justify-center gap-4 flex-1">
          <div className="w-12 h-12 rounded-full bg-intercom-purple/20 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-intercom-purple/30 flex items-center justify-center">
              <Avatar className="h-8 w-8 bg-intercom-purple text-white">
                <AvatarFallback>F</AvatarFallback>
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
      )}
      
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

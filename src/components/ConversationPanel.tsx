
import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Send, Paperclip, SmilePlus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface MessageProps {
  content: string;
  sender: "user" | "agent" | "ai";
  time?: string;
  avatar?: string;
  initials?: string;
}

function Message({ content, sender, time = "1min", avatar, initials }: MessageProps) {
  const isUser = sender === "user";
  const isAI = sender === "ai";
  
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isUser && "flex-row-reverse"
    )}>
      {!isAI && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "max-w-[80%]",
        isUser ? "user-message" : isAI ? "ai-message" : "bg-white border p-3 rounded-lg text-sm"
      )}>
        <p>{content}</p>
      </div>
    </div>
  );
}

interface AISuggestionProps {
  content: string;
  onClick: () => void;
}

function AISuggestion({ content, onClick }: AISuggestionProps) {
  return (
    <div 
      className="ai-suggestion flex items-center gap-2 cursor-pointer hover:bg-intercom-purple-light/70 transition-colors mb-2"
      onClick={onClick}
    >
      <p className="flex-1">{content}</p>
      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
        <ArrowRight size={14} />
      </Button>
    </div>
  );
}

interface AIToolPopoverProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedText: string;
}

function AIToolPopover({ isOpen, setIsOpen, selectedText }: AIToolPopoverProps) {
  if (!selectedText) return null;
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverContent className="w-60 p-2" align="start">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setIsOpen(false)}>
            Generate response
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setIsOpen(false)}>
            Summarize text
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setIsOpen(false)}>
            Check company policy
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function ConversationPanel() {
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      content: "Hello, I'm having trouble with my order. I ordered a laptop last week but it hasn't been shipped yet. Can you help me?",
      sender: "user" as const,
      avatar: "",
      initials: "LE",
    },
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [showAITools, setShowAITools] = useState(false);
  const [aiToolsPosition, setAIToolsPosition] = useState({ x: 0, y: 0 });
  
  const suggestions = [
    "I apologize for the delay with your order. I'd be happy to look into this for you. Could you please provide your order number?",
    "I understand your concern about the shipping delay. Let me check the status of your order right away.",
    "Thank you for reaching out about your laptop order. I can see there's been a delay in shipping. Let me investigate what's happening."
  ];
  
  const conversationRef = useRef<HTMLDivElement>(null);
  
  const handleMouseUp = () => {
    const selection = window.getSelection();
    
    if (selection && selection.toString().length > 0) {
      setSelectedText(selection.toString());
      
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      setAIToolsPosition({ 
        x: rect.left + (rect.width / 2), 
        y: rect.top - 10 
      });
      
      setShowAITools(true);
    } else {
      setShowAITools(false);
      setSelectedText("");
    }
  };
  
  const handleClickOutside = () => {
    setShowAITools(false);
    setSelectedText("");
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setMessages([...messages, {
      content: suggestion,
      sender: "agent",
      avatar: "",
      initials: "JD",
    }]);
    setInputValue("");
  };
  
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, {
        content: inputValue,
        sender: "agent",
        avatar: "",
        initials: "JD",
      }]);
      setInputValue("");
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>LE</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium">Luis Easton</h2>
            <p className="text-xs text-muted-foreground">Github • 2min</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Close</Button>
        </div>
      </div>
      
      <Tabs defaultValue="conversation" className="flex-1 flex flex-col">
        <div className="border-b px-2">
          <TabsList className="bg-transparent">
            <TabsTrigger value="conversation" className="data-[state=active]:text-intercom-purple data-[state=active]:border-intercom-purple data-[state=active]:border-b-2 rounded-none">
              AI Copilot
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:text-intercom-purple data-[state=active]:border-intercom-purple data-[state=active]:border-b-2 rounded-none">
              Details
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="conversation" className="flex-1 flex flex-col p-0 m-0 overflow-hidden">
          <div 
            className="flex-1 overflow-auto p-4" 
            ref={conversationRef}
            onMouseUp={handleMouseUp}
            onClick={selectedText ? handleClickOutside : undefined}
          >
            {messages.map((message, index) => (
              <Message key={index} {...message} />
            ))}
            
            {showAITools && selectedText && (
              <div 
                className="fixed z-50 bg-white rounded-md shadow-lg border"
                style={{
                  left: `${aiToolsPosition.x}px`,
                  top: `${aiToolsPosition.y}px`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <div className="p-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setShowAITools(false)}
                  >
                    AI Tools
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-gray-50 border-t">
            <div className="mb-4">
              <p className="text-sm font-medium mb-2 text-intercom-purple flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-intercom-purple" />
                AI Suggested Responses
              </p>
              {suggestions.map((suggestion, index) => (
                <AISuggestion 
                  key={index} 
                  content={suggestion} 
                  onClick={() => handleSuggestionClick(suggestion)} 
                />
              ))}
            </div>
            
            <div className="flex items-end gap-2">
              <div className="flex-1 bg-white rounded-lg border overflow-hidden flex items-center">
                <Input 
                  placeholder="Type your reply..." 
                  className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 h-auto" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="flex items-center gap-1 pr-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <SmilePlus size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Paperclip size={18} />
                  </Button>
                </div>
              </div>
              <Button 
                size="icon" 
                className="rounded-full h-10 w-10 bg-intercom-purple hover:bg-intercom-purple-dark"
                onClick={handleSendMessage}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="details" className="p-4 m-0">
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Customer Info</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Email:</span>
                <span>luis@github.com</span>
                <span className="text-muted-foreground">Company:</span>
                <span>Github</span>
                <span className="text-muted-foreground">First seen:</span>
                <span>Nov 12, 2023</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Conversation Info</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Started:</span>
                <span>Today at 11:45 AM</span>
                <span className="text-muted-foreground">Priority:</span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  Medium
                </span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

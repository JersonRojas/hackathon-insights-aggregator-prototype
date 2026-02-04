import { useState } from "react";
import { Send, Loader2, Sparkles, Database } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { dataSources } from "../data/mockData";
import { ScrollArea } from "./ui/scroll-area";
import { BASE_API_URL } from "../constants/config";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatbotSidebar() {
  const [sources, setSources] = useState(dataSources);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Insight Scout. What would you like to know about your product performance?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const toggleSource = (id: string) => {
    setSources(
      sources.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsThinking(true);

    try {
      // API call to custom webhook
      const response = await fetch(BASE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: currentInput,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content:
          data.output ||
          "I'm sorry, possibly the response format is unexpected.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Sorry, I'm having trouble connecting to the server for insights right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="gradient-purple-pink p-2 rounded-xl shadow-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-semibold text-white">Insight Scout</h3>
        </div>
        <p className="text-sm text-slate-200">
          Ask questions about your product data
        </p>
      </div>

      {/* Prompt Input */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-slate-200 mb-3 block">
          Prompt
        </Label>
        <div className="relative">
          <Textarea
            placeholder="What needs my attention right now?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="min-h-[80px] pr-12 resize-none glass-card border-purple-500/30 text-slate-100 placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/50"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!inputValue.trim() || isThinking}
            className="absolute bottom-2 right-2 h-8 w-8 gradient-purple-pink hover:opacity-90 disabled:opacity-30"
          >
            {isThinking ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Data Sources */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-slate-200 mb-3 block flex items-center gap-2">
          <Database className="h-4 w-4" />
          Select data sources
        </Label>
        <div className="space-y-2">
          {sources.map((source) => (
            <div
              key={source.id}
              className="flex items-center space-x-3 glass-card p-3 rounded-xl border border-slate-700/30 hover:border-purple-500/30 transition-all"
            >
              <Checkbox
                id={source.id}
                checked={source.enabled}
                onCheckedChange={() => toggleSource(source.id)}
                className="border-slate-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
              />
              <Label
                htmlFor={source.id}
                className="text-sm text-slate-200 cursor-pointer font-normal"
              >
                {source.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 min-h-0">
        <Label className="text-sm font-medium text-slate-200 mb-3 block">
          Conversation
        </Label>
        <ScrollArea className="h-full glass-card border border-purple-500/20 rounded-2xl p-4">
          <div className="space-y-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`
                  rounded-2xl p-4 text-sm
                  ${
                    message.role === "assistant"
                      ? "glass-card border border-purple-500/30 text-slate-200"
                      : "gradient-blue-purple text-white"
                  }
                `}
              >
                <div className="font-medium mb-2 text-xs uppercase tracking-wide opacity-70 flex items-center gap-2">
                  {message.role === "assistant" ? (
                    <>
                      <Sparkles className="h-3 w-3" />
                      Insight Scout
                    </>
                  ) : (
                    "You"
                  )}
                </div>
                <div className="leading-relaxed">{message.content}</div>
              </div>
            ))}
            {isThinking && (
              <div className="glass-card border border-purple-500/30 rounded-2xl p-4 text-sm">
                <div className="font-medium mb-2 text-xs uppercase tracking-wide opacity-70 text-slate-200 flex items-center gap-2">
                  <Sparkles className="h-3 w-3" />
                  Insight Scout
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                  <span className="italic">Analyzing data sources...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

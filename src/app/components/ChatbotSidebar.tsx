import { useState } from "react";
import { Send, Loader2, Sparkles, Database } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useChat } from "../context/ChatContext";
import { motion, AnimatePresence } from "motion/react";

export function ChatbotSidebar() {
  const { messages, sources, isThinking, toggleSource, sendMessage } =
    useChat();
  const [inputValue, setInputValue] = useState("");

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const content = inputValue;
    setInputValue("");
    await sendMessage(content);
  };

  return (
    <div className="h-full flex flex-col p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4">
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

      {/* Data Sources - Accordion */}
      <div className="mb-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="data-sources" className="border-slate-700/30">
            <AccordionTrigger className="text-sm font-medium text-slate-200 hover:no-underline hover:text-white py-2">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Select data sources
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2 pb-2">
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 min-h-0 mb-4 flex flex-col">
        <ScrollArea className="flex-1 glass-card border border-purple-500/20 rounded-2xl p-4">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {messages.map((message, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
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
                  <div className="leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="glass-card border border-purple-500/30 rounded-2xl p-4 text-sm"
                >
                  <div className="font-medium mb-2 text-xs uppercase tracking-wide opacity-70 text-slate-200 flex items-center gap-2">
                    <Sparkles className="h-3 w-3" />
                    Insight Scout
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                    <span className="italic">Analyzing data sources...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Invisible element to scroll to bottom could be added here */}
          </div>
        </ScrollArea>
      </div>

      {/* Prompt Input */}
      <div className="mt-auto">
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
    </div>
  );
}

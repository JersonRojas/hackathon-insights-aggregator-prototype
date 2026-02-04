import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  DataSource,
  dataSources as initialDataSources,
} from "../data/mockData";
import { BASE_API_URL } from "../constants/config";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatContextType {
  messages: Message[];
  sources: DataSource[];
  isThinking: boolean;
  toggleSource: (id: string) => void;
  setSources: (sources: DataSource[]) => void;
  setMessages: (messages: Message[]) => void;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [sources, setSources] = useState<DataSource[]>(initialDataSources);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Insight Scout. What would you like to know about your product performance?",
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const toggleSource = (id: string) => {
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    try {
      // API call to custom webhook
      const response = await fetch(BASE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: content,
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

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sources,
        isThinking,
        toggleSource,
        setSources,
        setMessages,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

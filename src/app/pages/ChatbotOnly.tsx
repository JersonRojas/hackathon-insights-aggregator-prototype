import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  MessageSquare,
  Send,
  Database,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Zap,
  Loader2,
} from "lucide-react";
import { dataSources as importedDataSources } from "../data/mockData";
import { useChat } from "../context/ChatContext";
import { BASE_API_URL } from "../constants/config";

export function ChatbotOnly() {
  const navigate = useNavigate();
  const { setSources, setMessages: setGlobalMessages } = useChat();
  const [message, setMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [messages, setMessages] = useState<
    Array<{ role: "bot" | "user"; content: string; sources?: boolean }>
  >([
    {
      role: "bot",
      content:
        "Hi! I'm Insight Scout, your AI assistant. To get started, select the data sources you'd like me to analyze:",
      sources: true,
    },
  ]);

  const dataSources = importedDataSources.map((source) => ({
    id: source.id,
    name: source.name,
    icon: Database,
    enabled: source.enabled,
  }));

  const toggleSource = (sourceId: string) => {
    setSelectedSources((prev) =>
      prev.includes(sourceId)
        ? prev.filter((id) => id !== sourceId)
        : [...prev, sourceId],
    );
  };

  const handleSendMessage = async () => {
    if (!message.trim() && selectedSources.length === 0) return;

    // Add user message & Call API
    if (message.trim()) {
      const currentMessage = message;
      setMessages((prev) => [
        ...prev,
        { role: "user", content: currentMessage },
      ]);
      setMessage("");
      setIsThinking(true);

      try {
        const response = await fetch(BASE_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: currentMessage,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content:
              data.output ||
              "I'm sorry, possibly the response format is unexpected.",
          },
        ]);
      } catch (error) {
        console.error("Error fetching response:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content:
              "Sorry, I'm having trouble connecting to the server for insights right now. Please try again later.",
          },
        ]);
      } finally {
        setIsThinking(false);
      }
    } else {
      // Just sources selected logic
      // Add bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: `Great! I've connected to ${selectedSources.length} data source${selectedSources.length !== 1 ? "s" : ""}. I'm ready to analyze your data and show you insights. Click "Start Analysis" below to view your dashboard!`,
          },
        ]);
      }, 500);
    }
  };

  const handleStartAnalysis = () => {
    // Update global sources based on user selection
    const newGlobalSources = importedDataSources.map((s) => ({
      ...s,
      enabled: selectedSources.includes(s.id),
    }));
    setSources(newGlobalSources);

    // Update global messages history
    const newGlobalMessages = messages.map(
      (m) =>
        ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.content,
        }) as const,
    );

    // Only set messages if there are actual user interactions beyond the greeting
    if (newGlobalMessages.length > 1) {
      setGlobalMessages(newGlobalMessages);
    }

    navigate("/dashboard");
  };

  const showStartButton = selectedSources.length > 0 && messages.length > 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden flex items-center justify-center p-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 glass-card text-purple-200 px-6 py-3 rounded-full text-sm font-medium mb-6 glow-purple">
            <Sparkles className="h-5 w-5 animate-pulse" />
            Step 1: Connect Your Data
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Chat with Insight Scout
          </h1>
          <p className="text-slate-200 text-lg">
            Select your data sources to begin analyzing insights
          </p>
        </div>

        {/* Chatbot Card */}
        <div className="glass-card rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-500/20 glow-purple">
          {/* Chat Header */}
          <div className="gradient-purple-pink animated-gradient px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <MessageSquare className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-xl text-white">
                  Insight Scout
                </h2>
                <p className="text-sm text-purple-100">
                  Your AI-powered data assistant
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-[550px] overflow-y-auto bg-slate-900/40 backdrop-blur-sm p-8 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx}>
                {msg.role === "bot" ? (
                  <div className="flex gap-4">
                    <div className="gradient-purple-pink p-3 rounded-2xl h-12 w-12 flex-shrink-0 flex items-center justify-center shadow-lg">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="glass-card rounded-2xl p-5 shadow-xl border border-purple-500/20">
                        <p className="text-slate-100 leading-relaxed">
                          {msg.content}
                        </p>
                      </div>

                      {/* Data Source Selection */}
                      {msg.sources && (
                        <div className="mt-6 space-y-3">
                          {dataSources.map((source) => {
                            const Icon = source.icon;
                            const isSelected = selectedSources.includes(
                              source.id,
                            );
                            return (
                              <button
                                key={source.id}
                                onClick={() => toggleSource(source.id)}
                                className={`
                                  w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300
                                  ${
                                    isSelected
                                      ? "glass-card border-blue-500/50 glow-blue shadow-lg scale-[1.02]"
                                      : "glass-card border-slate-700/30 hover:border-slate-600/50 hover:scale-[1.01]"
                                  }
                                `}
                              >
                                <div
                                  className={`
                                  h-6 w-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all
                                  ${isSelected ? "gradient-cyan-blue border-blue-400" : "border-slate-600 bg-slate-800/50"}
                                `}
                                >
                                  {isSelected && (
                                    <CheckCircle2 className="h-5 w-5 text-white" />
                                  )}
                                </div>
                                <Icon
                                  className={`h-6 w-6 ${isSelected ? "text-blue-400" : "text-slate-400"}`}
                                />
                                <span
                                  className={`font-medium flex-1 text-left ${isSelected ? "text-blue-200" : "text-slate-200"}`}
                                >
                                  {source.name}
                                </span>
                                {isSelected && (
                                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                                    <Zap className="h-3 w-3 mr-1" />
                                    Connected
                                  </Badge>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="gradient-blue-purple rounded-2xl p-5 max-w-[80%] shadow-xl">
                      <p className="text-white leading-relaxed">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex gap-4">
                <div className="gradient-purple-pink p-3 rounded-2xl h-12 w-12 flex-shrink-0 flex items-center justify-center shadow-lg">
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
                <div className="flex-1">
                  <div className="glass-card rounded-2xl p-5 shadow-xl border border-purple-500/20">
                    <p className="text-slate-100 leading-relaxed italic">
                      Analyzing...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Start Analysis Button */}
            {showStartButton && (
              <div className="flex justify-center pt-6">
                <Button
                  onClick={handleStartAnalysis}
                  size="lg"
                  className="gradient-blue-purple hover:opacity-90 text-white shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-110 glow-purple px-8 py-7 h-auto text-lg font-semibold rounded-2xl"
                >
                  <Sparkles className="h-6 w-6 mr-2 animate-pulse" />
                  Start Analysis
                  <ArrowRight className="h-6 w-6 ml-2" />
                </Button>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="bg-slate-900/60 backdrop-blur-sm border-t border-purple-500/20 p-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask me anything or select sources above..."
                className="flex-1 px-6 py-4 glass-card border border-slate-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-100 placeholder-slate-400 text-lg"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() && selectedSources.length === 0}
                className="gradient-purple-pink hover:opacity-90 px-7 py-4 rounded-2xl shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="h-6 w-6" />
              </Button>
            </div>
            <p className="text-xs text-slate-200 mt-4 text-center flex items-center justify-center gap-2">
              <Sparkles className="h-3 w-3" />
              Select at least one data source to continue
            </p>
          </div>
        </div>

        {/* Helper Text */}
        <div className="text-center mt-8 glass-card rounded-2xl p-4 border border-purple-500/20">
          <p className="text-sm text-slate-200 flex items-center justify-center gap-2">
            <Zap className="h-4 w-4 text-purple-400" />
            Tip: Select multiple sources for more comprehensive insights
          </p>
        </div>
      </div>
    </div>
  );
}

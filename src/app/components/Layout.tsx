import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { ChatbotSidebar } from "./ChatbotSidebar";
import {
  PanelLeftClose,
  PanelLeftOpen,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-900 overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        {/* Sidebar */}
        {sidebarOpen && (
          <>
            <ResizablePanel
              defaultSize={20}
              minSize={15}
              maxSize={40}
              className="border-r border-purple-500/20 glass-dark"
            >
              <ChatbotSidebar />
            </ResizablePanel>
            <ResizableHandle withHandle className="bg-purple-500/20" />
          </>
        )}

        {/* Main Content */}
        <ResizablePanel defaultSize={80}>
          <div className="flex flex-col h-full w-full overflow-hidden">
            {/* Header */}
            <header className="glass-dark border-b border-purple-500/20 px-6 py-4 flex items-center justify-between backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-slate-200 hover:text-white hover:bg-purple-500/20"
                >
                  {sidebarOpen ? (
                    <PanelLeftClose className="h-5 w-5" />
                  ) : (
                    <PanelLeftOpen className="h-5 w-5" />
                  )}
                </Button>
                <div className="flex items-center gap-3">
                  <div className="gradient-purple-pink p-2 rounded-xl">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-2xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    Insight Aggregator
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/gallery")}
                  className="gap-2 glass-card border-purple-500/30 text-slate-200 hover:text-white hover:border-purple-400"
                >
                  <LayoutGrid className="h-4 w-4" />
                  Screen Gallery
                </Button>
                <div className="text-sm text-slate-200">
                  Last updated:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-auto">
              <Outlet />
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

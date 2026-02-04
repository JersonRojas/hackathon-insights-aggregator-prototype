"use client"

import { useState } from 'react';
import Link from 'next/link';
import { ChatbotSidebar } from '@/components/chatbot-sidebar';
import { PanelLeftClose, PanelLeftOpen, LayoutGrid, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-900">
      {/* Sidebar */}
      <div 
        className={`
          ${sidebarOpen ? 'w-80' : 'w-0'} 
          transition-all duration-300 overflow-hidden border-r border-purple-500/20 glass-dark
        `}
      >
        <ChatbotSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="glass-dark border-b border-purple-500/20 px-6 py-4 flex items-center justify-between backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-200 hover:text-white hover:bg-purple-500/20"
            >
              {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
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
              asChild
              className="gap-2 glass-card border-purple-500/30 text-slate-200 hover:text-white hover:border-purple-400"
            >
              <Link href="/gallery">
                <LayoutGrid className="h-4 w-4" />
                Screen Gallery
              </Link>
            </Button>
            <div className="text-sm text-slate-200">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

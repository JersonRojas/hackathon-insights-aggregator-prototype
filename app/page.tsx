"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Search,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Database,
  Zap,
  Target,
  Brain
} from 'lucide-react';

export default function Onboarding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card text-purple-300 px-6 py-3 rounded-full text-sm font-medium mb-8 glow-purple">
            <Sparkles className="h-5 w-5 animate-pulse" />
            Welcome to Insight Aggregator
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent text-balance">
            Your AI-Powered Insight Hub
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed text-pretty">
            Get instant visibility into your product&apos;s performance, customer feedback, and market trends—all in one place. No analytics expertise required.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 glow-blue">
            <div className="gradient-cyan-blue p-4 rounded-xl w-fit mb-6">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Clear Insights</h3>
            <p className="text-slate-300 leading-relaxed">
              Plain-language summaries of complex data. See what matters most at a glance.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 glow-purple">
            <div className="gradient-purple-pink p-4 rounded-xl w-fit mb-6">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Smart AI Assistant</h3>
            <p className="text-slate-300 leading-relaxed">
              Ask questions and connect your data sources through natural conversation.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 glow-pink">
            <div className="gradient-pink-orange p-4 rounded-xl w-fit mb-6">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Actionable Recommendations</h3>
            <p className="text-slate-300 leading-relaxed">
              Prioritized suggestions with confidence scores to guide your decisions.
            </p>
          </div>
        </div>

        {/* Visual Tour */}
        <div className="glass-card rounded-3xl overflow-hidden mb-20 glow-purple">
          <div className="gradient-blue-purple animated-gradient p-8">
            <h2 className="text-3xl font-bold mb-2 text-white">How It Works</h2>
            <p className="text-purple-100 text-lg">Two powerful tools working together</p>
          </div>

          <div className="p-8 md:p-12 space-y-16">
            {/* Chatbot Preview */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2 text-sm">
                  Step 1
                </Badge>
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3 text-white">
                  <MessageSquare className="h-8 w-8 text-purple-400" />
                  Chat with Insight Scout
                </h3>
                <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                  Our AI assistant helps you connect your data sources like customer support tickets, analytics platforms, and social media. Just tell it what you want to analyze.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="gradient-green-cyan p-1.5 rounded-full mt-0.5">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-slate-200">Select data sources with simple checkboxes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="gradient-green-cyan p-1.5 rounded-full mt-0.5">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-slate-200">Ask questions in plain English</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="gradient-green-cyan p-1.5 rounded-full mt-0.5">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-slate-200">Get instant intelligent responses</span>
                  </li>
                </ul>
              </div>

              {/* Chatbot Mockup */}
              <div className="glass-card rounded-2xl p-6 glow-purple">
                <div className="bg-slate-900/50 rounded-xl shadow-2xl overflow-hidden border border-purple-500/20">
                  {/* Chatbot Header */}
                  <div className="gradient-purple-pink p-4 flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-white">Insight Scout</span>
                  </div>

                  {/* Chatbot Content */}
                  <div className="p-5 space-y-4 min-h-[300px] bg-slate-900/30">
                    {/* Bot Message */}
                    <div className="flex gap-2">
                      <div className="gradient-purple-pink p-2 rounded-full h-9 w-9 flex-shrink-0">
                        <MessageSquare className="h-5 w-5 text-white" />
                      </div>
                      <div className="glass-card rounded-2xl p-3 max-w-[85%]">
                        <p className="text-sm text-slate-200">Hi! Which sources would you like to connect?</p>
                      </div>
                    </div>

                    {/* Data Source Selection */}
                    <div className="ml-11 space-y-2">
                      <div className="flex items-center gap-3 glass-card rounded-xl p-3 border border-blue-500/50 glow-blue">
                        <div className="h-5 w-5 gradient-cyan-blue rounded flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                        <Database className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-blue-200">Customer Support Tickets</span>
                      </div>
                      <div className="flex items-center gap-3 glass-card rounded-xl p-3 border border-blue-500/50 glow-blue">
                        <div className="h-5 w-5 gradient-cyan-blue rounded flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                        <Database className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-blue-200">Product Analytics</span>
                      </div>
                      <div className="flex items-center gap-3 glass-card rounded-xl p-3 border border-slate-700/50">
                        <div className="h-5 w-5 border-2 border-slate-600 rounded bg-slate-800/50"></div>
                        <Database className="h-4 w-4 text-slate-500" />
                        <span className="text-sm text-slate-400">Social Media</span>
                      </div>
                    </div>

                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="gradient-blue-purple rounded-2xl p-3 max-w-[75%]">
                        <p className="text-sm text-white">Show me the latest insights</p>
                      </div>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="border-t border-slate-700/50 px-4 py-3 bg-slate-900/50">
                    <div className="glass-card rounded-xl px-4 py-2.5 text-sm text-slate-400">
                      Type your message...
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Dashboard Mockup */}
              <div className="glass-card rounded-2xl p-6 glow-blue order-2 md:order-1">
                <div className="bg-slate-900/50 rounded-xl shadow-2xl overflow-hidden border border-blue-500/20">
                  {/* Dashboard Header */}
                  <div className="gradient-cyan-blue p-4">
                    <span className="font-semibold text-white">Dashboard Overview</span>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-5 space-y-3 bg-slate-900/30">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="glass-card rounded-xl p-4 border border-green-500/30 glow-blue">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-green-400" />
                          <span className="text-xs font-semibold text-slate-300">User Growth</span>
                        </div>
                        <div className="text-2xl font-bold text-green-400">+23%</div>
                      </div>
                      <div className="glass-card rounded-xl p-4 border border-yellow-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="h-4 w-4 text-yellow-400" />
                          <span className="text-xs font-semibold text-slate-300">Retention</span>
                        </div>
                        <div className="text-2xl font-bold text-yellow-400">78%</div>
                      </div>
                    </div>

                    {/* Pain Points */}
                    <div className="glass-card rounded-xl p-4 border border-red-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                        <span className="text-xs font-semibold text-slate-300">Top Pain Point</span>
                      </div>
                      <p className="text-xs text-slate-400">Slow checkout process (47 mentions)</p>
                    </div>

                    {/* Trending Insight */}
                    <div className="glass-card rounded-xl p-4 border border-purple-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-purple-400" />
                        <span className="text-xs font-semibold text-slate-300">Trending Insight</span>
                      </div>
                      <p className="text-xs text-slate-400">Mobile-first payments rising 65%</p>
                    </div>

                    {/* Recommendation */}
                    <div className="glass-card rounded-xl p-4 border border-blue-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-blue-400" />
                        <span className="text-xs font-semibold text-slate-300">Top Recommendation</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">Optimize mobile checkout flow</p>
                      <Badge className="text-xs bg-blue-500/20 text-blue-300 border-blue-500/30">
                        85% confidence
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2 text-sm">
                  Step 2
                </Badge>
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3 text-white">
                  <BarChart3 className="h-8 w-8 text-blue-400" />
                  Explore Your Dashboard
                </h3>
                <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                  View all your insights in one unified dashboard. See performance metrics, customer pain points, trending topics, and smart recommendations—all updated in real-time.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="gradient-green-cyan p-1.5 rounded-full mt-0.5">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-slate-200">Visual indicators show what needs attention</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="gradient-green-cyan p-1.5 rounded-full mt-0.5">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-slate-200">Click any insight to drill down into details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="gradient-green-cyan p-1.5 rounded-full mt-0.5">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-slate-200">Get prioritized action items with confidence scores</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* What's Inside */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">What You&apos;ll Find Inside</h2>
          <p className="text-slate-300 text-center mb-12 text-lg">Everything you need to make data-driven decisions</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BarChart3,
                title: 'Performance Metrics',
                desc: 'Track your KPIs with clear status indicators',
                gradient: 'gradient-cyan-blue'
              },
              {
                icon: AlertCircle,
                title: 'Customer Pain Points',
                desc: 'Identify and prioritize user complaints',
                gradient: 'gradient-pink-orange'
              },
              {
                icon: TrendingUp,
                title: 'Trending Insights',
                desc: 'Stay ahead with market intelligence',
                gradient: 'gradient-purple-pink'
              },
              {
                icon: Lightbulb,
                title: 'Smart Recommendations',
                desc: 'Data-driven actions ranked by impact',
                gradient: 'gradient-blue-purple'
              },
              {
                icon: Search,
                title: 'Investigation Themes',
                desc: 'Areas that need deeper analysis',
                gradient: 'gradient-purple-pink'
              },
              {
                icon: Zap,
                title: 'AI Chat Assistant',
                desc: 'Ask questions anytime',
                gradient: 'gradient-green-cyan'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 border border-slate-700/50">
                  <div className={`p-4 rounded-xl w-fit mb-4 ${item.gradient}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2 text-white text-lg">{item.title}</h4>
                  <p className="text-sm text-slate-300">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-card rounded-3xl p-12 md:p-16 text-center border-2 border-purple-500/30 glow-purple relative overflow-hidden">
          <div className="absolute inset-0 gradient-blue-purple animated-gradient opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-balance">Ready to Get Started?</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed text-pretty">
              Connect your data sources and start uncovering insights in minutes. No training required.
            </p>
            <Button
              size="lg"
              asChild
              className="gradient-blue-purple hover:opacity-90 text-white text-xl px-10 py-8 h-auto font-semibold shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-110 glow-purple rounded-2xl"
            >
              <Link href="/chat">
                <Sparkles className="mr-3 h-7 w-7 animate-pulse" />
                Start Analysis
                <ArrowRight className="ml-3 h-7 w-7" />
              </Link>
            </Button>
            <p className="text-sm text-slate-400 mt-6 flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              Takes less than 2 minutes to set up
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

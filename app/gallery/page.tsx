"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  TrendingUp, 
  AlertCircle, 
  Lightbulb, 
  Search,
  ArrowRight,
  ExternalLink,
  Sparkles,
  MessageSquare
} from 'lucide-react';

function getKeyFeatures(screenId: string): string[] {
  const features: Record<string, string[]> = {
    'onboarding': [
      'Interactive walkthrough of chatbot and dashboard features',
      'Clear call-to-action for next steps',
      'Introduction to key functionalities',
      'Visual aids and tooltips'
    ],
    'chatbot': [
      'Data source selection interface',
      'AI assistant for data analysis',
      'Real-time feedback and suggestions',
      'User-friendly chat interface'
    ],
    'dashboard': [
      'At-a-glance metric status with visual indicators',
      'Top customer pain points by severity',
      'External trending insights with relevance scores',
      'Prioritized recommendations and investigation themes',
      'Quick navigation to all detail screens'
    ],
    'metrics': [
      'Performance comparison charts (actual vs target)',
      'Trend indicators showing direction and % change',
      'Status categorization (on track, needs attention, critical)',
      'Progress bars for each metric',
      'Detailed breakdowns with supporting data'
    ],
    'pain-points': [
      'Severity distribution pie chart',
      'Complaint volume indicators',
      'Multi-source data attribution',
      'Detailed issue descriptions',
      'Priority rankings and action urgency'
    ],
    'trending': [
      'Growth trend line charts',
      'Relevance scoring for your product',
      'External source attribution',
      'Category classification',
      'Competitive intelligence insights'
    ],
    'recommendations': [
      'Confidence level scoring (65-85%)',
      'Impact vs Effort priority matrix',
      'Supporting evidence and data points',
      'Related metrics tracking',
      'Quick wins identification'
    ],
    'themes': [
      'Priority classification (high, medium, low)',
      'Data point volume tracking',
      'Related source mapping',
      'Research action recommendations',
      'Investigation roadmap guidance'
    ]
  };

  return features[screenId] || [];
}

export default function ScreenGallery() {
  const screens = [
    {
      id: 'onboarding',
      title: 'Onboarding',
      description: 'Welcome experience and tool introduction',
      path: '/',
      icon: Sparkles,
      color: 'bg-gradient-to-r from-blue-500 to-purple-500',
      preview: 'Interactive walkthrough showing chatbot and dashboard features with clear call-to-action'
    },
    {
      id: 'chatbot',
      title: 'Chatbot Interface',
      description: 'Data source selection and AI assistant',
      path: '/chat',
      icon: MessageSquare,
      color: 'bg-purple-500',
      preview: 'Full-screen chatbot for connecting data sources before revealing the dashboard'
    },
    {
      id: 'dashboard',
      title: 'Main Dashboard',
      description: 'Overview of all insights and metrics',
      path: '/dashboard',
      icon: LayoutDashboard,
      color: 'bg-blue-500',
      preview: 'Dashboard with at-a-glance metrics, pain points, trending insights, and recommendations'
    },
    {
      id: 'metrics',
      title: 'Metrics Detail',
      description: 'Detailed performance indicators',
      path: '/dashboard/metrics',
      icon: TrendingUp,
      color: 'bg-green-500',
      preview: 'Full breakdown of all KPIs with charts showing current vs target performance'
    },
    {
      id: 'pain-points',
      title: 'Pain Points Detail',
      description: 'Customer issues and complaints',
      path: '/dashboard/pain-points',
      icon: AlertCircle,
      color: 'bg-red-500',
      preview: 'Comprehensive view of customer pain points by severity with source attribution'
    },
    {
      id: 'trending',
      title: 'Trending Insights',
      description: 'Market trends and competitive intelligence',
      path: '/dashboard/trending',
      icon: TrendingUp,
      color: 'bg-purple-500',
      preview: 'External market trends with relevance scores and growth charts'
    },
    {
      id: 'recommendations',
      title: 'Recommendations',
      description: 'Prioritized action items',
      path: '/dashboard/recommendations',
      icon: Lightbulb,
      color: 'bg-yellow-500',
      preview: 'Data-driven recommendations ranked by confidence, impact, and effort'
    },
    {
      id: 'themes',
      title: 'Investigation Themes',
      description: 'Areas requiring research',
      path: '/dashboard/themes',
      icon: Search,
      color: 'bg-indigo-500',
      preview: 'Patterns and signals that need deeper analysis and validation'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden p-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 relative z-10">
        <div className="glass-card rounded-2xl border border-purple-500/30 p-8 glow-purple">
          <div className="flex items-center gap-3 mb-3">
            <div className="gradient-purple-pink p-3 rounded-xl">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Screen Gallery</h1>
          </div>
          <p className="text-slate-200 text-lg">
            All dashboard screens and detail views - Click any screen to view it live
          </p>
        </div>
      </div>

      {/* Screen Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {screens.map((screen) => {
          const Icon = screen.icon;
          return (
            <Link 
              key={screen.id}
              href={screen.path}
              className="glass-card overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-purple-500/30 hover:border-purple-400 rounded-2xl glow-purple hover:scale-[1.02]"
            >
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`${screen.color} p-3 rounded-xl shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{screen.title}</h3>
                      <p className="text-sm text-slate-200 mt-1">{screen.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                    Screen {screens.indexOf(screen) + 1}
                  </Badge>
                </div>
              </div>

              <div className="px-6 space-y-4">
                {/* Preview Description */}
                <div className="glass-card rounded-xl p-4 border-l-4 border-blue-400">
                  <p className="text-sm text-slate-100">{screen.preview}</p>
                </div>

                {/* Screen Preview Mockup */}
                <div className="gradient-blue-purple rounded-xl p-6 min-h-[300px] flex items-center justify-center border-2 border-purple-500/30 shadow-inner">
                  <div className="text-center space-y-4">
                    <Icon className={`h-16 w-16 mx-auto text-white/60`} />
                    <div>
                      <p className="font-semibold text-white mb-2">Interactive Screen Preview</p>
                      <p className="text-sm text-purple-100 mb-4">
                        Click anywhere to view the full screen
                      </p>
                      <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Screen
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="pb-6">
                  <h4 className="font-semibold text-sm mb-3 text-slate-200">Key Features:</h4>
                  <div className="space-y-2">
                    {getKeyFeatures(screen.id).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-slate-100">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="max-w-7xl mx-auto mt-8 glass-card rounded-2xl border border-purple-500/30 p-8 relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-1 text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              Ready to explore?
            </h3>
            <p className="text-sm text-slate-200">
              Start with the main dashboard or jump directly to any detail screen
            </p>
          </div>
          <Button asChild size="lg" className="gradient-purple-pink hover:opacity-90 text-white shadow-lg">
            <Link href="/">
              <LayoutDashboard className="h-5 w-5 mr-2" />
              Start from Beginning
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

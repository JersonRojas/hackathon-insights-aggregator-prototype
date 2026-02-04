"use client"

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Database, AlertCircle } from 'lucide-react';
import { themes } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ThemesDetail() {
  const priorityData = [
    { name: 'High', value: themes.filter(t => t.priority === 'high').length, color: '#ef4444' },
    { name: 'Medium', value: themes.filter(t => t.priority === 'medium').length, color: '#f59e0b' },
    { name: 'Low', value: themes.filter(t => t.priority === 'low').length, color: '#3b82f6' },
  ];

  const totalDataPoints = themes.reduce((sum, t) => sum + t.dataPoints, 0);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500/30 bg-red-500/5';
      case 'medium': return 'border-yellow-500/30 bg-yellow-500/5';
      case 'low': return 'border-blue-500/30 bg-blue-500/5';
      default: return 'border-slate-500/30 bg-slate-500/5';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 min-h-full">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="text-slate-200 hover:text-white hover:bg-purple-500/20">
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-semibold text-white">Themes for Investigation</h1>
          <p className="text-slate-300 mt-1">Patterns requiring deeper analysis and research</p>
        </div>
      </div>

      {/* Info Banner */}
      <Card className="glass-card border-blue-500/30 bg-blue-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-300 mb-1">What are Investigation Themes?</h3>
              <p className="text-sm text-blue-200/80">
                These are patterns or signals detected in your data that don&apos;t have enough supporting evidence yet 
                for concrete recommendations. They represent opportunities for targeted research, user testing, 
                or additional data collection to validate hypotheses and inform future product decisions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-purple-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Total Themes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{themes.length}</div>
            <p className="text-sm text-slate-400 mt-1">Areas to explore</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-blue-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Data Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{totalDataPoints}</div>
            <p className="text-sm text-slate-400 mt-1">Total signals collected</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-red-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">
              {themes.filter(t => t.priority === 'high').length}
            </div>
            <p className="text-sm text-slate-400 mt-1">Requires immediate research</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-purple-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Avg Data Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">
              {Math.round(totalDataPoints / themes.length)}
            </div>
            <p className="text-sm text-slate-400 mt-1">Per theme</p>
          </CardContent>
        </Card>
      </div>

      {/* Priority Distribution Chart */}
      <Card className="glass-card border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white">Priority Distribution</CardTitle>
          <CardDescription className="text-slate-400">Themes by investigation priority</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
              <YAxis tick={{ fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                  borderRadius: '8px',
                  color: '#e2e8f0'
                }} 
              />
              <Bar dataKey="value" name="Number of Themes">
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Themes List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">All Investigation Themes</h2>
        {themes.map((theme) => (
          <Card key={theme.id} className={`glass-card border-l-4 ${getPriorityColor(theme.priority)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Search className="h-5 w-5 text-slate-400" />
                    <CardTitle className="text-white">{theme.title}</CardTitle>
                  </div>
                  <CardDescription className="text-slate-400">{theme.description}</CardDescription>
                </div>
                <Badge className={getPriorityBadgeClass(theme.priority)}>
                  {theme.priority} priority
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Data Points and Sources */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="h-5 w-5 text-blue-400" />
                    <span className="font-semibold text-white">Data Points Collected</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-400">{theme.dataPoints}</div>
                  <p className="text-sm text-slate-400 mt-1">
                    Mentions, signals, and observations
                  </p>
                </div>

                <div className="glass-card rounded-lg p-4">
                  <div className="font-semibold mb-3 text-white">Related Data Sources</div>
                  <div className="flex flex-wrap gap-2">
                    {theme.relatedSources.map((source) => (
                      <Badge key={source} variant="outline" className="text-slate-300 border-slate-600">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Next Steps */}
              <div className="glass-card rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-white">Recommended Research Actions</h4>
                <ul className="space-y-2">
                  <li className="text-sm flex items-start gap-2 text-slate-300">
                    <span className="font-medium text-blue-400">1.</span>
                    <span>Conduct targeted user interviews with 8-10 participants to explore this theme in depth</span>
                  </li>
                  <li className="text-sm flex items-start gap-2 text-slate-300">
                    <span className="font-medium text-blue-400">2.</span>
                    <span>Review analytics data to identify behavioral patterns related to this theme</span>
                  </li>
                  <li className="text-sm flex items-start gap-2 text-slate-300">
                    <span className="font-medium text-blue-400">3.</span>
                    <span>Survey broader user base to quantify interest and validate significance</span>
                  </li>
                  <li className="text-sm flex items-start gap-2 text-slate-300">
                    <span className="font-medium text-blue-400">4.</span>
                    <span>Conduct competitive analysis to understand how others address this need</span>
                  </li>
                </ul>
              </div>

              {/* Potential Impact */}
              <div className="border-t border-slate-700/50 pt-4">
                <h4 className="font-semibold text-sm mb-2 text-white">Why This Matters</h4>
                <p className="text-sm text-slate-400">
                  {theme.priority === 'high' && (
                    <>
                      This high-priority theme has significant potential impact on user satisfaction and product success. 
                      Multiple data sources have flagged this area, making it a strong candidate for immediate investigation.
                    </>
                  )}
                  {theme.priority === 'medium' && (
                    <>
                      This theme shows promise but requires validation through additional research. 
                      The data suggests user interest, but the exact nature and scope need clarification.
                    </>
                  )}
                  {theme.priority === 'low' && (
                    <>
                      While this theme has fewer mentions, it could represent an emerging need or underserved segment. 
                      Consider monitoring over time and conducting exploratory research when resources allow.
                    </>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button asChild className="gradient-purple-pink hover:opacity-90 text-white">
          <Link href="/dashboard/recommendations">
            View Current Recommendations
          </Link>
        </Button>
        <Button variant="outline" asChild className="glass-card border-purple-500/30 text-slate-200 hover:text-white hover:border-purple-400">
          <Link href="/dashboard">
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}

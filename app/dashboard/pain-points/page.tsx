"use client"

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { painPoints } from '@/lib/mock-data';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function PainPointsDetail() {
  const severityData = [
    { name: 'High', value: painPoints.filter(p => p.severity === 'high').length, color: '#ef4444' },
    { name: 'Medium', value: painPoints.filter(p => p.severity === 'medium').length, color: '#f59e0b' },
    { name: 'Low', value: painPoints.filter(p => p.severity === 'low').length, color: '#3b82f6' },
  ];

  const totalComplaints = painPoints.reduce((sum, p) => sum + p.count, 0);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'gradient-pink-orange';
      case 'medium': return 'bg-gradient-to-br from-yellow-400 to-orange-500';
      case 'low': return 'gradient-cyan-blue';
      default: return 'bg-gray-500';
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
          <h1 className="text-3xl font-semibold text-white">Customer Pain Points</h1>
          <p className="text-slate-300 mt-1">Identified issues across all data sources</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-purple-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Total Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{totalComplaints}</div>
            <p className="text-sm text-slate-400 mt-1">Across {painPoints.length} categories</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-red-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">High Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">
              {painPoints.filter(p => p.severity === 'high').length}
            </div>
            <p className="text-sm text-slate-400 mt-1">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-yellow-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Medium Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">
              {painPoints.filter(p => p.severity === 'medium').length}
            </div>
            <p className="text-sm text-slate-400 mt-1">Plan for improvement</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-blue-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Low Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">
              {painPoints.filter(p => p.severity === 'low').length}
            </div>
            <p className="text-sm text-slate-400 mt-1">Monitor and track</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white">Pain Points by Severity</CardTitle>
            <CardDescription className="text-slate-400">Distribution of issues by priority level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(124, 58, 237, 0.3)',
                    borderRadius: '8px',
                    color: '#e2e8f0'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white">Top Pain Point</CardTitle>
            <CardDescription className="text-slate-400">Issue with highest complaint volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={`h-20 w-20 rounded-full flex items-center justify-center text-white font-semibold ${getSeverityColor(painPoints[0].severity)}`}>
                  <div className="text-center">
                    <div className="text-2xl">{painPoints[0].count}</div>
                    <div className="text-xs">issues</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white">{painPoints[0].title}</h3>
                  <Badge variant="destructive" className="mt-1 bg-red-500/20 text-red-300 border-red-500/30">High Priority</Badge>
                </div>
              </div>
              <p className="text-sm text-slate-300">{painPoints[0].details}</p>
              <div className="flex flex-wrap gap-2">
                {painPoints[0].sources.map((source) => (
                  <Badge key={source} variant="outline" className="text-slate-300 border-slate-600">{source}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Pain Points List */}
      <Card className="glass-card border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white">All Pain Points</CardTitle>
          <CardDescription className="text-slate-400">Complete list with details and data sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {painPoints.map((pain, index) => (
              <div key={pain.id} className="glass-card border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  {/* Count Badge */}
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${getSeverityColor(pain.severity)}`}>
                    <div className="text-center">
                      <div className="text-xl">{pain.count}</div>
                      <div className="text-xs">issues</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-white">{pain.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            className={
                              pain.severity === 'high' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                              pain.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                              'bg-blue-500/20 text-blue-300 border-blue-500/30'
                            }
                          >
                            {pain.severity} severity
                          </Badge>
                          <span className="text-sm text-slate-400">#{index + 1} by volume</span>
                        </div>
                      </div>
                      {pain.severity === 'high' && (
                        <AlertTriangle className="h-6 w-6 text-red-400" />
                      )}
                    </div>

                    <p className="text-sm text-slate-300 mb-3">{pain.details}</p>

                    <div>
                      <div className="text-sm font-medium text-slate-400 mb-2">Data Sources:</div>
                      <div className="flex flex-wrap gap-2">
                        {pain.sources.map((source) => (
                          <Badge key={source} variant="outline" className="text-xs text-slate-300 border-slate-600">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button asChild className="gradient-purple-pink hover:opacity-90 text-white">
          <Link href="/dashboard/recommendations">
            View Related Recommendations
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

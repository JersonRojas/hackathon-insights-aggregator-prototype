"use client"

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, ExternalLink } from 'lucide-react';
import { trendingInsights } from '@/lib/mock-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TrendingDetail() {
  // Calculate average relevance score
  const avgRelevance = Math.round(
    trendingInsights.reduce((sum, t) => sum + t.relevanceScore, 0) / trendingInsights.length
  );

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
          <h1 className="text-3xl font-semibold text-white">Trending Insights</h1>
          <p className="text-slate-300 mt-1">Market trends and competitive intelligence</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card border-purple-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Total Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{trendingInsights.length}</div>
            <p className="text-sm text-slate-400 mt-1">External insights tracked</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-blue-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Avg Relevance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{avgRelevance}%</div>
            <p className="text-sm text-slate-400 mt-1">Match to your product</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-purple-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">
              {trendingInsights.filter(t => t.relevanceScore >= 90).length}
            </div>
            <p className="text-sm text-slate-400 mt-1">Trends above 90% relevance</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Trends */}
      <div className="space-y-6">
        {trendingInsights.map((insight) => (
          <Card key={insight.id} className="glass-card border-purple-500/30">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    <CardTitle className="text-white">{insight.title}</CardTitle>
                  </div>
                  <CardDescription className="flex items-center gap-4 text-slate-400">
                    <span>{insight.source}</span>
                    <span>-</span>
                    <Badge variant="outline" className="text-slate-300 border-slate-600">{insight.category}</Badge>
                    <span>-</span>
                    <Badge 
                      className={insight.relevanceScore >= 90 ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-slate-500/20 text-slate-300 border-slate-500/30'}
                    >
                      {insight.relevanceScore}% relevant
                    </Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Summary */}
                <div>
                  <h4 className="font-semibold mb-3 text-white">Summary</h4>
                  <p className="text-slate-300 mb-4">{insight.summary}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-white">Why This Matters</h4>
                      <p className="text-sm text-slate-400">
                        This trend shows significant market movement that could impact your product strategy. 
                        Consider how this aligns with current user pain points and feature requests.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-white">Recommended Action</h4>
                      <p className="text-sm text-slate-400">
                        Conduct competitive analysis and user research to validate applicability to your user base.
                        Review related recommendations for implementation guidance.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trend Chart */}
                <div>
                  <h4 className="font-semibold mb-3 text-white">Trend Over Time</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={insight.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" fontSize={12} tick={{ fill: '#94a3b8' }} />
                      <YAxis fontSize={12} tick={{ fill: '#94a3b8' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                          border: '1px solid rgba(124, 58, 237, 0.3)',
                          borderRadius: '8px',
                          color: '#e2e8f0'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#3b82f6' }}
                        name="Adoption Rate (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>

                  {/* Additional Metrics */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="glass-card rounded-lg p-3">
                      <div className="text-sm text-slate-400 mb-1">Growth Rate</div>
                      <div className="text-xl font-bold text-green-400">
                        +{Math.round(
                          ((insight.chartData[insight.chartData.length - 1].value - 
                            insight.chartData[0].value) / 
                            insight.chartData[0].value) * 100
                        )}%
                      </div>
                    </div>
                    <div className="glass-card rounded-lg p-3">
                      <div className="text-sm text-slate-400 mb-1">Current Value</div>
                      <div className="text-xl font-bold text-blue-400">
                        {insight.chartData[insight.chartData.length - 1].value}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Source Attribution */}
              <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between">
                <div className="text-sm text-slate-400">
                  Source: <span className="font-medium text-slate-300">{insight.source}</span>
                </div>
                <Button variant="outline" size="sm" className="glass-card border-purple-500/30 text-slate-200 hover:text-white">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Original Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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

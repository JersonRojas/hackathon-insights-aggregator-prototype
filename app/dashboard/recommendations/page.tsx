"use client"

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Lightbulb, Target, Zap, CheckCircle2 } from 'lucide-react';
import { recommendations } from '@/lib/mock-data';

export default function RecommendationsDetail() {
  const highConfidence = recommendations.filter(r => r.confidenceLevel >= 80).length;

  const getConfidenceColor = (level: number) => {
    if (level >= 80) return 'text-green-400';
    if (level >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getConfidenceBg = (level: number) => {
    if (level >= 80) return 'border-green-500/30 bg-green-500/5';
    if (level >= 70) return 'border-yellow-500/30 bg-yellow-500/5';
    return 'border-orange-500/30 bg-orange-500/5';
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high': return <Target className="h-5 w-5 text-red-400" />;
      case 'medium': return <Target className="h-5 w-5 text-yellow-400" />;
      case 'low': return <Target className="h-5 w-5 text-blue-400" />;
      default: return null;
    }
  };

  const getEffortIcon = (effort: string) => {
    switch (effort) {
      case 'low': return <Zap className="h-5 w-5 text-green-400" />;
      case 'medium': return <Zap className="h-5 w-5 text-yellow-400" />;
      case 'high': return <Zap className="h-5 w-5 text-red-400" />;
      default: return null;
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
          <h1 className="text-3xl font-semibold text-white">Recommendations</h1>
          <p className="text-slate-300 mt-1">Data-driven actions ranked by confidence and impact</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-purple-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Total Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{recommendations.length}</div>
            <p className="text-sm text-slate-400 mt-1">Action items identified</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-green-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">High Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">{highConfidence}</div>
            <p className="text-sm text-slate-400 mt-1">80%+ confidence level</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-purple-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">High Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">
              {recommendations.filter(r => r.impact === 'high').length}
            </div>
            <p className="text-sm text-slate-400 mt-1">Maximum business value</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-blue-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Quick Wins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">
              {recommendations.filter(r => r.effort === 'low' && r.impact !== 'low').length}
            </div>
            <p className="text-sm text-slate-400 mt-1">Low effort, high return</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations Matrix Visualization */}
      <Card className="glass-card border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white">Priority Matrix</CardTitle>
          <CardDescription className="text-slate-400">Recommendations plotted by impact and effort</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {/* High Impact, Low Effort - Quick Wins */}
            <div className="border-2 border-green-500/30 rounded-lg p-4 bg-green-500/5">
              <div className="font-semibold text-green-300 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Quick Wins (High Impact, Low Effort)
              </div>
              <div className="space-y-2">
                {recommendations
                  .filter(r => r.impact === 'high' && r.effort === 'low')
                  .map(r => (
                    <div key={r.id} className="text-sm glass-card rounded p-2 text-slate-200">
                      {r.title}
                    </div>
                  ))}
                {recommendations.filter(r => r.impact === 'high' && r.effort === 'low').length === 0 && (
                  <div className="text-sm text-slate-500 italic">No items in this category</div>
                )}
              </div>
            </div>

            {/* High Impact, High Effort - Strategic */}
            <div className="border-2 border-purple-500/30 rounded-lg p-4 bg-purple-500/5">
              <div className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Strategic (High Impact, High Effort)
              </div>
              <div className="space-y-2">
                {recommendations
                  .filter(r => r.impact === 'high' && r.effort === 'high')
                  .map(r => (
                    <div key={r.id} className="text-sm glass-card rounded p-2 text-slate-200">
                      {r.title}
                    </div>
                  ))}
                {recommendations.filter(r => r.impact === 'high' && r.effort === 'high').length === 0 && (
                  <div className="text-sm text-slate-500 italic">No items in this category</div>
                )}
              </div>
            </div>

            {/* Medium/Low Impact, Low Effort - Easy Wins */}
            <div className="border-2 border-blue-500/30 rounded-lg p-4 bg-blue-500/5">
              <div className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Easy Wins (Low Impact, Low Effort)
              </div>
              <div className="space-y-2">
                {recommendations
                  .filter(r => r.impact !== 'high' && r.effort === 'low')
                  .map(r => (
                    <div key={r.id} className="text-sm glass-card rounded p-2 text-slate-200">
                      {r.title}
                    </div>
                  ))}
                {recommendations.filter(r => r.impact !== 'high' && r.effort === 'low').length === 0 && (
                  <div className="text-sm text-slate-500 italic">No items in this category</div>
                )}
              </div>
            </div>

            {/* Low Impact, High Effort - Reconsider */}
            <div className="border-2 border-slate-500/30 rounded-lg p-4 bg-slate-500/5">
              <div className="font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Reconsider (Low Impact, High Effort)
              </div>
              <div className="space-y-2">
                {recommendations
                  .filter(r => r.impact !== 'high' && r.effort === 'high')
                  .map(r => (
                    <div key={r.id} className="text-sm glass-card rounded p-2 text-slate-200">
                      {r.title}
                    </div>
                  ))}
                {recommendations.filter(r => r.impact !== 'high' && r.effort === 'high').length === 0 && (
                  <div className="text-sm text-slate-500 italic">No items in this category</div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Recommendations List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">All Recommendations</h2>
        {recommendations.map((rec, index) => (
          <Card key={rec.id} className={`glass-card border-l-4 ${getConfidenceBg(rec.confidenceLevel)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="font-mono text-slate-300 border-slate-600">
                      #{index + 1}
                    </Badge>
                    <CardTitle className="text-white">{rec.title}</CardTitle>
                  </div>
                  <CardDescription className="text-slate-400">{rec.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Confidence Level */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-300">Confidence Level</span>
                  <span className={`font-bold ${getConfidenceColor(rec.confidenceLevel)}`}>
                    {rec.confidenceLevel}%
                  </span>
                </div>
                <Progress value={rec.confidenceLevel} className="h-2 bg-slate-700" />
              </div>

              {/* Impact and Effort */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    {getImpactIcon(rec.impact)}
                    <span className="text-sm font-medium text-slate-300">Impact</span>
                  </div>
                  <Badge 
                    className={rec.impact === 'high' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-slate-500/20 text-slate-300 border-slate-500/30'}
                  >
                    {rec.impact}
                  </Badge>
                </div>

                <div className="glass-card rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    {getEffortIcon(rec.effort)}
                    <span className="text-sm font-medium text-slate-300">Effort</span>
                  </div>
                  <Badge 
                    className={rec.effort === 'low' ? 'bg-green-500/20 text-green-300 border-green-500/30' : rec.effort === 'medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 'bg-red-500/20 text-red-300 border-red-500/30'}
                  >
                    {rec.effort}
                  </Badge>
                </div>
              </div>

              {/* Supporting Data */}
              <div>
                <h4 className="font-semibold text-sm mb-2 text-white">Supporting Evidence</h4>
                <ul className="space-y-1">
                  {rec.supportingData.map((data, idx) => (
                    <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{data}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Metrics */}
              <div>
                <h4 className="font-semibold text-sm mb-2 text-white">Related Metrics</h4>
                <div className="flex flex-wrap gap-2">
                  {rec.metrics.map((metric) => (
                    <Badge key={metric} variant="outline" className="text-xs text-slate-300 border-slate-600">
                      {metric}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button asChild className="gradient-purple-pink hover:opacity-90 text-white">
          <Link href="/dashboard/themes">
            View Themes for Investigation
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

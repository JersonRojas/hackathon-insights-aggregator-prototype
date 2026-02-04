"use client"

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle } from 'lucide-react';
import { metrics } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function MetricsDetail() {
  const chartData = metrics.map(m => ({
    name: m.name,
    value: m.value,
    target: m.target,
    status: m.status
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'critical': return <AlertCircle className="h-5 w-5 text-red-400" />;
      default: return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-400" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-400" />;
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
          <h1 className="text-3xl font-semibold text-white">Metrics Performance</h1>
          <p className="text-slate-300 mt-1">Detailed view of all key performance indicators</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card border-green-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">On Track</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">
              {metrics.filter(m => m.status === 'good').length}
            </div>
            <p className="text-sm text-slate-400 mt-1">Metrics meeting targets</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-yellow-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Needs Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">
              {metrics.filter(m => m.status === 'warning').length}
            </div>
            <p className="text-sm text-slate-400 mt-1">Metrics below target</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-red-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">
              {metrics.filter(m => m.status === 'critical').length}
            </div>
            <p className="text-sm text-slate-400 mt-1">Metrics requiring action</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="glass-card border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white">Current Performance vs Target</CardTitle>
          <CardDescription className="text-slate-400">Visual comparison of actual values against targets</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                fontSize={12}
                tick={{ fill: '#94a3b8' }}
              />
              <YAxis tick={{ fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                  borderRadius: '8px',
                  color: '#e2e8f0'
                }} 
              />
              <Bar dataKey="target" fill="#374151" name="Target" />
              <Bar dataKey="value" name="Current">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Metrics List */}
      <Card className="glass-card border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white">All Metrics</CardTitle>
          <CardDescription className="text-slate-400">Complete breakdown of each metric</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.map((metric) => (
              <div key={metric.name} className="glass-card border border-slate-700/50 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(metric.status)}
                    <div>
                      <h3 className="font-semibold text-white">{metric.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getTrendIcon(metric.trend)}
                        <span className={`text-sm ${
                          metric.trend === 'up' && metric.status === 'good' ? 'text-green-400' :
                          metric.trend === 'down' && metric.status !== 'good' ? 'text-red-400' :
                          'text-slate-400'
                        }`}>
                          {metric.changePercent > 0 ? '+' : ''}{metric.changePercent}% from last period
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      metric.status === 'good' ? 'default' : 
                      metric.status === 'warning' ? 'secondary' : 
                      'destructive'
                    }
                    className={
                      metric.status === 'good' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 
                      metric.status === 'warning' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 
                      'bg-red-500/20 text-red-300 border-red-500/30'
                    }
                  >
                    {metric.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Current Value</div>
                    <div className="text-2xl font-bold text-white">{metric.value}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Target</div>
                    <div className="text-2xl font-bold text-slate-400">{metric.target}</div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Progress to Target</span>
                    <span className="font-medium text-white">
                      {Math.round((metric.value / metric.target) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(metric.value / metric.target) * 100} 
                    className="h-2 bg-slate-700"
                  />
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

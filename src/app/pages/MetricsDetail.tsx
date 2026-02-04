import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle } from 'lucide-react';
import { metrics } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function MetricsDetail() {
  const navigate = useNavigate();

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
      case 'good': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'critical': return <AlertCircle className="h-5 w-5 text-red-600" />;
      default: return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-600" />;
      default: return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-semibold">Metrics Performance</h1>
          <p className="text-gray-600 mt-1">Detailed view of all key performance indicators</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">On Track</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {metrics.filter(m => m.status === 'good').length}
            </div>
            <p className="text-sm text-gray-600 mt-1">Metrics meeting targets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Needs Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {metrics.filter(m => m.status === 'warning').length}
            </div>
            <p className="text-sm text-gray-600 mt-1">Metrics below target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {metrics.filter(m => m.status === 'critical').length}
            </div>
            <p className="text-sm text-gray-600 mt-1">Metrics requiring action</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Current Performance vs Target</CardTitle>
          <CardDescription>Visual comparison of actual values against targets</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="target" fill="#e5e7eb" name="Target" />
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
      <Card>
        <CardHeader>
          <CardTitle>All Metrics</CardTitle>
          <CardDescription>Complete breakdown of each metric</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.map((metric) => (
              <div key={metric.name} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(metric.status)}
                    <div>
                      <h3 className="font-semibold">{metric.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getTrendIcon(metric.trend)}
                        <span className={`text-sm ${
                          metric.trend === 'up' && metric.status === 'good' ? 'text-green-600' :
                          metric.trend === 'down' && metric.status !== 'good' ? 'text-red-600' :
                          'text-gray-600'
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
                  >
                    {metric.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Current Value</div>
                    <div className="text-2xl font-bold">{metric.value}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Target</div>
                    <div className="text-2xl font-bold text-gray-600">{metric.target}</div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress to Target</span>
                    <span className="font-medium">
                      {Math.round((metric.value / metric.target) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(metric.value / metric.target) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={() => navigate('/dashboard/recommendations')}>
          View Related Recommendations
        </Button>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
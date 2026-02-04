import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, AlertTriangle, TrendingUp } from 'lucide-react';
import { painPoints } from '../data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function PainPointsDetail() {
  const navigate = useNavigate();

  const severityData = [
    { name: 'High', value: painPoints.filter(p => p.severity === 'high').length, color: '#ef4444' },
    { name: 'Medium', value: painPoints.filter(p => p.severity === 'medium').length, color: '#f59e0b' },
    { name: 'Low', value: painPoints.filter(p => p.severity === 'low').length, color: '#3b82f6' },
  ];

  const totalComplaints = painPoints.reduce((sum, p) => sum + p.count, 0);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
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
          <h1 className="text-3xl font-semibold">Customer Pain Points</h1>
          <p className="text-gray-600 mt-1">Identified issues across all data sources</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalComplaints}</div>
            <p className="text-sm text-gray-600 mt-1">Across {painPoints.length} categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">High Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {painPoints.filter(p => p.severity === 'high').length}
            </div>
            <p className="text-sm text-gray-600 mt-1">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Medium Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {painPoints.filter(p => p.severity === 'medium').length}
            </div>
            <p className="text-sm text-gray-600 mt-1">Plan for improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Low Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {painPoints.filter(p => p.severity === 'low').length}
            </div>
            <p className="text-sm text-gray-600 mt-1">Monitor and track</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pain Points by Severity</CardTitle>
            <CardDescription>Distribution of issues by priority level</CardDescription>
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Pain Point</CardTitle>
            <CardDescription>Issue with highest complaint volume</CardDescription>
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
                  <h3 className="font-semibold text-lg">{painPoints[0].title}</h3>
                  <Badge variant="destructive" className="mt-1">High Priority</Badge>
                </div>
              </div>
              <p className="text-sm text-gray-700">{painPoints[0].details}</p>
              <div className="flex flex-wrap gap-2">
                {painPoints[0].sources.map((source) => (
                  <Badge key={source} variant="outline">{source}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Pain Points List */}
      <Card>
        <CardHeader>
          <CardTitle>All Pain Points</CardTitle>
          <CardDescription>Complete list with details and data sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {painPoints.map((pain, index) => (
              <div key={pain.id} className="border rounded-lg p-5">
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
                        <h3 className="font-semibold text-lg">{pain.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant={
                              pain.severity === 'high' ? 'destructive' :
                              pain.severity === 'medium' ? 'secondary' :
                              'outline'
                            }
                          >
                            {pain.severity} severity
                          </Badge>
                          <span className="text-sm text-gray-600">#{index + 1} by volume</span>
                        </div>
                      </div>
                      {pain.severity === 'high' && (
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                      )}
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{pain.details}</p>

                    <div>
                      <div className="text-sm font-medium text-gray-600 mb-2">Data Sources:</div>
                      <div className="flex flex-wrap gap-2">
                        {pain.sources.map((source) => (
                          <Badge key={source} variant="outline" className="text-xs">
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
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Search, Database, AlertCircle } from 'lucide-react';
import { themes } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function ThemesDetail() {
  const navigate = useNavigate();

  const priorityData = [
    { name: 'High', value: themes.filter(t => t.priority === 'high').length, color: '#ef4444' },
    { name: 'Medium', value: themes.filter(t => t.priority === 'medium').length, color: '#f59e0b' },
    { name: 'Low', value: themes.filter(t => t.priority === 'low').length, color: '#3b82f6' },
  ];

  const totalDataPoints = themes.reduce((sum, t) => sum + t.dataPoints, 0);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
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
          <h1 className="text-3xl font-semibold">Themes for Investigation</h1>
          <p className="text-gray-600 mt-1">Patterns requiring deeper analysis and research</p>
        </div>
      </div>

      {/* Info Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">What are Investigation Themes?</h3>
              <p className="text-sm text-blue-800">
                These are patterns or signals detected in your data that don't have enough supporting evidence yet 
                for concrete recommendations. They represent opportunities for targeted research, user testing, 
                or additional data collection to validate hypotheses and inform future product decisions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Themes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{themes.length}</div>
            <p className="text-sm text-gray-600 mt-1">Areas to explore</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Data Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{totalDataPoints}</div>
            <p className="text-sm text-gray-600 mt-1">Total signals collected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {themes.filter(t => t.priority === 'high').length}
            </div>
            <p className="text-sm text-gray-600 mt-1">Requires immediate research</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Data Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {Math.round(totalDataPoints / themes.length)}
            </div>
            <p className="text-sm text-gray-600 mt-1">Per theme</p>
          </CardContent>
        </Card>
      </div>

      {/* Priority Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Distribution</CardTitle>
          <CardDescription>Themes by investigation priority</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
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
        <h2 className="text-xl font-semibold">All Investigation Themes</h2>
        {themes.map((theme, index) => (
          <Card key={theme.id} className={`border-l-4 ${getPriorityColor(theme.priority)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Search className="h-5 w-5 text-gray-600" />
                    <CardTitle>{theme.title}</CardTitle>
                  </div>
                  <CardDescription>{theme.description}</CardDescription>
                </div>
                <Badge variant={getPriorityBadgeVariant(theme.priority)}>
                  {theme.priority} priority
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Data Points and Sources */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">Data Points Collected</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">{theme.dataPoints}</div>
                  <p className="text-sm text-gray-600 mt-1">
                    Mentions, signals, and observations
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="font-semibold mb-3">Related Data Sources</div>
                  <div className="flex flex-wrap gap-2">
                    {theme.relatedSources.map((source) => (
                      <Badge key={source} variant="outline">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Next Steps */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Recommended Research Actions</h4>
                <ul className="space-y-2">
                  <li className="text-sm flex items-start gap-2">
                    <span className="font-medium text-blue-600">1.</span>
                    <span>Conduct targeted user interviews with 8-10 participants to explore this theme in depth</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <span className="font-medium text-blue-600">2.</span>
                    <span>Review analytics data to identify behavioral patterns related to this theme</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <span className="font-medium text-blue-600">3.</span>
                    <span>Survey broader user base to quantify interest and validate significance</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <span className="font-medium text-blue-600">4.</span>
                    <span>Conduct competitive analysis to understand how others address this need</span>
                  </li>
                </ul>
              </div>

              {/* Potential Impact */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-sm mb-2">Why This Matters</h4>
                <p className="text-sm text-gray-700">
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
        <Button onClick={() => navigate('/dashboard/recommendations')}>
          View Current Recommendations
        </Button>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
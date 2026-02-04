import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, TrendingUp, ExternalLink } from 'lucide-react';
import { trendingInsights } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function TrendingDetail() {
  const navigate = useNavigate();

  // Calculate average relevance score
  const avgRelevance = Math.round(
    trendingInsights.reduce((sum, t) => sum + t.relevanceScore, 0) / trendingInsights.length
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-semibold">Trending Insights</h1>
          <p className="text-gray-600 mt-1">Market trends and competitive intelligence</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{trendingInsights.length}</div>
            <p className="text-sm text-gray-600 mt-1">External insights tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Relevance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{avgRelevance}%</div>
            <p className="text-sm text-gray-600 mt-1">Match to your product</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {trendingInsights.filter(t => t.relevanceScore >= 90).length}
            </div>
            <p className="text-sm text-gray-600 mt-1">Trends above 90% relevance</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Trends */}
      <div className="space-y-6">
        {trendingInsights.map((insight, index) => (
          <Card key={insight.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <CardTitle>{insight.title}</CardTitle>
                  </div>
                  <CardDescription className="flex items-center gap-4">
                    <span>{insight.source}</span>
                    <span>•</span>
                    <Badge variant="outline">{insight.category}</Badge>
                    <span>•</span>
                    <Badge 
                      variant={insight.relevanceScore >= 90 ? 'default' : 'secondary'}
                      className={insight.relevanceScore >= 90 ? 'bg-purple-600' : ''}
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
                  <h4 className="font-semibold mb-3">Summary</h4>
                  <p className="text-gray-700 mb-4">{insight.summary}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Why This Matters</h4>
                      <p className="text-sm text-gray-600">
                        This trend shows significant market movement that could impact your product strategy. 
                        Consider how this aligns with current user pain points and feature requests.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">Recommended Action</h4>
                      <p className="text-sm text-gray-600">
                        Conduct competitive analysis and user research to validate applicability to your user base.
                        Review related recommendations for implementation guidance.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trend Chart */}
                <div>
                  <h4 className="font-semibold mb-3">Trend Over Time</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={insight.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Adoption Rate (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>

                  {/* Additional Metrics */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600 mb-1">Growth Rate</div>
                      <div className="text-xl font-bold text-green-600">
                        +{Math.round(
                          ((insight.chartData[insight.chartData.length - 1].value - 
                            insight.chartData[0].value) / 
                            insight.chartData[0].value) * 100
                        )}%
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600 mb-1">Current Value</div>
                      <div className="text-xl font-bold text-blue-600">
                        {insight.chartData[insight.chartData.length - 1].value}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Source Attribution */}
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Source: <span className="font-medium">{insight.source}</span>
                </div>
                <Button variant="outline" size="sm">
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
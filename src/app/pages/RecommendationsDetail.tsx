import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { ArrowLeft, Lightbulb, Target, Zap, CheckCircle2 } from 'lucide-react';
import { recommendations } from '../data/mockData';

export function RecommendationsDetail() {
  const navigate = useNavigate();

  const highConfidence = recommendations.filter(r => r.confidenceLevel >= 80).length;
  const mediumConfidence = recommendations.filter(r => r.confidenceLevel >= 70 && r.confidenceLevel < 80).length;

  const getConfidenceColor = (level: number) => {
    if (level >= 80) return 'text-green-600';
    if (level >= 70) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getConfidenceBg = (level: number) => {
    if (level >= 80) return 'bg-green-50 border-green-500';
    if (level >= 70) return 'bg-yellow-50 border-yellow-500';
    return 'bg-orange-50 border-orange-500';
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high': return <Target className="h-5 w-5 text-red-600" />;
      case 'medium': return <Target className="h-5 w-5 text-yellow-600" />;
      case 'low': return <Target className="h-5 w-5 text-blue-600" />;
      default: return null;
    }
  };

  const getEffortIcon = (effort: string) => {
    switch (effort) {
      case 'low': return <Zap className="h-5 w-5 text-green-600" />;
      case 'medium': return <Zap className="h-5 w-5 text-yellow-600" />;
      case 'high': return <Zap className="h-5 w-5 text-red-600" />;
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
          <h1 className="text-3xl font-semibold">Recommendations</h1>
          <p className="text-gray-600 mt-1">Data-driven actions ranked by confidence and impact</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{recommendations.length}</div>
            <p className="text-sm text-gray-600 mt-1">Action items identified</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">High Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{highConfidence}</div>
            <p className="text-sm text-gray-600 mt-1">80%+ confidence level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">High Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {recommendations.filter(r => r.impact === 'high').length}
            </div>
            <p className="text-sm text-gray-600 mt-1">Maximum business value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Quick Wins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {recommendations.filter(r => r.effort === 'low' && r.impact !== 'low').length}
            </div>
            <p className="text-sm text-gray-600 mt-1">Low effort, high return</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations Matrix Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Matrix</CardTitle>
          <CardDescription>Recommendations plotted by impact and effort</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {/* High Impact, Low Effort - Quick Wins */}
            <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50">
              <div className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Quick Wins (High Impact, Low Effort)
              </div>
              <div className="space-y-2">
                {recommendations
                  .filter(r => r.impact === 'high' && r.effort === 'low')
                  .map(r => (
                    <div key={r.id} className="text-sm bg-white rounded p-2">
                      {r.title}
                    </div>
                  ))}
                {recommendations.filter(r => r.impact === 'high' && r.effort === 'low').length === 0 && (
                  <div className="text-sm text-gray-600 italic">No items in this category</div>
                )}
              </div>
            </div>

            {/* High Impact, High Effort - Strategic */}
            <div className="border-2 border-purple-500 rounded-lg p-4 bg-purple-50">
              <div className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Strategic (High Impact, High Effort)
              </div>
              <div className="space-y-2">
                {recommendations
                  .filter(r => r.impact === 'high' && r.effort === 'high')
                  .map(r => (
                    <div key={r.id} className="text-sm bg-white rounded p-2">
                      {r.title}
                    </div>
                  ))}
                {recommendations.filter(r => r.impact === 'high' && r.effort === 'high').length === 0 && (
                  <div className="text-sm text-gray-600 italic">No items in this category</div>
                )}
              </div>
            </div>

            {/* Medium/Low Impact, Low Effort - Easy Wins */}
            <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
              <div className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Easy Wins (Low Impact, Low Effort)
              </div>
              <div className="space-y-2">
                {recommendations
                  .filter(r => r.impact !== 'high' && r.effort === 'low')
                  .map(r => (
                    <div key={r.id} className="text-sm bg-white rounded p-2">
                      {r.title}
                    </div>
                  ))}
                {recommendations.filter(r => r.impact !== 'high' && r.effort === 'low').length === 0 && (
                  <div className="text-sm text-gray-600 italic">No items in this category</div>
                )}
              </div>
            </div>

            {/* Low Impact, High Effort - Reconsider */}
            <div className="border-2 border-gray-400 rounded-lg p-4 bg-gray-50">
              <div className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Reconsider (Low Impact, High Effort)
              </div>
              <div className="space-y-2">
                {recommendations
                  .filter(r => r.impact !== 'high' && r.effort === 'high')
                  .map(r => (
                    <div key={r.id} className="text-sm bg-white rounded p-2">
                      {r.title}
                    </div>
                  ))}
                {recommendations.filter(r => r.impact !== 'high' && r.effort === 'high').length === 0 && (
                  <div className="text-sm text-gray-600 italic">No items in this category</div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Recommendations List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Recommendations</h2>
        {recommendations.map((rec, index) => (
          <Card key={rec.id} className={`border-l-4 ${getConfidenceBg(rec.confidenceLevel)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="font-mono">
                      #{index + 1}
                    </Badge>
                    <CardTitle>{rec.title}</CardTitle>
                  </div>
                  <CardDescription>{rec.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Confidence Level */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Confidence Level</span>
                  <span className={`font-bold ${getConfidenceColor(rec.confidenceLevel)}`}>
                    {rec.confidenceLevel}%
                  </span>
                </div>
                <Progress value={rec.confidenceLevel} className="h-2" />
              </div>

              {/* Impact and Effort */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    {getImpactIcon(rec.impact)}
                    <span className="text-sm font-medium">Impact</span>
                  </div>
                  <Badge 
                    variant={rec.impact === 'high' ? 'default' : 'secondary'}
                    className={rec.impact === 'high' ? 'bg-purple-600' : ''}
                  >
                    {rec.impact}
                  </Badge>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    {getEffortIcon(rec.effort)}
                    <span className="text-sm font-medium">Effort</span>
                  </div>
                  <Badge 
                    variant={rec.effort === 'low' ? 'default' : rec.effort === 'medium' ? 'secondary' : 'outline'}
                    className={rec.effort === 'low' ? 'bg-green-600' : ''}
                  >
                    {rec.effort}
                  </Badge>
                </div>
              </div>

              {/* Supporting Data */}
              <div>
                <h4 className="font-semibold text-sm mb-2">Supporting Evidence</h4>
                <ul className="space-y-1">
                  {rec.supportingData.map((data, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{data}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Metrics */}
              <div>
                <h4 className="font-semibold text-sm mb-2">Related Metrics</h4>
                <div className="flex flex-wrap gap-2">
                  {rec.metrics.map((metric) => (
                    <Badge key={metric} variant="outline" className="text-xs">
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
        <Button onClick={() => navigate('/dashboard/themes')}>
          View Themes for Investigation
        </Button>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
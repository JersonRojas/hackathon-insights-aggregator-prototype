import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  Lightbulb,
  Search,
  Zap,
} from "lucide-react";
import {
  metrics,
  painPoints,
  trendingInsights,
  recommendations,
  themes,
} from "../data/mockData";
import insightsData from "../data/insights.json";

export function Dashboard() {
  const navigate = useNavigate();

  // Calculate status summary for metrics
  const metricsStatus = {
    good: metrics.filter((m) => m.status === "good").length,
    warning: metrics.filter((m) => m.status === "warning").length,
    critical: metrics.filter((m) => m.status === "critical").length,
  };

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 min-h-full">
      {/* Top Row - Metrics, Pain Points, Trending */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* At a Glance Metrics */}
        <div
          className="glass-card rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 border border-green-500/20 glow-blue"
          onClick={() => navigate("/dashboard/metrics")}
        >
          <div className="gradient-cyan-blue p-6">
            <CardTitle className="text-white text-xl">
              At a Glance Metrics
            </CardTitle>
            <CardDescription className="text-blue-100 mt-1">
              Key performance indicators
            </CardDescription>
          </div>
          <CardContent className="space-y-5 p-6">
            {/* Status bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium flex items-center gap-2 text-slate-200">
                    <div className="gradient-green-cyan p-1.5 rounded-full">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    On Track
                  </span>
                  <span className="text-sm font-semibold text-green-400">
                    {metricsStatus.good}
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-green-cyan rounded-full"
                    style={{
                      width: `${(metricsStatus.good / metrics.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium flex items-center gap-2 text-slate-200">
                    <div className="bg-yellow-500 p-1.5 rounded-full">
                      <AlertCircle className="h-4 w-4 text-white" />
                    </div>
                    Needs Attention
                  </span>
                  <span className="text-sm font-semibold text-yellow-400">
                    {metricsStatus.warning}
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                    style={{
                      width: `${(metricsStatus.warning / metrics.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium flex items-center gap-2 text-slate-200">
                    <div className="bg-red-500 p-1.5 rounded-full">
                      <AlertCircle className="h-4 w-4 text-white" />
                    </div>
                    Critical
                  </span>
                  <span className="text-sm font-semibold text-red-400">
                    {metricsStatus.critical}
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-pink-orange rounded-full"
                    style={{
                      width: `${(metricsStatus.critical / metrics.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-between mt-6 text-slate-200 hover:text-white hover:bg-blue-500/20 rounded-xl"
            >
              View Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </div>

        {/* Pain Points at a Glance */}
        <div
          className="glass-card rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 border border-red-500/20 glow-pink"
          onClick={() => navigate("/dashboard/pain-points")}
        >
          <div className="gradient-pink-orange p-6">
            <CardTitle className="text-white text-xl">
              Pain Points at a Glance
            </CardTitle>
            <CardDescription className="text-pink-100 mt-1">
              Top customer issues
            </CardDescription>
          </div>
          <CardContent className="space-y-5 p-6">
            {painPoints.slice(0, 2).map((pain) => (
              <div key={pain.id} className="flex items-center gap-4">
                <div
                  className={`
                    h-20 w-20 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-semibold shadow-lg
                    ${
                      pain.severity === "high"
                        ? "gradient-pink-orange glow-pink"
                        : pain.severity === "medium"
                          ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                          : "gradient-cyan-blue"
                    }
                  `}
                >
                  <div className="text-center">
                    <div className="text-xs opacity-90">Issues</div>
                    <div className="text-2xl font-bold">{pain.count}</div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-200 truncate">
                    {pain.title}
                  </div>
                  <div className="text-xs text-slate-200 mt-1 flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    {pain.sources.length} sources
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="ghost"
              className="w-full justify-between mt-6 text-slate-300 hover:text-white hover:bg-red-500/20 rounded-xl"
            >
              View All Pain Points
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </div>

        {/* Trending Metrics */}
        <div
          className="glass-card rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 border border-purple-500/20 glow-purple"
          onClick={() => navigate("/dashboard/trending")}
        >
          <div className="gradient-purple-pink p-6">
            <CardTitle className="text-white text-xl">
              Trending Insights
            </CardTitle>
            <CardDescription className="text-purple-100 mt-1">
              External market trends
            </CardDescription>
          </div>
          <CardContent className="space-y-4 p-6">
            {trendingInsights.slice(0, 3).map((insight) => (
              <div
                key={insight.id}
                className="glass-card border-l-4 border-purple-400 rounded-xl pl-4 pr-3 py-3"
              >
                <div className="font-medium text-slate-200 mb-2">
                  {insight.title}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <TrendingUp className="h-3 w-3 text-purple-400" />
                  <span>{insight.source}</span>
                  <span>•</span>
                  <Badge className="text-xs bg-purple-500/20 text-purple-200 border-purple-500/30">
                    {insight.relevanceScore}% relevant
                  </Badge>
                </div>
              </div>
            ))}

            <Button
              variant="ghost"
              className="w-full justify-between mt-6 text-slate-300 hover:text-white hover:bg-purple-500/20 rounded-xl"
            >
              View All Trends
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </div>
      </div>

      {/* Generated Insights Pods */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {insightsData[0].insights.map((insight) => (
          <div
            key={insight.id}
            className="glass-card rounded-2xl overflow-hidden border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="bg-orange-600/50 p-2 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs text-slate-200 bg-slate-800/50 px-2 py-1 rounded-full">
                  {new Date(insight.updated_at).toLocaleDateString()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2 leading-tight">
                  {insight.title}
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {insight.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Row - Recommendations and Themes */}
      <div
        className="glass-card rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.01] transition-all duration-300 border border-blue-500/20 glow-blue"
        onClick={() => navigate("/dashboard/recommendations")}
      >
        <div className="gradient-blue-purple p-6">
          <CardTitle className="text-white text-2xl">
            What You Should Focus On
          </CardTitle>
          <CardDescription className="text-blue-100 mt-2 text-base">
            Prioritized recommendations based on data analysis
          </CardDescription>
        </div>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Do Now */}
            <div>
              <h3 className="font-semibold mb-6 text-xl text-white flex items-center gap-3">
                <div className="gradient-green-cyan p-2 rounded-xl">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                Do Now
              </h3>
              <div className="space-y-4">
                {recommendations.slice(0, 3).map((rec) => (
                  <div
                    key={rec.id}
                    className={`
                      glass-card p-5 rounded-2xl border-l-4 hover:scale-[1.02] transition-all
                      ${
                        rec.confidenceLevel >= 80
                          ? "border-green-400 bg-green-500/5"
                          : rec.confidenceLevel >= 70
                            ? "border-yellow-400 bg-yellow-500/5"
                            : "border-orange-400 bg-orange-500/5"
                      }
                    `}
                  >
                    <div className="font-medium text-slate-200 mb-3">
                      {rec.title}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-200">
                          Confidence:
                        </span>
                        <span
                          className={`text-sm font-bold ${
                            rec.confidenceLevel >= 80
                              ? "text-green-400"
                              : rec.confidenceLevel >= 70
                                ? "text-yellow-400"
                                : "text-orange-400"
                          }`}
                        >
                          {rec.confidenceLevel}%
                        </span>
                      </div>
                      <Badge
                        className={`text-xs ml-auto ${
                          rec.impact === "high"
                            ? "bg-purple-500/20 text-purple-200 border-purple-500/30"
                            : "bg-blue-500/20 text-blue-200 border-blue-500/30"
                        }`}
                      >
                        {rec.impact} impact
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investigate */}
            <div>
              <h3 className="font-semibold mb-6 text-xl text-white flex items-center gap-3">
                <div className="gradient-blue-purple p-2 rounded-xl">
                  <Search className="h-5 w-5 text-white" />
                </div>
                Investigate
              </h3>
              <div className="space-y-4">
                {themes.slice(0, 3).map((theme) => (
                  <div
                    key={theme.id}
                    className="glass-card p-5 rounded-2xl border-l-4 border-blue-400 bg-blue-500/5 hover:scale-[1.02] transition-all"
                  >
                    <div className="font-medium text-slate-200 mb-3">
                      {theme.title}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-200">
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-blue-400" />
                        <span>{theme.dataPoints} data points</span>
                      </div>
                      <span>•</span>
                      <Badge
                        className={`text-xs ${
                          theme.priority === "high"
                            ? "bg-red-500/20 text-red-200 border-red-500/30"
                            : theme.priority === "medium"
                              ? "bg-yellow-500/20 text-yellow-200 border-yellow-500/30"
                              : "bg-slate-500/20 text-slate-200 border-slate-500/30"
                        }`}
                      >
                        {theme.priority} priority
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-between mt-8 text-slate-300 hover:text-white hover:bg-purple-500/20 rounded-xl py-6"
          >
            View All Recommendations & Themes
            <ArrowRight className="h-5 w-5" />
          </Button>
        </CardContent>
      </div>
    </div>
  );
}

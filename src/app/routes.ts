import { createBrowserRouter } from 'react-router';
import { Dashboard } from './pages/Dashboard';
import { MetricsDetail } from './pages/MetricsDetail';
import { PainPointsDetail } from './pages/PainPointsDetail';
import { TrendingDetail } from './pages/TrendingDetail';
import { RecommendationsDetail } from './pages/RecommendationsDetail';
import { ThemesDetail } from './pages/ThemesDetail';
import { ScreenGallery } from './pages/ScreenGallery';
import { Onboarding } from './pages/Onboarding';
import { ChatbotOnly } from './pages/ChatbotOnly';
import { Layout } from './components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Onboarding,
  },
  {
    path: '/chat',
    Component: ChatbotOnly,
  },
  {
    path: '/gallery',
    Component: ScreenGallery,
  },
  {
    path: '/dashboard',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'metrics', Component: MetricsDetail },
      { path: 'pain-points', Component: PainPointsDetail },
      { path: 'trending', Component: TrendingDetail },
      { path: 'recommendations', Component: RecommendationsDetail },
      { path: 'themes', Component: ThemesDetail },
    ],
  },
]);
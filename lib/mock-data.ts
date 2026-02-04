// Mock data for the Insight Aggregator

export interface DataSource {
  id: string;
  name: string;
  enabled: boolean;
}

export interface MetricData {
  name: string;
  value: number;
  target: number;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export interface PainPoint {
  id: string;
  title: string;
  count: number;
  severity: 'high' | 'medium' | 'low';
  sources: string[];
  details: string;
}

export interface TrendingInsight {
  id: string;
  title: string;
  source: string;
  category: string;
  summary: string;
  relevanceScore: number;
  chartData: Array<{ date: string; value: number }>;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  confidenceLevel: number;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  supportingData: string[];
  metrics: string[];
}

export interface Theme {
  id: string;
  title: string;
  description: string;
  dataPoints: number;
  relatedSources: string[];
  priority: 'high' | 'medium' | 'low';
}

export const dataSources: DataSource[] = [
  { id: 'adobe', name: 'Adobe Analytics', enabled: true },
  { id: 'wedo', name: 'We do', enabled: true },
  { id: 'web', name: 'Web (comp analysis)', enabled: false },
  { id: 'research', name: 'Research packs', enabled: true },
  { id: 'csat', name: 'CSAT', enabled: true },
  { id: 'esat', name: 'ESAT', enabled: false },
  { id: 'reviews', name: 'Customer reviews', enabled: true },
];

export const metrics: MetricData[] = [
  { 
    name: 'User Engagement Rate', 
    value: 78, 
    target: 85, 
    status: 'warning',
    trend: 'down',
    changePercent: -3.2
  },
  { 
    name: 'Conversion Rate', 
    value: 4.2, 
    target: 4.5, 
    status: 'warning',
    trend: 'stable',
    changePercent: 0.1
  },
  { 
    name: 'Customer Satisfaction', 
    value: 92, 
    target: 90, 
    status: 'good',
    trend: 'up',
    changePercent: 5.8
  },
  { 
    name: 'Task Completion Rate', 
    value: 65, 
    target: 80, 
    status: 'critical',
    trend: 'down',
    changePercent: -8.1
  },
  { 
    name: 'Time on Task (avg)', 
    value: 142, 
    target: 120, 
    status: 'warning',
    trend: 'up',
    changePercent: 7.5
  },
];

export const painPoints: PainPoint[] = [
  {
    id: 'pain1',
    title: 'Checkout Process Too Complex',
    count: 347,
    severity: 'high',
    sources: ['Customer reviews', 'CSAT', 'Adobe Analytics'],
    details: 'Users report difficulty completing purchases due to multi-step checkout process. 42% abandon at payment information step.'
  },
  {
    id: 'pain2',
    title: 'Search Results Not Relevant',
    count: 289,
    severity: 'high',
    sources: ['Adobe Analytics', 'We do', 'Customer reviews'],
    details: 'Search queries return poor results. Users reformulate search 3.4 times on average before finding desired item.'
  },
  {
    id: 'pain3',
    title: 'Mobile Navigation Confusing',
    count: 156,
    severity: 'medium',
    sources: ['Research packs', 'CSAT'],
    details: 'Mobile users struggle to find key features. Navigation menu depth causes confusion and increased bounce rates.'
  },
  {
    id: 'pain4',
    title: 'Load Times on Product Pages',
    count: 134,
    severity: 'medium',
    sources: ['Adobe Analytics', 'Customer reviews'],
    details: 'Product pages load slowly, particularly on mobile devices. Average load time 4.2s vs industry standard 2.5s.'
  },
  {
    id: 'pain5',
    title: 'Account Creation Friction',
    count: 98,
    severity: 'low',
    sources: ['CSAT', 'Research packs'],
    details: 'New users report frustration with required account creation. 28% prefer guest checkout option.'
  },
];

export const trendingInsights: TrendingInsight[] = [
  {
    id: 'trend1',
    title: 'Voice Search Adoption Rising',
    source: 'Industry Reports',
    category: 'Technology',
    summary: 'Voice-activated search increasing 45% YoY. Competitors implementing voice UI with positive results.',
    relevanceScore: 87,
    chartData: [
      { date: 'Jan', value: 12 },
      { date: 'Feb', value: 15 },
      { date: 'Mar', value: 19 },
      { date: 'Apr', value: 24 },
      { date: 'May', value: 28 },
      { date: 'Jun', value: 35 },
    ]
  },
  {
    id: 'trend2',
    title: 'Personalization Drives Engagement',
    source: 'Competitor Analysis',
    category: 'UX Strategy',
    summary: 'Personalized experiences show 3x higher engagement. Top performers using ML-driven content recommendations.',
    relevanceScore: 92,
    chartData: [
      { date: 'Jan', value: 45 },
      { date: 'Feb', value: 52 },
      { date: 'Mar', value: 58 },
      { date: 'Apr', value: 67 },
      { date: 'May', value: 73 },
      { date: 'Jun', value: 81 },
    ]
  },
  {
    id: 'trend3',
    title: 'One-Click Checkout Becoming Standard',
    source: 'Market Research',
    category: 'E-commerce',
    summary: '68% of leading e-commerce sites now offer one-click purchasing. Conversion rates up 35% with this feature.',
    relevanceScore: 94,
    chartData: [
      { date: 'Jan', value: 32 },
      { date: 'Feb', value: 38 },
      { date: 'Mar', value: 45 },
      { date: 'Apr', value: 52 },
      { date: 'May', value: 61 },
      { date: 'Jun', value: 68 },
    ]
  },
];

export const recommendations: Recommendation[] = [
  {
    id: 'rec1',
    title: 'Simplify Checkout Flow to 2 Steps',
    description: 'Consolidate current 5-step checkout into express 2-step process. Implement one-click purchase for returning customers.',
    confidenceLevel: 85,
    impact: 'high',
    effort: 'medium',
    supportingData: [
      '347 complaints about checkout complexity',
      'A/B test showed 28% conversion lift with simplified flow',
      'Industry benchmark: 2-3 steps optimal'
    ],
    metrics: ['Conversion Rate', 'Cart Abandonment']
  },
  {
    id: 'rec2',
    title: 'Implement AI-Powered Search',
    description: 'Replace current keyword search with ML-based semantic search that understands user intent and product relationships.',
    confidenceLevel: 78,
    impact: 'high',
    effort: 'high',
    supportingData: [
      '289 complaints about search relevance',
      'Users reformulate searches 3.4x average',
      'Competitors seeing 45% improvement in search success rate'
    ],
    metrics: ['Search Success Rate', 'User Engagement']
  },
  {
    id: 'rec3',
    title: 'Optimize Mobile Navigation',
    description: 'Redesign mobile navigation with simplified menu structure and bottom navigation bar for key features.',
    confidenceLevel: 72,
    impact: 'medium',
    effort: 'low',
    supportingData: [
      '156 mobile navigation complaints',
      'Mobile bounce rate 23% higher than desktop',
      'Usability testing identified 4 key improvements'
    ],
    metrics: ['Mobile Engagement', 'Task Completion Rate']
  },
  {
    id: 'rec4',
    title: 'Implement Progressive Image Loading',
    description: 'Add lazy loading and WebP format for product images to reduce page load times by estimated 40%.',
    confidenceLevel: 68,
    impact: 'medium',
    effort: 'low',
    supportingData: [
      'Current load time 4.2s vs 2.5s industry standard',
      '134 complaints about slow loading',
      'Google reports 53% mobile users abandon after 3s'
    ],
    metrics: ['Page Load Time', 'Bounce Rate']
  },
  {
    id: 'rec5',
    title: 'Add Guest Checkout Option',
    description: 'Allow users to complete purchase without account creation. Offer account creation post-purchase with incentive.',
    confidenceLevel: 65,
    impact: 'medium',
    effort: 'low',
    supportingData: [
      '98 complaints about forced account creation',
      '28% of users prefer guest checkout',
      'Industry data shows 23% checkout completion lift'
    ],
    metrics: ['Conversion Rate', 'New Customer Acquisition']
  },
];

export const themes: Theme[] = [
  {
    id: 'theme1',
    title: 'Payment Method Diversity',
    description: 'Multiple mentions of alternative payment methods (Apple Pay, PayPal, Buy Now Pay Later) but data inconclusive.',
    dataPoints: 67,
    relatedSources: ['Customer reviews', 'CSAT'],
    priority: 'high'
  },
  {
    id: 'theme2',
    title: 'Product Comparison Features',
    description: 'Users expressing desire to compare multiple products side-by-side. Current behavior patterns unclear.',
    dataPoints: 54,
    relatedSources: ['Adobe Analytics', 'Research packs'],
    priority: 'medium'
  },
  {
    id: 'theme3',
    title: 'Social Proof & Reviews',
    description: 'Mixed signals about importance of reviews and ratings in purchase decisions. Needs deeper investigation.',
    dataPoints: 89,
    relatedSources: ['We do', 'Customer reviews', 'Research packs'],
    priority: 'medium'
  },
  {
    id: 'theme4',
    title: 'Personalization Preferences',
    description: 'Some users value personalized recommendations while others find them intrusive. Segment analysis needed.',
    dataPoints: 43,
    relatedSources: ['CSAT', 'Adobe Analytics'],
    priority: 'low'
  },
  {
    id: 'theme5',
    title: 'Accessibility Concerns',
    description: 'Limited mentions of accessibility issues, but potential gap in current data collection methods.',
    dataPoints: 23,
    relatedSources: ['Customer reviews'],
    priority: 'high'
  },
];

export const chatMessages = [
  { role: 'assistant', message: 'Hello! I\'m Insight Scout. What would you like to know about your product performance?' },
];

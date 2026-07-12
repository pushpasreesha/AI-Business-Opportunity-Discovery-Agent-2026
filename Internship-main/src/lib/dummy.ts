export const kpis = [
  { label: "Total Opportunities", value: 125, delta: "+12%", color: "primary" },
  { label: "High Potential", value: 18, delta: "+4", color: "success" },
  { label: "Industries", value: 25, delta: "+2", color: "warning" },
  { label: "New This Week", value: 12, delta: "+8%", color: "primary" },
];

export const opportunityScoreMonthly = [
  { month: "Jan", score: 62 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 71 },
  { month: "Apr", score: 74 },
  { month: "May", score: 78 },
  { month: "Jun", score: 82 },
  { month: "Jul", score: 79 },
  { month: "Aug", score: 84 },
  { month: "Sep", score: 88 },
  { month: "Oct", score: 91 },
  { month: "Nov", score: 87 },
  { month: "Dec", score: 93 },
];

export const industryDistribution = [
  { name: "Technology", value: 38 },
  { name: "Healthcare", value: 22 },
  { name: "Finance", value: 18 },
  { name: "Agriculture", value: 12 },
  { name: "Retail", value: 10 },
];

export const CHART_COLORS = ["#2563EB", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#06B6D4"];

export const recentOpportunities = [
  { industry: "AI Infrastructure", opportunity: "Edge AI Deployment SaaS", score: 92, status: "High", date: "Nov 12, 2026" },
  { industry: "HealthTech", opportunity: "Remote Chronic Care Platform", score: 88, status: "High", date: "Nov 11, 2026" },
  { industry: "FinTech", opportunity: "SMB Embedded Lending", score: 81, status: "High", date: "Nov 10, 2026" },
  { industry: "Agriculture", opportunity: "Precision Irrigation IoT", score: 74, status: "Medium", date: "Nov 09, 2026" },
  { industry: "Retail", opportunity: "AI Personal Shopper", score: 68, status: "Medium", date: "Nov 08, 2026" },
  { industry: "Green Energy", opportunity: "Community Solar Marketplace", score: 79, status: "High", date: "Nov 07, 2026" },
  { industry: "EdTech", opportunity: "AI Tutor for STEM", score: 63, status: "Medium", date: "Nov 06, 2026" },
  { industry: "Cybersecurity", opportunity: "SMB Threat Detection", score: 55, status: "Low", date: "Nov 05, 2026" },
];

export const news = [
  { title: "AI startups raise record $18B in Q3", source: "TechCrunch", tag: "AI", time: "2h ago" },
  { title: "US pushes new incentives for green hydrogen", source: "Reuters", tag: "Energy", time: "4h ago" },
  { title: "Retail giants pilot autonomous stores across Europe", source: "Bloomberg", tag: "Retail", time: "6h ago" },
  { title: "Digital health M&A hits $12B this year", source: "WSJ", tag: "Health", time: "9h ago" },
  { title: "FinTech regulation to reshape embedded finance", source: "FT", tag: "Finance", time: "12h ago" },
];

export const searchResults = [
  { industry: "AI Infrastructure", score: 92, demand: "Very High", competition: "Medium", investment: "$250K – $1M", revenue: "$2M – $8M", growth: "+34%" },
  { industry: "Precision Agriculture", score: 84, demand: "High", competition: "Low", investment: "$100K – $500K", revenue: "$1M – $4M", growth: "+28%" },
  { industry: "Green Energy Storage", score: 87, demand: "Very High", competition: "Medium", investment: "$500K – $3M", revenue: "$3M – $12M", growth: "+41%" },
  { industry: "Digital Therapeutics", score: 81, demand: "High", competition: "Medium", investment: "$300K – $1.5M", revenue: "$2M – $6M", growth: "+26%" },
  { industry: "Cybersecurity for SMBs", score: 78, demand: "High", competition: "High", investment: "$150K – $700K", revenue: "$1M – $5M", growth: "+22%" },
  { industry: "K-12 AI Tutoring", score: 74, demand: "Medium", competition: "Medium", investment: "$100K – $600K", revenue: "$800K – $3M", growth: "+19%" },
];

export const growthTrend = [
  { month: "Jan", ai: 40, health: 30, energy: 22 },
  { month: "Feb", ai: 48, health: 33, energy: 26 },
  { month: "Mar", ai: 55, health: 37, energy: 31 },
  { month: "Apr", ai: 62, health: 42, energy: 36 },
  { month: "May", ai: 71, health: 47, energy: 44 },
  { month: "Jun", ai: 78, health: 52, energy: 51 },
  { month: "Jul", ai: 84, health: 58, energy: 57 },
  { month: "Aug", ai: 92, health: 63, energy: 66 },
];

export const keywordTrend = [
  { week: "W1", "Generative AI": 40, "Digital Health": 24, "Green Hydrogen": 12 },
  { week: "W2", "Generative AI": 55, "Digital Health": 28, "Green Hydrogen": 18 },
  { week: "W3", "Generative AI": 62, "Digital Health": 35, "Green Hydrogen": 22 },
  { week: "W4", "Generative AI": 78, "Digital Health": 42, "Green Hydrogen": 31 },
  { week: "W5", "Generative AI": 92, "Digital Health": 48, "Green Hydrogen": 38 },
  { week: "W6", "Generative AI": 110, "Digital Health": 55, "Green Hydrogen": 45 },
];

export const industryGrowth = [
  { name: "AI", value: 42 },
  { name: "HealthTech", value: 28 },
  { name: "FinTech", value: 24 },
  { name: "Green Energy", value: 36 },
  { name: "EdTech", value: 19 },
  { name: "Retail", value: 14 },
  { name: "Cybersecurity", value: 22 },
];

export const trendingIndustries = [
  { industry: "Generative AI", growth: 42, size: "$210B", direction: "up" },
  { industry: "Green Energy", growth: 36, size: "$680B", direction: "up" },
  { industry: "Digital Health", growth: 28, size: "$340B", direction: "up" },
  { industry: "FinTech", growth: 24, size: "$310B", direction: "up" },
  { industry: "Cybersecurity", growth: 22, size: "$180B", direction: "up" },
  { industry: "EdTech", growth: 19, size: "$120B", direction: "up" },
];

export const competitors = [
  { name: "NovaAI", pricing: "$49/mo", rating: 4.7, share: 32, features: ["Real-time analytics", "API access", "AI insights"], strengths: ["Fast", "Great UX"], weaknesses: ["Expensive"] },
  { name: "MarketPulse", pricing: "$29/mo", rating: 4.4, share: 21, features: ["Trends", "Reports", "Alerts"], strengths: ["Affordable"], weaknesses: ["Limited AI"] },
  { name: "InsightIQ", pricing: "$79/mo", rating: 4.6, share: 18, features: ["Deep research", "Custom dashboards"], strengths: ["Enterprise ready"], weaknesses: ["Steep learning"] },
  { name: "TrendScope", pricing: "$19/mo", rating: 4.1, share: 12, features: ["Basic trends", "News feed"], strengths: ["Cheap"], weaknesses: ["Basic"] },
];

export const complaints = [
  { name: "Delivery Delay", value: 68 },
  { name: "High Pricing", value: 54 },
  { name: "Poor Customer Support", value: 47 },
  { name: "Missing Features", value: 39 },
  { name: "Complex Onboarding", value: 28 },
];

export const sentiment = [
  { name: "Positive", value: 58 },
  { name: "Neutral", value: 27 },
  { name: "Negative", value: 15 },
];

export const reviews = [
  { review: "The delivery took over two weeks, unacceptable.", sentiment: "Negative", source: "Twitter", priority: "High" },
  { review: "Love the interface, super intuitive!", sentiment: "Positive", source: "G2", priority: "Low" },
  { review: "Pricing is on the high side compared to alternatives.", sentiment: "Negative", source: "Reddit", priority: "Medium" },
  { review: "Support responded quickly and solved my issue.", sentiment: "Positive", source: "Trustpilot", priority: "Low" },
  { review: "Missing bulk export feature.", sentiment: "Neutral", source: "Product Hunt", priority: "Medium" },
];

export const rankings = [
  { rank: 1, name: "Edge AI Deployment SaaS", industry: "AI", score: 96, growth: "+34%", risk: "Low", profitability: "Very High" },
  { rank: 2, name: "Community Solar Marketplace", industry: "Green Energy", score: 92, growth: "+41%", risk: "Medium", profitability: "High" },
  { rank: 3, name: "Remote Chronic Care Platform", industry: "HealthTech", score: 90, growth: "+27%", risk: "Low", profitability: "High" },
  { rank: 4, name: "SMB Embedded Lending", industry: "FinTech", score: 88, growth: "+22%", risk: "Medium", profitability: "High" },
  { rank: 5, name: "Precision Irrigation IoT", industry: "Agriculture", score: 84, growth: "+28%", risk: "Low", profitability: "Medium" },
  { rank: 6, name: "AI Personal Shopper", industry: "Retail", score: 79, growth: "+18%", risk: "Medium", profitability: "Medium" },
  { rank: 7, name: "AI Tutor for STEM", industry: "EdTech", score: 76, growth: "+21%", risk: "Low", profitability: "Medium" },
  { rank: 8, name: "Threat Detection for SMBs", industry: "Cybersecurity", score: 74, growth: "+19%", risk: "Medium", profitability: "Medium" },
  { rank: 9, name: "Carbon Accounting Suite", industry: "Green Energy", score: 71, growth: "+24%", risk: "Medium", profitability: "Medium" },
  { rank: 10, name: "AI Contract Review", industry: "LegalTech", score: 69, growth: "+16%", risk: "Low", profitability: "Medium" },
];

export const reports = [
  { title: "Business Plan", desc: "Full go-to-market plan with financial model.", icon: "FileText" },
  { title: "SWOT Analysis", desc: "Strengths, weaknesses, opportunities, threats.", icon: "Layers" },
  { title: "Competitor Report", desc: "Deep dive into top competitors.", icon: "Users" },
  { title: "Investment Report", desc: "Funding requirements and ROI projections.", icon: "TrendingUp" },
  { title: "Market Analysis", desc: "Sizing, segments, and growth drivers.", icon: "PieChart" },
  { title: "Revenue Forecast", desc: "3-year revenue and margin forecasts.", icon: "LineChart" },
];

export const notifications = [
  { id: 1, title: "New market trend detected", desc: "Generative AI adoption up 42% MoM.", time: "5m ago", category: "Market Trends", priority: "High", unread: true, icon: "TrendingUp" },
  { id: 2, title: "Competitor pricing change", desc: "NovaAI raised prices to $59/mo.", time: "1h ago", category: "Competitors", priority: "Medium", unread: true, icon: "Users" },
  { id: 3, title: "New funding round", desc: "GreenGrid raised $85M Series B.", time: "3h ago", category: "Funding", priority: "Medium", unread: false, icon: "DollarSign" },
  { id: 4, title: "Government policy update", desc: "New EV subsidies announced in EU.", time: "8h ago", category: "Government Policies", priority: "Low", unread: false, icon: "Landmark" },
  { id: 5, title: "Weekly business digest", desc: "Top 10 stories curated for you.", time: "1d ago", category: "Business News", priority: "Low", unread: false, icon: "Newspaper" },
  { id: 6, title: "New high-potential opportunity", desc: "AI-powered logistics optimization scored 91.", time: "1d ago", category: "Market Trends", priority: "High", unread: false, icon: "Sparkles" },
];

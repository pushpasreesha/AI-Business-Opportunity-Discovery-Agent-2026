import {useState } from "react";
import Layout from "../components/layout/Layout";
import MetricCard from "../components/dashboard/MetricCard";
import OpportunityChart from "../components/dashboard/OpportunityChart";
import IndustryPieChart from "../components/dashboard/IndustryPieChart";
import RecentOpportunityTable from "../components/dashboard/RecentOpportunityTable";
import CompetitorTable from "../components/dashboard/CompetitorTable";
import StartupRecommendation from "../components/dashboard/StartupRecommendation";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import api from "../api/api";

import {
  Building2,
  TrendingUp,
  Newspaper,
  Lightbulb,
} from "lucide-react";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [industry, setIndustry] = useState("AI");
  const [location, setLocation] = useState("USA");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const response = await api.post("/analyze", {
        industry,
        location,
      });

      setData(response.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
      alert("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            AI Business Opportunity Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor market trends and discover startup opportunities.
          </p>
        </div>

        {/* Dashboard Filters */}
        <DashboardFilters
          industry={industry}
          setIndustry={setIndustry}
          location={location}
          setLocation={setLocation}
          onAnalyze={fetchDashboardData}
          loading={loading}
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <MetricCard
            title="Companies Found"
            value={
              loading
                ? "Loading..."
                : data?.market_analysis?.companies_found ?? 0
            }
            icon={<Building2 className="text-white" />}
            color="bg-blue-600"
          />

          <MetricCard
            title="Competitors"
            value={
              loading
                ? "Loading..."
                : data?.competitor_analysis?.competitors_found ?? 0
            }
            icon={<TrendingUp className="text-white" />}
            color="bg-green-600"
          />

          <MetricCard
            title="News Articles"
            value={
              loading
                ? "Loading..."
                : data?.news_analysis?.news_count ?? 0
            }
            icon={<Newspaper className="text-white" />}
            color="bg-orange-500"
          />

          <MetricCard
            title="AI Startup Idea"
            value={
              loading
                ? "Loading..."
                : data?.opportunity_analysis?.ai_generated_opportunity?.startup_idea ??
                  "Not Available"
            }
            icon={<Lightbulb className="text-white" />}
            color="bg-purple-600"
          />

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="xl:col-span-2">
            <OpportunityChart />
          </div>

          <IndustryPieChart />

        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <RecentOpportunityTable
            companies={data?.market_analysis?.top_companies || []}
          />

          <CompetitorTable
            competitors={
              data?.competitor_analysis?.top_competitors || []
            }
          />

        </div>

        {/* AI Startup Recommendation */}
        <StartupRecommendation
          opportunity={
            data?.opportunity_analysis?.ai_generated_opportunity
          }
        />

      </div>
    </Layout>
  );
}

export default Dashboard;
import {  useState } from "react";
import Layout from "../components/layout/Layout";
import MetricCard from "../components/dashboard/MetricCard";
import TopCompaniesTable from "../components/market/TopCompaniesTable";
import FundingChart from "../components/market/FundingChart";
import MarketInsights from "../components/market/MarketInsights";
import GrowthIndicators from "../components/market/GrowthIndicators";
import NewsCategories from "../components/market/NewsCategories";
import Recommendations from "../components/market/Recommendations";
import api from "../api/api";

import {
  Building2,
  DollarSign,
  Newspaper,
  TrendingUp,
  Activity,
  BarChart3,
} from "lucide-react";

function MarketTrends() {
  const [industry, setIndustry] = useState("AI");
  const [location, setLocation] = useState("USA");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);


  const analyzeMarket = async (
    selectedIndustry = industry,
    selectedLocation = location
  ) => {
    try {
      setLoading(true);

      const response = await api.post("/analyze", {
        industry: selectedIndustry,
        location: selectedLocation,
      });

      setData(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch market trends.");
    } finally {
      setLoading(false);
    }
  };

  const totalFunding =
    data?.market_analysis?.total_funding || 0;

  const companies =
    data?.market_analysis?.companies_found || 0;

  const averageFunding =
    companies > 0
      ? Math.round(totalFunding / companies)
      : 0;

  return (
    <Layout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-3xl font-bold">
            Market Trends
          </h1>

          <p className="text-gray-500 mt-2">
            Analyze industry growth, investments,
            competition, and business opportunities.
          </p>
        </div>

        {/* Filters */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <div className="grid md:grid-cols-3 gap-6 items-end">

            <div>
              <label className="block font-semibold mb-2">
                Industry
              </label>

              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full border rounded-xl p-3"
              >
                <option>AI</option>
                <option>health</option>
                <option>finance</option>
                <option>education</option>
                <option>security</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Location
              </label>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded-xl p-3"
              >
                <option>USA</option>
                <option>India</option>
                <option>UK</option>
              </select>
            </div>

            <button
              onClick={() => analyzeMarket()}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-3 font-semibold"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>

          </div>

        </div>

        {data && (
          <>

            {/* KPI Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              <MetricCard
                title="Companies Found"
                value={companies}
                icon={<Building2 className="text-white" />}
                color="bg-blue-600"
              />

              <MetricCard
                title="Total Funding"
                value={`$${(totalFunding / 1000000000).toFixed(1)} B`}
                icon={<DollarSign className="text-white" />}
                color="bg-green-600"
              />

              <MetricCard
                title="News Articles"
                value={data.news_analysis.news_count}
                icon={<Newspaper className="text-white" />}
                color="bg-orange-500"
              />

              <MetricCard
                title="Average Funding"
                value={`$${(averageFunding / 1000000).toFixed(1)} M`}
                icon={<BarChart3 className="text-white" />}
                color="bg-purple-600"
              />

              <MetricCard
                title="Trend"
                value={data.news_analysis.trend_signal}
                icon={<TrendingUp className="text-white" />}
                color="bg-pink-600"
              />

              <MetricCard
                title="Competition"
                value={data.competitor_analysis.competition_level}
                icon={<Activity className="text-white" />}
                color="bg-indigo-600"
              />

            </div>

            {/* Top Funded Companies */}

            <TopCompaniesTable
              companies={
                data.market_analysis.top_companies || []
              }
            />

            {/* Funding Chart + Growth */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <FundingChart />

              <GrowthIndicators />

            </div>

            {/* Market Insights */}

            <MarketInsights />

            {/* News + Recommendations */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <NewsCategories />

              <Recommendations />

            </div>

          </>
        )}

      </div>
    </Layout>
  );
}

export default MarketTrends;
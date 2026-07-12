import {  useState } from "react";
import Layout from "../components/layout/Layout";
import MetricCard from "../components/dashboard/MetricCard";
import api from "../api/api";

import {
  Lightbulb,
  Building2,
  TrendingUp,
  Target,
  Users,
  Briefcase,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Wrench
} from "lucide-react";

function MarketGap() {

  const [industry, setIndustry] = useState("AI");
  const [location, setLocation] = useState("USA");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);



  const analyzeMarketGap = async (
    selectedIndustry = industry,
    selectedLocation = location
  ) => {

    try {

      setLoading(true);

      const response = await api.post("/analyze", {
        industry: selectedIndustry,
        location: selectedLocation
      });

      console.log(response.data);

      setData(response.data);

    } catch (error) {

      console.log(error);

      alert("Unable to fetch market gap analysis");

    } finally {

      setLoading(false);

    }

  };

  const getScoreColor = (score) => {

    if (score >= 90)
      return "bg-green-100 text-green-700";

    if (score >= 80)
      return "bg-yellow-100 text-yellow-700";

    return "bg-red-100 text-red-700";

  };

  return (

    <Layout>

      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold">
            Market Gap Analysis
          </h1>

          <p className="text-gray-500 mt-2">
            Discover untapped startup opportunities using AI-powered market intelligence.
          </p>

        </div>

        {/* Filters */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <div className="grid md:grid-cols-3 gap-6">

            <div>

              <label className="font-semibold">
                Industry
              </label>

              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full border rounded-xl p-3 mt-2"
              >

                <option>AI</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Education</option>

              </select>

            </div>

            <div>

              <label className="font-semibold">
                Country
              </label>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded-xl p-3 mt-2"
              >

                <option>USA</option>
                <option>India</option>
                <option>UK</option>

              </select>

            </div>

            <button
              onClick={() => analyzeMarketGap()}
              className="bg-blue-600 text-white rounded-xl mt-7 p-3 hover:bg-blue-700"
            >

              {loading ? "Analyzing..." : "Analyze"}

            </button>

          </div>

        </div>

        {

          data && (

            <>

              {/* Metrics */}

              <div className="grid md:grid-cols-4 gap-6">

                <MetricCard
                  title="Companies"
                  value={
                    data.market_analysis?.companies_found || 0
                  }
                  icon={<Building2 className="text-white" />}
                  color="bg-blue-600"
                />

                <MetricCard
                  title="Competition"
                  value={
                    data.competitor_analysis?.competition_level || "-"
                  }
                  icon={<Target className="text-white" />}
                  color="bg-red-600"
                />

                <MetricCard
                  title="Growth Score"
                  value={
                    data.market_analysis?.growth_indicators?.market_growth || 0
                  }
                  icon={<TrendingUp className="text-white" />}
                  color="bg-green-600"
                />

                <MetricCard
                  title="AI Opportunities"
                  value={
                    data.opportunity_analysis?.opportunities?.length || 0
                  }
                  icon={<Lightbulb className="text-white" />}
                  color="bg-yellow-500"
                />

              </div>

              {/* Opportunities */}

              <div className="bg-white rounded-2xl shadow-lg p-6">

                <h2 className="text-2xl font-bold mb-6">
                  Top Startup Opportunities
                </h2>

                <div className="space-y-8">

                  {

                    data.opportunity_analysis?.opportunities?.map((item, index) => (

                      <div
                        key={index}
                        className="border rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
                      >

                        {/* Title */}

                        <div className="flex justify-between items-center">

                          <h2 className="text-2xl font-bold text-blue-700">

                            #{index + 1} {item.title}

                          </h2>

                          <span
                            className={`px-4 py-2 rounded-full font-bold ${getScoreColor(
                              item.opportunity_score
                            )}`}
                          >

                            {item.opportunity_score}% Score

                          </span>

                        </div>

                        {/* Description */}

                        <p className="mt-4 text-gray-700">

                          {item.description}

                        </p>

                        {/* Problem */}

                        <div className="mt-6 flex gap-3">

                          <AlertTriangle className="text-red-500 mt-1" />

                          <div>

                            <h3 className="font-semibold">
                              Problem
                            </h3>

                            <p className="text-gray-600">
                              {item.problem}
                            </p>

                          </div>

                        </div>

                        {/* Solution */}

                        <div className="mt-5 flex gap-3">

                          <Wrench className="text-green-600 mt-1" />

                          <div>

                            <h3 className="font-semibold">
                              Solution
                            </h3>

                            <p className="text-gray-600">
                              {item.solution}
                            </p>

                          </div>

                        </div>

                        {/* Market Gap */}

                        <div className="mt-5 flex gap-3">

                          <Sparkles className="text-yellow-500 mt-1" />

                          <div>

                            <h3 className="font-semibold">
                              Market Gap
                            </h3>

                            <p className="text-gray-600">
                              {item.market_gap}
                            </p>

                          </div>

                        </div>

                        {/* Target Customers */}

                        <div className="mt-5 flex gap-3">

                          <Users className="text-blue-600 mt-1" />

                          <div>

                            <h3 className="font-semibold">
                              Target Customers
                            </h3>

                            <p className="text-gray-600">
                              {item.target_customers}
                            </p>

                          </div>

                        </div>

                        {/* Business Model */}

                        <div className="mt-5 flex gap-3">

                          <Briefcase className="text-purple-600 mt-1" />

                          <div>

                            <h3 className="font-semibold">
                              Business Model
                            </h3>

                            <p className="text-gray-600">
                              {item.business_model}
                            </p>

                          </div>

                        </div>

                        {/* Competitive Advantage */}

                        <div className="mt-5 flex gap-3">

                          <CheckCircle className="text-green-600 mt-1" />

                          <div>

                            <h3 className="font-semibold">
                              Competitive Advantage
                            </h3>

                            <p className="text-gray-600">
                              {item.competitive_advantage}
                            </p>

                          </div>

                        </div>

                        {/* Why Now */}

                        <div className="mt-5 bg-blue-50 rounded-xl p-4">

                          <h3 className="font-semibold mb-2 text-blue-700">
                            Why Now?
                          </h3>

                          <p className="text-gray-700">
                            {item.why_now}
                          </p>

                        </div>

                      </div>

                    ))

                  }

                </div>

              </div>

            </>

          )

        }

      </div>

    </Layout>

  );

}

export default MarketGap;
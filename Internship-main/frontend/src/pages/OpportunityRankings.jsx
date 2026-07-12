import {  useState } from "react";
import Layout from "../components/layout/Layout";
import MetricCard from "../components/dashboard/MetricCard";
import api from "../Api/api";

import {
  Trophy,
  Medal,
  Star,
  TrendingUp,
  Lightbulb,
  Users,
  Briefcase,
  Target,
} from "lucide-react";

function OpportunityRankings() {
  const [industry, setIndustry] = useState("AI");
  const [location, setLocation] = useState("USA");

  const [loading, setLoading] = useState(false);
  const [opportunities, setOpportunities] = useState([]);

 

  const fetchRankings = async (
    selectedIndustry = industry,
    selectedLocation = location
  ) => {
    try {
      setLoading(true);

      const response = await api.post("/analyze", {
        industry: selectedIndustry,
        location: selectedLocation,
      });

      let list =
        response.data?.opportunity_analysis?.opportunities || [];

      list = [...list].sort(
        (a, b) =>
          (b.opportunity_score || b.score || 0) -
          (a.opportunity_score || a.score || 0)
      );

      setOpportunities(list);
    } catch (err) {
      console.error(err);
      alert("Unable to fetch opportunity rankings.");
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
            Opportunity Rankings
          </h1>

          <p className="text-gray-500 mt-2">
            AI ranks startup opportunities based on market demand,
            competition, customer pain points, and industry trends.
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
              onClick={() => fetchRankings()}
              className="bg-blue-600 text-white rounded-xl mt-7 p-3 hover:bg-blue-700"
            >
              {loading ? "Generating..." : "Generate Ranking"}
            </button>

          </div>

        </div>

        {/* KPI */}

        <MetricCard
          title="Ranked Opportunities"
          value={opportunities.length}
          icon={<Lightbulb className="text-white" />}
          color="bg-yellow-500"
        />

        {/* Rankings */}

        <div className="space-y-6">

          {opportunities.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              <div className="flex justify-between items-center">

                <div className="flex items-center gap-3">

                  {index === 0 && (
                    <Trophy className="text-yellow-500" size={28} />
                  )}

                  {index === 1 && (
                    <Medal className="text-gray-500" size={28} />
                  )}

                  {index === 2 && (
                    <Star className="text-orange-500" size={28} />
                  )}

                  <h2 className="text-2xl font-bold">

                    #{index + 1}

                    {" "}

                    {item.title}

                  </h2>

                </div>

                <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">

                  {item.opportunity_score || item.score}/100

                </span>

              </div>

              <p className="mt-4 text-gray-700">
                {item.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">

                <div className="flex gap-3">

                  <Target className="text-blue-600 mt-1" />

                  <div>

                    <h3 className="font-semibold">
                      Problem
                    </h3>

                    <p className="text-gray-600">
                      {item.problem}
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <TrendingUp className="text-green-600 mt-1" />

                  <div>

                    <h3 className="font-semibold">
                      Market Gap
                    </h3>

                    <p className="text-gray-600">
                      {item.market_gap}
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <Users className="text-purple-600 mt-1" />

                  <div>

                    <h3 className="font-semibold">
                      Target Customers
                    </h3>

                    <p className="text-gray-600">
                      {item.target_customers}
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <Briefcase className="text-orange-600 mt-1" />

                  <div>

                    <h3 className="font-semibold">
                      Business Model
                    </h3>

                    <p className="text-gray-600">
                      {item.business_model}
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-6 bg-slate-50 rounded-xl p-5">

                <h3 className="font-semibold">
                  Solution
                </h3>

                <p className="text-gray-600 mt-2">
                  {item.solution}
                </p>

              </div>

              <div className="mt-5 bg-green-50 rounded-xl p-5">

                <h3 className="font-semibold text-green-700">
                  Competitive Advantage
                </h3>

                <p className="text-gray-700 mt-2">
                  {item.competitive_advantage}
                </p>

              </div>

              <div className="mt-5 bg-blue-50 rounded-xl p-5">

                <h3 className="font-semibold text-blue-700">
                  Why Now?
                </h3>

                <p className="text-gray-700 mt-2">
                  {item.why_now}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </Layout>
  );
}

export default OpportunityRankings;

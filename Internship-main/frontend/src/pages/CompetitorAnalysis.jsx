import {  useState } from "react";
import Layout from "../components/layout/Layout";
import MetricCard from "../components/dashboard/MetricCard";
import api from "../Api/api";

import {
  Users,
  Trophy,
  Building2,
} from "lucide-react";

function CompetitorAnalysis() {

  const [industry, setIndustry] = useState("AI");
  const [location, setLocation] = useState("USA");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);


  const analyzeCompetitors = async (
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

    }

    catch (error) {

      console.error(error);

      alert("Unable to fetch competitor analysis.");

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <Layout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold">
            Competitor Analysis
          </h1>

          <p className="text-gray-500 mt-2">
            Analyze competitors, valuations, funding and market competition.
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
              onClick={() => analyzeCompetitors()}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-3 font-semibold"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>

          </div>

        </div>

        {data && (

          <>

            {/* KPI Cards */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <MetricCard
                title="Competitors Found"
                value={data.competitor_analysis?.competitors_found || 0}
                icon={<Users className="text-white" />}
                color="bg-blue-600"
              />

              <MetricCard
                title="Competition Level"
                value={data.competitor_analysis?.competition_level || "N/A"}
                icon={<Trophy className="text-white" />}
                color="bg-red-600"
              />

              <MetricCard
                title="Industry"
                value={industry}
                icon={<Building2 className="text-white" />}
                color="bg-green-600"
              />

            </div>

            {/* Competitor Table */}

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-xl font-bold mb-6">
                Top Competitors
              </h2>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b">

                      <th className="text-left p-3">
                        Company
                      </th>

                      <th className="text-left p-3">
                        Valuation
                      </th>

                      <th className="text-left p-3">
                        Total Raised
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {data.competitor_analysis?.top_competitors?.map(

                      (company, index) => (

                        <tr
                          key={index}
                          className="border-b hover:bg-gray-50"
                        >

                          <td className="p-3">
                            {company.Company}
                          </td>

                          <td className="p-3">
                            {company["Valuation ($B)"]}
                          </td>

                          <td className="p-3">
                            {company["Total Raised"]}
                          </td>

                        </tr>

                      )

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </>

        )}

      </div>

    </Layout>

  );

}

export default CompetitorAnalysis;

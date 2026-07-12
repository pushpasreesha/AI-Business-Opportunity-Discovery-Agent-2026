import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import api from "../api/api";

function Reports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);

      const response = await api.post("/analyze", {
        industry: "AI",
        location: "USA",
      });

      setReport(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load report.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <h2 className="text-2xl font-bold">
          Generating AI Report...
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-3xl font-bold">
            Business Opportunity Report
          </h1>

          <p className="text-gray-500 mt-2">
            AI-generated market intelligence report
          </p>
        </div>

        {/* Executive Summary */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-4">
            Executive Summary
          </h2>

          <p>
            This report analyzes the <b>AI</b> industry in <b>USA</b> using
            market trends, competitors, customer pain points,
            news, and AI opportunity discovery.
          </p>

        </div>

        {/* Market Analysis */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-4">
            Market Analysis
          </h2>

          <p>
            <b>Companies Found:</b>{" "}
            {report.market_analysis?.companies_found}
          </p>

          <p>
            <b>Market Growth:</b>{" "}
            {report.market_analysis?.growth_indicators?.market_growth}
          </p>

        </div>

        {/* Competitor Analysis */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-4">
            Competitor Analysis
          </h2>

          <p>
            <b>Competition Level:</b>{" "}
            {report.competitor_analysis?.competition_level}
          </p>

          <p>
            <b>Competitors Found:</b>{" "}
            {report.competitor_analysis?.competitors_found}
          </p>

        </div>

        {/* Customer Pain Points */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-5">
            Customer Pain Points
          </h2>

          <p className="mb-2">
            <b>Negative Reviews:</b>{" "}
            {report.customer_analysis?.negative_reviews_found}
          </p>

          <p className="mb-5">
            <b>Positive Reviews:</b>{" "}
            {report.customer_analysis?.positive_reviews_found}
          </p>

          <h3 className="font-semibold mb-4">
            Common Customer Pain Points
          </h3>

          <div className="space-y-3">

            {report.customer_analysis?.common_pain_points?.map(
              (item, index) => (

                <div
                  key={index}
                  className="flex justify-between items-center border rounded-xl p-4"
                >

                  <span className="font-medium">
                    {item[0]}
                  </span>

                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
                    {item[1]}%
                  </span>

                </div>

              )
            )}

          </div>

        </div>

        {/* Top Opportunities */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-5">
            Top Opportunities
          </h2>

          {report.opportunity_analysis?.opportunities?.map(
            (item, index) => (

              <div
                key={index}
                className="border rounded-xl p-4 mb-4"
              >

                <h3 className="font-bold text-lg">
                  {item.title}
                </h3>

                <p className="mt-2">
                  {item.description}
                </p>

                <p className="mt-3">
                  <b>Score:</b>{" "}
                  {item.opportunity_score || item.score}
                </p>

              </div>

            )
          )}

        </div>

      </div>
    </Layout>
  );
}

export default Reports;
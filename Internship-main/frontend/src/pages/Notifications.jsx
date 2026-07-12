import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import api from "../Api/api";

import {
  Bell,
  TrendingUp,
  Building2,
  Lightbulb,
  AlertTriangle,
  FileText,
} from "lucide-react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await api.post("/analyze", {
        industry: "AI",
        location: "USA",
      });

      const data = response.data;

      const painPoint =
        data.customer_analysis?.common_pain_points?.[0];

      const topOpportunity =
        data.opportunity_analysis?.opportunities?.[0];

      const currentTime = new Date().toLocaleString();

      const dynamicNotifications = [
        {
          id: 1,
          icon: <TrendingUp className="text-green-600" />,
          title: "Market Growth",
          message: `AI market growth reached ${
            data.market_analysis?.growth_indicators?.market_growth || 0
          }%, indicating strong business potential.`,
          time: currentTime,
          color: "bg-green-50",
        },

        {
          id: 2,
          icon: <Building2 className="text-blue-600" />,
          title: "Companies Analyzed",
          message: `Successfully analyzed ${
            data.market_analysis?.companies_found || 0
          } companies in the AI industry.`,
          time: currentTime,
          color: "bg-blue-50",
        },

        {
          id: 3,
          icon: <AlertTriangle className="text-red-600" />,
          title: "Top Customer Pain Point",
          message: painPoint
            ? `${painPoint[0]} is the most common customer complaint, affecting ${painPoint[1]}% of users.`
            : "No customer pain points found.",
          time: currentTime,
          color: "bg-red-50",
        },

        {
          id: 4,
          icon: <Lightbulb className="text-yellow-500" />,
          title: "Best Startup Opportunity",
          message: topOpportunity
            ? `${topOpportunity.title} has been identified as the highest-ranked startup opportunity.`
            : "No startup opportunities found.",
          time: currentTime,
          color: "bg-yellow-50",
        },

        {
          id: 5,
          icon: <FileText className="text-purple-600" />,
          title: "Business Report Ready",
          message:
            "Business Opportunity Report has been generated successfully and is ready for download.",
          time: currentTime,
          color: "bg-purple-50",
        },
      ];

      setNotifications(dynamicNotifications);
    } catch (error) {
      console.error(error);
      alert("Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Bell className="text-blue-600" />
            Notifications
          </h1>

          <p className="text-gray-500 mt-2">
            AI-generated business alerts and updates.
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold">
              Loading Notifications...
            </h2>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
              Recent Notifications
            </h2>

            <div className="space-y-5">

              {notifications.map((item) => (

                <div
                  key={item.id}
                  className={`border rounded-2xl p-5 flex justify-between items-start ${item.color}`}
                >

                  <div className="flex gap-4">

                    <div>{item.icon}</div>

                    <div>

                      <h3 className="font-bold text-lg">
                        {item.title}
                      </h3>

                      <p className="text-gray-700 mt-2">
                        {item.message}
                      </p>

                    </div>

                  </div>

                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    {item.time}
                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

      </div>
    </Layout>
  );
}

export default Notifications;

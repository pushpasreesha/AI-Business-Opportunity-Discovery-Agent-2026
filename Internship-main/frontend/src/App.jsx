import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SearchOpportunity from "./pages/SearchOpportunity";
import MarketTrends from "./pages/MarketTrends";
import CompetitorAnalysis from "./pages/CompetitorAnalysis";
import CustomerPainPoints from "./pages/CustomerPainPoints";
import MarketGap from "./pages/MarketGap";
import OpportunityRankings from "./pages/OpportunityRankings";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login (Default Page) */}
        <Route path="/" element={<Login />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Search Opportunity */}
        <Route path="/search" element={<SearchOpportunity />} />

        {/* Market Trends */}
        <Route path="/market-trends" element={<MarketTrends />} />

        {/* Competitor Analysis */}
        <Route path="/competitors" element={<CompetitorAnalysis />} />

        {/* Customer Pain Points */}
        <Route
          path="/customer-pain-points"
          element={<CustomerPainPoints />}
        />

        {/* Market Gap */}
        <Route path="/market-gap" element={<MarketGap />} />

        {/* Opportunity Rankings */}
        <Route
          path="/opportunity-rankings"
          element={<OpportunityRankings />}
        />

        {/* Reports */}
        <Route path="/reports" element={<Reports />} />

        {/* Notifications */}
        <Route path="/notifications" element={<Notifications />} />

        {/* Settings */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
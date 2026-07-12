import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import SearchOpportunity from "../pages/SearchOpportunity";
import MarketTrends from "../pages/MarketTrends";
import CompetitorAnalysis from "../pages/CompetitorAnalysis";
import CustomerPainPoints from "../pages/CustomerPainPoints";
import MarketGap from "../pages/MarketGap";
import OpportunityRankings from "../pages/OpportunityRankings";
import Reports from "../pages/Reports";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import Login from "../pages/Login";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<SearchOpportunity />} />
        <Route path="/market-trends" element={<MarketTrends />} />
        <Route path="/competitors" element={<CompetitorAnalysis />} />
        <Route path="/customer-pain-points" element={<CustomerPainPoints />} />
        <Route path="/market-gap" element={<MarketGap />} />
        <Route path="/opportunity-rankings" element={<OpportunityRankings />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
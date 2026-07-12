import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Search,
  TrendingUp,
  Building2,
  MessageSquareWarning,
  Target,
  Trophy,
  FileText,
  Bell,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
  },

  {
    icon: Search,
    label: "Search Opportunity",
    path: "/search",
  },

  {
    icon: TrendingUp,
    label: "Market Trends",
    path: "/market-trends",
  },

  {
    icon: Building2,
    label: "Competitor Analysis",
    path: "/competitors",
  },

  {
    icon: MessageSquareWarning,
    label: "Customer Pain Points",
    path: "/customer-pain-points",
  },

  {
    icon: Target,
    label: "Market Gap",
    path: "/market-gap",
  },

  {
    icon: Trophy,
    label: "Opportunity Rankings",
    path: "/opportunity-rankings",
  },

  {
    icon: FileText,
    label: "Reports",
    path: "/reports",
  },

  {
    icon: Bell,
    label: "Notifications",
    path: "/notifications",
  },

  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
  },
];

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg border-r">

      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">
          AI Business Agent
        </h1>
      </div>

      <nav className="p-4">

        {menuItems.map((item, index) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">
                {item.label}
              </span>
            </NavLink>
          );

        })}

      </nav>

    </aside>
  );
}

export default Sidebar;
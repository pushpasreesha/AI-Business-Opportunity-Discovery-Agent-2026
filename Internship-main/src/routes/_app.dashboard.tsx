import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader, Badge, statusTone } from "@/components/layout/AppShell";
import {
  kpis, opportunityScoreMonthly, industryDistribution, CHART_COLORS,
  recentOpportunities, news,
} from "@/lib/dummy";
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { Briefcase, Sparkles, Building2, CalendarPlus, ArrowUpRight, Newspaper } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — OpportunIQ" }] }),
  component: Dashboard,
});

const kpiIcons = [Briefcase, Sparkles, Building2, CalendarPlus];

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="AI-ranked signals across 25+ industries, updated in real time."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k, i) => {
          const Icon = kpiIcons[i];
          return (
            <Card key={k.label}>
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge tone="success">{k.delta}</Badge>
              </div>
              <div className="mt-4 text-3xl font-bold tabular-nums">{k.value}</div>
              <div className="text-sm text-muted-foreground">{k.label}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-semibold">Opportunity score</div>
              <div className="text-xs text-muted-foreground">Monthly average · last 12 months</div>
            </div>
            <Badge tone="primary">+18% YoY</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={opportunityScoreMonthly}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="mb-3">
            <div className="text-sm font-semibold">Industry distribution</div>
            <div className="text-xs text-muted-foreground">Share of opportunities</div>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={industryDistribution} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {industryDistribution.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 p-0 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="text-sm font-semibold">Recent opportunities</div>
            <button className="text-xs text-primary inline-flex items-center gap-1 hover:underline">
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left font-medium px-5 py-3">Industry</th>
                  <th className="text-left font-medium px-5 py-3">Opportunity</th>
                  <th className="text-left font-medium px-5 py-3">Score</th>
                  <th className="text-left font-medium px-5 py-3">Status</th>
                  <th className="text-left font-medium px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOpportunities.map((o) => (
                  <tr key={o.opportunity} className="border-t border-border">
                    <td className="px-5 py-3 text-muted-foreground">{o.industry}</td>
                    <td className="px-5 py-3 font-medium">{o.opportunity}</td>
                    <td className="px-5 py-3 tabular-nums font-semibold">{o.score}</td>
                    <td className="px-5 py-3"><Badge tone={statusTone(o.status)}>{o.status}</Badge></td>
                    <td className="px-5 py-3 text-muted-foreground">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="h-4 w-4 text-primary" />
            <div className="text-sm font-semibold">Latest business news</div>
          </div>
          <div className="space-y-3">
            {news.map((n) => (
              <div key={n.title} className="flex gap-3 rounded-xl p-2 hover:bg-muted/50 cursor-pointer">
                <div className="h-14 w-16 shrink-0 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/40" />
                <div className="min-w-0">
                  <div className="text-sm font-medium leading-snug line-clamp-2">{n.title}</div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{n.source}</span>·<span>{n.time}</span>
                    <Badge tone="primary">{n.tag}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

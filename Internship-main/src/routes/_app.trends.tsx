import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader, Badge } from "@/components/layout/AppShell";
import { growthTrend, keywordTrend, industryGrowth, trendingIndustries } from "@/lib/dummy";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { ArrowUpRight, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_app/trends")({
  head: () => ({ meta: [{ title: "Market Trends — OpportunIQ" }] }),
  component: TrendsPage,
});

function TrendsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Market trends" subtitle="Growth signals, keyword momentum, and top industries." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="mb-3">
            <div className="text-sm font-semibold">Industry growth</div>
            <div className="text-xs text-muted-foreground">Cumulative growth index</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={growthTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Legend />
                <Line type="monotone" dataKey="ai" stroke="#2563EB" strokeWidth={2.5} />
                <Line type="monotone" dataKey="health" stroke="#10B981" strokeWidth={2.5} />
                <Line type="monotone" dataKey="energy" stroke="#F59E0B" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="mb-3">
            <div className="text-sm font-semibold">Keyword trend</div>
            <div className="text-xs text-muted-foreground">Search interest · last 6 weeks</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={keywordTrend}>
                <defs>
                  <linearGradient id="a1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="a2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Legend />
                <Area type="monotone" dataKey="Generative AI" stroke="#2563EB" fill="url(#a1)" strokeWidth={2} />
                <Area type="monotone" dataKey="Digital Health" stroke="#10B981" fill="url(#a2)" strokeWidth={2} />
                <Area type="monotone" dataKey="Green Hydrogen" stroke="#F59E0B" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-3">
          <div className="text-sm font-semibold">Industry growth · YoY %</div>
        </div>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={industryGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="value" fill="#2563EB" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div>
        <h2 className="text-lg font-semibold mb-3">Top trending industries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {trendingIndustries.map((t) => (
            <Card key={t.industry}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Industry</div>
                  <div className="text-lg font-semibold">{t.industry}</div>
                </div>
                <Badge tone="success">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" /> {t.growth}%
                </Badge>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Market size</div>
                  <div className="text-xl font-bold">{t.size}</div>
                </div>
                <div className="text-[color:var(--success)] inline-flex items-center gap-1 text-sm font-medium">
                  <TrendingUp className="h-4 w-4" /> Upward
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

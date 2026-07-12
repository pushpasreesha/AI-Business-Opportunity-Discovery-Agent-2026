import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader, Badge, statusTone } from "@/components/layout/AppShell";
import { complaints, sentiment, reviews, CHART_COLORS } from "@/lib/dummy";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export const Route = createFileRoute("/_app/pain-points")({
  head: () => ({ meta: [{ title: "Customer Pain Points — OpportunIQ" }] }),
  component: PainPage,
});

function PainPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Customer pain points" subtitle="Voice-of-customer signals aggregated from reviews and social." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="mb-4 text-sm font-semibold">Top complaints</div>
          <div className="space-y-4">
            {complaints.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-muted-foreground tabular-nums">{c.value}%</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${c.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-3 text-sm font-semibold">Sentiment analysis</div>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={sentiment} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {sentiment.map((_, i) => (
                    <Cell key={i} fill={[CHART_COLORS[1], CHART_COLORS[2], CHART_COLORS[4]][i]} />
                  ))}
                </Pie>
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-border text-sm font-semibold">Customer reviews</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left font-medium px-5 py-3">Review</th>
                <th className="text-left font-medium px-5 py-3">Sentiment</th>
                <th className="text-left font-medium px-5 py-3">Source</th>
                <th className="text-left font-medium px-5 py-3">Priority</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-5 py-3">{r.review}</td>
                  <td className="px-5 py-3"><Badge tone={statusTone(r.sentiment)}>{r.sentiment}</Badge></td>
                  <td className="px-5 py-3 text-muted-foreground">{r.source}</td>
                  <td className="px-5 py-3"><Badge tone={statusTone(r.priority)}>{r.priority}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader, Badge, statusTone } from "@/components/layout/AppShell";
import { rankings } from "@/lib/dummy";
import { Trophy, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/_app/rankings")({
  head: () => ({ meta: [{ title: "Opportunity Rankings — OpportunIQ" }] }),
  component: RankingsPage,
});

function RankingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Opportunity rankings"
        subtitle="Top opportunities ranked by AI across growth, risk, and profitability."
      />

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Select label="Industry" options={["All", "AI", "HealthTech", "FinTech", "Green Energy", "Retail", "EdTech"]} />
          <Select label="Region" options={["Global", "North America", "Europe", "Asia", "LATAM"]} />
          <Select label="Investment range" options={["Any", "< $250K", "$250K – $1M", "$1M – $5M", "> $5M"]} />
          <Select label="Sort by" options={["Highest score", "Growth", "Lowest competition"]} />
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <Trophy className="h-4 w-4 text-primary" />
          <div className="text-sm font-semibold">Top 10 opportunities</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left font-medium px-5 py-3">#</th>
                <th className="text-left font-medium px-5 py-3">Opportunity</th>
                <th className="text-left font-medium px-5 py-3">Industry</th>
                <th className="text-left font-medium px-5 py-3">Score</th>
                <th className="text-left font-medium px-5 py-3">Growth</th>
                <th className="text-left font-medium px-5 py-3">Risk</th>
                <th className="text-left font-medium px-5 py-3">Profitability</th>
                <th className="text-left font-medium px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((r) => (
                <tr key={r.rank} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3">
                    <span className={`grid h-8 w-8 place-items-center rounded-lg text-xs font-bold ${
                      r.rank <= 3 ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}>{r.rank}</span>
                  </td>
                  <td className="px-5 py-3 font-medium">{r.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.industry}</td>
                  <td className="px-5 py-3 tabular-nums font-semibold text-primary">{r.score}</td>
                  <td className="px-5 py-3 text-[color:var(--success)] font-medium">{r.growth}</td>
                  <td className="px-5 py-3"><Badge tone={r.risk === "Low" ? "success" : r.risk === "Medium" ? "warning" : "destructive"}>{r.risk}</Badge></td>
                  <td className="px-5 py-3"><Badge tone={statusTone(r.profitability === "Very High" ? "High" : r.profitability)}>{r.profitability}</Badge></td>
                  <td className="px-5 py-3"><button className="inline-flex items-center gap-1 text-primary text-xs hover:underline">View <ArrowUpRight className="h-3 w-3" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <select className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:border-ring">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

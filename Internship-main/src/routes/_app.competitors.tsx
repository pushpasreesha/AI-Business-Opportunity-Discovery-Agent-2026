import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader, Badge } from "@/components/layout/AppShell";
import { competitors } from "@/lib/dummy";
import { Star, GitCompare } from "lucide-react";

export const Route = createFileRoute("/_app/competitors")({
  head: () => ({ meta: [{ title: "Competitor Analysis — OpportunIQ" }] }),
  component: CompetitorsPage,
});

function CompetitorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Competitor analysis" subtitle="Benchmark pricing, features, and market share." />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {competitors.map((c) => (
          <Card key={c.name}>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white font-bold">
                {c.name.slice(0, 2)}
              </div>
              <div className="min-w-0">
                <div className="font-semibold truncate">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.pricing}</div>
              </div>
            </div>

            <div className="mt-3 inline-flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-[color:var(--warning)] text-[color:var(--warning)]" />
              <span className="font-medium">{c.rating}</span>
              <span className="text-muted-foreground">/5</span>
            </div>

            <div className="mt-4">
              <div className="text-xs font-medium text-muted-foreground mb-1">Features</div>
              <div className="flex flex-wrap gap-1.5">
                {c.features.map((f) => <Badge key={f}>{f}</Badge>)}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-muted-foreground mb-1">Strengths</div>
                <div className="font-medium text-[color:var(--success)]">{c.strengths.join(", ")}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Weaknesses</div>
                <div className="font-medium text-[color:var(--destructive)]">{c.weaknesses.join(", ")}</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Market share</span>
                <span className="font-semibold">{c.share}%</span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${c.share * 2}%` }} />
              </div>
            </div>

            <button className="mt-4 w-full inline-flex items-center justify-center gap-1 rounded-xl border border-border bg-card py-2 text-sm font-semibold hover:bg-accent">
              <GitCompare className="h-4 w-4" /> Compare
            </button>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-border">
          <div className="text-sm font-semibold">Side-by-side comparison</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left font-medium px-5 py-3">Company</th>
                <th className="text-left font-medium px-5 py-3">Pricing</th>
                <th className="text-left font-medium px-5 py-3">Rating</th>
                <th className="text-left font-medium px-5 py-3">Market share</th>
                <th className="text-left font-medium px-5 py-3">Top strength</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => (
                <tr key={c.name} className="border-t border-border">
                  <td className="px-5 py-3 font-medium">{c.name}</td>
                  <td className="px-5 py-3">{c.pricing}</td>
                  <td className="px-5 py-3">{c.rating}</td>
                  <td className="px-5 py-3">{c.share}%</td>
                  <td className="px-5 py-3 text-muted-foreground">{c.strengths[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

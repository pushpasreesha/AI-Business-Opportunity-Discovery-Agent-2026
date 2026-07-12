import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader, Badge } from "@/components/layout/AppShell";
import { searchResults } from "@/lib/dummy";
import { Search, SlidersHorizontal, TrendingUp, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/_app/search")({
  head: () => ({ meta: [{ title: "Search Opportunity — OpportunIQ" }] }),
  component: SearchPage,
});

function SearchPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Search opportunity" subtitle="Explore industries, filter by criteria, and find your next venture." />

      <Card>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search industry..."
              className="w-full rounded-xl border border-border bg-muted/40 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-ring focus:bg-card"
            />
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-95">
            <Search className="h-4 w-4" /> Search
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-accent">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {searchResults.map((r) => (
          <Card key={r.industry}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Industry</div>
                <div className="text-lg font-semibold">{r.industry}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Score</div>
                <div className="text-2xl font-bold text-primary tabular-nums">{r.score}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Row label="Market demand" value={r.demand} />
              <Row label="Competition" value={r.competition} />
              <Row label="Investment" value={r.investment} />
              <Row label="Est. revenue" value={r.revenue} />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="inline-flex items-center gap-1 text-sm font-medium text-[color:var(--success)]">
                <TrendingUp className="h-4 w-4" /> {r.growth}
              </div>
              <Badge tone="primary">Trending</Badge>
            </div>

            <button className="mt-4 w-full inline-flex items-center justify-center gap-1 rounded-xl bg-primary/10 py-2.5 text-sm font-semibold text-primary hover:bg-primary/15">
              View details <ArrowUpRight className="h-4 w-4" />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

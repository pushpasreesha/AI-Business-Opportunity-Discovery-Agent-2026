import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader } from "@/components/layout/AppShell";
import { reports } from "@/lib/dummy";
import { FileText, Layers, Users, TrendingUp, PieChart, LineChart, Download, Eye, Sparkles } from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText, Layers, Users, TrendingUp, PieChart, LineChart,
};

export const Route = createFileRoute("/_app/reports")({
  head: () => ({ meta: [{ title: "Reports — OpportunIQ" }] }),
  component: ReportsPage,
});

function ReportsPage() {
  const [selected, setSelected] = useState(reports[0]);

  return (
    <div className="space-y-6">
      <PageHeader title="Reports" subtitle="Generate, preview, and download AI-crafted business reports." />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((r) => {
            const Icon = iconMap[r.icon] ?? FileText;
            return (
              <Card key={r.title}>
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold">{r.title}</div>
                    <p className="text-sm text-muted-foreground mt-0.5">{r.desc}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button className="rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground hover:opacity-95">Generate</button>
                  <button className="rounded-xl border border-border py-2 text-xs font-semibold hover:bg-accent inline-flex items-center justify-center gap-1"><Download className="h-3.5 w-3.5" /> Download</button>
                  <button onClick={() => setSelected(r)} className="rounded-xl border border-border py-2 text-xs font-semibold hover:bg-accent inline-flex items-center justify-center gap-1"><Eye className="h-3.5 w-3.5" /> Preview</button>
                </div>
              </Card>
            );
          })}
        </div>

        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <div className="text-sm font-semibold">Preview</div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-dashed border-border p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{selected.title}</div>
            <div className="mt-1 text-xl font-bold">{selected.title} Report</div>
            <p className="mt-2 text-sm text-muted-foreground">{selected.desc}</p>
            <div className="mt-5 space-y-2">
              {[85, 70, 92, 60].map((w, i) => (
                <div key={i} className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary/40 rounded-full" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-card border border-border p-3">
                <div className="text-muted-foreground">Pages</div>
                <div className="font-semibold">24</div>
              </div>
              <div className="rounded-lg bg-card border border-border p-3">
                <div className="text-muted-foreground">Last updated</div>
                <div className="font-semibold">Today</div>
              </div>
            </div>
            <button className="mt-5 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-95">
              Open full report
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

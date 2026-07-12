import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader, Badge } from "@/components/layout/AppShell";
import { ArrowRight, Users, Layers, Lightbulb, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/market-gap")({
  head: () => ({ meta: [{ title: "Market Gap Detection — OpportunIQ" }] }),
  component: MarketGap,
});

const needs = ["Affordable SMB analytics", "Fast onboarding under 5 minutes", "Native mobile-first UX"];
const solutions = ["Enterprise BI ($$$)", "Complex setup", "Web-only tools"];
const opportunity = ["No-code analytics app", "Guided AI onboarding", "Mobile-first design"];

function MarketGap() {
  const score = 87;
  const R = 44;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - score / 100);

  return (
    <div className="space-y-6">
      <PageHeader title="Market gap detection" subtitle="AI-identified whitespace between demand and supply." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        {[
          { title: "Customer needs", icon: Users, items: needs, tone: "primary" as const },
          { title: "Current solutions", icon: Layers, items: solutions, tone: "warning" as const },
          { title: "Detected opportunity", icon: Lightbulb, items: opportunity, tone: "success" as const },
        ].map((col, idx) => (
          <div key={col.title} className="relative">
            <Card>
              <div className="flex items-center gap-2">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <col.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Step {idx + 1}</div>
                  <div className="font-semibold">{col.title}</div>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {col.items.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </Card>
            {idx < 2 && (
              <div className="hidden lg:grid absolute -right-3 top-1/2 z-10 h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow">
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <div className="font-semibold">AI recommendation</div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
          <div className="lg:col-span-3 space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Opportunity</div>
              <div className="text-xl font-bold">No-code AI analytics for SMB retailers</div>
              <p className="mt-1 text-sm text-muted-foreground">
                A mobile-first analytics platform with 5-minute onboarding, targeting SMB retailers underserved by enterprise BI.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Metric label="Market size" value="$14B" />
              <Metric label="Competition" value="Low" />
              <Metric label="Investment" value="$250K – $800K" />
              <Metric label="Profitability" value="High" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="success">Low competition</Badge>
              <Badge tone="primary">High demand</Badge>
              <Badge tone="warning">Fast execution needed</Badge>
            </div>
          </div>

          <div className="grid place-items-center">
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r={R} strokeWidth="10" className="stroke-muted fill-transparent" />
                <circle
                  cx="50" cy="50" r={R} strokeWidth="10" strokeLinecap="round"
                  className="fill-transparent"
                  stroke="var(--primary)"
                  strokeDasharray={C}
                  strokeDashoffset={offset}
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="text-3xl font-bold tabular-nums">{score}</div>
                  <div className="text-xs text-muted-foreground">Opportunity score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

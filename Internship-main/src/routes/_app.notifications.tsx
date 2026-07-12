import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader, Badge, statusTone } from "@/components/layout/AppShell";
import { notifications } from "@/lib/dummy";
import { TrendingUp, Users, DollarSign, Landmark, Newspaper, Sparkles, Bell } from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp, Users, DollarSign, Landmark, Newspaper, Sparkles,
};

const categories = ["All", "Market Trends", "Business News", "Competitors", "Funding", "Government Policies"];

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "Notifications — OpportunIQ" }] }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const [cat, setCat] = useState("All");
  const items = notifications.filter((n) => cat === "All" || n.category === cat);

  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" subtitle="Real-time alerts across markets, competitors, and policy." />

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors ${
              cat === c ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card hover:bg-accent"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute left-5 top-3 bottom-3 w-px bg-border hidden sm:block" />
        <div className="space-y-3">
          {items.map((n) => {
            const Icon = iconMap[n.icon] ?? Bell;
            return (
              <Card key={n.id} className="relative">
                <div className="flex gap-4">
                  <div className="relative shrink-0">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    {n.unread && <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-destructive ring-2 ring-card" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="font-semibold">{n.title}</div>
                      <Badge tone={statusTone(n.priority)}>{n.priority}</Badge>
                      <Badge>{n.category}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{n.desc}</p>
                    <div className="mt-2 text-xs text-muted-foreground">{n.time}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

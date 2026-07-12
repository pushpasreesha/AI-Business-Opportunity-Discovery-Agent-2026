import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader } from "@/components/layout/AppShell";
import { useTheme } from "@/lib/theme";
import { Moon, Sun, Key, Copy, User } from "lucide-react";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — OpportunIQ" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggle } = useTheme();
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Manage your profile, preferences, and API access." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-4 w-4 text-primary" />
            <div className="font-semibold">Profile information</div>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground text-xl font-bold">AV</div>
            <div>
              <div className="font-semibold">Ava Chen</div>
              <div className="text-sm text-muted-foreground">Founder · OpportunIQ</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Full name" defaultValue="Ava Chen" />
            <Field label="Email" defaultValue="ava@opportuniq.ai" />
            <Field label="Company" defaultValue="OpportunIQ Labs" />
            <Field label="Role" defaultValue="Founder" />
          </div>
          <button className="mt-5 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Save changes</button>
        </Card>

        <Card>
          <div className="font-semibold mb-3">Appearance</div>
          <button
            onClick={toggle}
            className="w-full flex items-center justify-between rounded-xl border border-border p-3 hover:bg-accent"
          >
            <div className="flex items-center gap-2 text-sm">
              {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span>{theme === "dark" ? "Dark mode" : "Light mode"}</span>
            </div>
            <span className="text-xs text-muted-foreground">Toggle</span>
          </button>

          <div className="mt-5 font-semibold mb-3">Language</div>
          <select className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm">
            <option>English (US)</option>
            <option>Español</option>
            <option>Français</option>
            <option>Deutsch</option>
            <option>日本語</option>
          </select>
        </Card>
      </div>

      <Card>
        <div className="font-semibold mb-3">Notification preferences</div>
        <div className="space-y-3">
          {[
            "New high-potential opportunities",
            "Weekly market digest",
            "Competitor changes",
            "Funding rounds in tracked industries",
            "Government & policy updates",
          ].map((n) => (
            <label key={n} className="flex items-center justify-between rounded-xl border border-border p-3">
              <span className="text-sm">{n}</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-3">
          <Key className="h-4 w-4 text-primary" />
          <div className="font-semibold">API keys</div>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-4 flex items-center justify-between gap-3">
          <code className="text-sm truncate">oiq_live_sk_••••••••••••••4a92</code>
          <button className="inline-flex items-center gap-1 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-accent">
            <Copy className="h-3.5 w-3.5" /> Copy
          </button>
        </div>
        <button className="mt-3 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent">Generate new key</button>
      </Card>

      <Card>
        <div className="font-semibold mb-3">Account</div>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent">Export data</button>
          <button className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent">Change password</button>
          <button className="rounded-xl bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:opacity-95">Delete account</button>
        </div>
      </Card>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:border-ring"
      />
    </label>
  );
}

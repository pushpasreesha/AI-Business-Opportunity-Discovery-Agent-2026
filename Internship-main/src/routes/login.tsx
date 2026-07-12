import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Sparkles, Mail, Lock, ArrowRight, BarChart3, TrendingUp, Users, Zap } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — OpportunIQ" },
      { name: "description", content: "Sign in to OpportunIQ to discover AI-ranked business opportunities." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("founder@opportuniq.ai");
  const [password, setPassword] = useState("demo1234");
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="flex flex-col justify-center px-6 py-10 md:px-16">
        <div className="mb-10 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold tracking-tight">OpportunIQ</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">AI Discovery</div>
          </div>
        </div>

        <div className="max-w-md w-full mx-auto lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to explore AI-powered business opportunities.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/dashboard" });
            }}
          >
            <label className="block">
              <span className="text-sm font-medium">Email</span>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-ring"
                />
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium">Password</span>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-ring"
                />
              </div>
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border" />
                <span>Remember me</span>
              </label>
              <a className="text-primary hover:underline" href="#">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95"
            >
              Sign in <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="w-full rounded-xl border border-border bg-card py-2.5 text-sm font-semibold hover:bg-accent"
            >
              Create an account
            </button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground">
            By continuing you agree to our <Link to="/login" className="underline">Terms</Link> and{" "}
            <Link to="/login" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      <div className="hidden lg:flex relative items-center justify-center overflow-hidden bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--secondary)] text-white p-16">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="relative max-w-md">
          <h2 className="text-3xl font-bold leading-tight">Discover the next big opportunity with AI.</h2>
          <p className="mt-3 text-white/80">
            Real-time market intelligence, competitor benchmarking, and ranked opportunities across 25+ industries.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { icon: BarChart3, label: "Live analytics" },
              { icon: TrendingUp, label: "Trend detection" },
              { icon: Users, label: "Competitor intel" },
              { icon: Zap, label: "AI recommendations" },
            ].map((f) => (
              <div key={f.label} className="rounded-2xl bg-white/10 backdrop-blur p-4 border border-white/15">
                <f.icon className="h-5 w-5" />
                <div className="mt-2 text-sm font-medium">{f.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-white/10 backdrop-blur p-5 border border-white/15">
            <div className="text-xs uppercase tracking-widest text-white/70">Trending</div>
            <div className="mt-2 text-lg font-semibold">Generative AI Infrastructure</div>
            <div className="mt-1 text-sm text-white/80">Opportunity score 96 · +34% MoM</div>
          </div>
        </div>
      </div>
    </div>
  );
}

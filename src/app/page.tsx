import Link from "next/link";
import {
  Sparkles,
  Globe,
  Shuffle,
  Download,
  Table2,
  Zap,
  Shield,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Table2,
    title: "3 Built-in Templates",
    description: "CRM, E-commerce, and SaaS Analytics with related entities and realistic fields.",
  },
  {
    icon: Globe,
    title: "5 Locales",
    description: "US, UK, Germany, France, Japan — with locale-correct phones, addresses, and currency.",
  },
  {
    icon: Shuffle,
    title: "Narrative Scenarios",
    description: "Inject churning customers or power users — your data tells a story, not random noise.",
  },
  {
    icon: Download,
    title: "CSV & JSON Export",
    description: "UTF-8 with BOM for Excel, or pretty-printed JSON with preserved relationships.",
  },
  {
    icon: Zap,
    title: "Client-Side Generation",
    description: "Your data never touches our servers. Generated in-browser using real APIs + faker fallback.",
  },
  {
    icon: Shield,
    title: "Referential Integrity",
    description: "Every order references a real customer. Every deal links to a company. Enforced, not decorative.",
  },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying DemoSeed",
    features: [
      "500 records/month",
      "3 built-in templates",
      "CSV export",
      "US locale",
      "1 scenario at a time",
    ],
    cta: "Get Started",
    ctaHref: "/generate",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$39",
    period: "/month",
    description: "For teams building serious demos",
    features: [
      "25,000 records/month",
      "All templates + custom",
      "CSV & JSON export",
      "All 5 locales",
      "Stackable scenarios",
      "Unlimited saved configs",
    ],
    cta: "Start Pro Trial",
    ctaHref: "/generate",
    highlighted: true,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ds-bg-primary flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 h-14 border-b border-ds-border sticky top-0 bg-ds-bg-primary/80 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-ds-accent to-ds-accent-hover flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="text-ds-text-primary font-semibold text-sm">
            DemoSeed
          </span>
        </div>
        <Link
          href="/login"
          className="text-sm text-ds-text-secondary hover:text-ds-text-primary transition-colors"
        >
          Sign in
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-24 pb-20">
        <div className="max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-ds-border bg-ds-bg-secondary text-xs text-ds-text-secondary mb-6">
            <Sparkles className="w-3 h-3 text-ds-accent" />
            Realistic demo data in 30 seconds
          </div>

          <h1 className="text-[40px] font-bold text-ds-text-primary leading-tight tracking-tight mb-4">
            Stop demoing with
            <br />
            <span className="text-ds-accent">John Doe, test@test.com</span>
          </h1>

          <p className="text-base text-ds-text-secondary leading-relaxed mb-8 max-w-lg mx-auto">
            DemoSeed generates locale-aware, narrative-driven fake data for your
            SaaS demo environments. Realistic users, transactions, and activity
            logs — not random noise.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Link
              href="/generate"
              className="h-10 px-6 rounded-md bg-ds-accent hover:bg-ds-accent-hover text-white text-sm font-medium inline-flex items-center gap-2 transition-colors glow-accent-hover"
            >
              <Sparkles className="w-4 h-4" />
              Try it now — free
            </Link>
            <Link
              href="#pricing"
              className="h-10 px-6 rounded-md bg-ds-bg-secondary border border-ds-border hover:bg-ds-bg-tertiary text-ds-text-primary text-sm font-medium inline-flex items-center transition-colors"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 border-t border-ds-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold text-ds-text-primary text-center mb-2">
            Everything you need for believable demo data
          </h2>
          <p className="text-sm text-ds-text-secondary text-center mb-12 max-w-lg mx-auto">
            Built for sales engineers, product teams, and developer advocates
            who are tired of &quot;test user #1&quot;.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-5 rounded-lg border border-ds-border bg-ds-bg-secondary hover:border-zinc-600 transition-colors"
                >
                  <Icon className="w-5 h-5 text-ds-accent mb-3" />
                  <h3 className="text-sm font-semibold text-ds-text-primary mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-ds-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-20 border-t border-ds-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-ds-text-primary text-center mb-2">
            Simple pricing
          </h2>
          <p className="text-sm text-ds-text-secondary text-center mb-12">
            Start free, upgrade when you need more.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "p-6 rounded-lg border-2 transition-all",
                  plan.highlighted
                    ? "border-ds-accent bg-ds-bg-secondary glow-accent"
                    : "border-ds-border bg-ds-bg-secondary"
                )}
              >
                {plan.highlighted && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-ds-accent/15 text-ds-accent border border-ds-accent/30 mb-3">
                    Most popular
                  </span>
                )}
                <h3 className="text-sm font-semibold text-ds-text-primary">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-2 mb-1">
                  <span className="text-2xl font-bold text-ds-text-primary">
                    {plan.price}
                  </span>
                  <span className="text-sm text-ds-text-secondary">
                    {plan.period}
                  </span>
                </div>
                <p className="text-xs text-ds-text-secondary mb-5">
                  {plan.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-ds-text-secondary"
                    >
                      <Check className="w-3.5 h-3.5 text-ds-success shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.ctaHref}
                  className={cn(
                    "w-full h-9 rounded-md text-sm font-medium inline-flex items-center justify-center transition-colors",
                    plan.highlighted
                      ? "bg-ds-accent hover:bg-ds-accent-hover text-white"
                      : "bg-ds-bg-tertiary border border-ds-border hover:bg-ds-bg-tertiary text-ds-text-primary"
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-ds-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-ds-accent to-ds-accent-hover flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">D</span>
            </div>
            <span className="text-xs text-ds-text-secondary">
              DemoSeed &copy; {new Date().getFullYear()}
            </span>
          </div>
          <p className="text-xs text-ds-text-secondary">
            Realistic demo data for SaaS teams
          </p>
        </div>
      </footer>
    </div>
  );
}

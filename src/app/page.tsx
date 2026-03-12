"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Globe,
  Shuffle,
  Download,
  Table2,
  Zap,
  Shield,
  Check,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HeroDataGrid } from "@/components/landing/HeroDataGrid";

const FEATURES = [
  {
    icon: Table2,
    title: "3 Built-in Templates",
    description:
      "CRM, E-commerce, and SaaS Analytics with related entities and realistic fields.",
  },
  {
    icon: Globe,
    title: "5 Locales",
    description:
      "US, UK, Germany, France, Japan — with locale-correct phones, addresses, and currency.",
  },
  {
    icon: Shuffle,
    title: "Narrative Scenarios",
    description:
      "Inject churning customers or power users — your data tells a story, not random noise.",
  },
  {
    icon: Download,
    title: "CSV & JSON Export",
    description:
      "UTF-8 with BOM for Excel, or pretty-printed JSON with preserved relationships.",
  },
  {
    icon: Zap,
    title: "Client-Side Generation",
    description:
      "Your data never touches our servers. Generated in-browser using real APIs + faker fallback.",
  },
  {
    icon: Shield,
    title: "Referential Integrity",
    description:
      "Every order references a real customer. Every deal links to a company. Enforced, not decorative.",
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

const ease = [0.16, 1, 0.3, 1] as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ds-bg-primary flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 h-14 sticky top-0 z-50 glass-panel-strong">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#E8AF44] to-[#D49A2E] flex items-center justify-center shadow-sm">
            <span className="text-[#0C0F14] font-bold text-sm font-display">D</span>
          </div>
          <span className="text-ds-text-primary font-semibold text-[15px] tracking-tight font-display">
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute inset-0 noise-overlay" />

        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs text-ds-text-secondary mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-ds-accent animate-pulse-subtle" />
              Realistic demo data in 30 seconds
            </div>

            <h1 className="text-[44px] lg:text-[56px] font-bold text-ds-text-primary leading-[1.08] tracking-tight font-display mb-6">
              Stop demoing with{" "}
              <span className="text-ds-accent">fake-looking</span> fake data.
            </h1>

            <p className="text-lg text-ds-text-secondary leading-relaxed mb-10 max-w-md">
              Generate locale-aware, narrative-driven datasets for your SaaS
              demos. Real names, real addresses, real stories.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/generate"
                className="group h-11 px-7 rounded-xl bg-ds-accent hover:bg-ds-accent-hover text-[#0C0F14] text-sm font-semibold inline-flex items-center gap-2 transition-all glow-accent-hover shadow-lg"
              >
                Start generating
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="h-11 px-7 rounded-xl glass-panel text-ds-text-primary text-sm font-medium inline-flex items-center transition-all hover:bg-ds-bg-elevated/60"
              >
                See how it works
              </Link>
            </div>
          </motion.div>

          {/* Right column — animated product demo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-8 bg-gradient-to-br from-ds-accent/10 via-transparent to-transparent rounded-3xl blur-2xl" />
            <div className="relative">
              <HeroDataGrid />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features — Bento Grid */}
      <section id="features" className="px-6 py-28 border-t border-ds-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[32px] font-bold text-ds-text-primary tracking-tight font-display mb-3">
              Everything for believable demo data
            </h2>
            <p className="text-base text-ds-text-secondary max-w-lg mx-auto">
              Built for sales engineers, product teams, and developer advocates
              who are tired of &quot;test user #1.&quot;
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              const isLarge = i === 0 || i === 3;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={cn(
                    "group relative p-6 rounded-2xl border border-ds-border bg-ds-bg-secondary/60 hover:border-ds-border-hover transition-all duration-300 overflow-hidden",
                    isLarge && "lg:col-span-2"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-ds-accent-muted to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-ds-accent-muted flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-ds-accent" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-ds-text-primary mb-2 font-display">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-ds-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-28 border-t border-ds-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[32px] font-bold text-ds-text-primary tracking-tight font-display mb-3">
              Simple pricing
            </h2>
            <p className="text-base text-ds-text-secondary">
              Start free, upgrade when you need more.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {PRICING.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={cn(
                  "relative p-8 rounded-2xl transition-all",
                  plan.highlighted
                    ? "glass-panel-strong border border-ds-border-accent glow-accent"
                    : "bg-ds-bg-secondary border border-ds-border"
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[11px] font-semibold bg-ds-accent text-[#0C0F14]">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-ds-text-primary font-display">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-3 mb-2">
                  <span className="text-[40px] font-bold text-ds-text-primary font-display">
                    {plan.price}
                  </span>
                  <span className="text-base text-ds-text-secondary">
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm text-ds-text-secondary mb-8">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-ds-text-secondary"
                    >
                      <Check className="w-4 h-4 text-ds-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.ctaHref}
                  className={cn(
                    "w-full h-11 rounded-xl text-sm font-semibold inline-flex items-center justify-center transition-all",
                    plan.highlighted
                      ? "bg-ds-accent hover:bg-ds-accent-hover text-[#0C0F14] glow-accent-hover"
                      : "bg-ds-bg-tertiary border border-ds-border hover:bg-ds-bg-elevated text-ds-text-primary"
                  )}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-ds-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#E8AF44] to-[#D49A2E] flex items-center justify-center">
              <span className="text-[#0C0F14] font-bold text-[10px] font-display">
                D
              </span>
            </div>
            <span className="text-sm text-ds-text-secondary">
              DemoSeed &copy; {new Date().getFullYear()}
            </span>
          </div>
          <p className="text-sm text-ds-text-tertiary">
            Realistic demo data for SaaS teams
          </p>
        </div>
      </footer>
    </div>
  );
}

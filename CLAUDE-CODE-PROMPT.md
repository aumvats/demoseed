# DemoSeed — Claude Code Implementation Prompt

Copy everything below this line and paste it into Claude Code as your initial prompt.

---

## Prompt

Read the file `DEMOSEED-SPEC.md` in this directory. It contains the full product specification for DemoSeed — a micro-SaaS that generates realistic, locale-aware fake data for SaaS demo environments.

Build the complete v1 MVP as specified in **Section 10** of the spec. Here's what I need:

### What to Build

A full-stack web app with:

1. **Landing page** — clean marketing page with a "Try it now" CTA that drops the user straight into the generation studio without signup
2. **Generation Studio** — the 5-step wizard flow (Template → Configure → Scenarios → Preview → Export) as described in Section 4.2
3. **Data Preview Grid** — virtualized, editable data grid per Section 5.2. This is the most important screen. Spend extra time here.
4. **Dashboard** — shows recent generations and usage stats
5. **Auth** — Google OAuth. Free tier = 500 records/mo. Pro tier = $39/mo (wire up Stripe checkout but can be a placeholder).
6. **Export** — CSV and JSON for v1

### Scope for v1

- 3 templates only: CRM, E-commerce, SaaS Analytics (with the exact entities and fields listed in the spec)
- 5 locales: US, UK, Germany, France, Japan
- 2 scenarios: Churning Customer, Power User
- Volume options: 50, 100, 500, 1,000 records
- Export: CSV and JSON
- Generation history saved to user's account

### Technical Guidance

- Follow the UI/UX guidelines in Section 5 precisely — the dark color palette, typography (Inter + JetBrains Mono), spacing system, and animations are all specified with exact values
- The core data generation engine should run **client-side**. Use the free APIs listed in Section 3 (especially RandomUser.me) with fallback to local faker-style generation if APIs are slow or rate-limited
- Preview grid MUST be virtualized — it needs to handle 1,000 rows without jank
- Follow the data quality principles in Section 9: internal consistency (locale-correct phone/address/currency), referential integrity between entities, temporal coherence (dates make logical sense), and statistical realism (power law distributions, not uniform random)
- The generate button animation (shimmer/wave ripple across the grid, cell-by-cell stagger) is the signature moment of the product — make it feel great

### What NOT to Build (v2 stuff, skip for now)

- SQL export
- API Push / CRM Sync
- Custom Schema Builder
- Scheduled generation
- Team features
- Template Marketplace
- CLI tool

### Stack Preference

Pick whatever stack you think is best for this, but some guidelines:
- React-based frontend (Next.js is fine)
- Tailwind CSS for styling
- A virtualized data grid library (TanStack Table, AG Grid, or similar)
- Supabase or similar for auth + database (storing configs, not generated data)
- Generated data never hits our backend — client-side generation only

### Quality Bar

This should look and feel like a product from Linear or Vercel's design team. The spec has exact hex codes, font sizes, border radii, and animation timings — use them. The data preview grid and the generate-button animation are the two moments that need to feel exceptional.

Read the full spec carefully before starting. Ask me questions if anything is ambiguous.

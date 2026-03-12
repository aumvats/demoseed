# DemoSeed — Project Context

**Product**: Micro-SaaS generating realistic, locale-aware fake data for SaaS demo environments.
**Spec**: `DEMOSEED-SPEC.md` (full product spec, section 10 = v1 MVP scope)

**Stack**: Next.js 16 (App Router) · Tailwind v4 + shadcn/ui · TanStack Table + react-virtual · @faker-js/faker v9 · Supabase (Auth + PostgreSQL) · Framer Motion · lucide-react · file-saver

**URLs**:
- Production: https://demoseed.vercel.app
- GitHub: https://github.com/aumvats/demoseed
- Supabase project: `eojgnwbquuuvlcaqynuw` (name: "bouncedaily", region: ap-south-1, shared with other projects)

**Supabase credentials** are in `.env.local` (NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY). Service role key is in `/Users/aumvats/Code/bounce/smpl-tool/.env.local`.

**Vercel env vars**: Both NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set for production/preview/development.

---

## Architecture

```
src/
├── app/
│   ├── page.tsx                    # Landing page (unauthed)
│   ├── layout.tsx                  # Root layout (Inter + JetBrains Mono, dark mode)
│   ├── globals.css                 # Design tokens as CSS vars + @theme inline
│   ├── (app)/                      # App routes (no auth)
│   │   ├── layout.tsx              # AppNav wrapper
│   │   ├── dashboard/page.tsx      # Dashboard with quick actions + usage
│   │   ├── generate/page.tsx       # StudioProvider + StudioLayout (5-step wizard)
│   │   └── history/page.tsx        # Generation history (placeholder)
│   └── (auth)/                     # Auth routes (currently disabled, redirects to /generate)
│       ├── layout.tsx              # Pass-through wrapper
│       ├── login/page.tsx          # Redirects to /generate (auth skipped)
│       └── callback/route.ts       # OAuth code exchange (unused)
├── components/
│   ├── grid/                       # Data preview grid (MOST IMPORTANT component)
│   │   ├── DataGrid.tsx            # TanStack Table + react-virtual
│   │   └── cells/                  # 7 cell renderers (Avatar, Badge, Currency, Date, Editable, Number, Percentage)
│   ├── studio/                     # Generation wizard
│   │   ├── StudioLayout.tsx        # 3-panel layout (stepper | content | help)
│   │   ├── StudioStepper.tsx       # Vertical step navigation
│   │   ├── StudioHelpPanel.tsx     # Context help + stats
│   │   ├── GenerateButton.tsx      # Shimmer animation button
│   │   └── steps/                  # Step1Template, Step2Configure, Step3Scenarios, Step4Preview, Step5Export
│   ├── shared/                     # AppNav (UserMenu exists but unused — auth disabled)
│   └── ui/                         # shadcn components
├── contexts/
│   ├── AuthContext.tsx              # EXISTS but unused (auth disabled)
│   └── StudioContext.tsx            # useReducer: wizard step, config, dataset, loading
├── hooks/
│   ├── useGeneration.ts            # Calls engine + progress simulation
│   └── useExport.ts                # CSV/JSON export via file-saver
├── lib/
│   ├── engine/                     # Core data generation (pure functions, no React)
│   │   ├── index.ts                # Public API: generateDataset(config)
│   │   ├── orchestrator.ts         # Coordinates generation, scenario assignment
│   │   ├── rng.ts                  # Seeded xorshift32 PRNG + utilities (pareto, randInt, etc.)
│   │   ├── randomUserApi.ts        # RandomUser.me API fetcher with locale mapping
│   │   ├── fakerFallback.ts        # @faker-js/faker with dynamic locale imports
│   │   ├── locale/index.ts         # 5 locale adapters (phone, currency, formatting)
│   │   ├── templates/              # crm.ts, ecommerce.ts, saasAnalytics.ts, index.ts
│   │   └── exporters/              # csv.ts (UTF-8 BOM), json.ts
│   └── supabase/
│       ├── client.ts               # Browser client (singleton, mock fallback when no env)
│       └── server.ts               # Server client for SSR
├── middleware.ts                    # Pass-through (auth disabled)
└── types/
    ├── engine.ts                   # LocaleCode, TemplateId, ScenarioId, GenerationConfig, etc.
    ├── studio.ts                   # WizardStep, StudioState, StudioAction
    └── supabase.ts                 # UserProfile, Generation, UsageRecord
```

---

## Database (Supabase — already migrated)

3 tables with RLS:
- `user_profiles` — auto-created on signup via trigger on `auth.users`
- `generations` — stores generation history (template, locale, record_count, scenarios, field_config JSONB)
- `usage_records` — monthly usage tracking with `increment_usage(p_user_id, p_count)` RPC (atomic upsert)

---

## Design System

All tokens in `globals.css` as `--ds-*` CSS vars mapped to Tailwind via `@theme inline`:
- Colors: bg-primary (#09090B), bg-secondary (#18181B), bg-tertiary (#27272A), border (#3F3F46), text-primary (#FAFAFA), text-secondary (#A1A1AA), accent (#8B5CF6), accent-hover (#7C3AED), success (#22C55E), warning (#F59E0B), destructive (#EF4444)
- Fonts: Inter (body, 400-700) + JetBrains Mono (data cells, 400-500)
- Animations: shimmer, cell-appear (150ms ease-out), export-success, pulse-subtle

---

## What's Built (v1 MVP)

- [x] Landing page with hero, features grid, pricing section
- [x] 5-step generation wizard (Template → Configure → Scenarios → Preview → Export)
- [x] Virtualized data grid with 7 cell renderers + inline editing
- [x] 3 templates: CRM (11 fields), E-commerce (11 fields), SaaS Analytics (11 fields)
- [x] 5 locales: US, UK, DE, FR, JP with phone/currency formatting
- [x] 2 scenarios: Churning Customer (~20%), Power User (~15%)
- [x] CSV/JSON export with file-saver
- [x] Seeded RNG (xorshift32) for reproducible data
- [x] RandomUser.me API with faker.js fallback
- [x] Dashboard + History pages (basic)
- [x] Database migration (3 tables + RLS + triggers + RPC)
- [x] Deployed to Vercel with env vars

**Auth status**: DISABLED. Auth scaffolding exists (AuthContext, UserMenu, callback route, Supabase client/server) but is not wired up. All routes are publicly accessible. To re-enable auth later, restore AuthProvider in layouts, restore middleware guards, and configure Google OAuth in Supabase.

---

## What's NOT Done Yet

- [ ] **Polish items from spec**: Confetti on first export, toast system, skeleton loading states, Cmd+K command palette
- [ ] **History page**: Currently a placeholder, needs to fetch from `generations` table

---

## Key Patterns

- **Auth disabled**: All auth code exists but is disconnected. Middleware is pass-through. No AuthProvider in layouts. Login redirects to /generate.
- **Mock Supabase client**: `src/lib/supabase/client.ts` returns a mock when env vars are missing
- **Engine is pure**: `src/lib/engine/` has zero React dependencies, all pure functions
- **shadcn v4 uses @base-ui/react**: NOT Radix. Don't use `asChild` prop — use `className` directly on trigger components.
- **StudioContext**: useReducer pattern with `StudioState`/`StudioAction`. Default config: template='crm', locale='us', recordCount=100.
- **Data generation is client-side only**: Generated data never hits the backend. Only configs/history are persisted to Supabase.

---

## Dev Commands

```bash
npm run dev          # Start dev server (auto-selects available port)
npm run build        # Production build
npx vercel --prod    # Deploy to Vercel
```

# DemoSeed — Product Specification

> Realistic demo data in 30 seconds. A micro-SaaS that generates locale-aware, narrative-driven fake data for SaaS demo environments.

---

## 1. What This Is

DemoSeed generates realistic fake data for SaaS demo environments. Sales engineers, product teams, and developer advocates use it to fill staging databases with believable users, transactions, and activity logs — eliminating "John Doe, test@test.com" from live demos.

The core differentiator is **Scenarios** — narrative arcs injected into generated data so it tells a story (a churning customer, a power user, a seasonal spike) instead of just random noise.

---

## 2. Target Users

| Persona | Pain Point | Price Sensitivity |
|---|---|---|
| Solutions Engineer | Spends 2-3 hours before each demo manually creating fake data | $39–$99/mo, expenses it |
| Product Manager | Demo env looks empty or has obviously fake data | $39–$99/mo, team budget |
| Developer Advocate | Rebuilds sample data for every tutorial/workshop | $39/mo |
| Startup Founder | Needs app to look like it has real traction for investor demos | $29–$39/mo |
| QA Engineer | Needs varied datasets including edge cases | $39/mo, team budget |

---

## 3. APIs to Use

All free-tier or no-auth. Zero cost at MVP.

| API | Purpose | Auth | Notes |
|---|---|---|---|
| **RandomUser.me** | Full user profiles (names, emails, photos, addresses, phones) by 35+ nationalities | None | Batch up to 5,000/request. This does most of the heavy lifting. |
| **Agify.io** | Age estimation from first name | None | 1,000/day free. Fall back to local name-frequency tables if rate-limited. |
| **Genderize.io** | Gender inference from first name | None | 1,000/day free. Same fallback strategy. |
| **Nationalize.io** | Nationality inference from name | None | 1,000/day free. Same fallback strategy. |
| **Clearbit Logo API** | Real company logos for fake organizations | None | Cache aggressively. Fallback: generic company avatar sprites. |
| **UI Faces / Lorem Picsum** | Realistic avatar photos and product images | None | Unlimited. |
| **Frankfurter** | Real currency exchange rates for financial templates | None | Unlimited, no key needed. |
| **Open Food Facts** | Real product names/brands for e-commerce templates | None | Unlimited. |
| **PoetryDB / Quotable** | Realistic text content for CMS/blog templates | None | Unlimited. |
| **Country/State data APIs** | Valid geographic hierarchies for address generation | None | Unlimited. |

**Rate limit strategy:** Pre-fetch and cache a pool of 5,000 RandomUser profiles per locale (24h cache). For Agify/Genderize/Nationalize, fall back to deterministic local estimation if rate-limited. Clearbit logos cached indefinitely.

---

## 4. Product Flow — End to End

### 4.1 Onboarding (First-Time Experience)

Goal: user generates their first dataset within 90 seconds of landing. No credit card.

1. Landing page → "Try it now" button (no signup needed for first generation)
2. Instant playground: redirected to `/generate` with CRM template pre-selected and 50 records
3. Preview grid auto-populates with sample data immediately (no clicks needed — instant wow moment)
4. User scrolls the preview, notices how realistic it looks
5. User clicks "Export CSV" → prompted to create account (Google OAuth or email magic link — one click)
6. After auth, CSV downloads immediately (no delay, no paywall on first export)
7. Confetti animation + toast: "Your first dataset! You have 450 free records remaining this month."
8. Subtle nudge card below grid: "Try a Scenario: make one of these users a churning customer"

First 3 generations are free with full features. Then free tier limits kick in.

After signup, a 30-second interactive tour highlights: template picker, volume slider, locale selector, export button.

### 4.2 Core Generation Flow (The Main Screen)

This is the primary interaction loop. It should feel as fast and satisfying as a slot machine pull.

**The flow is a 5-step wizard:**

#### Step 1: Choose a Template

Templates are pre-built data schemas for common SaaS verticals. Each defines entity types, field names, data types, and relationships between entities.

| Template | Entities Generated | Example Fields |
|---|---|---|
| CRM / Sales | Users, Companies, Deals, Activities | deal_stage, close_date, mrr, last_contacted, lead_source |
| E-commerce | Customers, Products, Orders, Reviews | order_total, sku, shipping_status, review_rating, cart_abandonment |
| SaaS Analytics | Users, Sessions, Events, Subscriptions | plan_tier, login_count, feature_usage, churn_risk_score, nps_score |
| Support / Helpdesk | Agents, Tickets, Customers, Messages | priority, resolution_time, satisfaction_score, escalated, category |
| HR / People | Employees, Departments, Reviews, Payroll | hire_date, salary_band, manager_id, performance_rating, pto_balance |
| Fintech | Accounts, Transactions, Beneficiaries | transaction_type, amount, currency, risk_flag, kyc_status |
| Healthcare (anonymized) | Patients, Appointments, Providers | visit_type, diagnosis_code, insurance_tier, wait_time, follow_up |
| EdTech | Students, Courses, Assignments, Grades | enrollment_date, completion_pct, quiz_score, instructor_rating |

Users can also create **custom templates** by defining their own schema. Custom templates are saveable and shareable within a team.

#### Step 2: Configure Generation Settings

- **Volume slider:** 50, 100, 500, 1,000, 5,000, or 10,000 records. Visual indicator shows estimated file size.
- **Locale selector:** Dropdown with flag icons. Selecting "Germany" means names are German, addresses use German formatting, phone numbers are +49, currency is EUR. Multi-locale option generates a realistic international user base.
- **Date range picker:** Set the time window for temporal data (e.g., "last 12 months" of transactions). Data distributes realistically with weekday/weekend patterns.
- **Seed control:** Optional — lock a seed number to reproduce the exact same dataset. Useful for consistent demo environments.

#### Step 3: Apply Scenarios (The Killer Feature)

Scenarios inject narrative arcs into the data. Instead of random noise, the dataset tells a believable story.

| Scenario | What It Does | Use Case |
|---|---|---|
| **The Churning Customer** | One user shows declining engagement: fewer logins, support tickets increase, downgrades plan, eventually cancels | Demo a churn prediction feature |
| **The Power User** | One user shows accelerating adoption: high feature usage, upgrades plan, invites team members, becomes advocate | Demo a product-led growth dashboard |
| **Seasonal Spike** | Order volume / signups spike around Black Friday, back-to-school, or custom dates | Demo analytics or capacity planning tools |
| **The Escalation** | A support ticket starts low-priority, gets escalated through 3 agents, resolved by manager | Demo helpdesk or escalation workflows |
| **Growth Trajectory** | Company metrics show month-over-month growth: users, revenue, engagement all trending up | Investor demos and pitch decks |
| **Data Quality Issues** | 5–10% of records have missing fields, inconsistent formats, duplicate entries | Demo data quality or cleaning tools |
| **Compliance Audit Trail** | Records include detailed timestamps, IP addresses, change logs for every modification | Demo audit or compliance dashboards |

Scenarios are **toggleable and stackable**. A user can generate 1,000 CRM records with both "Churning Customer" and "Growth Trajectory" active simultaneously.

#### Step 4: Preview & Refine

Before exporting, users see a live preview grid showing the first 25 records.

Key interactions:
- **Click any cell** to manually override a value (e.g., change a name to match a real prospect for a personalized demo)
- **Column-level regenerate:** click a column header icon to regenerate just that field across all records
- **Row-level pin:** pin specific rows you like so they survive when you regenerate the rest
- **Quick stats bar:** shows distribution summary (e.g., "23% US, 18% UK, 14% DE" for locale, or "avg deal size: $14,200")
- **Scenario highlight:** rows affected by a scenario are subtly color-coded so you can spot the narrative threads

#### Step 5: Export & Deliver

| Format | Details | Best For |
|---|---|---|
| CSV | One file per entity, zipped. UTF-8 with BOM for Excel compatibility. | Quick import to spreadsheets |
| JSON | Nested structure preserving relationships. Pretty-printed. | Frontend mock APIs, Postman |
| SQL | INSERT statements with CREATE TABLE. PostgreSQL, MySQL, SQLite dialects. | Direct staging DB population |
| API Push | Direct HTTP POST to user's staging endpoint. User provides URL + auth header. | Automated CI/CD demo seeding |
| Salesforce Sync | Maps to standard SF objects (Account, Contact, Opportunity). Bulk API. | CRM demos (v2) |
| HubSpot Sync | Maps to HubSpot CRM objects. Batch create endpoints. | Marketing/sales demos (v2) |

### 4.3 Saved Datasets & History

Every generation is saved with its full config (template, settings, scenarios, manual overrides). Users can:

- **Re-generate:** same config, fresh random seed — new data, same shape
- **Clone & modify:** duplicate a saved config and tweak settings
- **Share with team:** generate a share link that teammates can use to generate from the same config
- **Schedule:** auto-regenerate weekly/daily to keep demo environments fresh (Pro tier)

### 4.4 Custom Schema Builder

For users whose data model doesn't match any template:

1. Click "New Custom Template"
2. Add fields: name the field, pick a data type from a rich dropdown (name, email, phone, date, currency, enum, incrementing ID, reference to another entity, free text, boolean, URL, etc.)
3. Set constraints per field: required/optional, min/max for numbers, regex pattern, enum values, null percentage
4. Define relationships: "Order.customer_id references Customer.id" with cardinality (1:1, 1:many, many:many)
5. Preview 10 sample rows inline as you build
6. Save as reusable template, optionally publish to community template library

---

## 5. UI / UX Guidelines

DemoSeed should feel like the most polished developer tool on the market. Think **Linear meets Vercel meets Raycast**. Every interaction should feel fast, precise, and delightful.

### 5.1 Design System

#### Color Palette (Dark-first)

Dark mode is the default and primary experience. Light mode is secondary.

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#09090B` (zinc-950) | App background — near-black, not pure black |
| `--bg-secondary` | `#18181B` (zinc-900) | Cards, panels, sidebar background |
| `--bg-tertiary` | `#27272A` (zinc-800) | Hover states, subtle elevation |
| `--border-default` | `#3F3F46` (zinc-700) | Borders, dividers — barely visible |
| `--text-primary` | `#FAFAFA` (zinc-50) | Primary text — near-white |
| `--text-secondary` | `#A1A1AA` (zinc-400) | Secondary text, labels, metadata |
| `--accent-primary` | `#8B5CF6` (violet-500) | Primary buttons, active states, brand color |
| `--accent-hover` | `#7C3AED` (violet-600) | Button hover |
| `--success` | `#22C55E` (green-500) | Success states, generated indicators |
| `--warning` | `#F59E0B` (amber-500) | Warnings, approaching limits |
| `--destructive` | `#EF4444` (red-500) | Errors, delete actions |

#### Typography

- **Primary font:** Inter — all UI text. Load weights 400, 500, 600, 700.
- **Monospace font:** JetBrains Mono — data preview grids, code blocks, SQL output, field type labels.
- **Scale:** 12px (labels/metadata), 13px (body/table cells), 14px (section headers), 16px (page titles), 20px (hero text). Never exceed 20px in-app.
- **Letter spacing:** -0.01em on headings, 0 on body, +0.02em on all-caps labels.

#### Spacing & Layout

- **Base unit:** 4px. All spacing is multiples of 4. Common values: 8, 12, 16, 24, 32, 48.
- **Border radius:** 6px for cards/inputs. 8px for modals. 9999px for pills/badges. 4px for small chips.
- **Max content width:** 1280px centered. Sidebar is 260px fixed.
- **Data grid:** Fixed-column virtualized grid (not HTML tables). Must handle 10K+ rows smoothly.

#### Animations & Microinteractions

- **Generate button (signature moment):** On click, a shimmer/wave animation ripples across the preview grid as new data populates cell-by-cell (staggered 20ms per cell, left-to-right, top-to-bottom).
- **Transitions:** All state changes use 150ms ease-out. No animation exceeds 300ms.
- **Loading states:** Skeleton screens with subtle pulse animation. Never use spinners.
- **Hover on data cells:** Subtle background highlight + tiny pencil icon appears (indicating editable).
- **Export button:** Progress indicator with estimated time. On completion, satisfying checkmark animation.
- **Copy to clipboard:** Instant toast notification slides in from bottom-right, auto-dismisses in 2s.

### 5.2 Page-by-Page Layout

#### Dashboard / Home (`/`)

- **Top section:** Quick-action cards in a 2×2 grid: "New Generation", "My Templates", "Recent Exports", "Team Activity". Each card has icon, title, subtitle, and subtle gradient border on hover.
- **Middle section:** Recent generations table — columns: Name, Template, Records, Date, Status (badge). Click to re-open.
- **Right rail (optional):** Usage meter showing records generated this month vs. plan limit. Simple arc chart.

#### Generation Studio (`/generate`) — Core Screen

Three-panel layout:

- **Left panel (260px):** Vertical stepper showing 5 steps (Template → Configure → Scenarios → Preview → Export). Active step highlighted with accent color. Completed steps get green checkmark.
- **Center panel (flex):** Main content area. Changes based on active step. Template step = card grid. Configure step = form controls. Preview step = data grid. Export step = format options.
- **Right panel (320px, collapsible):** Contextual help and stats. During preview: data distribution charts (pie for locale, histogram for numeric fields). During export: format-specific options.

#### Data Preview Grid (Most critical screen)

This is where users spend the most time. It must be exceptional.

- **Virtualized rendering:** Only render visible rows. Smooth scrolling at 10K records.
- **Fixed header row:** Always visible with sort controls and column-level regenerate icon.
- **Fixed first column:** Row number + pin toggle. Stays visible on horizontal scroll.
- **Cell rendering by type:**
  - Emails: blue and clickable (mock mailto)
  - Avatars: tiny circular thumbnails
  - Currency: right-aligned with locale formatting
  - Status fields: colored badges
  - Dates: relative formatting ("3 days ago")
- **Scenario indicators:** Thin colored left-border on rows affected by scenarios. Hover reveals scenario name.
- **Inline editing:** Click cell → edit mode. Tab = next cell. Enter = confirm. Escape = cancel.
- **Bulk select:** Shift+click selects range. Right-click context menu: regenerate selected, delete selected, duplicate selected.

#### Template Marketplace (`/templates`)

- **Card grid:** Each card shows: icon, name, entity count, field count, author, download count, star rating.
- **Category sidebar:** Filterable: CRM, E-commerce, Analytics, Support, HR, Fintech, Healthcare, EdTech, Custom.
- **Detail view:** Click card → full schema, sample data preview (5 rows), "Use This Template" button.

### 5.3 Component Library

- **Buttons:** Three variants — Primary (violet fill), Secondary (zinc-800 fill, zinc-600 border), Ghost (transparent). All: 36px height, 6px radius, 500-weight text.
- **Inputs:** zinc-900 bg, zinc-700 border, zinc-50 text. 36px height. Violet border + glow on focus (`0 0 0 3px rgba(139, 92, 246, 0.15)`).
- **Dropdowns:** Same as inputs. Popover: zinc-900 bg, zinc-700 borders. Items highlight to zinc-800 on hover.
- **Badges/Pills:** 20px height, fully rounded. Colored bg at 10% opacity with matching text. For statuses, plan tiers, entity type labels.
- **Toasts:** Bottom-right stack. Zinc-900 bg with colored left-border (green/red/amber). Auto-dismiss 3s.
- **Modals:** Centered, zinc-950/80% backdrop. Max-width 560px. 8px radius. Slide-up entrance 150ms.
- **Command Palette:** Cmd+K opens Raycast-style palette. Actions: jump to template, new generation, export last dataset, switch locale, etc.

---

## 6. Information Architecture

| Route | Page | Description |
|---|---|---|
| `/` | Dashboard | Quick actions, recent generations, usage stats |
| `/generate` | Generation Studio | 5-step core workflow |
| `/generate/:id` | Edit Generation | Re-open saved generation to modify and re-export |
| `/templates` | Template Library | Browse built-in, community, and custom templates |
| `/templates/new` | Schema Builder | Visual custom template editor |
| `/templates/:id` | Template Detail | Schema, sample data, usage stats |
| `/history` | Generation History | All past generations with search, filter, bulk re-export |
| `/team` | Team Settings | Invite members, manage roles, shared templates |
| `/settings` | Account Settings | Profile, plan, billing, API keys, integrations |
| `/settings/api` | API Keys | Generate/manage keys for programmatic access |
| `/docs` | API Documentation | Interactive API docs (Swagger-style) |

**Navigation:**
- **Sidebar (persistent):** Logo → Dashboard, New Generation, Templates, History, Team, Settings. Collapses to icons on narrow screens.
- **Top bar:** Search (Cmd+K), notification bell, plan badge (Free/Pro/Team), avatar dropdown.
- **Breadcrumbs:** All subpages. Format: Dashboard > Templates > CRM Template.

---

## 7. Pricing

| | Free | Pro — $39/mo | Team — $99/mo |
|---|---|---|---|
| Records per month | 500 | 25,000 | 100,000 |
| Templates | 3 built-in only | All built-in + custom | All + shared team templates |
| Scenarios | 1 at a time | Unlimited, stackable | Unlimited, stackable |
| Export formats | CSV only | CSV, JSON, SQL | All + API Push + CRM Sync |
| Saved configs | 3 | Unlimited | Unlimited |
| Locale support | US English only | 35+ locales | 35+ locales + custom |
| Custom schemas | No | Yes | Yes + shared library |
| Scheduled generation | No | Weekly | Daily + webhook triggers |
| Team members | 1 | 1 | Up to 10 |
| Support | Community | Email (48h) | Priority (4h) + Slack |

Annual billing: 2 months free ($32.50/mo Pro, $82.50/mo Team).

**Path to $1M ARR:** ~800 Pro + ~250 Team = $968K ARR. Add annual conversions → clears $1M.

---

## 8. Key User Flows

### 8.1 First Visitor → First Generation

1. Lands on marketing page → clicks "Try Free"
2. Redirected to `/generate` with CRM template pre-selected, 50 records
3. Preview grid auto-populates (no clicks — instant wow)
4. Scrolls preview, notices realism
5. Clicks "Export CSV" → prompted to create account (Google OAuth, one click)
6. After auth, CSV downloads immediately
7. Confetti + toast: "Your first dataset! 450 free records remaining."
8. Nudge card: "Try a Scenario: make one of these users a churning customer"

### 8.2 Returning User: Scheduled Demo Refresh

1. Opens Dashboard → sees card: "Your weekly generation ran 2 hours ago"
2. Clicks to view → sees new dataset with diff badge "1,000 new records"
3. Clicks "Push to staging" → auto-syncs to saved API endpoint
4. Toast: "Staging refreshed. 1,000 records pushed to api.company.com/seed"

### 8.3 Power User: Custom Schema

1. Templates → "Create Custom"
2. Adds entities: "Warehouse", "InventoryItem", "Shipment"
3. Adds fields per entity with types from dropdown
4. Defines relationship: "Shipment.warehouse_id → Warehouse.id" (drag-and-drop connector)
5. Preview auto-refreshes showing 10 sample rows per entity
6. Saves template, shares link with teammate
7. Teammate opens link → "Use This Template" → generates 5,000 records

---

## 9. Technical Constraints

These aren't stack decisions — they're rules for the implementing engineer.

### Non-Negotiable Performance

- Preview grid renders 1,000 rows with zero scroll jank (use virtualization)
- 100 records generated in <1 second
- 1,000 records in <3 seconds
- 10,000 records in <10 seconds
- Show progress bar beyond 500 records

### Offline-Capable Generation

Core generation engine runs client-side. External APIs (RandomUser, Clearbit) are progressive enhancements. If they timeout, fall back to local faker-style generation.

### Export Accuracy

- SQL output must be syntactically valid for the selected dialect
- CSV must handle commas in values, unicode, and Excel BOM
- JSON must be valid and pretty-printed

### No Data Persistence on Server

Generated data never touches our backend. Generated client-side or in edge function, streamed to user. We store configs, not data.

### Data Quality Principles

- **Internal consistency:** If country = Germany → phone starts with +49, address is a real German city, currency defaults to EUR
- **Referential integrity:** Every `order.customer_id` must reference a valid `customer.id`. Enforced, not decorative.
- **Temporal coherence:** `created_at` must predate first order. `hire_date` must predate first performance review. Date logic validated.
- **Statistical realism:** Revenue follows power laws, not uniform random. Login times peak at 9am and 2pm. Weekend activity drops 70%. Engagement follows retention curves.

---

## 10. MVP Scope (v1)

Ship the smallest thing that delivers the core wow moment.

### v1: Build This

- 3 templates: CRM, E-commerce, SaaS Analytics
- Volume: 50, 100, 500, 1,000 records
- 5 locales: US, UK, Germany, France, Japan
- 2 scenarios: Churning Customer, Power User
- Export: CSV and JSON only
- Preview grid with inline editing
- Free tier (500 records/mo) + Pro tier ($39/mo)
- Google OAuth signup
- Basic dashboard with generation history

### v2 Roadmap (Post-Launch)

- SQL export with dialect picker (PostgreSQL, MySQL, SQLite)
- API Push to user's staging endpoint
- CRM Sync (Salesforce, HubSpot)
- Custom Schema Builder with visual editor
- 5 more scenarios: Seasonal Spike, Escalation, Growth, Data Quality Issues, Audit Trail
- All 35+ locales from RandomUser.me
- Scheduled generation (weekly auto-refresh)
- Team tier with shared templates
- Template Marketplace (community-contributed)
- CLI tool: `npx demoseed generate --template crm --records 1000 --format sql`

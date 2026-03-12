import type { RawProfile, GeneratedRow, ScenarioId, LocaleCode } from "@/types/engine";
import { getLocaleAdapter } from "../locale";
import {
  makeSeededRng,
  randInt,
  randomFrom,
  pareto,
  daysAgo,
} from "../rng";

const DEAL_STAGES = ["Prospecting", "Qualification", "Proposal", "Negotiation", "Won", "Lost"];
const CUSTOMER_STATUSES = ["Active", "New", "Trial", "Inactive"];
const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];
const LEAD_SOURCES = ["Website", "Referral", "LinkedIn", "Conference", "Cold Outreach", "Organic"];

const COMPANY_PREFIXES = [
  "Acme", "Apex", "Stellar", "Nova", "Pinnacle", "Summit", "Vanguard",
  "Meridian", "Zenith", "Frontier", "Horizon", "Catalyst", "Vertex",
  "Quantum", "Nexus", "Synergy", "Mosaic", "Prism", "Flux", "Orbit",
];
const COMPANY_SUFFIXES = [
  "Corp", "Inc", "Labs", "Systems", "Solutions", "Group", "Technologies",
  "Ventures", "Digital", "Analytics", "IO", "AI", "Tech", "Software",
];

export function generateCRM(
  profiles: RawProfile[],
  scenarios: (ScenarioId | null)[],
  locale: LocaleCode,
  seed?: number
): GeneratedRow[] {
  const adapter = getLocaleAdapter(locale);
  const rng = makeSeededRng(seed ?? Date.now());

  // Generate company names
  const companies = Array.from(
    { length: Math.ceil(profiles.length / 5) },
    () => ({
      name: `${randomFrom(rng, COMPANY_PREFIXES)} ${randomFrom(rng, COMPANY_SUFFIXES)}`,
      size: randomFrom(rng, COMPANY_SIZES),
    })
  );

  return profiles.map((profile, i) => {
    const company = companies[i % companies.length];
    const scenario = scenarios[i];
    const isChurning = scenario === "churning_customer";
    const isPowerUser = scenario === "power_user";

    const dealValue = isPowerUser
      ? pareto(rng, 50000, 500000)
      : isChurning
        ? pareto(rng, 500, 5000)
        : pareto(rng, 5000, 80000);

    const lastActivity = isChurning
      ? daysAgo(rng, 60, 180)
      : isPowerUser
        ? daysAgo(rng, 0, 3)
        : daysAgo(rng, 1, 45);

    const activityCount = isPowerUser
      ? randInt(rng, 50, 200)
      : isChurning
        ? randInt(rng, 1, 5)
        : randInt(rng, 5, 40);

    let status: string;
    if (isChurning) status = "At Risk";
    else if (isPowerUser) status = "Champion";
    else status = randomFrom(rng, CUSTOMER_STATUSES);

    let dealStage: string;
    if (isChurning) dealStage = randomFrom(rng, ["Lost", "Negotiation"]);
    else if (isPowerUser) dealStage = "Won";
    else dealStage = randomFrom(rng, DEAL_STAGES);

    return {
      _id: profile.login.uuid,
      _scenario: scenario,
      name: `${profile.name.first} ${profile.name.last}`,
      _avatar: profile.picture.thumbnail,
      _email: profile.email,
      email: profile.email,
      company: company.name,
      company_size: company.size,
      deal_value: { amount: dealValue, code: adapter.currencyCode },
      deal_stage: dealStage,
      last_activity: lastActivity.toISOString(),
      activity_count: activityCount,
      status,
      phone: adapter.formatPhone(profile.phone),
      lead_source: randomFrom(rng, LEAD_SOURCES),
    };
  });
}

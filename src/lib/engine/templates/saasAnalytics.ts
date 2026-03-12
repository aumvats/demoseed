import type { RawProfile, GeneratedRow, ScenarioId, LocaleCode } from "@/types/engine";
import { getLocaleAdapter } from "../locale";
import {
  makeSeededRng,
  randInt,
  randomFrom,
  pareto,
  daysAgo,
} from "../rng";

const PLAN_TIERS = ["Free", "Starter", "Pro", "Enterprise"];
const NPS_RANGE = { min: -100, max: 100 };

export function generateSaasAnalytics(
  profiles: RawProfile[],
  scenarios: (ScenarioId | null)[],
  locale: LocaleCode,
  seed?: number
): GeneratedRow[] {
  const adapter = getLocaleAdapter(locale);
  const rng = makeSeededRng(seed ?? Date.now());

  return profiles.map((profile, i) => {
    const scenario = scenarios[i];
    const isChurning = scenario === "churning_customer";
    const isPowerUser = scenario === "power_user";

    let planTier: string;
    if (isPowerUser) planTier = randomFrom(rng, ["Pro", "Enterprise"]);
    else if (isChurning) planTier = randomFrom(rng, ["Free", "Starter"]);
    else planTier = randomFrom(rng, PLAN_TIERS);

    const loginCount = isPowerUser
      ? randInt(rng, 100, 500)
      : isChurning
        ? randInt(rng, 1, 10)
        : randInt(rng, 15, 80);

    const featureUsage = isPowerUser
      ? randInt(rng, 75, 98)
      : isChurning
        ? randInt(rng, 5, 20)
        : randInt(rng, 25, 70);

    const churnRisk = isChurning
      ? randInt(rng, 70, 95)
      : isPowerUser
        ? randInt(rng, 2, 15)
        : randInt(rng, 15, 55);

    const npsScore = isPowerUser
      ? randInt(rng, 60, NPS_RANGE.max)
      : isChurning
        ? randInt(rng, NPS_RANGE.min, -20)
        : randInt(rng, -10, 70);

    const lastLogin = isChurning
      ? daysAgo(rng, 30, 120)
      : isPowerUser
        ? daysAgo(rng, 0, 1)
        : daysAgo(rng, 1, 14);

    const signupDate = daysAgo(rng, 90, 730);

    const mrrByPlan: Record<string, [number, number]> = {
      Free: [0, 0],
      Starter: [29, 49],
      Pro: [79, 149],
      Enterprise: [299, 999],
    };
    const [mrrMin, mrrMax] = mrrByPlan[planTier] ?? [0, 0];
    const mrr = mrrMin === 0 ? 0 : pareto(rng, mrrMin, mrrMax);

    const sessions30d = isPowerUser
      ? randInt(rng, 40, 120)
      : isChurning
        ? randInt(rng, 0, 3)
        : randInt(rng, 5, 30);

    return {
      _id: profile.login.uuid,
      _scenario: scenario,
      name: `${profile.name.first} ${profile.name.last}`,
      _avatar: profile.picture.thumbnail,
      _email: profile.email,
      email: profile.email,
      plan_tier: planTier,
      login_count: loginCount,
      feature_usage: featureUsage,
      churn_risk_score: churnRisk,
      nps_score: npsScore,
      last_login: lastLogin.toISOString(),
      signup_date: signupDate.toISOString(),
      mrr: { amount: mrr, code: adapter.currencyCode },
      sessions_30d: sessions30d,
    };
  });
}

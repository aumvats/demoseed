import type {
  GenerationConfig,
  GeneratedDataset,
  RawProfile,
  ScenarioId,
} from "@/types/engine";
import { fetchProfiles } from "./randomUserApi";
import { generateFakerProfiles } from "./fakerFallback";
import { generateCRM } from "./templates/crm";
import { generateEcommerce } from "./templates/ecommerce";
import { generateSaasAnalytics } from "./templates/saasAnalytics";
import { makeSeededRng } from "./rng";

function assignScenarios(
  count: number,
  scenarios: ScenarioId[],
  seed?: number
): (ScenarioId | null)[] {
  if (scenarios.length === 0) {
    return new Array(count).fill(null);
  }

  const rng = makeSeededRng(seed ?? Date.now());
  const assignments: (ScenarioId | null)[] = new Array(count).fill(null);

  // Default percentages
  const percentages: Record<ScenarioId, number> = {
    churning_customer: 0.2,
    power_user: 0.15,
  };

  for (const scenario of scenarios) {
    const pct = percentages[scenario];
    const targetCount = Math.max(1, Math.floor(count * pct));
    let assigned = 0;

    // Assign to random unassigned slots
    const availableIndices = assignments
      .map((a, i) => (a === null ? i : -1))
      .filter((i) => i !== -1);

    // Shuffle and pick
    for (let i = availableIndices.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [availableIndices[i], availableIndices[j]] = [
        availableIndices[j],
        availableIndices[i],
      ];
    }

    for (const idx of availableIndices) {
      if (assigned >= targetCount) break;
      assignments[idx] = scenario;
      assigned++;
    }
  }

  return assignments;
}

const templateGenerators = {
  crm: generateCRM,
  ecommerce: generateEcommerce,
  saas_analytics: generateSaasAnalytics,
} as const;

export async function generateDataset(
  config: GenerationConfig
): Promise<GeneratedDataset> {
  const start = Date.now();

  // 1. Fetch profiles
  let profiles: RawProfile[];
  try {
    profiles = await fetchProfiles(
      config.recordCount,
      config.locale,
      config.seed
    );
  } catch {
    profiles = await generateFakerProfiles(
      config.recordCount,
      config.locale,
      config.seed
    );
  }

  // 2. Assign scenarios
  const scenarioAssignments = assignScenarios(
    config.recordCount,
    config.scenarios,
    config.seed
  );

  // 3. Generate rows using the appropriate template
  const generator = templateGenerators[config.template];
  const rows = generator(
    profiles,
    scenarioAssignments,
    config.locale,
    config.seed
  );

  return {
    config,
    rows,
    generatedAt: new Date(),
    durationMs: Date.now() - start,
  };
}

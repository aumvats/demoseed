import type { GeneratedRow, GenerationConfig } from "@/types/engine";

export function toJSON(
  rows: GeneratedRow[],
  config: GenerationConfig
): string {
  const output = {
    meta: {
      template: config.template,
      locale: config.locale,
      recordCount: rows.length,
      generatedAt: new Date().toISOString(),
      scenarios: config.scenarios,
    },
    data: rows.map((row) => {
      const { _id, _scenario, _avatar, _email, ...fields } = row;
      return { id: _id, scenario: _scenario, ...fields };
    }),
  };
  return JSON.stringify(output, null, 2);
}

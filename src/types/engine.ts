// ============ Locale ============
export type LocaleCode = "us" | "uk" | "de" | "fr" | "ja";

export interface LocaleConfig {
  code: LocaleCode;
  label: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  phonePrefix: string;
  fakerLocale: string;
  randomUserNat: string;
}

export const LOCALES: Record<LocaleCode, LocaleConfig> = {
  us: {
    code: "us",
    label: "United States",
    flag: "\u{1F1FA}\u{1F1F8}",
    currencyCode: "USD",
    currencySymbol: "$",
    phonePrefix: "+1",
    fakerLocale: "en_US",
    randomUserNat: "us",
  },
  uk: {
    code: "uk",
    label: "United Kingdom",
    flag: "\u{1F1EC}\u{1F1E7}",
    currencyCode: "GBP",
    currencySymbol: "\u00A3",
    phonePrefix: "+44",
    fakerLocale: "en_GB",
    randomUserNat: "gb",
  },
  de: {
    code: "de",
    label: "Germany",
    flag: "\u{1F1E9}\u{1F1EA}",
    currencyCode: "EUR",
    currencySymbol: "\u20AC",
    phonePrefix: "+49",
    fakerLocale: "de",
    randomUserNat: "de",
  },
  fr: {
    code: "fr",
    label: "France",
    flag: "\u{1F1EB}\u{1F1F7}",
    currencyCode: "EUR",
    currencySymbol: "\u20AC",
    phonePrefix: "+33",
    fakerLocale: "fr",
    randomUserNat: "fr",
  },
  ja: {
    code: "ja",
    label: "Japan",
    flag: "\u{1F1EF}\u{1F1F5}",
    currencyCode: "JPY",
    currencySymbol: "\u00A5",
    phonePrefix: "+81",
    fakerLocale: "ja",
    randomUserNat: "jp",
  },
};

// ============ Templates ============
export type TemplateId = "crm" | "ecommerce" | "saas_analytics";

export type FieldType =
  | "text"
  | "email"
  | "phone"
  | "number"
  | "currency"
  | "date"
  | "badge"
  | "avatar"
  | "boolean"
  | "percentage";

export interface TemplateField {
  key: string;
  label: string;
  type: FieldType;
  enabled: boolean;
  width: number;
  pinned?: boolean;
}

export interface EntityDefinition {
  key: string;
  label: string;
  parentKey?: string;
}

export interface TemplateDefinition {
  id: TemplateId;
  label: string;
  description: string;
  icon: string;
  entities: EntityDefinition[];
  fields: TemplateField[];
}

// ============ Scenarios ============
export type ScenarioId = "churning_customer" | "power_user";

export interface ScenarioDefinition {
  id: ScenarioId;
  label: string;
  description: string;
  color: string;
  defaultPercentage: number;
}

export const SCENARIOS: Record<ScenarioId, ScenarioDefinition> = {
  churning_customer: {
    id: "churning_customer",
    label: "Churning Customer",
    description:
      "Declining engagement: fewer logins, support tickets increase, downgrades plan, eventually cancels",
    color: "#F59E0B",
    defaultPercentage: 20,
  },
  power_user: {
    id: "power_user",
    label: "Power User",
    description:
      "Accelerating adoption: high feature usage, upgrades plan, invites team members, becomes advocate",
    color: "#8B5CF6",
    defaultPercentage: 15,
  },
};

// ============ Generation Config ============
export type RecordCount = 50 | 100 | 500 | 1000;

export interface GenerationConfig {
  template: TemplateId;
  locale: LocaleCode;
  recordCount: RecordCount;
  scenarios: ScenarioId[];
  enabledFields: string[];
  seed?: number;
}

// ============ Generated Data ============
export interface GeneratedRow {
  _id: string;
  _scenario: ScenarioId | null;
  [field: string]: unknown;
}

export interface GeneratedDataset {
  config: GenerationConfig;
  rows: GeneratedRow[];
  generatedAt: Date;
  durationMs: number;
}

// ============ Raw profile from RandomUser.me or faker ============
export interface RawProfile {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string;
  picture: { thumbnail: string; medium: string };
  phone: string;
  location: {
    street: { name: string };
    city: string;
    country: string;
  };
  dob: { date: string; age: number };
}

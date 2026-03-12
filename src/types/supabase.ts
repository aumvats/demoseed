export interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  plan: "free" | "pro";
  created_at: string;
  updated_at: string;
}

export interface Generation {
  id: string;
  user_id: string;
  template: string;
  locale: string;
  record_count: number;
  scenarios: string[];
  field_config: Record<string, unknown>;
  exported_format: "csv" | "json" | null;
  exported_at: string | null;
  created_at: string;
}

export interface UsageRecord {
  id: string;
  user_id: string;
  year_month: string;
  records_generated: number;
}

import type { TemplateDefinition, TemplateId, TemplateField } from "@/types/engine";

export const CRM_FIELDS: TemplateField[] = [
  { key: "name", label: "Name", type: "avatar", enabled: true, width: 220, pinned: true },
  { key: "email", label: "Email", type: "email", enabled: true, width: 220 },
  { key: "company", label: "Company", type: "text", enabled: true, width: 160 },
  { key: "company_size", label: "Size", type: "badge", enabled: true, width: 100 },
  { key: "deal_value", label: "Deal Value", type: "currency", enabled: true, width: 120 },
  { key: "deal_stage", label: "Stage", type: "badge", enabled: true, width: 120 },
  { key: "last_activity", label: "Last Activity", type: "date", enabled: true, width: 140 },
  { key: "activity_count", label: "Activities", type: "number", enabled: true, width: 100 },
  { key: "status", label: "Status", type: "badge", enabled: true, width: 110 },
  { key: "phone", label: "Phone", type: "phone", enabled: true, width: 160 },
  { key: "lead_source", label: "Lead Source", type: "badge", enabled: true, width: 120 },
];

export const ECOMMERCE_FIELDS: TemplateField[] = [
  { key: "name", label: "Customer", type: "avatar", enabled: true, width: 220, pinned: true },
  { key: "email", label: "Email", type: "email", enabled: true, width: 220 },
  { key: "order_total", label: "Order Total", type: "currency", enabled: true, width: 120 },
  { key: "order_count", label: "Orders", type: "number", enabled: true, width: 80 },
  { key: "product_name", label: "Last Product", type: "text", enabled: true, width: 180 },
  { key: "shipping_status", label: "Shipping", type: "badge", enabled: true, width: 120 },
  { key: "review_rating", label: "Rating", type: "number", enabled: true, width: 80 },
  { key: "last_order", label: "Last Order", type: "date", enabled: true, width: 140 },
  { key: "customer_since", label: "Customer Since", type: "date", enabled: true, width: 140 },
  { key: "cart_abandonment", label: "Cart Abandon", type: "boolean", enabled: true, width: 120 },
  { key: "lifetime_value", label: "LTV", type: "currency", enabled: true, width: 100 },
];

export const SAAS_ANALYTICS_FIELDS: TemplateField[] = [
  { key: "name", label: "User", type: "avatar", enabled: true, width: 220, pinned: true },
  { key: "email", label: "Email", type: "email", enabled: true, width: 220 },
  { key: "plan_tier", label: "Plan", type: "badge", enabled: true, width: 100 },
  { key: "login_count", label: "Logins", type: "number", enabled: true, width: 80 },
  { key: "feature_usage", label: "Feature Usage", type: "percentage", enabled: true, width: 130 },
  { key: "churn_risk_score", label: "Churn Risk", type: "percentage", enabled: true, width: 110 },
  { key: "nps_score", label: "NPS", type: "number", enabled: true, width: 70 },
  { key: "last_login", label: "Last Login", type: "date", enabled: true, width: 140 },
  { key: "signup_date", label: "Signup", type: "date", enabled: true, width: 140 },
  { key: "mrr", label: "MRR", type: "currency", enabled: true, width: 100 },
  { key: "sessions_30d", label: "Sessions (30d)", type: "number", enabled: true, width: 120 },
];

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "crm",
    label: "CRM / Sales",
    description: "Users, companies, deals, and activities with realistic pipeline stages and revenue data.",
    icon: "\u{1F4BC}",
    entities: [
      { key: "user", label: "Users" },
      { key: "company", label: "Companies" },
      { key: "deal", label: "Deals", parentKey: "company" },
      { key: "activity", label: "Activities", parentKey: "user" },
    ],
    fields: CRM_FIELDS,
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    description: "Customers, products, orders, and reviews with shipping status and cart abandonment data.",
    icon: "\u{1F6D2}",
    entities: [
      { key: "customer", label: "Customers" },
      { key: "product", label: "Products" },
      { key: "order", label: "Orders", parentKey: "customer" },
      { key: "review", label: "Reviews", parentKey: "product" },
    ],
    fields: ECOMMERCE_FIELDS,
  },
  {
    id: "saas_analytics",
    label: "SaaS Analytics",
    description: "Users, sessions, events, and subscriptions with engagement metrics and churn indicators.",
    icon: "\u{1F4CA}",
    entities: [
      { key: "user", label: "Users" },
      { key: "session", label: "Sessions", parentKey: "user" },
      { key: "event", label: "Events", parentKey: "session" },
      { key: "subscription", label: "Subscriptions", parentKey: "user" },
    ],
    fields: SAAS_ANALYTICS_FIELDS,
  },
];

export function getTemplateById(id: TemplateId): TemplateDefinition {
  return TEMPLATES.find((t) => t.id === id)!;
}

export function getTemplateFields(id: TemplateId): TemplateField[] {
  return getTemplateById(id).fields;
}

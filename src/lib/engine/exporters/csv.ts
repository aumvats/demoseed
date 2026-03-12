import type { GeneratedRow, TemplateField } from "@/types/engine";

function escapeCSV(value: string): string {
  if (
    value.includes(",") ||
    value.includes('"') ||
    value.includes("\n")
  ) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object" && "amount" in (value as Record<string, unknown>)) {
    return String((value as { amount: number }).amount);
  }
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

export function toCSV(rows: GeneratedRow[], fields: TemplateField[]): string {
  const enabledFields = fields.filter((f) => f.enabled);
  const BOM = "\uFEFF"; // UTF-8 BOM for Excel
  const headers = enabledFields.map((f) => escapeCSV(f.label));

  const csvRows = rows.map((row) =>
    enabledFields
      .map((field) => {
        const value = row[field.key];
        return escapeCSV(formatCellValue(value));
      })
      .join(",")
  );

  return BOM + [headers.join(","), ...csvRows].join("\n");
}

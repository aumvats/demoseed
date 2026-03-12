import type { LocaleCode } from "@/types/engine";

export interface LocaleAdapter {
  formatPhone: (raw: string) => string;
  formatCurrency: (amount: number) => string;
  currencyCode: string;
}

const adapters: Record<LocaleCode, LocaleAdapter> = {
  us: {
    currencyCode: "USD",
    formatPhone: (raw) => {
      const digits = raw.replace(/\D/g, "").slice(-10);
      if (digits.length >= 10) {
        return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
      }
      return `+1 ${raw}`;
    },
    formatCurrency: (amount) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount),
  },
  uk: {
    currencyCode: "GBP",
    formatPhone: (raw) => {
      const digits = raw.replace(/\D/g, "").slice(-10);
      return `+44 ${digits.slice(0, 4)} ${digits.slice(4)}`;
    },
    formatCurrency: (amount) =>
      new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount),
  },
  de: {
    currencyCode: "EUR",
    formatPhone: (raw) => {
      const digits = raw.replace(/\D/g, "").slice(-10);
      return `+49 ${digits.slice(0, 3)} ${digits.slice(3)}`;
    },
    formatCurrency: (amount) =>
      new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount),
  },
  fr: {
    currencyCode: "EUR",
    formatPhone: (raw) => {
      const digits = raw.replace(/\D/g, "").slice(-10);
      return `+33 ${digits.slice(0, 1)} ${digits.slice(1, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`;
    },
    formatCurrency: (amount) =>
      new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount),
  },
  ja: {
    currencyCode: "JPY",
    formatPhone: (raw) => {
      const digits = raw.replace(/\D/g, "").slice(-10);
      return `+81 ${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`;
    },
    formatCurrency: (amount) =>
      new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount),
  },
};

export function getLocaleAdapter(locale: LocaleCode): LocaleAdapter {
  return adapters[locale];
}

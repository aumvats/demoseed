const HISTORY_KEY = "demoseed:generation-history";
const MAX_HISTORY = 20;

export interface HistoryEntry {
  id: string;
  template: string;
  locale: string;
  recordCount: number;
  scenarios: string[];
  durationMs: number;
  exportedFormat?: "csv" | "json";
  createdAt: string;
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToHistory(entry: Omit<HistoryEntry, "id" | "createdAt">) {
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  history.unshift(newEntry);
  if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return newEntry;
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

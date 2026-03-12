/**
 * Seeded pseudo-random number generator using xorshift32.
 * Same seed always produces the same sequence.
 */
export function makeSeededRng(seed: number): () => number {
  let state = seed | 0 || 1;
  return () => {
    state ^= state << 13;
    state ^= state >> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
}

/** Random integer in [min, max] inclusive */
export function randInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

/** Random float in [min, max) */
export function randFloat(
  rng: () => number,
  min: number,
  max: number
): number {
  return rng() * (max - min) + min;
}

/** Pick a random element from an array */
export function randomFrom<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

/**
 * Pareto distribution (power law) for realistic revenue/spend values.
 * Most values cluster near min, few reach max.
 */
export function pareto(
  rng: () => number,
  min: number,
  max: number,
  alpha: number = 1.5
): number {
  const u = rng();
  const value = min / Math.pow(1 - u, 1 / alpha);
  return Math.min(Math.round(value), max);
}

/**
 * Generate a date N days ago from now, with some random hours/minutes.
 */
export function daysAgo(
  rng: () => number,
  minDays: number,
  maxDays: number
): Date {
  const days = randInt(rng, minDays, maxDays);
  const hours = randInt(rng, 6, 22); // business-ish hours
  const minutes = randInt(rng, 0, 59);
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

/** Shuffle array in-place using Fisher-Yates with seeded RNG */
export function shuffle<T>(rng: () => number, arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

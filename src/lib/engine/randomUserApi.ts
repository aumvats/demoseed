import type { RawProfile, LocaleCode } from "@/types/engine";

const RANDOMUSER_URL = "https://randomuser.me/api/";

const NATIONALITY_MAP: Record<LocaleCode, string> = {
  us: "us",
  uk: "gb",
  de: "de",
  fr: "fr",
  ja: "jp",
};

export async function fetchProfiles(
  count: number,
  locale: LocaleCode,
  seed?: number
): Promise<RawProfile[]> {
  const params = new URLSearchParams({
    results: String(Math.min(count, 5000)),
    nat: NATIONALITY_MAP[locale],
    inc: "name,email,picture,phone,location,dob,login",
    noinfo: "true",
  });

  if (seed) {
    params.set("seed", String(seed));
  }

  const response = await fetch(`${RANDOMUSER_URL}?${params}`, {
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`RandomUser API returned ${response.status}`);
  }

  const data = await response.json();
  return data.results.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (r: any): RawProfile => ({
      login: { uuid: r.login.uuid },
      name: { first: r.name.first, last: r.name.last },
      email: r.email,
      picture: {
        thumbnail: r.picture.thumbnail,
        medium: r.picture.medium,
      },
      phone: r.phone,
      location: {
        street: { name: r.location.street?.name || "" },
        city: r.location.city,
        country: r.location.country,
      },
      dob: { date: r.dob.date, age: r.dob.age },
    })
  );
}

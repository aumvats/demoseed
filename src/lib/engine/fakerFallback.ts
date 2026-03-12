import type { RawProfile, LocaleCode } from "@/types/engine";

async function getFaker(localeCode: LocaleCode) {
  const localeMap = {
    us: () => import("@faker-js/faker").then((m) => m.fakerEN_US),
    uk: () => import("@faker-js/faker").then((m) => m.fakerEN_GB),
    de: () => import("@faker-js/faker").then((m) => m.fakerDE),
    fr: () => import("@faker-js/faker").then((m) => m.fakerFR),
    ja: () => import("@faker-js/faker").then((m) => m.fakerJA),
  };
  return localeMap[localeCode]();
}

export async function generateFakerProfiles(
  count: number,
  locale: LocaleCode,
  seed?: number
): Promise<RawProfile[]> {
  const faker = await getFaker(locale);
  if (seed) faker.seed(seed);

  return Array.from({ length: count }, () => {
    const uuid = faker.string.uuid();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      login: { uuid },
      name: { first: firstName, last: lastName },
      email: faker.internet
        .email({ firstName, lastName })
        .toLowerCase(),
      picture: {
        thumbnail: `https://i.pravatar.cc/40?u=${uuid}`,
        medium: `https://i.pravatar.cc/80?u=${uuid}`,
      },
      phone: faker.phone.number(),
      location: {
        street: { name: faker.location.street() },
        city: faker.location.city(),
        country: faker.location.country(),
      },
      dob: {
        date: faker.date
          .birthdate({ min: 22, max: 65, mode: "age" })
          .toISOString(),
        age: faker.number.int({ min: 22, max: 65 }),
      },
    };
  });
}

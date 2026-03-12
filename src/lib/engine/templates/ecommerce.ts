import type { RawProfile, GeneratedRow, ScenarioId, LocaleCode } from "@/types/engine";
import { getLocaleAdapter } from "../locale";
import {
  makeSeededRng,
  randInt,
  randomFrom,
  pareto,
  daysAgo,
} from "../rng";

const SHIPPING_STATUSES = ["Delivered", "Shipped", "Processing", "Returned", "Cancelled"];
const PRODUCT_CATEGORIES = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books", "Beauty"];
const PRODUCT_NAMES: Record<string, string[]> = {
  Electronics: ["Wireless Headphones", "Smart Watch", "USB-C Hub", "Portable Charger", "Bluetooth Speaker", "Webcam Pro"],
  Clothing: ["Merino Wool Sweater", "Slim Fit Chinos", "Running Shoes", "Denim Jacket", "Cotton T-Shirt", "Wool Scarf"],
  "Home & Garden": ["Ceramic Planter", "LED Desk Lamp", "Throw Blanket", "Wall Clock", "Cutting Board Set", "Candle Set"],
  Sports: ["Yoga Mat", "Resistance Bands", "Water Bottle", "Running Belt", "Jump Rope", "Foam Roller"],
  Books: ["Design Patterns", "Clean Code", "Atomic Habits", "Deep Work", "The Lean Startup", "Zero to One"],
  Beauty: ["Face Moisturizer", "Lip Balm Set", "Hand Cream", "Sunscreen SPF 50", "Hair Oil", "Body Wash"],
};

export function generateEcommerce(
  profiles: RawProfile[],
  scenarios: (ScenarioId | null)[],
  locale: LocaleCode,
  seed?: number
): GeneratedRow[] {
  const adapter = getLocaleAdapter(locale);
  const rng = makeSeededRng(seed ?? Date.now());

  return profiles.map((profile, i) => {
    const scenario = scenarios[i];
    const isChurning = scenario === "churning_customer";
    const isPowerUser = scenario === "power_user";

    const orderCount = isPowerUser
      ? randInt(rng, 15, 50)
      : isChurning
        ? randInt(rng, 1, 3)
        : randInt(rng, 2, 12);

    const orderTotal = isPowerUser
      ? pareto(rng, 200, 5000)
      : isChurning
        ? pareto(rng, 15, 100)
        : pareto(rng, 30, 500);

    const lifetimeValue = orderTotal * orderCount;

    const category = randomFrom(rng, PRODUCT_CATEGORIES);
    const productName = randomFrom(rng, PRODUCT_NAMES[category]);

    const lastOrder = isChurning
      ? daysAgo(rng, 90, 365)
      : isPowerUser
        ? daysAgo(rng, 0, 7)
        : daysAgo(rng, 3, 60);

    const customerSince = daysAgo(rng, 180, 730);

    let shippingStatus: string;
    if (isChurning) shippingStatus = randomFrom(rng, ["Returned", "Cancelled"]);
    else if (isPowerUser) shippingStatus = randomFrom(rng, ["Delivered", "Shipped"]);
    else shippingStatus = randomFrom(rng, SHIPPING_STATUSES);

    const reviewRating = isPowerUser
      ? randInt(rng, 4, 5)
      : isChurning
        ? randInt(rng, 1, 2)
        : randInt(rng, 3, 5);

    return {
      _id: profile.login.uuid,
      _scenario: scenario,
      name: `${profile.name.first} ${profile.name.last}`,
      _avatar: profile.picture.thumbnail,
      _email: profile.email,
      email: profile.email,
      order_total: { amount: orderTotal, code: adapter.currencyCode },
      order_count: orderCount,
      product_name: productName,
      shipping_status: shippingStatus,
      review_rating: reviewRating,
      last_order: lastOrder.toISOString(),
      customer_since: customerSince.toISOString(),
      cart_abandonment: isChurning ? true : rng() < 0.15,
      lifetime_value: { amount: lifetimeValue, code: adapter.currencyCode },
    };
  });
}

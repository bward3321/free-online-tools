export interface Comparison {
  icon: string;
  unitCost: number;
  format: (count: string) => string;
  minCost: number; // only show this comparison if annual cost >= this
  maxCost: number; // only show if annual cost <= this
}

const ALL_COMPARISONS: Comparison[] = [
  {
    icon: "\u2615",
    unitCost: 5.5,
    format: (n) => `${n} cups of coffee`,
    minCost: 0,
    maxCost: 5000,
  },
  {
    icon: "\ud83c\udf55",
    unitCost: 120,
    format: (n) => `${n} team pizza lunches`,
    minCost: 200,
    maxCost: 20000,
  },
  {
    icon: "\ud83c\udfe2",
    unitCost: 299,
    format: (n) => `${n} months of a WeWork hot desk`,
    minCost: 500,
    maxCost: 30000,
  },
  {
    icon: "\u2708\ufe0f",
    unitCost: 350,
    format: (n) => `${n} round-trip flights NYC \u2192 LA`,
    minCost: 500,
    maxCost: 50000,
  },
  {
    icon: "\ud83c\udf93",
    unitCost: 399,
    format: (n) => `${n} annual Coursera subscriptions`,
    minCost: 500,
    maxCost: 20000,
  },
  {
    icon: "\ud83d\udcf1",
    unitCost: 425,
    format: (n) => `${n} months of Slack for 50 users`,
    minCost: 500,
    maxCost: 30000,
  },
  {
    icon: "\ud83d\udcca",
    unitCost: 960,
    format: (n) => `${n} years of Notion for the whole team`,
    minCost: 1000,
    maxCost: 50000,
  },
  {
    icon: "\ud83d\udcbb",
    unitCost: 1099,
    format: (n) => `${n} new MacBook Airs`,
    minCost: 2000,
    maxCost: 100000,
  },
  {
    icon: "\ud83d\udc64",
    unitCost: 5000,
    format: (n) => `${n} months of a junior developer\u2019s salary`,
    minCost: 5000,
    maxCost: 500000,
  },
  {
    icon: "\ud83d\ude80",
    unitCost: 15000,
    format: (n) => `${n} months of a senior engineer\u2019s salary`,
    minCost: 15000,
    maxCost: 1000000,
  },
];

export function getComparisons(annualCost: number, count = 5): { icon: string; text: string }[] {
  if (annualCost <= 0) return [];

  const eligible = ALL_COMPARISONS.filter(
    (c) => annualCost >= c.minCost && annualCost <= c.maxCost
  );

  // Sort by how "interesting" the quantity is (not too small, not too large)
  const scored = eligible.map((c) => {
    const qty = annualCost / c.unitCost;
    // Ideal range is 2-50. Penalize outside that range.
    let score = 0;
    if (qty >= 2 && qty <= 50) score = 10;
    else if (qty >= 1 && qty <= 100) score = 5;
    else score = 1;
    return { ...c, qty, score };
  });

  scored.sort((a, b) => b.score - a.score || a.unitCost - b.unitCost);

  return scored.slice(0, count).map((c) => {
    const qty = c.qty;
    const formatted = qty >= 10 ? Math.round(qty).toLocaleString() : qty.toFixed(1).replace(/\.0$/, "");
    return { icon: c.icon, text: c.format(formatted) };
  });
}

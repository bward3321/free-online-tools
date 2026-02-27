import { compoundInvestment } from "./subscriptions";

export interface ComparisonItem {
  icon: string;
  text: string;
}

export function getComparisons(annualCost: number): ComparisonItem[] {
  if (annualCost <= 0) return [];
  const items: ComparisonItem[] = [];

  // Investment calculation (always show this one)
  const invested10yr = compoundInvestment(annualCost / 12, 0.10, 10);
  items.push({
    icon: "\ud83d\udcb0",
    text: `$${Math.round(invested10yr).toLocaleString()} if invested at 10% return over 10 years`,
  });

  // Per day
  const perDay = annualCost / 365;
  items.push({
    icon: "\u2615",
    text: `$${perDay.toFixed(2)} per day \u2014 that\u2019s ${(perDay / 6.5).toFixed(1)} fancy lattes daily`,
  });

  // Flights
  if (annualCost >= 500) {
    const flights = annualCost / 600;
    items.push({
      icon: "\u2708\ufe0f",
      text: `${flights >= 10 ? Math.round(flights) : flights.toFixed(1)} round-trip flights to Europe`,
    });
  }

  // Nice dinners
  if (annualCost >= 200) {
    const dinners = annualCost / 75;
    items.push({
      icon: "\ud83c\udf7d\ufe0f",
      text: `${Math.round(dinners)} nice dinners out for two`,
    });
  }

  // iPhones
  if (annualCost >= 1000) {
    const phones = annualCost / 999;
    items.push({
      icon: "\ud83d\udcf1",
      text: `${phones >= 10 ? Math.round(phones) : phones.toFixed(1)} new iPhones`,
    });
  }

  // Rent comparison
  if (annualCost >= 500) {
    const rentPercent = (annualCost / 12 / 1850) * 100;
    items.push({
      icon: "\ud83c\udfe0",
      text: `${rentPercent.toFixed(0)}% of average US rent ($1,850/mo)`,
    });
  }

  // Courses
  if (annualCost >= 100 && annualCost < 5000) {
    const courses = annualCost / 30;
    items.push({
      icon: "\ud83c\udf93",
      text: `${Math.round(courses)} online courses on Udemy`,
    });
  }

  // Car payment
  if (annualCost >= 3000) {
    items.push({
      icon: "\ud83d\ude97",
      text: `A $${Math.round(annualCost / 12).toLocaleString()}/mo car payment \u2014 ${annualCost >= 5000 ? "that\u2019s a used Honda Civic" : "real money"}`,
    });
  }

  return items.slice(0, 5);
}

export function getShareText(
  monthly: number,
  yearly: number,
  fiveYear: number,
  count: number,
): string {
  return `I spend $${Math.round(monthly).toLocaleString()}/month on ${count} subscriptions \u2014 that\u2019s $${Math.round(fiveYear).toLocaleString()} over 5 years \ud83d\ude33 How much do you spend? \u2192 everyfreetool.com/finance-tools/subscription-audit`;
}

export function getTwitterUrl(text: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

export function getLinkedInUrl(): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://everyfreetool.com/finance-tools/subscription-calculator")}`;
}

/* ─── Core Salary Calculation Functions ─── */

export function futureSalary(baseSalary: number, annualRaiseRate: number, years: number): number {
  return baseSalary * Math.pow(1 + annualRaiseRate, years);
}

export function cumulativeEarnings(baseSalary: number, annualRaiseRate: number, years: number): number {
  let total = 0;
  for (let y = 0; y < years; y++) {
    total += baseSalary * Math.pow(1 + annualRaiseRate, y);
  }
  return total;
}

export function yearlyEarnings(baseSalary: number, annualRaiseRate: number, years: number): number[] {
  const result: number[] = [];
  for (let y = 0; y < years; y++) {
    result.push(baseSalary * Math.pow(1 + annualRaiseRate, y));
  }
  return result;
}

export function lifetimeLoss(
  currentSalary: number,
  negotiatedSalary: number,
  annualRaiseRate: number,
  years: number,
): number {
  return cumulativeEarnings(negotiatedSalary, annualRaiseRate, years)
    - cumulativeEarnings(currentSalary, annualRaiseRate, years);
}

export function annualGap(
  currentSalary: number,
  negotiatedSalary: number,
  annualRaiseRate: number,
  year: number,
): number {
  return futureSalary(negotiatedSalary, annualRaiseRate, year)
    - futureSalary(currentSalary, annualRaiseRate, year);
}

export function cumulativeLossAtYear(
  currentSalary: number,
  negotiatedSalary: number,
  annualRaiseRate: number,
  year: number,
): number {
  return cumulativeEarnings(negotiatedSalary, annualRaiseRate, year)
    - cumulativeEarnings(currentSalary, annualRaiseRate, year);
}

/* ─── Total Impact: Bonuses + 401k + Investment ─── */

export interface TotalImpact {
  baseLoss: number;
  bonusLoss: number;
  matchLoss: number;
  totalCompLoss: number;
  investedValue: number;
}

export function calcTotalImpact(
  currentSalary: number,
  negotiatedSalary: number,
  annualRaiseRate: number,
  years: number,
  bonusRate: number,
  matchRate: number,
  investReturnRate: number,
): TotalImpact {
  const baseLoss = lifetimeLoss(currentSalary, negotiatedSalary, annualRaiseRate, years);
  const bonusLoss = baseLoss * bonusRate;
  const matchLoss = baseLoss * matchRate;
  const totalCompLoss = baseLoss + bonusLoss + matchLoss;

  // What the lost salary could grow to if invested each year
  let investedValue = 0;
  for (let y = 0; y < years; y++) {
    const yearGap = futureSalary(negotiatedSalary, annualRaiseRate, y)
      - futureSalary(currentSalary, annualRaiseRate, y);
    const totalYearGap = yearGap * (1 + bonusRate + matchRate);
    investedValue += totalYearGap * Math.pow(1 + investReturnRate, years - y - 1);
  }

  return { baseLoss, bonusLoss, matchLoss, totalCompLoss, investedValue };
}

/* ─── Multi-Negotiation Scenarios ─── */

export function multiNegotiationEarnings(
  baseSalary: number,
  annualRaiseRate: number,
  years: number,
  negotiationEveryN: number,
  negotiationBump: number,
): number[] {
  const salaries: number[] = [];
  let salary = baseSalary;
  for (let y = 0; y < years; y++) {
    if (y > 0 && y % negotiationEveryN === 0) {
      salary *= (1 + negotiationBump);
    }
    salaries.push(salary);
    salary *= (1 + annualRaiseRate);
  }
  return salaries;
}

/* ─── Milestone Comparisons ─── */

export interface MilestoneComparison {
  icon: string;
  text: string;
  threshold: number;
}

const COMPARISON_POOL: MilestoneComparison[] = [
  { threshold: 5000, icon: "\ud83d\udcb8", text: "a month of rent in most US cities" },
  { threshold: 10000, icon: "\ud83d\ude97", text: "a reliable used car" },
  { threshold: 15000, icon: "\ud83c\udf0d", text: "{n} international vacations" },
  { threshold: 20000, icon: "\ud83c\udf93", text: "a full year of state university tuition" },
  { threshold: 50000, icon: "\ud83d\udc8d", text: "a wedding AND a honeymoon" },
  { threshold: 75000, icon: "\ud83c\udfe0", text: "a 20% down payment on a ${home} home" },
  { threshold: 100000, icon: "\ud83d\udcda", text: "{n} years of your child's college fund" },
  { threshold: 200000, icon: "\ud83c\udfe1", text: "a house in most US cities" },
  { threshold: 300000, icon: "\ud83c\udfd6\ufe0f", text: "{n} years of early retirement" },
  { threshold: 500000, icon: "\ud83d\udcb0", text: "half a million dollars \u2014 more than most Americans save in a lifetime" },
  { threshold: 750000, icon: "\ud83c\udfe6", text: "a fully funded retirement account" },
  { threshold: 1000000, icon: "\ud83d\udc51", text: "over ONE MILLION DOLLARS \u2014 from one conversation you didn\u2019t have" },
];

export function getOpportunityCosts(totalLoss: number): { icon: string; text: string }[] {
  if (totalLoss <= 0) return [];
  const items: { icon: string; text: string }[] = [];

  for (const comp of COMPARISON_POOL) {
    if (totalLoss >= comp.threshold) {
      let text = comp.text;
      if (text.includes("{n}") && comp.threshold === 15000) {
        text = text.replace("{n}", String(Math.round(totalLoss / 5000)));
      } else if (text.includes("{n}") && comp.threshold === 100000) {
        text = text.replace("{n}", String(Math.round(totalLoss / 25000)));
      } else if (text.includes("{n}") && comp.threshold === 300000) {
        text = text.replace("{n}", String(Math.round(totalLoss / 50000)));
      } else if (text.includes("${home}")) {
        text = text.replace("${home}", "$" + Math.round(totalLoss * 5).toLocaleString());
      }
      items.push({ icon: comp.icon, text });
    }
  }

  // Take the 4-5 most relevant (highest thresholds that match)
  return items.slice(-5);
}

/* ─── Chart Milestone Callouts ─── */

export function getMilestoneCallout(cumulativeLoss: number, year: number): string | null {
  if (year <= 3) return null;
  if (cumulativeLoss < 10000) return `After ${year} years, that\u2019s $${Math.round(cumulativeLoss).toLocaleString()} lost.`;
  if (cumulativeLoss < 30000) return `$${Math.round(cumulativeLoss).toLocaleString()} \u2014 that\u2019s a new car.`;
  if (cumulativeLoss < 80000) return `$${Math.round(cumulativeLoss).toLocaleString()} \u2014 a year of college tuition.`;
  if (cumulativeLoss < 250000) return `$${Math.round(cumulativeLoss).toLocaleString()} \u2014 a house down payment.`;
  if (cumulativeLoss < 500000) return `$${Math.round(cumulativeLoss).toLocaleString()} \u2014 nearly half a million dollars from ONE conversation.`;
  return `$${Math.round(cumulativeLoss).toLocaleString()} \u2014 more than most Americans save in a lifetime.`;
}

/* ─── Format Helpers ─── */

export function formatCurrency(value: number, decimals = 0): string {
  return "$" + Math.round(value).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCompact(value: number): string {
  if (value >= 1000000) return "$" + (value / 1000000).toFixed(1) + "M";
  if (value >= 1000) return "$" + Math.round(value / 1000).toLocaleString() + "K";
  return "$" + Math.round(value).toLocaleString();
}

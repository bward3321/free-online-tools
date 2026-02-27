export interface RolePreset {
  label: string;
  rate: number;
}

export const ROLE_PRESETS: RolePreset[] = [
  { label: "Intern", rate: 20 },
  { label: "Junior / Entry Level", rate: 30 },
  { label: "Mid-Level IC", rate: 50 },
  { label: "Senior IC", rate: 75 },
  { label: "Manager", rate: 65 },
  { label: "Senior Manager", rate: 85 },
  { label: "Director", rate: 100 },
  { label: "VP", rate: 130 },
  { label: "C-Suite", rate: 175 },
  { label: "Custom", rate: 0 },
];

export interface Attendee {
  id: string;
  role: string;
  rate: number;
  count: number;
}

export const DEFAULT_ATTENDEES: Attendee[] = [
  { id: "1", role: "Manager", rate: 65, count: 1 },
  { id: "2", role: "Mid-Level IC", rate: 50, count: 3 },
  { id: "3", role: "Senior IC", rate: 75, count: 1 },
];

export type FrequencyKey =
  | "once"
  | "daily"
  | "twice-weekly"
  | "weekly"
  | "biweekly"
  | "monthly"
  | "quarterly";

export interface FrequencyOption {
  key: FrequencyKey;
  label: string;
  perYear: number;
}

export const FREQUENCIES: FrequencyOption[] = [
  { key: "once", label: "One-time", perYear: 1 },
  { key: "daily", label: "Daily", perYear: 260 },
  { key: "twice-weekly", label: "2\u00d7 per week", perYear: 104 },
  { key: "weekly", label: "Weekly", perYear: 52 },
  { key: "biweekly", label: "Biweekly", perYear: 26 },
  { key: "monthly", label: "Monthly", perYear: 12 },
  { key: "quarterly", label: "Quarterly", perYear: 4 },
];

export const DURATION_PRESETS = [15, 30, 45, 60, 90, 120] as const;

export function totalAttendees(attendees: Attendee[]): number {
  return attendees.reduce((sum, a) => sum + a.count, 0);
}

export function burnRatePerHour(attendees: Attendee[]): number {
  return attendees.reduce((sum, a) => sum + a.rate * a.count, 0);
}

export function blendedRate(attendees: Attendee[]): number {
  const total = totalAttendees(attendees);
  if (total === 0) return 0;
  return burnRatePerHour(attendees) / total;
}

export function meetingCost(attendees: Attendee[], durationMinutes: number): number {
  return (burnRatePerHour(attendees) * durationMinutes) / 60;
}

export function costPerMinute(attendees: Attendee[]): number {
  return burnRatePerHour(attendees) / 60;
}

export function annualCost(
  attendees: Attendee[],
  durationMinutes: number,
  frequency: FrequencyKey
): number {
  const freq = FREQUENCIES.find((f) => f.key === frequency);
  if (!freq) return 0;
  return meetingCost(attendees, durationMinutes) * freq.perYear;
}

export function monthlyCost(
  attendees: Attendee[],
  durationMinutes: number,
  frequency: FrequencyKey
): number {
  return annualCost(attendees, durationMinutes, frequency) / 12;
}

export function formatCurrency(amount: number, decimals = 2): string {
  if (isNaN(amount) || !isFinite(amount)) return "$0.00";
  if (amount >= 1000 && decimals <= 0) {
    return (
      "$" +
      amount.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    );
  }
  return (
    "$" +
    amount.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
}

let _nextId = 100;
export function nextId(): string {
  return String(++_nextId);
}

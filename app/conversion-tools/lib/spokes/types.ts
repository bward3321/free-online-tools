export interface SpokeData {
  slug: string;
  fromKey: string;
  toKey: string;
  categoryId: string;
  h1: string;
  title: string;
  meta: string;
  quickAnswers: string[];
  referenceTable: [number, string][];
  formulaExplanation: string;
  workedExamples: string[];
  reverseNote: string;
  comparisons: { text: string }[];
  seoContent: string;
  faq: { q: string; a: string }[];
  relatedSlugs: string[];
}

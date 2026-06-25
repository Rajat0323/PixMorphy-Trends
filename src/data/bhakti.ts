export const BHAKTI_CATEGORIES = [
  "Aarti",
  "Chalisa",
  "Festivals",
  "Vrat & Katha",
] as const;

export type BhaktiCategory = (typeof BHAKTI_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<BhaktiCategory, string> = {
  Aarti: "आरती",
  Chalisa: "चालीसा",
  Festivals: "त्योहार",
  "Vrat & Katha": "व्रत और कथा",
};

export const CATEGORY_SLUG_LABELS: Record<string, string> = {
  aarti: "आरती",
  chalisa: "चालीसा",
  festivals: "त्योहार",
  "vrat-katha": "व्रत और कथा",
};

export function getCategoryLabel(category: string) {
  return CATEGORY_LABELS[category as BhaktiCategory] ?? category;
}

export function isBhaktiCategory(category: string) {
  return BHAKTI_CATEGORIES.includes(category as BhaktiCategory);
}

export const BHAKTI_CATEGORIES = [
  "Aarti",
  "Chalisa",
  "Festivals",
  "Vrat & Katha",
] as const;

export type BhaktiCategory = (typeof BHAKTI_CATEGORIES)[number];

export function isBhaktiCategory(category: string) {
  return BHAKTI_CATEGORIES.includes(category as BhaktiCategory);
}

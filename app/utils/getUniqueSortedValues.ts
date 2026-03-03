import { Recipe } from "@/app/types";

export function getUniqueSortedValues<K extends keyof Recipe>(
  recipes: Recipe[],
  key: K,
  nestedKey?: string,
  excludedValues: string[] = [],
): string[] {
  const set = new Set<string>();

  recipes.forEach((recipe) => {
    const value = recipe[key];

    const excludedNormalized = excludedValues.map((v) =>
      v.toLowerCase().trim(),
    );

    // Cas 1 : tableau simple (ex: ustensils)
    if (Array.isArray(value) && typeof value[0] === "string") {
      value.forEach((item) => {
        const normalizedItem = item.toLowerCase().trim();
        if (!excludedNormalized.includes(normalizedItem)) {
          set.add(normalizedItem);
        }
      });
    }

    // Cas 2 : tableau d'objets (ex: ingredients)
    else if (Array.isArray(value) && nestedKey) {
      value.forEach((item: any) => {
        if (item[nestedKey]) {
          const normalizedItem = String(item[nestedKey]).toLowerCase().trim();
          if (!excludedNormalized.includes(normalizedItem)) {
            set.add(normalizedItem);
          }
        }
      });
    }

    // Cas 3 : string simple (ex: appliance)
    else if (typeof value === "string") {
      const normalizedItem = value.toLowerCase().trim();
      if (!excludedNormalized.includes(normalizedItem)) {
        set.add(normalizedItem);
      }
    }
  });

  return Array.from(set).sort((a, b) =>
    a.localeCompare(b, "fr", { sensitivity: "base" }),
  );
}

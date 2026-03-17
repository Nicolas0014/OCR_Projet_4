import { Recipe } from "@/app/types";

/**
 * Fonction utilitaire pour extraire des valeurs uniques et triées à partir d'un tableau de recettes.
 * @param recipes
 * @param key
 * @param nestedKey
 * @param excludedValues
 * @returns Un tableau de chaînes de caractères uniques et triées
 */
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

    // Cas 1 : tableau de strings
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item === "string") {
          const normalized = item.toLowerCase().trim();
          if (!excludedNormalized.includes(normalized)) {
            set.add(normalized);
          }
        }

        // Cas 2 : tableau d'objets (ingredients)
        else if (nestedKey && item && typeof item === "object") {
          const nested = item[nestedKey as keyof typeof item];
          if (typeof nested === "string") {
            const normalized = nested.toLowerCase().trim();
            if (!excludedNormalized.includes(normalized)) {
              set.add(normalized);
            }
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

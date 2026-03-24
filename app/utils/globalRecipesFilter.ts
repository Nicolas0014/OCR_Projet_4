import recipes from "@/app/data/recipes.json";
import { Filters, Recipe } from "../types";

export function globalRecipesFilter({
  activeFilters,
}: {
  activeFilters: Filters;
}) {
  let results: Recipe[] = [];

  const queryCorrection =
    activeFilters.searchQuery.toLowerCase().trim().length >= 3
      ? activeFilters.searchQuery.toLowerCase().trim()
      : "";

  let matchName = true;
  let matchIngredients = true;
  let matchUstensils = true;
  let matchAppliance = true;

  recipes.forEach((recipe) => {
    if (queryCorrection) {
      matchName =
        recipe.name.toLowerCase().includes(queryCorrection) ||
        recipe.description.toLowerCase().includes(queryCorrection) ||
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(queryCorrection),
        ) ||
        recipe.appliance.toLowerCase().includes(queryCorrection) ||
        recipe.ustensils.some((ust) =>
          ust.toLowerCase().includes(queryCorrection),
        );
    }

    if (
      activeFilters.appliance.length ||
      activeFilters.ingredients.length ||
      activeFilters.ustensils.length
    ) {
      matchIngredients =
        activeFilters.ingredients.length === 0 ||
        activeFilters.ingredients.every((tag) =>
          recipe.ingredients.some(
            (ing) => ing.ingredient.toLowerCase() === tag.toLowerCase(),
          ),
        );

      matchUstensils =
        activeFilters.ustensils.length === 0 ||
        activeFilters.ustensils.every((tag) =>
          recipe.ustensils.some((u) => u.toLowerCase() === tag.toLowerCase()),
        );

      matchAppliance =
        activeFilters.appliance.length === 0 ||
        activeFilters.appliance.includes(recipe.appliance.toLowerCase());
    }

    if (matchName && matchIngredients && matchUstensils && matchAppliance) {
      results.push(recipe);
    }
  });

  return results;
}

import { Recipe, Filters } from "../types";

export function filterRecipes(recipes: Recipe[], filters: Filters) {
  return recipes.filter((recipe) => {
    const matchIngredients =
      filters.ingredients.length === 0 ||
      filters.ingredients.every((tag) =>
        recipe.ingredients.some(
          (ing) => ing.ingredient.toLowerCase() === tag.toLowerCase(),
        ),
      );

    const matchUstensils =
      filters.ustensils.length === 0 ||
      filters.ustensils.every((tag) =>
        recipe.ustensils.some((u) => u.toLowerCase() === tag.toLowerCase()),
      );

    const matchAppliance =
      filters.appliance.length === 0 ||
      filters.appliance.includes(recipe.appliance.toLowerCase());

    return matchIngredients && matchUstensils && matchAppliance;
  });
}

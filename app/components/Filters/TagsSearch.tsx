"use client";
// Components
import FilterItem from "@/app/components/Filters/FilterItem";
import ActiveFilterList from "./ActiveFilterList";

// Contexts
import { useFilteredRecipes } from "@/app/contexts/FilteredRecipesContext";

// Utils
import { getUniqueSortedValues } from "@/app/utils/getUniqueSortedValues";

// Types
import { Filters } from "@/app/types";
import { useMemo } from "react";
type FilterTagsKeys = Exclude<keyof Filters, "searchQuery">;

export default function TagsSearch() {
  const { filteredRecipes, activeFilters, setActiveFilters } =
    useFilteredRecipes();

  const availableUstensils = useMemo(
    () =>
      getUniqueSortedValues(
        filteredRecipes,
        "ustensils",
        undefined,
        activeFilters.ustensils,
      ),
    [filteredRecipes, activeFilters.ustensils],
  );
  const availableAppliances = useMemo(
    () =>
      getUniqueSortedValues(
        filteredRecipes,
        "appliance",
        undefined,
        activeFilters.appliance,
      ),
    [filteredRecipes, activeFilters.appliance],
  );
  const availableIngredients = useMemo(
    () =>
      getUniqueSortedValues(
        filteredRecipes,
        "ingredients",
        "ingredient",
        activeFilters.ingredients,
      ),
    [filteredRecipes, activeFilters.ingredients],
  );

  return (
    <div className="flex justify-between items-center">
      <div className="w-2/3">
        <div className="flex gap-8 mb-6">
          <FilterItem
            title="Ingrédients"
            category="ingredients"
            values={availableIngredients}
          />
          <FilterItem
            title="Appareils"
            category="appliance"
            values={availableAppliances}
          />
          <FilterItem
            title="Ustensiles"
            category="ustensils"
            values={availableUstensils}
          />
        </div>
        <div className="flex gap-4">
          <ActiveFilterList category="all" />
        </div>
      </div>
      <div className="text-xl font-bold">
        {filteredRecipes.length} recette
        {filteredRecipes.length > 1 ? "s" : ""}
      </div>
    </div>
  );
}

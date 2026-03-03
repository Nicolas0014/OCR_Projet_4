"use client";
// Hooks
import { useMemo, useState } from "react";

// Icons
import { X } from "lucide-react";

// Datas
import recipes from "@/app/data/recipes.json";

// Utils
import { getUniqueSortedValues } from "@/app/utils/getUniqueSortedValues";
import { filterRecipes } from "@/app/utils/filterRecipes";

// Types
import { Filters, Recipe } from "@/app/types";
import RecipeCard from "../Recipes/RecipeCard/RecipeCard";

export default function Filters() {
  const [activeFilters, setActiveFilters] = useState<Filters>({
    ingredients: [],
    ustensils: [],
    appliance: [],
  });
  const filteredRecipes = useMemo(
    () => filterRecipes(recipes, activeFilters),
    [recipes, activeFilters],
  );

  // Availables options for filters
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

  // Handlers
  const handleAddFilter = (value: string) => {
    if (!value) return;

    // Déterminer la catégorie du filtre (ingrédient, ustensile ou appareil)
    let category: keyof Filters | null = null;
    if (availableIngredients.includes(value)) category = "ingredients";
    else if (availableUstensils.includes(value)) category = "ustensils";
    else if (availableAppliances.includes(value)) category = "appliance";

    if (category) {
      setActiveFilters((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }));
    }
  };
  const handleRemoveFilter = (category: keyof Filters, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((v) => v !== value),
    }));
  };

  // Sub-components
  function FilterItem({ title, values }: { title: string; values: string[] }) {
    return (
      <div className="w-full bg-white rounded-lg">
        <select
          className="w-full p-4 rounded-lg"
          onChange={(e) => handleAddFilter(e.target.value)}
        >
          <option value="">{title}</option>
          {values.map((item, index) => (
            <option key={index} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </option>
          ))}
        </select>
      </div>
    );
  }
  function ActiveFilterItem({
    category,
    filter,
  }: {
    category: keyof Filters;
    filter: string;
  }) {
    return (
      <div className="flex justify-between items-center gap-4 p-4 bg-primary rounded-lg">
        <p>{filter.charAt(0).toUpperCase() + filter.slice(1)}</p>
        <X
          className="cursor-pointer"
          width={16}
          height={16}
          onClick={() => handleRemoveFilter(category, filter)}
        />
      </div>
    );
  }

  return (
    <section className="py-16 space-y-8 max-w-customMax">
      <div className="flex justify-between items-center">
        <div className="w-2/3">
          <div className="flex gap-8 mb-6">
            <FilterItem title="Ingrédients" values={availableIngredients} />
            <FilterItem title="Appareils" values={availableAppliances} />
            <FilterItem title="Ustensiles" values={availableUstensils} />
          </div>
          {Object.values(activeFilters).some((values) => values.length > 0) && (
            <div className="flex flex-wrap items-center gap-4">
              {Object.entries(activeFilters).map(([category, values]) =>
                values.map((value, index) => (
                  <ActiveFilterItem
                    key={`${category}-${index}`}
                    category={category as keyof Filters}
                    filter={value}
                  />
                )),
              )}
            </div>
          )}
        </div>
        <div className="text-xl font-bold">
          {filteredRecipes.length} recette
          {filteredRecipes.length > 1 ? "s" : ""}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>
    </section>
  );
}

"use client";

// Hooks
import { createContext, useContext, useEffect, useState } from "react";

// Types
import { Filters, Recipe } from "../types";

// Data
import recipes from "@/app/data/recipes.json";

// Utils
import { globalRecipesFilter } from "@/app/utils/globalRecipesFilter";

type FilteredRecipesContextType = {
  filteredRecipes: Recipe[];
  setFilteredRecipes: (recipes: Recipe[]) => void;
  activeFilters: Filters;
  setActiveFilters: (filters: Filters) => void;
};

const FilteredRecipesContext = createContext<
  FilteredRecipesContextType | undefined
>(undefined);

export function FilteredRecipesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  const [activeFilters, setActiveFilters] = useState<Filters>({
    searchQuery: "",
    ingredients: [],
    ustensils: [],
    appliance: [],
  });

  useEffect(() => {
    const results = globalRecipesFilter({ activeFilters });
    setFilteredRecipes(results);
  }, [activeFilters]);

  return (
    <FilteredRecipesContext.Provider
      value={{
        filteredRecipes,
        setFilteredRecipes,
        activeFilters,
        setActiveFilters,
      }}
    >
      {children}
    </FilteredRecipesContext.Provider>
  );
}

export function useFilteredRecipes() {
  const context = useContext(FilteredRecipesContext);
  if (!context) {
    throw new Error(
      "useFilteredRecipes must be used within a FilteredRecipesProvider",
    );
  }
  return context;
}

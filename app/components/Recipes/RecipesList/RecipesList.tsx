"use client";

// Contexts
import { useFilteredRecipes } from "@/app/contexts/FilteredRecipesContext";

// Components
import RecipeCard from "../RecipeCard/RecipeCard";

// Types
import { Recipe } from "@/app/types";

export default function RecipesList() {
  const { filteredRecipes } = useFilteredRecipes();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredRecipes.map((recipe: Recipe) => (
        <RecipeCard key={recipe.id} {...recipe} />
      ))}
    </div>
  );
}

"use client";

// Hooks
import { useState } from "react";

// Icons
import { Search } from "lucide-react";

// Providers
import { useFilteredRecipes } from "@/app/contexts/FilteredRecipesContext";

export default function ManualSearch() {
  const [query, setQuery] = useState("");
  const { setActiveFilters } = useFilteredRecipes();

  const handleManualSearch = (query: string) => {
    setQuery(query);
    // if (query.length < 3) return;

    setActiveFilters((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  };

  return (
    <div className="w-full mt-8 flex items-center p-4 bg-white rounded-lg">
      <input
        className="flex-1 px-4 focus:outline-none"
        placeholder="Rechercher une recette, un ingrédient, ..."
        value={query}
        onChange={(e) => handleManualSearch(e.target.value)}
      />
      <button className="bg-background-dark p-3 rounded-xl">
        <Search className="text-white" width={32} height={32} />
      </button>
    </div>
  );
}

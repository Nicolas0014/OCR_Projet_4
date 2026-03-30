"use client";
// Icons
import { X } from "lucide-react";

// Types
import { FilterTagsKeys } from "@/app/types";

// Contexts
import { useFilteredRecipes } from "@/app/contexts/FilteredRecipesContext";

export default function ActiveFilterItem({
  category,
  filter,
}: {
  category: FilterTagsKeys;
  filter: string;
}) {
  const { setActiveFilters } = useFilteredRecipes();

  const handleRemoveFilter = (category: FilterTagsKeys, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((v) => v !== value),
    }));
  };

  return (
    <div className="group transition-all duration-100 flex justify-between items-center gap-4 p-4 bg-primary rounded-lg hover:font-bold">
      <p>{filter.charAt(0).toUpperCase() + filter.slice(1)}</p>
      <div className="group-hover:p-0.5 group-hover:bg-black group-hover:rounded-full">
        <X
          className="cursor-pointer group-hover:text-white"
          width={16}
          height={16}
          onClick={() => handleRemoveFilter(category, filter)}
        />
      </div>
    </div>
  );
}

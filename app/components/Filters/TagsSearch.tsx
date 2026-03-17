"use client";
// Hooks
import { useMemo, useState } from "react";

// Icons
import { ChevronDown, X } from "lucide-react";

// Contexts
import { useFilteredRecipes } from "@/app/contexts/FilteredRecipesContext";

// Utils
import { getUniqueSortedValues } from "@/app/utils/getUniqueSortedValues";

// Types
import { Filters } from "@/app/types";
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

  // Handlers
  const handleAddFilter = (value: string) => {
    if (!value) return;

    // Déterminer la catégorie du filtre (ingrédient, ustensile ou appareil)
    let category: FilterTagsKeys | null = null;
    if (availableIngredients.includes(value)) category = "ingredients";
    else if (availableUstensils.includes(value)) category = "ustensils";
    else if (availableAppliances.includes(value)) category = "appliance";

    if (category) {
      setActiveFilters((prev) => {
        if (prev[category].includes(value)) return prev;

        return {
          ...prev,
          [category]: [...prev[category], value],
        };
      });
    }
  };
  const handleRemoveFilter = (category: FilterTagsKeys, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((v) => v !== value),
    }));
  };

  // Sub-components
  function FilterItem({ title, values }: { title: string; values: string[] }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredValues = useMemo(() => {
      const normalized = search.toLowerCase().trim();

      return values.filter((v) => v.toLowerCase().includes(normalized));
    }, [search, values]);

    return (
      <div className="relative w-full">
        {/* Trigger */}
        <div
          className="w-full flex items-center justify-between p-4 bg-white rounded-lg cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          {title}
          <ChevronDown />
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg p-4 flex flex-col gap-3">
            {/* 🔎 Search */}
            <input
              className="w-full p-2 border rounded"
              placeholder={`Rechercher ${title.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* 🟡 Active filters */}
            <ActiveFilterList />

            {/* 📋 Options */}
            <div className="max-h-48 overflow-y-auto flex flex-col gap-2">
              {filteredValues.length > 0 ? (
                filteredValues.map((item, index) => (
                  <div
                    key={index}
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                    onClick={() => {
                      handleAddFilter(item);
                      setSearch("");
                    }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Aucun résultat</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  function ActiveFilterItem({
    category,
    filter,
  }: {
    category: FilterTagsKeys;
    filter: string;
  }) {
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

  function ActiveFilterList() {
    return (
      <>
        {Object.entries(activeFilters)
          .filter(([key]) => key !== "searchQuery")
          .flatMap(([category, values]) =>
            (values as string[]).map((value, index) => (
              <ActiveFilterItem
                key={`${category}-${index}`}
                category={category as FilterTagsKeys}
                filter={value}
              />
            )),
          )}
      </>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <div className="w-2/3">
        <div className="flex gap-8 mb-6">
          <FilterItem title="Ingrédients" values={availableIngredients} />
          <FilterItem title="Appareils" values={availableAppliances} />
          <FilterItem title="Ustensiles" values={availableUstensils} />
        </div>
        <div className="flex gap-4">
          <ActiveFilterList />
        </div>
      </div>
      <div className="text-xl font-bold">
        {filteredRecipes.length} recette
        {filteredRecipes.length > 1 ? "s" : ""}
      </div>
    </div>
  );
}

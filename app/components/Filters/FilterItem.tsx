"use client";
// Hooks
import { useMemo, useState, useEffect, useRef } from "react";

// Icons
import { ChevronDown } from "lucide-react";

// Types
import { FilterTagsKeys } from "@/app/types";

// Contexts
import { useFilteredRecipes } from "@/app/contexts/FilteredRecipesContext";

// Components
import ActiveFilterList from "@/app/components/Filters/ActiveFilterList";

export default function FilterItem({
  title,
  values,
  category,
}: {
  title: string;
  values: string[];
  category: FilterTagsKeys | "all";
}) {
  const { setActiveFilters } = useFilteredRecipes();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Fermeture des dropdowns si clic en dehors
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredValues = useMemo(() => {
    const normalized = search.toLowerCase().trim();

    return values.filter((v) => v.toLowerCase().includes(normalized));
  }, [search, values]);

  const handleAddFilter = (value: string) => {
    if (!value) return;

    // Ajout du filtre sélectionné dans le contexte global
    if (category !== "all") {
      setActiveFilters((prev) => {
        if (prev[category].includes(value)) return prev; // On évite les doublons

        return {
          ...prev,
          [category]: [...prev[category], value],
        };
      });
    }
  };

  return (
    <div ref={ref} className="relative w-full">
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
          <ActiveFilterList category={category} />

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

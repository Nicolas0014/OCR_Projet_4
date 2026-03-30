// Components
import ActiveFilterItem from "./ActiveFilterItem";

// Contexts
import { useFilteredRecipes } from "@/app/contexts/FilteredRecipesContext";

// Types
import { FilterTagsKeys } from "@/app/types";

export default function ActiveFilterList({
  category,
}: {
  category: FilterTagsKeys | "all";
}) {
  const { activeFilters } = useFilteredRecipes();

  let displayedFilters: { category: FilterTagsKeys; name: string }[] = [];

  // On reconstruit le tableau de filtres en un tableau d'objets catégorie + nom
  if (category === "all") {
    displayedFilters = Object.entries(activeFilters)
      .filter(([category]) => category !== "searchQuery") // On retire la searchQuery
      .flatMap(([category, filters]) =>
        filters.map((item: string) => ({
          category,
          name: item,
        })),
      );
  } else {
    // Uniquement la catégorie en cours
    displayedFilters = activeFilters[category].map((name) => ({
      category,
      name,
    }));
  }

  return (
    displayedFilters.length > 0 && (
      <>
        {displayedFilters.map((item, index) => (
          <ActiveFilterItem
            key={`${category}-${index}`}
            category={item.category}
            filter={item.name}
          />
        ))}
      </>
    )
  );
}

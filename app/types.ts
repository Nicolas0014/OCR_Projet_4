interface Recipe {
  id: number;
  image: string;
  name: string;
  slug: string;
  servings: number;
  ingredients: Ingredient[];
  time: number;
  description: string;
  appliance: string;
  ustensils: string[];
}

interface Ingredient {
  ingredient: string;
  quantity?: number | string;
  unit?: string;
}

interface Filters {
  searchQuery: string;
  ingredients: string[];
  ustensils: string[];
  appliance: string[];
}

export type { Recipe, Ingredient, Filters };

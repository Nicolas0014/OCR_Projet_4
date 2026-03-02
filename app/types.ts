interface Recipe {
  id: number,
  image: string,
  name: string,
  slug: string,
  servings: number,
  ingredients: {
      ingredient: string,
      quantity?: number | string,
      unit?: string
  }[],
  time: number,
  description: string,
  appliance: string,
  ustensils: string[]
}

export type { Recipe };
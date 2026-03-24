// Components
import Link from "next/link";
import RecipeStep from "../RecipeStep/RecipeStep";
import IngredientArrayStep from "../RecipeStep/Scenarios/IngredientArrayStep";
import ArrayStep from "../RecipeStep/Scenarios/ArrayStep";
import Image from "next/image";

// Types
import { Recipe } from "@/app/types";

export default function CardRecipe(recipe: Recipe) {
  return (
    <Link
      href={`/recette/${recipe.slug}`}
      className="bg-white rounded-xl shadow-md overflow-hidden recipeCard"
    >
      <Image
        src={`/images/recipes/${recipe.image}`}
        alt={recipe.name}
        width={400}
        height={192}
        className="w-full h-48 object-cover"
      />
      <div className="p-8 space-y-8">
        <h2 className="recipe-title">{recipe.name}</h2>
        <RecipeStep title="Recette">
          <ArrayStep content={recipe.description} isTruncated={true} />
        </RecipeStep>
        <RecipeStep title="Ingrédients">
          <IngredientArrayStep content={recipe.ingredients} />
        </RecipeStep>
      </div>
    </Link>
  );
}

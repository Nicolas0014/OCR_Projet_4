// Components
import Hero from "@/app/components/Hero/Hero";
import Image from "next/image";
import RecipeStep from "@/app/components/Recipes/RecipeStep/RecipeStep";
import ArrayStep from "@/app/components/Recipes/RecipeStep/Scenarios/ArrayStep";
import IngredientArrayStep from "@/app/components/Recipes/RecipeStep/Scenarios/IngredientArrayStep";

// Datas
import recipes from "@/app/data/recipes.json";

// Navigation
import { notFound } from "next/navigation";

export default async function RecipePage({ params }: any) {
  const { slug } = await params;

  const currentRecipe = recipes.find((recipe) => recipe.slug === slug);

  if (!currentRecipe) {
    notFound();
  }

  return (
    <>
      <Hero bgImage="/images/hero-bg.jpg" />
      <div className="py-16 max-w-customMax m-auto flex gap-16">
        <div className="relative w-[55%]">
          <Image
            src={`/images/recipes/${currentRecipe.image}`}
            alt={currentRecipe.name}
            fill
            className="object-cover max-h-150 rounded-xl"
          />
        </div>
        <div className="flex-1 space-y-8">
          <h1 className="recipe-title">{currentRecipe.name}</h1>
          <RecipeStep title="Temps de préparation">
            <ArrayStep content={`${currentRecipe.time}min`} isAccented={true} />
          </RecipeStep>
          <RecipeStep title="Ingrédients">
            <IngredientArrayStep content={currentRecipe.ingredients} />
          </RecipeStep>
          <RecipeStep title="Ustensiles nécessaires">
            <ArrayStep content={currentRecipe.ustensils} />
          </RecipeStep>
          <RecipeStep title="Appareils nécessaires">
            <ArrayStep content={currentRecipe.appliance} />
          </RecipeStep>
          <RecipeStep title="Recette">
            <ArrayStep content={currentRecipe.description} />
          </RecipeStep>
        </div>
      </div>
    </>
  );
}

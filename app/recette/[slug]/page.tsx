// Components
import Hero from "@/app/components/Hero/Hero";
import Image from "next/image";

// Datas
import recipes from "@/app/data/recipes.json";
import { notFound } from "next/navigation";
import RecipeStep from "@/app/components/Recipes/RecipeStep/RecipeStep";

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
          <RecipeStep
            title="Temps de préparation"
            content={`${currentRecipe.time}min`}
            isAccented={true}
          />
          <RecipeStep title="Ingrédients" content={currentRecipe.ingredients} />
          <RecipeStep
            title="Ustensiles nécessaires"
            content={currentRecipe.ustensils}
          />
          <RecipeStep
            title="Appareils nécessaires"
            content={currentRecipe.appliance}
          />
          <RecipeStep title="Recette" content={currentRecipe.description} />
        </div>
      </div>
    </>
  );
}

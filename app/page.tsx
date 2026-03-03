// Components
import Hero from "./components/Hero/Hero";
import RecipeCard from "./components/Recipes/RecipeCard/RecipeCard";
import Filters from "./components/Filters/Filters";

// Datas
import recipes from "./data/recipes.json";

// Types
import { Recipe } from "./types";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero bgImage="/images/hero-bg.jpg">
        <h1 className="accent-title">
          Découvrez nos recettes <br />
          du quotidien, simples et délicieuses
        </h1>
        <div className="w-full mt-8 flex items-center p-4 bg-white rounded-lg">
          <input
            className="flex-1 px-4 focus:outline-none"
            placeholder="Rechercher une recette, un ingrédient, ..."
          />
          <button className="bg-background p-3 rounded-xl">
            <Search className="text-white" width={32} height={32} />
          </button>
        </div>
      </Hero>

      <Filters />
    </>
  );
}

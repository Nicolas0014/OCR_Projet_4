// Components
import Hero from "./components/Hero/Hero";
import CardRecipe from "./components/CardRecipe/CardRecipe";

// Datas
import recipes from "./data/recipes.json";

// Types
import { Recipe } from "./types";

export default function Home() {
  return (
    <>
      <Hero bgImage="/images/hero-bg.jpg" />

      <section className="my-16 max-w-customMax">
        <div className="m-16">Filtres</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe : Recipe) => (
            <CardRecipe key={recipe.id} {...recipe} />
          ))}
        </div>
      </section>
    </>
  );
}

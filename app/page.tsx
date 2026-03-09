// Components
import Hero from "./components/Hero/Hero";
import Filters from "./components/Filters/Filters";
import ManualSearch from "./components/Filters/ManualSearch";
import RecipesList from "./components/Recipes/RecipesList/RecipesList";

export default function Home() {
  return (
    <>
      <Hero bgImage="/images/hero-bg.jpg">
        <h1 className="accent-title">
          Découvrez nos recettes <br />
          du quotidien, simples et délicieuses
        </h1>
        <ManualSearch />
      </Hero>

      <section className="py-16 space-y-8 max-w-customMax">
        <Filters />
        <RecipesList />
      </section>
    </>
  );
}

import Hero from "./components/Hero/Hero";

export default function NotFound() {
  return (
    <Hero bgImage="/images/hero-bg.jpg" opacity={0.6}>
      <h1 className="text-primary uppercase text-center text-4xl md:text-6xl font-bold font-display leading-normal">
        404 :(
      </h1>
      <h2 className="text-white text-center text-xl md:text-2xl mt-4">
        La page que vous demandez est introuvable.
      </h2>
    </Hero>
  );
}

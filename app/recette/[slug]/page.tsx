import Hero from "@/app/components/Hero/Hero";

export default function RecipePage() {
    return (
        <>
            <Hero bgImage="/images/hero-bg.jpg" isSearchForm={false} />
            <div className="my-16 max-w-customMax m-auto">
                <h1 className="text-3xl font-bold">Page de la recette</h1>
            </div>
        </>
    )
}
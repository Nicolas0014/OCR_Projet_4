import { Search } from "lucide-react";

export default function Hero({bgImage, isSearchForm = true} : { bgImage: string, isSearchForm?: boolean }) {

    return (
        <section className={`relative ${isSearchForm ? "h-screen" : "h-44"} w-full`}>
            <img src={bgImage} alt="Hero Image" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-black"></div>
            {isSearchForm && (
                <div className="absolute inset-0 flex flex-col items-center justify-center max-w-customMax">
                    <h1 className="text-primary uppercase text-center text-4xl md:text-6xl font-bold font-display leading-normal">Découvrez nos recettes <br/>du quotidien, simples et délicieuses</h1>
                        <div className="w-full mt-8 flex items-center p-4 bg-white rounded-lg">
                            <input className="flex-1 px-4 focus:outline-none" placeholder="Rechercher une recette, un ingrédient, ..." />
                            <button className="bg-background p-3 rounded-xl">
                                <Search className="text-white" width={32} height={32}/>
                            </button>
                        </div>
                </div>
            )}
        </section>
    )
}
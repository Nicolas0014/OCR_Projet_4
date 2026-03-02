// Components
import Link from "next/link";

// Types
import { Recipe } from "../../types";

export default function CardRecipe(recipe: Recipe) {
    return (
        <Link href={`/recette/${recipe.slug}`} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src={`/images/recipes/${recipe.image}`} alt={recipe.name} className="w-full h-48 object-cover" />
            <div className="p-6 space-y-8">
                <h2 className="text-lg font-semibold font-display">{recipe.name}</h2>
                <div>
                    <h3 className="font-bold text-gray text-xs uppercase mb-4">Recette</h3>
                    <p className="text-sm mb-4 h-20 overflow-hidden">{recipe.description}</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray text-xs uppercase mb-4">Ingrédients</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        {recipe.ingredients.map((element, index) => (
                            <div key={index}>
                                <p className="font-semibold">{element.ingredient}</p>
                                <p className="text-gray">{element.quantity}{element.unit ? ` ${element.unit}` : ""}</p>
                            </div>
                        ))}
                    </div>
                </div>
               
            </div>
        </Link>
    )
}
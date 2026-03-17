// Types
import { Ingredient } from "@/app/types";

export default function IngredientArrayStep({
  content,
}: {
  content: Ingredient[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      {content.map((element, index) => (
        <div key={index}>
          <p className="recipe-text font-semibold">{element.ingredient}</p>
          <p className="text-gray">
            {element.quantity ?? 1}
            {element.unit ? ` ${element.unit}` : ""}
          </p>
        </div>
      ))}
    </div>
  );
}

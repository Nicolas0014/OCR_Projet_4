import { Ingredient } from "@/app/types";

function isIngredientArray(
  content: string | Ingredient[] | string[],
): content is Ingredient[] {
  return (
    Array.isArray(content) &&
    content.length > 0 &&
    typeof content[0] === "object" &&
    "ingredient" in content[0]
  );
}

export default function RecipeStep({
  title,
  content,
  isAccented = false,
  isTruncated = false,
}: {
  title: string;
  content: string | Ingredient[] | string[];
  isAccented?: boolean;
  isTruncated?: boolean;
}) {
  return (
    <div>
      <h3 className="recipe-subtitle">{title}</h3>
      {Array.isArray(content) ? (
        <div className="grid grid-cols-2 gap-4 text-sm">
          {isIngredientArray(content)
            ? content.map((element, index) => (
                <div key={index}>
                  <p className="recipe-text font-semibold">
                    {element.ingredient}
                  </p>
                  <p className="text-gray">
                    {element.quantity ?? 1}
                    {element.unit ? ` ${element.unit}` : ""}
                  </p>
                </div>
              ))
            : content.map((element, index) => (
                <p
                  key={index}
                  className={`recipe-text ${isAccented ? " bg-primary" : ""}`}
                >
                  {element.charAt(0).toUpperCase() + element.slice(1)}
                </p>
              ))}
        </div>
      ) : (
        <p
          className={`recipe-text ${isTruncated ? "h-20 overflow-hidden" : "h-auto"} ${isAccented ? "w-fit p-2 rounded-lg bg-primary" : ""}`}
        >
          {content}
        </p>
      )}
    </div>
  );
}

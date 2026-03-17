export default function RecipeStep({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="recipe-subtitle">{title}</h3>
      {children}
    </div>
  );
}

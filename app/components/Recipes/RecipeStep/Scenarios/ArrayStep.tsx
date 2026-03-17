export default function ArrayStep({
  content,
  isTruncated = false,
  isAccented = false,
}: {
  content: string | string[];
  isTruncated?: boolean;
  isAccented?: boolean;
}) {
  return (
    <>
      {Array.isArray(content) ? (
        <div className="grid grid-cols-2 gap-4 text-sm">
          {content.map((element, index) => (
            <p
              key={index}
              className={`recipe-text ${isAccented ? "bg-primary" : ""}`}
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
    </>
  );
}

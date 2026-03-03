export default function Hero({
  bgImage,
  opacity = 0.3,
  children,
}: {
  bgImage: string;
  opacity?: number;
  children?: React.ReactNode;
}) {
  return (
    <section className={`relative ${children ? "h-screen" : "h-50"} w-full`}>
      <img
        src={bgImage}
        alt="Hero Image"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black" style={{ opacity }}></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center max-w-customMax">
        {children}
      </div>
    </section>
  );
}

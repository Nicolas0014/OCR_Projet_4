import type { Metadata } from "next";
import { Anton, Manrope } from "next/font/google";
import "./globals.css";

// Layout
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Providers
import { FilteredRecipesProvider } from "./contexts/FilteredRecipesContext";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Petits Plats",
  description:
    "Découvrez nos délicieuses recettes de cuisine pour tous les goûts et toutes les occasions. Que vous soyez à la recherche d'idées pour le dîner, d'entrées savoureuses ou de desserts gourmands, notre collection de recettes vous inspirera à créer des plats délicieux et mémorables. Explorez notre sélection variée et trouvez la recette parfaite pour votre prochain repas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${anton.variable} ${manrope.variable} antialiased bg-background-light`}
      >
        <FilteredRecipesProvider>
          <Header />
          {children}
          <Footer />
        </FilteredRecipesProvider>
      </body>
    </html>
  );
}

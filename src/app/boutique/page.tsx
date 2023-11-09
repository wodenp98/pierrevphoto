import Image from "next/image";
import Link from "next/link";
import { getArticles } from "../../utils/prisma/boutique.query";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pierre.V | Boutique",
  description:
    "Explorez la boutique de Pierre Vigneron, où vous trouverez une sélection de superbes articles. Découvrez des produits uniques et inspirants, parfaits pour les amoureux de la photographie. Parcourez notre collection et trouvez l'article idéal pour enrichir votre passion pour la photographie.",
};

export default async function Page() {
  const articles = await getArticles();

  return (
    <main className="flex 1">
      <div className="container relative">
        <h1 className="flex justify-center my-6 text-4xl uppercase">
          Boutique
        </h1>
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {articles.map((article) => (
              <Link href={`/boutique/${article.id}`} key={article.id}>
                <div className="relative h-[500px]">
                  <Image
                    alt={article.name}
                    src={article.imageUrl}
                    fill
                    sizes="(min-width: 808px) 50vw, 100vw"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

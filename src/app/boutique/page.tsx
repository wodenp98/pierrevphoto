import Image from "next/image";
import Link from "next/link";
import { getArticles } from "./boutique.query";

export default async function Page() {
  const articles = await getArticles();

  return (
    <main>
      <ul className="flex ml-6">
        <li className="text-gray-300">Accueil</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>Boutique</li>
      </ul>

      <h1 className="ml-6 mt-6 text-4xl">Boutique</h1>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {articles.map((article) => (
            <Link href={`/boutique/${article.id}`} key={article.id}>
              <div style={{ position: "relative", height: "500px" }}>
                <Image
                  alt="Mountains"
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
    </main>
  );
}

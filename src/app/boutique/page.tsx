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
      <section className="flex flex-col items-center mt-8">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 w-11/12">
          {articles.map((article) => (
            <Link href={`/boutique/${article.id}`} key={article.id}>
              <Image
                src={article.imageUrl}
                alt={article.name}
                width={1080}
                height={1080}
                className="w-full mb-6 object-cover"
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

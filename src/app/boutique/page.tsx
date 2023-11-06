import Image from "next/image";
import Link from "next/link";
import { getArticles } from "./boutique.query";

export default async function Page() {
  const articles = await getArticles();

  return (
    <main className="flex 1">
      <div className="container relative">
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {articles.map((article) => (
              <Link href={`/boutique/${article.id}`} key={article.id}>
                <div className="relative h-[500px]">
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
      </div>
    </main>
  );
}

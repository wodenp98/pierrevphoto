import { AccordionShop } from "@/components/ArticleIdComponents/ShopAccordion";
import ShopForm from "@/components/ArticleIdComponents/ShopForm";
import { getArticleById } from "./boutiqueId.query";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params: { id } }: Props) {
  const article = await getArticleById(id);

  return (
    <main>
      <ul className="flex ml-6">
        <li className="text-gray-300">Accueil</li>
        <li className="text-gray-300 mx-2">-</li>
        <li className="text-gray-300">Boutique</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>{article.name}</li>
      </ul>
      <section className="w-11/12 mt-6 mx-auto">
        <div className="flex flex-col  items-center lg:items-start  lg:max-h-[90vh] lg:flex-row">
          <div className="lg:w-1/2  flex md:justify-center">
            <Image
              key={article.name}
              src={article.imageUrl!}
              alt={article.name!}
              width={800}
              height={800}
              className={cn(
                "object-contain h-full w-full md:max-h-[80vh]",
                article.aspectRatio === "portrait"
                  ? "aspect-[3/4]"
                  : "aspect-[16/9]"
              )}
            />
          </div>

          <div className="flex flex-col  w-full md:w-10/12 justify-center mt-6 lg:w-1/2 lg:ml-6 ">
            <h1 className="text-3xl">{article.name}</h1>
            <p className="text-sm mt-6 text-gray-500">{article.description}</p>
            <ShopForm article={article} />
          </div>
        </div>

        <div className="flex items-center justify-center mt-6">
          <AccordionShop />
        </div>
      </section>
    </main>
  );
}

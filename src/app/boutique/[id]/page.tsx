import { AccordionShop } from "@/components/ArticleIdComponents/ShopAccordion";
import ShopForm from "@/components/ArticleIdComponents/ShopForm";
import { getArticleById } from "./boutiqueId.query";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Loading from "./loading";

interface Props {
  id: string;
}

export default async function Page({ params: { id } }: { params: Props }) {
  const article = await getArticleById(id);
  // faire loading comme le component et flex

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
        {/* <div className="flex flex-col  items-center ">
          <Image
            key={article.name}
            src={article.imageUrl}
            alt={article.name}
            quality={100}
            width={1080}
            height={1080}
            className={cn(
              "object-contain h-full w-full md:h-[90vh] ",
              article.aspectRatio === "portrait"
                ? "aspect-[3/4]"
                : "aspect-[16/9]"
            )}
          />

          <div className="flex flex-col w-full md:w-10/12 justify-center mt-6 lg:w-1/2 lg:ml-6 ">
            <h1 className="text-3xl">{article.name}</h1>
            <p className="text-sm mt-6">{article.description}</p>
            <ShopForm article={article} />
          </div>
        </div> */}

        {article.aspectRatio === "portrait" ? (
          <div className="flex flex-col  items-center">
            <Image
              key={article.name}
              src={article.imageUrl}
              alt={article.name}
              quality={100}
              width={1080}
              height={1080}
              className="object-contain h-full w-full md:h-[90vh] aspect-[3/4]"
            />

            <div className="flex flex-col w-full md:w-10/12 xl:w-1/2 md:flex-row  justify-center mt-6  lg:ml-6 ">
              <div className="md:w-1/2">
                <h1 className="text-3xl">{article.name}</h1>
                <p className="text-sm mt-6">{article.description}</p>
              </div>
              <ShopForm article={article} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col  items-center">
            <Image
              key={article.name}
              src={article.imageUrl}
              alt={article.name}
              quality={100}
              width={1080}
              height={1080}
            />

            <div className="flex flex-col w-full md:w-10/12 xl:w-3/5 md:flex-row  justify-center mt-6 lg:ml-6 ">
              <div className="md:w-1/2">
                <h1 className="text-3xl">{article.name}</h1>
                <p className="text-sm mt-6">{article.description}</p>
              </div>

              <ShopForm article={article} />
            </div>
          </div>
        )}

        <div className="flex items-center justify-center mt-6">
          <AccordionShop />
        </div>
      </section>
    </main>
  );
}

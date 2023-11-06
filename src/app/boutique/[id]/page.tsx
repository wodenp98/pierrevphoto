import { AccordionShop } from "@/components/BoutiqueIdComponents/ShopAccordion";
import { getArticleById } from "../../../utils/prisma/boutiqueId.query";
import Image from "next/image";
import ShopFormPaysage from "@/components/BoutiqueIdComponents/ShopFormPaysage";
import ShopFormPortrait from "@/components/BoutiqueIdComponents/ShopFormPortrait";

interface Props {
  id: string;
}

export default async function Page({ params: { id } }: { params: Props }) {
  const article = await getArticleById(id);

  return (
    <main className="flex 1">
      <div className="container relative">
        <section className="w-11/12 mt-6 mx-auto">
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
                <ShopFormPortrait article={article} />
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

                <ShopFormPaysage article={article} />
              </div>
            </div>
          )}

          <div className="flex items-center justify-center mt-6">
            <AccordionShop />
          </div>
        </section>
      </div>
    </main>
  );
}

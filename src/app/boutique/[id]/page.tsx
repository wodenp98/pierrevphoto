import { AccordionShop } from "@/components/BoutiqueIdComponents/ShopAccordion";
import { getArticleById } from "../../../utils/prisma/boutiqueId.query";
import Image from "next/image";
import ShopFormPaysage from "@/components/BoutiqueIdComponents/ShopFormPaysage";
import ShopFormPortrait from "@/components/BoutiqueIdComponents/ShopFormPortrait";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Info, CalendarIcon } from "lucide-react";

interface Props {
  id: string;
}

export default async function Page({ params: { id } }: { params: Props }) {
  const article = await getArticleById(id);

  return (
    <main className="flex flex-col items-center">
      <div className="w-11/12">
        <section className="w-full mt-6">
          {article.aspectRatio === "portrait" ? (
            <div className="flex flex-col  items-start md:flex-row">
              <Image
                key={article.name}
                src={article.imageUrl}
                alt={article.name}
                quality={100}
                width={1080}
                height={1080}
                className="object-contain h-full w-full md:h-[85vh] aspect-[3/4]"
              />

              <div className="flex flex-col w-full h-full md:w-10/12 md:flex-col lg:ml-6 ">
                <div className="">
                  <h1 className="text-3xl">{article.name}</h1>
                  <p className="text-sm mt-6">{article.description}</p>
                  <HoverCard>
                    <HoverCardTrigger asChild className="pl-0 mt-4">
                      <Button variant="link" className="flex items-center">
                        <Info className="mr-2" />
                        Informations livraisons
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">
                            Informations livraisons
                          </h4>
                          <p className="text-sm">
                            Toutes nos livraisons sont envoyées en point relais.
                            Un point relais vous sera demandé une fois votre
                            commande passée.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>

                <ShopFormPortrait article={article} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-start md:flex-row">
              <Image
                key={article.name}
                src={article.imageUrl}
                alt={article.name}
                quality={100}
                width={1080}
                height={1080}
              />

              <div className="flex flex-col w-full h-full md:w-10/12 md:flex-col lg:ml-6 ">
                <div className="">
                  <h1 className="text-3xl">{article.name}</h1>
                  <p className="text-sm mt-6">{article.description}</p>
                  <HoverCard>
                    <HoverCardTrigger asChild className="pl-0 mt-4">
                      <Button variant="link" className="flex items-center">
                        <Info className="mr-2" />
                        Informations livraisons
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">
                            Informations livraisons
                          </h4>
                          <p className="text-sm">
                            Toutes nos livraisons sont envoyées en point relais.
                            Un point relais vous sera demandé une fois votre
                            commande passée.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>

                <ShopFormPaysage article={article} />
              </div>
            </div>
          )}

          <div className="flex flex-col items-center justify-center mt-6">
            <div className="flex flex-col items-center mt-6">
              <h2>Impression 100% MADE IN FRANCE</h2>

              <Image
                src="/france.png"
                alt="Drapeau de la France"
                width={50}
                height={50}
              />
            </div>
            <AccordionShop />
          </div>
        </section>
      </div>
    </main>
  );
}

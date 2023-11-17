import { AccordionShop } from "@/components/BoutiqueIdComponents/ShopAccordion";
import Image from "next/image";
import ShopFormPaysage from "@/components/BoutiqueIdComponents/ShopFormPaysage";
import ShopFormPortrait from "@/components/BoutiqueIdComponents/ShopFormPortrait";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";
import Loading from "./loading";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type Article = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  aspectRatio: string;
  price: number;
};

async function getArticleById(id: number) {
  const res = await fetch(`${process.env.BASE_URL}/api/boutique/${id}`);

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as Article;

  return data;
}

export async function generateMetadata({ params }: any) {
  const { name, description, imageUrl } = (await getArticleById(
    params.id
  )) as Article;

  return {
    title: name,
    description: description,
    openGraph: {
      title: name,
      description: description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
    },
    locale: "fr-FR",
    type: "website",
  };
}

export default async function Page({
  params: { id },
}: {
  params: { id: number };
}) {
  const article = await getArticleById(id);

  if (!article) {
    return Loading();
  }

  // format lg et xl + voir l'erreur sur hover card

  return (
    <main className="flex flex-col items-center">
      <div className="w-11/12">
        <section className="w-full mt-6">
          {article.aspectRatio === "portrait" ? (
            <div className="flex flex-col  items-center lg:flex-row lg:items-start">
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
                <div className="mt-4">
                  <h1 className="text-3xl text-center">{article.name}</h1>
                  <p className="text-sm mt-6 text-center">
                    {article.description}
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild className="pl-0 mt-4">
                        <Button variant="link" className="flex items-center">
                          <Info className="mr-2" />
                          Informations livraisons
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">
                              Informations livraisons
                            </h4>
                            <p className="text-sm">
                              Toutes nos livraisons sont envoyées en point
                              relais. Un point relais vous sera demandé une fois
                              votre commande passée.
                            </p>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <ShopFormPortrait article={article} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center lg:flex-row lg:items-start">
              <Image
                key={article.name}
                src={article.imageUrl}
                alt={article.name}
                quality={100}
                width={1080}
                height={1080}
                className="lg:w-3/5"
              />

              <div className="flex flex-col w-full h-full mt-4 md:w-10/12 md:flex-col lg:ml-6 lg:w-1/2">
                <div className="mt-4 sm:mt-0">
                  <h1 className="text-3xl text-center">{article.name}</h1>
                  <p className="text-sm text-center mt-6">
                    {article.description}
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild className="pl-0 mt-4">
                        <Button variant="link" className="flex items-center">
                          <Info className="mr-2" />
                          Informations livraisons
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">
                              Informations livraisons
                            </h4>
                            <p className="text-sm">
                              Toutes nos livraisons sont envoyées en point
                              relais. Un point relais vous sera demandé une fois
                              votre commande passée.
                            </p>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <ShopFormPaysage article={article} />
              </div>
            </div>
          )}

          <div className="flex flex-col items-center justify-center mt-6">
            <div className="flex flex-col items-center mt-6">
              <h2>Impression 100% MADE IN FRANCE</h2>

              <Image
                src="/assets/france.png"
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

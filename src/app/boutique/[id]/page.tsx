import { AccordionShop } from "@/components/BoutiqueIdComponents/ShopAccordion";
import Image from "next/image";
import ShopFormPaysage from "@/components/BoutiqueIdComponents/ShopFormPaysage";
import ShopFormPortrait from "@/components/BoutiqueIdComponents/ShopFormPortrait";
import { Button } from "@/components/ui/button";

import { Info } from "lucide-react";
import Loading from "./loading";
import { z } from "zod";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const ArticleSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string(),
  imagePreview: z.string(),
  description: z.string(),
  aspectRatio: z.string(),
  price: z.number(),
});

type Article = z.infer<typeof ArticleSchema>;

async function getArticleById(id: number) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/boutique/${id}`, {
      method: "GET",
      credentials: "same-origin",
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = ArticleSchema.safeParse(await res.json());

    if (!data.success) {
      return null;
    }

    return data.data;
  } catch (error) {
    return null;
  }
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

  return (
    <main className="flex flex-col items-center mt-20">
      <div className="w-11/12">
        <section className="w-full mt-6">
          {article.aspectRatio === "portrait" ? (
            <div className="flex flex-col  items-center xl:flex-row xl:items-start">
              <Image
                key={article.name}
                src={article.imageUrl}
                alt={article.name}
                quality={100}
                width={1080}
                height={1080}
                className="object-contain h-full w-full md:h-[85vh] aspect-[3/4]"
              />

              <div className="flex flex-col items-center w-full h-full md:w-10/12 xl:ml-6 ">
                <div className="mt-4 lg:mt-0">
                  <h1 className="text-3xl text-center">{article.name}</h1>

                  {/* <Popover>
                    <PopoverTrigger asChild className="pl-0 mt-8">
                      <Button variant="link" className="flex items-center">
                        <Info className="mr-2" />
                        Informations livraisons
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
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
                    </PopoverContent>
                  </Popover> */}
                </div>

                <ShopFormPortrait article={article} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center xl:flex-row xl:items-start">
              <Image
                key={article.name}
                src={article.imageUrl}
                alt={article.name}
                quality={100}
                width={1080}
                height={1080}
                className="lg:w-3/5"
              />

              <div className="flex flex-col w-full h-full items-center mt-4 md:w-10/12 md:flex-col xl:ml-6 xl:w-1/2">
                <div className="mt-4 lg:mt-0">
                  <h1 className="text-3xl text-center">{article.name}</h1>
                  {/* <Popover>
                    <PopoverTrigger asChild className="pl-0 mt-8">
                      <Button variant="link" className="flex items-center">
                        <Info className="mr-2" />
                        Informations livraisons
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
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
                    </PopoverContent>
                  </Popover> */}
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
            <AccordionShop
              imagePreview={article.imagePreview}
              description={article.description}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

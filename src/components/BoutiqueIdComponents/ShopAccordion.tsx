/* eslint-disable react/no-unescaped-entities */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export const AccordionShop = ({
  imagePreview,
  description,
}: {
  imagePreview: string;
  description: string;
}) => {
  return (
    <Accordion type="single" collapsible className="w-10/12 mt-6 lg:w-1/2">
      <AccordionItem value="item-1">
        <AccordionTrigger>RENDU</AccordionTrigger>
        <AccordionContent>
          <Image
            src={imagePreview}
            alt="rendu de la photo dans un décor"
            width={1080}
            height={1080}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>DESCRIPTION</AccordionTrigger>
        <AccordionContent>{description}</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>INFORMATION LIVRAISON</AccordionTrigger>
        <AccordionContent>
          Toutes nos livraisons sont envoyées en point relais. Un point relais
          vous sera demandé une fois votre commande passée.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>LA SUBLIGAPHIE</AccordionTrigger>
        <AccordionContent>
          Tirage haut de gamme direct sur un support rigide en aluminium. Cela
          donne un effet de profondeur et de réalisme à la photo. C'est assez
          époustouflant. Crochet intégré.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>FINE ART</AccordionTrigger>
        <AccordionContent>
          Impression sur un papier de grande qualité. Rendu parfait pour
          exprimer les perceptions et les émotions. Cadre non fourni. Crochet
          non intégré.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>ALU DIBOND</AccordionTrigger>
        <AccordionContent>
          Impression Fine Art fixée sur une plaque d'aluminium avec crochet
          intégré. Idéal pour afficher votre photo sans cadre.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

/* eslint-disable react/no-unescaped-entities */
import CustomerDetails from "@/components/CommandesDetails/CustomerDetails";
import { stripe } from "@/utils/stripe/stripe";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { Customer } from "@/types/CustomerTypes";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pierre.V | Paiement réussi",
  description:
    "Votre paiement sur le site Pierre.V a été effectué avec succès. Vous avez passé commande et recevrez prochainement un e-mail pour la sélection d'un point relais. Une facture récapitulative vous sera également envoyée. Merci pour votre achat !",
};

interface SessionProps {
  session_id: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: SessionProps;
}) {
  const sessionId = searchParams?.session_id ?? "";
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product", "line_items"],
  });

  if (!session) {
    return <div>Session not found</div>;
  }

  console.log(session.line_items);

  const items = session?.line_items?.data.map((item: any) => {
    return {
      id: item.id,
      name: item.description,
      price: item.amount_total / 100,
      imageUrl: item.price.product?.images[0],
      details: item.price.product?.description,
      createdAt: item.price.created,
    };
  });

  return (
    <main className="flex 1">
      <div className="container relative">
        <div className="flex flex-col mt-14 items-center justify-center">
          <BsFillPatchCheckFill size={100} className="mb-12" color="green" />
          <p className="text-center">Merci d'avoir passer commande!</p>
          <p className="text-center">
            Vous recevrez un mail sous 48H vous demandant de sélectionner un
            point relais, une facture récapitulative vous sera également envoyée
          </p>
          <CustomerDetails customerDetails={items as Customer[]} />
        </div>
      </div>
    </main>
  );
}

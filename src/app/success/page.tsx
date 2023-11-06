/* eslint-disable react/no-unescaped-entities */
import CustomerDetails from "@/components/CommandesDetails/CustomerDetails";
import { stripe } from "@/utils/stripe/stripe";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { getArticleById } from "../../utils/prisma/boutiqueId.query";
import prisma from "../../../prisma/client";
import { Customer } from "@/types/CustomerTypes";

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
        <div className="flex flex-col items-center justify-center">
          <BsFillPatchCheckFill size={50} color="green" />
          <p>Merci d'avoir passer commande!</p>
          <p>
            Vous recevrez un mail sous 48H vous demandant de sélectionner un
            point relais, une facture récapitulative vous sera également envoyée
          </p>
          <CustomerDetails customerDetails={items as Customer[]} />
        </div>
      </div>
    </main>
  );
}

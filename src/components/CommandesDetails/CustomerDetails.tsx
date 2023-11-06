"use client";

import { VscLoading } from "react-icons/vsc";
import Image from "next/image";
import Confetti from "react-confetti";
import { useCartStore } from "@/lib/store/useCartStore";
import { useEffect } from "react";
import { Customer } from "@/types/CustomerTypes";

export default function CustomerDetails({
  customerDetails,
}: {
  customerDetails: Customer[];
}) {
  const { reset } = useCartStore();

  useEffect(() => {
    if (customerDetails.length > 0) {
      reset();
    }
  }, [customerDetails, reset]);

  return (
    <div className="mt-8 w-full">
      <h2 className="text-2xl font-bold mb-4 flex flex-col items-center">
        Détails de la commande
      </h2>
      <div className="flex flex-wrap flex-row justify-center">
        {customerDetails.length > 0 ? (
          customerDetails.map((item: Customer) => (
            <div key={item.id} className="flex flex-col items-center">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={100}
                height={100}
                className="w-32 h-32 object-cover"
              />
              <div className="flex flex-col ml-4">
                <p className="text-lg font-bold">{item.name}</p>
                <p className="text-gray-500">{item.details}</p>
                <p className="text-gray-500">{item.price} €</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <VscLoading className="animate-spin mr-2" />
            <p>Chargement...</p>
          </div>
        )}
      </div>

      <Confetti
        width={800}
        height={800}
        numberOfPieces={250}
        recycle={false}
        className="w-full h-full flex justify-center items-center"
      />
    </div>
  );
}

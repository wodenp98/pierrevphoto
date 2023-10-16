"use client";

import { VscLoading } from "react-icons/vsc";
import Image from "next/image";
import Confetti from "react-confetti";

export default function CustomerDetails({ customerDetails }: any) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 flex flex-col items-center">
        Order Details
      </h2>
      {customerDetails.length > 0 ? (
        customerDetails.map((item: any, index: number) => (
          <div key={index} className="flex flex-col mb-4">
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
          <p>Loading...</p>
        </div>
      )}
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

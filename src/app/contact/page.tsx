/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { IoMdPaperPlane } from "react-icons/io";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pierre.V | Contact",
  description:
    "Contactez Pierre Vigneron pour toutes vos questions et demandes. Nous sommes à votre disposition pour discuter de vos besoins, répondre à vos préoccupation. N'hésitez pas à nous contacter!",
};

export default function Contact() {
  return (
    <main className="flex 1 mt-20">
      <div className="container relative">
        <h1 className="flex justify-center my-6 text-4xl uppercase">Contact</h1>
        <section className="flex flex-col items-center">
          <h2 className="w-10/12 m-3 text-center">
            Pour toute question, n'hésitez pas à me contacter ! Je vous
            répondrai dans les meilleurs délais. A bientôt !
          </h2>
          <div className="grid grid-cols-1 gap-2  md:grid-cols-2 w-3/4 place-items-center">
            <a
              href={`mailto:pierrev.photographie@gmail.com`}
              className="relative w-full h-full my-1"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/mailfond.jpg"
                alt="Votre image"
                className="w-full h-full"
                width={500}
                height={500}
              />

              <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center">
                <IoMdPaperPlane className="text-4xl text-black" />
                <p className="text-black text-xs lg:text-lg font-bold">
                  pierre.v.photographie@gmail.com
                </p>
              </div>
            </a>
            <Link
              href="https://www.instagram.com/pierrev.photographie"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full h-full my-1"
            >
              <Image
                src="/assets/instafond.jpg"
                alt="Votre image"
                className="w-full h-full"
                width={500}
                height={500}
              />

              <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center">
                <Image
                  src="/svg/icon-instagram.svg"
                  alt="Instagram"
                  width={30}
                  height={30}
                  className="text-4xl text-black"
                />
                <p className="text-black text-lg font-bold">
                  @pierre.v.photographie
                </p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

import Image from "next/image";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignOutButton from "@/components/SignOutButton/SignOutButton";
import { Login } from "@/components/CompteComponents/Login";
import prisma from "../../../prisma/client";
import { UserInfo } from "@/components/CompteComponents/UserInfo";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    return (
      <main>
        <ul className="flex ml-6">
          <li className="text-gray-300">Accueil</li>
          <li className="text-gray-300 mx-2">-</li>
          <li>Compte</li>
        </ul>

        <section className="flex flex-col items-center justify-center mt-4">
          <div className="flex items-end justify-end">
            <div className="relative">
              <Image
                src={session.user.image ?? "/photo-utilisateur.jpg"}
                alt="Photo de profil"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <SignOutButton />
            </div>
          </div>

          <UserInfo />
        </section>
      </main>
    );
  }

  return (
    <main>
      <ul className="flex ml-6">
        <li className="text-gray-300">Accueil</li>
        <li className="text-gray-300 mx-2">-</li>
        <li>Compte</li>
      </ul>

      <Login />
    </main>
  );
}

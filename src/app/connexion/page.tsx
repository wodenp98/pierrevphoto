import { Login } from "@/components/CompteComponents/Login";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pierre.V | Connexion",
  description:
    "Connectez-vous à votre compte sur le site Pierre.V. Accédez à votre espace personnel en toute sécurité. Utilisez vos identifiants pour accéder à vos informations, voir vos commandes. Connectez-vous dès maintenant !",
};

export default async function Page() {
  return (
    <main className="flex 1">
      <div className="container relative">
        <Login />
      </div>
    </main>
  );
}

import { Login } from "@/components/CompteComponents/Login";

export default function Page() {
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

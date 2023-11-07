import { Login } from "@/components/CompteComponents/Login";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Page() {
  return (
    <main className="flex 1">
      <div className="container relative">
        <Login />
      </div>
    </main>
  );
}

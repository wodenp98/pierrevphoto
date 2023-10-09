import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import { CgLogOff } from "react-icons/cg";

export default function Compte() {
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
              src={"/photo-utilisateur.jpg"}
              alt="Photo de profil"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <CgLogOff
              className="text-3xl  text-red-500 cursor-pointer absolute bottom-[-5px] right-[-5px]"
              // onClick={handleSignOut}
            />
          </div>
        </div>

        <div className="text-center my-4">Bonjour test !</div>
        <Tabs defaultValue="informations" className="w-11/12 lg:w-8/12">
          <TabsList
            className="grid w-full h-10 grid-cols-2"
            style={{ backgroundColor: "rgb(244 244 245)" }}
          >
            <TabsTrigger value="informations">Informations</TabsTrigger>
            <TabsTrigger value="commandes">Commandes</TabsTrigger>
          </TabsList>
          <TabsContent value="informations">
            <Card>
              <CardHeader className="flex flex-col">
                <CardTitle>Informations Personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* <EmailFormProfil userId={user?.uid} />
                <LastNameFormProfil userId={user?.uid} />
                <FirstNameFormProfil userId={user?.uid} />
                {user?.providerData[0].providerId === "password" && (
                  <PasswordFormProfil userId={user?.uid} />
                )} */}
              </CardContent>
              <CardFooter>
                {/* <DeleteFormProfil userId={user?.uid} /> */}
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="commandes">
            <Card>
              <CardHeader>
                <CardTitle>Commandes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* {historyCommand?.length === 0 ? (
                  <div className="flex flex-col items-center text-center">
                    <p>
                      Vous n'avez pas encore effectué d'achat sur notre site!
                    </p>
                    <span>Mais vous pouvez changer ça 😉</span>
                  </div>
                ) : (
                  sortedArray?.map((command) => (
                    <div key={command.id}>
                      <CardHistoryItem historyCommand={command} />
                      <Separator className="my-4 bg-gray-500 h-[1px]" />
                    </div>
                  ))
                )} */}
                <p>Historique</p>
              </CardContent>
              <CardFooter>
                <Link href="/boutique">
                  <Button>BOUTIQUE</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

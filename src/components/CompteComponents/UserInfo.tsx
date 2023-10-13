"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { toast } from "../ui/use-toast";
import { Label } from "../ui/label";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import prisma from "../../../prisma/client";

const FormSchema = z.object({
  nom: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(60, { message: "Username must be at most 50 characters." })
    .regex(/^[a-zA-ZÀ-ÿ\s-]+$/, {
      message:
        "Username must only contain letters, spaces, hyphens, and accents.",
    }),
});

export const UserInfo = () => {
  const { data: session, update } = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nom: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    update({ name: data.nom });
    toast({
      title: "Votre nom a bien été modifié mis à jour",
    });
  };

  const deleteAccount = async () => {
    const deleteUser = await prisma.user
      .delete({
        where: {
          id: session?.user.id,
        },
      })
      .then(() => signOut());

    if (deleteUser) {
      toast({
        title: "Votre compte a bien été supprimé",
      });
    }
  };

  return (
    <>
      <div className="text-center my-4">
        Bonjour {session?.user?.name ?? ""} !
      </div>
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
              {session?.user?.name === null ? (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="nom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Veuillez rentrer votre nom"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Enregistrer</Button>
                  </form>
                </Form>
              ) : (
                <>
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    disabled
                    type="text"
                    placeholder={session?.user.name}
                  />
                </>
              )}
              <Label htmlFor="email">Email</Label>
              <Input disabled type="email" placeholder={session?.user.email} />
            </CardContent>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Supprimer compte</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Êtes-vous sûr de vouloir supprimer votre compte ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action ne peut être annulée. Cette action supprimera
                      définitivement votre compte et supprimera vos données de
                      nos serveurs.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteAccount}>
                      Confimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
    </>
  );
};

/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { UserAuthForm } from "./UserAuthForm";

export const Login = () => {
  return (
    <section className="h-[calc(100vh-100px)] grid place-content-center">
      <Card className="w-[350px]  md:w-[500px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Se connecter</CardTitle>
          <CardDescription>
            Si vous n'avez pas de compte, il sera automatiquement creé
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <UserAuthForm />
        </CardContent>
        <CardFooter>
          <p className="px-8 text-center text-sm text-muted-foreground">
            En cliquant, vous acceptez les{" "}
            <Link
              href="/cgv"
              className="underline underline-offset-4 hover:text-primary"
            >
              CGV
            </Link>{" "}
            et{" "}
            <Link
              href="/mentions-legales"
              className="underline underline-offset-4 hover:text-primary"
            >
              les mentions légales
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

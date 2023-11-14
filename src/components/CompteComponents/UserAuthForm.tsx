"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PiSpinnerGapBold } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useToast } from "../ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
});

type FormValues = z.infer<typeof FormSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    signIn("email", {
      email: data.email,
      callbackUrl: "/compte",
      redirect: false,
    });

    toast({
      title: "Email envoyé",
      description:
        "Vérifiez votre boîte de réception pour vous connecter, vérifiez également votre dossier spam !",
      duration: 5000,
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Votre email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && (
              <PiSpinnerGapBold className="mr-2 h-4 w-4 animate-spin" />
            )}
            Se connecter avec votre email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Ou</span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => signIn("google", { callbackUrl: "/compte" })}
      >
        {isLoading ? (
          <PiSpinnerGapBold className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/lib/store/useCartStore";
import useFromStore from "@/lib/store/hooks/useFromStore";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Article {
  name: string;
  id: number;
  imageUrl: string;
  aspectRatio: string;
  description: string;
  price: number;
}

const FormSchema = z.object({
  format: z.enum(["30*45 cm", "40*60 cm", "60*90 cm"], {
    errorMap: (issue, ctx) => {
      return {
        message: "Veuillez choisir un format",
      };
    },
  }),
  rendu: z.enum(["Mat", "Satiné"], {
    errorMap: (issue, ctx) => {
      return {
        message: "Veuillez choisir un rendu",
      };
    },
  }),
  impression: z.enum(["Subligraphie", "Fine Art seul", "Alu Dibond"], {
    errorMap: (issue, ctx) => {
      return {
        message: "Veuillez choisir une impression",
      };
    },
  }),
});

const OrderSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string(),
  aspectRatio: z.string(),
  description: z.string(),
  price: z.number(),
  format: z.enum(["30*45 cm", "40*60 cm", "60*90 cm"]),
  rendu: z.enum(["Mat", "Satiné"]),
  impression: z.enum(["Subligraphie", "Fine Art seul", "Alu Dibond"]),
});

type FormValues = {
  [key: string]: string;
  format: string;
  rendu: string;
  impression: string;
};

const prices: Record<string, Record<string, number>> = {
  Subligraphie: {
    "30*45 cm": 62,
    "40*60 cm": 107,
    "60*90 cm": 235,
  },
  "Fine Art seul": {
    "30*45 cm": 18,
    "40*60 cm": 29,
    "60*90 cm": 48,
  },
  "Alu Dibond": {
    "30*45 cm": 65,
    "40*60 cm": 92,
    "60*90 cm": 158,
  },
};
export const ShopFormPaysage = ({ article }: { article: Article }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    format: "",
    rendu: "",
    impression: "",
  });

  const calculatePrice = (formValues: FormValues) => {
    let initialPrice = 150;
    const price = prices[formValues.impression]?.[formValues.format];

    return initialPrice + (price || 0);
  };
  const price = calculatePrice(formValues);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      const productToCart = {
        id: article.id,
        name: article.name,
        imageUrl: article.imageUrl,
        aspectRatio: article.aspectRatio,
        description: article.description,
        price,
        format: data.format,
        rendu: data.rendu,
        impression: data.impression,
      };

      const validateOrder = OrderSchema.safeParse(productToCart);

      if (!validateOrder.success) {
        return toast({
          className: "bg-red-500 text-white",
          title: `Une erreur est survenue`,
          duration: 3000,
        });
      }

      const itemExist = cart?.find((item) => item.id === validateOrder.data.id);
      if (itemExist) {
        return toast({
          className: "bg-red-500 text-white",
          title: `Cet article est déjà dans votre panier`,
          duration: 3000,
        });
      } else {
        addToCart({ ...validateOrder.data });
        toast({
          className: "bg-green-500 text-white",
          title: `Votre article a été ajouté à votre panier`,
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        className: "bg-red-500 text-white",
        title: `Une erreur est survenue`,
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-10 sm:flex sm:flex-col sm:items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
          <FormField
            control={form.control}
            name="format"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Format</FormLabel>
                <Select
                  onValueChange={(value) => {
                    setFormValues((prevState) => ({
                      ...prevState,
                      format: value,
                    }));
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez un format" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="30*45 cm">30*45 cm</SelectItem>
                    <SelectItem value="40*60 cm">40*60 cm</SelectItem>
                    <SelectItem value="60*90 cm">60*90 cm</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="impression"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Impression</FormLabel>
                <Select
                  onValueChange={(value) => {
                    setFormValues((prevState) => ({
                      ...prevState,
                      impression: value,
                    }));
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez une impression" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Subligraphie">Subligraphie</SelectItem>
                    <SelectItem value="Fine Art seul">Fine Art seul</SelectItem>
                    <SelectItem value="Alu Dibond">Alu Dibond</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rendu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rendu</FormLabel>
                <Select
                  onValueChange={(value) => {
                    setFormValues((prevState) => ({
                      ...prevState,
                      rendu: value,
                    }));
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez un rendu" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Mat">Mat</SelectItem>
                    <SelectItem value="Satiné">Satiné</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col  justify-center">
            {isLoading ? (
              <Button className="uppercase py-2 px-4" disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                Ajout en cours...
              </Button>
            ) : (
              <Button type="submit" className="uppercase py-2 px-4">
                Ajouter au panier {price.toFixed(2)}€
              </Button>
            )}
            <p className="text-center mt-2 text-sm">Prix HT</p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShopFormPaysage;

"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { useCartStore } from "@/lib/store/useCartStore";
import useFromStore from "@/lib/store/hooks/useFromStore";

type Article = {
  name: string;
  id: number;
  imageUrl: string;
  aspectRatio: string;
  description: string;
  price: number;
};

type FormValues = {
  [key: string]: string;
  format: string;
  rendu: string;
  impression: string;
};

const prices: Record<string, Record<string, number>> = {
  format: {
    "30*45 cm": 150,
    "40*60 cm": 200,
    "60*90 cm": 250,
    "70*100 cm": 300,
  },
  rendu: {
    Mat: 10,
    Satiné: 20,
  },
  impression: {
    Subligraphie: -5,
    "Fine Art seul": -10,
    "Alu Dibond": 5,
  },
};

const SelectInput: React.FC<{
  label: string;
  name: string;
  options: string[];
  required: boolean;
  errors: any;
  register: any;
  onChange: (value: string) => void;
}> = ({ label, name, options, errors, required, register, onChange }) => {
  return (
    <div className="flex flex-col mb-2 w-full md:w-3/4">
      <label htmlFor={name} className="mb-1 text-sm font-medium ">
        {label}
      </label>
      <select
        id={name}
        name={name}
        {...register(name, { required })}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 border-gray-300 w-full"
      >
        <option value="" disabled hidden>
          -- Option --
        </option>
        {options.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[name] && <p className="text-red-500 mb-2">{label} est requis</p>}
    </div>
  );
};

export const ShopForm = ({ article }: { article: Article }) => {
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      format: "",
      rendu: "",
      impression: "",
    },
    mode: "onChange",
  });
  const [formValues, setFormValues] = useState<FormValues>({
    format: "",
    rendu: "",
    impression: "",
  });

  const getPrice = (formValues: FormValues) => {
    let price = 150;
    Object.keys(formValues).forEach((key) => {
      const value = formValues[key];
      if (prices[key] && prices[key][value]) {
        price += prices[key][value];
      }
    });
    return price;
  };

  const price = getPrice(formValues);

  const onSubmit = () => {
    const productToCart = {
      ...article,
      price,
      format: formValues.format,
      rendu: formValues.rendu,
      impression: formValues.impression,
    };

    const itemExist = cart?.find((item) => item.id === productToCart.id);

    if (itemExist) {
      return toast({
        className: "bg-red-500 text-white",
        title: `Cet article est déjà dans votre panier`,
        duration: 3000,
      });
    } else {
      addToCart(productToCart);
      toast({
        className: "bg-green-500 text-white",
        title: `Votre article a été ajouté à votre panier`,
        duration: 3000,
      });
    }
  };

  return (
    <div className="mt-6 md:w-1/2 md:mt-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col sm:items-center md:items-center lg:items-center"
      >
        <SelectInput
          label="Format"
          name="format"
          options={["30*45 cm", "40*60 cm", "60*90 cm", "70*100 cm"]}
          required={true}
          onChange={(value) =>
            setFormValues((prevState) => ({ ...prevState, format: value }))
          }
          errors={errors}
          register={register}
        />
        <SelectInput
          label="Rendu"
          name="rendu"
          options={["Mat", "Satiné"]}
          required={true}
          errors={errors}
          onChange={(value) => {
            setFormValues((prevState) => ({ ...prevState, rendu: value }));
          }}
          register={register}
        />
        <SelectInput
          label="Impression"
          name="impression"
          options={["Subligraphie", "Fine Art seul", "Alu Dibond"]}
          required={true}
          errors={errors}
          onChange={(value) => {
            setFormValues((prevState) => ({ ...prevState, impression: value }));
          }}
          register={register}
        />
        <div className="mt-8 flex flex-col justify-center">
          <Button type="submit" className="uppercase py-2 px-4">
            Ajouter au panier {price.toFixed(2)}€
          </Button>
        </div>
      </form>

      <div className="flex flex-col items-center mt-6">
        <h2>Impression 100% MADE IN FRANCE</h2>

        <Image
          src="/france.png"
          alt="Drapeau de la France"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default ShopForm;

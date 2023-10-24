"use client";
import useFromStore from "@/lib/store/hooks/useFromStore";
import { useCartStore } from "@/lib/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIconNavbar() {
  const cart = useFromStore(useCartStore, (state) => state.cart);

  return (
    <Link href="/panier">
      <span className="relative">
        <ShoppingCart size={24} strokeWidth={1.5} className="mr-4" />
        <span className="absolute top-1 right-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          {cart ? cart.length : 0}
        </span>
      </span>
    </Link>
  );
}

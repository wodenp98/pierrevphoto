import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: number;
  name: string;
  aspectRatio: string;
  description: string;
  imageUrl: string;
  price: number;
  format: string;
  rendu: string;
  impression: string;
};

interface State {
  cart: Product[];
  totalPrice: number;
}

interface Actions {
  addToCart: (Item: Product) => void;
  removeFromCart: (Item: Product) => void;
  reset: () => void;
}

const INITIAL_STATE: State = {
  cart: [],
  totalPrice: 0,
};

export const useCartStore = create<State & Actions>()(
  persist(
    (set) => ({
      cart: INITIAL_STATE.cart,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (product: Product) => {
        set((state: State) => {
          const cartItem = state.cart.find((item) => item.id === product.id);
          if (cartItem) {
            return state;
          } else {
            const updatedCart = [...state.cart, { ...product }];

            return {
              ...state,
              cart: updatedCart,
              totalPrice: state.totalPrice + product.price,
            };
          }
        });
      },
      removeFromCart: (product: Product) => {
        set((state: State) => ({
          ...state,
          cart: state.cart.filter((item) => item.id !== product.id),
          totalPrice: state.totalPrice - product.price,
        }));
      },
      reset: () => {
        set(() => ({ ...INITIAL_STATE }));
      },
    }),
    {
      name: "cart-store",
    }
  )
);

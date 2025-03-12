import { create } from "zustand";

export const useCartStore = create((set) => ({
    cart: {},
    setCart: (newCart) => set({ cart: cart })
}))
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../types/carts";

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const createCartItemId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (
      state,
      action: PayloadAction<Omit<CartItem, "id" | "totalPrice">>
    ) => {
      const payload = action.payload;

      // we calculate the id and totalPrice here for convenience
      const newItem: CartItem = {
        ...payload,
        id: createCartItemId(),
        totalPrice: payload.unitPrice * payload.quantity,
      };

      state.items.push(newItem);
    },

    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item) return;
      item.quantity = quantity;
      item.totalPrice = item.unitPrice * quantity;
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") as string)
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const exists = state.items.some(
        (item) => item.id === action.payload.id
      );

      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    deleteItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    deleteAllItems: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addItem, deleteItem, deleteAllItems } = cartSlice.actions;
export default cartSlice.reducer;

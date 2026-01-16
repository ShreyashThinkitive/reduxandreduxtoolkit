import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
    try {
        const data = localStorage.getItem("cart");
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

const saveCart = (items: any[]) => {
    localStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: loadCart(),
    },
    reducers: {
        addItem: (state, action) => {
            const item = state.items.find(
                (i: any) => i.id === action.payload.id
            );

            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }

            saveCart(state.items);
        },

        incrementQty: (state, action) => {
            const item = state.items.find(
                (i: any) => i.id === action.payload
            );
            if (item) item.quantity += 1;
            saveCart(state.items);
        },

        decrementQty: (state, action) => {
            const item = state.items.find(
                (i: any) => i.id === action.payload
            );
            if (item && item.quantity > 1) item.quantity -= 1;
            saveCart(state.items);
        },

        deleteItem: (state, action) => {
            state.items = state.items.filter(
                (i: any) => i.id !== action.payload
            );
            saveCart(state.items);
        },

        deleteAllItems: (state) => {
            state.items = [];
            saveCart([]);
        },
    },
});

export const {
    addItem,
    incrementQty,
    decrementQty,
    deleteItem,
    deleteAllItems,
} = cartSlice.actions;

export default cartSlice.reducer;

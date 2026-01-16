import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice";
import productsReducer from "./productslice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products:productsReducer,

  },
});

export default store;

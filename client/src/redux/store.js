import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import productReducer from "./reducers/productReducer";
import aiReducer from "./reducers/aiReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    ai: aiReducer,
  },
});

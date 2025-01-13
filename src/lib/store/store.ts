import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit
import cartReducer from './features/cart/cartSlice'; // Import the cart reducer

// Function to create and configure the Redux store
export const makeStore = () => {
  return configureStore({
    reducer: {
        cart: cartReducer, // Register the cart reducer under the 'cart' slice
    },
  });
};

// Infer the type of the store created by makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` type from the store's state
export type RootState = ReturnType<AppStore['getState']>;

// Infer the `AppDispatch` type from the store's dispatch function
export type AppDispatch = AppStore['dispatch'];
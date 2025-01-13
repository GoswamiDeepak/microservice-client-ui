import { Product, Topping } from '@/lib/types'; // Import types for Product and Topping
import { hashTheItem } from '@/lib/utils'; // Import utility function to hash cart items
import { createSlice } from '@reduxjs/toolkit'; // Import createSlice from Redux Toolkit
import type { PayloadAction } from '@reduxjs/toolkit'; // Import PayloadAction for type-safe actions

// Define the CartItem interface, extending properties from Product
export interface CartItem extends Pick<Product, '_id' | 'name' | 'image' | 'priceConfiguration'> {
  chosenConfiguration: {
    priceConfiguration: {
      [key: string]: string; // Dynamic key-value pairs for price configuration
    };
    selectedToppings: Topping[]; // Array of selected toppings
  };
  qty: number; // Quantity of the item in the cart
  hash?: string; // Optional hash to uniquely identify the cart item
}

// Define the CartState interface
export interface CartState {
  cartItem: CartItem[]; // Array of cart items
}

// Initial state for the cart slice
const initialState: CartState = {
  cartItem: [], // Start with an empty cart
};

// Create the cart slice using createSlice
export const cartSlice = createSlice({
  name: 'cart', // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer to add an item to the cart
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const hash = hashTheItem(action.payload); // Generate a hash for the cart item
      const newItem = {
        ...action.payload, // Spread the payload (cart item)
        hash: hash, // Add the generated hash
      };
      // Update localStorage with the new cart items
      window.localStorage.setItem('cartItems', JSON.stringify([...state.cartItem, newItem]));
      // Return the updated state with the new item added
      return {
        cartItem: [...state.cartItem, newItem],
      };
    },

    // Reducer to set initial cart items (e.g., from localStorage)
    setInitialCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItem.push(...action.payload); // Add the payload items to the cart
    },

    // Reducer to change the quantity of a cart item
    changeQty: (state, action: PayloadAction<{ hash: string; qty: number }>) => {
      const itemIndex = state.cartItem.findIndex((item) => item.hash === action.payload.hash); // Find the item by hash
      if (action.payload.qty === 0) {
        // If quantity is 0, remove the item from the cart
        state.cartItem.splice(itemIndex, 1);
      } else {
        // Otherwise, update the item's quantity (ensure it's at least 1)
        state.cartItem[itemIndex].qty = Math.max(1, state.cartItem[itemIndex].qty + action.payload.qty);
      }
      // Update localStorage with the modified cart items
      window.localStorage.setItem('cartItems', JSON.stringify(state.cartItem));
    },
  },
});

// Export the action creators for use in components
export const { addToCart, setInitialCartItems, changeQty } = cartSlice.actions;

// Export the reducer for use in the store
export default cartSlice.reducer;
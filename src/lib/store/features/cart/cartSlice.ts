import { Product, Topping } from '@/lib/types'
import { hashTheItem } from '@/lib/utils';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { M_PLUS_1 } from 'next/font/google';

export interface CartItem extends Pick<Product, '_id' | 'name' | 'image' | 'priceConfiguration'>{
  // product: Pick<Product, '_id' | 'name' | 'image' | 'priceConfiguration'>;
  chosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: Topping[];
  };
  qty: number;
  hash?: string;
}
export interface CartState {
  cartItem: CartItem[] 
}

const initialState: CartState = {
  cartItem: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const hash = hashTheItem(action.payload)
      const newItem = {
        ...action.payload,
        hash: hash
        // product: action.payload.product,
        // chosenConfiguration: action.payload.chosenConfiguration
      }
      window.localStorage.setItem('cartItems', JSON.stringify([...state.cartItem,newItem]))

      return {
        cartItem: [...state.cartItem, newItem] 

      }
    },
    setInitialCartItems: (state, action: PayloadAction<CartItem[]>)=>{
      state.cartItem.push(...action.payload)
    },
    changeQty : (state, action: PayloadAction<{hash:string, qty:number}>)=>{
      const itemIndex = state.cartItem.findIndex((item)=>item.hash === action.payload.hash)
      if(action.payload.qty === 0) {
        state.cartItem.splice(itemIndex, 1)
        window.localStorage.setItem('cartItems', JSON.stringify(state.cartItem))
        return
      }
      state.cartItem[itemIndex].qty = Math.max(1, state.cartItem[itemIndex].qty + action.payload.qty)
      window.localStorage.setItem('cartItems', JSON.stringify(state.cartItem))
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, setInitialCartItems, changeQty } = cartSlice.actions

export default cartSlice.reducer
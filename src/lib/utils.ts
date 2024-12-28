import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CartItem } from "./store/features/cart/cartSlice"
import CryptoJS from "crypto-js"
import { Product } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hashTheItem(payload:CartItem): string{
  //hashing
  const jsonString = JSON.stringify({...payload, qty: undefined})
  const hash = CryptoJS.SHA256(jsonString).toString();
  return hash;
}

export function getFromPrice(product:Product){
  const basePrice = Object.entries(product.priceConfiguration).filter(([key,value])=>{
    return value.priceType === 'base'
  }).reduce((acc, [key,value])=>{
    const smallestPrice = Math.min(...Object.values(value.availableOptions))
    return acc + smallestPrice
  },0)
  return basePrice;
}

export function cartConfig(cartItem: CartItem) {
  const config = Object.values(cartItem.chosenConfiguration.priceConfiguration).join(', ')
  return config
}

export function cartSelectedToppings(cartItem: CartItem){
  const config = cartItem.chosenConfiguration.selectedToppings.map((item)=>item.name).join(', ')
  return config
}
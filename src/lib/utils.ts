import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CartItem } from "./store/features/cart/cartSlice"
import CryptoJS from "crypto-js"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hashTheItem(payload:CartItem): string{
  //hashing
  const jsonString = JSON.stringify({...payload, qty: undefined})
  const hash = CryptoJS.SHA256(jsonString).toString();
  return hash;
}
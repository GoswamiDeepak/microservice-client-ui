import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CartItem } from './store/features/cart/cartSlice';
import CryptoJS from 'crypto-js';
import { Product } from './types';

// Utility function to merge and optimize Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs)); // Combines and deduplicates class names
}

// Function to hash a CartItem object (excluding the quantity) using SHA-256
export function hashTheItem(payload: CartItem): string {
    // Convert the payload (excluding quantity) to a JSON string
    const jsonString = JSON.stringify({ ...payload, qty: undefined });
    // Generate a SHA-256 hash of the JSON string
    const hash = CryptoJS.SHA256(jsonString).toString();
    return hash;
}

// Function to calculate the base price of a product based on its price configuration
export function getFromPrice(product: Product) {
    const basePrice = Object.entries(product.priceConfiguration)
        // Filter price configurations that have a 'base' price type
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([key, value]) => {
            return value.priceType === 'base';
        })
        // Calculate the smallest price among available options for each configuration
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .reduce((acc, [key, value]) => {
            const smallestPrice = Math.min(
                ...Object.values(value.availableOptions)
            );
            return acc + smallestPrice;
        }, 0);
    return basePrice;
}

// Function to generate a string representation of the chosen price configuration for a cart item
export function cartConfig(cartItem: CartItem) {
    const config = Object.values(
        cartItem.chosenConfiguration.priceConfiguration
    ).join(', '); // Join the chosen configurations into a comma-separated string
    return config;
}

// Function to generate a string representation of the selected toppings for a cart item
export function cartSelectedToppings(cartItem: CartItem) {
    const config = cartItem.chosenConfiguration.selectedToppings
        .map((item) => item.name) // Extract the names of the selected toppings
        .join(', '); // Join the names into a comma-separated string
    return config;
}

// Function to calculate the total price of a cart item, including toppings and price configurations
export function getTotalPrice(product: CartItem) {
    // Calculate the total price of selected toppings
    const toppingTotal = product.chosenConfiguration.selectedToppings.reduce(
        (acc, curr) => acc + Number(curr.price),
        0
    );

    // Calculate the total price of chosen price configurations
    const configPricing = Object.entries(
        product.chosenConfiguration.priceConfiguration
    ).reduce((acc, [key, value]) => {
        const price = product.priceConfiguration[key].availableOptions[value];
        return acc + Number(price);
    }, 0);

    // Return the sum of topping and configuration prices
    return toppingTotal + configPricing;
}
import { useMemo } from 'react';
import { CartItem } from '../store/features/cart/cartSlice';

export function useTotalPrice(product: CartItem) {
    const totalPrice = useMemo(() => {
        const toppingTotal =
            product.chosenConfiguration.selectedToppings.reduce(
                (acc, curr) => acc + Number(curr.price),
                0
            );
        const configPricing = Object.entries(
            product.chosenConfiguration.priceConfiguration
        ).reduce((acc, [key, value]) => {
            const price =
                product.priceConfiguration[key].availableOptions[value];
            return acc + Number(price);
        }, 0);
        return toppingTotal + configPricing;
    }, [product]);
    return totalPrice;
}

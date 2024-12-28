import { useMemo } from 'react';
import { CartItem } from '../store/features/cart/cartSlice';
import { getTotalPrice } from '../utils';

export function useTotalPrice(product: CartItem) {
    const totalPrice = useMemo(() => {
        return getTotalPrice(product);
    }, [product]);
    return totalPrice;
}

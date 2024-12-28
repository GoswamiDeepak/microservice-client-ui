'use client';
import { useAppSelector } from '@/lib/store/hooks';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import CartItems from './cart-items';
import { Button } from '@/components/ui/button';
import { useEffect, useMemo, useState } from 'react';
import { CartItem } from '@/lib/store/features/cart/cartSlice';
import { getTotalPrice } from '@/lib/utils';

const CartList = () => {
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState<Boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const cart = useAppSelector((state) => state.cart.cartItem);

    const finalTotalPrice = useMemo(() => {
        return cart.reduce((acc, item) => {
            return acc + item.qty * getTotalPrice(item);
        }, 0);
    }, [cart]);

    if (!isClient) {
        return null;
    }

    if (!cart.length) {
        return (
            <div className="flex items-center gap-2">
                <ShoppingCart />
                <p className="text-gray-500">
                    Your cart is empty!
                    <Link
                        href={`/?restaurentId=${searchParams.get(
                            'restaurentId'
                        )}`}
                        className="text-orange-500 ml-4">
                        Continue Shopping
                    </Link>
                </p>
            </div>
        );
    }

    return (
        <>
            {cart.map((item: CartItem) => {
                return <CartItems item={item} />;
            })}

            <div className="flex justify-between mt-6">
                <p className="text-lg font-semibold">
                    &#8377; {finalTotalPrice}
                </p>
                <Button>Checkout</Button>
            </div>
        </>
    );
};

export default CartList;

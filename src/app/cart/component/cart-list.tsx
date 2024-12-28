'use client';
import { useAppSelector } from '@/lib/store/hooks';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import CartItems from './cart-items';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { CartItem } from '@/lib/store/features/cart/cartSlice';

const CartList = () => {
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState<Boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const cart = useAppSelector((state) => state.cart.cartItem);

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
                <p className="text-lg font-semibold">&#8377; 500</p>
                <Button>Checkout</Button>
            </div>
        </>
    );
};

export default CartList;

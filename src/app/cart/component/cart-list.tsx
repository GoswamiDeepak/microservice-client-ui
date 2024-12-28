'use client';
import { useAppSelector } from '@/lib/store/hooks';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import CartItems from './cart-items';
import { Button } from '@/components/ui/button';

const CartList = () => {
    const cart = useAppSelector((state) => state.cart.cartItem);
    const searchParams = useSearchParams();

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
            <CartItems cart={cart} />
            <div className="flex justify-between mt-6">
                <p className="text-lg font-semibold">&#8377; 500</p>
                <Button>Checkout</Button>
            </div>
        </>
    );
};

export default CartList;

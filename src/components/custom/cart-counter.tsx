'use client';
import { useAppSelector } from '@/lib/store/hooks';
import { ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const CartCounter = () => {
    const searchParams = useSearchParams();
    const cartItem = useAppSelector((state) => state.cart.cartItem);
    
    return (
        <div className="relative">
            <Link href={`/cart?restaurentId=${searchParams.get('restaurentId')}`}>
                <ShoppingBasket className="hover:text-primary" />
            </Link>
            <span className="absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-primary font-bold text-white">
                {cartItem.length}
            </span>
        </div>
    );
};

export default CartCounter;

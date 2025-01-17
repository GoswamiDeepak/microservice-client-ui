'use client';
import React, { useEffect, useState } from 'react';
import ToppingCard from './topping-card';
import { Topping } from '@/lib/types';
import { useSearchParams } from 'next/navigation';

// const topping = [
//       {
//             id: 1,
//             name: 'Chicken',
//             image: '/pizza.png',
//             price: 50,
//             isAvailable: true,
//       },
//       {
//             id: 2,
//             name: 'Jelapeno',
//             image: '/pizza.png',
//             price: 50,
//             isAvailable: true,
//       },
//       {
//             id: 3,
//             name: 'Chesse',
//             image: '/pizza.png',
//             price: 50,
//             isAvailable: true,
//       },
// ];

const ToppingList = ({
    selectedToppings,
    onHandleCheckBox,
}: {
    selectedToppings: Topping[];
    onHandleCheckBox: (topping: Topping) => void;
}) => {
    const searchParams = useSearchParams();
    const [topping, setTopping] = useState<Topping[]>([]);

    useEffect(() => {
        const fetchTopping = async () => {
            const result = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=${searchParams.get('restaurentId')}`
            );
            const response = await result.json();
            console.log(response);
            setTopping(response.data);
            // setSelectedToppings([response.data[0]]);
        };
        fetchTopping();
    }, [searchParams]);

    return (
        <section className="mt-6">
            <h3>Extra Topping</h3>
            <div className="grid grid-cols-3 gap-4 mt-2">
                {topping.map((topping) => {
                    return (
                        <ToppingCard
                            topping={topping}
                            key={topping._id}
                            selectedToppings={selectedToppings}
                            onHandleCheckBox={onHandleCheckBox}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default ToppingList;

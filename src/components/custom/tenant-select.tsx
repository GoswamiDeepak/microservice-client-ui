'use client';
import { Restaurant } from '@/lib/types';
import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

const TenantSelect = ({
    restaurants,
}: {
    restaurants: { data: Restaurant[] };
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleValueChange = (value: string) => {
        router.push(`/?restaurentId=${value}`);
    };

    return (
        <Select
            onValueChange={handleValueChange}
            defaultValue={searchParams.get('restaurantId') || ''}>
            <SelectTrigger className="w-[180px] focus:ring-0">
                <SelectValue placeholder="Select Restuarents" />
            </SelectTrigger>
            <SelectContent>
                {restaurants.data.map((restaurant: Restaurant) => (
                    <SelectItem
                        key={restaurant.id}
                        value={String(restaurant.id)}>
                        {restaurant.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default TenantSelect;

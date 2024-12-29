'use client';
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Coins, CreditCard } from 'lucide-react';

const ChoosePayment = () => {
    const [selectedMethod, setSelectedMethod] = useState('card');

    const handleSelection = (value: string) => {
        setSelectedMethod(value);
    };

    return (
        <RadioGroup
            onValueChange={handleSelection}
            value={selectedMethod}
            className="flex gap-4 mt-2"
            // className="grid grid-cols-3 gap-4"
        >
            <div className="w-[100px] h-[50px]">
                <RadioGroupItem
                    value="card"
                    id="card"
                    aria-label="Card"
                    className="peer sr-only"
                />
                <Label
                    htmlFor="card"
                    className="text-sm font-medium flex items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary">
                    <CreditCard />
                    Card
                </Label>
            </div>

            <div className="w-[100px] h-[50px]">
                <RadioGroupItem
                    value="paypal"
                    id="paypal"
                    aria-label="Paypal"
                    className="peer sr-only"
                />
                <Label
                    htmlFor="paypal"
                    className="text-sm font-medium flex items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary">
                    <Coins />
                    Cash
                </Label>
            </div>
        </RadioGroup>
    );
};

export default ChoosePayment;

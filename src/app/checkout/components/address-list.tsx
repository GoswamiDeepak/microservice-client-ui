'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const AddressList = () => {
    const [selectedAddress, setSelectedAddress] = useState('address1');

    const handleSelection = (value: string) => {
        setSelectedAddress(value);
    };
    return (
        <>
            <RadioGroup
                onValueChange={handleSelection}
                value={selectedAddress}
                className="grid grid-cols-2 gap-4 mt-2">
                <Card
                    className={` ${
                        selectedAddress === 'address1' ? 'border-primary' : ''
                    }`}>
                    <CardContent className="p-4">
                        <div className="flex items-start space-x-2">
                            <RadioGroupItem value="address1" id="address1" />
                            <Label htmlFor="address1">
                                123, ABC Street, Malad West, Mumbai,
                                Maharashtra, India 400064
                            </Label>
                        </div>
                    </CardContent>
                </Card>

                <Card
                    className={` ${
                        selectedAddress === 'address2' ? 'border-primary' : ''
                    }`}>
                    <CardContent className="p-4">
                        <div className="flex items-start space-x-2">
                            <RadioGroupItem value="address2" id="address2" />
                            <Label htmlFor="address2">
                                Flat No 501, Sunshine Apartments, Andheri East,
                                Mumbai, Maharashtra, India 400069
                            </Label>
                        </div>
                    </CardContent>
                </Card>
            </RadioGroup>
        </>
    );
};

export default AddressList;

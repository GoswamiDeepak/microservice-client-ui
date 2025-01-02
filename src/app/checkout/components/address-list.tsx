'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Address } from '@/lib/types';

const AddressList = ({ address }: { address: Address[] }) => {
    const [selectedAddress, setSelectedAddress] = useState('address1');

    const handleSelection = (value: string) => {
        setSelectedAddress(value);
    };
    return (
        <>
            <RadioGroup defaultValue="" onValueChange={handleSelection} value={selectedAddress} className="grid grid-cols-2 gap-6 mt-2">
                {address?.map((data) => (
                    <Card className={` ${selectedAddress === 'address1' ? 'border-primary' : ''}`} key={data?.text}>
                        <CardContent className="p-4">
                            <div className="flex items-start space-x-2">
                                <RadioGroupItem value="address1" id="address1" />
                                <Label htmlFor="address1">{data?.text}</Label>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* <Card className={` ${selectedAddress === 'address2' ? 'border-primary' : ''}`}>
                    <CardContent className="p-4">
                        <div className="flex items-start space-x-2">
                            <RadioGroupItem value="address2" id="address2" />
                            <Label htmlFor="address2">
                                Flat No 501, Sunshine Apartments, Andheri East, Mumbai, Maharashtra, India 400069
                            </Label>
                        </div>
                    </CardContent>
                </Card> */}
            </RadioGroup>
        </>
    );
};

export default AddressList;

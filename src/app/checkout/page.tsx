import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import React from 'react';
import AddressModel from './components/address-model';
import AddressList from './components/address-list';
import ChoosePayment from './components/choose-payment';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const CheckoutPage = () => {
    return (
        <div className="container max-w-screen-xl mx-auto py-5">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 bg-white rounded-lg p-6">
                    <h3 className="font-bold text-xl">Customer Details</h3>
                    <div className="w-full mt-4">
                        <Label
                            htmlFor="firstname"
                            className="text-[16px] font-semibold">
                            FirstName
                        </Label>
                        <Input
                            className="mt-2"
                            type="firstname"
                            id="firstname"
                            placeholder="FirstName"
                        />
                    </div>
                    <div className="w-full mt-4">
                        <Label
                            htmlFor="lastname"
                            className="text-[16px] font-semibold">
                            Lastname
                        </Label>
                        <Input
                            className="mt-2"
                            type="lastname"
                            id="lastname"
                            placeholder="Lastname"
                        />
                    </div>
                    <div className="w-full mt-4">
                        <Label
                            htmlFor="email"
                            className="text-[16px] font-semibold">
                            Email
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="mt-2"
                        />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-[16px] font-semibold">Address</p>
                        <AddressModel />
                    </div>
                    <div className="mt-4">
                        <AddressList />
                    </div>
                    <div className="mt-4 ">
                        <p className="text-[16px] font-semibold ">
                            Choose Payment
                        </p>
                        <ChoosePayment />
                    </div>
                    <div className="mt-4 ">
                        <p className="text-[16px] font-semibold mb-2">
                            Add Comment
                        </p>
                        <Textarea placeholder="Type your address here." />
                    </div>
                </div>
                <div className="col-span-4 ">
                    <div className="bg-white rounded-lg p-6">
                        <h3 className="font-bold text-xl">Order Summary</h3>
                        <div className="space-y-2 mt-4 border-b pb-4">
                            <div className="flex justify-between items-center">
                                <p>SubTotal</p>
                                <p className="font-bold text-l">&#8377;200</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Taxes</p>
                                <p className="font-bold text-l">&#8377;200</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Delivery Charges</p>
                                <p className="font-bold text-l">&#8377;200</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Discount</p>
                                <p className="font-bold text-l">&#8377;200</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="font-bold">Total Order</p>
                            <p className="font-bold text-l">&#8377;200</p>
                        </div>
                        <div className="flex w-full max-w-sm items-center space-x-2 mt-5">
                            <Input type="text" placeholder="Coupon Code" />
                            <Button className="bg-white text-black border">
                                Apply
                            </Button>
                        </div>
                        <div className="flex justify-end mt-5">
                            <Button>Place Order</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

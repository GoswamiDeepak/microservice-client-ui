'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Coins, CreditCard } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getCustomer } from '@/lib/http/api';
import { Customer } from '@/lib/types';
import AddAddress from './address-model';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
    address: z.string({ required_error: 'Please select an address.' }),
    paymentMode: z.enum(['card', 'cash'], { required_error: 'You need to select a pyament mode type.' }),
    comment: z.any(),
});

const CheckoutForm = () => {
    const customerForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const { data: customer, isLoading } = useQuery<Customer>({
        queryKey: ['acustomer'],
        queryFn: async () => {
            return await getCustomer().then((res) => res.data);
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handlePlaceOrder = (data: z.infer<typeof formSchema>) => {
        //HANDLE THE PLACE ORDER
        console.log('place order', data);
    };

    return (
        <Form {...customerForm}>
            <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
                <div className="container max-w-screen-xl mx-auto py-5">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-8 bg-white rounded-lg p-6">
                            <h3 className="font-bold text-xl">Customer Details</h3>
                            <div className="w-full mt-4">
                                <Label htmlFor="firstname" className="text-[16px] font-semibold">
                                    FirstName
                                </Label>
                                <Input className="mt-2" type="firstname" id="firstname" defaultValue={customer?.firstname} disabled />
                            </div>
                            <div className="w-full mt-4">
                                <Label htmlFor="lastname" className="text-[16px] font-semibold">
                                    Lastname
                                </Label>
                                <Input className="mt-2" type="lastname" id="lastname" defaultValue={customer?.lastname} disabled />
                            </div>
                            <div className="w-full mt-4">
                                <Label htmlFor="email" className="text-[16px] font-semibold">
                                    Email
                                </Label>
                                <Input type="email" id="email" className="mt-2" defaultValue={customer?.email} disabled />
                            </div>
                            <div className="flex justify-between items-center mt-4 w-full">
                                <p className="text-[16px] font-semibold">Address</p>
                                <AddAddress customerId={customer?._id || ''} />
                            </div>
                            <div className="mt-4">
                                <FormField
                                    name="address"
                                    control={customerForm.control}
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <RadioGroup
                                                        // defaultValue=""
                                                        onValueChange={field.onChange}
                                                        // value={}
                                                        className="grid grid-cols-2 gap-6 mt-2">
                                                        {customer?.address?.map((data) => (
                                                            <Card className={``} key={data?.text}>
                                                                <CardContent className="p-4">
                                                                    <div className="flex items-start space-x-2">
                                                                        <FormControl>
                                                                            <RadioGroupItem value={data?.text} id={data?.text} />
                                                                        </FormControl>
                                                                        <Label htmlFor={data?.text}>{data?.text}</Label>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        ))}
                                                    </RadioGroup>
                                                    {/* <AddressList address={customer?.address || []} field={field}  /> */}
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                            <div className="mt-4 ">
                                <p className="text-[16px] font-semibold ">Choose Payment</p>
                                <FormField
                                    control={customerForm.control}
                                    name="paymentMode"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        className="flex gap-4 mt-2"
                                                        // className="grid grid-cols-3 gap-4"
                                                    >
                                                        <div className="w-[100px] h-[50px]">
                                                            <FormControl>
                                                                <RadioGroupItem
                                                                    value="card"
                                                                    id="card"
                                                                    aria-label="Card"
                                                                    className="peer sr-only"
                                                                />
                                                            </FormControl>
                                                            <Label
                                                                htmlFor="card"
                                                                className="text-sm font-medium flex items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary">
                                                                <CreditCard />
                                                                Card
                                                            </Label>
                                                        </div>

                                                        <div className="w-[100px] h-[50px]">
                                                            <FormControl>
                                                                <RadioGroupItem
                                                                    value="cash"
                                                                    id="cash"
                                                                    aria-label="cash"
                                                                    className="peer sr-only"
                                                                />
                                                            </FormControl>
                                                            <Label
                                                                htmlFor="cash"
                                                                className="text-sm font-medium flex items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary">
                                                                <Coins />
                                                                Cash
                                                            </Label>
                                                        </div>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                            <div className="mt-4 ">
                                <p className="text-[16px] font-semibold mb-2">Add Comment</p>
                                <FormField
                                    name="comment"
                                    control={customerForm.control}
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea placeholder="Type your address here." {...field} />
                                                </FormControl>
                                            </FormItem>
                                        );
                                    }}
                                />
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
                                    <Button className="bg-white text-black border">Apply</Button>
                                </div>
                                <div className="flex justify-end mt-5">
                                    <Button>Place Order</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default CheckoutForm;

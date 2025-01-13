'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Coins, CreditCard } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createOrder, getCustomer } from '@/lib/http/api';
import { Customer, Order } from '@/lib/types';
import AddAddress from './address-model';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import OrderSummary from './order-summary';
import { useRef } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { useSearchParams } from 'next/navigation';

// Define the form schema using Zod for validation
const formSchema = z.object({
    address: z.string({ required_error: 'Please select an address.' }), // Address field is required
    paymentMode: z.enum(['card', 'cash'], { required_error: 'You need to select a payment mode type.' }), // Payment mode must be either 'card' or 'cash'
    comment: z.any(), // Comment field is optional and can be any type
});

const CheckoutForm = () => {
    const idempotencyKeyRef = useRef("");

    const searchParams = useSearchParams();

    // Initialize the form using react-hook-form and Zod resolver
    const customerForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    // Fetch cart items from the Redux store
    const cart = useAppSelector((state) => state.cart.cartItem);

    // Ref to store the chosen coupon code
    const chosenCouponCode = useRef("");

    // Fetch customer data using react-query
    const { data: customer, isLoading } = useQuery<Customer>({
        queryKey: ['acustomer'],
        queryFn: async () => {
            return await getCustomer().then((res) => res.data);
        },
    });

    const {mutate, isPending:isOrderPending} = useMutation({
        mutationKey: ['createOrder'],
        mutationFn: async (data:Order) => {
            // const idempotencyKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            // const idempotencyKey = uuidv4() + customer?._id;
            const idempotencyKey = idempotencyKeyRef.current ? idempotencyKeyRef.current : idempotencyKeyRef.current = uuidv4();
            return await createOrder(data, idempotencyKey).then((res) => res.data);
        },
        retry: 3,
        onSuccess: (data) => {
            console.log(data);
        },
    });

    

    // Handler for placing the order
    const handlePlaceOrder = (data: z.infer<typeof formSchema>) => {
        const tenantId = searchParams.get('restaurentId');
        if (!tenantId) {
            alert('Retaurent ID is required!') ; // TODO: change it with toast
            return;
        }
        const orderData = {
            cart: cart,
            couponCode: chosenCouponCode.current ? chosenCouponCode.current : '',
            tenantId: tenantId,
            customerId: customer? customer._id:'',
            comment: data.comment,
            paymentMode: data.paymentMode,
            address: data.address,
        }
        mutate(orderData);
    };

    // Display loading state while fetching customer data
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Form {...customerForm}>
            <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
                <div className="container max-w-screen-xl mx-auto py-5">
                    <div className="grid grid-cols-12 gap-4">
                        {/* Left column for customer details */}
                        <div className="col-span-8 bg-white rounded-lg p-6">
                            <h3 className="font-bold text-xl">Customer Details</h3>

                            {/* First Name Field */}
                            <div className="w-full mt-4">
                                <Label htmlFor="firstname" className="text-[16px] font-semibold">
                                    FirstName
                                </Label>
                                <Input className="mt-2" type="firstname" id="firstname" defaultValue={customer?.firstname} disabled />
                            </div>

                            {/* Last Name Field */}
                            <div className="w-full mt-4">
                                <Label htmlFor="lastname" className="text-[16px] font-semibold">
                                    Lastname
                                </Label>
                                <Input className="mt-2" type="lastname" id="lastname" defaultValue={customer?.lastname} disabled />
                            </div>

                            {/* Email Field */}
                            <div className="w-full mt-4">
                                <Label htmlFor="email" className="text-[16px] font-semibold">
                                    Email
                                </Label>
                                <Input type="email" id="email" className="mt-2" defaultValue={customer?.email} disabled />
                            </div>

                            {/* Address Section */}
                            <div className="flex justify-between items-center mt-4 w-full">
                                <p className="text-[16px] font-semibold">Address</p>
                                {/* Button to add a new address */}
                                <AddAddress customerId={customer?._id || ''} />
                            </div>

                            {/* Address Selection Radio Group */}
                            <div className="mt-4">
                                <FormField
                                    name="address"
                                    control={customerForm.control}
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        className="grid grid-cols-2 gap-6 mt-2"
                                                    >
                                                        {/* Render each address as a radio button option */}
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
                                                </FormControl>
                                                <FormMessage /> {/* Display validation error message */}
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>

                            {/* Payment Mode Selection */}
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
                                                    >
                                                        {/* Card Payment Option */}
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

                                                        {/* Cash Payment Option */}
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
                                                <FormMessage /> {/* Display validation error message */}
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>

                            {/* Comment Section */}
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

                        {/* Right column for Order Summary */}
                        <div className="col-span-4 ">
                            <OrderSummary handleCouponCode={(data) => (chosenCouponCode.current = data)} isOrderPending={isOrderPending} />
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default CheckoutForm;
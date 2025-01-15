import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cookies } from 'next/headers';
import { OrderItem } from '@/lib/types';
import Link from 'next/link';

const OrderPage = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/order/order/mine`, {
        headers: {
            // Authorization: `Bearer ${localStorage.getItem('token')}`
            Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error while fetching orders');
    }
    const orders = (await response.json()) || [];

    return (
        <div className="container max-w-screen-xl mx-auto">
            <Card className="border-none rounded-lg p-6 mt-8">
                <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>My completed order history</CardDescription>
                </CardHeader>
                <CardContent>
                    {orders.length === 0 ? (
                        <span>No order available</span>
                    ) : (
                        <Table>
                            <TableCaption>A list of your recent invoices.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Invoice</TableHead>
                                    <TableHead>Payement Status</TableHead>
                                    <TableHead>Payment Method</TableHead>
                                    <TableHead>Date Time</TableHead>
                                    <TableHead>Order status</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="text-right">Order details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order: OrderItem) => (
                                    <TableRow key={order._id}>
                                        <TableCell className="font-medium">{order._id}</TableCell>
                                        <TableCell>{order.paymentStatus.toUpperCase()}</TableCell>
                                        <TableCell>{order.paymentMode}</TableCell>
                                        <TableCell>{order.createdAt}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{order.orderStatus.toUpperCase()}</Badge>
                                        </TableCell>
                                        <TableCell>${order.total}</TableCell>
                                        <TableCell className="text-right">
                                            <Link className="underline text-primary" href={`/order/${order._id}`}>
                                                more details
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default OrderPage;

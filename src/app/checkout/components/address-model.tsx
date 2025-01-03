import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoaderCircle, Plus } from 'lucide-react';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAddress } from '@/lib/http/api';

const formSchema = z.object({
    address: z
        .string()
        .min(10, {
            message: 'Address must be at least 10 characters.',
        })
        .max(160, {
            message: 'Address must not be longer than 30 characters.',
        }),
});

const AddAddress = ({ customerId }: { customerId: string }) => {
    const [isModelOpen, setIsModelOpen] = useState(false);

    // 1. Define your form.
    const addAddressForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['addAddress', customerId],
        mutationFn: async (address: string) => {
            return await addAddress(customerId, address);
        },
        onSuccess: () => {
            addAddressForm.reset();
            setIsModelOpen(false);
            return queryClient.invalidateQueries({
                queryKey: ['acustomer'],
            });
        },
    });

    const handleAddressAdd = (data: z.infer<typeof formSchema>) => {
        mutate(data.address);
    };
    return (
        <Dialog open={isModelOpen} onOpenChange={setIsModelOpen}>
            <DialogTrigger asChild>
                <Button size={'sm'} variant={'link'}>
                    <Plus size={'16'} />
                    <span className="ml-2">Add New Address</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="gap-0 sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Address</DialogTitle>
                    <DialogDescription>We can save your address for the next time</DialogDescription>
                </DialogHeader>
                <Form {...addAddressForm}>
                    <form onSubmit={addAddressForm.handleSubmit(handleAddressAdd)}>
                        <div className="grid gap-4 py-4">
                            <div>
                                <Label htmlFor="address">Address</Label>
                                <FormField
                                    control={addAddressForm.control}
                                    name="address"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea placeholder="Type your address here." className="mt-2" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">
                                {isPending ? (
                                    <span className="flex items-center gap-2">
                                        <LoaderCircle className="flex items-center gap-2" /> <span>Please wait...</span>
                                    </span>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddAddress;

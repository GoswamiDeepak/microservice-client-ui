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

// Define the form schema using Zod for validation
const formSchema = z.object({
    address: z
        .string()
        .min(10, {
            message: 'Address must be at least 10 characters.', // Minimum length validation
        })
        .max(160, {
            message: 'Address must not be longer than 30 characters.', // Maximum length validation
        }),
});

const AddAddress = ({ customerId }: { customerId: string }) => {
    // State to manage the dialog's open/close state
    const [isModelOpen, setIsModelOpen] = useState(false);

    // Initialize the form using react-hook-form and Zod resolver
    const addAddressForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    // Access the query client to invalidate queries after mutation
    const queryClient = useQueryClient();

    // Mutation to add a new address
    const { mutate, isPending } = useMutation({
        mutationKey: ['addAddress', customerId], // Unique key for the mutation
        mutationFn: async (address: string) => {
            return await addAddress(customerId, address); // Call the API to add the address
        },
        onSuccess: () => {
            // Reset the form and close the dialog on success
            addAddressForm.reset();
            setIsModelOpen(false);
            // Invalidate the customer query to refetch updated data
            return queryClient.invalidateQueries({
                queryKey: ['acustomer'],
            });
        },
    });

    // Handler for adding a new address
    const handleAddressAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation(); // Prevent event bubbling
        return addAddressForm.handleSubmit((data: z.infer<typeof formSchema>) => {
            mutate(data.address); // Trigger the mutation with the address data
        })(e);
    };

    return (
        <Dialog open={isModelOpen} onOpenChange={setIsModelOpen}>
            {/* Trigger button to open the dialog */}
            <DialogTrigger asChild>
                <Button size={'sm'} variant={'link'}>
                    <Plus size={'16'} />
                    <span className="ml-2">Add New Address</span>
                </Button>
            </DialogTrigger>

            {/* Dialog content */}
            <DialogContent className="gap-0 sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Address</DialogTitle>
                    <DialogDescription>We can save your address for the next time</DialogDescription>
                </DialogHeader>
                {/* Form for adding a new address */}
                <Form {...addAddressForm}>
                    <form onSubmit={handleAddressAdd}>
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
                                                    {/* Textarea for entering the address */}
                                                    <Textarea placeholder="Type your address here." className="mt-2" {...field} />
                                                </FormControl>
                                                <FormMessage /> {/* Display validation error messages */}
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {/* Submit button with loading state */}
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
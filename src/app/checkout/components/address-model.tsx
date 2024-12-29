import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const AddressModel = () => {
    return (
        <Dialog>
            <DialogTrigger className="text-[16px] font-semibold text-orange-500 flex items-center">
                <Plus />
                Add New Address
            </DialogTrigger>
            <DialogContent className="gap-0">
                {/* <div></div> */}
                <h3 className="text-xl font-bold mb-0">Add Address</h3>
                <p>We can save your address for the next time</p>
                <h5 className="text-lg mt-5 mb-2">Address</h5>
                <Textarea placeholder="Type your address here." />
                <Button className="mt-4 w-1/4 flex justify-end text-center">
                    Save Changes
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default AddressModel;

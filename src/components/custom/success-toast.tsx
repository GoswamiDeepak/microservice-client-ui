import { CircleCheck } from 'lucide-react';
import React from 'react';

const SuccessToast = () => {
    return (
        <div className="flex items-center gap-2">
            <CircleCheck className="text-green-700" />
            <span className='text-bold'>Added To Cart</span>
        </div>
    );
};

export default SuccessToast;

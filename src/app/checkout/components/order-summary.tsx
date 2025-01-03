import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { verfiyCoupon } from '@/lib/http/api';
import { useAppSelector } from '@/lib/store/hooks';
import { ICouponData } from '@/lib/types';
import { getTotalPrice } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';

const TAX_PERCENTAGE = 5; //move to the backend accouding to product
const DELIVERY_CHARGE = 100;

const OrderSummary = () => {
    const cart = useAppSelector((state) => state.cart.cartItem);

    const searchParams = useSearchParams();

    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [discountError, setDiscountError] = useState('');

    const couponCodeRef = useRef<HTMLInputElement>(null);
    const subTotal = useMemo(() => {
        return cart.reduce((acc, curr) => {
            return acc + curr.qty * getTotalPrice(curr);
        }, 0);
    }, [cart]);

    //calculation discount price
    const discountAmount = useMemo(() => {
        return Math.round((subTotal * Number(discountPercentage)) / 100);
    }, [subTotal, discountPercentage]);

    //calcualtion of tax
    const taxAmount = useMemo(() => {
        const amountAfterDetection = subTotal - discountAmount;
        //todo add tex-percentage in backend
        return Math.round((amountAfterDetection * TAX_PERCENTAGE) / 100);
    }, [subTotal, discountAmount]);

    const grandWithDiscoutTotal = useMemo(() => {
        return subTotal - discountAmount + taxAmount + DELIVERY_CHARGE;
    }, [subTotal, taxAmount, discountAmount]);

    const grandWithOutDiscoutTotal = useMemo(() => {
        return subTotal + taxAmount + DELIVERY_CHARGE;
    }, [subTotal, taxAmount]);

    const { mutate, isError } = useMutation({
        mutationKey: ['addcoupon'],
        mutationFn: async () => {
            if (!couponCodeRef.current?.value) {
                return;
            }
            const restaurentId = searchParams.get('restaurentId');
            if (!restaurentId) {
                return;
            }
            const data: ICouponData = {
                code: couponCodeRef.current.value,
                tenantId: restaurentId,
            };
            return await verfiyCoupon(data).then((res) => res.data);
        },
        onSuccess: (data) => {
            if (data.valid) {
                setDiscountError('');
                setDiscountPercentage(Number(data.discount));
                return;
            }
            setDiscountError('Coupon code is expired!');
        },
    });

    const handleCouponDiscount = (e: React.MouseEvent) => {
        e.preventDefault();
        if (couponCodeRef.current?.value) {
            mutate();
        }
    };

    return (
        <div className="bg-white rounded-lg p-6">
            <h3 className="font-bold text-xl">Order Summary</h3>
            <div className="space-y-2 mt-4 border-b pb-4">
                <div className="flex justify-between items-center">
                    <p>SubTotal</p>
                    <p className="font-bold text-l">&#8377;{subTotal}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p>Taxes</p>
                    <p className="font-bold text-l">&#8377;{taxAmount}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p>Delivery Charges</p>
                    <p className="font-bold text-l">&#8377;{DELIVERY_CHARGE}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p>Discount</p>
                    <p className="font-bold text-l">&#8377;{discountAmount}</p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <p className="font-bold">Total Order</p>
                <p className="font-bold text-l flex flex-col items-end">
                    <span className={`${!!discountAmount && 'line-through text-gray-400'}`}>&#8377;{grandWithOutDiscoutTotal}</span>
                    {!!discountAmount && <span className={` text-green-700`}>&#8377;{grandWithDiscoutTotal}</span>}
                </p>
            </div>

            <div className="flex w-full max-w-sm items-center space-x-2 mt-5">
                <Input id="coupon" name="code" type="text" placeholder="Coupon Code" ref={couponCodeRef} />
                <Button onClick={handleCouponDiscount} variant={'outline'}>
                    Apply
                </Button>
            </div>
            {discountError && <span className="text-red-500 mt-2">{discountError}</span>}
            {isError && <span className="text-red-500  mt-2">Invalid Token!</span>}
            <div className="flex justify-end mt-5">
                <Button>Place Order</Button>
            </div>
        </div>
    );
};

export default OrderSummary;

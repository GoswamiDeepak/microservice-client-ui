import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { verfiyCoupon } from '@/lib/http/api';
import { useAppSelector } from '@/lib/store/hooks';
import { ICouponData } from '@/lib/types';
import { getTotalPrice } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';

// Constants for tax percentage and delivery charge
const TAX_PERCENTAGE = 5; // TODO: Move to the backend according to product
const DELIVERY_CHARGE = 100;

// OrderSummary component that handles order calculations and coupon application
const OrderSummary = ({ handleCouponCode }: { handleCouponCode: (data: string) => void }) => {
    // Fetch cart items from the Redux store
    const cart = useAppSelector((state) => state.cart.cartItem);

    // Get search parameters from the URL
    const searchParams = useSearchParams();

    // State for discount percentage and error messages
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [discountError, setDiscountError] = useState('');

    // Ref for the coupon code input field
    const couponCodeRef = useRef<HTMLInputElement>(null);

    // Calculate subtotal based on cart items
    const subTotal = useMemo(() => {
        return cart.reduce((acc, curr) => {
            return acc + curr.qty * getTotalPrice(curr);
        }, 0);
    }, [cart]);

    // Calculate discount amount based on subtotal and discount percentage
    const discountAmount = useMemo(() => {
        return Math.round((subTotal * Number(discountPercentage)) / 100);
    }, [subTotal, discountPercentage]);

    // Calculate tax amount based on subtotal after discount
    const taxAmount = useMemo(() => {
        const amountAfterDetection = subTotal - discountAmount;
        return Math.round((amountAfterDetection * TAX_PERCENTAGE) / 100);
    }, [subTotal, discountAmount]);

    // Calculate grand total with discount applied
    const grandWithDiscoutTotal = useMemo(() => {
        return subTotal - discountAmount + taxAmount + DELIVERY_CHARGE;
    }, [subTotal, taxAmount, discountAmount]);

    // Calculate grand total without discount
    const grandWithOutDiscoutTotal = useMemo(() => {
        return subTotal + taxAmount + DELIVERY_CHARGE;
    }, [subTotal, taxAmount]);

    // Mutation for applying coupon code
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
                // Apply coupon code and update discount percentage
                handleCouponCode(couponCodeRef.current ? couponCodeRef.current.value : '');
                setDiscountError('');
                setDiscountPercentage(Number(data.discount));
                return;
            }
            // Handle invalid coupon code
            handleCouponCode('');
            setDiscountError('Coupon code is expired!');
        },
    });

    // Handler for applying coupon discount
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
                {/* Display subtotal */}
                <div className="flex justify-between items-center">
                    <p>SubTotal</p>
                    <p className="font-bold text-l">&#8377;{subTotal}</p>
                </div>
                {/* Display taxes */}
                <div className="flex justify-between items-center">
                    <p>Taxes</p>
                    <p className="font-bold text-l">&#8377;{taxAmount}</p>
                </div>
                {/* Display delivery charges */}
                <div className="flex justify-between items-center">
                    <p>Delivery Charges</p>
                    <p className="font-bold text-l">&#8377;{DELIVERY_CHARGE}</p>
                </div>
                {/* Display discount */}
                <div className="flex justify-between items-center">
                    <p>Discount</p>
                    <p className="font-bold text-l">&#8377;{discountAmount}</p>
                </div>
            </div>
            {/* Display total order amount with and without discount */}
            <div className="flex justify-between items-center">
                <p className="font-bold">Total Order</p>
                <p className="font-bold text-l flex flex-col items-end">
                    <span className={`${!!discountAmount && 'line-through text-gray-400'}`}>&#8377;{grandWithOutDiscoutTotal}</span>
                    {!!discountAmount && <span className={` text-green-700`}>&#8377;{grandWithDiscoutTotal}</span>}
                </p>
            </div>

            {/* Coupon code input and apply button */}
            <div className="flex w-full max-w-sm items-center space-x-2 mt-5">
                <Input id="coupon" name="code" type="text" placeholder="Coupon Code" ref={couponCodeRef} />
                <Button onClick={handleCouponDiscount} variant={'outline'}>
                    Apply
                </Button>
            </div>
            {/* Display discount error if any */}
            {discountError && <span className="text-red-500 mt-2">{discountError}</span>}
            {/* Display error if mutation fails */}
            {isError && <span className="text-red-500  mt-2">Invalid Token!</span>}
            {/* Place order button */}
            <div className="flex justify-end mt-5">
                <Button>Place Order</Button>
            </div>
        </div>
    );
};

export default OrderSummary;
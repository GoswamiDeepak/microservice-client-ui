import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/lib/store/hooks';
import { getTotalPrice } from '@/lib/utils';
import { useMemo } from 'react';

const TAX_PERCENTAGE = 5; //move to the backend accouding to product
const DELIVERY_CHARGE = 100;

const OrderSummary = () => {
    const cart = useAppSelector((state) => state.cart.cartItem);
    const [discountPercentage, setDiscountPercentage] = useState(0);

    const subTotal = useMemo(() => {
        return cart.reduce((acc, curr) => {
            return acc + curr.qty * getTotalPrice(curr);
        }, 0);
    }, [cart]);

    //calculation discount price
    const discountAmount = useMemo(() => {
        return Math.round((subTotal * discountPercentage) / 100);
    }, [subTotal, discountPercentage]);

    //calcualtion of tax
    const taxAmount = useMemo(() => {
        const amountAfterDetection = subTotal - discountAmount;
        //todo add tex-percentage in backend
        return Math.round((amountAfterDetection * TAX_PERCENTAGE) / 100);
    }, [subTotal, discountAmount]);

    const grandTotal = useMemo(() => {
        return subTotal - discountAmount + taxAmount + DELIVERY_CHARGE;
    }, [subTotal, taxAmount, discountAmount]);

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
                <p className="font-bold text-l">&#8377;{grandTotal}</p>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-5">
                <Input type="text" placeholder="Coupon Code" />
                <Button className="bg-white text-black border">Apply</Button>
            </div>
            <div className="flex justify-end mt-5">
                <Button>Place Order</Button>
            </div>
        </div>
    );
};

export default OrderSummary;

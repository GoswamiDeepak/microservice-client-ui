import { Card } from '@/components/ui/card';
import CartList from './component/cart-list';

const Cart = () => {
    return (
        <div className="contianer max-w-screen-md mx-auto py-10">
            <h3 className="font-bold text-xl">Shopping Cart</h3>
            <Card className="border-none rounded-lg p-6 mt-6">
                <CartList />
            </Card>
        </div>
    );
};

export default Cart;

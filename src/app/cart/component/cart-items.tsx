
import Photos from '@/components/custom/photos';
import { CartItem, changeQty } from '@/lib/store/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { cartConfig, cartSelectedToppings } from '@/lib/utils';
import QtyChanger from './qty-changer';
import { Button } from '@/components/ui/button';

const CartItems = ({ cart }: { cart: CartItem[] }) => {
    const dispath = useAppDispatch();

    return (
        <>
            {cart.map((item: CartItem) => {
                return (
                    <div
                        className="flex items-center justify-between border-b py-4"
                        key={item._id}>
                        <div className="flex items-center">
                            <Photos
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                            />
                            <div className="ml-4">
                                <h2 className="font-semibold">{item.name}</h2>
                                <p className="text-gray-500 text-sm">
                                    {cartConfig(item)}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {cartSelectedToppings(item)}
                                </p>
                            </div>
                        </div>
                        <QtyChanger
                            handleQtyChange={(data) => {
                                dispath(
                                    changeQty({
                                        hash: item.hash as string,
                                        qty: data,
                                    })
                                );
                            }}>
                            {item.qty}
                        </QtyChanger>

                        <div className="flex items-center">
                            <p className="font-semibold">
                                &#8377; 200
                                {/* {item.price * item.quantity} */}
                            </p>
                            <button className="ml-6 text-gray-500 hover:text-red-500">
                                &times;
                            </button>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default CartItems;

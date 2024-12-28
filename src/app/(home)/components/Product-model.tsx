'use client';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ToppingList from './topping-list';
import { Button } from '@/components/ui/button';
import { ParkingCircleOffIcon, ShoppingCart } from 'lucide-react';
import { Category, Product, Topping } from '@/lib/types';
import Photos from '@/components/custom/photos';
import { startTransition, Suspense, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { addToCart, CartItem } from '@/lib/store/features/cart/cartSlice';
import { hashTheItem } from '@/lib/utils';

type ChoseConfig = {
    [key: string]: string;
};

const ProductModel = ({ product }: { product: Product }) => {
    const dipatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.cartItem);

    const defaultConfiguration = Object.entries(
        product.category.priceConfiguration
    )
        .map(([key, value]) => {
            return { [key]: value.availableOptions[0] };
        })
        .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    const [chosenConfig, setChosenConfig] = useState<ChoseConfig>(
        defaultConfiguration as unknown as ChoseConfig
    );
    const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

    const handleAddToCart = (product: Product) => {
        const itemToAdd: CartItem = {
            _id: product._id,
            name: product.name,
            image: product.image,
            priceConfiguration: product.priceConfiguration,
            chosenConfiguration: {
                priceConfiguration: chosenConfig!,
                selectedToppings: selectedToppings,
            },
            qty: 1,
        };
        dipatch(addToCart(itemToAdd));
    };

    const handleRadioConfig = (key: string, value: string) => {
        setChosenConfig((prev) => ({ ...prev, [key]: value }));
    };

    const handleCheckBox = (topping: Topping) => {
        const isAlreadyExist = selectedToppings.some(
            (element) => element._id === topping._id
        );
        startTransition(() => {
            if (isAlreadyExist) {
                setSelectedToppings((prev) =>
                    prev.filter((elm) => elm._id !== topping._id)
                );
                return;
            }
            setSelectedToppings((prev) => [...prev, topping]);
        });
    };

    const totalPrice = useMemo(() => {
        const toppingTotal = selectedToppings.reduce(
            (acc, curr) => acc + Number(curr.price),
            0
        );
        const configPricing = Object.entries(chosenConfig).reduce(
            (acc, [key, value]) => {
                const price =
                    product.priceConfiguration[key].availableOptions[value];
                return acc + Number(price);
            },
            0
        );
        return toppingTotal + configPricing;
    }, [chosenConfig, selectedToppings, product]);

    const alreadyHasInCart = useMemo(() => {
        const currentConfiguration = {
            _id: product._id,
            name: product.name,
            image: product.image,
            priceConfiguration: product.priceConfiguration,
            chosenConfiguration: {
                priceConfiguration: { ...chosenConfig },
                selectedToppings: selectedToppings,
            },
            qty: 1,
        };
        const hash = hashTheItem(currentConfiguration);
        return cartItems.some((item) => item.hash === hash);
    }, [product, chosenConfig, selectedToppings, cartItems]);

    return (
        <Dialog>
            <DialogTrigger className="bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
                Choose
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0">
                <div className="flex">
                    <div className="w-1/3 bg-white rounded p-8 flex items-center justify-center">
                        {/* <Image alt={product.name} src={product.image} width={450} height={450} /> */}
                        <Photos
                            alt={product.name}
                            src={product.image}
                            width={450}
                            height={450}
                        />
                    </div>
                    <div className="2/3 p-8">
                        <h3 className="text-xl font-bold">{product.name}</h3>
                        <p className="mt-1">{product.description}</p>

                        {Object.entries(
                            (product.category as Category).priceConfiguration
                        ).map(([key, value]) => {
                            return (
                                <div key={key}>
                                    <h4 className="mt-4">
                                        Choose the {key} ({value.priceType})
                                    </h4>
                                    <RadioGroup
                                        onValueChange={(value) =>
                                            handleRadioConfig(key, value)
                                        }
                                        defaultValue={value.availableOptions[0]}
                                        className="grid grid-cols-3 gap-4 mt-2">
                                        {value.availableOptions.map(
                                            (option: string) => {
                                                return (
                                                    <div key={option}>
                                                        <RadioGroupItem
                                                            value={option}
                                                            id={option}
                                                            className="peer sr-only"
                                                            aria-label={option}
                                                        />
                                                        <Label
                                                            htmlFor={option}
                                                            className="flex flex-col items-center justify-between rounded-md border-2  bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]">
                                                            {option}
                                                        </Label>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </RadioGroup>
                                </div>
                            );
                        })}
                        {/* todo:make this condtion dynamic (add hasToppings field in catgory document) */}
                        {product.category.name !== 'Beverages' && (
                            <Suspense fallback={'Loading Toppings...'}>
                                <ToppingList
                                    selectedToppings={selectedToppings}
                                    onHandleCheckBox={handleCheckBox}
                                />
                            </Suspense>
                        )}

                        <div className="flex justify-between items-center mt-12">
                            <span className="font-bold">
                                &#8377;{totalPrice}
                            </span>
                            <Button
                                className={
                                    alreadyHasInCart
                                        ? 'bg-gray-700'
                                        : 'bg-primary'
                                }
                                onClick={() => handleAddToCart(product)}
                                disabled={alreadyHasInCart}>
                                <ShoppingCart size={20} />
                                <span className="ml-2">
                                    {alreadyHasInCart
                                        ? 'Already in cart'
                                        : 'Add to Cart'}
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModel;

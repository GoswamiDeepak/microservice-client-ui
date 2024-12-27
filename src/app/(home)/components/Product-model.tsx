'use client';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ToppingList from './topping-list';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Category, Product, Topping } from '@/lib/types';
import Photos from '@/components/custom/photos';
import { startTransition, Suspense, useState } from 'react';

type ChoseConfig = {
      [key: string]: string;
};

const ProductModel = ({ product }: { product: Product }) => {
      const [chosenConfig, setChosenConfig] = useState<ChoseConfig>({});
      const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

      const handleAddToCart = () => {
            console.log('Add to Cart.....');
      };
      const handleRadioConfig = (key: string, value: string) => {
            setChosenConfig((prev) => ({ ...prev, [key]: value }));
      };
      const handleCheckBox = (topping: Topping) => {
            const isAlreadyExist = selectedToppings.some((element) => element._id === topping._id);
            startTransition(() => {
                  if (isAlreadyExist) {
                        setSelectedToppings((prev) => prev.filter((elm) => elm._id !== topping._id));
                        return;
                  }
                  setSelectedToppings((prev) => [...prev, topping]);
            });
      };
      return (
            <Dialog>
                  <DialogTrigger className="bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
                        Choose
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl p-0">
                        <div className="flex">
                              <div className="w-1/3 bg-white rounded p-8 flex items-center justify-center">
                                    {/* <Image alt={product.name} src={product.image} width={450} height={450} /> */}
                                    <Photos alt={product.name} src={product.image} width={450} height={450} />
                              </div>
                              <div className="2/3 p-8">
                                    <h3 className="text-xl font-bold">{product.name}</h3>
                                    <p className="mt-1">{product.description}</p>

                                    {Object.entries((product.category as Category).priceConfiguration).map(([key, value]) => {
                                          return (
                                                <div key={key}>
                                                      <h4 className="mt-4">
                                                            Choose the {key} ({value.priceType})
                                                      </h4>
                                                      <RadioGroup
                                                            onValueChange={(value) => handleRadioConfig(key, value)}
                                                            defaultValue={value.availableOptions[0]}
                                                            className="grid grid-cols-3 gap-4 mt-2">
                                                            {value.availableOptions.map((option: string) => {
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
                                                            })}
                                                      </RadioGroup>
                                                </div>
                                          );
                                    })}
                                    <Suspense fallback={'Loading Toppings...'}>
                                          <ToppingList selectedToppings={selectedToppings} onHandleCheckBox={handleCheckBox} />
                                    </Suspense>
                                    <div className="flex justify-between items-center mt-12">
                                          <span className="font-bold">&#8377;400</span>
                                          <Button onClick={handleAddToCart}>
                                                <ShoppingCart size={20} />
                                                <span className="ml-2">Add to Cart</span>
                                          </Button>
                                    </div>
                              </div>
                        </div>
                  </DialogContent>
            </Dialog>
      );
};

export default ProductModel;

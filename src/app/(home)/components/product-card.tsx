'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

import { Product } from '@/lib/types';
import ProductModel from './Product-model';

type PropTypes = {
      product: Product;
};
const ProductCard = ({ product }: PropTypes) => {
      const [imgSrc, setImgSrc] = useState(product.image); // remove it when s3 image url is available

      const handleError = () => {
            setImgSrc('/pizza.png'); // Path to your default image
      };
      return (
            <div>
                  <Card className="border-none rounded-xl">
                        <CardHeader className="flex items-center justify-center">
                              <Image
                                    alt="pizza-img"
                                    // src={product.image}
                                    src={imgSrc}
                                    width={150}
                                    height={150}
                                    onError={handleError}
                              />
                        </CardHeader>
                        <CardContent>
                              <h2 className="text-xl font-bold">{product.name}</h2>
                              <p className="mt-2">{product.description}</p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between mt-4">
                              <p>
                                    <span>From </span>
                                    <span className="font-bold">
                                          {/* {product.price} */}
                                          100
                                    </span>
                              </p>
                              <ProductModel product={product} />
                        </CardFooter>
                  </Card>
            </div>
      );
};

export default ProductCard;

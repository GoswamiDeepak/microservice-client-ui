import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category, Product } from '@/lib/types';
import ProductCard from './product-card';

const ProductList = async () => {
      //todo concurrent request -> Promise.all()
      const [categoryResponse, productResponse] = await Promise.all([
            fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
                  next: {
                        revalidate: 3600,
                  },
            }),
            fetch(`${process.env.BACKEND_URL}/api/catalog/products`, {
                  next: {
                        revalidate: 3600,
                  },
            }),
      ]);

      if (!categoryResponse.ok) {
            throw new Error('Failed to fetch Categories!');
      }
      const categories = await categoryResponse.json();

      if (!productResponse.ok) {
            throw new Error('Failed to fetch Products!');
      }
      const products = await productResponse.json();

      return (
            <section>
                  <div className="contianer max-w-screen-xl mx-auto py-12">
                        <Tabs defaultValue={categories[0]._id} className="">
                              <TabsList>
                                    {categories.map((category: Category) => (
                                          <TabsTrigger key={category._id} value={category._id} className="text-md">
                                                {category.name}
                                          </TabsTrigger>
                                    ))}
                              </TabsList>
                              {categories.map((category: Category) => (
                                    <TabsContent key={category._id} value={category._id}>
                                          <div className="grid grid-cols-4 gap-4 mt-6">
                                                {products.data
                                                      .filter(
                                                            (product: Product) =>
                                                                  product.category && (product.category as Category)._id === category._id
                                                      )
                                                      .map((product: Product) => (
                                                            <ProductCard key={product._id} product={product} />
                                                      ))}
                                          </div>
                                    </TabsContent>
                              ))}
                        </Tabs>
                  </div>
            </section>
      );
};

export default ProductList;

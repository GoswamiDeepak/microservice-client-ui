import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import ProductCard from './components/product-card';
import { Category, Product } from '@/lib/types';

export default async function Home() {
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
            })
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
            <>
                  <section className="bg-white">
                        <div className="contianer max-w-screen-xl mx-auto flex items-center justify-between py-24">
                              <div className="text-7xl font-black font-sans leading-2">
                                    <h1>
                                          Saver Delicious Pizza in <br />
                                          <span className="text-primary">Only 45 Mintures!</span>
                                    </h1>
                                    <p className="text-2xl mt-8 max-w-lg leading-sung">
                                          Enjoy a Free Meal if Your Order Takes More Than 45 Mintures!
                                    </p>
                                    <Button className="mt-8 text-lg rounded-full  py-7 px-6 font-bold">Get you pizza now</Button>
                              </div>
                              <div>
                                    <Image alt="pizza" src={'/pizza.png'} width={400} height={400} />
                              </div>
                        </div>
                  </section>
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
                                                      {products.data.filter((product: Product)=> product.category && (product.category as Category)._id === category._id).map((product: Product) => (
                                                            <ProductCard key={product._id} product={product} />
                                                      ))}
                                                </div>
                                          </TabsContent>
                                    ))}
                                   
                              </Tabs>
                        </div>
                  </section>
            </>
      );
}

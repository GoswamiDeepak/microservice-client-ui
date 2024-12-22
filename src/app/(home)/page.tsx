import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import ProductCard, { Product } from './components/product-card';

const products: Product[] = [
      {
            _id: 1,
            name: 'Pizza Margherita',
            description: 'Pizza Marg',
            image: '/pizza.png',
            price: 500,
      },
      {
            _id: 2,
            name: 'Pizza Margherita',
            description: 'Pizza Marg',
            image: '/pizza.png',
            price: 500,
      },
      {
            _id: 3,
            name: 'Pizza Margherita',
            description: 'Pizza Marg',
            image: '/pizza.png',
            price: 500,
      },
      {
            _id: 4,
            name: 'Pizza Margherita',
            description: 'Pizza Marg',
            image: '/pizza.png',
            price: 500,
      },
];

export default function Home() {
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
                              <Tabs defaultValue="pizza" className="">
                                    <TabsList>
                                          <TabsTrigger value="pizza" className="text-md">
                                                Pizza
                                          </TabsTrigger>
                                          <TabsTrigger value="beverage" className="text-md">
                                                Beverage
                                          </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="pizza">
                                          <div className="grid grid-cols-4 gap-4 mt-6">
                                                {products.map((product) => (
                                                      <ProductCard key={product._id} product={product} />
                                                ))}
                                          </div>
                                    </TabsContent>
                                    <TabsContent value="beverage">
                                          <div className="grid grid-cols-4 gap-4 mt-6">
                                                {products.map((product) => (
                                                      <ProductCard key={product._id} product={product} />
                                                ))}
                                          </div>
                                    </TabsContent>
                              </Tabs>
                        </div>
                  </section>
            </>
      );
}

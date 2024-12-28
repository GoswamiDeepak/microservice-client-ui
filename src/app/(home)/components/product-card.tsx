import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Product } from '@/lib/types';
import ProductModel from './Product-model';
import Photos from '@/components/custom/photos';
import { getFromPrice } from '@/lib/utils';

type PropTypes = {
    product: Product;
};
const ProductCard = ({ product }: PropTypes) => {
    return (
        <div>
            <Card className="border-none rounded-xl">
                <CardHeader className="flex items-center justify-center">
                    <Photos
                        alt="pizza-img"
                        src={product.image}
                        width={150}
                        height={150}
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
                            &#8377;
                            {getFromPrice(product)}
                        </span>
                    </p>
                    <ProductModel product={product} />
                </CardFooter>
            </Card>
        </div>
    );
};

export default ProductCard;

import { CartItem } from "../store/features/cart/cartSlice";

export interface Restaurant {
    id: string
    name: string
    address: string
}
export interface PriceConfiguaration {
    [key: string]: {
        priceType: "base" | "aditional";
        availableOptions: string[];
    };
}

export interface Attribute {
    name: string;
    widgetType: "switch" | "radio";
    defaultValue: string;
    availableOptions: string[];
}
export interface Category {
    _id: string;
    name: string;
    priceConfiguration: PriceConfiguaration;
    attributes: Attribute[];
}
export interface ProductAtrribute {
    name: string;
    value: string | boolean;
}

export interface ProductPriceConfiguration {
    [key: string]: {
        priceType: "base" | "aditional";
        availableOptions: {
            [key:string] : number;
        }
    };
}
export interface Product {
    _id: number | string;
    name: string;
    description: string; 
    image: string;
    category: Category;
    status: boolean;
    tenant: Restaurant;
    isPublish: boolean;
    createdAt: string;
    attributes: ProductAtrribute[];
    priceConfiguration: ProductPriceConfiguration;
}
export interface Topping {
    _id: number;
    name: string;
    image: string;
    price: number;
    isAvailable: boolean;
}

export interface Address {
    text: string;
    isDefault: boolean;
}

export interface Customer {
    _id: string;
    firstname: string;
    lastname: string;
    email:string;
    address: Address[]
}

export interface ICouponData {
    code: string;
    tenantId: string;
}

export interface Order {
    cart: CartItem[];
    couponCode: string;
    tenantId: string;
    customerId: string;
    comment: string;
    paymentMode: string;
    address: string;
}

export interface OrderItem {
    _id: string;
    customerId: string;
    total: number;
    discount: number;
    taxes: number;
    deliveryChages: number;
    address:string;
    tenantId: string;
    comment: string;
    paymentMode: string;
    orderStatus: string;
    paymentStatus: string;
    createdAt: string;
}
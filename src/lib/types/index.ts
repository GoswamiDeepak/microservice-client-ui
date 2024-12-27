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
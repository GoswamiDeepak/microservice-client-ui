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
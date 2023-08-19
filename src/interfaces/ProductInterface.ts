export interface Product {
    name: LocalizedString;
    price: number;
    description: LocalizedString;
    category: string;
    image: string;
    quantity: number;
    reduction?: number;
    reductionPercentage?: number;
}

interface LocalizedString {
    [key: string]: string;
}

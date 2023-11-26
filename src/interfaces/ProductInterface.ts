interface LocalizedText {
	fr: string;
	en: string;
	mg: string;

	[key: string]: string;
}

export interface Product {
	_id?: string;
	name: LocalizedText;
	price: number;
	description: LocalizedText;
	category: string;
	image: string | any;
	quantity: number;
	reduction?: null | any;
	reductionPercentage?: null | any;
}

export interface ProductState {
	product: Product;
	onSlide?: boolean;
}
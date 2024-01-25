export interface LinkInterface {
  url: string;
  label: string;
}

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

export interface HomePage {
  title: string;
  description: string;
  image: string;
  productPromo?: Product[] | any;
}

export interface ProductInterface {
  _id: any;
  name: any;
  price: any;
  image: any;
  description: any;
}

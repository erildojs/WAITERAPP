export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imagePath: string;
  ingredients: {
    _id: string;
    name: string;
    icon: string;
  }[]
}
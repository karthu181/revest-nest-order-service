export class Order {
  id:  string | number;
  productId: number | string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped';
}


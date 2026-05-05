export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  restaurant: any;
  client: any;
  items: OrderItem[];
  total: number;
  status: 'created' | 'accepted' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
}
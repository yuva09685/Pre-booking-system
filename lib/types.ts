export type CartItem = {
  menuId: string;
  quantity: number;
};

export type OrderStatus = 'building' | 'checkout' | 'placed' | 'preparing' | 'ready' | 'picked_up';

export interface Order {
  id: string;
  items: CartItem[];
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  status: OrderStatus;
  total: number;
  placedAt: Date;
}

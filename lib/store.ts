import { Order } from './types';

const STORAGE_KEY = 'atchayas_orders';

export const getOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return parsed.map((o: any) => ({ ...o, placedAt: new Date(o.placedAt) }));
  } catch (e) {
    return [];
  }
};

export const saveOrders = (orders: Order[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    window.dispatchEvent(new Event('orders_updated'));
  }
};

export const addOrder = (order: Order) => {
  const orders = getOrders();
  saveOrders([order, ...orders]);
};

export const updateOrderStatus = (orderId: string, status: Order['status']) => {
  const orders = getOrders();
  saveOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
};

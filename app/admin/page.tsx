"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/helpers";
import { getOrders, updateOrderStatus } from "@/lib/store";
import { Order } from "@/lib/types";
import { MENU_ITEMS } from "@/lib/data";
import { ChefHat, CheckSquare, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(getOrders());
    const handleUpdate = () => setOrders(getOrders());
    window.addEventListener('orders_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('orders_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const newOrders = orders.filter(o => o.status === 'placed');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const readyOrders = orders.filter(o => o.status === 'ready');

  // Helper to get menu item details
  const getItemDetails = (menuId: string) => MENU_ITEMS.find(m => m.id === menuId);

  const OrderCard = ({ order, nextStatus, actionText, icon: Icon }: { order: Order, nextStatus: Order['status'], actionText: string, icon: any }) => (
    <div className="bg-white p-6 rounded-[24px] border border-[#e5e0d5] shadow-sm mb-4 transition-transform hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="font-bold text-[#2a2a20] text-lg">#{order.id}</p>
          <p className="text-xs font-bold uppercase tracking-widest text-[#8e8e7a]">{order.placedAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-[#5a5a40]">{order.customer.name}</p>
          <p className="text-xs text-[#8e8e7a]">{order.customer.phone}</p>
        </div>
      </div>
      
      <div className="border-t border-[#f0ede6] py-4 space-y-2">
        {order.items.map((item, i) => {
          const details = getItemDetails(item.menuId);
          return (
            <div key={i} className="flex justify-between text-sm">
              <span className="font-medium text-[#3d3d33]">{item.quantity} × {details?.name || 'Unknown Item'}</span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[#f0ede6] pt-4 flex items-center justify-between mt-2">
        <span className="font-serif font-bold text-[#5a5a40]">{formatCurrency(order.total)}</span>
        <button 
          onClick={() => updateOrderStatus(order.id, nextStatus)}
          className="flex items-center gap-2 bg-[#5a5a40] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#4a4a35] transition-colors shadow-md shadow-[#5a5a40]/20"
        >
          <Icon className="w-4 h-4" />
          {actionText}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans text-[#3d3d33]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2a2a20] rounded-full flex items-center justify-center">
              <span className="text-white font-serif text-xl">K</span>
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight text-[#2a2a20]">
              KITCHEN PANEL
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-[#8e8e7a] hover:text-[#5a5a40] font-bold uppercase tracking-widest text-xs">
              Back to Storefront
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1 */}
          <div className="bg-[#f5f2ed] rounded-[32px] p-6 border border-[#e8e2d8]">
            <div className="flex items-center justify-between mb-6 pl-2">
              <h3 className="font-serif font-bold text-xl text-[#2a2a20]">New Orders</h3>
              <span className="w-8 h-8 rounded-full bg-white text-[#5a5a40] flex items-center justify-center font-bold text-sm shadow-sm">{newOrders.length}</span>
            </div>
            <div>
              {newOrders.map(o => <OrderCard key={o.id} order={o} nextStatus="preparing" actionText="Accept" icon={ChefHat} />)}
              {newOrders.length === 0 && <p className="text-center text-[#8e8e7a] text-sm py-10 font-bold uppercase tracking-widest">No new orders</p>}
            </div>
          </div>

          {/* Column 2 */}
          <div className="bg-[#f5f2ed] rounded-[32px] p-6 border border-[#e8e2d8]">
            <div className="flex items-center justify-between mb-6 pl-2">
              <h3 className="font-serif font-bold text-xl text-[#2a2a20]">Preparing</h3>
              <span className="w-8 h-8 rounded-full bg-white text-[#5a5a40] flex items-center justify-center font-bold text-sm shadow-sm">{preparingOrders.length}</span>
            </div>
            <div>
              {preparingOrders.map(o => <OrderCard key={o.id} order={o} nextStatus="ready" actionText="Ready" icon={CheckSquare} />)}
              {preparingOrders.length === 0 && <p className="text-center text-[#8e8e7a] text-sm py-10 font-bold uppercase tracking-widest">Kitchen clear</p>}
            </div>
          </div>

          {/* Column 3 */}
          <div className="bg-white rounded-[32px] p-6 border border-[#e5e0d5] shadow-sm">
            <div className="flex items-center justify-between mb-6 pl-2">
              <h3 className="font-serif font-bold text-xl text-[#5a5a40]">Ready for Pickup</h3>
              <span className="w-8 h-8 rounded-full bg-[#f5f5f0] text-[#5a5a40] flex items-center justify-center font-bold text-sm">{readyOrders.length}</span>
            </div>
            <div>
              {readyOrders.map(o => <OrderCard key={o.id} order={o} nextStatus="picked_up" actionText="Handed Over" icon={ArrowRight} />)}
              {readyOrders.length === 0 && <p className="text-center text-[#8e8e7a] text-sm py-10 font-bold uppercase tracking-widest">Counter empty</p>}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

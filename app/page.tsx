"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { MenuSection } from "@/components/MenuSection";
import { CheckoutSection } from "@/components/CheckoutSection";
import { OrderTracking } from "@/components/OrderTracking";
import { CartItem, OrderStatus, Order } from "@/lib/types";
import { ShoppingBag } from "lucide-react";
import { addOrder } from "@/lib/store";

export default function App() {
  const [view, setView] = useState<'home' | 'checkout' | 'tracking'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const updateCart = (menuId: string, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.menuId === menuId);
      if (!existing && quantity > 0) {
        return [...prev, { menuId, quantity }];
      }
      if (existing && quantity === 0) {
        return prev.filter(item => item.menuId !== menuId);
      }
      return prev.map(item => item.menuId === menuId ? { ...item, quantity } : item);
    });
  };

  const handleOrderPlace = async (customerData: any) => {
    setIsSubmitting(true);
    // Simulate payment API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newOrder: Order = {
      id: Math.random().toString(36).substring(2, 8).toUpperCase(),
      items: [...cart],
      customer: {
        name: customerData.name,
        phone: customerData.phone,
        email: customerData.email,
      },
      status: 'placed',
      total: customerData.total,
      placedAt: new Date(),
    };
    
    addOrder(newOrder);
    setOrder(newOrder);
    setCart([]); // clear cart
    setIsSubmitting(false);
    setView('tracking');
  };

  const handleReset = () => {
    setView('home');
    setOrder(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans text-[#3d3d33]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => view === 'tracking' ? null : setView('home')}>
            <div className="w-10 h-10 bg-[#5a5a40] rounded-full flex items-center justify-center">
              <span className="text-white font-serif text-xl">A</span>
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight text-[#2a2a20]">
              ATCHAYAS
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {view === 'home' && (
              <button 
                onClick={() => {
                  if (cartCount > 0) setView('checkout');
                }}
                className={`relative p-2 rounded-full transition-colors ${cartCount > 0 ? 'bg-[#f5f5f0] text-[#5a5a40] hover:bg-[#e5e0d5]' : 'text-[#8e8e7a] hover:bg-[#f5f5f0] disabled:opacity-50'}`}
                disabled={cartCount === 0}
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#5a5a40] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            {view === 'checkout' && (
              <span className="font-medium text-[#8e8e7a] uppercase tracking-widest text-sm">Checkout</span>
            )}
            {view === 'tracking' && order && (
              <span className="font-bold px-4 py-1.5 bg-[#f5f5f0] text-[#5a5a40] rounded-full text-[10px] uppercase tracking-widest">
                Order #{order.id}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main>
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              <HeroSection onOrderNow={() => {
                document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
              }} />
              <HowItWorks />
              <MenuSection cart={cart} updateCart={updateCart} />
            </motion.div>
          )}

          {view === 'checkout' && (
            <motion.div 
              key="checkout"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
            >
              <CheckoutSection 
                cart={cart} 
                onBack={() => setView('home')} 
                placeOrder={handleOrderPlace} 
                isSubmitting={isSubmitting}
              />
            </motion.div>
          )}

          {view === 'tracking' && order && (
            <motion.div 
              key="tracking"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <OrderTracking order={order} resetApp={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="h-16 bg-[#f5f2ed] border-t border-[#e5e0d5] mt-20 flex flex-col items-center justify-center gap-2 text-[10px] sm:text-xs text-[#8e8e7a] uppercase tracking-widest px-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-10">
          <span>Atchayas Hotel</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Zero Commission Ordering</span>
          <span className="hidden sm:inline">•</span>
          <Link href="/admin/login" className="hover:text-[#5a5a40] font-bold text-[#5a5a40] cursor-pointer">Kitchen Panel</Link>
          <span className="hidden sm:inline">•</span>
          <span>Support: +91 98765 43210</span>
        </div>
      </footer>

      {/* Floating Checkout Button for Mobile */}
      <AnimatePresence>
        {view === 'home' && cartCount > 0 && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-[#fdfbf7] border-t border-[#e5e0d5] shadow-[0_-10px_40px_rgba(42,42,32,0.1)] z-50 md:hidden"
          >
            <button 
              onClick={() => setView('checkout')}
              className="w-full bg-[#5a5a40] text-white font-bold uppercase tracking-widest text-xs py-4 rounded-2xl flex items-center justify-between px-6 hover:bg-[#4a4a35] transition shadow-lg shadow-[#5a5a40]/20"
            >
              <span>{cartCount} items</span>
              <span className="flex items-center gap-2">Checkout <ShoppingBag className="w-5 h-5" /></span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

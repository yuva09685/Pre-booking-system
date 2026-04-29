"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Order } from "@/lib/types";
import { CheckCircle2, Clock, ChefHat, ShoppingBag, MessageCircle } from "lucide-react";
import { getOrders } from "@/lib/store";

interface OrderTrackingProps {
  order: Order;
  resetApp: () => void;
}

export function OrderTracking({ order, resetApp }: OrderTrackingProps) {
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [showNotification, setShowNotification] = useState(false);

  // Sync order status from local storage
  useEffect(() => {
    const handleUpdate = () => {
      const orders = getOrders();
      const updated = orders.find(o => o.id === order.id);
      
      if (updated && updated.status !== currentStatus) {
        if (updated.status === 'ready' && currentStatus !== 'ready') {
          setShowNotification(true);
        }
        setCurrentStatus(updated.status);
      }
    };

    window.addEventListener('orders_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    // Initial fetch just to be sure
    handleUpdate();

    return () => {
      window.removeEventListener('orders_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [order.id, currentStatus]);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const steps = [
    { id: 'placed', label: 'Order Confirmed', description: 'We have received your order', icon: CheckCircle2 },
    { id: 'preparing', label: 'Preparing', description: 'The kitchen is preparing your fresh meal', icon: ChefHat },
    { id: 'ready', label: 'Ready for Pickup', description: 'Your order is hot and ready at the counter', icon: ShoppingBag },
  ];

  const getStepIndex = (status: string) => {
    return steps.findIndex(s => s.id === status);
  };

  const currentIndex = getStepIndex(currentStatus);

  return (
    <div className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Mock WhatsApp Notification */}
      <motion.div 
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ 
          opacity: showNotification ? 1 : 0, 
          y: showNotification ? 0 : -50,
          scale: showNotification ? 1 : 0.9,
          pointerEvents: showNotification ? 'auto' : 'none'
        }}
        className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#25D366] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-sm w-full"
      >
        <MessageCircle className="w-8 h-8 flex-shrink-0" />
        <div>
          <p className="font-bold text-sm">WhatsApp from Atchayas</p>
          <p className="text-xs opacity-90">Hi {order.customer.name}! Great news, your order #{order.id} is ready for pickup! 🍽️</p>
        </div>
      </motion.div>

      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-[#f5f5f0] text-[#5a5a40] rounded-full mb-6">
          <Clock className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#2a2a20] mb-2">Track Your Order</h2>
        <p className="text-[#8e8e7a] uppercase tracking-widest text-[10px] sm:text-xs font-bold">Order #{order.id}</p>
      </div>

      <div className="bg-[#5a5a40] rounded-[32px] p-8 sm:p-12 shadow-xl border border-[#5a5a40] relative text-white">
        <div className="flex justify-between items-start mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 mb-1 font-bold">Active Order</p>
            <h3 className="text-xl sm:text-2xl font-serif">Order #{order.id}</h3>
          </div>
          <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider">{currentStatus}</span>
        </div>

        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-[11px] sm:left-6 top-3 bottom-0 w-0.5 bg-white/20 z-0"></div>
          
          <div className="space-y-10 relative z-10">
            {steps.map((step, index) => {
              const isActive = index <= currentIndex;
              const isCurrent = index === currentIndex;

              return (
                <div key={step.id} className={`flex gap-6 items-start transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-6 h-6 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-colors duration-500 ${
                    isActive ? (isCurrent ? 'bg-white/30 border-2 border-white' : 'bg-white text-[#5a5a40]') : 'border-2 border-white/30 bg-[#5a5a40]'
                  }`}>
                    {isActive && !isCurrent ? <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6" /> : (isCurrent ? <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white animate-pulse" /> : null)}
                  </div>
                  <div className="-mt-1 sm:mt-1">
                    <h3 className={`text-base sm:text-lg font-bold`}>
                      {step.label}
                    </h3>
                    <p className={`mt-1 text-[10px] sm:text-xs opacity-80 uppercase tracking-widest`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 p-4 bg-white/10 rounded-2xl flex items-center gap-4 border border-white/10">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <span>🔔</span>
          </div>
          <p className="text-[10px] sm:text-xs leading-relaxed opacity-90">
            You will receive a <b>WhatsApp notification</b> and <b>Email</b> when your order is ready for pickup.
          </p>
        </div>

        {currentStatus === 'ready' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <p className="text-white/80 mb-6 text-sm">Come to the pickup counter and show your order number.</p>
            <button 
              onClick={resetApp}
              className="px-8 py-4 bg-white text-[#5a5a40] font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-[#f5f5f0] transition-colors shadow-lg shadow-black/10"
            >
              Order Picked Up (Done)
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

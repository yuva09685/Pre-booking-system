"use client";

import React from "react";
import { motion } from "motion/react";
import { CartItem, OrderStatus } from "@/lib/types";
import { formatCurrency } from "@/lib/helpers";
import { MENU_ITEMS } from "@/lib/data";
import { ArrowRight, Loader2, MessageCircle, Mail } from "lucide-react";

interface CheckoutSectionProps {
  cart: CartItem[];
  placeOrder: (data: any) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export function CheckoutSection({ cart, placeOrder, onBack, isSubmitting }: CheckoutSectionProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: ""
  });

  const orderItems = cart.map(c => ({
    ...c,
    item: MENU_ITEMS.find(m => m.id === c.menuId)!
  }));

  const subtotal = orderItems.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0);
  const taxes = subtotal * 0.05; // 5% GST
  const total = subtotal + taxes;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder({ ...formData, total });
  };

  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <button onClick={onBack} className="text-[#8e8e7a] hover:text-[#5a5a40] mb-8 font-bold flex items-center gap-2 uppercase tracking-widest text-[10px] sm:text-xs">
        &larr; Back to Menu
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-3xl font-serif font-bold text-[#2a2a20] mb-6">Complete Order</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-[#8e8e7a] mb-2 uppercase tracking-widest">Full Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-4 rounded-2xl border border-[#e5e0d5] focus:ring-2 focus:ring-[#5a5a40] focus:border-[#5a5a40] outline-none transition-all bg-[#fdfbf7]"
              />
            </div>
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-[#8e8e7a] mb-2 uppercase tracking-widest">WhatsApp Number</label>
              <div className="relative">
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-4 pl-12 rounded-2xl border border-[#e5e0d5] focus:ring-2 focus:ring-[#5a5a40] focus:border-[#5a5a40] outline-none transition-all bg-[#fdfbf7]"
                />
                <MessageCircle className="w-5 h-5 text-green-600 absolute left-4 top-4" />
              </div>
              <p className="text-xs text-[#8e8e7a] mt-2">We&apos;ll send real-time order updates here.</p>
            </div>
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-[#8e8e7a] mb-2 uppercase tracking-widest">Email Address (Optional)</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-4 pl-12 rounded-2xl border border-[#e5e0d5] focus:ring-2 focus:ring-[#5a5a40] focus:border-[#5a5a40] outline-none transition-all bg-[#fdfbf7]"
                />
                <Mail className="w-5 h-5 text-[#8e8e7a] absolute left-4 top-4" />
              </div>
            </div>

            <div className="bg-[#f5f2ed] p-6 rounded-[24px] border border-[#e8e2d8] mt-8 mb-6">
              <h3 className="font-bold text-[#2a2a20] mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#e5e0d5] cursor-pointer">
                  <input type="radio" name="payment" value="upi" className="w-4 h-4 text-[#5a5a40] focus:ring-[#5a5a40]" defaultChecked />
                  <span className="text-sm font-medium">UPI (GPay, PhonePe, Paytm)</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#e5e0d5] cursor-pointer">
                  <input type="radio" name="payment" value="card" className="w-4 h-4 text-[#5a5a40] focus:ring-[#5a5a40]" />
                  <span className="text-sm font-medium">Credit / Debit Card</span>
                </label>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#5a5a40] text-white rounded-2xl font-bold uppercase tracking-widest text-sm shadow-lg shadow-[#5a5a40]/20 hover:bg-[#4a4a35] transition-colors flex items-center justify-center gap-2 disabled:bg-[#e5e0d5]"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Pay & Confirm Order</>}
            </button>
          </form>
        </motion.div>

        {/* Summary */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-[32px] border border-[#e5e0d5] shadow-sm h-fit sticky top-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[#f5f5f0] flex items-center justify-center text-xs">🛒</span>
            <h3 className="font-serif font-bold text-xl text-[#2a2a20]">Order Summary</h3>
          </div>
          <div className="space-y-3 mb-6 border-b border-[#f0ede6] pb-6">
            {orderItems.map(item => (
              <div key={item.menuId} className="flex justify-between text-sm">
                <span className="text-[#3d3d33]">{item.item.name} &times; {item.quantity}</span>
                <span className="font-medium text-[#2a2a20]">{formatCurrency(item.item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-sm text-[#8e8e7a]">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-[#8e8e7a]">
              <span>Taxes (5%)</span>
              <span>{formatCurrency(taxes)}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center bg-[#fdfbf7] p-4 rounded-2xl border border-[#f0ede6]">
            <span className="text-sm font-bold uppercase tracking-widest text-[#8e8e7a]">Total</span>
            <span className="text-2xl font-serif font-bold text-[#5a5a40]">{formatCurrency(total)}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

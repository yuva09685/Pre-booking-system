"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/lib/data";
import { formatCurrency } from "@/lib/helpers";
import { Plus, Minus } from "lucide-react";
import { CartItem } from "@/lib/types";

interface MenuSectionProps {
  cart: CartItem[];
  updateCart: (menuId: string, quantity: number) => void;
}

export function MenuSection({ cart, updateCart }: MenuSectionProps) {
  const [activeCat, setActiveCat] = useState("All");

  const filteredItems = activeCat === "All" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(i => i.category === activeCat);

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#fdfbf7]" id="menu">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2a2a20] mb-4">Our Menu</h2>
        <p className="text-[#6b6b5a] max-w-2xl mx-auto">
          Freshly prepared and ready for your arrival. Browse our selection and pre-order to skip the line.
        </p>
      </div>

      <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar gap-2 sm:justify-center">
        {MENU_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-[10px] sm:text-xs transition-colors border ${
              activeCat === cat 
                ? "bg-[#5a5a40] text-white border-[#5a5a40] shadow-md" 
                : "bg-[#f5f5f0] text-[#8e8e7a] border-[#e5e0d5] hover:bg-[#e5e0d5]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredItems.map(item => {
            const cartItem = cart.find(c => c.menuId === item.id);
            const qty = cartItem ? cartItem.quantity : 0;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={item.id}
                className="bg-white rounded-[32px] border border-[#e5e0d5] overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col p-2"
              >
                <div className="relative h-48 overflow-hidden rounded-[24px]">
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow text-[#3d3d33]">
                    <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                    {item.isVeg ? 'VEG' : 'NON-VEG'}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="font-bold text-lg font-serif text-[#2a2a20] leading-tight">{item.name}</h3>
                    <span className="font-bold text-[#5a5a40] whitespace-nowrap">{formatCurrency(item.price)}</span>
                  </div>
                  <p className="text-[#8e8e7a] text-xs sm:text-sm mb-6 flex-grow">{item.description}</p>
                  
                  <div className="mt-auto">
                    {qty > 0 ? (
                      <div className="flex items-center justify-between bg-[#fdfbf7] border border-[#f0ede6] rounded-2xl p-1">
                        <button 
                          onClick={() => updateCart(item.id, qty - 1)}
                          className="w-10 h-10 flex items-center justify-center bg-white border border-[#e5e0d5] text-[#5a5a40] rounded-xl shadow-sm hover:bg-[#f5f5f0] transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-[#2a2a20] w-12 text-center">{qty}</span>
                        <button 
                          onClick={() => updateCart(item.id, qty + 1)}
                          className="w-10 h-10 flex items-center justify-center bg-[#5a5a40] text-white rounded-xl shadow-sm hover:bg-[#4a4a35] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => updateCart(item.id, 1)}
                        className="w-full py-3 bg-[#fdfbf7] border border-[#e5e0d5] text-[#3d3d33] font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-[#f5f5f0] transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Add to Order
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

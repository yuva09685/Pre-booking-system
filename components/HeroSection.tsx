import React from "react";
import Image from "next/image";
import { ShoppingBag, ChefHat, Clock } from "lucide-react";

export function HeroSection({ onOrderNow }: { onOrderNow: () => void }) {
  return (
    <div className="relative overflow-hidden pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#f5f2ed] p-8 sm:p-12 lg:p-16 rounded-[32px] border border-[#e8e2d8] grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#2a2a20] leading-tight mb-6">
              Skip the Queue,<br/>
              <span className="text-[#5a5a40]">Direct from Kitchen.</span>
            </h1>
            <p className="text-lg text-[#6b6b5a] mb-8 max-w-lg leading-relaxed">
              Pre-order directly from Atchayas and pick up when it&apos;s hot and ready. 
              Say goodbye to third-party commissions and long waiting lines.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                onClick={onOrderNow}
                className="px-8 py-4 bg-[#5a5a40] hover:bg-[#4a4a35] text-white rounded-2xl font-bold uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#5a5a40]/20"
              >
                <ShoppingBag className="w-5 h-5" />
                Start Pre-Ordering
              </button>
            </div>

            <div className="flex items-center gap-8 text-[10px] sm:text-xs text-[#8e8e7a] font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-[#5a5a40]" />
                <span>Zero Commissions</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#5a5a40]" />
                <span>Instant Updates</span>
              </div>
            </div>
          </div>
          
            <div className="relative rounded-[24px] overflow-hidden shadow-xl lg:transform lg:rotate-2 hover:rotate-0 transition-transform duration-500 h-[400px] lg:h-[500px] border border-[#e5e0d5]">
              <Image 
                src="/menu-images/restaurant.png" 
                alt="Restaurant interior" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-[24px] shadow-lg w-full max-w-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f5f5f0] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#5a5a40]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2a2a20]">Your order is ready!</p>
                  <p className="text-xs text-[#8e8e7a]">Pick it up at the counter.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

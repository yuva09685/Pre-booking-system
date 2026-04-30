import React from "react";
import { Smartphone, ChefHat, Bell, CheckCircle, ArrowRight, Clock, Wallet, CreditCard, RefreshCw, Shield } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2a2a20] mb-4">
            How Our Pre-Booking Works
          </h2>
          <p className="text-[#6b6b5a] max-w-2xl mx-auto leading-relaxed text-lg">
            Skip the queue. Order ahead on our app and pick up fresh food when you arrive - online payment only, zero extra charges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#f5f2ed] p-6 rounded-2xl border border-[#e8e2d8]">
            <div className="w-12 h-12 bg-[#5a5a40] rounded-xl flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2a2a20] mb-2">1. Order on App</h3>
            <p className="text-sm text-[#6b6b5a]">
              Browse our menu on this app, select items, and enter your phone number and email for notifications.
            </p>
          </div>

          <div className="flex items-center justify-center md:hidden mb-4">
            <ArrowRight className="w-6 h-6 text-[#8e8e7a]" />
          </div>

          <div className="bg-[#f5f2ed] p-6 rounded-2xl border border-[#e8e2d8]">
            <div className="w-12 h-12 bg-[#5a5a40] rounded-xl flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2a2a20] mb-2">2. Pay Online</h3>
            <p className="text-sm text-[#6b6b5a]">
              Complete payment online to confirm your order. Orders are confirmed only after successful payment.
            </p>
          </div>

          <div className="flex items-center justify-center md:hidden mb-4">
            <ArrowRight className="w-6 h-6 text-[#8e8e7a]" />
          </div>

          <div className="bg-[#f5f2ed] p-6 rounded-2xl border border-[#e8e2d8]">
            <div className="w-12 h-12 bg-[#5a5a40] rounded-xl flex items-center justify-center mb-4">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2a2a20] mb-2">3. We Prepare</h3>
            <p className="text-sm text-[#6b6b5a]">
              Kitchen receives your order instantly and begins preparing your food right away for maximum freshness.
            </p>
          </div>

          <div className="flex items-center justify-center md:hidden mb-4">
            <ArrowRight className="w-6 h-6 text-[#8e8e7a]" />
          </div>

          <div className="bg-[#f5f2ed] p-6 rounded-2xl border border-[#e8e2d8]">
            <div className="w-12 h-12 bg-[#5a5a40] rounded-xl flex items-center justify-center mb-4">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2a2a20] mb-2">4. Get Notified & Pick Up</h3>
            <p className="text-sm text-[#6b6b5a]">
              Receive WhatsApp and email updates when ready. Visit counter, show order number, and collect your food.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-[#f5f2ed] rounded-[32px] p-8 sm:p-12 border border-[#e8e2d8]">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2a2a20] mb-8 text-center">
            Important Payment & Refund Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#e5e0d5]">
              <div className="w-12 h-12 bg-[#5a5a40] rounded-xl flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <p className="font-bold text-[#2a2a20] text-lg mb-2">Online Payment Only</p>
              <p className="text-sm text-[#6b6b5a]">
                Your order is confirmed only after successful online payment.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#e5e0d5]">
              <div className="w-12 h-12 bg-[#5a5a40] rounded-xl flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <p className="font-bold text-[#2a2a20] text-lg mb-2">Easy Refunds</p>
              <p className="text-sm text-[#6b6b5a]">
                Cancel anytime before preparation. We refund to your original payment method within 2 business days in most cases.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#e5e0d5]">
              <div className="w-12 h-12 bg-[#5a5a40] rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <p className="font-bold text-[#2a2a20] text-lg mb-2">Refund Exceptions</p>
              <p className="text-sm text-[#6b6b5a]">
                Once preparation begins, cancellations are not accepted. Some items may be non-refundable - these are clearly marked on the menu.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-[#2a2a20] rounded-[32px] p-8 sm:p-12">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-8 text-center">
            We Help You in Two Important Ways
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 p-8 rounded-2xl border border-white/20">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <Wallet className="w-7 h-7 text-white" />
              </div>
              <p className="font-bold text-white text-xl mb-3">Save Money</p>
              <p className="text-white/80 text-base">
                We cut out the middleman. No third-party delivery apps means no commission fees - you pay only the menu price. Your order cost stays exactly as listed with zero extra charges.
              </p>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl border border-white/20">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <p className="font-bold text-white text-xl mb-3">Save Precious Time</p>
              <p className="text-white/80 text-base">
                No more standing in long queues. Order ahead from anywhere - your food will be ready the moment you arrive. Walk in, pick up, and leave. It is that simple.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-[#6b6b5a] font-medium">
            Order now and experience the difference - simply select Start Pre-Ordering above
          </p>
        </div>
      </div>
    </section>
  );
}
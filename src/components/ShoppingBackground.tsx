"use client";

import { CreditCard, Gift, Percent, Sparkles, Star, ShoppingBag, Tag } from 'lucide-react';

export function ShoppingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20 select-none">
      {/* Shopping Bag - Top Right */}
      <div className="absolute top-10 right-10 animate-float" style={{ animationDelay: '0s' }}>
        <ShoppingBag className="w-24 h-24 text-white/40 rotate-12" />
      </div>

      {/* Price Tag - Top Left */}
      <div className="absolute top-20 left-10 animate-float" style={{ animationDelay: '1.5s' }}>
        <Tag className="w-16 h-16 text-white/30 -rotate-12" />
      </div>

      {/* Credit Card - Middle Right */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 animate-float" style={{ animationDelay: '3s' }}>
        <CreditCard className="w-20 h-20 text-white/30 rotate-6" />
      </div>

      {/* Gift Box - Bottom Left */}
      <div className="absolute bottom-32 left-8 animate-float" style={{ animationDelay: '4.5s' }}>
        <Gift className="w-20 h-20 text-white/40 -rotate-12" />
      </div>

      {/* Percent Symbol - Bottom Right */}
      <div className="absolute bottom-20 right-12 animate-float" style={{ animationDelay: '2s' }}>
        <Percent className="w-16 h-16 text-white/40 rotate-12" />
      </div>

      {/* Stars & Sparkles */}
      <div className="absolute top-1/3 left-1/4 animate-pulse">
        <Star className="w-8 h-8 text-yellow-200/40 fill-yellow-200/40" />
      </div>
      
      <div className="absolute top-1/2 left-1/2 animate-ping" style={{ animationDelay: '1s' }}>
        <div className="w-2 h-2 bg-white/40 rounded-full" />
      </div>

      <div className="absolute bottom-1/4 right-1/3 animate-pulse" style={{ animationDelay: '2.5s' }}>
        <Sparkles className="w-10 h-10 text-white/40" />
      </div>

      <div className="absolute top-1/4 left-1/2 animate-ping" style={{ animationDelay: '3.5s' }}>
        <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
      </div>
    </div>
  );
}


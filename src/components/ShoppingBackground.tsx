"use client";

import { CreditCard, Gift, Percent, Sparkles, Star } from 'lucide-react';

export function ShoppingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-10 select-none">
      {/* Credit Card - Middle Right */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 animate-float" style={{ animationDelay: '0s' }}>
        <CreditCard className="w-24 h-24 text-purple-600 rotate-12" />
      </div>

      {/* Gift Box - Bottom Left */}
      <div className="absolute bottom-20 left-8 animate-float" style={{ animationDelay: '1s' }}>
        <Gift className="w-20 h-20 text-blue-600 -rotate-12" />
      </div>

      {/* Percent Symbol - Bottom Right */}
      <div className="absolute bottom-32 right-12 animate-float" style={{ animationDelay: '2s' }}>
        <Percent className="w-16 h-16 text-purple-500 rotate-6" />
      </div>

      {/* Sparkles - Various Positions */}
      <div className="absolute top-20 right-20 animate-pulse" style={{ animationDelay: '0.5s' }}>
        <Sparkles className="w-8 h-8 text-yellow-400" />
      </div>
      
      <div className="absolute top-1/3 left-10 animate-ping" style={{ animationDelay: '1.5s' }}>
        <div className="w-3 h-3 bg-blue-400 rounded-full" />
      </div>

      <div className="absolute bottom-1/4 left-1/4 animate-pulse" style={{ animationDelay: '2.5s' }}>
        <Star className="w-6 h-6 text-purple-400 fill-purple-400" />
      </div>

      <div className="absolute top-1/4 right-1/3 animate-ping" style={{ animationDelay: '3.5s' }}>
        <div className="w-2 h-2 bg-purple-400 rounded-full" />
      </div>

      <div className="absolute bottom-1/2 left-1/2 animate-float" style={{ animationDelay: '4s' }}>
        <Sparkles className="w-10 h-10 text-blue-300" />
      </div>
    </div>
  );
}


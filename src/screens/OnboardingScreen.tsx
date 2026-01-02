import { ShoppingBag, Search, Bell, Zap, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ShoppingBackground } from '../components/ShoppingBackground';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find products across Shopee, Lazada & Amazon instantly',
    },
    {
      icon: Bell,
      title: 'Price Alerts',
      description: 'Get notified when prices drop on items you love',
    },
    {
      icon: Zap,
      title: 'Best Deals',
      description: 'AI-powered recommendations for the best prices',
    },
    {
      icon: Shield,
      title: 'Secure Checkout',
      description: 'Safe and protected purchase confirmations',
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 relative overflow-hidden">
      <ShoppingBackground />
      
      {/* Logo & Title */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-white safe-area-inset-top relative z-10">
        <div className="w-28 h-28 bg-white rounded-md-xl flex items-center justify-center mb-8 elevation-4 rotate-3 border-4 border-white/30">
          <ShoppingBag className="w-16 h-16 text-blue-600" />
        </div>
        
        <h1 className="text-4xl text-center font-black mb-4 tracking-tight leading-tight uppercase">
          AI Shopping<br/>Concierge
        </h1>
        <p className="text-white/80 text-center mb-12 max-w-sm font-medium tracking-wide">
          Your personal assistant for smarter shopping across multiple platforms
        </p>

        {/* Features */}
        <div className="w-full max-w-md space-y-4 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-md-xl p-4 flex items-center gap-5 border border-white/10 elevation-1"
              >
                <div className="w-12 h-12 bg-white/20 rounded-md-m flex items-center justify-center flex-shrink-0 elevation-1">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm uppercase tracking-widest mb-0.5">{feature.title}</h3>
                  <p className="text-white/70 text-xs font-medium">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sign In Button */}
      <div className="px-8 pb-12 safe-area-inset-bottom relative z-10">
        <Button
          onClick={onComplete}
          className="w-full bg-white text-blue-600 hover:bg-white/90 h-16 rounded-md-full text-lg font-black shadow-xl flex items-center justify-center gap-4 transition-all active:scale-95 elevation-2 state-layer uppercase tracking-widest border-b-4 border-blue-200"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </Button>
        
        <p className="text-center text-white/50 text-[9px] mt-6 font-black uppercase tracking-[0.2em]">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}


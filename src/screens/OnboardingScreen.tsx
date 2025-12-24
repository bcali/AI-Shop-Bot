import { ShoppingBag, Search, Bell, Zap, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';

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
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600">
      {/* Logo & Title */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-white safe-area-inset-top">
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
          <ShoppingBag className="w-14 h-14 text-purple-600" />
        </div>
        
        <h1 className="text-3xl text-center font-bold mb-3">
          AI Shopping Concierge
        </h1>
        <p className="text-purple-100 text-center mb-12 max-w-sm">
          Your personal assistant for smarter shopping across multiple platforms
        </p>

        {/* Features */}
        <div className="w-full max-w-md space-y-4 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                  <p className="text-purple-100 text-sm">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sign In Button */}
      <div className="px-6 pb-8 safe-area-inset-bottom">
        <Button
          onClick={onComplete}
          className="w-full bg-white text-purple-600 hover:bg-gray-100 h-14 rounded-2xl text-lg font-bold shadow-xl flex items-center justify-center gap-3"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </Button>
        
        <p className="text-center text-white/80 text-[10px] mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}


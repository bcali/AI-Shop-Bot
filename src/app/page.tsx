"use client";

import { useState } from 'react';
import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { ChatScreen } from '@/screens/ChatScreen';
import { DealsScreen, DealAlert } from '@/screens/DealsScreen';
import { DealDetailScreen } from '@/screens/DealDetailScreen';
import { HistoryScreen, HistoryItem } from '@/screens/HistoryScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { BottomNav } from '@/components/BottomNav';
import { Product } from '@/components/ProductCard';
import { ShoppingBackground } from '@/components/ShoppingBackground';

type Screen = 'onboarding' | 'chat' | 'deals' | 'deal-detail' | 'history' | 'profile';
type Tab = 'chat' | 'deals' | 'history';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Deal alerts state
  const [deals, setDeals] = useState<DealAlert[]>([
    {
      id: '1',
      product: {
        id: 's1',
        name: 'iPhone 15 Pro Max 256GB Natural Titanium',
        price: 1199.00,
        originalPrice: 1299.00,
        platform: 'shopee',
        rating: 4.9,
        reviews: 3421,
        image: 'https://images.unsplash.com/photo-1741061963569-9d0ef54d10d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlfGVufDF8fHx8MTc2NjUwOTIxOXww&ixlib=rb-4.1.0&q=80&w=1080',
        shipping: 'Free Shipping',
        inStock: true,
        priceChange: 'down',
        priceChangePercent: 8,
      },
      targetPrice: 1150.00,
      createdAt: 'Dec 20, 2024',
      priceHistory: [
        { date: '12/18', price: 1299 },
        { date: '12/19', price: 1249 },
        { date: '12/20', price: 1229 },
        { date: '12/21', price: 1199 },
        { date: '12/22', price: 1199 },
      ],
      isActive: true,
      triggered: false,
    },
    {
      id: '2',
      product: {
        id: 'h1',
        name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        price: 348.00,
        originalPrice: 399.99,
        platform: 'amazon',
        rating: 4.8,
        reviews: 2341,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY2NTQzOTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        shipping: 'Free Shipping',
        inStock: true,
        priceChange: 'down',
        priceChangePercent: 5,
      },
      targetPrice: 350.00,
      createdAt: 'Dec 22, 2024',
      priceHistory: [
        { date: '12/18', price: 399.99 },
        { date: '12/19', price: 379.99 },
        { date: '12/20', price: 365.00 },
        { date: '12/21', price: 355.00 },
        { date: '12/22', price: 348.00 },
      ],
      isActive: true,
      triggered: true,
    },
  ]);
  
  const [selectedDeal, setSelectedDeal] = useState<DealAlert | null>(null);
  
  // History state
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      type: 'purchase',
      date: 'Today',
      time: '2:30 PM',
      product: {
        id: 'w1',
        name: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum',
        price: 429.00,
        originalPrice: 499.00,
        platform: 'amazon',
        rating: 4.7,
        reviews: 1832,
        image: 'https://images.unsplash.com/photo-1532435109783-fdb8a2be0baa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwZml0bmVzc3xlbnwxfHx8fDE3NjY1MjQ4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        shipping: 'Free Shipping',
        inStock: true,
      },
      total: 429.00,
      status: 'completed',
    },
    {
      id: '2',
      type: 'alert',
      date: 'Today',
      time: '10:15 AM',
      product: {
        id: 'h1',
        name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        price: 348.00,
        originalPrice: 399.99,
        platform: 'amazon',
        rating: 4.8,
        reviews: 2341,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY2NTQzOTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        shipping: 'Free Shipping',
        inStock: true,
      },
    },
    {
      id: '3',
      type: 'search',
      date: 'Yesterday',
      time: '5:45 PM',
      query: 'wireless headphones',
    },
  ]);

  const unreadDeals = deals.filter((d) => d.triggered).length;

  const handleCompleteOnboarding = () => {
    setIsAuthenticated(true);
    setCurrentScreen('chat');
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setCurrentScreen(tab);
  };

  const handleSelectDeal = (deal: DealAlert) => {
    setSelectedDeal(deal);
    setCurrentScreen('deal-detail');
  };

  const handleBackFromDealDetail = () => {
    setSelectedDeal(null);
    setCurrentScreen('deals');
  };

  const handleDisableAlert = (dealId: string) => {
    setDeals((prev) =>
      prev.map((deal) =>
        deal.id === dealId ? { ...deal, isActive: false } : deal
      )
    );
    setCurrentScreen('deals');
    setSelectedDeal(null);
  };

  const handleBuyFromDeal = (deal: DealAlert) => {
    // Add to history
    const newHistoryItem: HistoryItem = {
      id: Date.now().toString(),
      type: 'purchase',
      date: 'Today',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      product: deal.product,
      total: deal.product.price,
      status: 'completed',
    };
    
    setHistory((prev) => [newHistoryItem, ...prev]);
    
    // Disable the alert
    handleDisableAlert(deal.id);
    
    // Navigate to chat
    setActiveTab('chat');
    setCurrentScreen('chat');
  };

  const handlePurchase = (product: Product) => {
    const newHistoryItem: HistoryItem = {
      id: Date.now().toString(),
      type: 'purchase',
      date: 'Today',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      product,
      total: product.price + (product.shipping === 'Free Shipping' ? 0 : 3.99),
      status: 'completed',
    };
    
    setHistory((prev) => [newHistoryItem, ...prev]);
  };

  const handleMonitor = (product: Product) => {
    // Create a new deal alert
    const newDeal: DealAlert = {
      id: Date.now().toString(),
      product,
      targetPrice: product.price * 0.9,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      priceHistory: [
        { date: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }), price: product.price },
      ],
      isActive: true,
      triggered: false,
    };
    
    setDeals((prev) => [newDeal, ...prev]);
    
    const newHistoryItem: HistoryItem = {
      id: Date.now().toString(),
      type: 'alert',
      date: 'Today',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      product,
    };
    
    setHistory((prev) => [newHistoryItem, ...prev]);
  };

  const handleOpenProfile = () => {
    setCurrentScreen('profile');
  };

  const handleBackFromProfile = () => {
    setCurrentScreen(activeTab);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('onboarding');
    setActiveTab('chat');
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    console.log('Selected history item:', item);
  };

  // Render current screen
  const renderScreen = () => {
    if (!isAuthenticated) {
      return <OnboardingScreen onComplete={handleCompleteOnboarding} />;
    }

    switch (currentScreen) {
      case 'chat':
        return (
          <ChatScreen
            onPurchase={handlePurchase}
            onMonitor={handleMonitor}
            onOpenProfile={handleOpenProfile}
          />
        );
      case 'deals':
        return <DealsScreen deals={deals} onSelectDeal={handleSelectDeal} />;
      case 'deal-detail':
        return selectedDeal ? (
          <DealDetailScreen
            deal={selectedDeal}
            onBack={handleBackFromDealDetail}
            onDisableAlert={handleDisableAlert}
            onBuyNow={handleBuyFromDeal}
          />
        ) : null;
      case 'history':
        return <HistoryScreen history={history} onSelectItem={handleSelectHistoryItem} />;
      case 'profile':
        return <ProfileScreen onBack={handleBackFromProfile} onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  const showBottomNav = isAuthenticated && currentScreen !== 'deal-detail' && currentScreen !== 'profile';

  return (
    <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto shadow-xl overflow-hidden relative border-x border-gray-200">
      <ShoppingBackground />
      <div className="flex-1 overflow-hidden relative z-10">
        {renderScreen()}
      </div>
      
      {showBottomNav && (
        <BottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
          unreadDeals={unreadDeals}
        />
      )}
    </div>
  );
}

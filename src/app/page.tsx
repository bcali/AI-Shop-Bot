"use client";

import { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Menu, Bell } from 'lucide-react';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { ProductCard, Product } from '@/components/ProductCard';
import { PriceComparison } from '@/components/PriceComparison';
import { PurchaseConfirmation } from '@/components/PurchaseConfirmation';
import { QuickActions } from '@/components/QuickActions';
import { TypingIndicator } from '@/components/TypingIndicator';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  products?: Product[];
  comparison?: Product[];
  confirmation?: Product;
}

// Mock product data
const mockProducts: Record<string, Product[]> = {
  headphones: [
    {
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
    {
      id: 'h2',
      name: 'Sony WH-1000XM5 Premium Noise Cancelling',
      price: 365.90,
      originalPrice: 399.99,
      platform: 'shopee',
      rating: 4.7,
      reviews: 891,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY2NTQzOTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      shipping: 'Free Shipping',
      inStock: true,
    },
    {
      id: 'h3',
      name: 'Sony WH-1000XM5 Wireless Headphones Black',
      price: 359.00,
      originalPrice: 399.99,
      platform: 'lazada',
      rating: 4.6,
      reviews: 534,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY2NTQzOTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      shipping: 'Free Shipping',
      inStock: true,
    },
  ],
  laptop: [
    {
      id: 'l1',
      name: 'MacBook Pro 14" M3 Chip 16GB RAM 512GB SSD',
      price: 1899.00,
      platform: 'amazon',
      rating: 4.9,
      reviews: 1523,
      image: 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjY0OTAwODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      shipping: 'Free Shipping',
      inStock: true,
    },
  ],
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm your AI Shopping Concierge. I can help you search products, compare prices across Shopee, Lazada, and Amazon, set price alerts, and confirm purchases. What are you looking for today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const formatTime = () => {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const simulateTyping = (callback: () => void, delay = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleSendMessage = (text: string) => {
    setShowQuickActions(false);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: formatTime(),
    };

    setMessages((prev) => [...prev, userMessage]);

    simulateTyping(() => {
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('headphone') || lowerText.includes('wireless')) {
        handleProductSearch('headphones');
      } else if (lowerText.includes('laptop') || lowerText.includes('macbook')) {
        handleProductSearch('laptop');
      } else if (lowerText.includes('compare')) {
        handlePriceComparison();
      } else {
        const aiMessage: Message = {
          id: Date.now().toString(),
          text: "I can help you search for products, compare prices, or set alerts. Try asking for 'wireless headphones' or 'compare prices'.",
          isUser: false,
          timestamp: formatTime(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    });
  };

  const handleProductSearch = (category: keyof typeof mockProducts) => {
    const products = mockProducts[category];
    const aiMessage: Message = {
      id: Date.now().toString(),
      text: `I found ${products.length} results for your search. Here are the best options:`,
      isUser: false,
      timestamp: formatTime(),
      products,
    };
    setMessages((prev) => [...prev, aiMessage]);
  };

  const handlePriceComparison = () => {
    const products = mockProducts.headphones;
    const aiMessage: Message = {
      id: Date.now().toString(),
      text: "Here's a price comparison for the Sony WH-1000XM5. Amazon currently has the best price!",
      isUser: false,
      timestamp: formatTime(),
      comparison: products,
    };
    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleBuyProduct = (product: Product) => {
    const aiMessage: Message = {
      id: Date.now().toString(),
      text: `Great choice! Please review your purchase details:`,
      isUser: false,
      timestamp: formatTime(),
      confirmation: product,
    };
    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleMonitorProduct = (product: Product) => {
    const aiMessage: Message = {
      id: Date.now().toString(),
      text: `✅ Price alert set for "${product.name}"! I'll notify you of any price drops.`,
      isUser: false,
      timestamp: formatTime(),
    };
    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleConfirmPurchase = (product: Product) => {
    const aiMessage: Message = {
      id: Date.now().toString(),
      text: `🎉 Purchase confirmed! Your order for ${product.name} has been placed. Is there anything else I can help you with?`,
      isUser: false,
      timestamp: formatTime(),
    };
    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleCancelPurchase = () => {
    const aiMessage: Message = {
      id: Date.now().toString(),
      text: "No problem! The purchase has been cancelled.",
      isUser: false,
      timestamp: formatTime(),
    };
    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleSelectProduct = (product: Product) => {
    const aiMessage: Message = {
      id: Date.now().toString(),
      text: `Would you like to proceed with this purchase?`,
      isUser: false,
      timestamp: formatTime(),
      confirmation: product,
    };
    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto shadow-xl overflow-hidden relative border-x border-gray-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-4 flex items-center justify-between shadow-lg z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Shopping Concierge</h1>
            <p className="text-[10px] text-purple-100 uppercase tracking-wider font-semibold">AI Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white/50"
      >
        {messages.map((message) => (
          <div key={message.id}>
            <ChatMessage
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
            
            {message.products && (
              <div className="grid grid-cols-1 gap-3 mb-4 ml-11">
                {message.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onBuy={() => handleBuyProduct(product)}
                    onMonitor={() => handleMonitorProduct(product)}
                  />
                ))}
              </div>
            )}

            {message.comparison && (
              <div className="ml-11 mb-4">
                <PriceComparison
                  products={message.comparison}
                  onSelectProduct={handleSelectProduct}
                />
              </div>
            )}

            {message.confirmation && (
              <div className="ml-11 mb-4">
                <PurchaseConfirmation
                  product={message.confirmation}
                  onConfirm={() => handleConfirmPurchase(message.confirmation!)}
                  onCancel={handleCancelPurchase}
                />
              </div>
            )}
          </div>
        ))}

        {isTyping && <TypingIndicator />}
        
        {showQuickActions && !isTyping && messages.length === 1 && (
          <QuickActions onActionClick={handleSendMessage} />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <ChatInput onSend={handleSendMessage} disabled={isTyping} />
    </div>
  );
}

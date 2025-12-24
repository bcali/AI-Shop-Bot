import { MessageCircle, Bell, History } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'chat' | 'deals' | 'history';
  onTabChange: (tab: 'chat' | 'deals' | 'history') => void;
  unreadDeals?: number;
}

export function BottomNav({ activeTab, onTabChange, unreadDeals = 0 }: BottomNavProps) {
  const tabs = [
    { id: 'chat' as const, icon: MessageCircle, label: 'Chat' },
    { id: 'deals' as const, icon: Bell, label: 'Alerts', badge: unreadDeals },
    { id: 'history' as const, icon: History, label: 'History' },
  ];

  return (
    <nav className="bg-white border-t border-gray-100 safe-area-inset-bottom shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-around px-2 py-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1.5 px-6 rounded-xl transition-all relative ${
                isActive 
                  ? 'text-purple-600 scale-110' 
                  : 'text-gray-400 active:scale-95 active:bg-gray-50'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${isActive ? 'fill-purple-50' : ''}`} />
                {tab.badge && tab.badge > 0 && (
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                    <span className="text-[8px] font-black text-white leading-none">{tab.badge > 9 ? '9+' : tab.badge}</span>
                  </div>
                )}
              </div>
              <span className={`text-[10px] font-bold tracking-tight ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-purple-600 rounded-full shadow-[0_0_8px_rgba(147,51,234,0.5)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}


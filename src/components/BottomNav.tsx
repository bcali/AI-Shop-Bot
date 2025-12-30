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
    <nav className="bg-md-surface-container border-t border-md-outline-variant safe-area-inset-bottom shrink-0 elevation-3">
      <div className="flex items-center justify-around px-2 py-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1.5 px-6 py-2 rounded-full transition-all relative state-layer ${
                isActive 
                  ? 'text-md-on-secondary-container bg-md-secondary-container' 
                  : 'text-md-on-surface-variant'
              }`}
            >
              <div className="relative">
                <Icon className="w-6 h-6" />
                {tab.badge && tab.badge > 0 && (
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-md-error rounded-full flex items-center justify-center border border-md-surface-container">
                    <span className="text-[8px] font-medium text-md-on-error">{tab.badge > 9 ? '9+' : tab.badge}</span>
                  </div>
                )}
              </div>
              <span className="text-xs font-medium tracking-wide">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}


"use client";

import { ArrowLeft, User, Bell, Shield, LogOut, ChevronRight, Globe, Palette } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { useState } from 'react';

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export function ProfileScreen({ onBack, onLogout }: ProfileScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [priceDrops, setPriceDrops] = useState(true);
  const [restockAlerts, setRestockAlerts] = useState(false);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Personal Information', value: 'John Doe' },
        { icon: Globe, label: 'Language', value: 'English' },
        { icon: Palette, label: 'Theme', value: 'Light' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Default Platform', value: 'Auto-select best price' },
        { icon: Shield, label: 'Privacy Settings', value: 'Manage' },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 flex items-center gap-3 shadow-lg safe-area-inset-top shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 -ml-2 rounded-full h-10 w-10"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-bold flex-1">Profile & Settings</h2>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Profile Card */}
        <div className="bg-white p-6 mb-4 shadow-sm border-b border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-inner relative border-4 border-white">
              <span className="text-white text-2xl font-black">JD</span>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
              <p className="text-gray-500 text-sm">john.doe@example.com</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-lg font-black text-purple-600">12</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Purchases</div>
            </div>
            <div className="text-center border-x border-gray-100">
              <div className="text-lg font-black text-purple-600">5</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-black text-purple-600">$284</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Saved</div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-5 mb-4 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Notifications</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-gray-800 mb-0.5">Push Notifications</div>
                <div className="text-[10px] text-gray-500">Receive alerts and updates</div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-gray-800 mb-0.5">Price Drop Alerts</div>
                <div className="text-[10px] text-gray-500">When monitored prices drop</div>
              </div>
              <Switch
                checked={priceDrops}
                onCheckedChange={setPriceDrops}
                disabled={!notifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-gray-800 mb-0.5">Restock Alerts</div>
                <div className="text-[10px] text-gray-500">When items come back in stock</div>
              </div>
              <Switch
                checked={restockAlerts}
                onCheckedChange={setRestockAlerts}
                disabled={!notifications}
              />
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <div key={section.title} className="bg-white p-5 mb-4 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">{section.title}</h3>
            <div className="space-y-4">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-4 py-1 active:bg-gray-50 rounded-lg group transition-colors"
                  >
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0 group-active:scale-90 transition-transform">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-sm font-bold text-gray-800 mb-0.5">{item.label}</div>
                      <div className="text-[10px] font-medium text-gray-500 truncate">{item.value}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Connected Platforms */}
        <div className="bg-white p-5 mb-4 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Connected Platforms</h3>
          <div className="space-y-4">
            {[
              { name: 'Shopee', color: 'bg-orange-500', connected: true },
              { name: 'Lazada', color: 'bg-blue-600', connected: true },
              { name: 'Amazon', color: 'bg-yellow-500', connected: true },
            ].map((platform) => (
              <div key={platform.name} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${platform.color} rounded-xl flex items-center justify-center shadow-sm`}>
                    <span className="text-white text-xs font-black">{platform.name[0]}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800">{platform.name}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-full">
                  <div className="w-1 h-1 rounded-full bg-green-500" />
                  <span className="text-[8px] font-black text-green-600 uppercase tracking-widest">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-4 mt-8">
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full h-14 rounded-2xl font-bold text-red-500 border-red-100 bg-red-50/30 hover:bg-red-50 active:scale-[0.98] transition-all"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
          <div className="mt-6 text-[10px] font-bold text-gray-300 text-center uppercase tracking-widest">
            Version 2.0.0
          </div>
        </div>
      </div>
    </div>
  );
}


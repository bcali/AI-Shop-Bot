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
        { icon: Palette, label: 'Theme', value: 'Material You (Light)' },
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
    <div className="flex flex-col h-full bg-md-background">
      {/* Header */}
      <header className="bg-md-primary text-md-on-primary px-4 py-3 flex items-center gap-3 elevation-2 safe-area-inset-top shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="text-md-on-primary hover:bg-md-on-primary/12 -ml-2 rounded-full h-10 w-10 state-layer"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-medium tracking-wide flex-1">Profile & Settings</h2>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-12">
        {/* Profile Card */}
        <div className="bg-md-surface-container-low p-6 mb-4 elevation-1 border-b border-md-outline-variant">
          <div className="flex items-center gap-5 mb-8 mt-2">
            <div className="w-24 h-24 bg-gradient-to-br from-md-primary to-md-secondary-container rounded-md-full flex items-center justify-center elevation-2 relative border-4 border-md-surface">
              <span className="text-md-on-primary text-3xl font-black">JD</span>
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-success rounded-full border-4 border-md-surface elevation-1" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-md-on-surface tracking-tight">John Doe</h3>
              <p className="text-md-on-surface-variant text-sm font-medium">john.doe@example.com</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-md-outline-variant/50">
            <div className="text-center">
              <div className="text-xl font-black text-md-primary">12</div>
              <div className="text-[10px] font-black text-md-on-surface-variant uppercase tracking-widest">Orders</div>
            </div>
            <div className="text-center border-x border-md-outline-variant/50">
              <div className="text-xl font-black text-md-primary">5</div>
              <div className="text-[10px] font-black text-md-on-surface-variant uppercase tracking-widest">Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-success">$284</div>
              <div className="text-[10px] font-black text-md-on-surface-variant uppercase tracking-widest">Saved</div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-md-surface-container p-6 mb-4 elevation-1 border-y border-md-outline-variant">
          <h3 className="text-[10px] font-black text-md-primary uppercase tracking-[0.2em] mb-6">Notifications</h3>
          
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-md-on-surface mb-1">Push Notifications</div>
                <div className="text-[10px] font-medium text-md-on-surface-variant opacity-70">Receive alerts and order updates</div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-md-on-surface mb-1">Price Drop Alerts</div>
                <div className="text-[10px] font-medium text-md-on-surface-variant opacity-70">When monitored prices drop</div>
              </div>
              <Switch
                checked={priceDrops}
                onCheckedChange={setPriceDrops}
                disabled={!notifications}
              />
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <div key={section.title} className="bg-md-surface-container p-6 mb-4 elevation-1 border-y border-md-outline-variant">
            <h3 className="text-[10px] font-black text-md-primary uppercase tracking-[0.2em] mb-6">{section.title}</h3>
            <div className="space-y-6">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-5 py-1 active:bg-md-surface-variant/20 rounded-md-m group transition-all state-layer"
                  >
                    <div className="w-12 h-12 bg-md-primary-container text-md-primary rounded-md-xl flex items-center justify-center flex-shrink-0 elevation-1 group-active:elevation-0 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-sm font-bold text-md-on-surface mb-1">{item.label}</div>
                      <div className="text-[10px] font-black text-md-on-surface-variant uppercase tracking-widest truncate">{item.value}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-md-outline flex-shrink-0 mr-1" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Connected Platforms */}
        <div className="bg-md-surface-container p-6 mb-4 elevation-1 border-y border-md-outline-variant">
          <h3 className="text-[10px] font-black text-md-primary uppercase tracking-[0.2em] mb-6">Marketplaces</h3>
          <div className="space-y-5">
            {[
              { name: 'Shopee', color: 'bg-shopee', connected: true },
              { name: 'Lazada', color: 'bg-lazada', connected: true },
              { name: 'Amazon', color: 'bg-amazon', connected: true },
            ].map((platform) => (
              <div key={platform.name} className="flex items-center justify-between p-1">
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 ${platform.color} rounded-md-xl flex items-center justify-center elevation-1 border border-white/20`}>
                    <span className="text-white text-lg font-black">{platform.name[0]}</span>
                  </div>
                  <span className="text-sm font-black text-md-on-surface uppercase tracking-widest">{platform.name}</span>
                </div>
                <div className="flex items-center gap-2 bg-success/10 px-3 py-1.5 rounded-md-full border border-success/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-[9px] font-black text-success uppercase tracking-widest">Linked</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-6 mt-10">
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full h-14 rounded-md-full font-black text-md-error border-md-error/30 bg-md-error-container/10 hover:bg-md-error-container/20 active:elevation-0 transition-all uppercase tracking-[0.2em] elevation-1"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
          <div className="mt-8 text-[10px] font-black text-md-on-surface-variant text-center uppercase tracking-[0.3em] opacity-40">
            Version 11 • MD3-PWA
          </div>
        </div>
      </div>
    </div>
  );
}


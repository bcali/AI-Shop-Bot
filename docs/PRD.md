# AI Personal Shopping Concierge (PWA)

## TL;DR

A mobile-first progressive web app that acts as an AI shopping concierge for Shopee, Lazada, and Amazon. It uses a chat interface powered by the Vercel AI SDK and Material Design 3 (Version 11) to search, compare, and monitor products, then executes purchases via an Agentic Commerce Protocol only after explicit confirmation.

---

## Goals

### Business Goals

* Serve as a personal reference implementation for agentic commerce across Shopee, Lazada, and Amazon.
* Reduce time spent on product discovery and comparison by ~80%.
* Achieve >90% of monitored purchases at or below target price.
* Zero unauthorized or surprise purchases.

### User Goals

* Natural-language product discovery via an intelligent chat interface.
* Cross-platform price comparison (Shopee, Lazada, Amazon).
* Price monitoring with real-time alerts and target price settings.
* Fast, safe purchase confirmation with clear price breakdown.
* High-quality, installable PWA experience matching Material Design 3 standards.

### Non-Goals

* Multi-user or shared usage (optimized for personal use).
* Logistics, returns, or customer service handling (handled by platforms).

---

## User Stories

### Individual Shopper

* **Install**: I want to install the app as a PWA on my mobile device for quick access.
* **Discover**: I want to search for products using natural language across multiple marketplaces.
* **Compare**: I want to see a side-by-side comparison of prices, ratings, and shipping for the same item.
* **Monitor**: I want to set a "target price" for a product and get notified when it hits that price.
* **Purchase**: I want a clear, two-step confirmation flow before any purchase is executed.
* **Track**: I want to view my history of searches, price alerts, and orders.

---

## Functional Requirements

### UI/UX: Material Design 3 (High)
* **Design System**: Fully implemented Material Design 3 (MD3) guidelines (Version 11).
* **Typography**: Primary typeface is **Roboto** (400, 500, 700, 900 weights).
* **Color System**: Dynamic MD3 color palette (Primary: #6750A4) with surface containers and state layers.
* **Elevation**: Standardized MD3 elevation system (elevation-1 to elevation-5) for depth.
* **Shapes**: Standardized border radii (md-xs to md-xl) for components.

### Chat Interface (High)
* **Engine**: Powered by **Vercel AI SDK** (`useChat`).
* **Tool Calling**: Native support for tools like `searchProducts`.
* **Visuals**: Chat bubbles with MD3 styling, typing indicators, and quick actions.
* **Platform Branding**: Distinctive color coding for Shopee (Orange), Lazada (Blue), and Amazon (Yellow).

### Marketplace Search & Comparison (High)
* **Connectors**: Integration with Shopee, Lazada, and Amazon.
* **Normalized Data**: Unified product schema (ID, name, price, original price, platform, rating, reviews, image, shipping).
* **Price Comparison**: Dedicated component to highlight the "Best Price" across platforms.

### Deal Monitoring & Alerts (High)
* **Price Target Modal**: New component for setting specific target prices (e.g., -10%, -20%, -30%).
* **Alert Lifecycle**: Ability to view, disable, or remove active price alerts.
* **Deals Screen**: Centralized view for monitoring active price drops.

### Secure Purchase Flow (High)
* **Explicit Confirmation**: Dedicated `PurchaseConfirmation` screen with full cost breakdown (item + shipping).
* **Success Feedback**: `PurchaseSuccess` screen with order numbers and estimated delivery.
* **No Automatic Buying**: Strict enforcement of "Review & Purchase" before execution.

---

## Technical Stack

### Frontend & Deployment
* **Framework**: Next.js 15+ (TypeScript).
* **Styling**: Tailwind CSS with custom MD3 configuration.
* **Icons**: Lucide React.
* **Deployment**: Cloudflare Pages.

### Backend & Data
* **Database**: PostgreSQL.
* **ORM**: Drizzle ORM.
* **AI Integration**: Vercel AI SDK for model orchestration and streaming.
* **PWA**: Mobile-first design with safe-area handling and overscroll containment.

---

## Milestones (Current Progress)

### ✅ Phase 1: Core PWA & UI Foundation (COMPLETED)
* ✅ Setup Next.js 15 + Tailwind CSS + Lucide React
* ✅ Implement MD3 "Version 11" design system with full color palette
* ✅ Build PWA shell with bottom navigation
* ✅ Implement all major screens (Chat, Deals, History, Profile, Onboarding)
* ✅ Material Design 3 components library
* ✅ Roboto typography system with all weights

### ✅ Phase 2: AI Chat Integration (COMPLETED - Jan 15, 2026)
* ✅ Integrate Vercel AI SDK (`useChat` hook from `ai@2.2.0`)
* ✅ Implement OpenAI integration with streaming responses
* ✅ Working chat interface with real-time AI responses
* ✅ Multi-turn conversation support
* ✅ Error handling and logging
* ✅ Chat UI with typing indicators and message history
* 🟡 `searchProducts` tool integration (UI ready, API mocked)
* 🟡 Product Card and Price Comparison components (built, needs API)

**Current Status**: Chat interface fully functional with OpenAI GPT-4. Users can interact naturally with the AI shopping concierge. Product search tool and marketplace integrations ready for API connection.

### 🟡 Phase 3: Marketplace Integration & Product Search (NEXT)
* ⚪ Connect Shopee API for product search
* ⚪ Connect Lazada API for product search
* ⚪ Connect Amazon API for product search
* ⚪ Implement `searchProducts` function calling
* ⚪ Display product results in chat
* ⚪ Implement price comparison UI
* ⚪ Implement `PriceTargetModal` and monitoring logic
* ⚪ Finalize `PurchaseConfirmation` and `PurchaseSuccess` flows
* ⚪ Integration with Agentic Commerce Protocol

### ⚪ Phase 4: History & Polish
* ⚪ Implement Activity History screen with database
* ⚪ Finalize Profile and Notification settings
* ⚪ Build verification and error hardening
* ⚪ Database integration (PostgreSQL + Drizzle ORM)
* ⚪ PWA manifest and service worker optimization

---

## Current Implementation Status

### ✅ Working Features (Jan 15, 2026)

**AI Chat Interface**
- Real-time streaming chat powered by OpenAI GPT-4
- Natural language conversation with context retention
- Typing indicators and message timestamps
- Clean Material Design 3 UI with chat bubbles
- Voice input button (UI ready)

**UI/UX Components**
- Complete Material Design 3 implementation
- Onboarding flow with Google Sign-in mockup
- Bottom navigation with active state indicators
- Alert badge system (showing "1" active alert as example)
- Responsive mobile-first layout
- Safe area handling for iOS/Android

**Screens Built**
- Chat Screen (fully functional)
- Deals/Alerts Screen (UI complete, needs backend)
- History Screen (UI complete, needs backend)
- Profile Screen (UI complete, needs backend)

### 🛠️ Development Setup

**Prerequisites**
- Node.js 18+ and npm
- OpenAI API key (required for chat functionality)

**Environment Variables**
```bash
OPENAI_API_KEY=your-key-here  # Required
DATABASE_URL=postgres://...    # Optional (for Phase 4)
```

**Quick Start**
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### 📋 Next Steps (Priority Order)

1. **Marketplace API Integration** (Phase 3)
   - Implement Shopee API connector
   - Implement Lazada API connector
   - Implement Amazon API connector
   - Add function calling to chat for product search

2. **Product Display** (Phase 3)
   - Display product cards in chat
   - Implement price comparison UI
   - Add product filtering and sorting

3. **Price Monitoring** (Phase 3)
   - Implement price target modal
   - Set up background price checking
   - Build notification system

4. **Purchase Flow** (Phase 3)
   - Implement purchase confirmation flow
   - Integrate with marketplace checkout APIs
   - Add order tracking

5. **Database & History** (Phase 4)
   - Connect PostgreSQL database
   - Implement chat history persistence
   - Build activity history screen

---

## Development Notes

### Recent Changes (Jan 15, 2026)

**AI SDK Integration Fixed**
- Resolved 500 errors from API route
- Fixed `useChat` hook configuration
- Simplified streaming implementation with `OpenAIStream`
- Added comprehensive error handling
- Updated to `ai@2.2.0` for stability

**Dependencies**
- Next.js 15.1.6
- React 19
- ai@2.2.0
- openai@4.76.1
- Tailwind CSS 3.4.1

### Known Issues
- Product search currently returns mock data (API integration needed)
- Database connection not yet implemented
- Purchase flow needs marketplace API integration
- Price monitoring requires backend implementation

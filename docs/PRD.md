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

### ✅ Phase 1: Core PWA & UI Foundation
* Setup Next.js + Tailwind + Lucide.
* Implement MD3 "Version 11" design system.
* Build PWA shell and bottom navigation.

### ✅ Phase 2: AI Search & Comparison
* Integrate Vercel AI SDK.
* Implement `searchProducts` tool.
* Build Product Card and Price Comparison components.

### 🟡 Phase 3: Monitoring & Purchase (In Progress)
* Implement `PriceTargetModal` and monitoring logic.
* Finalize `PurchaseConfirmation` and `PurchaseSuccess` flows.
* Integration with Agentic Commerce Protocol.

### ⚪ Phase 4: History & Polish
* Implement Activity History screen.
* Finalize Profile and Notification settings.
* Build verification and error hardening.

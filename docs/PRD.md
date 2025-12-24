# AI Personal Shopping Concierge (PWA)

## TL;DR

A mobile-first progressive web app that acts as an AI shopping concierge for Shopee, Lazada, and Amazon. It uses a chat interface powered by ChatGPT APIs to search, compare, and monitor products, then executes purchases via an Agentic Commerce Protocol only after explicit confirmation.

---

## Goals

### Business Goals

* Serve as a personal reference implementation for agentic commerce across Shopee, Lazada, and Amazon
* Reduce time spent on product discovery and comparison by ~80%
* Achieve >90% of monitored purchases at or below target price
* Zero unauthorized or surprise purchases

### User Goals

* Natural-language product discovery
* Price monitoring with alerts
* Fast, safe purchase confirmation
* Installable PWA experience

### Non-Goals

* Multi-user or shared usage
* Logistics, returns, or customer service handling
* Custom design system (Material Design only)

---

## User Stories

### Individual Shopper

* Install the app as a PWA
* Sign in using Google OAuth
* Store shipping address
* Search products via chat
* Refine results
* Set price watches
* Explicitly confirm purchases
* Review history and alerts

### System / Admin

* Manage marketplace credentials
* Audit searches, alerts, and purchases
* Reset stored data

---

## Functional Requirements

### Authentication & Security (High)

* Google OAuth only
* Encrypted storage for secrets
* App reset capability

### PWA Shell & Notifications (High)

* Installable PWA
* Offline caching
* Badge counts for alerts

### Profile & Preferences (High)

* Shipping address
* Notification preferences
* Currency and region

### Marketplace Search & Comparison (High)

* Shopee, Lazada, Amazon
* Normalized product schema
* Sorting and filtering

### Deal Monitoring & Alerts (Medium)

* Target price watches
* Scheduled background checks
* Alert lifecycle tracking

### Agentic Purchase with Explicit Confirmation (Medium)

* Purchase proposals
* Confirmation UI
* No automatic purchases

### Chat Interface (High)

* Primary UI surface
* Product cards and CTAs
* Session context management

---

## User Experience

### First-Time Experience

* Google sign-in
* PWA install prompt
* Shipping address setup
* Intro to core flows

### Core Experience

* Chat-based search
* Refinement
* Monitoring and alerts

### Purchase Experience

* Review panel
* Explicit confirmation
* Receipt and history entry

---

## Success Metrics

### User Metrics

* Time to purchase
* Usage frequency
* Target price hit rate

### Business Metrics

* Estimated savings
* Alert-to-purchase conversion

### Technical Metrics

* PWA launch rate
* API latency
* Error rates

---

## Technical Considerations

### Architecture

* Next.js (TypeScript)
* Vercel deployment
* PostgreSQL (Neon/Supabase)
* ChatGPT APIs

### Integrations

* Google OAuth (NextAuth)
* Shopee / Lazada / Amazon
* Agentic Commerce Protocol

### Data Model (Conceptual)

* user
* product
* watch
* deal_alert
* purchase
* chat_session

### Agent Flow

1. Intent capture
2. Search & normalization
3. Refinement
4. Watch creation
5. Monitoring
6. Proposal & confirmation
7. Purchase & logging

---

## Milestones

### Phase 1: PWA & Chat Search

### Phase 2: Watches & Alerts

### Phase 3: Agentic Purchase

### Phase 4: Refinement & Hardening

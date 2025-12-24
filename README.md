# AI Personal Shopping Concierge

A mobile-first progressive web app that acts as an AI shopping concierge for Shopee, Lazada, and Amazon. Built with Next.js, TypeScript, and Tailwind CSS.

## Project Structure
- `src/`: Next.js application source code.
- `docs/`: Project documentation (PRD, Architecture, Flows, Metrics).
- `scripts/`: Utility scripts (Sync, etc.).
- `.github/workflows/`: CI/CD automation.

## Features
- **AI Chat Interface**: Natural language product discovery.
- **Price Comparison**: Real-time comparison across Shopee, Lazada, and Amazon.
- **Price Monitoring**: Set alerts for price drops.
- **Agentic Purchase**: Secure, confirmed purchase execution.

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```

## PRD Synchronization
The project maintains a bidirectional sync between `docs/PRD.md` and the [Confluence Page](https://emeapayments.atlassian.net/wiki/spaces/PM/pages/24150017/AI+Personal+Shopping+Concierge+PWA).

### 1. Local Sync (Confluence -> Repo)
To pull the latest changes from Confluence:
1. Create a `.env` file based on `env.example`.
2. Run:
   ```bash
   npm run sync-prd
   ```

### 2. Automated Sync (Repo -> Confluence)
Pushes to `main` that modify `docs/PRD.md` automatically update Confluence. Ensure GitHub secrets `ATLASSIAN_EMAIL`, `ATLASSIAN_API_TOKEN`, and `CONFLUENCE_BASE_URL` are configured.

## Roadmap
- [x] Initial Repo Setup & PRD Sync
- [x] Next.js App Initialization (Figma Base)
- [ ] Phase 1: PWA Shell & Authenticated Search
- [ ] Phase 2: Watches & Alerts
- [ ] Phase 3: Agentic Purchase

# AI Personal Shopping Concierge

A mobile-first progressive web app that acts as an AI shopping concierge for Shopee, Lazada, and Amazon.

## Project Structure
- `docs/`: Project documentation (PRD, Architecture, Flows, Metrics)
- `scripts/`: Utility scripts (Sync, etc.)
- `.github/workflows/`: CI/CD automation

## PRD Synchronization
The project maintains a bidirectional sync between `docs/PRD.md` and the [Confluence Page](https://emeapayments.atlassian.net/wiki/spaces/PM/pages/24150017/AI+Personal+Shopping+Concierge+PWA).

### 1. Local Sync (Confluence -> Repo)
To pull the latest changes from Confluence to your local repository:
1. Create a `.env` file based on `env.example`.
2. Configure your Atlassian credentials:
   - `CONFLUENCE_BASE_URL`: `https://emeapayments.atlassian.net/wiki`
   - `ATLASSIAN_EMAIL`: Your Atlassian account email.
   - `ATLASSIAN_API_TOKEN`: [Generate an API token](https://id.atlassian.com/manage-profile/security/api-tokens).
3. Run the sync script:
   ```bash
   npm install
   npm run sync-prd
   ```

### 2. Automated Sync (Repo -> Confluence)
Changes pushed to the `main` branch that modify `docs/PRD.md` will automatically update the Confluence page via GitHub Actions.
**Setup required in GitHub Repository Settings:**
- Add the following **Encrypted Secrets**:
  - `ATLASSIAN_EMAIL`
  - `ATLASSIAN_API_TOKEN`
  - `CONFLUENCE_BASE_URL` (e.g., `https://emeapayments.atlassian.net/wiki`)

## Roadmap
- [ ] Phase 1: PWA & Chat Search
- [ ] Phase 2: Watches & Alerts
- [ ] Phase 3: Agentic Purchase
- [ ] Phase 4: Refinement & Hardening

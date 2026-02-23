# cPanel Deployment Guide

Deployments are configured per branch:

| Branch | Domain | Document Root |
|--------|--------|---------------|
| `develop` | dev.thecaringcove.co.ke | Subdomain docroot |
| `main` | thecaringcove.co.ke | Main domain docroot |

## Prerequisites

- Node.js 18+ enabled in cPanel (Setup Node.js App)
- Git Version Control installed in cPanel

## Setup: Two Separate Deployment Environments

### 1. Production (thecaringcove.co.ke)

1. Create a Git repository in cPanel:
   - **cPanel → Git Version Control → Create**
   - Repository URL: `https://github.com/felixodette/the-caring-cove.git`
   - Clone to: `~/thecaringcove.co.ke` (or your production docroot)

2. After cloning, configure:
   - **Branch**: `main`
   - **Deploy Path**: Document root for `thecaringcove.co.ke` (e.g. `~/public_html` or `~/thecaringcove.co.ke/public_html`)

3. Set **Deploy Script** (optional, in cPanel Git settings):
   - Path: `scripts/deploy.sh`
   - Or run manually after each pull:
     ```bash
     cd ~/thecaringcove.co.ke
     npm ci --omit=dev
     npm run build
     ```

4. Create Node.js Application in cPanel:
   - **cPanel → Setup Node.js App → Create Application**
   - Application root: `~/thecaringcove.co.ke` (or your deploy path)
   - Application URL: `thecaringcove.co.ke`
   - Application startup file: `node_modules/next/dist/bin/next`
   - Run script: `npm start` (or `node node_modules/next/dist/bin/next start`)

5. Copy `.env.example` to `.env.local` and configure values.

### 2. Staging (dev.thecaringcove.co.ke)

1. Create a second Git repository in cPanel:
   - **cPanel → Git Version Control → Create**
   - Repository URL: `https://github.com/felixodette/the-caring-cove.git`
   - Clone to: `~/dev.thecaringcove.co.ke` (or your subdomain docroot)

2. Configure:
   - **Branch**: `develop`
   - **Deploy Path**: Document root for `dev.thecaringcove.co.ke`

3. Set **Deploy Script**: same as production (`scripts/deploy.sh`)

4. Create Node.js Application for the subdomain:
   - Application root: `~/dev.thecaringcove.co.ke`
   - Application URL: `dev.thecaringcove.co.ke`

5. Copy `.env.example` to `.env.local` for staging.

## Deployment Workflow

### Deploy to dev.thecaringcove.co.ke
```bash
git push origin develop
```
Then in cPanel: **Git → Deploy** for the dev repository.

### Deploy to thecaringcove.co.ke
```bash
git push origin main
```
Then in cPanel: **Git → Deploy** for the production repository.

## Optional: Webhook Auto-Deploy

To auto-deploy on push, you can set up a GitHub webhook that calls a cPanel endpoint, or use a cron job that runs `git pull` periodically. Contact your host for webhook support.

## Alternative: Single Repo, Two Deploy Paths

If your cPanel supports multiple Git deployments from the same repo:

1. Clone once to a shared location
2. Create two deployments:
   - Deployment 1: Branch `main` → production docroot
   - Deployment 2: Branch `develop` → dev subdomain docroot

Each deployment uses its own deploy script path.

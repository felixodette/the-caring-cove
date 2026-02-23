# cPanel Deployment Guide

Deployments are configured per branch. Your server has:
- `repositories/` — where Git repos are cloned (use subfolders here)
- `public_html/` — main domain (thecaringcove.co.ke) document root
- `dev.thecaringcove.co.ke/` — subdomain document root

| Branch | Domain |
|--------|--------|
| `develop` | dev.thecaringcove.co.ke |
| `main` | thecaringcove.co.ke |

---

## Step-by-Step: Set Up Each Environment

You will create **two separate Git repositories** in cPanel—one for each domain. Each repository pulls a different branch from the same GitHub repo.

### Production (thecaringcove.co.ke) — uses `main` branch

#### 1. Clone the repository

1. Log in to **cPanel**
2. Go to **Files → Git Version Control**
3. Click **Create**
4. Configure:
   - **Clone a Repository**: Turn **ON**
   - **Clone URL**: `https://github.com/felixodette/the-caring-cove.git`
   - **Repository Path**: `repositories/thecaringcove-prod` (uses your existing `repositories` folder)
   - **Repository Name**: `the-caring-cove-prod` (or any label you prefer)
5. Click **Create** and wait for the clone to finish

#### 2. Switch to the `main` branch

1. In the repository list, click **Manage** next to the repo you just created
2. Open the **Pull or Deploy** tab
3. Find **Checked-Out Branch**
4. Select **main** from the dropdown
5. Click **Update** — this checks out `main` and pulls the latest code

#### 3. Deploy (build the app)

1. Still in **Pull or Deploy**
2. Click **Update from Remote** to pull the latest changes
3. Click **Deploy HEAD Commit** — this runs the tasks in `.cpanel.yml` (`npm ci` and `npm run build`)

#### 4. Set up the Node.js app

1. Go to **Software → Setup Node.js App**
2. Click **Create Application**
3. Configure:
   - **Node.js version**: 18 or higher
   - **Application root**: `repositories/thecaringcove-prod`
   - **Application URL**: Select **thecaringcove.co.ke**
   - **Application startup file**: `server.js` (or use `npm start` if your host has a Run script field)
4. Click **Create**, then **Start** the app

#### 5. Environment variables

1. In **File Manager**, go to your repository folder
2. Copy `.env.example` to `.env.local`
3. Edit `.env.local` and add your production values (e.g. `NEXT_PUBLIC_WHATSAPP_NUMBER`)

---

### Staging (dev.thecaringcove.co.ke) — uses `develop` branch

#### 1. Clone the repository again

1. Go to **Files → Git Version Control**
2. Click **Create**
3. Configure:
   - **Clone a Repository**: Turn **ON**
   - **Clone URL**: `https://github.com/felixodette/the-caring-cove.git`
   - **Repository Path**: `repositories/thecaringcove-dev` (separate from production)
   - **Repository Name**: `the-caring-cove-dev`
4. Click **Create**

#### 2. Switch to the `develop` branch

1. Click **Manage** for this repo
2. Open **Pull or Deploy**
3. In **Checked-Out Branch**, select **develop**
4. Click **Update**

#### 3. Deploy

1. Click **Update from Remote**
2. Click **Deploy HEAD Commit**

#### 4. Set up the Node.js app for the subdomain

1. Go to **cPanel → Software → Setup Node.js App**
2. Click **Create Application**
3. Fill in the form:
   - **Node.js version**: Select **18** or higher
   - **Application root**: Enter `repositories/thecaringcove-dev`  
     (Path relative to your home directory. Some hosts show it as `/home/username/repositories/thecaringcove-dev`.)
   - **Application URL**: Select **dev.thecaringcove.co.ke** from the dropdown
   - **Application startup file**: Enter `server.js`  
     (The repo includes a `server.js` for cPanel/Passenger. If your host has a "Run script" field instead, use `npm start`.)
4. Click **Create**
5. After creation, click **Run NPM Install** if that option appears (otherwise the deploy step handles it)
6. Click **Start** or **Restart** to run the app

**Important:** Run **Deploy HEAD Commit** (step 3) before starting the app so `npm run build` has completed.

#### 5. Environment variables

Copy `.env.example` to `.env.local` in the dev repo folder and configure staging values.

---

## Summary: Branch selection

| Environment | Repository Path | Branch | Domain |
|-------------|-----------------|--------|--------|
| Production  | `repositories/thecaringcove-prod` | **main** | thecaringcove.co.ke |
| Staging     | `repositories/thecaringcove-dev`  | **develop** | dev.thecaringcove.co.ke |

The branch is chosen in **Manage → Pull or Deploy → Checked-Out Branch**. Each repo is independent, so production uses `main` and staging uses `develop`.

---

## Deploying updates

### Deploy to dev.thecaringcove.co.ke

1. Push to GitHub: `git push origin develop`
2. In cPanel: **Git Version Control → Manage** (dev repo) → **Pull or Deploy**
3. Click **Update from Remote**
4. Click **Deploy HEAD Commit**

### Deploy to thecaringcove.co.ke

1. Push to GitHub: `git push origin main`
2. In cPanel: **Git Version Control → Manage** (prod repo) → **Pull or Deploy**
3. Click **Update from Remote**
4. Click **Deploy HEAD Commit**

---

## What `.cpanel.yml` does

The `.cpanel.yml` file in the repo defines deployment tasks. When you click **Deploy HEAD Commit**, cPanel runs:

- `npm ci` — install dependencies
- `npm run build` — build the Next.js app

After deployment, restart the Node.js app in **Setup Node.js App** if it doesn’t auto-restart.

# cPanel Deployment Guide (Static Export)

This app uses **static export** — no Node.js runtime on the server. The build produces static HTML/CSS/JS in the `out/` folder, which Apache serves directly. This works within Safaricom shared hosting's 1GB memory limit (no Node.js build or runtime needed on the server).

| Branch | Domain |
|--------|--------|
| `develop` | dev.thecaringcove.co.ke |
| `main` | thecaringcove.co.ke |

---

## Step-by-Step: Set Up Each Environment

### Staging (dev.thecaringcove.co.ke) — uses `develop` branch

#### 1. Clone the repository

1. Log in to **cPanel**
2. Go to **Files → Git Version Control**
3. Click **Create**
4. Configure:
   - **Clone a Repository**: Turn **ON**
   - **Clone URL**: `https://github.com/felixodette/the-caring-cove.git`
   - **Repository Path**: `repositories/thecaringcove-dev`
   - **Repository Name**: `the-caringcove-dev`
5. Click **Create**

#### 2. Switch to the `develop` branch

1. Click **Manage** for this repo
2. Open **Pull or Deploy**
3. In **Checked-Out Branch**, select **develop**
4. Click **Update**

#### 3. Build locally (recommended — server has 1GB limit)

The server's 1GB memory limit is too low for the Next.js build. Build on your machine:

```bash
git clone https://github.com/felixodette/the-caring-cove.git
cd the-caring-cove
git checkout develop
npm install
npm run build
```

This creates an `out/` folder with the static site.

#### 4. Upload the static site

1. In **File Manager**, go to `repositories/thecaringcove-dev`
2. Create an `out` folder if it doesn't exist
3. Upload the **contents** of your local `out/` folder into it (index.html, _next/, images/, etc.)

Or use FTP/SFTP to upload the `out/` contents to `repositories/thecaringcove-dev/out/`.

#### 5. Point the subdomain to the static output

1. Go to **Domains → Subdomains**
2. Find **dev.thecaringcove.co.ke** and click **Manage**
3. Set **Document Root** to: `repositories/thecaringcove-dev/out`
4. Save

The site is now live. **No Node.js app is required.**

---

### Production (thecaringcove.co.ke) — uses `main` branch

Repeat the same steps with:
- **Repository Path**: `repositories/thecaringcove-prod`
- **Branch**: `main`
- **Document Root**: `repositories/thecaringcove-prod/out`

---

## Automatic deployment via GitHub Actions

Pushing to `develop` or `main` triggers a build and FTP upload. No manual upload needed.

### One-time setup: Add FTP secrets

1. In **GitHub**, go to your repo → **Settings → Secrets and variables → Actions**
2. Click **New repository secret** and add:

| Secret | Value |
|--------|-------|
| `FTP_SERVER` | Your FTP hostname (e.g. `ftp.thecaringcove.co.ke` or your cPanel server hostname) |
| `FTP_USERNAME` | Your cPanel/FTP username |
| `FTP_PASSWORD` | Your cPanel/FTP password |
| `FTP_REMOTE_PATH_DEV` | Remote path for dev (e.g. `repositories/thecaringcove-dev/out` or `/home/thecarin/repositories/thecaringcove-dev/out`) |
| `FTP_REMOTE_PATH_PROD` | Remote path for prod (e.g. `repositories/thecaringcove-prod/out`) |

**Finding the FTP path:** In cPanel File Manager, the path is often relative to your home directory. If your home is `/home/thecarin`, the full path would be `/home/thecarin/repositories/thecaringcove-dev/out`. Some FTP servers use the home dir as root, so you may only need `repositories/thecaringcove-dev/out`.

### How it works

- **Push to `develop`** → Builds and deploys to dev.thecaringcove.co.ke
- **Push to `main`** → Builds and deploys to thecaringcove.co.ke

You can also run the workflow manually: **Actions** tab → select the workflow → **Run workflow**.

---

## Manual deployment (if not using GitHub Actions)

1. **Build locally:**
   ```bash
   git pull origin develop   # or main for prod
   npm install
   npm run build
   ```

2. **Upload** the contents of the `out/` folder to `repositories/thecaringcove-dev/out/` (or `thecaringcove-prod/out/` for production) via File Manager or FTP.

---

## Optional: Try server-side build

If you want to try building on the server (may fail with 1GB limit):

1. In **Git Version Control → Manage** (your repo) → **Pull or Deploy**
2. Click **Update from Remote**
3. Click **Deploy HEAD Commit**

If the build succeeds, the `out/` folder will be created. Point the document root to `repositories/thecaringcove-dev/out` as in step 5 above.

If it fails with "Out of memory", use the local build + upload method.

---

## What `.cpanel.yml` does

When you click **Deploy HEAD Commit**, cPanel runs:

- `npm install` — install dependencies
- `npm run build` — build the static export (output in `out/`)

---

## Troubleshooting

### Build fails on server: "Out of memory" / "WebAssembly"

**Cause:** Safaricom shared hosting has a 1GB memory limit. The Next.js build needs more.

**Fix:** Build locally and upload the `out/` folder (see steps 3–4 above).

### GitHub Actions FTP deploy fails

**Cause:** Wrong credentials or path.

**Fix:** Check the workflow run log. Verify `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, and `FTP_REMOTE_PATH_DEV`/`FTP_REMOTE_PATH_PROD` in repo secrets. Ensure the remote path exists on the server (create the `out` folder in File Manager if needed).

### 404 on page refresh or direct URL

**Cause:** Apache needs to redirect all requests to `index.html` for client-side routing.

**Fix:** The `public/.htaccess` file is copied to `out/` during build. If missing, add it manually:

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

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

#### 4. Point the subdomain document root

1. Go to **Domains → Subdomains**
2. Find **dev.thecaringcove.co.ke** and click **Manage**
3. Set **Document Root** to: **`dev.thecaringcove.co.ke`** (the subdomain root folder)
4. Save

#### 5. Deploy the site

The GitHub Action deploys directly to the subdomain root. Push to `develop` to trigger a deploy. The files (index.html, _next/, etc.) will be uploaded to `dev.thecaringcove.co.ke/` — they must be in the root itself, not in a subfolder.

The site is now live. **No Node.js app is required.**

---

### Production (thecaringcove.co.ke) — uses `main` branch

1. **Clone** the repo to `repositories/thecaringcove-prod`, switch to `main` branch.
2. **Document root:** Set the main domain's document root to `public_html` (or `thecaringcove.co.ke` if your host uses a separate folder for the main domain).
3. **GitHub secrets:** Add `FTP_USERNAME_PROD` and `FTP_PASSWORD_PROD` for the production FTP account. The prod FTP root should be `public_html` (or the main domain folder).
4. **Deploy:** Push to `main` — files upload to the prod FTP root.

---

## Automatic deployment via GitHub Actions

Pushing to `develop` or `main` triggers a build and FTP upload. No manual upload needed.

### One-time setup: Add FTP secrets

1. In **GitHub**, go to your repo → **Settings → Secrets and variables → Actions**
2. Click **New repository secret** and add:

| Secret | Value |
|--------|-------|
| `FTP_SERVER` | Your FTP hostname (e.g. `ftp.thecaringcove.co.ke`) |
| **Dev (develop branch)** | |
| `FTP_USERNAME` | Dev FTP username (e.g. `dev-thecarin@thecaringcove.co.ke`) |
| `FTP_PASSWORD` | Dev FTP password |
| **Prod (main branch)** | |
| `FTP_USERNAME_PROD` | Prod FTP username (e.g. main cPanel account or `thecarin@thecaringcove.co.ke`) |
| `FTP_PASSWORD_PROD` | Prod FTP password |

**Note:** Each FTP account's root is its document root. Dev account → `dev.thecaringcove.co.ke`. Prod account → `public_html` or `thecaringcove.co.ke`. Files deploy to the root (no subfolder).

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

2. **Upload** the contents of the `out/` folder to the document root (e.g. `dev.thecaringcove.co.ke/` for dev, `public_html/` for prod) via File Manager or FTP.

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

## Contact Form (PHP Mail Bridge)

The contact form uses a **PHP mail-bridge** script that deploys with your static site. The file `public/contact-handler.php` is copied to `out/contact-handler.php` during build and must be in your document root for the form to work.

### How it works

1. **Frontend:** The form uses progressive disclosure (2 steps) to reduce form fatigue. Step 1: Name, Phone, Email. Step 2: Primary Interest, Location (for lead qualification).
2. **Backend:** Form submits to `/contact-handler.php`, which sends an email to `info@thecaringcove.co.ke`.
3. **cPanel:** Ensure PHP is enabled for your domain. The script uses the standard `mail()` function.

### Alternative: Formspree

To use Formspree instead of PHP, set this environment variable before build:

```
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

Add it to `.env.local` for local dev, and to your GitHub Actions workflow (or build command) for production.

### Auto-Responder (cPanel)

Set up an Auto-Responder for `info@thecaringcove.co.ke` with your Dignity & Care Guide attached. Suggested message: *"Thank you for trusting us. While you wait for our call, please find our Dignity & Care Guide attached..."*

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

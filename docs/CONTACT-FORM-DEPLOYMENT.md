# Contact Form PHP – cPanel Deployment Guide

The contact form submits to `contact-handler.php`, which sends emails via PHP `mail()`. This guide walks you through deploying and verifying it on cPanel.

---

## Prerequisites

- cPanel access (Safaricom Business or similar)
- Domain: `thecaringcove.co.ke` (prod) or `dev.thecaringcove.co.ke` (dev)
- FTP credentials (used by GitHub Actions deploy)

---

## Step 1: Confirm PHP File Is Deployed

The GitHub Actions workflow deploys the entire `out/` folder, which includes `contact-handler.php` (copied from `public/` during build).

**Verify the file exists:**

1. Log in to **cPanel**
2. Open **File Manager**
3. Go to your **document root**:
   - Prod: `public_html` (or `thecaringcove.co.ke`)
   - Dev: `dev.thecaringcove.co.ke` (or subdomain folder)
4. Check that `contact-handler.php` is in the root (same level as `index.html`)

If it’s missing, upload it manually from your local `out/contact-handler.php` after running `npm run build`.

---

## Step 2: Ensure PHP Is Enabled

1. In cPanel, go to **MultiPHP INI Editor** or **Select PHP Version**
2. Select your domain
3. Confirm PHP 7.4 or higher is selected
4. Ensure `mail` is enabled (it usually is by default)

---

## Step 3: Configure Email for Your Domain

For `mail()` to work, the domain must have valid mail settings.

1. In cPanel, go to **Email Accounts**
2. Create or confirm `no-reply@thecaringcove.co.ke` exists (used as sender)
3. Create or confirm `info@thecaringcove.co.ke` exists (recipient for inquiries)

If you prefer not to create `no-reply@`, you can change the `From` header in `contact-handler.php` to use `info@thecaringcove.co.ke` or another existing address.

---

## Step 4: Test the Form

### Option A: Browser test

1. Open `https://thecaringcove.co.ke/contact` (or your dev URL)
2. Fill out the form and submit
3. Check `info@thecaringcove.co.ke` for the email

### Option B: Direct PHP test

1. Create a temporary test file `test-mail.php` in your document root:

```php
<?php
$to = "info@thecaringcove.co.ke";
$subject = "Test from cPanel";
$body = "If you see this, PHP mail works.";
$headers = "From: no-reply@thecaringcove.co.ke";
if (mail($to, $subject, $body, $headers)) {
    echo "Mail sent.";
} else {
    echo "Mail failed.";
}
```

2. Visit `https://thecaringcove.co.ke/test-mail.php`
3. If you see "Mail sent" and receive the email, `mail()` works
4. Delete `test-mail.php` when done

---

## Step 5: .htaccess and PHP

The `.htaccess` in `out/` is for client-side routing. It should not affect `.php` files because:

- `RewriteCond %{REQUEST_FILENAME} !-f` skips rewriting when the file exists
- `contact-handler.php` exists, so it is served by Apache/PHP

If POSTs to `contact-handler.php` return 404 or HTML instead of JSON:

1. Check that `contact-handler.php` is in the document root
2. Confirm the document root in **Domains** → **Domains** points to the folder containing `contact-handler.php`

---

## Troubleshooting

### Emails not arriving

| Cause | Action |
|-------|--------|
| Spam folder | Check spam/junk for `info@thecaringcove.co.ke` |
| Invalid sender | Use an email that exists on your domain (e.g. `no-reply@thecaringcove.co.ke`) |
| `mail()` disabled | Contact hosting support to enable PHP `mail()` |
| Rate limits | Some hosts limit outgoing mail; wait and retry |

### Form shows "Something went wrong"

| Cause | Action |
|-------|--------|
| 404 on POST | Confirm `contact-handler.php` is in document root |
| 500 error | Check PHP error logs in cPanel → **Errors** |
| CORS | PHP allows your domain; verify you’re on the correct URL |
| Network error | Check browser DevTools → Network for the POST request |

### Viewing PHP errors

1. In cPanel, go to **Errors**
2. Reproduce the form submission
3. Check the latest error entries

---

## File Locations Summary

| Environment | Document root | contact-handler.php path |
|-------------|---------------|---------------------------|
| Prod | `public_html` or `thecaringcove.co.ke` | `public_html/contact-handler.php` |
| Dev | `dev.thecaringcove.co.ke` | `dev.thecaringcove.co.ke/contact-handler.php` |

---

## Optional: Auto-responder

To send an automatic reply to the person who submitted the form:

1. In cPanel, go to **Email Accounts** → **info@thecaringcove.co.ke** → **Manage**
2. Open **Auto-Responder**
3. Enable it and set a message, e.g.:

   > Thank you for your interest in The Caring Cove. We will contact you within 2 hours during business hours. In the meantime, please find our Care Guide attached.

4. Attach your Care Guide PDF if desired

---

## Security Notes

- **Honeypot:** A hidden `website` field helps filter simple bots.
- **Validation:** Server-side checks for name length, email format, and phone.
- **CORS:** Only configured domains can call the script.
- **Sanitization:** Inputs are sanitized before use in the email.

# Contact form – cPanel deployment

The form posts to same-origin `contact-handler.php`. Default production still hides the form until `NEXT_PUBLIC_CONTACT_FORM_DISABLED=enabled` is set at build time.

Contract version: `tcc-contact.v1`. Handler version: `tcc-contact-handler.v1`. Privacy notice: `2026-08-17.1`.

## What a successful inquiry does

1. Validates against the shared enum/length/consent contract.
2. Scores the lead (hot / warm / nurture).
3. Emails intake at `info@thecaringcove.co.ke` with the conversion playbook, click-to-call, and WhatsApp.
4. Emails the family an acknowledgement with the request id.
5. Logs only request id, state, and outcome. No payload on disk.

Staff follow [runbooks/INQUIRY-CONVERSION.md](runbooks/INQUIRY-CONVERSION.md).

## Enable the public form

Build-time:

```
NEXT_PUBLIC_CONTACT_FORM_DISABLED=enabled
```

Do not set this on the Phase E holding artifact until privacy/legal and intake owners accept the notice text and a synthetic mailbox receipt.

Keep the POST URL relative. Do not point staging and production at different frontend endpoints.

## Off-root config

Place JSON outside the document root, for example `/home/<cpanel>/tcc-private/contact.json`, and point the handler at it:

```
TCC_CONTACT_CONFIG=/home/<cpanel>/tcc-private/contact.json
```

Example (names only; never commit secrets):

```json
{
  "handler_enabled": true,
  "recipient": "info@thecaringcove.co.ke",
  "from_address": "no-reply@thecaringcove.co.ke",
  "hmac_secret": "replace-with-long-random-value",
  "trusted_proxies": [],
  "log_dir": "/home/<cpanel>/tcc-private/logs",
  "state_dir": "/home/<cpanel>/tcc-private/state"
}
```

Create `no-reply@` and `info@` in cPanel Email Accounts. `mail()` uses those addresses.

## Verify

```
php -l public/contact-handler.php
php public/contact-handler.php --self-test
php public/contact-handler.php --capabilities
npm run test:php
npm run test:unit
```

Browser: open `/contact/`, complete three steps, confirm staff mail and family acknowledgement. Confirm a junk URL still 404s.

## Stop conditions

- Handler returns 200 when staff mail did not send
- CORS wildcard appears in the handler
- Inquiry fields appear in `handler.log`
- Form collects free-text diagnoses
- Production build enables the form without owner acceptance

## Troubleshooting

Emails missing: check spam, valid From address, PHP mail enabled, rate limit (5/hour/key).

Form error: Network tab on the POST. 403 origin, 415 content type, 400 validation, 429 rate limit, 500 transport.

PHP errors: cPanel Errors. Reproduce once. Do not leave `test-mail.php` on the host.

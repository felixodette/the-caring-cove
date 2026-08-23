# ADR-003 Contact transport and abuse controls

Status: Accepted for implementation. Live SMTP credentials remain an operations task.

## Decision

Keep the static-export architecture. Inquiry POST stays on same-origin `contact-handler.php`. Do not add a database, CMS, captcha, or third-party form vendor by default.

## Origin policy

Fail closed. Allowed origins are the production, www, and dev hostnames plus local Next ports. Missing Origin is accepted only when `Host` is in that set. No wildcard CORS header.

## Rate limit

Five accepted posts per HMAC key per hour. The key is `HMAC-SHA256(secret, UTC-hour || client-ip)`. Raw IP is not written to disk, mail, or logs. `X-Forwarded-For` is read only when `REMOTE_ADDR` is in `trusted_proxies`.

Secret source: `TCC_CONTACT_CONFIG` JSON `hmac_secret`, else a 0600 file in the off-root state directory, else a generated file in the process temp directory (degraded, host-local).

## Transport

PHP `mail()` to `info@thecaringcove.co.ke` with `From: no-reply@thecaringcove.co.ke`. Authenticated SMTP is the upgrade when mailbox delivery is unreliable; configure it outside the document root, do not commit secrets.

Suppressed send failures return HTTP 500 and the public phone number. The handler never returns success unless staff mail was accepted by `mail()`.

## Logging

JSON lines with timestamp, handler version, request_id, state, outcome. No payload.

## Kill switches

Frontend: `NEXT_PUBLIC_CONTACT_FORM_DISABLED` must equal `enabled`. Handler: `handler_enabled` in the off-root config.

## PHP

Target: PHP 7.4+ with json, hash, and mail. `mbstring`, `intl`, and `openssl` preferred. `--capabilities` reports what the host has.

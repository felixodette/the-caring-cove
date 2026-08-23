# Inquiry data flow

```
Visitor browser (contact page)
  -> HTTPS POST multipart/form-data to /contact-handler.php (same origin)
  -> Origin/host allowlist (fail closed)
  -> Honeypot drop (fake 200, no mail)
  -> HMAC rate limit (no raw IP stored)
  -> Enum/length/CRLF/consent validation
  -> Staff mail to info@thecaringcove.co.ke (conversion playbook + score)
  -> Family acknowledgement to sender_email (request id)
  -> Sanitized log line: timestamp, handler version, request_id, state, outcome
```

No inquiry payload is written to disk. Duplicate submits reuse `request_id` for 10 minutes and do not send a second staff mail.

Frontend kill switch: `NEXT_PUBLIC_CONTACT_FORM_DISABLED` must equal `enabled` or the React form is not shown. Handler kill switch: `handler_enabled` in the off-root config file.

Analytics do not load on this path. Google Analytics remains removed from the holding site.

Failure modes:

| State | HTTP | Visitor message |
|---|---|---|
| Disallowed origin | 403 | Form only from The Caring Cove website |
| Handler disabled | 503 | Call +254 748 583 879 |
| Too large / wrong type | 413 / 415 | Submit from the website |
| Validation | 400 | Field errors, no false success |
| Rate limit | 429 | Wait or call |
| Mail transport fail | 500 | Call +254 748 583 879 |

See [DATA-INVENTORY.md](DATA-INVENTORY.md).

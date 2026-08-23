# Inquiry data inventory

Controller: The Caring Cove, Karen, Nairobi. Contact: info@thecaringcove.co.ke / +254 748 583 879.

This inventory describes the web tour-inquiry path only. Phone and WhatsApp conversations are separate records held in those channels.

| Field | Purpose | Required | Lawful basis (operator decision) | Recipients | Retention |
|---|---|---|---|---|---|
| sender_name | Identify the inquirer | Yes | Follow-up on a requested tour | Intake mailbox | 12 months |
| sender_email | Written acknowledgement and fallback | Yes | Same | Intake mailbox; auto-reply to inquirer | 12 months |
| sender_phone | Call / WhatsApp follow-up | Yes | Same | Intake mailbox | 12 months |
| preferred_channel | Honour the family's chosen channel | Yes | Same | Intake mailbox | 12 months |
| relationship | Know who decides and how to speak | Yes | Same | Intake mailbox | 12 months |
| urgency | Speed-to-lead routing | Yes | Same | Intake mailbox | 12 months |
| interest | High-level care fit. Enum only. No diagnoses | Yes, default Prefer not to say | Same | Intake mailbox | 12 months |
| location_context | Time zone and tour logistics | Yes | Same | Intake mailbox | 12 months |
| tour_window | Book a private tour | Yes | Same | Intake mailbox | 12 months |
| resident_first_name | Optional first-name personalization | No | Same, if provided | Intake mailbox | 12 months |
| consent + policy_version | Record acknowledgement of notice 2026-08-17.1 | Yes | Same | Intake mailbox | 12 months |
| request_id | Correlate acknowledgement, DSAR, logs | Yes | Security / accountability | Handler logs (id only) and mailbox | 12 months |
| abuse HMAC key | Rate limit. Not a raw IP | System | Security | Temporary state files | 1 hour rolling |
| REMOTE_ADDR | Trusted-proxy decision only; never written to logs or mail | System | Security | Memory during request | Not stored |

Processors: website host (cPanel / Safaricom Business or successor) running `contact-handler.php` and the domain mailbox. No analytics processor receives inquiry fields. Formspree or another HTTPS endpoint is not used unless `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` is set at build time; default is same-origin PHP.

Cross-border: diaspora families may write from outside Kenya. Mail is stored on the host/mailbox provider. This is recorded here; it is not a public legal conclusion.

ODPC registration and DPIA status are evidence items for counsel, not website claims.

See [FIELD-NECESSITY.md](FIELD-NECESSITY.md), [DATA-FLOW.md](DATA-FLOW.md), and [DSAR-RUNBOOK.md](DSAR-RUNBOOK.md).

# Field necessity

Phone and email are both collected because:

1. Kenya and diaspora families convert on WhatsApp or a phone call. Speed-to-lead is the difference between a tour and a lost inquiry.
2. Email carries the acknowledgement, the request id, and the DSAR handle. WhatsApp alone cannot prove delivery of the privacy notice version.
3. Preferred channel tells intake which of those two to use first. The unused channel is fallback only.

| Field | If omitted |
|---|---|
| name | Cannot address the family or staff mail |
| preferred_channel | Intake guesses; delays conversion |
| phone | Cannot call or WhatsApp |
| email | Cannot send acknowledgement or honour DSAR by reference |
| relationship | Wrong script; harms trust |
| urgency | Hot leads wait behind planners |
| interest | Enum only; Prefer not to say is valid |
| location | Wrong time zone / tour logistics |
| tour_window | Extra round trip before a date is offered |
| resident_first_name | Optional. Never required |
| free-text medical notes | Not collected. Privacy and conversion both worse |

Default care need: Prefer not to say.

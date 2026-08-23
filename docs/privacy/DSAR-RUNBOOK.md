# Data-subject access, correction and deletion (synthetic)

Scope: web tour inquiries held in the domain mailbox and handler logs. Phone/WhatsApp threads are out of this runbook unless the request names them.

## Access

1. Ask for the request id from the acknowledgement mail, plus the email used on the form.
2. Search the intake mailbox for that request id.
3. Search `handler.log` for that request id (state/outcome only; no payload).
4. Export the matching mail to the requester. Redact other families.

## Correction

1. Confirm identity with request id + email.
2. Reply on the preferred channel with the corrected fact.
3. Keep the original mail; add a correction note in the same thread.

## Deletion

1. Confirm identity with request id + email.
2. Delete the inquiry thread from the mailbox, including trash and spam.
3. Delete any local export copies.
4. Handler logs keep the request id and outcome until the 12-month log rotation. They do not contain the payload.
5. If the person later became a resident, stop and use the admissions record policy instead.

## Cadence

Mailbox owner reviews inquiry mail older than 12 months on the first Monday of each month and deletes it. Missed runs escalate to the business owner the same week.

## Synthetic exercise

Recorded in [evidence/synthetic-lifecycle.json](evidence/synthetic-lifecycle.json).

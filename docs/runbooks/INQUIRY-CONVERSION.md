# Inquiry to admission

The website does not admit anyone. It creates a qualified conversation. Conversion is the intake desk's job, scored and scripted by the handler.

## Bands

| Band | Score | First move |
|---|---|---|
| hot | 70+ | Call or WhatsApp within 15 minutes. Offer a same-day or next-day private tour |
| warm | 45-69 | Reply within 2 hours. Lock a tour this week |
| nurture | below 45 | Reply within 2 hours. Explain the path. No pressure |

Scoring lives in `src/lib/contact/contract.ts` and `public/contact-handler.php`. Change both or neither.

## Path

1. Inquiry (form, phone, or WhatsApp)
2. Conversation on the preferred channel
3. Private tour in Karen
4. Assessment only if a fit is plausible
5. Written offer, or a clear no plus a referral conversation

If the home is not a fit, say so. A refused family who trusts you still refers.

## Scripts

Hot, WhatsApp:

> Hello [name], this is The Caring Cove. We received your request ([request_id]). Care is needed soon. Are you able to visit the Karen home today or tomorrow?

Nurture, email:

> Thank you for writing. Here is how families usually decide: a conversation, a private tour, then an assessment if it may be a fit. When would a call help?

## Do not

- Ask for diagnoses on the first touch
- Promise a suite
- Quote prices that are not in the approved fact register
- Leave a hot lead overnight

## Outage

If the form is disabled or mail fails, use phone +254 748 583 879 and WhatsApp on the same number. Tell the family the form is down. Still capture name, channel, urgency, and relationship in the mailbox by hand.

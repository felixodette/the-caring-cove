# Audit finding map

Maps every numbered finding in the 2026-08-17 source audits to one or more `AUD-*` IDs from `plans/cursor-full-remediation-spec.md`. Source SHA: `3b4fc2b68ddf166087fc10f81977e01b0450317d`.

## Systems completeness (`TCC-AUD-SYS-20260817`)

| Source finding | AUD IDs |
|---|---|
| 1. Care-interest inquiry data without privacy notice, consent, retention/deletion, processor record or approved lifecycle | AUD-001 |
| 2. Google Analytics loads before a visitor consent decision | AUD-002 |
| 3. Unsupported clinical, credential, staffing, outcome, comparative and operational claims | AUD-003 |
| 4. Template IT services, fake people, generic blogs, lorem text and fabricated engagement | AUD-004 |
| 5. Production dependency tree High advisories; Next.js 16.1.6 | AUD-007 |
| 6. Lint fails; CI does not run lint, tests, accessibility, security, link or staging-smoke gates | AUD-008, AUD-009, AUD-010 |
| 7. PHP handler CORS fail-open, no durable rate limit, weak normalization, no authenticated delivery evidence | AUD-011 |
| 8. FAQ/comment/search and other controls decorative or nonfunctional | AUD-015 |
| 9. Apache catch-all creates soft 404s and conceals missing policy pages | AUD-012 |
| 10. Phone, address/personnel and 1:1 versus 1:4 care-model facts conflict | AUD-005, AUD-006 |
| 11. Static-export architecture conflicts with `server.js`, `npm start` and deployment docs | AUD-013 |
| 12. No EARS requirements, V&V, interface/N2, FMEA, risk/decision registers, budgets, runbooks, monitoring, rollback or release packet | AUD-020, AUD-021 |
| 13. Images and the 18 MB export lack enforced performance budgets | AUD-022 |
| 14. Build root inferred from lockfiles outside the repository | AUD-024 |

## Content strategy (`TCC-AUD-CNT-20260817`)

| Source finding | AUD IDs |
|---|---|
| 1. Indexed service/team/blog routes contain template material, fake staff, lorem text, fake comments and IT categories | AUD-004, AUD-018 |
| 2. High-stakes clinical, credential and outcome claims lack named evidence/review | AUD-003 |
| 3. 1:1/1:4, phone, address, staff and brochure facts conflict | AUD-005, AUD-006 |
| 4. Internal marketing instructions render as visitor copy | AUD-014 |
| 5. Awareness-stage content fails: no real articles, descriptive slugs, authors, reviewers, sources or dates | AUD-017, AUD-018 |
| 6. Consideration coverage compressed into pages rather than hub/spoke resources | AUD-017 |
| 7. Decision coverage weak: hidden prices, unreliable team/proof, broken care-guide CTA | AUD-015, AUD-016 |
| 8. Admissions coverage thin: no verified assessment, eligibility, required information, next steps or response expectations | AUD-025 |
| 9. No genuine case studies, customer research, keyword evidence, competitor gaps, performance data or editorial workflow | AUD-023 |
| 10. Search, comments, categories, consultation forms and social `#` links nonfunctional | AUD-015 |
| 11. Brochure image-only/untagged with stale people, Day Centre, phone/address and service facts | AUD-019, AUD-026 |
| 12. No content owners, publication states, claim evidence, style guide, review cadence, expiry or withdrawal | AUD-003, AUD-020 |

## Spec `AUD-*` coverage check

Every `AUD-001` through `AUD-026` appears at least once above. No source-audit numbered finding is left unmapped.

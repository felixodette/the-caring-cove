# The Caring Cove — Systems Completeness Audit

| Field | Value |
|---|---|
| Audit ID | TCC-AUD-SYS-20260817 |
| Audited baseline | `3b4fc2b68ddf166087fc10f81977e01b0450317d` |
| Scope | Read-only repository and limited production HTTP evidence |
| Verdict | NO-GO for a controlled production release |

## Verified evidence

- `npm ci` passed and reported 10 advisories: 1 Low and 9 High.
- `npm audit --omit=dev` reported 5 High production-tree advisories.
- TypeScript `tsc --noEmit` passed.
- `npm run lint` failed with 4 errors and 25 warnings.
- `npm run build` passed outside the restricted sandbox and generated 19 routes.
- Generated-site scan inspected 17 HTML files and found no missing local link/asset targets.
- `php -l public/contact-handler.php` passed.
- No repository-owned test command or test files existed.
- Production homepage returned 200; contact handler returned 405 for GET.
- `/privacy/`, `/terms/`, `/cookies/`, `/accessibility/` and an arbitrary nonexistent path returned homepage HTML with HTTP 200.
- CodeGraph was not initialized; direct repository inspection was used. This is an audit limitation, not a product defect.

## Findings

1. Sensitive care-interest inquiry data is collected without an implemented privacy notice, consent record, retention/deletion workflow, processor record or approved data lifecycle.
2. Google Analytics loads before a visitor consent decision.
3. Public content contains unsupported clinical, credential, staffing, outcome, comparative and operational claims.
4. Public/indexed routes contain template IT services, fake people, generic blogs, lorem text and fabricated engagement.
5. Production dependency tree contains unresolved High advisories; direct Next.js version was 16.1.6.
6. Lint fails and CI does not run lint, tests, accessibility, security, link or staging-smoke gates.
7. The PHP handler fails open on CORS, has no durable rate limiting, weak normalization/header handling, no transport authentication evidence, no safe observability and no authenticated live-delivery evidence.
8. FAQ/comment/search and other controls are decorative or nonfunctional.
9. Apache catch-all creates soft 404s and conceals missing policy pages.
10. Phone, address/personnel and 1:1/1:4 care-model facts conflict across surfaces.
11. Static-export architecture conflicts with `server.js`, `npm start` and parts of deployment documentation.
12. No EARS requirements, V&V matrix, interface/N2 register, FMEA, risk/decision register, budgets, runbooks, monitoring, rollback or release evidence packet exists.
13. Images and the 18 MB export lack enforced performance budgets.
14. Build root is inferred from lockfiles outside the repository.

## Required disposition

Remove harmful content immediately; establish approved facts/claims and privacy controls; harden and live-verify inquiry delivery; add full tests and CI; reconcile the static architecture; implement true 404 behavior, accessibility, performance, monitoring, rollback and systems governance; release only an approved exact artifact digest.

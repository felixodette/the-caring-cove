#!/usr/bin/env node
const base = process.argv[2];
if (!base) {
  console.error("Usage: node scripts/emergency-route-check.mjs <staging-base-url>");
  process.exit(1);
}

const approved = ["/", "/about/", "/service/", "/gallery/", "/faq/", "/contact/"];
const removed = ["/blog/", "/team/", "/team-details/", "/blog-details/1/"];
const unknown = "/this-path-does-not-exist-tcc-emergency-probe/";

async function probe(path) {
  const url = new URL(path, base).toString();
  const res = await fetch(url, { redirect: "follow" });
  const text = await res.text();
  const title = text.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? null;
  return { url, status: res.status, title, bytes: text.length };
}

const rows = [];
for (const path of [...approved, ...removed, unknown]) {
  rows.push({ path, ...(await probe(path)) });
}

const unknownRow = rows.find((r) => r.path === unknown);
const removedStill200 = rows.filter((r) => removed.includes(r.path) && r.status === 200);
const ok =
  unknownRow?.status === 404 &&
  removedStill200.length === 0 &&
  rows.filter((r) => approved.includes(r.path)).every((r) => r.status === 200);

const report = { base, rows, ok };
console.log(JSON.stringify(report, null, 2));
process.exit(ok ? 0 : 1);

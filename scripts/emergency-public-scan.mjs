#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = process.argv[2] ?? join(ROOT, "out");

const bannedPhrases = [
  "googletagmanager.com/gtag/js",
  "G-G2NK1PYSKZ",
  "lorem ipsum",
  "sollicitudin",
  "Sarah Johnson",
  "contact-handler.php",
];

const approvedRouteFiles = new Set([
  "index.html",
  "404.html",
  "about/index.html",
  "service/index.html",
  "gallery/index.html",
  "faq/index.html",
  "contact/index.html",
  "robots.txt",
  "sitemap.xml",
]);

const removedRoutePrefixes = ["blog/", "team/", "blog-details/", "team-details/"];

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (name.endsWith(".html") || name === "sitemap.xml") acc.push(full);
  }
  return acc;
}

const files = walk(outDir);
const htmlFiles = files.filter((f) => f.endsWith(".html"));
const hits = [];

for (const file of htmlFiles) {
  const rel = relative(outDir, file).replaceAll("\\", "/");
  const text = readFileSync(file, "utf8");
  for (const phrase of bannedPhrases) {
    if (text.toLowerCase().includes(phrase.toLowerCase())) {
      hits.push({ file: rel, phrase });
    }
  }
  if (rel !== "404.html" && rel !== "index.html" && !approvedRouteFiles.has(rel)) {
    if (removedRoutePrefixes.some((prefix) => rel.startsWith(prefix))) {
      hits.push({ file: rel, phrase: "removed-route-still-present" });
    }
  }
}

const report = {
  outDir,
  html_count: htmlFiles.length,
  hits,
  ok: hits.length === 0,
};

console.log(JSON.stringify(report, null, 2));
process.exit(report.ok ? 0 : 1);

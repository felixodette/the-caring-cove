import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
export const UNMET_PREREQUISITE_EXIT = 2;

const SKIP_DIR = new Set([
  ".git",
  "node_modules",
  ".next",
  "coverage",
  "graphify-out",
  "artifacts",
  "docs/audits/evidence",
]);

export function nowIso() {
  return new Date().toISOString();
}

export function sha256(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

export function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function evidenceDir(phase = "7A") {
  const dir = join(ROOT, "artifacts", "verification", "local", phase);
  mkdirSync(dir, { recursive: true });
  return dir;
}

export function writeEvidence(name, data, phase = "7A") {
  const path = join(evidenceDir(phase), name);
  const body = `${JSON.stringify(data, null, 2)}\n`;
  writeFileSync(path, body);
  return path;
}

export function unmetPrerequisite(command, phase, missing) {
  const payload = {
    ok: false,
    result: "unmet-prerequisite",
    command,
    blocking_phase: phase,
    missing,
    timestamp: nowIso(),
  };
  writeEvidence(`${command.replace(/[^\w.-]+/g, "-")}.json`, payload);
  process.stdout.write(`${JSON.stringify(payload)}\n`);
  process.exitCode = UNMET_PREREQUISITE_EXIT;
  return payload;
}

export function walkFiles(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = relative(ROOT, full).replaceAll("\\", "/");
    if ([...SKIP_DIR].some((skip) => rel === skip || rel.startsWith(`${skip}/`))) {
      continue;
    }
    const st = statSync(full);
    if (st.isDirectory()) walkFiles(full, acc);
    else acc.push(full);
  }
  return acc;
}

export function scanText(text, needles) {
  const lower = text.toLowerCase();
  const hits = [];
  for (const needle of needles) {
    const n = needle.toLowerCase();
    let from = 0;
    while (from < lower.length) {
      const idx = lower.indexOf(n, from);
      if (idx === -1) break;
      hits.push({ needle, index: idx });
      from = idx + n.length;
    }
  }
  return hits;
}

export function publicScanRoots() {
  const roots = [join(ROOT, "src"), join(ROOT, "public")];
  if (existsSync(join(ROOT, "out"))) roots.push(join(ROOT, "out"));
  return roots;
}

export function scanProhibited(roots = publicScanRoots()) {
  const rules = readJson(join(ROOT, "scripts/quality/prohibited-public-content.json"));
  const needles = [...rules.phrases, ...rules.controls, ...rules.analytics];
  const files = roots.flatMap((root) =>
    walkFiles(root).filter((f) => /\.(html|tsx|ts|jsx|js|json|php|md)$/i.test(f)),
  );
  const matches = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const hits = scanText(text, needles);
    if (hits.length) {
      matches.push({
        file: relative(ROOT, file).replaceAll("\\", "/"),
        count: hits.length,
        needles: [...new Set(hits.map((h) => h.needle))],
      });
    }
  }
  return { rules: rules.id, aud: rules.aud, file_count: files.length, matches };
}

export function listGeneratedHtml() {
  const out = join(ROOT, "out");
  if (!existsSync(out)) {
    return { present: false, files: [] };
  }
  const files = walkFiles(out)
    .filter((f) => f.endsWith(".html"))
    .map((f) => relative(out, f).replaceAll("\\", "/"))
    .sort();
  return { present: true, files, count: files.length };
}

export function commandEnv() {
  const env = { ...process.env };
  const browsers = env.PLAYWRIGHT_BROWSERS_PATH ?? "";
  if (browsers.includes("cursor-sandbox-cache")) {
    delete env.PLAYWRIGHT_BROWSERS_PATH;
    const homeCache = join(env.HOME ?? "", "Library/Caches/ms-playwright");
    if (env.HOME && existsSync(homeCache)) {
      env.PLAYWRIGHT_BROWSERS_PATH = homeCache;
    }
  }
  return env;
}

export function run(cmd, args, opts = {}) {
  try {
    const stdout = execFileSync(cmd, args, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      env: commandEnv(),
      ...opts,
    });
    return { exit: 0, stdout, stderr: "" };
  } catch (err) {
    return {
      exit: err.status ?? 1,
      stdout: err.stdout?.toString() ?? "",
      stderr: err.stderr?.toString() ?? "",
    };
  }
}

export const AUDIT_IDS = Array.from(
  { length: 26 },
  (_, i) => `AUD-${String(i + 1).padStart(3, "0")}`,
);

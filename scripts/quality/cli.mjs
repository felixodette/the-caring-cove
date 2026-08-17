import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  AUDIT_IDS,
  ROOT,
  UNMET_PREREQUISITE_EXIT,
  listGeneratedHtml,
  nowIso,
  publicScanRoots,
  readJson,
  run,
  scanProhibited,
  unmetPrerequisite,
  writeEvidence,
} from "./lib.mjs";

const GATED = {
  "release:build": 9,
  "release:verify": 9,
  "deploy:staging": 9,
  "smoke:staging": 9,
  "rollback:staging": 9,
};

const PUBLICATION = readJson(join(ROOT, "tests/fixtures/content/publication-states.json"));

function finish(name, payload, exit = 0) {
  writeEvidence(`${name.replace(/[^\w.-]+/g, "-")}.json`, payload);
  process.stdout.write(
    `${JSON.stringify({ command: name, ok: payload.ok, exit, aud: payload.aud ?? [] })}\n`,
  );
  process.exitCode = exit;
  return payload;
}

function lintContainment() {
  const scan = scanProhibited();
  const ga = scan.matches.filter((m) =>
    m.needles.some((n) => n.includes("gtag") || n.startsWith("G-")),
  );
  const placeholders = scan.matches.filter((m) =>
    m.needles.some((n) => !n.includes("gtag") && !n.startsWith("G-")),
  );
  const ok = scan.matches.length === 0;
  return finish(
    "lint:containment",
    {
      ok,
      aud: ok ? [] : ["AUD-002", "AUD-004", "AUD-015"],
      analytics_hits: ga.length,
      placeholder_hits: placeholders.length,
      matches: scan.matches,
      timestamp: nowIso(),
    },
    ok ? 0 : 1,
  );
}

function formatCheck() {
  const result = run(
    "npx",
    [
      "prettier",
      "--check",
      "scripts",
      "tests",
      ".github/workflows/quality.yml",
      "vitest.config.ts",
      "playwright.config.cjs",
      "cspell.json",
    ],
    {
      env: { ...process.env, npm_config_yes: "true" },
    },
  );
  const ok = result.exit === 0;
  return finish(
    "format:check",
    {
      ok,
      aud: ok ? [] : ["AUD-008"],
      exit: result.exit,
      stdout_tail: `${result.stdout}\n${result.stderr}`.trim().slice(-4000),
      timestamp: nowIso(),
    },
    ok ? 0 : 1,
  );
}

function docsCheck() {
  const roots = [join(ROOT, "docs"), join(ROOT, "plans")];
  const md = roots.flatMap((dir) =>
    existsSync(dir)
      ? readdirSync(dir, { recursive: true })
          .filter((f) => String(f).endsWith(".md"))
          .map((f) => join(dir, String(f)))
      : [],
  );
  const missing = [];
  const link = /\[[^\]]+\]\(([^)]+)\)/g;
  for (const file of md) {
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(link)) {
      const href = match[1].split("#")[0].split("?")[0];
      if (!href || href.startsWith("http") || href.startsWith("mailto:")) continue;
      const target = join(file, "..", href);
      if (!existsSync(target)) missing.push({ file: file.replace(`${ROOT}/`, ""), href });
    }
  }
  const ok = missing.length === 0;
  return finish(
    "docs:check",
    { ok, aud: ok ? [] : ["AUD-020"], missing, files: md.length, timestamp: nowIso() },
    ok ? 0 : 1,
  );
}

function traceabilityCheck() {
  const spec = readFileSync(join(ROOT, "plans/cursor-full-remediation-spec.md"), "utf8");
  const map = readFileSync(join(ROOT, "docs/audits/FINDING-MAP.md"), "utf8");
  const missing_in_spec = AUDIT_IDS.filter((id) => !spec.includes(id));
  const missing_in_map = AUDIT_IDS.filter((id) => !map.includes(id));
  const ok = missing_in_spec.length === 0 && missing_in_map.length === 0;
  return finish(
    "traceability:check",
    { ok, aud: ok ? [] : ["AUD-020"], missing_in_spec, missing_in_map, timestamp: nowIso() },
    ok ? 0 : 1,
  );
}

function spellCheck() {
  const result = run(
    "npx",
    ["cspell", "--no-progress", "--no-summary", "docs", "plans", "scripts/quality"],
    {
      env: { ...process.env, npm_config_yes: "true" },
    },
  );
  const ok = result.exit === 0;
  return finish(
    "spell:check",
    {
      ok,
      aud: ok ? [] : ["AUD-014"],
      exit: result.exit,
      stdout_tail: `${result.stdout}\n${result.stderr}`.trim().slice(-4000),
      timestamp: nowIso(),
    },
    ok ? 0 : 1,
  );
}

export function publicationAllows(record) {
  return (
    PUBLICATION.public_allowed.includes(record.publication_state) && record.status !== "expired"
  );
}

function contentCheck() {
  const scan = scanProhibited();
  const facts = readJson(join(ROOT, "tests/fixtures/content/facts.valid.json"));
  const draft = readJson(join(ROOT, "tests/fixtures/content/facts.unapproved.json"));
  const expired = readJson(join(ROOT, "tests/fixtures/content/claims.expired.json"));
  const mutations = {
    draft_blocked: !publicationAllows(draft),
    expired_blocked:
      expired.status === "expired" || !publicationAllows({ publication_state: expired.status }),
    valid_allowed: publicationAllows(facts),
  };
  const mutations_ok =
    mutations.draft_blocked && mutations.expired_blocked && mutations.valid_allowed;
  const ok = scan.matches.length === 0 && mutations_ok;
  return finish(
    "content:check",
    {
      ok,
      aud: scan.matches.length ? ["AUD-003", "AUD-004", "AUD-014"] : [],
      prohibited: scan,
      mutations,
      timestamp: nowIso(),
    },
    ok ? 0 : 1,
  );
}

function testRoutes() {
  const generated = listGeneratedHtml();
  const htaccess = existsSync(join(ROOT, "public/.htaccess"))
    ? readFileSync(join(ROOT, "public/.htaccess"), "utf8")
    : "";
  const catchAllHomepage = /RewriteRule\s+\.\s+\/index\.html/.test(htaccess);
  const hasErrorDocument = /ErrorDocument\s+404/.test(htaccess);
  const ok = generated.present && !catchAllHomepage && hasErrorDocument;
  return finish(
    "test:routes",
    {
      ok,
      aud: ok ? [] : ["AUD-012"],
      generated,
      catchAllHomepage,
      hasErrorDocument,
      timestamp: nowIso(),
    },
    ok ? 0 : 1,
  );
}

function testLinks() {
  const generated = listGeneratedHtml();
  if (!generated.present) {
    return finish(
      "test:links",
      { ok: false, aud: ["AUD-009"], reason: "out/ missing; run build first", timestamp: nowIso() },
      1,
    );
  }
  const scan = scanProhibited([join(ROOT, "out")]);
  const ok = scan.matches.length === 0;
  return finish(
    "test:links",
    { ok, aud: ok ? [] : ["AUD-004", "AUD-015"], generated, prohibited: scan, timestamp: nowIso() },
    ok ? 0 : 1,
  );
}

function testPrivacyLifecycle() {
  const privacyDocs = ["docs/privacy/DATA-INVENTORY.md", "docs/privacy/DATA-FLOW.md"].map((p) => ({
    path: p,
    present: existsSync(join(ROOT, p)),
  }));
  const exercised = existsSync(join(ROOT, "docs/privacy/evidence/synthetic-lifecycle.json"));
  const ok = privacyDocs.every((d) => d.present) && exercised;
  return finish(
    "test:privacy-lifecycle",
    { ok, aud: ok ? [] : ["AUD-001"], privacyDocs, exercised, timestamp: nowIso() },
    ok ? 0 : 1,
  );
}

function testIntegration() {
  const generated = listGeneratedHtml();
  const php = existsSync(join(ROOT, "public/contact-handler.php"));
  const corsFailOpen =
    php &&
    /Access-Control-Allow-Origin:\s*\*/.test(
      readFileSync(join(ROOT, "public/contact-handler.php"), "utf8"),
    );
  const ok = generated.present && php && !corsFailOpen;
  return finish(
    "test:integration",
    {
      ok,
      aud: ok ? [] : ["AUD-011", "AUD-009"],
      generated_present: generated.present,
      php_handler_present: php,
      corsFailOpen,
      timestamp: nowIso(),
    },
    ok ? 0 : 1,
  );
}

function testPhp() {
  const file = join(ROOT, "public/contact-handler.php");
  const result = run("php", ["-l", file]);
  const ok = result.exit === 0 && result.stdout.includes("No syntax errors");
  return finish(
    "test:php",
    {
      ok,
      aud: ok ? [] : ["AUD-011"],
      stdout: result.stdout.trim(),
      stderr: result.stderr.trim(),
      timestamp: nowIso(),
    },
    ok ? 0 : 1,
  );
}

function testSecurity() {
  const result = run("npm", ["audit", "--omit=dev", "--json"]);
  let parsed = {};
  try {
    parsed = JSON.parse(result.stdout || "{}");
  } catch {
    parsed = { parse_error: true };
  }
  const vulnerabilities = parsed.metadata?.vulnerabilities ?? {};
  const high = (vulnerabilities.high ?? 0) + (vulnerabilities.critical ?? 0);
  const ok = high === 0;
  return finish(
    "test:security",
    { ok, aud: ok ? [] : ["AUD-007"], high, vulnerabilities, timestamp: nowIso() },
    ok ? 0 : 1,
  );
}

function runCi() {
  const quality = [
    "lint:containment",
    "format:check",
    "lint",
    "typecheck",
    "docs:check",
    "traceability:check",
    "spell:check",
    "content:check",
    "test:routes",
    "test:content",
    "test:privacy-lifecycle",
    "test:unit",
    "test:integration",
    "test:php",
    "build",
    "test:links",
    "test:e2e",
    "test:a11y",
    "test:security",
  ];
  const gated = Object.keys(GATED);
  const rows = [];

  for (const name of quality) {
    const result = run("npm", ["run", name]);
    rows.push({
      command: name,
      kind: "quality",
      exit: result.exit,
      ok: result.exit === 0,
    });
  }

  let gated_ok = true;
  for (const name of gated) {
    const result = run("npm", ["run", name]);
    const stdout = `${result.stdout}\n${result.stderr}`;
    const parsed = (() => {
      try {
        const line = stdout
          .split("\n")
          .reverse()
          .find((l) => l.includes("unmet-prerequisite"));
        return line ? JSON.parse(line) : null;
      } catch {
        return null;
      }
    })();
    const ok = result.exit === UNMET_PREREQUISITE_EXIT && parsed?.result === "unmet-prerequisite";
    gated_ok = gated_ok && ok;
    rows.push({ command: name, kind: "gated", exit: result.exit, ok, parsed });
  }

  const unit = rows.find((r) => r.command === "test:unit");
  const typecheck = rows.find((r) => r.command === "typecheck");
  const docs = rows.find((r) => r.command === "docs:check");
  const trace = rows.find((r) => r.command === "traceability:check");
  const harness_ok = Boolean(unit?.ok && typecheck?.ok && docs?.ok && trace?.ok && gated_ok);
  const payload = {
    ok: harness_ok,
    aud: rows.filter((r) => !r.ok && r.kind === "quality").map((r) => r.command),
    gated_ok,
    rows,
    timestamp: nowIso(),
    note: "Harness passes when unit/typecheck/docs/traceability pass and gated commands fail closed. Product quality failures are recorded, not hidden.",
  };
  writeEvidence("script-matrix.json", payload);
  process.stdout.write(
    `${JSON.stringify({ ok: harness_ok, gated_ok, failing_quality: payload.aud }, null, 2)}\n`,
  );
  process.exitCode = harness_ok ? 0 : 1;
}

function main(argv) {
  const cmd = argv[0];
  if (cmd === "unmet") {
    const phaseIdx = argv.indexOf("--phase");
    const commandIdx = argv.indexOf("--command");
    const phase = Number(argv[phaseIdx + 1]);
    const command = argv[commandIdx + 1];
    return unmetPrerequisite(command, phase, [`Phase ${phase} has not replaced this command`]);
  }

  const dispatch = {
    "lint:containment": lintContainment,
    "format:check": formatCheck,
    "docs:check": docsCheck,
    "traceability:check": traceabilityCheck,
    "spell:check": spellCheck,
    "content:check": contentCheck,
    "test:content": contentCheck,
    "test:routes": testRoutes,
    "test:links": testLinks,
    "test:privacy-lifecycle": testPrivacyLifecycle,
    "test:integration": testIntegration,
    "test:php": testPhp,
    "test:security": testSecurity,
    ci: runCi,
  };

  if (!dispatch[cmd]) {
    process.stderr.write(`Unknown quality command: ${cmd}\n`);
    process.exitCode = 1;
    return;
  }
  dispatch[cmd]();
}

main(process.argv.slice(2));

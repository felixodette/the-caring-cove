import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CONTACT_CONTRACT,
  createRequestId,
  payloadHasCrLf,
  scoreInquiry,
  validateInquiry,
  type ContactInquiry,
} from "../../src/lib/contact/contract";

const ROOT = join(import.meta.dirname, "../..");
const PHP = join(ROOT, "public/contact-handler.php");

function load(path: string) {
  return JSON.parse(readFileSync(join(ROOT, path), "utf8"));
}

function phpAvailable(): boolean {
  const result = spawnSync("php", ["-v"], { encoding: "utf8" });
  return result.status === 0;
}

describe("inquiry contract", () => {
  it("accepts the synthetic valid payload", () => {
    const payload = load("tests/fixtures/contact/payload.valid.json");
    const result = validateInquiry(payload);
    expect(result.ok).toBe(true);
    expect(result.value?.sender_name).toBe("Synthetic Family Member");
  });

  it("rejects CR/LF injection in name", () => {
    const payload = load("tests/fixtures/contact/payload.injection.json");
    expect(payloadHasCrLf(payload.sender_name)).toBe(true);
    expect(validateInquiry(payload).ok).toBe(false);
  });

  it("rejects missing consent and unknown care-need text", () => {
    const payload = load("tests/fixtures/contact/payload.valid.json");
    expect(validateInquiry({ ...payload, consent: false }).ok).toBe(false);
    expect(validateInquiry({ ...payload, interest: "Exact ICD diagnosis" }).ok).toBe(false);
  });

  it("rejects stale privacy notice versions", () => {
    const payload = load("tests/fixtures/contact/payload.valid.json");
    expect(validateInquiry({ ...payload, policy_version: "unapproved" }).ok).toBe(false);
  });

  it("matches the language-neutral contract fixture", () => {
    const fixture = load("tests/fixtures/contact/contract.json");
    expect(CONTACT_CONTRACT.version).toBe(fixture.version);
    expect(CONTACT_CONTRACT.privacy_notice_version).toBe(fixture.privacy_notice_version);
    expect(CONTACT_CONTRACT.enums).toEqual(fixture.enums);
  });

  it("creates opaque request ids", () => {
    const id = createRequestId(() => Uint8Array.from({ length: 13 }, (_, i) => i));
    expect(id).toBe("tcc_inq_000102030405060708090a0b0c");
  });

  it("scores a hot diaspora crisis inquiry above a planner", () => {
    const hot = validateInquiry(load("tests/fixtures/contact/payload.hot.json"));
    const valid = validateInquiry(load("tests/fixtures/contact/payload.valid.json"));
    expect(hot.value).toBeDefined();
    expect(valid.value).toBeDefined();
    const hotScore = scoreInquiry(hot.value as ContactInquiry);
    const warmScore = scoreInquiry(valid.value as ContactInquiry);
    expect(hotScore.band).toBe("hot");
    expect(hotScore.score).toBeGreaterThan(warmScore.score);
    expect(hotScore.nextAction).toMatch(/15 minutes/);
    expect(warmScore.score).toBe(75);
    expect(warmScore.band).toBe("hot");
  });
});

describe.skipIf(!phpAvailable())("PHP contract parity", () => {
  it("dumps the same enums and versions as TypeScript", () => {
    const result = spawnSync("php", [PHP, "--dump-contract"], { encoding: "utf8" });
    expect(result.status).toBe(0);
    const dumped = JSON.parse(result.stdout);
    expect(dumped.version).toBe(CONTACT_CONTRACT.version);
    expect(dumped.privacy_notice_version).toBe(CONTACT_CONTRACT.privacy_notice_version);
    expect(dumped.enums.interests).toEqual(CONTACT_CONTRACT.enums.interests);
    expect(dumped.enums.relationships).toEqual(CONTACT_CONTRACT.enums.relationships);
    expect(dumped.enums.urgencies).toEqual(CONTACT_CONTRACT.enums.urgencies);
    expect(dumped.enums.channels).toEqual(CONTACT_CONTRACT.enums.channels);
    expect(dumped.enums.tour_windows).toEqual(CONTACT_CONTRACT.enums.tour_windows);
  });

  it("scores the hot fixture the same way", () => {
    const payload = load("tests/fixtures/contact/payload.hot.json");
    const ts = scoreInquiry(validateInquiry(payload).value as ContactInquiry);
    const result = spawnSync("php", [PHP, "--score-json", JSON.stringify(payload)], {
      encoding: "utf8",
    });
    expect(result.status).toBe(0);
    const phpScore = JSON.parse(result.stdout);
    expect(phpScore.score).toBe(ts.score);
    expect(phpScore.band).toBe(ts.band);
    expect(phpScore.nextAction).toBe(ts.nextAction);
  });

  it("passes the handler self-test", () => {
    const result = spawnSync("php", [PHP, "--self-test"], { encoding: "utf8" });
    expect(result.status, result.stdout + result.stderr).toBe(0);
  });
});

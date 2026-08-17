import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  claimIsPublic,
  payloadHasCrLf,
  publicationAllows,
} from "../../scripts/quality/publication.mts";

const ROOT = join(import.meta.dirname, "../..");

function load(path: string) {
  return JSON.parse(readFileSync(join(ROOT, path), "utf8"));
}

describe("publication fixtures", () => {
  it("allows only approved facts", () => {
    const valid = load("tests/fixtures/content/facts.valid.json");
    const draft = load("tests/fixtures/content/facts.unapproved.json");
    expect(publicationAllows(valid)).toBe(true);
    expect(publicationAllows(draft)).toBe(false);
  });

  it("rejects expired claims", () => {
    const expired = load("tests/fixtures/content/claims.expired.json");
    expect(claimIsPublic(expired)).toBe(false);
  });
});

describe("contact payload hygiene", () => {
  it("accepts the synthetic valid payload", () => {
    const payload = load("tests/fixtures/contact/payload.valid.json");
    expect(payloadHasCrLf(payload.sender_name)).toBe(false);
  });

  it("rejects CR/LF injection in name", () => {
    const payload = load("tests/fixtures/contact/payload.injection.json");
    expect(payloadHasCrLf(payload.sender_name)).toBe(true);
  });
});

describe("consent default", () => {
  it("keeps analytics off", () => {
    const consent = load("tests/fixtures/privacy/consent.default.json");
    expect(consent.necessary).toBe(true);
    expect(consent.analytics).toBe(false);
  });
});

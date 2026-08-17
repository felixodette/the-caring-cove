import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("phase-gated commands", () => {
  it("release:build fails closed with unmet-prerequisite", () => {
    try {
      execFileSync("npm", ["run", "release:build", "--silent"], { encoding: "utf8" });
      throw new Error("expected nonzero exit");
    } catch (err) {
      const e = err as { status?: number; stdout?: string; message?: string };
      expect(e.status).toBe(2);
      expect(`${e.stdout}`).toContain("unmet-prerequisite");
    }
  });
});

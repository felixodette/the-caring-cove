import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const fixture = join(__dirname, "../e2e/fixtures/contact-form.html");

test("conversion form fixture has no serious axe violations", async ({ page }) => {
  await page.setContent(readFileSync(fixture, "utf8"));
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter(
    (v) => v.impact === "serious" || v.impact === "critical",
  );
  expect(serious, JSON.stringify(serious.map((v) => v.id))).toEqual([]);
});

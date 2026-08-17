import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

const fixture = join(__dirname, "fixtures/synthetic.html");

test("synthetic fixture renders without PII", async ({ page }) => {
  const html = readFileSync(fixture, "utf8");
  await page.setContent(html);
  await expect(page.getByRole("heading", { name: "Quality fixture" })).toBeVisible();
  expect(html).not.toMatch(/@gmail\.com|@yahoo\.com|\+2547\d{8}/);
});

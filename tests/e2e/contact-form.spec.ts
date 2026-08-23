import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

const fixture = join(__dirname, "fixtures/contact-form.html");

test("conversion form fixture exposes labelled fields and consent", async ({ page }) => {
  await page.setContent(readFileSync(fixture, "utf8"));
  await expect(page.getByRole("heading", { name: "Request a Private Tour" })).toBeVisible();
  await expect(page.getByLabel("Who is this inquiry for?")).toBeVisible();
  await expect(page.getByLabel("How soon is care needed?")).toBeVisible();
  await expect(page.getByLabel("Your name")).toBeVisible();
  await expect(page.getByLabel(/I want The Caring Cove to use these details/)).toBeVisible();
  await expect(page.getByRole("link", { name: "Inquiry notice" })).toHaveAttribute(
    "href",
    "#inquiry-privacy",
  );
  await page.getByLabel("Your name").fill("Synthetic Family Member");
  await expect(page.getByLabel("Your name")).toHaveValue("Synthetic Family Member");
});

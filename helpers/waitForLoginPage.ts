import { Page, expect } from "@playwright/test";

export async function waitForLoginPage(page: Page) {
  await page.waitForTimeout(3000);

  // Wait for React to hydrate + inputs to appear
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle");

  // Username field is the most reliable signal
  await expect(page.locator("#username")).toBeVisible({ timeout: 60000 });
  await expect(page.locator("#password")).toBeVisible({ timeout: 60000 });
}

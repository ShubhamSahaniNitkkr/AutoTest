import { Page } from "@playwright/test";

export async function cleanupOverlays(page: Page) {
  // Cookie modal
  const acceptCookies = page.getByRole("button", { name: "Accept" });
  if (await acceptCookies.isVisible({ timeout: 3000 }).catch(() => false)) {
    await acceptCookies.click();
  }

  // Maintenance banner
  const dismissBanner = page.getByRole("button", {
    name: /dismiss/i,
  });
  if (await dismissBanner.isVisible({ timeout: 3000 }).catch(() => false)) {
    await dismissBanner.click();
  }

  const viewport = page.viewportSize();

  if (!viewport) {
    throw new Error("Viewport size not available");
  }

  await page.mouse.click(viewport.width / 2, viewport.height / 2);
  await page.waitForTimeout(3000);
}

import { test, expect } from "@playwright/test";
import { waitForLoginPage } from "../../helpers/waitForLoginPage";
import { cleanupOverlays } from "../../helpers/cleanupOverlays";

test("Copy Sharable link for review after login", async ({ page }) => {
  await page.goto("https://demo.smartblue.ai");
  await waitForLoginPage(page);

  await page.fill("#username", process.env.TEST_USERNAME || "");
  await page.fill("#password", process.env.TEST_PASSWORD || "");
  await page.getByRole("button", { name: "Login" }).click();

  await cleanupOverlays(page);

  // ---------------------------
  // CLICK DOCUMENT
  // ---------------------------
  const documentCard = page.getByText("Red-Black_tree.pdf", { exact: true });

  await documentCard.scrollIntoViewIfNeeded();
  await documentCard.waitFor({ state: "visible", timeout: 60000 });
  await documentCard.click();

  await page.waitForTimeout(10000);

  await cleanupOverlays(page);
  await page.waitForTimeout(3000);

  // ---------------------------
  // WAIT FOR SHARE (KEY FIX)
  // ---------------------------
  const shareText = page.locator("text=Share").first();

  await shareText.waitFor({ state: "visible", timeout: 60000 });
  await shareText.scrollIntoViewIfNeeded();

  // BrowserStack mobile needs a small pause
  await page.waitForTimeout(500);

  await shareText.click();

  // ---------------------------
  // SHARE FOR REVIEW
  // ---------------------------
  const shareForReview = page.getByText("Share for Review");
  await shareForReview.waitFor({ state: "visible", timeout: 60000 });
  await shareForReview.click();
  await page.waitForTimeout(3000);

  // ---------------------------
  // EMAIL
  // ---------------------------
  const emailInput = page.locator("#tag-input-field");
  await emailInput.waitFor({ state: "visible", timeout: 60000 });
  await emailInput.fill(
    `shubham+${Math.floor(Math.random() * 1000) + 1}@example.com`
  );
  await emailInput.press("Enter");
  await page.waitForTimeout(3000);

  // ---------------------------
  // SAVE & SEND
  // ---------------------------
  const copyLinkResponsePromise = page.waitForResponse(
    (response) =>
      response.url().toLowerCase().includes("copycommonlink") &&
      response.status() === 200,
    { timeout: 30000 }
  );

  await page.locator("button.share-link").click();

  // ⬅️ wait for API after click
  const copyLinkResponse = await copyLinkResponsePromise;
  expect(copyLinkResponse.ok()).toBeTruthy();
});

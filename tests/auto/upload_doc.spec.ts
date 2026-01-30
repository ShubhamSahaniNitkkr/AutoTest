import { test, expect } from "@playwright/test";
import path from "path";
import { waitForLoginPage } from "../../helpers/waitForLoginPage";
import { cleanupOverlays } from "../../helpers/cleanupOverlays";

test("Upload document and wait for AI processing", async ({ page }) => {
  // ---------------------------
  // LOGIN
  // ---------------------------
  await page.goto("https://demo.smartblue.ai");
  await waitForLoginPage(page);

  await page.fill("#username", process.env.TEST_USERNAME || "");
  await page.fill("#password", process.env.TEST_PASSWORD || "");
  await page.getByRole("button", { name: "Login" }).click();

  await cleanupOverlays(page);

  // ---------------------------
  // CLICK UPLOAD NEW
  // ---------------------------
  const uploadNew = page.getByText("Upload New", { exact: true });
  await uploadNew.waitFor({ state: "visible", timeout: 60000 });
  await uploadNew.click();

  // ---------------------------
  // CLICK LINK BUTTON
  // ---------------------------
  const linkButton = page.getByRole("button", { name: "Link" });
  await linkButton.waitFor({ state: "visible", timeout: 60000 });
  await linkButton.click();

  // ---------------------------
  // ENTER DOCUMENT LINK
  // ---------------------------
  const documentLinkInput = page.locator(
    'input[placeholder="Enter document link..."]'
  );

  await documentLinkInput.waitFor({ state: "visible", timeout: 60000 });
  await documentLinkInput.fill(
    "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
  );

  // ---------------------------
  // CLICK CONFIRM
  // ---------------------------
  const confirmButton = page.getByRole("button", { name: "Confirm" });
  await confirmButton.waitFor({ state: "visible", timeout: 60000 });
  await confirmButton.click();

  // ---------------------------
  // WAIT FOR AI RESPONSE (POLLING)
  // ---------------------------
  const aiTextLocator = page.locator(
    "text=I am an AI Agent powered by Blue AI"
  );

  const maxWaitMinutes = 5;
  const intervalMs = 60_000; // 1 minute
  let success = false;

  for (let i = 0; i < maxWaitMinutes; i++) {
    try {
      await aiTextLocator.waitFor({ state: "visible", timeout: 10_000 });
      success = true;
      break;
    } catch {
      if (i < maxWaitMinutes - 1) {
        await page.waitForTimeout(intervalMs);
      }
    }
  }

  // ---------------------------
  // ASSERT
  // ---------------------------
  expect(
    success,
    "AI response did not appear within 5 minutes. Upload unsuccessful."
  ).toBeTruthy();
});

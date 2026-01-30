import { test, expect } from "@playwright/test";
import { waitForLoginPage } from "../../helpers/waitForLoginPage";
import { cleanupOverlays } from "../../helpers/cleanupOverlays";

test("Ask BlueAI to summarise document", async ({ page }) => {
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
  // ASK BLUE AI (TEXTAREA)
  // ---------------------------
  const askBlueAiTextarea = page.locator('textarea[placeholder="Ask BlueAI"]');

  await askBlueAiTextarea.waitFor({ state: "visible", timeout: 60000 });
  await askBlueAiTextarea.fill("Summarise this document");

  // Hit Enter to send
  await askBlueAiTextarea.press("Enter");

  // ---------------------------
  // WAIT FOR SEND ICON (CONFIRMATION)
  // ---------------------------
  await page.waitForTimeout(1000);

  const sendIcon = page.locator('img[alt="Send"][title="Send"]');

  await expect(sendIcon).toBeVisible({
    timeout: 60000,
  });
});

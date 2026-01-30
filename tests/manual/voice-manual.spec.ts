import { test, expect } from "@playwright/test";

test("Manual voice input + automated verification", async ({ page }) => {
  // Open app
  await page.goto("https://demo.smartblue.ai");

  // Make sure page loaded
  await expect(page.getByText("BlueAI")).toBeVisible();

  // 👉 IMPORTANT: Pause here for human action
  console.log("🛑 TEST PAUSED: Please click mic button and speak now");

  // This opens Playwright Inspector and PAUSES execution
  await page.pause();

  /**
   * 👆 HUMAN DOES THIS MANUALLY:
   * 1. Click microphone button
   * 2. Allow mic permission
   * 3. Speak some sentence
   * 4. Stop recording
   */

  console.log("▶️ TEST RESUMED: Now validating results");

  // 🔹 Example assertions (adjust selectors to your UI)

  // Example: transcription text appears
  await expect(page.locator("text=/hello|test|blue/i")).toBeVisible();

  // Example: submit button enabled after speech
  // await expect(page.getByRole("button", { name: "Submit" })).toBeEnabled();

  // Optional wait to visually inspect result
  await page.waitForTimeout(2000);
});

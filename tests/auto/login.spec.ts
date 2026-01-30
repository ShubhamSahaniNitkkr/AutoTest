import { test, expect } from "@playwright/test";
import { waitForLoginPage } from "../../helpers/waitForLoginPage";

test("Login with username and password", async ({ page }) => {
  await page.goto("https://demo.smartblue.ai");

  await waitForLoginPage(page);

  // ✅ wait for login form
  await expect(page.locator("#username")).toBeVisible({ timeout: 30000 });

  // ✅ login using env vars
  await page.fill("#username", process.env.TEST_USERNAME || "");
  await page.fill("#password", process.env.TEST_PASSWORD || "");
  await page.getByRole("button", { name: "Login" }).click();

  // ✅ WAIT FOR APP STATE (NOT URL)
  await expect(page.getByText("Welcome Back", { exact: false })).toBeVisible({
    timeout: 60000,
  });
});

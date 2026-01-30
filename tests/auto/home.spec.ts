import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page).toHaveTitle(
    /Shubham Sunny | Senior Software Engineer/i,
    { timeout: 10000 }
  );
});


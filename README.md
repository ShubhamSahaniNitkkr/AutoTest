# 🧪 BlueAI – Playwright + BrowserStack Test Setup

This repository contains **automated and manual test cases** for the BlueAI web app using **Playwright** and **BrowserStack**.

It is designed to be:

* ✅ Simple
* ✅ Scalable
* ✅ Safe for manual voice / microphone testing
* ✅ Ready for real browsers & real devices (BrowserStack)
* ✅ Clear separation between **automation** and **manual** tests

---

## 📦 Tech Stack

* **Playwright** – test runner
* **BrowserStack** – real browsers & real devices
* **dotenv** – environment variable management
* **Node.js (ES Modules)**

---

## 📁 Project Structure

```
BLUE-AI-TEST/
│
├── tests/
│   ├── auto/                  # Fully automated tests (BrowserStack + CI)
│   │   └── login.spec.ts
│   │
│   └── manual/                # Manual / human-interaction tests (mic, OAuth)
│       └── voice-manual.spec.ts
│
├── playwright.config.js       # Local / manual test config
├── browserstack.yml     # BrowserStack automation config
├── .env                       # BrowserStack credentials (NOT committed)
├── package.json
└── README.md
```

---

## 🔐 Environment Setup

### 1️⃣ Create `.env` file

```env
BROWSERSTACK_USERNAME=your_browserstack_username
BROWSERSTACK_ACCESS_KEY=your_browserstack_access_key
```

⚠️ **IMPORTANT**

* Never commit `.env`
* If a key is leaked → rotate it immediately in BrowserStack dashboard

Add this to `.gitignore`:

```
.env
node_modules
playwright-report
```

---

## 📦 Install Dependencies

```bash
npm install
npx playwright install
```

---

## ▶️ Running Tests (MOST IMPORTANT SECTION)

### ✅ 1️⃣ Run **Automated Tests on BrowserStack**

Runs **ONLY automated tests** from `tests/auto/`
Manual tests are **never picked**.

```bash
npm test
```

✔ Runs on real browsers & real devices
✔ Parallel execution
✔ Results visible in BrowserStack Dashboard
✔ CI-safe

---

### ✅ 2️⃣ Run **Automated Tests Locally** (Desktop only)

Useful for quick checks without BrowserStack.

```bash
npm run test:auto:local
```

---

### ✅ 3️⃣ Run **Manual Voice / Mic Tests (LOCAL, Visible Browser)**

This is required for **real human voice testing**.

```bash
npm run test:manual
```

What happens:

1. Browser opens (headed)
2. App loads
3. Test pauses using `page.pause()`
4. Human tester:

   * Clicks mic button
   * Allows microphone permission
   * Speaks naturally
   * Stops recording
5. Tester clicks **Resume**
6. Automated assertions run

---

## 🎤 Why Manual Voice Testing Is Required

Real **human voice input cannot be automated** in:

* Playwright
* BrowserStack Automate
* Selenium / Puppeteer / Cypress

This is a **browser & OS security limitation**.

### ✔ Supported

* Local browser + real mic
* BrowserStack **LIVE** (manual sessions)

### ❌ Not supported

* BrowserStack Automate
* Headless mode
* Parallel voice injection

---

## 🧠 Example Manual Voice Test

```ts
import { test, expect } from "@playwright/test";

test("Manual voice transcription test", async ({ page }) => {
  await page.goto("https://demo.smartblue.ai");

  // Pause for human interaction
  await page.pause();

  // Validate result after speaking
  await expect(
    page.getByText(/hello|test|blue/i)
  ).toBeVisible();
});
```

---

## ➕ How to Add New Test Cases

### ✅ Add a new **Automated Test**

1. Create a file inside:

```
tests/auto/
```

2. File name must end with:

```
.spec.ts
```

3. Example:

```ts
import { test, expect } from "@playwright/test";

test("Login page loads", async ({ page }) => {
  await page.goto("https://demo.smartblue.ai");
  await expect(page.getByText("BlueAI")).toBeVisible();
});
```

✔ This will run:

* Locally
* On BrowserStack
* In CI

---

### 🎤 Add a new **Manual Test** (Voice / OAuth / Permissions)

1. Create file inside:

```
tests/manual/
```

2. Example:

```ts
test("Manual mic permission test", async ({ page }) => {
  await page.goto("https://demo.smartblue.ai");
  await page.pause(); // human interaction
});
```

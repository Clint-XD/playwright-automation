import { test as base, chromium, BrowserContext, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import testData from "../testData/users.json";

export const test = base.extend<{
  context: BrowserContext;
  page: Page;
}>({
  context: async ({}, use) => {
    const browser = await chromium.launch({
      headless: false, // Set to true for CI/CD
    });

    const context = await browser.newContext({
      storageState: "auth.json", // Load stored session
    });

    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
});

import {
    chromium,
    test,
    expect,
    Browser,
    BrowserContext,
    Page,
  } from "@playwright/test";
  import { LoginPage } from "../pages/LoginPage";
  import testData from "../testData/users.json";
  
  test.describe("Login Page Tests", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let loginPage: LoginPage;
  
    // Test data
    const { userEmail, userPassword } = testData;
  
    test.beforeAll(async () => {
      browser = await chromium.launch({
        headless: false, // Set to true for CI/CD
        args: ["--start-maximized"], // Start with maximized window
      });
    });
  
    test.beforeEach(async () => {
      context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      });
      page = await context.newPage();
      loginPage = new LoginPage(page);
      await loginPage.navigateToLoginPage();
    });
  
    test.afterEach(async () => {
      await context.close();
    });
  
    test.afterAll(async () => {
      await browser.close();
    });
  
    test.describe("UI Elements Validation", () => {
      test("should display all new customer section elements correctly", async () => {
        await loginPage.validateNewCustomerCard();
      });
  
      test("should display all returning customer section elements correctly", async () => {
        await loginPage.validateReturningCustomer();
      });
    });
  
    test.describe("Authentication", () => {
      test("should login successfully with valid credentials", async () => {
        await loginPage.login(userEmail, userPassword);
  
        // Verify successful login
        //   await expect(page).toHaveURL(/route=account\/account/);
        //   await expect(page.locator('h1:has-text("My Account")')).toBeVisible();
      });
  
      test("should show error message with invalid credentials", async () => {

        await loginPage.validateInvalidLogin("sample@email.com", "samplepassword");
        await loginPage.login("invalid@email.com", "wrongpassword");
      });
  
      test("should maintain login state after page refresh", async () => {
       await loginPage.checkLoginState(userEmail, userPassword);
      });
    });
  });
  
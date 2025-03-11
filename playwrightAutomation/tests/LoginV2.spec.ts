import { chromium, test, expect } from "@playwright/test";

test.describe("User Authentication", () => {
  let browser, context, page;
  const userEmail = "savillaclintanthony210@gmail.com";
  const userPassword = "09505880114";

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: true }); // Set headless true for CI
  });

  test.beforeEach(async () => {
    context = await browser.newContext(); // Isolated session
    page = await context.newPage();
    await page.goto("https://ecommerce-playground.lambdatest.io/");
  });
  

  test("Login Test - Valid Credentials", async () => {
    await page.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]");
    await page.click("//span[normalize-space(text())='Login']");

    // Ensure login page is visible
    await expect(page.locator("(//div[@class='card-body p-4'])[2]")).toBeVisible();

    // Fill in credentials
    await page.locator("input[name='email']").fill(userEmail);
    await page.locator("input[type='password']").fill(userPassword);
    await page.click("input[type='submit']");
   
    // Assert login success (Example: checking for dashboard visibility)
    // await expect(page.locator("h2:has-text('My Account')")).toBeVisible();
  });

  test.afterEach(async () => {
    await context.close();
  });

  test.afterAll(async () => {
    await browser.close();
    
  });
});

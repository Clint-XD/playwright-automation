import { chromium, test, expect, Browser, BrowserContext, Page } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage';
import testData from '../testData/users.json';

test.describe("User Authentication", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let loginPage: LoginPage;

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: true }); // Set headless true for CI
    });

    test.beforeEach(async () => {
        context = await browser.newContext(); // Isolated session
        page = await context.newPage();
        loginPage = new LoginPage(page); // ✅ Instantiate the Page Class
    });

    test("should login successfully with valid credentials", async () => {
        await loginPage.navigateToLoginPage();
        await loginPage.login(testData.userEmail, testData.userPassword);
        // await expect(page).toHaveURL(/route=account\/account/);
    });

    test.afterAll(async () => {
        await browser.close();
    });
});

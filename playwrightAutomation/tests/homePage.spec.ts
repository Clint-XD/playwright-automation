import {
    chromium,
    test,
    expect,
    Browser,
    BrowserContext,
    Page,
} from "@playwright/test";
import { homePage } from "../pages/homePage";
import testData from "../testData/users.json"
import {testSetup } from "../utils/testSetup";

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
            storageState: "auth.json",
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

    
    test("Verify Homepage After Login", async ({ page }) => {
        await page.goto("https://ecommerce-playground.lambdatest.io");
    
        // Example: Verify user profile icon exists
        await expect(page.locator("#profile-icon")).toBeVisible();
    
        // Example: Verify homepage banners
        await expect(page.locator("#banner")).toBeVisible();
    
        // Example: Verify user is greeted
        const welcomeText = await page.locator("#welcome-message").textContent();
        expect(welcomeText).toContain("Welcome");
    });
}
)
import {chromium, test} from "@playwright/test"


test("Login test demo", async () => {

    const browser = await chromium.launch({
        headless: false
    }
    );
    const context = await browser.newContext(); //Creates a new browser context. It won't share cookies/cache with other browser contexts
    const page = await context.newPage();
    const userEmail = "savillaclintanthony210@gmail.com";
    const userPassword = "09505880114";
    await page.goto("https://ecommerce-playground.lambdatest.io/");
    await page.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]");
    await page.click("'Login'");
''
    // const userEmail = "savillaclintanthony210@gmail.com";
    // const userPassword = "09505880114";

    await page.locator("input-email").fill(userEmail);
    await page.locator("iinput[type='password']").fill(userEmail);
});





import { chromium, test, expect } from "@playwright/test";

let browser, context, page;

test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false }); // Set headless true for CI
});

test.beforeEach(async () => {
    context = await browser.newContext(); // Isolated session
    page = await context.newPage();
    await page.goto("https://www.lambdatest.com/selenium-playground/simple-form-demo");
});


test("Form Test - User should be able to input fields", async () => {
    await expect(page.locator("//h1[normalize-space(text())='Simple Form Demo']")).toBeVisible();

    //Check if the form Simple Form Demo - Form exist
    await expect(page.locator("(//div[@class='flex smtablet:block']//div)[1]")).toBeVisible();


    const messageInput = page.locator("input[placeholder='Please enter your Message']");
    console.log(await messageInput.getAttribute("placeholder"));
    await messageInput.scrollIntoViewIfNeeded();
    expect(messageInput).toHaveAttribute("placeholder", "Please enter your Message");
    console.log(await messageInput.inputValue()); // optional

    await messageInput.type("Playwright is Fun!");
    console.log("After entering data:" + await messageInput.inputValue()); // optional, to check the response
})

test("Form Test - User should be able to input fields and add", async () => {

})
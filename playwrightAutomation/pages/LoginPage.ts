import { Page, expect, Locator } from "@playwright/test";
import locators from '../fixtures/locators/loginPage-locators.json';

export class LoginPage {
    readonly url: string = "https://ecommerce-playground.lambdatest.io/index.php?route=account/login";
    readonly page: Page;
    readonly emailPlaceholder: Locator;
    readonly passwordPlaceholder: Locator;
    readonly forgotPassword: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailPlaceholder = this.page.locator(locators.ReturningCustomer.emailAddressPlaceholder);
        this.passwordPlaceholder = this.page.locator(locators.ReturningCustomer.passwordPlaceholder);
        this.forgotPassword = this.page.locator(locators.ReturningCustomer.forgottenPasswordButton);
        this.loginButton = this.page.locator(locators.ReturningCustomer.loginButton);
    }

    async navigateToLoginPage() {
        await this.page.goto(this.url);
    }

    async login(email: string, password: string) {
       await this.emailPlaceholder.fill(email);
       await this.passwordPlaceholder.fill(password);
       await this.loginButton.click();
    }
}

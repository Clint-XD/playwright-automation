import { Page, expect, Locator } from "@playwright/test";
import locators from '../fixtures/locators/loginPage-locators.json';

interface ValidationAssertion {
    locator: string;
    description: string;
    timeout?: number;
}

export class LoginPage {
    readonly url: string = "https://ecommerce-playground.lambdatest.io/index.php?route=account/login";
    readonly page: Page;
    
    // Returning Customer Elements
    private returningCustomerCard: Locator;
    private returningCustomerTextHeader: Locator;
    private emailAddressLabel: Locator;
    private passwordLabel: Locator;
    private returningCustomerP: Locator;
    private emailPlaceholder: Locator;
    private passwordPlaceholder: Locator;
    private forgotPassword: Locator;
    private loginButton: Locator;

    // New Customer Elements
    private newCustomerCard: Locator;
    private newCustomerTextHeader: Locator;
    private registerAccountText: Locator;
    private newCustomerTextBody: Locator;
    private continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.initializeLocators();
    }

    private initializeLocators(): void {
        try {
            // Returning Customer Locators
            this.returningCustomerCard = this.page.locator(locators.ReturningCustomer.returningCustomerCard);
            this.returningCustomerTextHeader = this.page.locator(locators.ReturningCustomer.returningCustomerTextHeader);
            this.returningCustomerP = this.page.locator(locators.ReturningCustomer.returningCustomerP);
            this.emailAddressLabel = this.page.locator(locators.ReturningCustomer.emailAddressLabel);
            this.emailPlaceholder = this.page.locator(locators.ReturningCustomer.emailAddressPlaceholder);
            this.passwordLabel = this.page.locator(locators.ReturningCustomer.passwordLabel);
            this.passwordPlaceholder = this.page.locator(locators.ReturningCustomer.passwordPlaceholder);
            this.forgotPassword = this.page.locator(locators.ReturningCustomer.forgottenPasswordButton);
            this.loginButton = this.page.locator(locators.ReturningCustomer.loginButton);

            // New Customer Locators
            this.newCustomerCard = this.page.locator(locators.NewCustomer.newCustomerCard);
            this.newCustomerTextHeader = this.page.locator(locators.NewCustomer.newCustomerTextHeader);
            this.registerAccountText = this.page.locator(locators.NewCustomer.registerAccountText);
            this.newCustomerTextBody = this.page.locator(locators.NewCustomer.newCustomerTextBody);
        } catch (error) {
            throw new Error(`Failed to initialize locators: ${error.message}`);
        }
    }

    async navigateToLoginPage(): Promise<void> {
        await this.page.goto(this.url);
    }

    private async validateElements(assertions: ValidationAssertion[]): Promise<void> {
        for (const { locator, description, timeout = 5000 } of assertions) {
            try {
                await expect(this.page.locator(locator)).toBeVisible({ timeout });
                console.log(`✅ ${description} is visible`);
            } catch (error) {
                console.error(`❌ Failed to validate ${description}: ${error.message}`);
                throw error;
            }
        }
    }

    async validateNewCustomerCard(): Promise<void> {
        const assertions: ValidationAssertion[] = [
            { locator: locators.NewCustomer.newCustomerTextHeader, description: "New Customer Text Header" },
            { locator: locators.NewCustomer.registerAccountText, description: "Register Account Text" },
            { locator: locators.NewCustomer.newCustomerTextBody, description: "Register Account Paragraph" }
        ];
        await this.validateElements(assertions);
    }

    async validateReturningCustomer(): Promise<void> {
        const assertions: ValidationAssertion[] = [
            { locator: locators.ReturningCustomer.returningCustomerCard, description: "Returning Customer Card" },
            { locator: locators.ReturningCustomer.returningCustomerTextHeader, description: "Returning Customer Text Header" },
            { locator: locators.ReturningCustomer.returningCustomerP, description: "Returning Customer Paragraph" },
            { locator: locators.ReturningCustomer.emailAddressLabel, description: "Email Address Text Label" },
            { locator: locators.ReturningCustomer.passwordLabel, description: "Password Text Label" }
        ];
        await this.validateElements(assertions);
    }

    async login(email: string, password: string): Promise<void> {
        try {
            await this.emailPlaceholder.fill(email);
            await this.passwordPlaceholder.fill(password);
            await this.loginButton.click();
        } catch (error) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }

    async checkLoginState(email: string, password: string): Promise<void> {
        await this.login(email, password);
    
        // Wait until the URL matches the expected route
        await this.page.waitForURL(new RegExp("route=account/account"));
    
        // Ensure the current page URL matches the expected one
        await expect(this.page).toHaveURL(new RegExp("route=account/account"));
    
        // Verify that the "My Account" header is visible
        await expect(this.page.locator("h2").filter({ hasText: "My Account" })).toBeVisible();

    }
    
    
}

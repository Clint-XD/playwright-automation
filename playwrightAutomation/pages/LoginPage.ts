import { Page, expect, Locator } from "@playwright/test";
import locators from "../fixtures/locators/loginPageLocators.json";

interface ValidationAssertion {
  locator: string;
  description: string;
  timeout?: number;
}


export class LoginPage {

  readonly url: string = "https://ecommerce-playground.lambdatest.io/index.php?route=account/login";
  readonly loginErrorMessage: Locator;
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
    this.loginErrorMessage = this.page.locator(
      locators.HomePage.loginErrorMessage
    );

   Object.seal(this);
  }


  private initializeLocators(): void {
    try {
      // Returning Customer Locators
      this.returningCustomerCard = this.page.locator(
        locators.ReturningCustomer.returningCustomerCard
      );
      this.returningCustomerTextHeader = this.page.locator(
        locators.ReturningCustomer.returningCustomerTextHeader
      );
      this.returningCustomerP = this.page.locator(
        locators.ReturningCustomer.returningCustomerP
      );
      this.emailAddressLabel = this.page.locator(
        locators.ReturningCustomer.emailAddressLabel
      );
      this.emailPlaceholder = this.page.locator(
        locators.ReturningCustomer.emailAddressPlaceholder
      );
      this.passwordLabel = this.page.locator(
        locators.ReturningCustomer.passwordLabel
      );
      this.passwordPlaceholder = this.page.locator(
        locators.ReturningCustomer.passwordPlaceholder
      );
      this.forgotPassword = this.page.locator(
        locators.ReturningCustomer.forgottenPasswordButton
      );
      this.loginButton = this.page.locator(
        locators.ReturningCustomer.loginButton
      );

      // New Customer Locators
      this.newCustomerCard = this.page.locator(
        locators.NewCustomer.newCustomerCard
      );
      this.newCustomerTextHeader = this.page.locator(
        locators.NewCustomer.newCustomerTextHeader
      );
      this.registerAccountText = this.page.locator(
        locators.NewCustomer.registerAccountText
      );
      this.newCustomerTextBody = this.page.locator(
        locators.NewCustomer.newCustomerTextBody
      );
    } catch (error) {
      throw new Error(`Failed to initialize locators: ${error.message}`);
    }
  }
  

  private async validateElements(
    assertions: ValidationAssertion[]
  ): Promise<void> {
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


  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(this.url);
  }


  async validateNewCustomerCard(): Promise<void> {
    const assertions: ValidationAssertion[] = [
      {
        locator: locators.NewCustomer.newCustomerTextHeader,
        description: "New Customer Text Header",
      },
      {
        locator: locators.NewCustomer.registerAccountText,
        description: "Register Account Text",
      },
      {
        locator: locators.NewCustomer.newCustomerTextBody,
        description: "Register Account Paragraph",
      },
    ];
    await this.validateElements(assertions);
  }


  async validateReturningCustomer(): Promise<void> {
    const assertions: ValidationAssertion[] = [
      {
        locator: locators.ReturningCustomer.returningCustomerCard,
        description: "Returning Customer Card",
      },
      {
        locator: locators.ReturningCustomer.returningCustomerTextHeader,
        description: "Returning Customer Text Header",
      },
      {
        locator: locators.ReturningCustomer.returningCustomerP,
        description: "Returning Customer Paragraph",
      },
      {
        locator: locators.ReturningCustomer.emailAddressLabel,
        description: "Email Address Text Label",
      },
      {
        locator: locators.ReturningCustomer.passwordLabel,
        description: "Password Text Label",
      },
    ];
    await this.validateElements(assertions);
  }


    async validateInvalidLogin(email: string, password: string): Promise<void> {
      try {
          // Attempt login with invalid credentials
          await this.login(email, password);
          // Wait for error message to be visible
          await expect(this.loginErrorMessage).toBeVisible({ timeout: 5000 });
          // Verify error message content
          const errorText = await this.loginErrorMessage.textContent();
          // expect(errorText).toContain("Warning: No match for E-Mail Address and/or Password.");
          await expect(
            this.loginErrorMessage.locator("i.fa-exclamation-circle")).toBeVisible();
            expect(errorText?.trim()).toContain(
              "Warning: No match for E-Mail Address and/or Password."
          );
        // Verify the icon is present in the error message
        // Verify we're still on the login page
          await expect(this.page).toHaveURL(this.url);
          // Verify form elements are still visible and enabled
          await expect(this.emailPlaceholder).toBeVisible();
          await expect(this.emailPlaceholder).toBeEnabled();
          await expect(this.passwordPlaceholder).toBeVisible();
          await expect(this.passwordPlaceholder).toBeEnabled();
          await expect(this.loginButton).toBeVisible();
          await expect(this.loginButton).toBeEnabled();

          // ✅ Check if the input fields retain the entered values
          const enteredEmail = await this.emailPlaceholder.inputValue();
          const enteredPassword = await this.passwordPlaceholder.inputValue();
          expect(enteredEmail).toBe(email); // Ensure email remains in input field
          expect(enteredPassword).toBe(password); // Ensure password remains in input field (if not cleared by the system)

          console.log("✅ Invalid login validation successful");
        } catch (error) {
          console.error("❌ Invalid login validation failed:", error.message);
          throw error;
        }
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
      await this.page.waitForURL(new RegExp("route=account/account")); // Wait until the URL matches the expected route
      await expect(this.page).toHaveURL(new RegExp("route=account/account")); // Ensure the current page URL matches the expected one
      await expect(this.page.locator("h2").filter({ hasText: "My Account" })).toBeVisible();      // Verify that the "My Account" header is visible
    }
}


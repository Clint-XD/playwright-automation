import { Page, expect, Locator } from "@playwright/test";
import locators from "../fixtures/locators/loginPageLocators.json";
import { LoginPage } from "../pages/LoginPage";

interface ValidationAssertion {
  locator: string;
  description: string;
  timeout?: number;
}


export class HomePage {

  readonly url: string = "https://ecommerce-playground.lambdatest.io/index.php?route=account/account";

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
}

import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    testMatch: ["tests/loginPage.spec.ts"],

    use: {
        headless: true,
        screenshot: "only-on-failure", 
        video: "retain-on-failure",
        viewport: null,
        baseURL: 'https://ecommerce-playground.lambdatest.io',
    },
    retries: 0,

    reporter: [["dot"], ["json", {
        outputFile: "jsonReports/jsonReport.json"
    }], ["html", {
        open: "never"
    }]]
};

export default config;
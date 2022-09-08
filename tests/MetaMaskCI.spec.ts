import { delay } from "../e2e/helpers.spec";
//import { Browser, BrowserContext, Page } from '@playwright/test';

const { test: base, chromium, webkit, expect, page } = require('@playwright/test')
const path = require('path')

const extensionPath = path.join(__dirname, '../metamask') // make sure this is correct

export const test = base.extend({
  context: async ({ browserName }, use) => {
    const browserTypes = { chromium, webkit }
    const launchOptions = {
      devtools: false,
      headless: false,
      javaScriptEnabled: true,
      args: [
       `--disable-extensions-except=${extensionPath}`,
       `--load-extension=${extensionPath}`
      ],
      viewport: {
        width: 1000,
        height: 800
      }
    }
    const context = await browserTypes[browserName].launchPersistentContext(
      'TestProfile1', ///tmp/test-user-data-dir
      launchOptions
    )
    await use(context)
    const pageOne = await context.newPage();
    await context.close()
  }
});

test.describe('Connect Wallet', () => {
    test('Login MetaMask', async ({ browser, context }) => {
      // let browser: Browser;
      // let context: BrowserContext;
     const page = await context.newPage({
      recordVideo: {
        dir: "./playwright-report"
      }
    });
      await delay(5000);
      await page.reload();
      //await delay(10000);
      //await page.keyboard.press('Control+Tab');
      await page.goto('chrome-extension://daackfnalkpkoipabdoioillppgeekja/home.html#initialize/select-action');
      await page.reload();
      // Click text=Import wallet
      await page.locator('text=Import wallet').click();
      await page.waitForURL('chrome-extension://daackfnalkpkoipabdoioillppgeekja/home.html#initialize/metametrics-opt-in');
      //await page.pause();
      await page.reload();
      // Click [data-testid="page-container-footer-next"]
      await page.locator('[data-testid="page-container-footer-next"]').click();
      await page.waitForURL('chrome-extension://daackfnalkpkoipabdoioillppgeekja/home.html#initialize/create-password/import-with-seed-phrase');

        // Click [placeholder="Paste Secret Recovery Phrase from clipboard"]
    await page.locator('[placeholder="Paste Secret Recovery Phrase from clipboard"]').click();
    // Fill [placeholder="Paste Secret Recovery Phrase from clipboard"]
    await page.locator('[placeholder="Paste Secret Recovery Phrase from clipboard"]').fill('liar input bronze remember clean harsh imitate bulb anchor sight park fade');
    // Click #password
    await page.locator('#password').click();
    // Fill #password
    await page.locator('#password').fill('FractalT35t_2022!');
    // Click #confirm-password
    await page.locator('#confirm-password').click();
    // Fill #confirm-password
    await page.locator('#confirm-password').fill('FractalT35t_2022!');
    // Click div[role="checkbox"] >> nth=1
    await page.locator('div[role="checkbox"]').nth(1).click();
    // Click button:has-text("Import")
    await page.locator('button:has-text("Import")').click();
    await page.waitForURL('chrome-extension://daackfnalkpkoipabdoioillppgeekja/home.html#initialize/end-of-flow');
    // assert text=Congratulations
    await page.locator('text=Congratulations');
    // Click text=All Done
    await page.locator('text=All Done').click();
    await page.reload();
    // Click [data-testid="popover-close"]
    await page.locator('[data-testid="popover-close"]').click();
    // Click div[role="button"]:has-text("Ethereum Mainnet")
    await page.locator('div[role="button"]:has-text("Ethereum Mainnet")').click();
    // Click text=✓Goerli Test Network
    await page.locator('text=✓Goerli Test Network').click();
    
    // Go to Fractal dev
    await page.goto('https://app.dev.fractalframework.xyz/');
    //await page.pause();

    // Click button:has-text("Connect Wallet")
    await page.locator('button:has-text("Connect Wallet")').click();
    // Click button[role="menuitem"]:has-text("Connect Wallet")
    await page.locator('button[role="menuitem"]:has-text("Connect Wallet")').click();
    // Follows MetaMask popup window
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('text=MetaMaskConnect to your MetaMask Wallet').click()
    ]);
    //await page.pause();
    // Click text=Next
    await popup.locator('text=Next').click();

    //await page.pause();
    // Click 'Connect' - I know it's an ugly selector but it's hidden deep within the html =/
    await popup.click('//*[@id="app-content"]/div/div[3]/div/div[2]/div[2]/div[2]/footer/button[2]');
    await browser.close();

    });
});
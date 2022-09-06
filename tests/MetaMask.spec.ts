import { delay, metamask, login } from "../e2e/helpers.spec";
import { Browser, BrowserContext, Page } from '@playwright/test';

const { test: base, chromium, webkit, expect } = require('@playwright/test')
const path = require('path')

const extensionPath = path.join(__dirname, '../metamask') // make sure this is correct

const test = base.extend({
  context: async ({ browserName }, use) => {
    const browserTypes = { chromium, webkit }
    const launchOptions = {
      devtools: false,
      headless: false,
      args: [
       `--disable-extensions-except=${extensionPath}`,
       //`--load-extension=${extensionPath}`
      ],
      viewport: {
        width: 1000,
        height: 800
      }
    }
    const context = await browserTypes[browserName].launchPersistentContext(
      'person 1', ///tmp/test-user-data-dir
      launchOptions
    )
    await use(context)
    await context.close()
  }
});

test.describe('Connect Wallet', () => {
    test('Login MetaMask', async ({ page, browser }) => {
      // let browser: Browser;
      // let context: BrowserContext;
      await delay(2000);
      await page.reload();
      await page.goto(
       'chrome-extension://daackfnalkpkoipabdoioillppgeekja/popup.html');  
      await page.locator('input[type="password"]').click();
      await page.locator('input[type="password"]').fill('Aut0mati0n_2022!');
      await page.locator('button:has-text("Unlock")').click();
      await page.goto('https://app.dev.fractalframework.xyz/');
      // Click button:has-text("Connect Wallet")
      await page.locator('button:has-text("Connect Wallet")').click();
      // Click button[role="menuitem"]:has-text("Connect Wallet")
      await page.locator('button[role="menuitem"]:has-text("Connect Wallet")').click();
      // Click text=MetaMaskConnect to your MetaMask Wallet
      await page.locator('text=MetaMaskConnect to your MetaMask Wallet').click();
    //await page.pause();
        //await browser.close();
    });
});
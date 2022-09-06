import { Browser, BrowserContext, test, expect } from '@playwright/test';

export async function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export async function metamask(){

const { test: base, browser, chromium, webkit } = require('@playwright/test')
const path = require('path')

const extensionPath = path.join(__dirname, '../metamask') // make sure this is correct

const test = base.extend({
  context: async ({ browserName }, use) => {
    const browserTypes = { chromium, webkit }
    const launchOptions = {
      devtools: true,
      headless: false,
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
      '/tmp/test-user-data-dir',
      launchOptions
    )
    await use(context)
    await context.close()
  }
});
}
export async function login(ms: number) {
  test('MetaMask Extension Login', async ({ page }) => {
    let browser: Browser;
    let context: BrowserContext;
    //let page: Page;
    await delay(2000);
    await page.reload();
    await page.goto(
     'chrome-extension://daackfnalkpkoipabdoioillppgeekja/popup.html');  
  
    //await page.keyboard.press('Control+Tab');
    //await page.pause();
   // await page.waitForTimeout(30000); // this is here so that it won't automatically close the browser window
await page.locator('input[type="password"]').click();
await page.locator('input[type="password"]').fill('Aut0mati0n_2022!');
await page.locator('button:has-text("Unlock")').click();
});
}